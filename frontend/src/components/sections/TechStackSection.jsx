import Reveal from '../common/Reveal'
import { useSiteData } from '../../context/SiteDataContext'
import { ArrowRight, Code2, Database, Layers, Server, Smartphone } from 'lucide-react'
import { Link } from 'react-router-dom'

const CATEGORY_ICONS = {
  Frontend: Code2,
  Backend: Server,
  Data: Database,
  Mobile: Smartphone,
  Infrastructure: Layers,
}

export default function TechStackSection() {
  const { data } = useSiteData()
  const stack = data?.tech_stack || []

  if (stack.length === 0) return null

  return (
    <section
      id="tech-stack"
      aria-label="Technical solutions & technology stack"
      className="section-pad bg-[#0e0e0e] border-t border-[#1e261d]"
    >
      <div className="container-page">
        {/* Header */}
        <div className="max-w-2xl">
          <Reveal>
            <p className="section-eyebrow-lime">Technical Architecture</p>
            <h2 className="mt-3 section-heading">
              Applications, APIs, integrations & data
            </h2>
            <p className="mt-4 text-base text-[#d2d7dc] leading-relaxed">
              Curated tools selected for stability, developer speed, and long-term maintainability—not for resume stuffing.
            </p>
          </Reveal>
        </div>

        {/* Stack Layers */}
        <div className="mt-12 space-y-3">
          {stack.map((layer, i) => {
            const IconComp = CATEGORY_ICONS[layer.category] || Code2
            return (
              <Reveal key={layer.id} delay={i * 50}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-[#1e261d] bg-[#141714] p-5 transition hover:border-[#39A751]/40 hover:bg-[#161d15]">
                  <div className="flex items-center gap-3 w-48 shrink-0">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1e2b1a] border border-[#39A751]/30 text-[#52fe7d]">
                      <IconComp className="h-4 w-4" />
                    </span>
                    <span className="font-display text-sm font-bold uppercase tracking-wider text-white">
                      {layer.category}
                    </span>
                  </div>

                  {/* Pills */}
                  <div className="flex flex-wrap gap-2 flex-1 sm:justify-end">
                    {layer.items.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-lg border border-[#1e261d] bg-[#0e0e0e] px-3 py-1.5 text-xs font-mono font-medium text-[#d2d7dc] transition hover:border-[#39A751]/50 hover:text-white"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>

        {/* Architecture Flow Diagram (Technical Solutions) */}
        <Reveal delay={280}>
          <div className="mt-12 rounded-xl border border-[#1e261d] bg-[#141714] p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1e261d] pb-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#52fe7d]">
                  End-to-End System Pipeline
                </p>
                <h3 className="mt-1 font-display text-lg font-bold text-white">
                  How client screens, backend APIs, and database layers coordinate
                </h3>
              </div>
              <Link
                to="/skills"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#39A751] hover:text-[#52fe7d] transition"
              >
                <span>View full skills breakdown</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                {
                  title: '1. Frontend & Mobile UI',
                  tools: 'React · TypeScript · Tailwind · Flutter',
                  detail: 'Component-driven, responsive screens with strict TypeScript types, snappy client state, and WCAG AA accessibility.',
                },
                {
                  title: '2. FastAPI Service Layer',
                  tools: 'Python · FastAPI · Async REST',
                  detail: 'Stateless API routing, request validation via Pydantic, role-based JWT authentication, and structured error handling.',
                },
                {
                  title: '3. Data & Storage Tier',
                  tools: 'Supabase · PostgreSQL · Row Level Security',
                  detail: 'Relational data models with foreign key integrity, automated migrations, real-time subscriptions, and scalable indexes.',
                },
              ].map((tier) => (
                <div
                  key={tier.title}
                  className="relative rounded-lg border border-[#1e261d] bg-[#0e0e0e] p-5"
                >
                  <p className="font-display text-sm font-bold text-white">{tier.title}</p>
                  <p className="mt-1 font-mono text-[11px] text-[#52fe7d]">{tier.tools}</p>
                  <p className="mt-3 text-xs leading-relaxed text-[#8a949e]">{tier.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
