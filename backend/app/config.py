"""Application configuration, loaded from environment / .env."""
from __future__ import annotations

from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env", env_file_encoding="utf-8", extra="ignore"
    )

    # Supabase
    supabase_url: str = Field(default="", alias="SUPABASE_URL")
    supabase_service_role_key: str = Field(default="", alias="SUPABASE_SERVICE_ROLE_KEY")
    supabase_anon_key: str = Field(default="", alias="SUPABASE_ANON_KEY")
    supabase_storage_bucket: str = Field(default="media", alias="SUPABASE_STORAGE_BUCKET")

    # Admin authorization
    admin_emails: str = Field(default="", alias="ADMIN_EMAILS")

    # CORS
    frontend_origins: str = Field(
        default="https://localhost:5173,https://127.0.0.1:5173,http://localhost:5173,http://127.0.0.1:5173",
        alias="FRONTEND_ORIGINS",
    )

    # Contact rate limiting
    contact_rate_limit_max: int = Field(default=5, alias="CONTACT_RATE_LIMIT_MAX")
    contact_rate_limit_window: int = Field(default=3600, alias="CONTACT_RATE_LIMIT_WINDOW")

    # Uploads
    max_upload_mb: int = Field(default=5, alias="MAX_UPLOAD_MB")

    environment: str = Field(default="development", alias="ENVIRONMENT")

    # ---- derived helpers ----
    @property
    def admin_email_set(self) -> set[str]:
        return {e.strip().lower() for e in self.admin_emails.split(",") if e.strip()}

    @property
    def cors_origins(self) -> list[str]:
        return [o.strip() for o in self.frontend_origins.split(",") if o.strip()]

    @property
    def is_supabase_configured(self) -> bool:
        return bool(self.supabase_url and self.supabase_service_role_key)


@lru_cache
def get_settings() -> Settings:
    return Settings()
