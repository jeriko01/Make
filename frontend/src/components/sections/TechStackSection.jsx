import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Globe,
  Server,
  Database,
  GitBranch,
  ShieldCheck,
  Zap,
  Activity,
  Cpu,
  Layers,
  ArrowRight,
  Terminal,
  CheckCircle2,
  Lock,
  Cloud,
} from 'lucide-react'
import Reveal from '../common/Reveal'

/**
 * Technical Architecture & DevOps Engineering Section.
 * Designed with high-density compact elegance, real system telemetry,
 * and containerized multi-tier cloud pipelines.
 */
export default function TechStackSection() {
  const [activeTab, setActiveTab] = useState('pipeline')

  // 4 Core Architecture Pillars (DevOps & Systems Engineering)
  const ARCH_PILLARS = [
    {
      id: 'edge',
      layer: '01 / EDGE & CLIENT',
      title: 'Global Delivery & UI',
      icon: Globe,
      status: 'HTTP/3 · Anycast',
      metrics: 'TTFB < 45ms',
      tech: ['React 19', 'TypeScript', 'Tailwind', 'Cloudflare CDN', 'Flutter'],
      desc: 'Component-driven frontends delivered through geo-distributed edge caching with instant cache invalidation and Brotli compression.',
    },
    {
      id: 'compute',
      layer: '02 / COMPUTE & APIS',
      title: 'Async Service Core',
      icon: Server,
      status: 'ASGI · Containerized',
      metrics: 'P99 < 80ms',
      tech: ['Python 3.12', 'FastAPI', 'Docker OCI', 'Pydantic v2', 'Uvicorn'],
      desc: 'High-throughput stateless API services with automatic OpenAPI documentation, schema validation, and horizontal auto-scaling.',
    },
    {
      id: 'data',
      layer: '03 / DATA & STORAGE',
      title: 'Resilient Persistence',
      icon: Database,
      status: 'ACID · Auto-WAL',
      metrics: '0 Data Loss',
      tech: ['PostgreSQL', 'Supabase', 'Redis Cache', 'pgvector', 'RLS Auth'],
      desc: 'Relational data integrity with strict foreign keys, automated point-in-time recovery, connection pooling, and Row-Level Security.',
    },
    {
      id: 'devops',
      layer: '04 / GITOPS & CI/CD',
      title: 'Continuous Deployment',
      icon: GitBranch,
      status: 'Zero-Downtime',
      metrics: '100% Automated',
      tech: ['GitHub Actions', 'Docker Compose', 'Sentry APM', 'Linux', 'Vercel'],
      desc: 'GitOps workflow: static analysis, end-to-end linting, unit testing, immutable Docker images, and atomic blue/green rollouts.',
    },
  ]

  // Tabbed Architecture Deep Dive Details
  const DEEP_DIVES = {
    pipeline: {
      title: 'Live End-to-End System Pipeline',
      badge: 'REQUEST LIFECYCLE',
      steps: [
        {
          num: '01',
          name: 'Client Edge DNS',
          tag: 'Cloudflare / Vercel',
          detail: 'TLS 1.3 handshake, DDoS mitigation, and global edge-cached static assets.',
        },
        {
          num: '02',
          name: 'FastAPI Gateway',
          tag: 'Async Python Core',
          detail: 'JWT authentication verification, rate-limiting, and Pydantic payload parsing.',
        },
        {
          num: '03',
          name: 'Postgres & Redis',
          tag: 'Supabase / Relational',
          detail: 'Sub-millisecond query execution, connection pooler, and encrypted state persistence.',
        },
      ],
    },
    cicd: {
      title: 'Zero-Downtime CI/CD & Automation Workflow',
      badge: 'GITOPS PIPELINE',
      steps: [
        {
          num: '01',
          name: 'Git Commit & Gate',
          tag: 'GitHub Actions',
          detail: 'Automated ESLint, TypeScript compilation, Pytest suite, and security vulnerability scans.',
        },
        {
          num: '02',
          name: 'Container Build',
          tag: 'Docker OCI Image',
          detail: 'Multi-stage lean Docker builds, cached layer optimization, and artifact hashing.',
        },
        {
          num: '03',
          name: 'Atomic Rollout',
          tag: 'Blue/Green Deploy',
          detail: 'Zero-downtime production transition with automated health check verification & instant fallback.',
        },
      ],
    },
    security: {
      title: 'Defense-in-Depth Cloud Security Model',
      badge: 'SECURITY HARDENING',
      steps: [
        {
          num: '01',
          name: 'Identity & Access',
          tag: 'OAuth2 / JWT / RLS',
          detail: 'Strict database Row-Level Security ensuring zero unauthorized cross-tenant data leaks.',
        },
        {
          num: '02',
          name: 'Network & Perimeter',
          tag: 'Strict CORS · SSL A+',
          detail: 'Hardened HTTP response headers (CSP, HSTS), sanitized inputs, and parameterized queries.',
        },
        {
          num: '03',
          name: 'APM & Audit Logs',
          tag: 'Sentry · Telemetry',
          detail: 'Real-time crash diagnostics, structured JSON logging, and anomaly error alerts.',
        },
      ],
    },
  }

  const currentDive = DEEP_DIVES[activeTab]

  return (
    <section
      id="tech-stack"
      aria-label="Technical Architecture & DevOps Engineering"
      className="section-pad bg-[#0e0e0e] border-t border-[#1e261d]"
    >
      <div className="container-page">

        {/* ── Section Header (Centered & Harmonious) ── */}
        <div className="mx-auto max-w-2xl text-center mb-10">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#39A751]/30 bg-[#1e2b1a] px-3.5 py-1 text-xs font-bold tracking-widest text-[#52fe7d]">
              <Cpu className="h-3.5 w-3.5" />
              <span>DEVOPS &amp; TECHNICAL ARCHITECTURE</span>
            </div>

            <h2 className="mt-3.5 section-heading">
              Engineered for resilience, performance &amp; scale
            </h2>

            <p className="mt-3.5 mx-auto max-w-xl text-sm sm:text-base text-[#8a949e] leading-relaxed">
              From code commit to global edge delivery. A modular, containerized multi-tier ecosystem designed with zero-downtime CI/CD pipelines and automated cloud infrastructure.
            </p>
          </Reveal>
        </div>

        {/* ── DevOps Live Telemetry Strip (Compact Command HUD) ── */}
        <Reveal delay={60}>
          <div className="mb-8 overflow-hidden rounded-xl border border-[#1e261d] bg-[#141714]">
            <div className="grid grid-cols-2 divide-x divide-y divide-[#1e261d] md:grid-cols-4 md:divide-y-0">
              {[
                { label: 'System Uptime SLA', val: '99.98%', status: 'Operational', icon: Activity, dot: 'bg-[#52fe7d]' },
                { label: 'Global Edge TTFB', val: '< 45ms', status: 'Anycast Cached', icon: Zap, dot: 'bg-[#39A751]' },
                { label: 'Deployment Pipeline', val: 'Automated', status: 'CI/CD OCI Build', icon: GitBranch, dot: 'bg-[#52fe7d]' },
                { label: 'Security & Auth', val: 'TLS 1.3 + RLS', status: 'Hardened Layer', icon: ShieldCheck, dot: 'bg-[#39A751]' },
              ].map((m) => {
                const IconC = m.icon
                return (
                  <div key={m.label} className="p-4 sm:p-5 flex flex-col justify-between">
                    <div className="flex items-center justify-between text-xs text-[#8a949e]">
                      <span className="font-mono text-[11px] uppercase tracking-wider">{m.label}</span>
                      <IconC className="h-3.5 w-3.5 text-[#52fe7d]" />
                    </div>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">{m.val}</span>
                    </div>
                    <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-[#52fe7d]/80 font-mono">
                      <span className={`h-1.5 w-1.5 rounded-full ${m.dot} animate-pulse`} />
                      <span>{m.status}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </Reveal>

        {/* ── 4 Architecture Pillars (Compact & High-Tech) ── */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ARCH_PILLARS.map((col, i) => {
            const IconComp = col.icon
            return (
              <Reveal key={col.id} delay={80 + i * 50}>
                <div className="group relative flex h-full flex-col justify-between rounded-xl border border-[#1e261d] bg-[#141714] p-5 transition-all duration-200 hover:-translate-y-1 hover:border-[#39A751]/50 hover:bg-[#161d15] hover:shadow-lg hover:shadow-[#39A751]/10">
                  <div>
                    {/* Header line */}
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#52fe7d]">
                        {col.layer}
                      </span>
                      <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#1e2b1a] border border-[#39A751]/30 text-[#52fe7d] transition group-hover:bg-[#39A751] group-hover:text-white">
                        <IconComp className="h-3.5 w-3.5" />
                      </span>
                    </div>

                    <h3 className="mt-3 font-display text-base font-bold text-white group-hover:text-[#52fe7d] transition-colors">
                      {col.title}
                    </h3>

                    <p className="mt-2 text-xs leading-relaxed text-[#8a949e]">
                      {col.desc}
                    </p>
                  </div>

                  {/* Tech stack badges */}
                  <div className="mt-4 pt-3.5 border-t border-[#1e261d]">
                    <div className="flex flex-wrap gap-1.5">
                      {col.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-[#1e261d] bg-[#0e0e0e] px-2 py-0.5 text-[10px] font-mono text-[#d2d7dc] transition group-hover:border-[#39A751]/30"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-[#52fe7d]/80">
                      <span>{col.status}</span>
                      <span className="text-[#8a949e]">{col.metrics}</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>

        {/* ── Interactive Architecture Pipeline Terminal Inspector ── */}
        <Reveal delay={260}>
          <div className="mt-8 rounded-xl border border-[#1e261d] bg-[#141714] p-5 sm:p-7">
            {/* Top Toolbar: Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1e261d] pb-4">
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-[#52fe7d]" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                  DevOps Pipeline Inspector
                </span>
              </div>

              {/* Tab Selector Buttons */}
              <div className="flex items-center gap-1.5 rounded-lg border border-[#1e261d] bg-[#0e0e0e] p-1">
                {[
                  { id: 'pipeline', label: 'End-to-End Flow' },
                  { id: 'cicd',     label: 'CI/CD Automation' },
                  { id: 'security', label: 'Security & Auth' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`rounded-md px-3 py-1 text-xs font-mono font-medium transition ${
                      activeTab === tab.id
                        ? 'bg-[#39A751] text-white shadow-sm'
                        : 'text-[#8a949e] hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Current Active Deep Dive Content */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <span className="font-display text-sm font-bold text-white">
                  {currentDive.title}
                </span>
                <span className="rounded-full border border-[#39A751]/30 bg-[#1e2b1a] px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#52fe7d]">
                  {currentDive.badge}
                </span>
              </div>

              {/* 3 Step Pipeline Cards */}
              <div className="grid gap-3 md:grid-cols-3">
                {currentDive.steps.map((st) => (
                  <div
                    key={st.num}
                    className="relative rounded-lg border border-[#1e261d] bg-[#0e0e0e]/80 p-4 transition hover:border-[#39A751]/40"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[#52fe7d]">
                        STAGE {st.num}
                      </span>
                      <span className="rounded bg-[#141714] border border-[#1e261d] px-2 py-0.5 font-mono text-[10px] text-[#8a949e]">
                        {st.tag}
                      </span>
                    </div>

                    <h4 className="mt-2 font-display text-xs font-bold text-white">
                      {st.name}
                    </h4>

                    <p className="mt-1.5 text-[11px] leading-relaxed text-[#8a949e]">
                      {st.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Footer Note */}
            <div className="mt-6 pt-4 border-t border-[#1e261d] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#8a949e]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#52fe7d]" />
                <span>Production environments audited with OWASP Top 10 guidelines &amp; zero-trust principles.</span>
              </div>

              <Link
                to="/skills"
                className="inline-flex items-center gap-1.5 font-semibold text-[#39A751] hover:text-[#52fe7d] transition"
              >
                <span>Full Technical Breakdown</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  )
}
