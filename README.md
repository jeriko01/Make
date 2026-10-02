# Make — Senior Web & Mobile Application Engineering Studio

A high-performance, dark-themed portfolio and client interaction platform built for **Make**, a Senior Web & Mobile Engineering Studio. Inspired by modern, high-contrast engineering aesthetics with neon-green accents, clear hierarchy, and production-grade code architecture.

![Make Studio Preview](frontend/public/images/og-image.jpg)

---

## 🌟 Highlights & Features

- **Signature Dark Aesthetic**: Sleek graphite backgrounds (`#0e0e0e`, `#141714`) with vibrant emerald-neon accents (`#39A751`, `#52fe7d`) and modern typography (Manrope + JetBrains Mono).
- **Interactive Project Planner**: Real-time project scope, timeline, and budget calculator built with vanilla React state.
- **Full-Stack Architecture**:
  - **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons, and React Router.
  - **Backend**: FastAPI (Python 3.12+), Pydantic v2, Uvicorn HTTPS dev server.
  - **Database Layer**: Dual-mode data access layer supporting Supabase (PostgreSQL + Auth + Storage) and in-memory development store with seed data.
- **Production Hardened**:
  - Full input sanitization and honeypot protection on contact forms.
  - Strict path traversal defenses and content-type validation for file uploads.
  - 100% test suite pass rate with comprehensive `pytest` coverage.
  - Responsive design across all mobile, tablet, and desktop breakpoints.

---

## 📁 Repository Structure

```text
Make/
├── backend/                  # FastAPI REST API
│   ├── app/
│   │   ├── routers/          # API endpoints (public, contact, admin, uploads)
│   │   ├── config.py         # Pydantic settings & environment configuration
│   │   ├── deps.py           # Dependency injection & store factories
│   │   ├── dev_seed.py       # Local development seed data
│   │   ├── main.py           # FastAPI application factory & CORS configuration
│   │   └── store.py          # Data access layer (Supabase / MemoryStore)
│   ├── tests/                # Pytest test suite (35+ test cases)
│   └── run_https.py          # Local HTTPS development server
├── frontend/                 # React + Vite application
│   ├── public/               # Static assets, favicon, and media assets
│   │   ├── favicon.svg       # Brand monogram SVG favicon
│   │   └── images/           # High-resolution project mockups & portrait
│   ├── src/
│   │   ├── components/       # Layout, UI components, and section modules
│   │   ├── context/          # SiteDataContext with fallback hydration
│   │   ├── lib/              # API fetch client
│   │   └── pages/            # Home, Skills, Services, About, Projects, Support, NotFound
│   ├── index.html            # SEO meta tags, Open Graph, and font preconnects
│   ├── tailwind.config.js    # Design tokens & color system
│   └── vite.config.js        # Vite build configuration & HTTPS proxy
└── Database/                 # Database schemas and migration scripts
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v18+) & **npm**
- **Python** (3.11+)

### 1. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will run at `https://localhost:5174/` (or `http://localhost:5173/`).

To build for production:
```bash
npm run build
```

### 2. Backend Setup

```bash
cd backend
python -m venv .venv
# Windows:
.venv\Scripts\activate
# macOS/Linux:
source .venv/bin/activate

pip install -r requirements.txt
python run_https.py
```

The backend API will run at `https://127.0.0.1:8000/`. You can view the OpenAPI interactive docs at `https://127.0.0.1:8000/docs`.

### 3. Run Backend Tests

```bash
pytest backend/tests
```

---

## 🛡️ Security & Quality

- **CORS restricted** to authorized origins.
- **Honeypot protection** on project inquiry and contact submission.
- **Input validation** powered by Pydantic models.
- **Accessible (a11y)**: Semantic HTML5, keyboard navigation, focus rings, and skip-to-content anchors.

---

## 📄 License

Private repository © Make Studio. All rights reserved.
