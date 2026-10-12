import { useNavigate, Link } from 'react-router-dom'
import {
  ArrowRight,
  CheckCircle2,
  Globe,
  Zap,
  LayoutDashboard,
  Smartphone,
  Server,
  Shield,
  Clock,
  Star,
  Users,
  Cloud,
  Database,
  Lock,
  GitBranch,
  FileCode,
  Terminal,
} from 'lucide-react'
import { SiteDataProvider } from '../context/SiteDataContext'
import { useLanguage } from '../context/LanguageContext'
import PageLayout from '../components/layout/PageLayout'
import Reveal from '../components/common/Reveal'
import CollaborateCTA from '../components/sections/CollaborateCTA'
import ProjectPlanner from '../components/sections/ProjectPlanner'

/**
 * 6 Core Platform-Grade Services with Authentic Engineering Specifications.
 * Uses strictly the primary brand color palette (#38BDF8 / #0284C7).
 */
const PLATFORM_SERVICES = [
  {
    id: 'cloud-devops',
    slug: 'devops',
    icon: Cloud,
    badge: 'Infrastructure',
    badgeSo: 'Kaabayaasha',
    title: 'Cloud Infrastructure & DevOps CI/CD',
    titleSo: 'Kaabayaasha Cloud-ka & Dhuumaha CI/CD',
    timeline: '1–2 Weeks',
    desc: 'Automated CI/CD deployment pipelines, containerized Docker microservices, secure Nginx reverse proxies, and hardened Linux server architectures.',
    descSo: 'Dhuumaha CI/CD oo otomaatig ah, containerization (Docker), Nginx reverse proxy, iyo nidaamka server-yada Linux oo ammaan ah.',
    deliverables: [
      'Automated GitHub Actions CI/CD workflows',
      'Multi-stage Dockerfile & Compose orchestration',
      'SSL/TLS, firewall rules & Nginx security headers',
      'Automated health check endpoints & telemetry',
    ],
    deliverablesSo: [
      'Dhuumaha GitHub Actions oo otomaatig ah',
      'Dockerfile multi-stage ah & Docker Compose',
      'Shahaadooyinka SSL, firewalls & Nginx headers',
      'Monitoring toos ah & warbixinnada xaaladda server-ka',
    ],
    stack: ['Docker', 'Linux', 'GitHub Actions', 'Nginx'],
  },
  {
    id: 'fullstack-web',
    slug: 'web-development',
    icon: LayoutDashboard,
    badge: 'Modern Web',
    badgeSo: 'Web Casri ah',
    title: 'High-Performance Web Platforms & SaaS',
    titleSo: 'Nidaamyada Web-ka & Barnaamijyada SaaS',
    timeline: '2–4 Weeks',
    desc: 'Responsive web applications built with React, TypeScript, and Vite. Architected with systematic design tokens, sub-second loads, and rich interactions.',
    descSo: 'Codsiyo web ah oo casri ah oo ku dhisan React, TypeScript, iyo Vite. Xawaare ka yar ilbiriqsi, naqshad responsive ah, iyo ammaan sare.',
    deliverables: [
      'Modular, type-safe React 18 component tree',
      'Strict TypeScript compile-time contract safety',
      'Tailwind CSS design token system & dark mode',
      'Full SEO semantic architecture & WCAG compliance',
    ],
    deliverablesSo: [
      'Koodh modular ah oo React 18 & TypeScript ah',
      'Amniga noocyada koodhka oo eber qalad ah',
      'Design system xawaare leh & dark mode dhammaystiran',
      'Dhisme SEO u hoggaansan & marin-u-helid WCAG',
    ],
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
  },
  {
    id: 'backend-apis',
    slug: 'api-development',
    icon: Server,
    badge: 'Backend Core',
    badgeSo: 'Matoorka API',
    title: 'Resilient Backend & API Microservices',
    titleSo: 'Matoorrada API & Nidaamyada Server-ka',
    timeline: '2–3 Weeks',
    desc: 'Asynchronous Python (FastAPI / Flask) and Node.js backend engines. Sub-50ms latency, strict Pydantic validation, and robust token authentication.',
    descSo: 'Matoorro API ah oo xawaare sare leh (FastAPI, Python, Node.js). Jawaabo ka yar 50ms, xaqiijin adag oo Pydantic ah, iyo JWT authentication.',
    deliverables: [
      'Sub-50ms asynchronous REST / WebSocket endpoints',
      'Automated OpenAPI Swagger interactive documentation',
      'Bcrypt token authentication & RBAC authorization',
      'Rate limiting, CORS guards & SQL injection defense',
    ],
    deliverablesSo: [
      'API-yo xawaare sare leh (< 50ms P99 latency)',
      'Dukumiintiyada tooska ah ee Swagger/OpenAPI',
      'Xaqiijinta isticmaalaha (JWT & RBAC)',
      'Xayiraadda saxmadda (Rate limiting) & ilaalinta xogta',
    ],
    stack: ['FastAPI', 'Python', 'Node.js', 'REST / gRPC'],
  },
  {
    id: 'database-persistence',
    slug: 'database',
    icon: Database,
    badge: 'Data Layer',
    badgeSo: 'Kaydka Xogta',
    title: 'Database Architecture & Performance Caching',
    titleSo: 'Qaab-dhismeedka Xogta & Caching Xawaare Leh',
    timeline: '1–2 Weeks',
    desc: 'ACID-compliant PostgreSQL and Supabase schemas with optimized indexing, Row-Level Security, in-memory Redis caching, and safe migrations.',
    descSo: 'Nidaamyada PostgreSQL iyo Supabase oo leh indexing qotodheer, Row-Level Security (RLS), Redis caching, iyo maamulka migrations-ka.',
    deliverables: [
      'Normalized relational schemas with strict constraints',
      'B-Tree and GIN indexing for sub-10ms query execution',
      'Row-Level Security (RLS) policies for multitenancy',
      'Automated database backup pipelines & audit logs',
    ],
    deliverablesSo: [
      'Qaab-dhismeed xogeed oo habaysan oo leh xeerar adag',
      'Indexing qoto-dheer oo queries-ka ka dhiga < 10ms',
      'Row-Level Security (RLS) oo ilaaliya xogta qof kasta',
      'Nuqullo keyd ah oo otomaatig ah (Backups) & audit logs',
    ],
    stack: ['PostgreSQL', 'Supabase', 'Redis', 'SQLAlchemy'],
  },
  {
    id: 'mobile-engineering',
    slug: 'mobile-development',
    icon: Smartphone,
    badge: 'Mobile Native',
    badgeSo: 'Mobile-ka',
    title: 'Cross-Platform Mobile Engineering',
    titleSo: 'Codsiyada Mobile-ka (iOS & Android)',
    timeline: '3–5 Weeks',
    desc: 'Native-feel iOS and Android mobile applications built with Flutter or React Native. Offline-first local synchronization, 60fps animations, and native device bridges.',
    descSo: 'App-yada mobile-ka ee Flutter iyo React Native. 60fps animations debecsan, kayd offline ah, iyo xiriir toos ah oo la leh qalabka taleefanka.',
    deliverables: [
      'Single shared codebase deploying to App Store & Google Play',
      'Offline-first SQLite/Hive local data persistence',
      'Push notifications, camera & biometric hardware APIs',
      'Fluid gesture animations optimized for 60fps/120fps displays',
    ],
    deliverablesSo: [
      'Koodh midaysan oo u baxaya App Store & Google Play',
      'Kaydka taleefanka ee offline-ka ah (SQLite/Room)',
      'Fariimaha push notifications, camera, iyo biometric auth',
      'Dhaqdhaqaaqyo debecsan oo ku socda 60fps/120fps',
    ],
    stack: ['Flutter', 'React Native', 'Swift', 'Kotlin'],
  },
  {
    id: 'security-refactoring',
    slug: 'security-audit',
    icon: Shield,
    badge: 'Hardening',
    badgeSo: 'Amniga & Tayada',
    title: 'Security Hardening & Code Modernization',
    titleSo: 'Xoojinta Amniga & Casriyaynta Koodhka',
    timeline: '1–2 Weeks',
    desc: 'Comprehensive code audits, vulnerability remediation against OWASP Top 10, database index optimization, and legacy refactoring into modern stacks.',
    descSo: 'Baaris qoto-dheer oo koodhka lagu sameeyo, xiridda godadka amniga ee OWASP, dardargelinta database-ka, iyo casriyaynta nidaamyada duugoobay.',
    deliverables: [
      'Full OWASP Top 10 static & dynamic code vulnerability report',
      'Database query profiling & bottleneck resolution',
      'Zero-downtime architectural refactoring roadmaps',
      'Automated test coverage implementation & linting rules',
    ],
    deliverablesSo: [
      'Warbixin buuxda oo ku saabsan amniga koodhka (OWASP)',
      'Hagaajinta queries-ka gaabiya & xallinta culeyska',
      'Qorshe casriyayn oo eber joogsi ah (Zero-downtime)',
      'Tijaabooyin koodh oo otomaatig ah (Automated tests)',
    ],
    stack: ['OWASP', 'Pytest', 'ESLint', 'Profiling Tools'],
  },
]

