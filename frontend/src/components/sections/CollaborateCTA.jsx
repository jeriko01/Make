import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Reveal from '../common/Reveal'
import { useLanguage } from '../../context/LanguageContext'

/**
 * CollaborateCTA — Modern, compact & punchy DevOps-grade project CTA.
 */
export default function CollaborateCTA({
  heading,
  mainHeading,
  body,
  bgImage = '/images/cta-cloud-bg.jpg',
  primaryBtnText,
  primaryBtnTo = '/support',
  secondaryBtnText,
  secondaryBtnTo = '/projects',
}) {
  const { lang } = useLanguage()

  const defaultMain = lang === 'so' ? 'Aan u dhisno si heer caalami ah.' : 'Let’s build it right.'
  const defaultPrimary = lang === 'so' ? 'Bilow Mashruuc' : 'Start a project'
  const defaultSecondary = lang === 'so' ? 'Mashaariicda Kale' : 'Explore all work'
  return (
    <section
      aria-label="Start a project"
      className="section-pad bg-[#06080E] relative overflow-hidden"
    >
      <div className="container-page">
        <Reveal>
          <div
            className="relative mx-auto max-w-3xl overflow-hidden rounded-2xl border border-[#1E2C4A] bg-[#0D1424] p-8 sm:p-11 md:p-12 text-center shadow-2xl transition-all duration-300 hover:border-[#38BDF8]/50"
            style={{
              boxShadow:
                '0 -1px 0 0 rgba(56, 189, 248, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.1), 0 25px 60px -15px rgba(0, 0, 0, 0.9)',
            }}
          >
            {/* ── Crisp & Clearly Visible Background Image ── */}
            <img
              src={bgImage}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-85 brightness-110 contrast-110"
            />
            {/* Subtle dark overlay just enough for text readability */}
            <div className="pointer-events-none absolute inset-0 bg-[#06080E]/55" />

            {/* ── Content ── */}
            <div className="relative z-10 flex flex-col items-center">
              {/* Stacked Proportional Headings */}
              {/* Unified Clean Heading */}
              <div className="max-w-xl mx-auto">
                <h2 className="font-display text-2xl sm:text-3xl lg:text-[2rem] font-bold tracking-tight text-white leading-snug">
                  {heading || mainHeading || defaultMain}
                </h2>
              </div>

              {/* Short & Concise Paragraph — 2 deliberate stacked lines */}
              <p className="mt-3 text-[14px] sm:text-[15px] leading-relaxed text-[#CBD5E1] max-w-lg mx-auto">
                {body || (lang === 'so' ? (
                  <>
                    <span className="block">Waxaan dhisaa nidaamyo web, mobile, iyo cloud ah oo ammaan ah,</span>
                    <span className="block">degdeg badan, oo u adkeysan kara koboc dhab ah oo degdeg ah.</span>
                  </>
                ) : (
                  <>
                    <span className="block">I engineer high-performance web, mobile, and cloud systems</span>
                    <span className="block">architected for resilient scale and zero downtime.</span>
                  </>
                ))}
              </p>

              {/* Side-by-Side Action Buttons */}
              <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-sm mx-auto">
                <Link
                  to={primaryBtnTo}
                  className="group inline-flex items-center justify-center gap-2 rounded-full border border-[#38BDF8]/60 bg-transparent px-7 py-3 text-sm font-semibold text-[#38BDF8] hover:bg-[#38BDF8]/10 hover:border-[#38BDF8] hover:-translate-y-0.5 transition-all duration-200 w-full sm:w-auto"
                >
                  <span>{primaryBtnText || defaultPrimary}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>

                <Link
                  to={secondaryBtnTo}
                  className="group inline-flex items-center justify-center gap-2 rounded-full border border-[#38BDF8]/60 bg-transparent px-7 py-3 text-sm font-semibold text-[#38BDF8] hover:bg-[#38BDF8]/10 hover:border-[#38BDF8] hover:-translate-y-0.5 transition-all duration-200 w-full sm:w-auto"
                >
                  <span>{secondaryBtnText || defaultSecondary}</span>
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
