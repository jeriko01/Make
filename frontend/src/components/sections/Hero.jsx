import { Link } from 'react-router-dom'
import { ArrowRight, ExternalLink, Globe, Smartphone, Server, Database } from 'lucide-react'
import { useSiteData } from '../../context/SiteDataContext'
import Reveal from '../common/Reveal'

/** Credibility / Capability strip items */
const CAPABILITIES = [
  {
    icon: Globe,
    title: 'Web',
    detail: 'React · TypeScript · Tailwind CSS',
    desc: 'Responsive, accessible web applications',
  },
  {
    icon: Smartphone,
    title: 'Mobile',
    detail: 'React Native · Flutter · Native',
    desc: 'Cross-platform iOS & Android apps',
  },
  {
    icon: Server,
    title: 'APIs',
    detail: 'Python · FastAPI · REST',
    desc: 'Clean, dependable backend services',
  },
  {
    icon: Database,
    title: 'Data',
    detail: 'Supabase · PostgreSQL',
    desc: 'Relational data modeling & auth',
  },
]

export default function Hero() {
  const { data } = useSiteData()
  const hero = data?.hero || {}
  const profile = data?.profile || {}

  return (
    <section
      id="home"
      aria-label="Hero"
      className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-[#0e0e0e] pt-24 lg:pt-28"
    >
      {/* Background ambient lighting - pure dark with subtle glow */}
      <div className="pointer-events-none absolute -left-64 top-0 h-[500px] w-[500px] rounded-full bg-[#39A751]/8 blur-[120px]" />
      <div className="pointer-events-none absolute -right-48 top-20 h-[400px] w-[400px] rounded-full bg-[#52fe7d]/4 blur-[100px]" />

      {/* Main Split Hero */}
      <div className="container-page relative z-10 my-auto py-10 lg:py-14">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">

          {/* ── Left Column ── */}
          <div className="order-2 lg:order-1">

            {/* Eyebrow badge */}
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#39A751]/25 bg-[#1e2b1a]/70 px-3 py-1 text-[10px] font-bold tracking-widest text-[#52fe7d] uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-[#39A751] animate-pulse" />
                <span>{hero.eyebrow || 'SENIOR WEB & MOBILE APPLICATION ENGINEER'}</span>
              </div>
            </Reveal>

            {/* Main Headline — refined size */}
            <Reveal delay={70}>
              <h1 className="mt-5 font-display text-3xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-4xl lg:text-[2.75rem] xl:text-5xl">
                Web and mobile products,{' '}
                <span className="text-[#52fe7d]">built to work.</span>
              </h1>
            </Reveal>

            {/* Paragraph — clean, no underline below */}
            <Reveal delay={150}>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-[#8a949e] sm:text-[17px]">
                {hero.description ||
                  'I turn product ideas into clear, dependable applications—from the first screen to the API and data behind it.'}
              </p>
            </Reveal>

            {/* CTAs */}
            <Reveal delay={220}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  to={hero.primary_cta_href || '/projects'}
                  className="btn-lime gap-2 px-6 py-3 text-sm shadow-lg shadow-[#39A751]/20 hover:shadow-[#39A751]/35 transition-all"
                >
                  <span>{hero.primary_cta_label || 'Explore my work'}</span>
                  <ExternalLink className="h-4 w-4" />
                </Link>

                <Link
                  to={hero.secondary_cta_href || '/support'}
                  className="btn-outline gap-2 px-6 py-3 text-sm"
                >
                  <span>{hero.secondary_cta_label || "Let's collaborate"}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>

            {/* Micro stats row - clean, no line break/border */}
            <Reveal delay={290}>
              <div className="mt-8 flex flex-wrap items-center gap-7">
                {[
                  { num: '3+', label: 'Years Experience' },
                  { num: '20+', label: 'Projects Shipped' },
                  { num: '100%', label: 'Client Satisfaction' },
                ].map(({ num, label }) => (
                  <div key={label}>
                    <p className="font-display text-xl font-black text-white">{num}</p>
                    <p className="text-[11px] text-[#8a949e] font-medium">{label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* ── Right Column: Clean Portrait ── */}
          <Reveal delay={120} className="order-1 mx-auto w-full max-w-[310px] sm:max-w-[350px] lg:order-2 lg:mx-0 lg:ml-auto">
            <div className="relative">
              {/* Outer glow ring */}
              <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-[#39A751]/20 via-transparent to-[#52fe7d]/10 blur-xl" />

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
                    role="img"
                    aria-label="Portrait placeholder"
                  >
                    <span className="font-display text-7xl font-black text-white/10">
                      {profile.initials || 'MK'}
                    </span>
                  </div>
                )}

                {/* Subtle bottom gradient to blend smoothly */}
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-[#0e0e0e]/50 to-transparent" />
              </div>

              {/* Floating availability dot — minimal, no heavy card */}
              <div className="absolute -right-3 top-6 flex items-center gap-1.5 rounded-full border border-[#1e261d] bg-[#141714]/95 px-3 py-1.5 shadow-lg backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-[#39A751] animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-white">Available</span>
              </div>
            </div>
          </Reveal>

        </div>
      </div>

      {/* ── Capability strip ── */}
      <div id="capability-strip" className="relative z-10 border-t border-[#1e261d] bg-[#0b0f0b]">
        <div className="container-page py-5">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
            {CAPABILITIES.map((cap) => {
              const IconComp = cap.icon
              return (
                <div
                  key={cap.title}
                  className="flex items-center gap-3 rounded-xl border border-[#1e261d]/60 bg-[#141714]/40 p-3.5 transition hover:border-[#39A751]/25 hover:bg-[#141714]"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#1e2b1a] border border-[#39A751]/30 text-[#52fe7d]">
                    <IconComp className="h-3.5 w-3.5" />
                  </span>
                  <div>
                    <h3 className="font-display text-xs font-bold text-white">{cap.title}</h3>
                    <p className="text-[10px] font-medium text-[#52fe7d]">{cap.detail}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
