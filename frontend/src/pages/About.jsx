import { Link } from 'react-router-dom'
import {
  ArrowRight,
  GraduationCap,
  Briefcase,
  Code2,
  Rocket,
  Globe,
  Smartphone,
  Server,
  Database,
  BookOpen,
  Award,
} from 'lucide-react'
import { SiteDataProvider, useSiteData } from '../context/SiteDataContext'
import PageLayout from '../components/layout/PageLayout'
import Reveal from '../components/common/Reveal'
import CollaborateCTA from '../components/sections/CollaborateCTA'

const TIMELINE = [
  {
    year: '2019',
    type: 'education',
    icon: BookOpen,
    title: 'Started Learning Programming',
    org: 'Self-taught',
    desc: 'Began with HTML, CSS and JavaScript fundamentals. Built first static websites and discovered the passion for creating things on the web.',
    tags: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    year: '2020',
    type: 'education',
    icon: GraduationCap,
    title: 'Deep Dive into Frontend Development',
    org: 'Online Courses & Practice',
    desc: 'Mastered React ecosystem, component-driven architecture, and responsive design patterns. Built multiple practice projects.',
    tags: ['React', 'Tailwind CSS', 'Git'],
  },
  {
    year: '2021',
    type: 'work',
    icon: Briefcase,
    title: 'First Freelance Projects',
    org: 'Freelance',
    desc: 'Delivered first commercial websites and web apps for small businesses. Learned the value of clear communication and structured delivery.',
    tags: ['React', 'Node.js', 'Client Work'],
  },
  {
    year: '2022',
    type: 'education',
    icon: Code2,
    title: 'Backend & Full-Stack Expansion',
    org: 'Self-taught · Open Source',
    desc: 'Expanded into Python and FastAPI for backend services. Learned relational database design with PostgreSQL and Supabase authentication.',
    tags: ['Python', 'FastAPI', 'PostgreSQL', 'Supabase'],
  },
  {
    year: '2022',
    type: 'work',
    icon: Smartphone,
    title: 'Mobile Development with React Native',
    org: 'Freelance & Side Projects',
    desc: 'Built cross-platform mobile applications for iOS and Android. Explored Flutter as an alternative and integrated native device APIs.',
    tags: ['React Native', 'Flutter', 'iOS', 'Android'],
  },
  {
    year: '2023',
    type: 'work',
    icon: Rocket,
    title: 'Launched Make Studio',
    org: 'Make — Independent Studio',
    desc: 'Formalized the engineering studio focusing on web, mobile, and API services. Delivered 10+ projects across multiple industries.',
    tags: ['Full-Stack', 'Mobile', 'APIs', 'Studio'],
  },
  {
    year: '2024',
    type: 'work',
    icon: Globe,
    title: 'Scaling to Complex Products',
    org: 'Make — Independent Studio',
    desc: 'Took on larger scope engagements — SaaS platforms, e-commerce systems with custom checkout flows, and enterprise API integrations.',
    tags: ['SaaS', 'E-Commerce', 'API Integration'],
  },
  {
    year: '2025',
    type: 'work',
    icon: Award,
    title: '20+ Projects Shipped',
    org: 'Make — Present',
    desc: 'Passed 20 shipped products milestone. Continuing to build reliable, fast, and maintainable software for startups and businesses globally.',
    tags: ['20+ Projects', '3+ Years', '100% Client Satisfaction'],
  },
]

const CAPABILITIES = [
  { icon: Globe, title: 'Web Engineering', desc: 'React 19, TypeScript, Vite, Tailwind CSS — component-driven, accessible UIs.' },
  { icon: Smartphone, title: 'Mobile Apps', desc: 'React Native and Flutter for cross-platform iOS & Android with native APIs.' },
  { icon: Server, title: 'Backend & APIs', desc: 'FastAPI, async Python, REST — clean, typed, documented services.' },
  { icon: Database, title: 'Data Layer', desc: 'PostgreSQL schema design, Supabase RLS, migrations, and query optimization.' },
]

