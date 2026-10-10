import os
import sys
from pathlib import Path
from supabase import create_client

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

# Read from backend/.env or environment variables
env_file = Path(__file__).resolve().parent.parent / "backend" / ".env"
env_vars = {}
if env_file.exists():
    for line in env_file.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            k, v = line.split("=", 1)
            env_vars[k.strip()] = v.strip().strip("'\"")

url = os.environ.get("SUPABASE_URL") or env_vars.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY") or env_vars.get("SUPABASE_SERVICE_ROLE_KEY")

if not url or not key:
    print("Khalad: SUPABASE_URL ama SUPABASE_SERVICE_ROLE_KEY lagama helin backend/.env")
    sys.exit(1)

c = create_client(url, key)

try:
    rows = c.table("contact_messages").select("*").order("created_at", desc=True).execute().data
    print(f"\n>>> SUPABASE CONTACT MESSAGES: {len(rows)} fariimood ayaa ku jira miiska <<<\n" + "=" * 60)
    if not rows:
        print("Miisku hadda waa maran yahay (0 fariimo).")
    for i, r in enumerate(rows, 1):
        print(f"[{i}] Magaca:   {r.get('name')}")
        print(f"    Email:    {r.get('email')}")
        print(f"    Subject:  {r.get('subject')}")
        print(f"    Fariinta: {r.get('message')}")
        print(f"    Waqtiga:  {r.get('created_at')}")
        print("-" * 60)
except Exception as e:
    print(f"Khalad: {e}")
