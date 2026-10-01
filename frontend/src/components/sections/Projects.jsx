import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ExternalLink, Github, ArrowRight, Filter, AlertTriangle } from 'lucide-react'
import { useSiteData } from '../../context/SiteDataContext'
import Reveal from '../common/Reveal'

const FILTER_TABS = [
  { id: 'all',       label: 'All' },
  { id: 'web',       label: 'Web' },
  { id: 'mobile',    label: 'Mobile' },
  { id: 'fullstack', label: 'Full-Stack' },
]

export default function Projects({ featured = false, limit, showFilters = !featured }) {
  const { data } = useSiteData()
  const [activeFilter, setActiveFilter] = useState('all')

  const projects = useMemo(() => {
    let list = data?.projects?.projects || []
    if (featured) {
      // In featured mode, prioritize featured items or show available work
      const feat = list.filter((p) => p.is_featured && !p.is_placeholder)
      if (feat.length > 0) {
        list = feat
      }
    }
    if (activeFilter !== 'all') {
      list = list.filter((p) => p.category_id === activeFilter || p.platform === activeFilter)
    }
    if (limit) list = list.slice(0, limit)
    return list
  }, [data, featured, activeFilter, limit])

  const allProjects = data?.projects?.projects || []
  const hasPlaceholders = allProjects.some((p) => p.is_placeholder)

  return (
    <section
      id="projects"
      aria-label={featured ? 'Featured projects' : 'Project gallery'}
      className="section-pad bg-[#0e0e0e] border-t border-[#1e261d]"
    >
      <div className="container-page">

        {/* Section Heading */}
        <div className="max-w-2xl">
          <Reveal>
            <p className="section-eyebrow-lime">
              {featured ? 'Selected Work' : 'Portfolio'}
            </p>
            <h2 className="mt-3 section-heading">
              {featured ? 'Featured applications' : 'Technical project gallery'}
            </h2>
            <p className="mt-4 text-base text-[#d2d7dc] leading-relaxed">
              Real projects built with modern frontend and backend architectures. No inflated metrics or speculative numbers.
            </p>
          </Reveal>
        </div>

        {/* Editable placeholder notification if applicable */}
        {!featured && hasPlaceholders && (
          <Reveal delay={60}>
            <div className="mt-6 flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-950/20 p-4">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
              <div>
                <p className="text-sm font-semibold text-amber-200">Custom case studies placeholder</p>
                <p className="mt-0.5 text-xs text-amber-300/80">
                  Update <code className="font-mono text-[#52fe7d]">SiteDataContext.jsx</code> or the backend database to showcase verified live case studies.
                </p>
              </div>
            </div>
          </Reveal>
        )}

        {/* Filter tabs (projects page) */}
        {showFilters && (
          <Reveal delay={80}>
            <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2">
              <Filter className="h-4 w-4 shrink-0 text-[#8a949e] mr-1" />
              {FILTER_TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveFilter(tab.id)}
                  className={`shrink-0 rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${
                    activeFilter === tab.id
                      ? 'bg-[#39A751] text-white shadow-md shadow-[#39A751]/20'
                      : 'border border-[#1e261d] bg-[#141714] text-[#d2d7dc] hover:border-[#39A751]/40 hover:text-white'
                  }`}
                  aria-pressed={activeFilter === tab.id}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </Reveal>
        )}

        {/* Project grid */}
        {projects.length === 0 ? (
          <Reveal delay={100}>
            <div className="mt-10 rounded-2xl border border-[#1e261d] bg-[#141714] p-12 text-center">
              <p className="font-display text-lg font-bold text-white">
                Projects will appear here once verified.
              </p>
              <p className="mt-2 text-sm text-[#8a949e]">
                Have a specific project requirement in mind? Reach out to discuss direct architectural fit.
              </p>
              <Link
                to="/support"
                className="mt-6 btn-lime inline-flex items-center gap-2"
              >
                <span>Start a project inquiry</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <Reveal key={p.id} delay={i * 60}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        )}

        {/* Home page "View all" link */}
        {featured && (
          <Reveal delay={200}>
            <div className="mt-10 text-center sm:text-left">
              <Link
                to="/projects"
                className="btn-outline inline-flex items-center gap-2 text-sm"
              >
                <span>View all projects in gallery</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}

function ProjectCard({ project: p }) {
  const hasCover = !!p.cover_image_url && !p.is_placeholder
  const links = [
    p.live_url && { href: p.live_url, label: 'Live Demo', Icon: ExternalLink },
    p.github_url && { href: p.github_url, label: 'Source', Icon: Github },
  ].filter(Boolean)

  return (
    <article className="group flex h-full flex-col justify-between overflow-hidden rounded-xl border border-[#1e261d] bg-[#141714] transition-all duration-200 hover:-translate-y-1 hover:border-[#39A751]/40 hover:shadow-xl hover:shadow-[#39A751]/10">
      <div>
        {/* Cover / Placeholder visual */}
        <div className="relative aspect-video overflow-hidden bg-[#000000] border-b border-[#1e261d]">
          {hasCover ? (
            <img
              src={p.cover_image_url}
              alt={`${p.title} preview`}
              loading="lazy"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="relative flex h-full w-full flex-col items-center justify-center p-6 text-center select-none">
              <div className="absolute inset-0 grid-bg-dark opacity-50" />
              <span className="relative z-10 font-display text-base font-extrabold tracking-tight text-white/40">
                {p.title}
              </span>
              <span className="relative z-10 mt-1 inline-flex items-center gap-1 rounded border border-[#1e261d] bg-[#161d15] px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-[#52fe7d]">
                {p.platform || 'Full-Stack'}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-display text-lg font-bold text-white group-hover:text-[#52fe7d] transition-colors">
              {p.title}
            </h3>
          </div>

          <p className="mt-2.5 text-xs leading-relaxed text-[#8a949e]">
            {p.summary || p.description}
          </p>

          {/* Tech tags */}
          {p.tech_tags?.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {p.tech_tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-[#1e261d] bg-[#161d15] px-2 py-0.5 text-[11px] font-semibold text-[#d2d7dc]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer / Links */}
      <div className="border-t border-[#1e261d] px-6 py-3.5 bg-[#0e0e0e]/40 flex items-center justify-between">
        {links.length > 0 ? (
          <div className="flex items-center gap-3">
            {links.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#d2d7dc] hover:text-[#52fe7d] transition"
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{label}</span>
              </a>
            ))}
          </div>
        ) : (
          <span className="text-[11px] text-[#8a949e]">Case study specifications available upon request</span>
        )}

        <Link
          to={`/support?service=custom-web-apps`}
          className="ml-auto text-xs font-semibold text-[#39A751] hover:text-[#52fe7d] transition"
        >
          Discuss similar project →
        </Link>
      </div>
    </article>
  )
}