function AboutContent() {
  const { data } = useSiteData()
  const profile = data?.profile || {}
  const about = data?.about || {}

  return (
    <>
      <div
        className="relative overflow-hidden border-b border-[#1E2C4A] pt-32 pb-24"
        style={{
          backgroundImage: 'url(/images/about-hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[#06080E]/50" />

        <div className="container-page relative z-10 grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <Reveal>
            <p className="font-mono text-xs font-semibold tracking-widest text-[#38BDF8] lowercase">
              about make
            </p>

            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.25rem]">
              Building software people{' '}
              <span className="text-[#38BDF8]">actually rely on.</span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-relaxed text-[#94A3B8] sm:text-lg">
              {profile.long_bio ||
                'I turn product ideas into clear, dependable applications — from the first screen to the API and data behind it. No middlemen. Direct engineering.'}
            </p>
            <div className="mt-8 flex flex-wrap gap-7 border-t border-[#1E2C4A]/60 pt-8">
              {[
                { num: '3+', label: 'Years Experience' },
                { num: '20+', label: 'Projects Shipped' },
                { num: '100%', label: 'Client Satisfaction' },
              ].map(({ num, label }) => (
                <div key={label}>
                  <p className="font-display text-2xl font-black text-white">{num}</p>
                  <p className="mt-0.5 text-xs font-medium text-[#94A3B8]">{label}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-row items-center gap-2.5 sm:gap-3.5">
              <Link
                to="/support"
                className="btn-lime flex-1 sm:flex-initial shrink-0 justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-bold shadow-lg shadow-[#0284C7]/20 hover:shadow-[#0284C7]/35 transition-all text-center whitespace-nowrap"
              >
                <span>Start conversation</span>
                <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
              </Link>
              <Link
                to="/projects"
                className="btn-outline flex-1 sm:flex-initial shrink-0 justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm transition-all text-center whitespace-nowrap"
              >
                <span>View projects</span>
              </Link>
            </div>
          </Reveal>
          <Reveal delay={120} className="mx-auto w-full max-w-[270px] lg:mx-0 lg:ml-auto">
            <div className="relative">
              <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-[#0284C7]/20 via-transparent to-[#38BDF8]/10 blur-xl" />
              <div className="relative overflow-hidden rounded-2xl border border-[#1E2C4A]/80 shadow-2xl shadow-black/60">
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
                    className="flex items-center justify-center bg-gradient-to-b from-[#111A30] to-[#06080E]"
                    style={{ aspectRatio: '2/3' }}
                  >
                    <span className="font-display text-7xl font-black text-white/10">
                      {profile.initials || 'MK'}
                    </span>
                  </div>
                )}
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-[#06080E]/50 to-transparent" />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
      <section className="section-pad border-b border-[#1E2C4A] bg-[#06080E]" aria-label="The Approach">
        <div className="container-page grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <Reveal>
            <p className="font-mono text-xs font-semibold tracking-widest text-[#38BDF8] lowercase">the philosophy</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              How I approach software engineering
            </h2>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-[#94A3B8] sm:text-base">
              <p>
                Building digital products is more than writing syntax that compiles. It&apos;s crafting dependable systems that users find intuitive, that handle errors gracefully, and that other engineers can maintain without friction.
              </p>
              <p>
                I specialize across the full lifecycle: from the React component tree and React Native mobile interfaces, through async FastAPI endpoints, down to relational PostgreSQL schemas with Supabase.
              </p>
              <p>
                I believe in honest engineering: realistic scopes, measurable milestones, and transparent communication. Every project I ship is one I&apos;m proud to put my name on.
              </p>
            </div>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {CAPABILITIES.map((cap, i) => {
              const IconComp = cap.icon
              return (
                <Reveal key={cap.title} delay={i * 60}>
                  <div className="group rounded-2xl border border-[#1E2C4A] bg-[#0D1424] p-6 transition-all duration-200 hover:border-[#0284C7]/40 hover:shadow-lg hover:shadow-[#0284C7]/8">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#0284C7]/25 bg-[#131F37] text-[#38BDF8] transition group-hover:bg-[#0284C7] group-hover:text-white">
                      <IconComp className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 font-display text-base font-bold text-white group-hover:text-[#38BDF8] transition-colors">{cap.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-[#94A3B8]">{cap.desc}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>
      <section className="section-pad bg-[#06080E]" aria-label="Journey timeline">
        <div className="container-page">
          <Reveal>
            <div className="mb-14 text-center">
              <p className="font-mono text-xs font-semibold tracking-widest text-[#38BDF8] lowercase">the journey</p>
              <h2 className="mt-3 font-display text-3xl font-extrabold text-white sm:text-4xl">
                Learning · Building · Growing
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#94A3B8]">
                From writing my first line of code to shipping 20+ real-world products — a transparent look at the path.
              </p>
            </div>
          </Reveal>
          <div className="relative mx-auto max-w-3xl">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#0284C7]/60 via-[#0284C7]/30 to-transparent sm:left-1/2 sm:-translate-x-px" />

            <div className="space-y-8">
              {TIMELINE.map((item, i) => {
                const IconComp = item.icon
                const isRight = i % 2 === 0
                return (
                  <Reveal key={`${item.year}-${i}`} delay={i * 60}>
                    <div className={`relative flex gap-6 sm:gap-0 ${isRight ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
                      <div className={`flex-1 ${isRight ? 'sm:pr-10 sm:text-right' : 'sm:pl-10 sm:text-left'} pl-16 sm:pl-0`}>
                        <div className={`group inline-block w-full rounded-2xl border border-[#1E2C4A] bg-[#0D1424] p-6 text-left transition-all duration-300 hover:border-[#0284C7]/50 hover:shadow-xl hover:shadow-[#0284C7]/8`}>
                          <div className={`flex flex-wrap items-center gap-2 ${isRight ? 'sm:flex-row-reverse sm:justify-end' : ''}`}>
                            <span className="font-mono text-[11px] font-bold tracking-widest text-[#38BDF8]">
                              {item.year}
                            </span>
                            <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                              item.type === 'education'
                                ? 'bg-blue-500/15 text-blue-400 border border-blue-500/25'
                                : 'bg-[#0284C7]/15 text-[#38BDF8] border border-[#0284C7]/25'
                            }`}>
                              {item.type === 'education' ? 'Learning' : 'Work'}
                            </span>
                          </div>

                          <h3 className="mt-2 font-display text-base font-bold text-white group-hover:text-[#38BDF8] transition-colors">
                            {item.title}
                          </h3>
                          <p className="mt-0.5 text-xs font-medium text-[#0284C7]">{item.org}</p>
                          <p className="mt-2 text-xs leading-relaxed text-[#94A3B8]">{item.desc}</p>
                          <div className={`mt-4 flex flex-wrap gap-1.5 ${isRight ? 'sm:justify-end' : ''}`}>
                            {item.tags.map((tag) => (
                              <span key={tag} className="rounded-md border border-[#1E2C4A] bg-[#06080E] px-2 py-0.5 text-[10px] text-[#94A3B8]">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="absolute left-6 top-6 sm:static sm:flex sm:w-0 sm:items-start sm:justify-center sm:pt-6">
                        <div className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-[#0284C7] bg-[#131F37] shadow-lg shadow-[#0284C7]/30 sm:absolute sm:left-1/2 sm:-translate-x-1/2">
                          <IconComp className="h-3 w-3 text-[#38BDF8]" />
                        </div>
                      </div>
                      <div className="hidden flex-1 sm:block" />
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </div>
      </section>
      {(about.principles || []).length > 0 && (
        <section className="section-pad border-t border-[#1E2C4A] bg-[#06080E]" aria-label="Core Principles">
          <div className="container-page">
            <Reveal>
              <div className="mb-12 text-center">
                <p className="font-mono text-xs font-semibold tracking-widest text-[#38BDF8] lowercase">values</p>
                <h2 className="mt-3 font-display text-3xl font-extrabold text-white sm:text-4xl">
                  Core engineering principles
                </h2>
                <p className="mx-auto mt-3 max-w-xl text-sm text-[#94A3B8]">
                  These principles govern every line of code and every project decision.
                </p>
              </div>
            </Reveal>

            <div className="grid gap-5 sm:grid-cols-2">
              {about.principles.map((p, i) => (
                <Reveal key={p.id} delay={i * 60}>
                  <div className="group relative overflow-hidden rounded-2xl border border-[#1E2C4A] bg-[#0D1424] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#0284C7]/50 hover:shadow-xl hover:shadow-[#0284C7]/8">
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#38BDF8]/0 to-transparent transition-all duration-300 group-hover:via-[#38BDF8]/50" />
                    <div className="mb-4 h-1 w-8 rounded-full bg-[#0284C7] transition-all duration-300 group-hover:w-14 group-hover:bg-[#38BDF8]" />
                    <h3 className="font-display text-lg font-bold text-white group-hover:text-[#38BDF8] transition-colors">
                      {p.label}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#94A3B8]">{p.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
      <CollaborateCTA
        topHeading="Solo engineer advantage"
        mainHeading="Work directly with the builder."
        body="No agency middle layers or communication loss. You get direct access, rapid iterations, and complete technical transparency from day one."
        bgImage="/images/cta-about-bg.jpg"
        primaryBtnText="Start a conversation"
        primaryBtnTo="/support"
        secondaryBtnText="Explore project gallery"
        secondaryBtnTo="/projects"
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
