"""Admin CRUD, and the end-to-end project lifecycle acceptance criterion."""


def test_project_lifecycle(client, admin_headers):
    """create -> publish -> visible publicly -> edit -> updated publicly -> unpublish/delete."""
    # create (unpublished)
    create = client.post(
        "/api/admin/projects",
        headers=admin_headers,
        json={"title": "Alpha", "slug": "alpha", "platform": "web",
              "summary": "v1", "is_published": False, "display_order": 1},
    )
    assert create.status_code == 201
    pid = create.json()["id"]

    # not visible publicly yet
    assert client.get("/api/public/projects/alpha").status_code == 404

    # publish
    pub = client.patch(f"/api/admin/projects/{pid}/publish",
                       headers=admin_headers, json={"is_published": True})
    assert pub.status_code == 200

    # visible publicly
    pubview = client.get("/api/public/projects/alpha")
    assert pubview.status_code == 200
    assert pubview.json()["summary"] == "v1"

    # edit
    edit = client.put(
        f"/api/admin/projects/{pid}",
        headers=admin_headers,
        json={"title": "Alpha", "slug": "alpha", "platform": "web",
              "summary": "v2", "is_published": True, "display_order": 1},
    )
    assert edit.status_code == 200

    # updated publicly
    assert client.get("/api/public/projects/alpha").json()["summary"] == "v2"

    # unpublish -> hidden
    client.patch(f"/api/admin/projects/{pid}/publish",
                 headers=admin_headers, json={"is_published": False})
    assert client.get("/api/public/projects/alpha").status_code == 404

    # delete
    assert client.delete(f"/api/admin/projects/{pid}", headers=admin_headers).status_code == 204
    assert client.get("/api/admin/projects", headers=admin_headers).json() == []


def test_reorder(client, admin_headers, store):
    a = client.post("/api/admin/services", headers=admin_headers,
                    json={"title": "A", "display_order": 1}).json()
    b = client.post("/api/admin/services", headers=admin_headers,
                    json={"title": "B", "display_order": 2}).json()
    r = client.put("/api/admin/services/reorder", headers=admin_headers,
                   json={"items": [{"id": a["id"], "display_order": 5},
                                   {"id": b["id"], "display_order": 1}]})
    assert r.status_code == 200
    ordered = [s["title"] for s in client.get("/api/public/services").json()]
    assert ordered == ["B", "A"]


def test_experience_date_validation(client, admin_headers):
    r = client.post("/api/admin/experience", headers=admin_headers,
                    json={"title": "Bad", "start_date": "2024-01-01",
                          "end_date": "2023-01-01"})
    assert r.status_code == 422


def test_overview_counts_and_messages(client, admin_headers, store):
    store.insert("projects", {"title": "P", "slug": "p", "platform": "web"})
    store.insert("contact_messages", {"name": "n", "email": "n@n.com",
                                      "subject": "s", "message": "m", "is_read": False})
    r = client.get("/api/admin/overview", headers=admin_headers)
    assert r.status_code == 200
    body = r.json()
    assert body["counts"]["projects"] == 1
    assert body["messages_unread"] == 1
    assert len(body["recent_messages"]) == 1


def test_message_read_and_delete(client, admin_headers, store):
    m = store.insert("contact_messages", {"name": "n", "email": "n@n.com",
                                          "subject": "s", "message": "m"})
    mid = m["id"]
    upd = client.patch(f"/api/admin/messages/{mid}/read",
                       headers=admin_headers, json={"is_read": True})
    assert upd.status_code == 200 and upd.json()["is_read"] is True
    assert client.delete(f"/api/admin/messages/{mid}", headers=admin_headers).status_code == 204


def test_upload_requires_admin(client):
    # multipart without auth -> 401
    r = client.post("/api/admin/uploads",
                    files={"file": ("x.png", b"\x89PNG", "image/png")})
    assert r.status_code == 401


def test_upload_rejects_bad_type(client, admin_headers):
    r = client.post("/api/admin/uploads", headers=admin_headers,
                    files={"file": ("x.txt", b"hello", "text/plain")})
    assert r.status_code == 415


def test_upload_ok(client, admin_headers):
    r = client.post("/api/admin/uploads?folder=projects", headers=admin_headers,
                    files={"file": ("x.png", b"\x89PNGdata", "image/png")})
    assert r.status_code == 201
    assert r.json()["url"].startswith("https://fake.storage/media/projects/")


def test_upload_rejects_spoofed_magic_bytes(client, admin_headers):
    r = client.post("/api/admin/uploads?folder=projects", headers=admin_headers,
                    files={"file": ("bad.jpg", b"NOT_A_REAL_JPEG", "image/jpeg")})
    assert r.status_code == 400
    assert "Invalid JPEG signature" in r.json()["detail"]


def test_upload_rejects_svg_with_script(client, admin_headers):
    svg_payload = b'<svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script></svg>'
    r = client.post("/api/admin/uploads?folder=projects", headers=admin_headers,
                    files={"file": ("xss.svg", svg_payload, "image/svg+xml")})
    assert r.status_code == 400
    assert "active script" in r.json()["detail"]


def test_delete_rejects_traversal_path(client, admin_headers):
    r = client.delete("/api/admin/uploads?path=../secret.txt", headers=admin_headers)
    assert r.status_code == 400
    assert "Invalid file path" in r.json()["detail"]
