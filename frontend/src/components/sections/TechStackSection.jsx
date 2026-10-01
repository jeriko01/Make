import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Code2,
  Server,
  Database,
  Terminal,
  ArrowRight,
  Check,
  Copy,
  Layers,
  Sparkles,
  Shield,
  Zap,
} from 'lucide-react'
import Reveal from '../common/Reveal'

// Real production architecture files that a real developer writes
const ARCH_SNIPPETS = {
  compose: {
    filename: 'docker-compose.prod.yml',
    lang: 'yaml',
    code: `version: '3.8'

services:
  web:
    build:
      context: ./frontend
      target: production
    ports:
      - "80:80"
    restart: unless-stopped
    depends_on:
      - api

  api:
    build: ./backend
    command: uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
    environment:
      - DATABASE_URL=\${DATABASE_URL}
      - JWT_SECRET_KEY=\${JWT_SECRET_KEY}
    restart: unless-stopped
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres:16-alpine
    volumes:
      - pgdata:/var/lib/postgresql/data
    restart: always

volumes:
  pgdata:`,
  },
  deploy: {
    filename: 'deploy.sh',
    lang: 'bash',
    code: `#!/usr/bin/env bash
set -euo pipefail

echo "==> Running automated test suite"
pytest --cov=app --cov-fail-under=85
npm --prefix frontend run test:ci

echo "==> Building container images"
docker compose -f docker-compose.prod.yml build

echo "==> Running database migrations"
docker compose exec -T api alembic upgrade head

echo "==> Atomic zero-downtime service reload"
docker compose -f docker-compose.prod.yml up -d --no-deps web api

echo "==> Health check verified. Deployment complete."`,
  },
  schema: {
    filename: 'schema.sql',
    lang: 'sql',
    code: `-- Relational schema with Row-Level Security
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  title text not null,
  slug text unique not null,
  status text check (status in ('active', 'shipped', 'archived')),
  created_at timestamptz default now()
);

-- Enable RLS: Clients only query their own records
alter table public.projects enable row level security;

create policy "Users manage own projects"
  on public.projects
  for all using (auth.uid() = user_id);

create index idx_projects_slug on public.projects(slug);`,
  },
}

