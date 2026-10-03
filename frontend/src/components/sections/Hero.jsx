import { Link } from 'react-router-dom'
import { ArrowRight, ExternalLink, Code2, Smartphone, Server, Cpu } from 'lucide-react'
import { useSiteData } from '../../context/SiteDataContext'
import Reveal from '../common/Reveal'

/** Credibility / Capability strip items */
const CAPABILITIES = [
  {
    icon: Code2,
    title: 'Frontend Systems',
    detail: 'React · TypeScript · Tailwind',
    desc: 'High-performance interactive interfaces',
  },
  {
    icon: Smartphone,
    title: 'Mobile Engineering',
    detail: 'React Native · iOS · Android',
    desc: 'Smooth native-feel cross-platform apps',
  },
  {
    icon: Server,
    title: 'Backend & APIs',
    detail: 'FastAPI · Python · REST',
    desc: 'Robust async architectures & logic',
  },
  {
    icon: Cpu,
    title: 'Data & DevOps',
    detail: 'PostgreSQL · Docker · Supabase',
    desc: 'Scalable data models & deployment',
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
      style={{
        backgroundImage: 'url(/images/skills-hero-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[#0e0e0e]/80" />
      <div className="pointer-events-none absolute -left-64 top-0 h-[500px] w-[500px] rounded-full bg-[#39A751]/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-48 top-20 h-[400px] w-[400px] rounded-full bg-[#52fe7d]/6 blur-[100px]" />

      <div className="container-page relative z-10 my-auto py-10 lg:py-14">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">

          <div className="order-1 lg:order-1">
            <Reveal>
              <p className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-[#52fe7d] lowercase">
                make · web &amp; mobile application engineer
              </p>
            </Reveal>

            <Reveal delay={70}>
              <h1 className="mt-5 font-display text-2xl sm:text-4xl lg:text-[2.75rem] xl:text-5xl font-extrabold leading-[1.12] tracking-tight text-white">
                Web and mobile products,{' '}
                <span className="text-[#52fe7d]">built to work.</span>
              </h1>
            </Reveal>

            <Reveal delay={150}>
              <p className="mt-5 max-w-lg text-sm sm:text-base leading-relaxed text-[#8a949e] sm:text-[17px]">
                {hero.description ||
                  'I turn product ideas into clear, dependable applications—from the first screen to the API and data behind it.'}
              </p>
            </Reveal>

            <Reveal delay={220}>
              <div className="mt-8 flex flex-row items-center gap-2.5 sm:gap-3.5">
                <Link
                  to={hero.primary_cta_href || '/projects'}
                  className="btn-lime flex-1 sm:flex-initial shrink-0 justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-bold shadow-lg shadow-[#39A751]/20 hover:shadow-[#39A751]/35 transition-all text-center whitespace-nowrap"
                >
                  <span>{hero.primary_cta_label || 'Explore my work'}</span>
                  <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                </Link>

                <Link
                  to={hero.secondary_cta_href || '/support'}
                  className="btn-outline flex-1 sm:flex-initial shrink-0 justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm transition-all text-center whitespace-nowrap"
                >
                  <span>{hero.secondary_cta_label || "Let's collaborate"}</span>
                  <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={290}>
              <div className="mt-8 flex items-center justify-between sm:justify-start gap-4 sm:gap-7">
                {[
                  { num: '3+', label: 'Years Experience' },
                  { num: '20+', label: 'Projects Shipped' },
                  { num: '100%', label: 'Client Satisfaction' },
                ].map(({ num, label }) => (
                  <div key={label}>
                    <p className="font-display text-lg sm:text-xl font-black text-white">{num}</p>
                    <p className="text-[10px] sm:text-[11px] text-[#8a949e] font-medium">{label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={120} className="order-2 mx-auto w-full max-w-[270px] sm:max-w-[320px] lg:max-w-[360px] lg:order-2 lg:mx-0 lg:ml-auto">
            <div className="relative">
              <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-[#39A751]/20 via-transparent to-[#52fe7d]/10 blur-xl" />

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

                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-[#0e0e0e]/50 to-transparent" />
              </div>
            </div>
          </Reveal>

        </div>
      </div>

      <div id="capability-strip" className="relative z-10 border-t border-[#1e261d]/80 bg-[#0a0d0a]/90 backdrop-blur-md">
        <div className="container-page py-4 sm:py-5">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {CAPABILITIES.map((cap) => {
              const IconComp = cap.icon
              return (
                <div
                  key={cap.title}
                  className="group flex items-center gap-3 rounded-xl border border-[#1e261d] bg-[#121512]/60 p-3 sm:p-3.5 transition-all duration-200 hover:border-[#39A751]/40 hover:bg-[#161a16] hover:shadow-lg hover:shadow-[#39A751]/5"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#182216] border border-[#39A751]/30 text-[#52fe7d] transition-all group-hover:scale-105 group-hover:bg-[#1e2b1a] group-hover:border-[#52fe7d]/50">
                    <IconComp className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-xs font-bold text-white tracking-tight truncate group-hover:text-[#52fe7d] transition-colors">{cap.title}</h3>
                    <p className="text-[10px] font-medium text-[#8a949e] truncate">{cap.detail}</p>
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
