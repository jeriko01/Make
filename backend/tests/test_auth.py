"""Server-side admin authorization is enforced regardless of the client."""

import pytest


ADMIN_WRITE_CALLS = [
    ("get", "/api/admin/overview", None),
    ("get", "/api/admin/projects", None),
    ("post", "/api/admin/projects", {"title": "X", "slug": "x", "platform": "web"}),
    ("put", "/api/admin/hero", {"headline": "Hi"}),
    ("get", "/api/admin/messages", None),
]


def _call(client, method, path, body, headers=None):
    kwargs = {}
    if headers:
        kwargs["headers"] = headers
    if body is not None:
        kwargs["json"] = body
    return getattr(client, method)(path, **kwargs)


@pytest.mark.parametrize("method,path,body", ADMIN_WRITE_CALLS)
def test_admin_requires_token(client, method, path, body):
    assert _call(client, method, path, body).status_code == 401  # no header


@pytest.mark.parametrize("method,path,body", ADMIN_WRITE_CALLS)
def test_admin_rejects_bad_token(client, method, path, body):
    r = _call(client, method, path, body, {"Authorization": "Bearer garbage"})
    assert r.status_code == 401


@pytest.mark.parametrize("method,path,body", ADMIN_WRITE_CALLS)
def test_authenticated_but_not_admin_forbidden(client, user_headers, method, path, body):
    r = _call(client, method, path, body, user_headers)
    assert r.status_code == 403  # valid user, not on allowlist


def test_admin_allowlist_allows(client, admin_headers):
    assert client.get("/api/admin/overview", headers=admin_headers).status_code == 200


def test_admin_role_metadata_allows(client):
    # user not on email allowlist but has app_metadata.role == "admin"
    r = client.get("/api/admin/overview", headers={"Authorization": "Bearer role-admin-token"})
    assert r.status_code == 200
