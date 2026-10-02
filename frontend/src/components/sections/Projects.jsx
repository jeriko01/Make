import { useMemo, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ExternalLink,
  Github,
  ArrowRight,
  X,
  Monitor,
  Maximize2,
  Minimize2,
  Filter,
  AlertTriangle,
  Eye,
  Code2,
} from 'lucide-react'
import { useSiteData } from '../../context/SiteDataContext'
import Reveal from '../common/Reveal'

const FILTER_TABS = [
  { id: 'all',       label: 'All Projects' },
  { id: 'web',       label: 'Web' },
  { id: 'mobile',    label: 'Mobile' },
  { id: 'fullstack', label: 'Full-Stack' },
]

/* ─────────────────────────────────────────────
   Live Preview Modal
───────────────────────────────────────────── */
function PreviewModal({ project, onClose }) {
  const [expanded, setExpanded] = useState(false)
  const [loaded, setLoaded] = useState(false)

  // Close on Escape
  useEffect(() => {
    const handler = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const isPlaceholderUrl = !project.live_url || project.live_url.includes('example.com')

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label={`Live preview — ${project.title}`}
    >
      <div
        className={`relative flex flex-col overflow-hidden rounded-2xl border border-[#1e261d] bg-[#111511] shadow-2xl shadow-black/80 transition-all duration-300 ${
          expanded
            ? 'h-[96vh] w-[98vw]'
            : 'h-[85vh] w-full max-w-5xl'
        }`}
      >
        {/* Modal Header bar */}
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-[#1e261d] bg-[#0e0e0e] px-4 py-3">
          {/* Traffic lights */}
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>

          {/* URL bar */}
          <div className="flex flex-1 items-center gap-2 rounded-lg border border-[#1e261d] bg-[#1a1a1a] px-3 py-1.5 text-xs text-[#8a949e] font-mono">
            <Monitor className="h-3.5 w-3.5 shrink-0 text-[#39A751]" />
            <span className="truncate">{project.live_url || 'No live URL provided'}</span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {project.live_url && !isPlaceholderUrl && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-lg border border-[#1e261d] bg-[#1a2a1a] px-3 py-1.5 text-xs font-semibold text-[#52fe7d] transition hover:bg-[#39A751] hover:text-white"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Open</span>
              </a>
            )}
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#1e261d] bg-[#1a1a1a] text-[#8a949e] transition hover:text-white"
              aria-label={expanded ? 'Collapse' : 'Expand'}
            >
              {expanded ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#1e261d] bg-[#1a1a1a] text-[#8a949e] transition hover:bg-red-500/20 hover:text-red-400"
              aria-label="Close preview"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* iFrame / Fallback content */}
        <div className="relative flex-1 bg-[#0a0a0a]">
          {isPlaceholderUrl ? (
            /* No real URL — show project card summary instead */
            <div className="flex h-full flex-col items-center justify-center gap-6 p-8 text-center">
              {/* Project cover if available */}
              {project.cover_image_url && !project.is_placeholder && (
                <img
                  src={project.cover_image_url}
                  alt={project.title}
                  className="mx-auto max-h-52 rounded-xl border border-[#1e261d] object-cover shadow-2xl"
                />
              )}
              <div className="max-w-lg">
                <span className="inline-block rounded-full border border-amber-500/30 bg-amber-950/20 px-3 py-1 text-[11px] font-semibold text-amber-400">
                  Live demo not publicly available
                </span>
                <h3 className="mt-4 font-display text-xl font-bold text-white">{project.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#8a949e]">{project.description || project.summary}</p>
                <div className="mt-4 flex flex-wrap justify-center gap-1.5">
                  {project.tech_tags?.map((tag) => (
                    <span key={tag} className="rounded-md border border-[#1e261d] bg-[#1a1a1a] px-2.5 py-0.5 text-xs text-[#d2d7dc]">
                      {tag}
                    </span>
                  ))}
                </div>
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 rounded-xl border border-[#1e261d] bg-[#1a2a1a] px-5 py-2.5 text-sm font-semibold text-[#52fe7d] transition hover:bg-[#39A751] hover:text-white"
                  >
                    <Github className="h-4 w-4" />
                    View Source Code
                  </a>
                )}
              </div>
            </div>
          ) : (
            <>
              {!loaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#1e261d] border-t-[#52fe7d]" />
                  <p className="text-xs text-[#8a949e]">Loading preview…</p>
                </div>
              )}
              <iframe
                src={project.live_url}
                title={`Live preview — ${project.title}`}
                className={`h-full w-full border-none transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setLoaded(true)}
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              />
            </>
          )}
        </div>

        {/* Footer with tech tags + GitHub */}
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-[#1e261d] bg-[#0e0e0e] px-4 py-2.5">
          <div className="flex flex-wrap gap-1.5">
            {project.tech_tags?.slice(0, 5).map((tag) => (
              <span key={tag} className="rounded border border-[#1e261d] px-2 py-0.5 font-mono text-[10px] text-[#8a949e]">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-3">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-medium text-[#8a949e] transition hover:text-[#52fe7d]"
              >
                <Github className="h-3.5 w-3.5" />
                Source
              </a>
            )}
            <Link
              to={`/support?service=custom-web-apps`}
              onClick={onClose}
              className="text-xs font-semibold text-[#39A751] hover:text-[#52fe7d] transition"
            >
              Build something similar →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Project Card
───────────────────────────────────────────── */
function ProjectCard({ project: p, onPreview }) {
  const hasCover = !!p.cover_image_url && !p.is_placeholder

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#1e261d] bg-[#111511] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#39A751]/50 hover:shadow-2xl hover:shadow-[#39A751]/10">

      {/* Top glow line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#52fe7d]/0 to-transparent transition-all duration-300 group-hover:via-[#52fe7d]/50" />

      {/* Cover image / placeholder */}
      <div
        className="relative aspect-video cursor-pointer overflow-hidden border-b border-[#1e261d] bg-[#0a0a0a]"
        onClick={() => onPreview(p)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onPreview(p)}
        aria-label={`Preview ${p.title}`}
      >
        {hasCover ? (
          <img
            src={p.cover_image_url}
            alt={`${p.title} preview`}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="relative flex h-full w-full flex-col items-center justify-center gap-2 p-6 text-center select-none">
            <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #39A751 0%, transparent 70%)' }} />
            <Code2 className="relative z-10 h-8 w-8 text-[#39A751]/60" />
            <span className="relative z-10 font-display text-base font-extrabold tracking-tight text-white/40">
              {p.title}
            </span>
            <span className="relative z-10 rounded border border-[#1e261d] bg-[#161d15] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[#52fe7d]">
              {p.platform || 'Full-Stack'}
            </span>
          </div>
        )}

        {/* Hover overlay — "Click to preview" */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#0e0e0e]/70 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#39A751]/60 bg-[#1a2a1a] text-[#52fe7d]">
            <Eye className="h-5 w-5" />
          </div>
          <span className="text-xs font-semibold text-white">Click to preview</span>
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-bold leading-snug text-white transition-colors group-hover:text-[#52fe7d]">
            {p.title}
          </h3>
          <span className="shrink-0 rounded-full border border-[#1e261d] bg-[#0e0e0e] px-2 py-0.5 font-mono text-[10px] text-[#8a949e]">
            {p.platform || 'web'}
          </span>
        </div>

        <p className="mt-2.5 flex-1 text-xs leading-relaxed text-[#8a949e]">
          {p.summary || p.description}
        </p>

        {/* Tech tags */}
        {p.tech_tags?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {p.tech_tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-[#1e261d] bg-[#161d15] px-2 py-0.5 text-[11px] font-medium text-[#d2d7dc]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Card footer */}
      <div className="flex items-center justify-between gap-2 border-t border-[#1e261d] bg-[#0e0e0e]/50 px-5 py-3">
        <div className="flex items-center gap-3">
          {/* Preview button */}
          <button
            type="button"
            onClick={() => onPreview(p)}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#52fe7d] transition hover:text-white"
          >
            <Eye className="h-3.5 w-3.5" />
            Preview
          </button>

          {p.github_url && (
            <a
              href={p.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium text-[#8a949e] transition hover:text-white"
            >
              <Github className="h-3.5 w-3.5" />
              Source
            </a>
          )}

          {p.live_url && (
            <a
              href={p.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium text-[#8a949e] transition hover:text-[#52fe7d]"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Live
            </a>
          )}
        </div>

        <Link
          to="/support?service=custom-web-apps"
          className="text-[11px] font-semibold text-[#39A751] hover:text-[#52fe7d] transition"
        >
          Build similar →
        </Link>
      </div>
    </article>
  )
}

/* ─────────────────────────────────────────────
   Main Projects Section
───────────────────────────────────────────── */
export default function Projects({ featured = false, limit, showFilters = !featured }) {
  const { data } = useSiteData()
  const [activeFilter, setActiveFilter] = useState('all')
  const [previewProject, setPreviewProject] = useState(null)

  const projects = useMemo(() => {
    let list = data?.projects?.projects || []
    if (featured) {
      const feat = list.filter((p) => p.is_featured && !p.is_placeholder)
      if (feat.length > 0) list = feat
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
    <>
      {/* Live Preview Modal */}
      {previewProject && (
        <PreviewModal
          project={previewProject}
          onClose={() => setPreviewProject(null)}
        />
      )}

      <section
        id="projects"
        aria-label={featured ? 'Featured projects' : 'Project gallery'}
        className="section-pad border-t border-[#1e261d] bg-[#0e0e0e]"
      >
        <div className="container-page">

          {/* Section heading */}
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <Reveal>
              <p className="font-mono text-xs font-semibold tracking-widest text-[#52fe7d] lowercase">
                {featured ? 'selected work' : 'portfolio'}
              </p>
              <h2 className="mt-3 font-display text-3xl font-extrabold text-white sm:text-4xl">
                {featured ? 'Featured applications' : 'Project gallery'}
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#8a949e]">
                Real projects built with modern frontend and backend architectures.
                Click any card to open an in-browser live preview.
              </p>
            </Reveal>
          </div>

          {/* Placeholder notice */}
          {!featured && hasPlaceholders && (
            <Reveal delay={60}>
              <div className="mb-6 flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-950/20 p-4">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                <p className="text-xs text-amber-300/80">
                  Update <code className="font-mono text-[#52fe7d]">SiteDataContext.jsx</code> or the backend DB to show verified live case studies.
                </p>
              </div>
            </Reveal>
          )}

          {/* Filter tabs */}
          {showFilters && (
            <Reveal delay={80}>
              <div className="mb-8 flex flex-wrap items-center gap-2">
                <Filter className="h-4 w-4 shrink-0 text-[#8a949e]" />
                {FILTER_TABS.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveFilter(tab.id)}
                    className={`rounded-lg px-4 py-2 text-xs font-bold tracking-wide transition ${
                      activeFilter === tab.id
                        ? 'bg-[#39A751] text-white shadow-md shadow-[#39A751]/20'
                        : 'border border-[#1e261d] bg-[#111511] text-[#8a949e] hover:border-[#39A751]/40 hover:text-white'
                    }`}
                    aria-pressed={activeFilter === tab.id}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </Reveal>
          )}

          {/* Grid */}
          {projects.length === 0 ? (
            <Reveal delay={100}>
              <div className="rounded-2xl border border-[#1e261d] bg-[#111511] p-12 text-center">
                <p className="font-display text-lg font-bold text-white">Projects will appear here once verified.</p>
                <p className="mt-2 text-sm text-[#8a949e]">Have a specific project in mind? Reach out to discuss direct scope.</p>
                <Link to="/support" className="mt-6 btn-lime inline-flex items-center gap-2">
                  <span>Start a project inquiry</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p, i) => (
                <Reveal key={p.id} delay={i * 60}>
                  <ProjectCard project={p} onPreview={setPreviewProject} />
                </Reveal>
              ))}
            </div>
          )}

          {/* View all link (home page) */}
          {featured && (
            <Reveal delay={200}>
              <div className="mt-10 text-center">
                <Link to="/projects" className="btn-outline inline-flex items-center gap-2 text-sm">
                  <span>View full project gallery</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          )}
        </div>
      </section>
    </>
  )
}