export default function TechStackSection() {
  const [activeSnippet, setActiveSnippet] = useState('compose')
  const [copied, setCopied] = useState(false)

  const copyCode = () => {
    navigator.clipboard.writeText(ARCH_SNIPPETS[activeSnippet].code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // 3 Real Human Architecture Layers
  const STACK_LAYERS = [
    {
      num: '01',
      title: 'Frontend & User Interface',
      badge: 'Client Layer',
      icon: Code2,
      tech: ['React 19', 'TypeScript', 'Tailwind CSS', 'Vite'],
      reason:
        'Fast, accessible single-page applications. Static bundles are pre-compiled and served via global CDN for near-instant first paint.',
    },
    {
      num: '02',
      title: 'Backend API & Business Logic',
      badge: 'Application Core',
      icon: Server,
      tech: ['Python', 'FastAPI', 'Pydantic v2', 'Uvicorn ASGI'],
      reason:
        'Asynchronous Python endpoints with automatic runtime type validation, interactive Swagger docs, and clean modular routers.',
    },
    {
      num: '03',
      title: 'Database & Persistence',
      badge: 'State & Storage',
      icon: Database,
      tech: ['PostgreSQL', 'Supabase', 'Redis', 'Row Level Security'],
      reason:
        'Strict relational integrity with foreign keys, transactional migrations, connection pooling, and database-level security policies.',
    },
  ]

  return (
    <section
      id="tech-stack"
      aria-label="Technical Architecture"
      className="section-pad bg-[#0e0e0e] border-t border-[#1e261d]"
    >
      <div className="container-page">

        {/* ── Section Header (Clean, Human & Centered) ── */}
        <div className="mx-auto max-w-2xl text-center mb-12">
          <Reveal>
            <p className="section-eyebrow-lime mb-2">Technical Architecture</p>
            <h2 className="section-heading">
              How I structure production systems
            </h2>
            <p className="mt-3.5 mx-auto max-w-xl text-base text-[#8a949e] leading-relaxed">
              No over-engineered bloat or speculative tools. Just proven, maintainable technologies that run dependably from day one.
            </p>
          </Reveal>
        </div>

        {/* ── Core Split: 3 Layers on Left + Real Code on Right ── */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">

          {/* Left Column: 3 Architectural Layers (7 cols) */}
          <div className="space-y-4 lg:col-span-7">
            {STACK_LAYERS.map((layer, i) => {
              const IconComp = layer.icon
              return (
                <Reveal key={layer.num} delay={i * 60}>
                  <div className="group rounded-xl border border-[#1e261d] bg-[#141714] p-5 sm:p-6 transition-all duration-200 hover:border-[#39A751]/40 hover:bg-[#161d15]">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#1e2b1a] border border-[#39A751]/30 text-[#52fe7d] transition group-hover:bg-[#39A751] group-hover:text-white">
                          <IconComp className="h-4 w-4" />
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] font-bold text-[#52fe7d]">
                              LAYER {layer.num}
                            </span>
                            <span className="text-[#1e261d]">·</span>
                            <span className="font-mono text-[10px] text-[#8a949e] uppercase">
                              {layer.badge}
                            </span>
                          </div>
                          <h3 className="font-display text-base font-bold text-white group-hover:text-[#52fe7d] transition-colors">
                            {layer.title}
                          </h3>
                        </div>
                      </div>
                    </div>

                    <p className="mt-3 text-xs sm:text-sm text-[#8a949e] leading-relaxed">
                      {layer.reason}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5 pt-3 border-t border-[#1e261d]/60">
                      {layer.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-[#1e261d] bg-[#0e0e0e] px-2.5 py-1 text-xs font-mono font-medium text-[#d2d7dc]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>

          {/* Right Column: Real Developer Architecture Blueprint (5 cols) */}
          <div className="lg:col-span-5">
            <Reveal delay={120}>
              <div className="rounded-xl border border-[#1e261d] bg-[#141714] overflow-hidden shadow-2xl">
                {/* Editor Header Bar */}
                <div className="flex items-center justify-between border-b border-[#1e261d] bg-[#0b0e0b] px-4 py-2.5">
                  {/* Traffic light dots */}
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ef4444]/60" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#eab308]/60" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#52fe7d]/80" />
                  </div>

                  {/* Tabs */}
                  <div className="flex items-center gap-1">
                    {[
                      { id: 'compose', label: 'docker' },
                      { id: 'deploy',  label: 'deploy.sh' },
                      { id: 'schema',  label: 'schema.sql' },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveSnippet(tab.id)}
                        className={`rounded px-2 py-0.5 font-mono text-[11px] transition ${
                          activeSnippet === tab.id
                            ? 'bg-[#1e261d] text-[#52fe7d] font-bold'
                            : 'text-[#8a949e] hover:text-white'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Copy button */}
                  <button
                    type="button"
                    onClick={copyCode}
                    aria-label="Copy snippet"
                    className="flex items-center gap-1 text-[11px] font-mono text-[#8a949e] hover:text-[#52fe7d] transition"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3 w-3 text-[#52fe7d]" />
                        <span className="text-[#52fe7d]">copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span>copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Code Body */}
                <div className="p-4 bg-[#0a0d0a] overflow-x-auto max-h-[380px] scrollbar-thin">
                  <div className="flex items-center gap-2 mb-2 pb-2 border-b border-[#1e261d]/40 text-[10px] font-mono text-[#8a949e]">
                    <Terminal className="h-3 w-3 text-[#52fe7d]" />
                    <span>{ARCH_SNIPPETS[activeSnippet].filename}</span>
                  </div>
                  <pre className="font-mono text-xs leading-relaxed text-[#d2d7dc]">
                    <code>{ARCH_SNIPPETS[activeSnippet].code}</code>
                  </pre>
                </div>

                {/* Card Footer: Real Engineering Philosophy */}
                <div className="p-4 border-t border-[#1e261d] bg-[#141714] text-xs text-[#8a949e] flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-[11px]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#52fe7d]" />
                    Production-tested configuration
                  </span>
                  <Link
                    to="/skills"
                    className="inline-flex items-center gap-1 font-semibold text-[#39A751] hover:text-[#52fe7d] transition text-[11px]"
                  >
                    <span>All skills</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>

        </div>

        {/* ── 3 Human Engineering Guarantees (Clean, Bottom Row) ── */}
        <Reveal delay={200}>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              {
                title: '100% Code Ownership',
                desc: 'Clean git repositories, documented environment variables, and zero proprietary lock-in.',
              },
              {
                title: 'Type Safety End-to-End',
                desc: 'Frontend TypeScript interfaces validate hand-in-hand with backend Pydantic models.',
              },
              {
                title: 'Automated CI/CD Workflows',
                desc: 'Every commit runs through automated linting, test suites, and atomic deployment hooks.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-[#1e261d] bg-[#141714]/60 p-4 transition hover:border-[#39A751]/30"
              >
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#39A751]" />
                  <h4 className="font-display text-xs font-bold text-white">{item.title}</h4>
                </div>
                <p className="mt-1.5 text-xs text-[#8a949e] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>

      </div>
    </section>
  )
}
