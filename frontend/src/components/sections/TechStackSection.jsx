import { Link } from 'react-router-dom'
import {
  Globe,
  Server,
  Database,
  GitBranch,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Layers,
  Cpu,
  RefreshCw,
  Lock,
} from 'lucide-react'
import Reveal from '../common/Reveal'

export default function TechStackSection() {
  const CORE_TIERS = [
    {
      step: 'TIER 01',
      title: 'Frontend & Mobile Interface',
      tagline: 'React · TypeScript · Tailwind · Flutter',
      icon: Globe,
      desc: 'Component-driven, responsive client applications built with strict type safety, fluid motion, and edge-cached assets for near-instant first paint.',
      highlights: [
        'Strict end-to-end TypeScript types',
        'Mobile-first responsive fluid layouts',
        'Minimal bundle size with code-splitting',
      ],
    },
    {
      step: 'TIER 02',
      title: 'FastAPI Backend Core',
      tagline: 'Python · FastAPI · Async Uvicorn · REST',
      icon: Server,
      desc: 'Stateless, high-concurrency API service layer with automated OpenAPI contracts, modular routing, and strict runtime request validation.',
      highlights: [
        'Pydantic v2 data validation models',
        'Secure JWT authentication & CORS rules',
        'Asynchronous non-blocking I/O routines',
      ],
    },
    {
      step: 'TIER 03',
      title: 'Relational Data & Storage',
      tagline: 'PostgreSQL · Supabase · Redis Cache',
      icon: Database,
      desc: 'Resilient persistence with relational foreign key integrity, database-level Row-Level Security (RLS), and sub-millisecond in-memory caching.',
      highlights: [
        'Database-level Row-Level Security (RLS)',
        'Transactional database migrations',
        'Automated daily backups & pooling',
      ],
    },
  ]

  const PIPELINE_STEPS = [
    {
      num: '01',
      label: 'Version Control',
      tools: 'Git & Feature Branches',
      desc: 'Clean commit history with pull request reviews and branch protection.',
    },
    {
      num: '02',
      label: 'Automated Testing',
      tools: 'GitHub Actions CI',
      desc: 'Static linting, TypeScript compilation, and automated test passes on every push.',
    },
    {
      num: '03',
      label: 'Containerization',
      tools: 'Docker Lean Images',
      desc: 'Reproducible multi-stage container builds ensuring dev matches production.',
    },
    {
      num: '04',
      label: 'Zero-Downtime Deploy',
      tools: 'Cloud Edge & Vercel',
      desc: 'Atomic deployments with instant health checks and zero user disruption.',
    },
  ]

  return (
    <section
      id="tech-stack"
      aria-label="Technical Architecture & Engineering Stack"
      className="section-pad bg-[#0e0e0e] border-t border-[#1e261d]"
    >
      <div className="container-page">

        <div className="mx-auto max-w-2xl text-center mb-12">
          <Reveal>
            <p className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-[#52fe7d] lowercase mb-2">
              technical architecture
            </p>

            <h2 className="mt-3.5 section-heading">
              Disciplined engineering from frontend to database
            </h2>

            <p className="mt-3.5 mx-auto max-w-xl text-base text-[#8a949e] leading-relaxed">
              I design full-stack systems with clean boundaries, predictable state, and automated deployment pipelines that teams can easily maintain.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {CORE_TIERS.map((tier, i) => {
            const IconComp = tier.icon
            return (
              <Reveal key={tier.step} delay={i * 70}>
                <div className="group relative flex h-full flex-col justify-between rounded-2xl border border-[#1e261d] bg-[#141714] p-6 sm:p-7 transition-all duration-200 hover:-translate-y-1 hover:border-[#39A751]/50 hover:bg-[#161d15] hover:shadow-xl hover:shadow-[#39A751]/10">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold tracking-wider text-[#52fe7d]">
                        {tier.step}
                      </span>
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1e2b1a] border border-[#39A751]/30 text-[#52fe7d] transition group-hover:bg-[#39A751] group-hover:text-white">
                        <IconComp className="h-5 w-5" />
                      </span>
                    </div>

                    <h3 className="mt-5 font-display text-lg font-bold text-white group-hover:text-[#52fe7d] transition-colors">
                      {tier.title}
                    </h3>

                    <p className="mt-1 font-mono text-xs text-[#39A751] font-semibold">
                      {tier.tagline}
                    </p>

                    <p className="mt-3 text-xs sm:text-sm text-[#8a949e] leading-relaxed">
                      {tier.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-5 border-t border-[#1e261d] space-y-2.5">
                    {tier.highlights.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-xs text-[#d2d7dc]">
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#52fe7d]" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={240}>
          <div className="mt-12 rounded-2xl border border-[#1e261d] bg-[#141714] p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1e261d]">
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#52fe7d]">
                  CI/CD &amp; Release Workflow
                </span>
                <h3 className="mt-1 font-display text-base sm:text-lg font-bold text-white">
                  How code safely moves from development to production
                </h3>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-[#8a949e]">
                <span className="h-2 w-2 rounded-full bg-[#52fe7d] animate-pulse" />
                <span>Automated Release Pipeline</span>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {PIPELINE_STEPS.map((step) => (
                <div
                  key={step.num}
                  className="rounded-xl border border-[#1e261d] bg-[#0e0e0e] p-5 transition hover:border-[#39A751]/40"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm font-bold text-[#52fe7d]">
                      {step.num}
                    </span>
                    <span className="text-[10px] font-mono font-medium rounded bg-[#1e2b1a] px-2 py-0.5 text-[#52fe7d] border border-[#39A751]/30">
                      {step.tools}
                    </span>
                  </div>

                  <h4 className="mt-3 font-display text-sm font-bold text-white">
                    {step.label}
                  </h4>

                  <p className="mt-2 text-xs text-[#8a949e] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-5 border-t border-[#1e261d] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#8a949e]">
              <div className="flex flex-wrap items-center gap-6">
                <span className="flex items-center gap-2 text-[#d2d7dc]">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#52fe7d]" />
                  100% Code Ownership
                </span>
                <span className="flex items-center gap-2 text-[#d2d7dc]">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#52fe7d]" />
                  Documented Environment Config
                </span>
                <span className="flex items-center gap-2 text-[#d2d7dc]">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#52fe7d]" />
                  Zero Vendor Lock-In
                </span>
              </div>

              <Link
                to="/skills"
                className="inline-flex items-center gap-1.5 font-semibold text-[#39A751] hover:text-[#52fe7d] transition"
              >
                <span>View technical breakdown</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  )
}
