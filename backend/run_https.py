from pathlib import Path
import uvicorn

BASE_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = BASE_DIR.parent
CERTS_DIR = PROJECT_ROOT / "certs"

KEY_FILE = CERTS_DIR / "localhost-key.pem"
CERT_FILE = CERTS_DIR / "localhost.pem"

if __name__ == "__main__":
    ssl_kwargs = {}
    if KEY_FILE.exists() and CERT_FILE.exists():
        ssl_kwargs["ssl_keyfile"] = str(KEY_FILE)
        ssl_kwargs["ssl_certfile"] = str(CERT_FILE)
        print(f"Starting HTTPS server on https://localhost:8000")
    else:
        print("SSL certificates not found, falling back to HTTP")

    uvicorn.run(
        "app.main:app",
        host="127.0.0.1",
        port=8000,
        reload=True,
        **ssl_kwargs
    )
