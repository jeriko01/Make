"""Data-access layer.

`Store` is an abstract interface over the database, auth, and storage. The
production implementation (`SupabaseStore`) wraps the Supabase service-role
client. Tests inject a lightweight in-memory fake implementing the same
interface, so the app logic (routers, auth, filtering) is exercised without a
live Supabase project.

The FastAPI app itself requires a real Supabase configuration to boot
(Supabase-only mode); see `app.main` / `app.deps`.
"""
from __future__ import annotations

import abc
import uuid
from datetime import datetime, timezone
from typing import Any, Optional


class Store(abc.ABC):
    """Abstract database + auth + storage interface."""

    # ---- generic table ops ----
    @abc.abstractmethod
    def list(
        self,
        table: str,
        *,
        published_only: bool = False,
        order: Optional[str] = "display_order",
        desc: bool = False,
        filters: Optional[dict[str, Any]] = None,
    ) -> list[dict]:
        ...

    @abc.abstractmethod
    def get(self, table: str, row_id: Any) -> Optional[dict]:
        ...

    @abc.abstractmethod
    def get_singleton(self, table: str) -> dict:
        """Return the single row (id = 1) of a singleton table."""

    @abc.abstractmethod
    def insert(self, table: str, data: dict) -> dict:
        ...

    @abc.abstractmethod
    def update(self, table: str, row_id: Any, data: dict) -> Optional[dict]:
        ...

    @abc.abstractmethod
    def update_singleton(self, table: str, data: dict) -> dict:
        ...

    @abc.abstractmethod
    def delete(self, table: str, row_id: Any) -> bool:
        ...

    # ---- auth ----
    @abc.abstractmethod
    def get_user(self, access_token: str) -> Optional[dict]:
        """Validate a Supabase Auth JWT and return the user dict, or None."""

    # ---- storage ----
    @abc.abstractmethod
    def upload(self, path: str, content: bytes, content_type: str) -> str:
        """Upload bytes to the media bucket; return a public URL."""

    @abc.abstractmethod
    def remove(self, path: str) -> None:
        ...


class SupabaseStore(Store):
    """Production store backed by the Supabase service-role client."""

    def __init__(self, client, bucket: str):
        self._c = client
        self._bucket = bucket

    def list(self, table, *, published_only=False, order="display_order",
             desc=False, filters=None):
        q = self._c.table(table).select("*")
        if published_only:
            q = q.eq("is_published", True)
        if filters:
            for k, v in filters.items():
                q = q.eq(k, v)
        if order:
            q = q.order(order, desc=desc)
        res = q.execute()
        return res.data or []

    def get(self, table, row_id):
        res = self._c.table(table).select("*").eq("id", row_id).limit(1).execute()
        rows = res.data or []
        return rows[0] if rows else None

    def get_singleton(self, table):
        res = self._c.table(table).select("*").eq("id", 1).limit(1).execute()
        rows = res.data or []
        return rows[0] if rows else {}

    def insert(self, table, data):
        res = self._c.table(table).insert(data).execute()
        return (res.data or [None])[0]

    def update(self, table, row_id, data):
        res = self._c.table(table).update(data).eq("id", row_id).execute()
        rows = res.data or []
        return rows[0] if rows else None

    def update_singleton(self, table, data):
        res = self._c.table(table).update(data).eq("id", 1).execute()
        rows = res.data or []
        return rows[0] if rows else {}

    def delete(self, table, row_id):
        res = self._c.table(table).delete().eq("id", row_id).execute()
        return bool(res.data)

    def get_user(self, access_token):
        try:
            resp = self._c.auth.get_user(access_token)
        except Exception:
            return None
        user = getattr(resp, "user", None)
        if user is None:
            return None
        # normalize to a plain dict
        return {
            "id": getattr(user, "id", None),
            "email": getattr(user, "email", None),
            "app_metadata": getattr(user, "app_metadata", {}) or {},
        }

    def upload(self, path, content, content_type):
        self._c.storage.from_(self._bucket).upload(
            path=path,
            file=content,
            file_options={"content-type": content_type, "upsert": "true"},
        )
        return self._c.storage.from_(self._bucket).get_public_url(path)

    def remove(self, path):
        self._c.storage.from_(self._bucket).remove([path])


class MemoryStore(Store):
    def __init__(self):
        self.tables: dict[str, list[dict]] = {}
        for t in {"profile", "hero", "contact_info", "seo_metadata"}:
            self.tables[t] = [{"id": 1}]
        self.uploads: dict[str, bytes] = {}

    def _rows(self, table: str) -> list[dict]:
        return self.tables.setdefault(table, [])

    def list(self, table, *, published_only=False, order="display_order",
             desc=False, filters=None):
        rows = list(self._rows(table))
        if published_only:
            rows = [r for r in rows if r.get("is_published", True)]
        if filters:
            for k, v in filters.items():
                rows = [r for r in rows if r.get(k) == v]
        if order and rows and order in rows[0]:
            rows.sort(key=lambda r: (r.get(order) is None, r.get(order)), reverse=desc)
        return rows

    def get(self, table, row_id):
        return next((r for r in self._rows(table) if str(r.get("id")) == str(row_id)), None)

    def get_singleton(self, table):
        rows = self._rows(table)
        return rows[0] if rows else {}

    def insert(self, table, data):
        row = dict(data)
        row.setdefault("id", uuid.uuid4().hex)
        if table == "contact_messages":
            row.setdefault("created_at", datetime.now(timezone.utc).isoformat())
            row.setdefault("is_read", False)
        self._rows(table).append(row)
        return row

    def update(self, table, row_id, data):
        row = self.get(table, row_id)
        if row is None:
            return None
        row.update(data)
        return row

    def update_singleton(self, table, data):
        row = self.get_singleton(table)
        row.update(data)
        return row

    def delete(self, table, row_id):
        rows = self._rows(table)
        before = len(rows)
        self.tables[table] = [r for r in rows if str(r.get("id")) != str(row_id)]
        return len(self.tables[table]) < before

    def get_user(self, access_token):
        return {"id": "dev-user", "email": "dev@localhost", "app_metadata": {}}

    def upload(self, path, content, content_type):
        self.uploads[path] = content
        return f"/media/{path}"

    def remove(self, path):
        self.uploads.pop(path, None)

