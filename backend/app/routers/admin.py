"""Admin (protected) endpoints: full CRUD, ordering, publish toggles.

EVERY route in this router depends on `get_current_admin`, which verifies the
Supabase JWT and admin authorization server-side. Unauthorized callers get
401/403 regardless of any client-side routing.
"""
# NOTE: deliberately NOT using `from __future__ import annotations` — the generic
# CRUD factory passes Pydantic model *classes* as runtime annotations, which
# stringized annotations would break (FastAPI can't resolve the forward ref).
from typing import Type

from fastapi import APIRouter, Body, Depends, HTTPException, status
from pydantic import BaseModel

from ..deps import get_current_admin, get_store
from ..schemas import (
    AboutCardIn,
    ContactInfoUpdate,
    ExperienceIn,
    HeroUpdate,
    LabeledStatIn,
    OrderUpdate,
    ProfileUpdate,
    ProjectCategoryIn,
    ProjectIn,
    SeoUpdate,
    ServiceIn,
    SkillCategoryIn,
    SkillIn,
    SocialLinkIn,
    TestimonialIn,
)
from ..store import Store

router = APIRouter(
    prefix="/api/admin",
    tags=["admin"],
    dependencies=[Depends(get_current_admin)],  # guard the whole router
)


# =====================================================================
# Overview
# =====================================================================
_COUNT_TABLES = [
    "projects", "experience", "skills", "services", "testimonials", "social_links",
]


@router.get("/overview")
def overview(store: Store = Depends(get_store)):
    counts = {t: len(store.list(t, order=None)) for t in _COUNT_TABLES}
    messages = store.list("contact_messages", order="created_at", desc=True)
    unread = sum(1 for m in messages if not m.get("is_read"))
    return {
        "counts": counts,
        "messages_total": len(messages),
        "messages_unread": unread,
        "recent_messages": messages[:5],
    }


# =====================================================================
# Generic collection CRUD factory
# =====================================================================
def register_crud(path: str, table: str, schema: Type[BaseModel]) -> None:
    """Register list/create/update/publish/delete/reorder for a collection."""

    @router.get(f"/{path}", name=f"list_{table}")
    def _list(store: Store = Depends(get_store)):
        return store.list(table, order="display_order")

    @router.post(f"/{path}", status_code=status.HTTP_201_CREATED, name=f"create_{table}")
    def _create(payload: schema = Body(...), store: Store = Depends(get_store)):  # type: ignore[valid-type]
        data = payload.model_dump(mode="json")
        created = store.insert(table, data)
        if not created:
            raise HTTPException(status_code=502, detail="Create failed.")
        return created

    # Register reorder BEFORE the /{row_id} routes so "reorder" isn't captured as an id.
    @router.put(f"/{path}/reorder", name=f"reorder_{table}")
    def _reorder(payload: OrderUpdate, store: Store = Depends(get_store)):
        for item in payload.items:
            store.update(table, item.id, {"display_order": item.display_order})
        return {"ok": True, "count": len(payload.items)}

    @router.put(f"/{path}/{{row_id}}", name=f"update_{table}")
    def _update(row_id: str, payload: schema = Body(...), store: Store = Depends(get_store)):  # type: ignore[valid-type]
        data = payload.model_dump(mode="json")
        updated = store.update(table, row_id, data)
        if not updated:
            raise HTTPException(status_code=404, detail="Not found.")
        return updated

    @router.patch(f"/{path}/{{row_id}}/publish", name=f"publish_{table}")
    def _publish(row_id: str, is_published: bool = Body(..., embed=True),
                 store: Store = Depends(get_store)):
        updated = store.update(table, row_id, {"is_published": is_published})
        if not updated:
            raise HTTPException(status_code=404, detail="Not found.")
        return updated

    @router.delete(f"/{path}/{{row_id}}", status_code=status.HTTP_204_NO_CONTENT,
                   name=f"delete_{table}")
    def _delete(row_id: str, store: Store = Depends(get_store)):
        if not store.delete(table, row_id):
            raise HTTPException(status_code=404, detail="Not found.")
        return None


# Register every ordered/publishable collection
register_crud("hero-stats", "hero_stats", LabeledStatIn)
register_crud("about-cards", "about_cards", AboutCardIn)
register_crud("about-stats", "about_stats", LabeledStatIn)
register_crud("experience", "experience", ExperienceIn)
register_crud("skill-categories", "skill_categories", SkillCategoryIn)
register_crud("skills", "skills", SkillIn)
register_crud("project-categories", "project_categories", ProjectCategoryIn)
register_crud("projects", "projects", ProjectIn)
register_crud("services", "services", ServiceIn)
register_crud("testimonials", "testimonials", TestimonialIn)
register_crud("social-links", "social_links", SocialLinkIn)


# =====================================================================
# Singletons
# =====================================================================
@router.get("/profile")
def get_profile(store: Store = Depends(get_store)):
    return store.get_singleton("profile")


@router.put("/profile")
def update_profile(payload: ProfileUpdate, store: Store = Depends(get_store)):
    return store.update_singleton("profile", payload.model_dump(mode="json", exclude_unset=True))


@router.get("/hero")
def get_hero(store: Store = Depends(get_store)):
    return store.get_singleton("hero")


@router.put("/hero")
def update_hero(payload: HeroUpdate, store: Store = Depends(get_store)):
    return store.update_singleton("hero", payload.model_dump(mode="json", exclude_unset=True))


@router.get("/contact-info")
def get_contact_info(store: Store = Depends(get_store)):
    return store.get_singleton("contact_info")


@router.put("/contact-info")
def update_contact_info(payload: ContactInfoUpdate, store: Store = Depends(get_store)):
    return store.update_singleton("contact_info", payload.model_dump(mode="json", exclude_unset=True))


@router.get("/seo")
def get_seo(store: Store = Depends(get_store)):
    return store.get_singleton("seo_metadata")


@router.put("/seo")
def update_seo(payload: SeoUpdate, store: Store = Depends(get_store)):
    return store.update_singleton("seo_metadata", payload.model_dump(mode="json", exclude_unset=True))


# =====================================================================
# Contact messages (private inbox)
# =====================================================================
@router.get("/messages")
def list_messages(store: Store = Depends(get_store)):
    return store.list("contact_messages", order="created_at", desc=True)


@router.patch("/messages/{row_id}/read")
def set_message_read(row_id: str, is_read: bool = Body(..., embed=True),
                     store: Store = Depends(get_store)):
    updated = store.update("contact_messages", row_id, {"is_read": is_read})
    if not updated:
        raise HTTPException(status_code=404, detail="Not found.")
    return updated


@router.delete("/messages/{row_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_message(row_id: str, store: Store = Depends(get_store)):
    if not store.delete("contact_messages", row_id):
        raise HTTPException(status_code=404, detail="Not found.")
    return None
