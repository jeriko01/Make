"""Contact form: validation, honeypot, rate limiting, private storage."""


def _payload(**over):
    base = {"name": "Ada", "email": "ada@example.com",
            "subject": "Hello", "message": "I'd like to work with you."}
    base.update(over)
    return base


def test_valid_submission_stored(client, store):
    r = client.post("/api/contact", json=_payload())
    assert r.status_code == 201
    assert r.json()["ok"] is True
    msgs = store.list("contact_messages", order=None)
    assert len(msgs) == 1
    assert msgs[0]["email"] == "ada@example.com"
    assert msgs[0]["is_read"] is False


def test_invalid_email_rejected(client):
    r = client.post("/api/contact", json=_payload(email="not-an-email"))
    assert r.status_code == 422


def test_blank_message_rejected(client):
    r = client.post("/api/contact", json=_payload(message="   "))
    assert r.status_code == 422


def test_honeypot_blocks_storage(client, store):
    # A filled honeypot fails schema validation (max_length=0) -> 422, nothing stored.
    r = client.post("/api/contact", json=_payload(website="http://spam"))
    assert r.status_code == 422
    assert store.list("contact_messages", order=None) == []


def test_rate_limit(client):
    # Test settings allow 3 per window.
    for _ in range(3):
        assert client.post("/api/contact", json=_payload()).status_code == 201
    r = client.post("/api/contact", json=_payload())
    assert r.status_code == 429
