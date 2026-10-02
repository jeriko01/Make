"""Public contact form submission → stored privately in Supabase."""
from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, Request, status

from ..config import Settings, get_settings
from ..deps import get_store
from ..rate_limit import RateLimiter
from ..schemas import ContactMessageIn
from ..store import Store

router = APIRouter(prefix="/api", tags=["contact"])

# Built once at import; window/max come from settings at first use.
_limiter: RateLimiter | None = None


def _get_limiter(settings: Settings) -> RateLimiter:
    global _limiter
    if _limiter is None:
        _limiter = RateLimiter(
            settings.contact_rate_limit_max, settings.contact_rate_limit_window
        )
    return _limiter


import ipaddress


def _is_valid_ip(candidate: str) -> bool:
    try:
        ipaddress.ip_address(candidate)
        return True
    except (ValueError, TypeError):
        return False


def _client_ip(request: Request) -> str:
    cf = request.headers.get("cf-connecting-ip")
    if cf and _is_valid_ip(cf.strip()):
        return cf.strip()

    real = request.headers.get("x-real-ip")
    if real and _is_valid_ip(real.strip()):
        return real.strip()

    fwd = request.headers.get("x-forwarded-for")
    if fwd:
        first = fwd.split(",")[0].strip()
        if _is_valid_ip(first):
            return first

    if request.client and request.client.host and _is_valid_ip(request.client.host):
        return request.client.host
    return "127.0.0.1"


@router.post("/contact", status_code=status.HTTP_201_CREATED)
def submit_contact(
    payload: ContactMessageIn,
    request: Request,
    store: Store = Depends(get_store),
    settings: Settings = Depends(get_settings),
):
    # Honeypot: if the hidden field is filled, silently accept (don't tip off bots)
    # but do not store. The `website` field is validated to be empty by the schema;
    # a filled value never reaches here, so this is belt-and-suspenders.
    if payload.website:
        return {"ok": True}

    limiter = _get_limiter(settings)
    if not limiter.allow(_client_ip(request)):
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Too many messages. Please try again later.",
        )

    import html

    row = {
        "name": html.escape(payload.name.strip()),
        "email": str(payload.email).strip().lower(),
        "subject": html.escape(payload.subject.strip()),
        "message": html.escape(payload.message.strip()),
        "ip_address": _client_ip(request),
        "user_agent": request.headers.get("user-agent", "")[:500],
    }
    saved = store.insert("contact_messages", row)
    if not saved:
        # Never report success when the save failed.
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Could not save your message. Please try again.",
        )
    # We do NOT claim an email was sent — no email service is integrated.
    return {"ok": True, "message": "Thanks! Your message has been received."}
