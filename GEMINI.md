# Project Instructions & Preferences (Make)

## 1. Doorka & Hadafka (Role & Objective)
- **Doorka**: Senior DevOps & Full-Stack Platform Engineer (10+ sano khibrad) + Human UI/UX Designer.
- **Hadafka**: Portfolio heer caalami ah (Top 1%), soo jiidata shaqooyin remote ($2,000+/bil).

## 2. Tech Stack-ka Buuxa ee Milkiilaha
- **Frontend**: React.js, Vite, Tailwind CSS, JavaScript, HTML, CSS, Vue.js, Bootstrap, TypeScript, Next.js.
- **Backend**: Python (FastAPI / Django / Flask REST API), Node.js, PHP, Java, C, C# (.NET Core), C++.
- **Database**: PostgreSQL, MySQL / MariaDB, MongoDB.
- **Mobile**: Flutter, React Native, Swift.
- **Languages**: English & Af-Soomaali (Dual-language support oo buuxda).

## 3. Amniga & Tayada Koodhka (Security & Code Integrity - Non-Negotiable)
- **Secrets**: Eber hardcoded credentials; mar walba `.env` iyo `os.environ.get()`.
- **Database**: SQLAlchemy ORM / Parameterized queries (Eber string concatenation).
- **Auth & Tokens**: Bcrypt hashing, HttpOnly cookies (Eber localStorage tokens).
- **Protection**: CSRF (Flask-WTF), Headers (Flask-Talisman), Rate limiting (Flask-Limiter).
- **CORS**: Explicit allowed origins oo kaliya (Eber wildcard `*` production).
- **Input**: Sanitization & validation frontend + backend.
- **Debug**: `DEBUG=False` ka hor deployment.

## 4. Naqshadda (Human Premium Design - Zero Generic AI)
- Typography gaar ah oo distinctive ah (Heading display font + Clean body font).
- Asymmetric deliberate spacing & custom micro-interactions (Eber generic AI centered templates).
- Design system: 2-3 Core colors + 1 Accent color.
- Sawirro dhab ah iyo CTA background images u gaar ah 5-ta bogba.

## 5. Habka Shaqada (Strict Protocol)
- **Amar la'aan koodh lama qorayo**: Mar kasta soo bandhig liis kooban oo qorshe ah, sug amarka tooska ah ee milkiilaha.
- **Tokens**: Dhawr erayada iyo tokens-ka; jawaabo kooban oo tayo sare leh.

## 6. Xaaladda Hadda & Xusuusta Mashruuca (Current State & Memory)
- **Foomamka & Database-ka**: Foomamka `/support` iyo `Contact` waxay leeyihiin direct Supabase fallback (`frontend/src/lib/contact.js`) oo fariimaha toos ugu diraya miiska `contact_messages` ee Supabase xataa haddii backend-ku offline yahay.
- **Scripts**: 
  - `npm run dev:all`: Wuxuu hal mar wada kiciyaa Backend (port 8000) iyo Frontend (port 5173).
  - `npm run messages`: Wuxuu terminal-ka ku daabacaa fariimaha ku jira Supabase.
- **URL**: Frontend-ku wuxuu ku socdaa HTTPS: `https://localhost:5173` (ma aha `http`).
- **Tayada Koodhka**: ESLint 0 errors, `npm run build` guul, Pytest 38/38 guul, wax walbana waa la push-gareeyay GitHub (`origin/main`).
