"""Pydantic models for request validation and typed responses."""
from __future__ import annotations

from datetime import date
from typing import Any, Literal, Optional

from pydantic import BaseModel, EmailStr, Field, HttpUrl, field_validator

# ---------------------------------------------------------------------
# Shared
# ---------------------------------------------------------------------
Platform = Literal["web", "android", "ios", "cross_platform"]
SkillType = Literal["language", "framework", "library", "database", "tool", "platform"]
ServiceSize = Literal["small", "medium", "large", "wide"]


class OrderUpdate(BaseModel):
    """Payload for reordering: list of {id, display_order}."""
    items: list["OrderItem"]


class OrderItem(BaseModel):
    id: str
    display_order: int


# ---------------------------------------------------------------------
# Profile / Hero / About singletons
# ---------------------------------------------------------------------
class ProfileUpdate(BaseModel):
    full_name: Optional[str] = Field(default=None, max_length=120)
    title: Optional[str] = Field(default=None, max_length=160)
    tagline: Optional[str] = Field(default=None, max_length=240)
    short_bio: Optional[str] = None
    long_bio: Optional[str] = None
    avatar_url: Optional[str] = None
    resume_url: Optional[str] = None
    location: Optional[str] = Field(default=None, max_length=160)
    email: Optional[str] = Field(default=None, max_length=254)
    years_experience_label: Optional[str] = Field(default=None, max_length=40)


class HeroUpdate(BaseModel):
    headline: Optional[str] = Field(default=None, max_length=200)
    subtitle: Optional[str] = Field(default=None, max_length=240)
    description: Optional[str] = None
    primary_cta_label: Optional[str] = Field(default=None, max_length=60)
    primary_cta_href: Optional[str] = Field(default=None, max_length=200)
    secondary_cta_label: Optional[str] = Field(default=None, max_length=60)
    secondary_cta_href: Optional[str] = Field(default=None, max_length=200)


class LabeledStatIn(BaseModel):
    label: str = Field(min_length=1, max_length=120)
    value: str = Field(min_length=1, max_length=120)
    display_order: int = 0
    is_published: bool = True


class AboutCardIn(BaseModel):
    icon: str = Field(default="Sparkles", max_length=60)
    title: str = Field(min_length=1, max_length=120)
    description: str = ""
    display_order: int = 0
    is_published: bool = True


# ---------------------------------------------------------------------
# Experience timeline
# ---------------------------------------------------------------------
class ExperienceIn(BaseModel):
    title: str = Field(min_length=1, max_length=160)
    organization: Optional[str] = Field(default=None, max_length=160)
    start_date: date
    end_date: Optional[date] = None
    is_current: bool = False
    description: str = ""
    tech_tags: list[str] = Field(default_factory=list)
    display_order: int = 0
    is_published: bool = True
    is_sample: bool = False

    @field_validator("end_date")
    @classmethod
    def end_after_start(cls, v, info):
        start = info.data.get("start_date")
        if v and start and v < start:
            raise ValueError("end_date must be on or after start_date")
        return v


# ---------------------------------------------------------------------
# Skills
# ---------------------------------------------------------------------
class SkillCategoryIn(BaseModel):
    name: str = Field(min_length=1, max_length=80)
    display_order: int = 0
    is_published: bool = True


class SkillIn(BaseModel):
    category_id: Optional[str] = None
    name: str = Field(min_length=1, max_length=80)
    type: SkillType = "tool"
    icon: Optional[str] = Field(default=None, max_length=60)
    proficiency: Optional[int] = Field(default=None, ge=0, le=100)
    experience_label: Optional[str] = Field(default=None, max_length=60)
    display_order: int = 0
    is_published: bool = True


# ---------------------------------------------------------------------
# Projects
# ---------------------------------------------------------------------
class ProjectCategoryIn(BaseModel):
    name: str = Field(min_length=1, max_length=80)
    slug: str = Field(min_length=1, max_length=80, pattern=r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
    display_order: int = 0
    is_published: bool = True


class MetricItem(BaseModel):
    label: str = Field(max_length=80)
    value: str = Field(max_length=80)


class ProjectIn(BaseModel):
    title: str = Field(min_length=1, max_length=160)
    slug: str = Field(min_length=1, max_length=160, pattern=r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
    category_id: Optional[str] = None
    platform: Platform = "web"
    summary: str = ""
    description: str = ""
    cover_image_url: Optional[str] = None
    gallery: list[str] = Field(default_factory=list)
    tech_tags: list[str] = Field(default_factory=list)
    metrics: Optional[list[MetricItem]] = None
    live_url: Optional[str] = None
    github_url: Optional[str] = None
    app_store_url: Optional[str] = None
    google_play_url: Optional[str] = None
    is_featured: bool = False
    is_published: bool = True
    display_order: int = 0


# ---------------------------------------------------------------------
# Services
# ---------------------------------------------------------------------
class ServiceIn(BaseModel):
    title: str = Field(min_length=1, max_length=120)
    description: str = ""
    icon: str = Field(default="Layers", max_length=60)
    size: ServiceSize = "medium"
    accent: str = Field(default="violet", max_length=40)
    display_order: int = 0
    is_published: bool = True


# ---------------------------------------------------------------------
# Testimonials
# ---------------------------------------------------------------------
class TestimonialIn(BaseModel):
    client_name: str = Field(min_length=1, max_length=120)
    role_company: Optional[str] = Field(default=None, max_length=160)
    quote: str = Field(min_length=1)
    rating: int = Field(default=5, ge=1, le=5)
    photo_url: Optional[str] = None
    metrics: Optional[str] = Field(default=None, max_length=160)
    display_order: int = 0
    is_published: bool = True
    is_sample: bool = False


# ---------------------------------------------------------------------
# Social links / contact info / SEO
# ---------------------------------------------------------------------
class SocialLinkIn(BaseModel):
    platform: str = Field(min_length=1, max_length=40)
    label: Optional[str] = Field(default=None, max_length=60)
    url: HttpUrl
    display_order: int = 0
    is_published: bool = True


class ContactInfoUpdate(BaseModel):
    email: Optional[str] = Field(default=None, max_length=254)
    location: Optional[str] = Field(default=None, max_length=160)
    availability: Optional[str] = Field(default=None, max_length=240)


class SeoUpdate(BaseModel):
    title: Optional[str] = Field(default=None, max_length=200)
    description: Optional[str] = Field(default=None, max_length=400)
    keywords: Optional[list[str]] = None
    og_image_url: Optional[str] = None
    canonical_url: Optional[str] = None
    twitter_handle: Optional[str] = Field(default=None, max_length=40)


# ---------------------------------------------------------------------
# Contact message (public submit)
# ---------------------------------------------------------------------
class ContactMessageIn(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    subject: str = Field(min_length=1, max_length=160)
    message: str = Field(min_length=1, max_length=5000)
    # Honeypot: must stay empty. Bots tend to fill every field.
    website: str = Field(default="", max_length=0)

    @field_validator("name", "subject", "message")
    @classmethod
    def not_blank(cls, v: str) -> str:
        if not v.strip():
            raise ValueError("must not be blank")
        return v.strip()


OrderUpdate.model_rebuild()
