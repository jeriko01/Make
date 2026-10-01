import { useState } from 'react'
import { AlertCircle, Code2, Database, Server, Smartphone, Wrench } from 'lucide-react'
import { SiteDataProvider, useSiteData } from '../context/SiteDataContext'
import PageLayout from '../components/layout/PageLayout'
import Reveal from '../components/common/Reveal'
import Icon from '../components/common/Icon'
import CollaborateCTA from '../components/sections/CollaborateCTA'

const TYPE_LABEL = {
  language:  'Language',
  framework: 'Framework',
  library:   'Library',
  database:  'Database',
  tool:      'Tool',
  platform:  'Platform',
}

const CATEGORY_ICONS = {
  frontend: Code2,
  backend: Server,
  data: Database,
  mobile: Smartphone,
  tools: Wrench,
}

// Skills that need confirmation before being presented as primary
const NEEDS_CONFIRMATION = ['Dart']

function SkillCard({ skill }) {
  const needsConfirm = NEEDS_CONFIRMATION.includes(skill.name)

  return (
    <div className="group relative flex flex-col justify-between rounded-xl border border-[#1e261d] bg-[#141714] p-5 transition-all duration-200 hover:-translate-y-1 hover:border-[#39A751]/40 hover:bg-[#161d15] hover:shadow-lg hover:shadow-[#39A751]/10">
      {needsConfirm && (
        <span
          title="Note: Dart is used with Flutter. Confirm specific Dart depth with Make for language-exclusive roles."
          className="absolute right-3.5 top-3.5"
        >
          <AlertCircle className="h-4 w-4 text-amber-400" />
        </span>
      )}

      <div>
        {/* Icon & Type */}
        <div className="flex items-center justify-between">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1e2b1a] border border-[#39A751]/30 text-[#52fe7d] transition group-hover:scale-105 group-hover:bg-[#39A751] group-hover:text-white">
            <Icon name={skill.icon} className="h-5 w-5" />
          </span>

          <span className="rounded border border-[#1e261d] bg-[#0e0e0e] px-2 py-0.5 text-[10px] font-mono text-[#8a949e]">
            {TYPE_LABEL[skill.type] || skill.type}
          </span>
        </div>

        {/* Name */}
        <h3 className="mt-4 font-display text-base font-bold text-white group-hover:text-[#52fe7d] transition-colors">
          {skill.name}
        </h3>

        {/* Note / Context */}
        {skill.note ? (
          <p className="mt-2 text-xs leading-relaxed text-[#8a949e]">
            {skill.note}
          </p>
        ) : (
          <p className="mt-2 text-xs text-[#8a949e]/80">
            Production stack component for scalable full-stack development.
          </p>
        )}
      </div>

      {needsConfirm && (
        <div className="mt-4 pt-2 border-t border-[#1e261d] flex items-center gap-1.5 text-[10px] text-amber-400/90 font-medium">
          <AlertCircle className="h-3 w-3 shrink-0" />
          <span>Flutter companion language</span>
        </div>
      )}
    </div>
  )
}

function SkillsContent() {
  const { data } = useSiteData()
  const categories = data?.skills?.categories || []
  const skills = data?.skills?.skills || []
  const [active, setActive] = useState('all')

  const grouped = categories.map((cat) => ({
    ...cat,
    items: skills.filter((s) => s.category_id === cat.id),
  })).filter((c) => c.items.length > 0)

  const visible = active === 'all' ? grouped : grouped.filter((c) => c.id === active)

  return (
    <>
      {/* Page Hero */}
      <div className="bg-[#0e0e0e] pt-32 pb-16 border-b border-[#1e261d]">
        <div className="container-page">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#39A751]/30 bg-[#1e2b1a] px-3.5 py-1 text-xs font-bold tracking-widest text-[#52fe7d]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#39A751] animate-pulse" />
              <span>SKILLS &amp; TECHNOLOGIES</span>
            </div>
            <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Engineered with modern tools
            </h1>
            <p className="mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-[#d2d7dc]">
              Organized by technical layer and practical utility. No misleading percentage bars or vanity rankings—only tools used to ship real applications.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Skills Gallery */}
      <section className="section-pad bg-[#0e0e0e]" aria-label="Skills Grid">
        <div className="container-page">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 pb-6 border-b border-[#1e261d]">
            <button
              type="button"
              onClick={() => setActive('all')}
              className={`rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${
                active === 'all'
                  ? 'bg-[#39A751] text-white shadow-md shadow-[#39A751]/20'
                  : 'border border-[#1e261d] bg-[#141714] text-[#d2d7dc] hover:border-[#39A751]/40 hover:text-white'
              }`}
              aria-pressed={active === 'all'}
            >
              All Categories
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setActive(c.id)}
                className={`rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${
                  active === c.id
                    ? 'bg-[#39A751] text-white shadow-md shadow-[#39A751]/20'
                    : 'border border-[#1e261d] bg-[#141714] text-[#d2d7dc] hover:border-[#39A751]/40 hover:text-white'
                }`}
                aria-pressed={active === c.id}
              >
                {c.name}
              </button>
            ))}
          </div>

          {/* Grouped Cards */}
          <div className="mt-10 space-y-12">
            {visible.map((cat) => {
              const CategoryIcon = CATEGORY_ICONS[cat.id] || Code2
              return (
                <div key={cat.id} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1e2b1a] text-[#52fe7d]">
                      <CategoryIcon className="h-4 w-4" />
                    </span>
                    <h2 className="font-display text-xl font-bold text-white">
                      {cat.name}
                    </h2>
                    <span className="text-xs font-mono text-[#8a949e]">
                      ({cat.items.length})
                    </span>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {cat.items.map((skill) => (
                      <SkillCard key={skill.id || skill.name} skill={skill} />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Honest architectural note */}
          <Reveal delay={200}>
            <div className="mt-16 rounded-xl border border-[#1e261d] bg-[#141714] p-6 text-xs leading-relaxed text-[#8a949e]">
              <span className="font-bold text-white uppercase tracking-wider block mb-1">
                Architectural Consistency Note
              </span>
              Technology selection always matches project constraints. Backend services are strictly developed with FastAPI / Python and Supabase / PostgreSQL. Mobile projects leverage React Native or Flutter cross-platform architecture.
            </div>
          </Reveal>
        </div>
      </section>

      {/* Final Collaborate CTA */}
      <CollaborateCTA
        heading="Need these technologies on your team?"
        body="Whether you need a full-stack engineer for a new product build or specialized React / FastAPI development, let's talk."
      />
    </>
  )
}

export default function Skills() {
  return (
    <SiteDataProvider>
      <PageLayout
        title="Skills & Technologies"
        description="Technical stack of Make: React, TypeScript, Python, FastAPI, Supabase, React Native, and Flutter."
      >
        <SkillsContent />
      </PageLayout>
    </SiteDataProvider>
  )
}
