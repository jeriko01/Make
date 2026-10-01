"""Dependency providers: settings, store, and the admin-auth guard."""
from __future__ import annotations

from typing import Optional

from fastapi import Depends, Header, HTTPException, status

from .config import Settings, get_settings
from .store import Store, SupabaseStore

# Populated at startup by app.main.build_store(); tests override get_store().
_store: Optional[Store] = None


def build_supabase_store(settings: Settings) -> SupabaseStore:
    """Create the production Supabase-backed store. Requires real config."""
    if not settings.is_supabase_configured:
        raise RuntimeError(
            "Supabase is not configured. Set SUPABASE_URL and "
            "SUPABASE_SERVICE_ROLE_KEY in backend/.env (Supabase-only mode)."
        )
    from supabase import create_client  # imported lazily so tests need no network

    client = create_client(settings.supabase_url, settings.supabase_service_role_key)
    return SupabaseStore(client, settings.supabase_storage_bucket)


def set_store(store: Store) -> None:
    global _store
    _store = store


def get_store() -> Store:
    if _store is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Data store not initialized.",
        )
    return _store


def _extract_bearer(authorization: Optional[str]) -> str:
    if not authorization or not authorization.lower().startswith("bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing or malformed Authorization header.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return authorization.split(" ", 1)[1].strip()


def get_current_admin(
    authorization: Optional[str] = Header(default=None),
    store: Store = Depends(get_store),
    settings: Settings = Depends(get_settings),
) -> dict:
    """Verify the Supabase JWT AND that the user is an authorized admin.

    This runs server-side on every protected write endpoint. A React route
    guard alone is never trusted.
    """
    token = _extract_bearer(authorization)
    user = store.get_user(token)
    if not user or not user.get("email"):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired session.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    email = user["email"].lower()
    role = (user.get("app_metadata") or {}).get("role")
    is_admin = email in settings.admin_email_set or role == "admin"
    if not is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not authorized to perform this action.",
        )
    return user
