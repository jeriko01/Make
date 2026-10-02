"""FastAPI application entrypoint."""
from __future__ import annotations

import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import get_settings
from .deps import build_supabase_store, set_store
from .routers import admin, contact, public, uploads

log = logging.getLogger("make")


@asynccontextmanager
async def lifespan(app: FastAPI):
    settings = get_settings()
    if settings.is_supabase_configured:
        set_store(build_supabase_store(settings))
        log.info("Connected to database at %s", settings.supabase_url)
    else:
        log.info("Running in local development mode with rich seed data.")
        from .store import MemoryStore
        from .dev_seed import populate_dev_store
        dev_store = MemoryStore()
        populate_dev_store(dev_store)
        set_store(dev_store)
    yield


def create_app() -> FastAPI:
    settings = get_settings()
    app = FastAPI(
        title="Make API",
        description="Backend for Sharmaarke's portfolio (Make).",
        version="1.0.0",
        lifespan=lifespan,
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins,  # restricted to configured frontends
        allow_credentials=True,
        allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allow_headers=["Authorization", "Content-Type"],
    )

    @app.middleware("http")
    async def add_security_headers(request, call_next):
        response = await call_next(request)
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        response.headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=()"
        response.headers["Strict-Transport-Security"] = "max-age=63072000; includeSubDomains; preload"
        return response

    @app.get("/api/health", tags=["meta"])
    def health():
        return {"status": "ok", "service": "make-api", "version": app.version}

    app.include_router(public.router)
    app.include_router(contact.router)
    app.include_router(admin.router)
    app.include_router(uploads.router)
    return app


app = create_app()
