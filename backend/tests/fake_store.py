"""In-memory Store implementation for tests (no network / no Supabase)."""
from __future__ import annotations

import uuid
from datetime import datetime, timezone
from typing import Any, Optional

from app.store import Store

SINGLETONS = {"profile", "hero", "contact_info", "seo_metadata"}


class FakeStore(Store):
    def __init__(self):
        self.tables: dict[str, list[dict]] = {}
        # seed singleton rows
        for t in SINGLETONS:
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

    # ---- auth: map known test tokens to users ----
    def get_user(self, access_token: str) -> Optional[dict]:
        if access_token == "admin-token":
            return {"id": "u-admin", "email": "admin@example.com", "app_metadata": {}}
        if access_token == "role-admin-token":
            return {"id": "u-role", "email": "someone@else.com",
                    "app_metadata": {"role": "admin"}}
        if access_token == "user-token":
            return {"id": "u-user", "email": "nobody@example.com", "app_metadata": {}}
        return None

    # ---- storage ----
    def upload(self, path, content, content_type):
        self.uploads[path] = content
        return f"https://fake.storage/media/{path}"

    def remove(self, path):
        self.uploads.pop(path, None)
