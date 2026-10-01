"""Protected image uploads to Supabase Storage."""
from __future__ import annotations

import uuid

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status

from ..config import Settings, get_settings
from ..deps import get_current_admin, get_store
from ..store import Store

router = APIRouter(
    prefix="/api/admin/uploads",
    tags=["uploads"],
    dependencies=[Depends(get_current_admin)],
)

_ALLOWED = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
    "image/svg+xml": "svg",
}


@router.post("", status_code=status.HTTP_201_CREATED)
async def upload_image(
    folder: str = "misc",
    file: UploadFile = File(...),
    store: Store = Depends(get_store),
    settings: Settings = Depends(get_settings),
):
    if file.content_type not in _ALLOWED:
        raise HTTPException(
            status_code=415,
            detail=f"Unsupported type '{file.content_type}'. Allowed: {', '.join(_ALLOWED)}.",
        )
    content = await file.read()
    max_bytes = settings.max_upload_mb * 1024 * 1024
    if len(content) > max_bytes:
        raise HTTPException(
            status_code=413, detail=f"File too large (max {settings.max_upload_mb} MB)."
        )
    if not content:
        raise HTTPException(status_code=400, detail="Empty file.")

    safe_folder = "".join(c for c in folder if c.isalnum() or c in ("-", "_")) or "misc"
    ext = _ALLOWED[file.content_type]
    path = f"{safe_folder}/{uuid.uuid4().hex}.{ext}"

    try:
        public_url = store.upload(path, content, file.content_type)
    except Exception as exc:  # surface a clean error to the admin UI
        raise HTTPException(status_code=502, detail=f"Upload failed: {exc}") from exc

    return {"path": path, "url": public_url}


@router.delete("", status_code=status.HTTP_204_NO_CONTENT)
def delete_image(path: str, store: Store = Depends(get_store)):
    clean_path = path.strip().lstrip("/")
    if not clean_path or ".." in clean_path:
        raise HTTPException(status_code=400, detail="Invalid file path.")
    try:
        store.remove(clean_path)
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"Delete failed: {exc}") from exc
    return None
