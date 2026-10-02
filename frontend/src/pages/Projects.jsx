import { SiteDataProvider } from '../context/SiteDataContext'
import PageLayout from '../components/layout/PageLayout'
import ProjectsGallery from '../components/sections/Projects'
import Reveal from '../components/common/Reveal'
import CollaborateCTA from '../components/sections/CollaborateCTA'
import { Code2, Layers, Globe, Smartphone } from 'lucide-react'

const STATS = [
  { num: '20+', label: 'Projects Shipped' },
  { num: '4', label: 'Platform Types' },
  { num: '100%', label: 'Code Ownership' },
  { num: '3+', label: 'Years Active' },
]

const HIGHLIGHTS = [
  { icon: Globe,      title: 'Web Applications',   desc: 'SaaS dashboards, portals, landing pages, and business sites built with React & FastAPI.' },
  { icon: Smartphone, title: 'Mobile Apps',        desc: 'Cross-platform iOS & Android using React Native and Flutter with native APIs.' },
  { icon: Layers,     title: 'Full-Stack Suites',  desc: 'Unified codebases sharing one backend, one DB schema, across web and mobile.' },
  { icon: Code2,      title: 'APIs & Data Layers', desc: 'FastAPI services, Supabase/PostgreSQL schemas, third-party integrations.' },
]

export default function ProjectsPage() {
  return (
    <SiteDataProvider>
      <PageLayout
        title="Projects — Case Studies & Code"
        description="Make's technical portfolio — web applications, mobile apps, and full-stack engineering builds. Browse live previews and source code."
      >

        {/* ── Hero ── */}
        <div
          className="relative overflow-hidden border-b border-[#1e261d] pt-32 pb-24"
          style={{
            backgroundImage: 'url(/images/projects-hero-bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
          }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[#0e0e0e]/82" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0e0e0e]" />
          <div className="pointer-events-none absolute left-0 top-0 h-[400px] w-[400px] -translate-x-1/3 rounded-full bg-[#39A751]/8 blur-[120px]" />

          <div className="container-page relative z-10 mx-auto max-w-3xl text-center">
            <Reveal>
              <p className="font-mono text-xs font-semibold tracking-widest text-[#52fe7d] lowercase">
                case studies &amp; code
              </p>

              <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]">
                Real products.{' '}
                <span className="text-[#52fe7d]">Real engineering.</span>
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#8a949e] sm:text-lg">
                A filterable gallery of shipped web applications, mobile apps, and full-stack software. Click any project to open a live preview or visit the source.
              </p>

              {/* Stats */}
              <div className="mt-10 flex flex-wrap items-center justify-center gap-8 border-t border-[#1e261d]/60 pt-8">
                {STATS.map(({ num, label }) => (
                  <div key={label} className="text-center">
                    <p className="font-display text-2xl font-black text-white">{num}</p>
                    <p className="mt-0.5 text-[11px] font-medium text-[#8a949e]">{label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        {/* ── What I build highlight strip ── */}
        <div className="border-b border-[#1e261d] bg-[#0b0f0b] py-10">
          <div className="container-page grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {HIGHLIGHTS.map((h, i) => {
              const IconComp = h.icon
              return (
                <Reveal key={h.title} delay={i * 50}>
                  <div className="flex items-start gap-4 rounded-xl border border-[#1e261d] bg-[#111511] p-5 transition hover:border-[#39A751]/35">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#39A751]/25 bg-[#1a2a1a] text-[#52fe7d]">
                      <IconComp className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="font-display text-sm font-bold text-white">{h.title}</p>
                      <p className="mt-1 text-xs leading-relaxed text-[#8a949e]">{h.desc}</p>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>

        {/* ── Full Gallery with Category Filters + Live Preview ── */}
        <ProjectsGallery showFilters featured={false} />

        {/* ── CTA ── */}
        <CollaborateCTA
          heading="Have a similar product to build?"
          body="Tell me about your target users and timeline. I'll provide an architectural breakdown and estimated milestone plan."
        />
      </PageLayout>
    </SiteDataProvider>
  )
}
