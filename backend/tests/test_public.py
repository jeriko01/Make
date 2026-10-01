"""Public endpoints return only published content and never leak messages."""


def test_health(client):
    r = client.get("/api/health")
    assert r.status_code == 200
    assert r.json()["status"] == "ok"


def test_public_projects_only_published(client, store):
    store.insert("projects", {"title": "Pub", "slug": "pub", "is_published": True,
                              "display_order": 1, "platform": "web"})
    store.insert("projects", {"title": "Draft", "slug": "draft", "is_published": False,
                              "display_order": 2, "platform": "web"})
    r = client.get("/api/public/projects")
    assert r.status_code == 200
    slugs = [p["slug"] for p in r.json()["projects"]]
    assert slugs == ["pub"]
    assert "draft" not in slugs


def test_public_project_by_slug_hides_unpublished(client, store):
    store.insert("projects", {"title": "Draft", "slug": "draft", "is_published": False,
                              "platform": "web"})
    assert client.get("/api/public/projects/draft").status_code == 404


def test_bootstrap_shape(client):
    r = client.get("/api/public/bootstrap")
    assert r.status_code == 200
    body = r.json()
    for key in ("profile", "hero", "about", "experience", "skills", "projects",
                "services", "testimonials", "social_links", "contact_info", "seo"):
        assert key in body


def test_no_public_message_endpoint(client, store):
    store.insert("contact_messages", {"name": "x", "email": "x@x.com",
                                      "subject": "s", "message": "m"})
    # There is no public route that returns messages.
    assert client.get("/api/public/messages").status_code == 404
    assert client.get("/api/public/contact_messages").status_code == 404