/* ── Service Engineering Card — Clean Human Design (Brand Color Only) ── */
function ServiceEngineeringCard({ service, index }) {
  const { lang } = useLanguage()
  const navigate = useNavigate()
  const IconComp = service.icon || Globe

  const title = lang === 'so' ? service.titleSo : service.title
  const desc = lang === 'so' ? service.descSo : service.desc
  const badge = lang === 'so' ? service.badgeSo : service.badge
  const deliverables = lang === 'so' ? service.deliverablesSo : service.deliverables

  return (
    <Reveal delay={index * 60}>
      <article
        className="group relative flex h-full flex-col justify-between rounded-2xl border border-[#1E2C4A] bg-[#0A0F1A] p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#38BDF8]/60 hover:bg-[#0D1424] hover:shadow-[0_8px_32px_-8px_rgba(56,189,248,0.18)]"
      >
        {/* Subtle top-edge accent line */}
        <div
          className="absolute top-0 left-6 right-6 h-[2px] rounded-full bg-[#38BDF8] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />

        <div>
          {/* Header: Number + Icon + Badge */}
          <div className="flex items-start justify-between gap-3 mb-5">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#1E2C4A] bg-[#06080E] text-[#38BDF8] transition-all duration-300 group-hover:border-[#38BDF8]/50 group-hover:bg-[#0284C7]/15">
                <IconComp className="h-[18px] w-[18px]" />
              </span>
              <span className="font-display text-[28px] sm:text-[32px] font-black leading-none tracking-tight select-none text-[#1E2C4A] group-hover:text-[#38BDF8]/30 transition-colors">
                0{index + 1}
              </span>
            </div>

            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md text-[#38BDF8] bg-[#38BDF8]/10 border border-[#38BDF8]/20">
              {badge}
            </span>
          </div>

          {/* Title */}
          <h2 className="font-display text-[17px] sm:text-lg font-bold leading-snug text-white transition-colors duration-200 group-hover:text-[#38BDF8]">
            {title}
          </h2>

          {/* Description */}
          <p className="mt-2.5 text-[12.5px] sm:text-[13px] leading-[1.7] text-[#94A3B8] group-hover:text-[#CBD5E1] transition-colors duration-200">
            {desc}
          </p>

          {/* Deliverables */}
          <div className="mt-5 pt-4 border-t border-[#1E2C4A]/60">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#38BDF8] mb-3">
              {lang === 'so' ? 'Waxyaabaha La Wareejinayo' : 'Production Deliverables'}
            </p>
            <ul className="space-y-2" aria-label="Key deliverables">
              {deliverables.map((d) => (
                <li key={d} className="flex items-start gap-2.5 text-[12px] text-[#CBD5E1]">
                  <CheckCircle2 className="mt-[2px] h-3.5 w-3.5 shrink-0 text-[#38BDF8]" />
                  <span className="leading-snug">{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer: Stack + Timeline + CTA */}
        <div className="mt-6 pt-4 border-t border-[#1E2C4A]/60">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <div className="flex flex-wrap gap-1.5">
              {service.stack.map((t) => (
                <span
                  key={t}
                  className="text-[9px] font-medium px-2 py-[3px] rounded-md bg-[#06080E] border border-[#1E2C4A] text-[#94A3B8] tracking-wide group-hover:text-white transition-colors"
                >
                  {t}
                </span>
              ))}
            </div>
            <span className="text-[10px] font-bold tracking-wide text-[#38BDF8]">
              {service.timeline}
            </span>
          </div>

          <button
            type="button"
            onClick={() => navigate(`/support?service=${service.slug}`)}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-[12px] font-bold tracking-wider uppercase border border-[#1E2C4A] bg-[#06080E] text-[#38BDF8] transition-all duration-200 hover:border-[#38BDF8] hover:bg-[#0284C7] hover:text-white active:scale-[0.99]"
            aria-label={`Select ${title}`}
          >
            <span>{lang === 'so' ? 'Dooro Adeeggan' : 'Select Service'}</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>
      </article>
    </Reveal>
  )
}

function ServicesContent() {
  const { lang } = useLanguage()

  // 3 Clear Collaboration Engagement Models — unified to brand color
  const models = [
    {
      id: '01',
      title: lang === 'so' ? 'Qorshe Go\'an oo Milestones leh' : 'Milestone-Based Fixed Scope',
      desc:
        lang === 'so'
          ? 'Ku habboon dhisidda MVPs cusub ama features gaar ah. Wax kasta waxay leeyihiin waqti cayiman, miisaaniyad go\'an, iyo ballanqaad eber cillad ah.'
          : 'Ideal for greenfield MVPs and defined product releases. Clear architectural milestones, fixed delivery timelines, and zero scope drift.',
      badge: lang === 'so' ? 'Ugu Caansan' : 'Most Popular',
      icon: Star,
      timeline: '2–6 Weeks',
    },
    {
      id: '02',
      title: lang === 'so' ? 'Sprints 2-Toddobaad ah (Agile)' : '2-Week Dedicated Sprints',
      desc:
        lang === 'so'
          ? 'Wada-shaqeyn toos ah oo lala dhex galo kooxdaada si degdeg loogu dhiso features adag, API integrations, iyo xallinta arrimaha backend-ka.'
          : 'Embedded sprint collaboration directly alongside your team to build complex full-stack features, optimize architecture, and accelerate release cycles.',
      badge: null,
      icon: Clock,
      timeline: 'Sprint-Based',
    },
    {
      id: '03',
      title: lang === 'so' ? 'La-talin & Ilaalinta Kaabayaasha' : 'Fractional DevOps & Advisory',
      desc:
        lang === 'so'
          ? 'Ilaalinta joogtada ah ee nidaamka: la socodka culeyska server-yada, updates-ka amniga, hagaajinta database-ka, iyo la-talinta qaab-dhismeedka.'
          : 'Ongoing technical guardianship: latency optimization, security patch deployment, zero-downtime database upgrades, and senior architectural guidance.',
      badge: null,
      icon: Users,
      timeline: 'Monthly Retainer',
    },
  ]

  // 6 Engineering Guarantees
  const guarantees = [
    {
      title: lang === 'so' ? '100% Lahaanshaha Koodhka' : '100% Code & IP Ownership',
      desc:
        lang === 'so'
          ? 'Koodhka oo dhan, keydadka, iyo dukumiintiyada si toos ah ayaa lagugu wareejinayaa.'
          : 'Full source code, repositories, and IP ownership transferred cleanly on delivery.',
      icon: FileCode,
    },
    {
      title: lang === 'so' ? 'Eber Vendor Lock-In' : 'Zero Vendor Lock-In',
      desc:
        lang === 'so'
          ? 'Habab furan (Docker, Linux, standard SQL) oo aad meel kasta ku shaqaysiin karto.'
          : 'Open-standard architectures ensuring total freedom to host on any cloud provider.',
      icon: GitBranch,
    },
    {
      title: lang === 'so' ? 'Amniga Heerka OWASP' : 'OWASP Top 10 Security',
      desc:
        lang === 'so'
          ? 'Ilaalinta koodhka ka dhanka ah SQL injection, CSRF, XSS, iyo nidaamyo xaqiijin ah oo adag.'
          : 'Strict sanitization, parameterized queries, CSRF defenses, and secure authentication.',
      icon: Shield,
    },
    {
      title: lang === 'so' ? 'Koodh Nadiif ah & Dukumiinti' : 'Structured Documentation',
      desc:
        lang === 'so'
          ? 'README faahfaahsan, dukumiintiyada API-ga (Swagger), iyo sharraxaad buuxda.'
          : 'Comprehensive README guides, interactive Swagger/OpenAPI schemas, and clean setup scripts.',
      icon: Terminal,
    },
    {
      title: lang === 'so' ? 'Dhuumaha CI/CD oo Dhan' : 'Automated CI/CD Delivery',
      desc:
        lang === 'so'
          ? 'Deploy-ga waxaa lagu maamulaa dhuumo otomaatig ah oo hubiya tests-ka.'
          : 'Automated testing and linting pipelines verify every commit before production.',
      icon: Zap,
    },
    {
      title: lang === 'so' ? 'Taageero Post-Launch ah' : 'Post-Launch Support Window',
      desc:
        lang === 'so'
          ? 'Waqti taageero ah oo lagu xaqiijinayo in nidaamku si deggan u socdo.'
          : 'Dedicated monitoring window following deployment to guarantee production stability.',
      icon: Lock,
    },
  ]

  return (
    <>
      {/* ── SECTION 1: HERO — Perfectly Centered, Responsive on All Devices ── */}
      <section className="relative min-h-[540px] sm:min-h-[600px] overflow-hidden border-b border-[#1E2C4A] bg-[#06080E] pt-28 sm:pt-36 pb-16 sm:pb-24">
        <img
          src="/images/services-hero-bg.jpg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="pointer-events-none absolute inset-0 bg-[#06080E]/60 backdrop-blur-[1px]" />

        <div className="container-page relative z-10 mx-auto max-w-4xl text-center px-4 sm:px-6">
          <Reveal>
            {/* Main Headline — Centered */}
            <h1 className="font-display text-[2rem] sm:text-[2.8rem] lg:text-[3.4rem] font-black leading-[1.12] tracking-tight text-white">
              {lang === 'so' ? (
                <>
                  Nidaamyo la dhisay in ay u adkeystaan{' '}
                  <span className="text-[#38BDF8]">culeyska dhabta ah.</span>
                </>
              ) : (
                <>
                  Systems built to survive{' '}
                  <span className="text-[#38BDF8]">real-world pressure.</span>
                </>
              )}
            </h1>

            {/* Subtext — Centered */}
            <p className="mt-5 mx-auto max-w-2xl text-[14px] sm:text-[16px] leading-[1.75] text-[#CBD5E1]">
              {lang === 'so'
                ? 'Laga bilaabo kaabayaasha Cloud-ka ilaa APIs-ka xawaaraha sare leh. Koodh nadiif ah, eber vendor lock-in, iyo lahaansho buuxda.'
                : 'From cloud infrastructure and CI/CD pipelines to high-throughput APIs and modern applications. Clean architecture, zero vendor lock-in, full IP handover.'}
            </p>

            {/* CTA Buttons — Strictly Side-by-Side (______  ______) Matching Home */}
            <div className="mt-8 flex flex-row items-center justify-center gap-3 w-auto flex-nowrap">
              <Link
                to="/support"
                className="btn-lime text-center whitespace-nowrap"
              >
                <span>{lang === 'so' ? 'Codso Adeeg' : 'Request a Service'}</span>
                <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/projects"
                className="btn-outline text-center whitespace-nowrap"
              >
                <span>{lang === 'so' ? 'Eeg Mashaariicda' : 'View Case Studies'}</span>
              </Link>
            </div>

            {/* Commitment Metrics — Centered Horizontal Grid */}
            <div className="mt-12 sm:mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 border-t border-[#1E2C4A] pt-8 max-w-3xl mx-auto">
              {[
                { value: '100%', label: lang === 'so' ? 'Lahaanshaha Koodhka' : 'IP Ownership', icon: FileCode },
                { value: 'OWASP', label: lang === 'so' ? 'Ammaan Hubin' : 'Security Standard', icon: Shield },
                { value: 'Docker', label: lang === 'so' ? 'Eber Lock-In' : 'Zero Lock-In', icon: GitBranch },
                { value: '2-Week', label: lang === 'so' ? 'Agile Sprints' : 'Agile Sprints', icon: Zap },
              ].map((m) => (
                <div key={m.value} className="flex flex-col items-center justify-center text-center p-2">
                  <div className="flex items-center gap-1.5 mb-1">
                    <m.icon className="h-4 w-4 text-[#38BDF8] shrink-0" />
                    <span className="font-display text-lg sm:text-xl font-black text-white tracking-tight leading-none">
                      {m.value}
                    </span>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-[#94A3B8] font-semibold">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SECTION 2: 6 PLATFORM-GRADE ENGINEERING SERVICES ── */}
      <section className="py-20 sm:py-28 bg-[#06080E]" aria-label="Services Catalog">
        <div className="container-page">
          <Reveal>
            <div className="mb-14 max-w-2xl text-center mx-auto">
              <h2 className="font-display text-2xl sm:text-3xl lg:text-[2.2rem] font-bold text-white tracking-tight leading-snug">
                {lang === 'so' ? 'Lix adeeg oo farsamo oo gaar ah' : 'Six focused engineering engagements'}
              </h2>
              <p className="mt-3 text-sm text-[#94A3B8] leading-relaxed max-w-lg mx-auto">
                {lang === 'so'
                  ? 'Adeeg kasta wuxuu wataa deliverables cad, qalabka farsamada, iyo waqtiga uu qaato.'
                  : 'Each service is a structured engagement with verified deliverables and transparent scope. Select one to begin.'}
              </p>
            </div>
          </Reveal>

          {/* Service Cards Grid */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PLATFORM_SERVICES.map((service, i) => (
              <ServiceEngineeringCard key={service.id} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: ENGAGEMENT MODELS — Clean Human Design (Brand Color Only) ── */}
      <section className="py-20 sm:py-24 bg-[#070A12] border-t border-[#1E2C4A]" aria-label="Engagement models">
        <div className="container-page">
          <Reveal>
            <div className="mb-14 max-w-2xl text-center mx-auto">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                {lang === 'so' ? 'Saddex qaab oo iskaashi ah' : 'Three engagement models'}
              </h2>
              <p className="mt-2.5 text-sm text-[#94A3B8] leading-relaxed max-w-lg mx-auto">
                {lang === 'so'
                  ? 'Loo habeeyay si waafaqsan waqtigaaga, miisaaniyaddaada, iyo culeyska mashruucaaga.'
                  : 'Structured to match your release milestones, team composition, and technical complexity.'}
              </p>
            </div>
          </Reveal>

          {/* Engagement cards — Stacked layout */}
          <div className="space-y-4 max-w-4xl mx-auto">
            {models.map((m, i) => {
              const IconComp = m.icon
              return (
                <Reveal key={m.id} delay={i * 60}>
                  <div
                    className="group relative grid grid-cols-1 md:grid-cols-[auto_1fr_auto] items-center gap-5 md:gap-8 rounded-2xl border border-[#1E2C4A] bg-[#0A0F1A] p-6 sm:p-7 transition-all duration-300 hover:border-[#38BDF8]/60 hover:bg-[#0D1424] hover:shadow-[0_4px_28px_-8px_rgba(56,189,248,0.15)]"
                  >
                    {/* Left: Number + Icon */}
                    <div className="flex items-center gap-4">
                      <span className="font-display text-[28px] font-black leading-none tracking-tight select-none text-[#1E2C4A] group-hover:text-[#38BDF8]/40 transition-colors">
                        {m.id}
                      </span>
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#1E2C4A] bg-[#06080E] text-[#38BDF8] group-hover:border-[#38BDF8]/40 group-hover:bg-[#0284C7]/15 transition-all">
                        <IconComp className="h-5 w-5" />
                      </span>
                    </div>

                    {/* Center: Title + Desc */}
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                        <h3 className="font-display text-base sm:text-lg font-bold text-white group-hover:text-[#38BDF8] transition-colors">
                          {m.title}
                        </h3>
                        {m.badge && (
                          <span className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#38BDF8] bg-[#38BDF8]/10 border border-[#38BDF8]/25">
                            <Star className="h-2.5 w-2.5" />
                            {m.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[12.5px] sm:text-[13px] leading-[1.65] text-[#94A3B8] group-hover:text-[#CBD5E1] transition-colors max-w-2xl">
                        {m.desc}
                      </p>
                    </div>

                    {/* Right: Timeline chip */}
                    <div className="flex items-center">
                      <span className="text-[10px] font-bold tracking-wider px-3 py-1.5 rounded-lg border border-[#38BDF8]/20 bg-[#38BDF8]/5 text-[#38BDF8] whitespace-nowrap">
                        {m.timeline}
                      </span>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: ENGINEERING GUARANTEES — Clean Grid ── */}
      <section className="py-20 sm:py-24 bg-[#06080E] border-t border-[#1E2C4A]" aria-label="Engineering guarantees">
        <div className="container-page">
          <Reveal>
            <div className="mx-auto mb-12 max-w-xl text-center">
              <h2 className="font-display text-2xl sm:text-[1.85rem] font-bold text-white tracking-tight leading-snug">
                {lang === 'so' ? 'Had iyo jeer ku jira mashruuc kasta' : 'Guaranteed on every single project'}
              </h2>
            </div>
          </Reveal>

          <div className="mx-auto max-w-4xl grid gap-x-6 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
            {guarantees.map((g, i) => {
              const IconComponent = g.icon
              return (
                <Reveal key={g.title} delay={i * 45}>
                  <div className="group flex items-start gap-3.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0D1424] border border-[#1E2C4A] text-[#38BDF8] shrink-0 group-hover:border-[#38BDF8]/60 transition-colors">
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="text-[13px] font-bold text-white leading-snug group-hover:text-[#38BDF8] transition-colors">
                        {g.title}
                      </h3>
                      <p className="mt-1 text-[11.5px] text-[#94A3B8] leading-[1.6] group-hover:text-[#CBD5E1] transition-colors">
                        {g.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 5: INTERACTIVE PROJECT PLANNER ESTIMATOR ── */}
      <ProjectPlanner />

      {/* ── SECTION 6: CTA ── */}
      <CollaborateCTA
        mainHeading={
          lang === 'so'
            ? 'Ma u baahan tahay nidaam farsamo oo gaar ah?'
            : 'Need a custom platform engineered?'
        }
        body={
          lang === 'so'
            ? 'Haddii aad dhisayso MVP cusub ama aad baaxad gelinayso nidaam jira, waxaan kuu dhisayaa software adag oo u hoggaansan hadafkaaga ganacsi.'
            : 'Whether architecting a new cloud application from scratch or modernizing existing services, I engineer reliable software tailored to your production roadmap.'
        }
        bgImage="/images/cta-services-bg.jpg"
        primaryBtnText={lang === 'so' ? 'Bilow Hadda' : 'Get Started'}
        primaryBtnTo="/support"
        secondaryBtnText={lang === 'so' ? 'Xirfadaha' : 'View Stack'}
        secondaryBtnTo="/skills"
      />
    </>
  )
}

export default function Services() {
  const { lang } = useLanguage()

  return (
    <SiteDataProvider>
      <PageLayout
        title={lang === 'so' ? 'Adeegyada Injineernimada' : 'Services & Architecture'}
        description={
          lang === 'so'
            ? 'Adeegyada DevOps & Software Engineering: Cloud Infrastructure, CI/CD, React Web Apps, FastAPI Backend, iyo Mobile Engineering.'
            : 'Platform & software engineering services: Cloud Infrastructure, CI/CD, React Web Apps, FastAPI Backend, and Mobile Engineering.'
        }
      >
        <ServicesContent />
      </PageLayout>
    </SiteDataProvider>
  )
}
