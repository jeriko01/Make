import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Terminal, Server, Zap, LayoutDashboard, Smartphone } from 'lucide-react'
import Reveal from '../common/Reveal'
import { useLanguage } from '../../context/LanguageContext'

export default function Hero() {
  const { lang } = useLanguage()

  const fullBadgeText = 'Senior DevOps & Full-Stack Platform Engineer'
  const [badgeText, setBadgeText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (isHovered) return

    let timer
    if (!isDeleting && badgeText === fullBadgeText) {
      timer = setTimeout(() => {
        setIsDeleting(true)
      }, 2000)
    } else if (isDeleting && badgeText === '') {
      timer = setTimeout(() => {
        setIsDeleting(false)
      }, 500)
    } else {
      const speed = isDeleting ? 30 : 55
      timer = setTimeout(() => {
        const nextText = isDeleting
          ? fullBadgeText.slice(0, badgeText.length - 1)
          : fullBadgeText.slice(0, badgeText.length + 1)
        setBadgeText(nextText)
      }, speed)
    }

    return () => clearTimeout(timer)
  }, [badgeText, isDeleting, isHovered])

  const CAPABILITIES = [
    {
      icon: Server,
      title: lang === 'so' ? 'DevOps & Kaabayaasha Cloud' : 'DevOps & Cloud Architecture',
    },
    {
      icon: Zap,
      title: lang === 'so' ? 'API-yo Degdeg & Awood Badan' : 'High-Performance APIs',
    },
    {
      icon: LayoutDashboard,
      title: lang === 'so' ? 'Nidaamyada Frontend & Web' : 'Frontend & Web Systems',
    },
    {
      icon: Smartphone,
      title: lang === 'so' ? 'Engineering-ka Apps Moobilka' : 'Mobile & App Engineering',
    },
  ]

  const stats = [
    { num: '3+', label: lang === 'so' ? 'Sano oo Khibrad ah' : 'Years Experience' },
    { num: '99.99%', label: lang === 'so' ? 'Uptime SLA Heer Caalami' : 'Production SLA Uptime' },
    { num: '50+', label: lang === 'so' ? 'Nidaamyo La Deploy-gareeyey' : 'Production Deployments' },
    { num: '$2k+', label: lang === 'so' ? 'Qiimaha Shaqooyinka Remote' : 'Remote Contracts Tier' },
  ]

  return (
    <>
      <section
        id="home"
        aria-label="Hero"
      className="relative flex flex-col justify-between overflow-hidden bg-[#06080E]"
      style={{
        marginTop: '72px',
        minHeight: 'calc(100vh - 72px)',
        backgroundImage: 'linear-gradient(180deg, rgba(6,8,14,0.38) 0%, rgba(6,8,14,0.58) 55%, rgba(6,8,14,0.80) 100%), url(/images/hero-devops-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
      }}
    >

      {/* Main content — 2-column layout: Left text/CTA/stats, Right Image Slot */}
      <div className="relative z-10 my-auto w-full max-w-7xl mx-auto px-5 sm:px-10 lg:px-16 py-12 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          {/* Left Column: Heading, Paragraph, CTA, Stats */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">

            {/* Status badge - Infinite Typewriter, Left-aligned */}
            <Reveal>
              <div
                className="inline-flex items-center justify-start min-h-[34px] sm:min-h-[28px] mb-5 cursor-default select-none group text-left"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <span className="font-mono text-xs sm:text-sm font-semibold tracking-wide text-white transition-all duration-300 group-hover:text-[#38BDF8] group-hover:drop-shadow-[0_0_12px_rgba(56,189,248,0.55)] inline-block text-left leading-snug">
                  {badgeText.length <= 13 ? (
                    badgeText
                  ) : (
                    <>
                      <span className="block sm:inline">{badgeText.slice(0, 13)}</span>
                      <span className="hidden sm:inline"> </span>
                      <span className="block sm:inline">{badgeText.slice(14)}</span>
                    </>
                  )}
                  <span className="inline-block w-[2px] h-[1.1em] ml-1 bg-white align-middle animate-pulse group-hover:bg-[#38BDF8]" />
                </span>
              </div>
            </Reveal>

            {/* Headline — Exactly 2 lines stacked, balanced and symmetrical */}
            <Reveal delay={70}>
              <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] xl:text-[3.15rem] font-black leading-[1.15] tracking-tight text-white text-left">
                {lang === 'so' ? (
                  <>
                    <span className="block text-white">Dhisidda Kaabayaal Adag.</span>
                    <span className="block mt-1 sm:mt-2 bg-gradient-to-r from-[#38BDF8] via-[#0284C7] to-cyan-300 bg-clip-text text-transparent">
                      Gaarsiinta Heer Caalami ah.
                    </span>
                  </>
                ) : (
                  <>
                    <span className="block text-white">Building Resilient Systems.</span>
                    <span className="block mt-1 sm:mt-2 bg-gradient-to-r from-[#38BDF8] via-[#0284C7] to-cyan-300 bg-clip-text text-transparent">
                      Delivering at Global Scale.
                    </span>
                  </>
                )}
              </h1>
            </Reveal>

            {/* Subtext — Clean, human-readable, perfectly weighted */}
            <Reveal delay={140}>
              <p className="mt-5 text-[15px] sm:text-[17px] leading-relaxed text-[#CBD5E1] max-w-xl text-left font-sans">
                {lang === 'so'
                  ? 'Senior DevOps iyo Full-Stack engineer oo shirkadaha ka caawiya dhisidda kaabayaal cloud oo deggan, API-yo xawaare sare leh, iyo barnaamijyo casri ah oo u adkaysta taraafikada dhabta ah.'
                  : 'Senior DevOps & Full-Stack platform engineer helping ambitious teams architect resilient cloud infrastructure, fast APIs, and modern digital products built to scale.'}
              </p>
            </Reveal>

            {/* CTA Buttons — Left-aligned */}
            <Reveal delay={210}>
              <div className="mt-7 flex flex-wrap items-center justify-start gap-3 sm:gap-4 w-full">
                <a
                  href="#estimator"
                  className="group inline-flex items-center justify-center gap-2 rounded-full border border-[#38BDF8]/60 bg-transparent px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-[#38BDF8] hover:bg-[#38BDF8]/10 hover:border-[#38BDF8] hover:-translate-y-0.5 transition-all duration-200 active:translate-y-0 text-center"
                >
                  <span>{lang === 'so' ? 'Qiimee Mashruuca' : 'Estimate Project'}</span>
                  <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
                </a>

                <Link
                  to="/projects"
                  className="group inline-flex items-center justify-center gap-2 rounded-full border border-[#38BDF8]/60 bg-transparent px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-[#38BDF8] hover:bg-[#38BDF8]/10 hover:border-[#38BDF8] hover:-translate-y-0.5 transition-all duration-200 active:translate-y-0 text-center"
                >
                  <Terminal className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                  <span>{lang === 'so' ? 'Mashaariicda' : 'Case Studies'}</span>
                </Link>
              </div>
            </Reveal>

            {/* Stats Bar — Left-aligned */}
            <Reveal delay={280}>
              <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-5 border-t border-[#1E2C4A]/60 w-full">
                {stats.map(({ num, label }) => (
                  <div key={label} className="flex flex-col items-start text-left">
                    <span className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      {num}
                    </span>
                    <span className="text-[11px] sm:text-xs text-[#94A3B8] font-medium mt-1 leading-snug">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right Column: Hero Portrait — Option A: Electric Cyan Glow (Balanced) */}
          <div className="lg:col-span-5 w-full flex items-center justify-center lg:justify-end">
            <Reveal delay={200} className="w-full flex justify-center lg:justify-end items-center">
              <div
                id="hero-image-slot"
                className="relative w-full max-w-[260px] sm:max-w-[290px] lg:max-w-[320px] aspect-[3/4] rounded-2xl border-2 border-[#38BDF8] bg-transparent p-1 shadow-[0_0_28px_rgba(56,189,248,0.3)] group overflow-hidden flex items-center justify-center"
              >
                {/* Soft Electric Cyan ambient backdrop */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#38BDF8]/15 via-transparent to-transparent rounded-2xl" />

                {/* Transparent Portrait — lifted slightly more inside frame */}
                <img
                  src="/images/hero-transparent.png"
                  alt="Senior DevOps & Full-Stack Platform Engineer"
                  className="relative w-full h-full object-contain object-top -translate-y-5 drop-shadow-[0_12px_24px_rgba(0,0,0,0.8)]"
                  loading="eager"
                />
              </div>
            </Reveal>
          </div>

        </div>
      </div>

      {/* Clear bottom edge — thin accent line marks hero section end */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-[#1E2C4A]" />
      <div className="absolute bottom-0 left-6 sm:left-10 lg:left-20 w-24 h-[2px] bg-gradient-to-r from-[#38BDF8] to-transparent" />
    </section>

    {/* Capability Strip — clearly separated section */}
    <section
      id="capabilities"
      aria-label="Capabilities"
      className="bg-[#0A0D16] py-14 sm:py-20"
    >
      <div className="container-page">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {CAPABILITIES.map((cap) => {
            const IconComp = cap.icon
            return (
              <div
                key={cap.title}
                className="group relative flex flex-col items-center justify-start gap-4 rounded-2xl border border-[#1A2640] bg-[#0B1120] px-4 pt-8 pb-7 text-center transition-all duration-300 hover:border-[#38BDF8]/35 hover:bg-[#0D1728] hover:-translate-y-1.5 hover:shadow-[0_4px_32px_rgba(56,189,248,0.07)]"
              >
                {/* corner shimmer */}
                <span className="pointer-events-none absolute top-0 right-0 h-10 w-10 rounded-tr-2xl bg-gradient-to-bl from-[#38BDF8]/8 to-transparent" />

                {/* Icon — 40px fixed */}
                <span
                  className="flex shrink-0 items-center justify-center rounded-xl bg-[#0F1E38] text-[#38BDF8] ring-1 ring-[#1E3A5F] transition-all duration-300 group-hover:bg-[#0284C7]/20 group-hover:text-white group-hover:ring-[#38BDF8]/50"
                  style={{ width: 50, height: 50 }}
                >
                  <IconComp size={24} strokeWidth={1.5} />
                </span>

                <h3 className="font-display text-[13px] sm:text-[14px] font-semibold leading-snug text-[#94A3B8] tracking-tight group-hover:text-white transition-colors">
                  {cap.title}
                </h3>
              </div>
            )
          })}
        </div>
      </div>
    </section>
    </>
  )
}
