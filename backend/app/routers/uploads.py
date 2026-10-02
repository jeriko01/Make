"""Protected image uploads to Supabase Storage."""
from __future__ import annotations

import re
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


def _verify_magic_bytes(content: bytes, content_type: str) -> None:
    """Ensure binary signature matches declared MIME type and block SVG XSS."""
    if len(content) < 4:
        raise HTTPException(status_code=400, detail="Corrupted or truncated file.")

    if content_type == "image/jpeg":
        if not content.startswith(b"\xff\xd8\xff"):
            raise HTTPException(status_code=400, detail="Invalid JPEG signature.")
    elif content_type == "image/png":
        if not content.startswith(b"\x89PNG"):
            raise HTTPException(status_code=400, detail="Invalid PNG signature.")
    elif content_type == "image/gif":
        if not (content.startswith(b"GIF87a") or content.startswith(b"GIF89a")):
            raise HTTPException(status_code=400, detail="Invalid GIF signature.")
    elif content_type == "image/webp":
        if len(content) < 12 or not (content.startswith(b"RIFF") and b"WEBP" in content[:16]):
            raise HTTPException(status_code=400, detail="Invalid WebP signature.")
    elif content_type == "image/svg+xml":
        text = content.decode("utf-8", errors="ignore").lower()
        if "<svg" not in text:
            raise HTTPException(status_code=400, detail="Invalid SVG structure.")
        forbidden = [
            "<script",
            "javascript:",
            "onload=",
            "onerror=",
            "onclick=",
            "onmouseover=",
            "<iframe",
            "<object",
            "<embed",
        ]
        for token in forbidden:
            if token in text:
                raise HTTPException(status_code=400, detail="SVG contains active script content.")


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

    _verify_magic_bytes(content, file.content_type)

    safe_folder = "".join(c for c in folder if c.isalnum() or c in ("-", "_")) or "misc"
    ext = _ALLOWED[file.content_type]
    path = f"{safe_folder}/{uuid.uuid4().hex}.{ext}"

    try:
        public_url = store.upload(path, content, file.content_type)
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"Upload failed: {exc}") from exc

    return {"path": path, "url": public_url}


@router.delete("", status_code=status.HTTP_204_NO_CONTENT)
def delete_image(path: str, store: Store = Depends(get_store)):
    clean_path = path.strip().lstrip("/")
    if (
        not clean_path
        or ".." in clean_path
        or not re.match(r"^[a-zA-Z0-9_\-\./]+$", clean_path)
    ):
        raise HTTPException(status_code=400, detail="Invalid file path.")
    try:
        store.remove(clean_path)
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"Delete failed: {exc}") from exc
    return None
