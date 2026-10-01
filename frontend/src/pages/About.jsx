import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { SiteDataProvider, useSiteData } from '../context/SiteDataContext'
import PageLayout from '../components/layout/PageLayout'
import Reveal from '../components/common/Reveal'
import Icon from '../components/common/Icon'
import CollaborateCTA from '../components/sections/CollaborateCTA'

function AboutContent() {
  const { data } = useSiteData()
  const profile = data?.profile || {}
  const about = data?.about || {}

  return (
    <>
      {/* Page Hero */}
      <div className="bg-[#0e0e0e] pt-32 pb-16 border-b border-[#1e261d]">
        <div className="container-page grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#39A751]/30 bg-[#1e2b1a] px-3.5 py-1 text-xs font-bold tracking-widest text-[#52fe7d]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#39A751] animate-pulse" />
              <span>ABOUT MAKE</span>
            </div>
            <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Web and mobile products, built to work.
            </h1>
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-[#d2d7dc] max-w-xl">
              {profile.long_bio ||
                'I turn product ideas into clear, dependable applications—from the first screen to the API and data behind it.'}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/support" className="btn-lime gap-2 px-6 py-3 text-sm">
                <span>Start a conversation</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/projects" className="btn-outline gap-2 px-6 py-3 text-sm">
                <span>View projects</span>
              </Link>
            </div>
          </Reveal>

          {/* Portrait */}
          <Reveal delay={120} className="mx-auto w-full max-w-[280px] sm:max-w-[310px] lg:mx-0 lg:ml-auto">
            <div className="relative">
              {/* Outer glow */}
              <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-[#39A751]/15 via-transparent to-[#52fe7d]/8 blur-xl" />

              {/* Portrait card */}
              <div className="relative overflow-hidden rounded-2xl border border-[#1e261d]/80 shadow-2xl shadow-black/60">
                {profile.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt={`${profile.full_name || 'Make'} portrait`}
                    className="h-full w-full object-cover object-top"
                    style={{ aspectRatio: '2/3' }}
                    loading="eager"
                  />
                ) : (
                  <div
                    className="flex items-center justify-center bg-gradient-to-b from-[#161d15] to-[#0e0e0e]"
                    style={{ aspectRatio: '2/3' }}
                  >
                    <span className="font-display text-7xl font-black text-white/10">
                      {profile.initials || 'MK'}
                    </span>
                  </div>
                )}
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-[#0e0e0e]/50 to-transparent" />
              </div>

              {/* Availability badge */}
              <div className="absolute -right-3 top-5 flex items-center gap-1.5 rounded-full border border-[#1e261d] bg-[#141714]/95 px-3 py-1.5 shadow-lg backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-[#39A751] animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-white">Available</span>
              </div>
            </div>

          </Reveal>
        </div>
      </div>

      {/* The Engineering Philosophy */}
      <section className="section-pad bg-[#0e0e0e]" aria-label="The Approach">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <Reveal>
            <p className="section-eyebrow-lime mb-2">The Philosophy</p>
            <h2 className="section-heading">How I approach software engineering</h2>

            <div className="mt-6 space-y-4 text-sm sm:text-base leading-relaxed text-[#d2d7dc]">
              <p>
                Building digital products is more than just writing syntax that compiles. It is about crafting dependable systems that users find intuitive, that handle errors gracefully, and that other engineers can maintain without friction.
              </p>
              <p>
                I specialize across the full lifecycle: from the React component tree and mobile interfaces in React Native / Flutter, through asynchronous FastAPI endpoints, down to relational PostgreSQL schemas with Supabase.
              </p>
              <p>
                I believe in honest engineering: realistic scopes, measurable milestones, and transparent communication.
              </p>
            </div>
          </Reveal>

          {/* Capabilities Grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {(about.cards || []).map((c, i) => (
              <Reveal key={c.id} delay={i * 60}>
                <div className="group rounded-xl border border-[#1e261d] bg-[#141714] p-6 transition-all duration-200 hover:border-[#39A751]/40 hover:bg-[#161d15]">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1e2b1a] border border-[#39A751]/30 text-[#52fe7d] transition group-hover:scale-105 group-hover:bg-[#39A751] group-hover:text-white">
                    <Icon name={c.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-bold text-white group-hover:text-[#52fe7d] transition-colors">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#8a949e]">
                    {c.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Engineering Principles */}
      {(about.principles || []).length > 0 && (
        <section className="section-pad bg-[#0e0e0e] border-t border-[#1e261d]" aria-label="Core Principles">
          <div className="container-page">
            <Reveal>
              <div className="max-w-2xl">
                <p className="section-eyebrow-lime">Values</p>
                <h2 className="mt-3 section-heading">Core engineering principles</h2>
                <p className="mt-4 text-base text-[#d2d7dc] leading-relaxed">
                  These principles govern every line of code written and every project decision made.
                </p>
              </div>
            </Reveal>

            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {about.principles.map((p, i) => (
                <Reveal key={p.id} delay={i * 60}>
                  <div className="group rounded-xl border border-[#1e261d] bg-[#141714] p-7 transition-all duration-200 hover:-translate-y-1 hover:border-[#39A751]/40 hover:bg-[#161d15] hover:shadow-lg hover:shadow-[#39A751]/10">
                    <div className="mb-4 h-1 w-8 rounded-full bg-[#39A751] transition-all duration-300 group-hover:w-14 group-hover:bg-[#52fe7d]" />
                    <h3 className="font-display text-lg font-bold text-white group-hover:text-[#52fe7d] transition-colors">
                      {p.label}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#8a949e]">
                      {p.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final Collaborate CTA */}
      <CollaborateCTA
        heading="Let's build something exceptional together"
        body="Have an upcoming project, contract, or architecture need? Let's connect and discuss the technical roadmap."
      />
    </>
  )
}

export default function About() {
  return (
    <SiteDataProvider>
      <PageLayout
        title="About Make"
        description="Learn about Make, a senior web and mobile engineering studio building dependable full-stack applications."
      >
        <AboutContent />
      </PageLayout>
    </SiteDataProvider>
  )
}
