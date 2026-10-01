"""Pytest fixtures: build the app with a FakeStore, no Supabase required."""
from __future__ import annotations

import pytest
from fastapi.testclient import TestClient

from app.config import Settings, get_settings
from app.deps import get_store
from app.main import create_app
from app.routers import contact
from tests.fake_store import FakeStore


def _test_settings() -> Settings:
    return Settings(
        SUPABASE_URL="http://fake.local",
        SUPABASE_SERVICE_ROLE_KEY="fake-service-key",
        SUPABASE_ANON_KEY="fake-anon-key",
        ADMIN_EMAILS="admin@example.com",
        FRONTEND_ORIGINS="http://localhost:5173",
        CONTACT_RATE_LIMIT_MAX=3,
        CONTACT_RATE_LIMIT_WINDOW=3600,
    )


@pytest.fixture
def store() -> FakeStore:
    return FakeStore()


@pytest.fixture
def client(store: FakeStore):
    app = create_app()
    settings = _test_settings()
    app.dependency_overrides[get_store] = lambda: store
    app.dependency_overrides[get_settings] = lambda: settings
    # reset the module-level contact rate limiter between tests
    contact._limiter = None
    # NOTE: not using `with TestClient(app)` so the Supabase-requiring lifespan
    # does not run; the store is injected via dependency override instead.
    return TestClient(app)


@pytest.fixture
def admin_headers():
    return {"Authorization": "Bearer admin-token"}


@pytest.fixture
def user_headers():
    return {"Authorization": "Bearer user-token"}
