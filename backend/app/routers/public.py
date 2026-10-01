"""Public read-only endpoints.

Every endpoint returns ONLY published content. Contact messages are never
exposed here. These are the endpoints the React public site consumes.
"""
from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException

from ..deps import get_store
from ..store import Store

router = APIRouter(prefix="/api/public", tags=["public"])


def _published(store: Store, table: str, order: str = "display_order"):
    return store.list(table, published_only=True, order=order)


@router.get("/profile")
def get_profile(store: Store = Depends(get_store)):
    return store.get_singleton("profile")


@router.get("/hero")
def get_hero(store: Store = Depends(get_store)):
    return {
        **store.get_singleton("hero"),
        "stats": _published(store, "hero_stats"),
    }


@router.get("/about")
def get_about(store: Store = Depends(get_store)):
    return {
        "cards": _published(store, "about_cards"),
        "stats": _published(store, "about_stats"),
    }


@router.get("/experience")
def get_experience(store: Store = Depends(get_store)):
    return _published(store, "experience")


@router.get("/skills")
def get_skills(store: Store = Depends(get_store)):
    return {
        "categories": _published(store, "skill_categories"),
        "skills": _published(store, "skills"),
    }


@router.get("/projects")
def get_projects(store: Store = Depends(get_store)):
    return {
        "categories": _published(store, "project_categories"),
        "projects": _published(store, "projects"),
    }


@router.get("/projects/{slug}")
def get_project(slug: str, store: Store = Depends(get_store)):
    rows = store.list("projects", published_only=True, filters={"slug": slug})
    if not rows:
        raise HTTPException(status_code=404, detail="Project not found")
    return rows[0]


@router.get("/services")
def get_services(store: Store = Depends(get_store)):
    return _published(store, "services")


@router.get("/testimonials")
def get_testimonials(store: Store = Depends(get_store)):
    return _published(store, "testimonials")


@router.get("/social-links")
def get_social_links(store: Store = Depends(get_store)):
    return _published(store, "social_links")


@router.get("/contact-info")
def get_contact_info(store: Store = Depends(get_store)):
    return store.get_singleton("contact_info")


@router.get("/seo")
def get_seo(store: Store = Depends(get_store)):
    return store.get_singleton("seo_metadata")


@router.get("/bootstrap")
def bootstrap(store: Store = Depends(get_store)):
    """Everything the public site needs, in one request."""
    return {
        "profile": store.get_singleton("profile"),
        "hero": {**store.get_singleton("hero"), "stats": _published(store, "hero_stats")},
        "about": {
            "cards": _published(store, "about_cards"),
            "stats": _published(store, "about_stats"),
        },
        "experience": _published(store, "experience"),
        "skills": {
            "categories": _published(store, "skill_categories"),
            "skills": _published(store, "skills"),
        },
        "projects": {
            "categories": _published(store, "project_categories"),
            "projects": _published(store, "projects"),
        },
        "services": _published(store, "services"),
        "testimonials": _published(store, "testimonials"),
        "social_links": _published(store, "social_links"),
        "contact_info": store.get_singleton("contact_info"),
        "seo": store.get_singleton("seo_metadata"),
    }
