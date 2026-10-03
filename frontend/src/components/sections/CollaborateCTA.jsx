import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Reveal from '../common/Reveal'

/**
 * CollaborateCTA — Modern, compact & punchy DevOps-grade project CTA.
 */
export default function CollaborateCTA({
  heading,
  topHeading = 'Have a project in mind?',
  mainHeading = 'Let’s build it right.',
  body = 'I engineer high-performance web and mobile applications built for scale and reliability.',
  bgImage = '/images/cta-home-bg.jpg',
  primaryBtnText = 'Start a project',
  primaryBtnTo = '/support',
  secondaryBtnText = 'Explore all work',
  secondaryBtnTo = '/projects',
}) {
  return (
    <section
      aria-label="Start a project"
      className="section-pad bg-[#0e0e0e] border-t border-[#1e261d]/60 relative overflow-hidden"
    >
      <div className="container-page">
        <Reveal>
          <div
            className="relative mx-auto max-w-3xl overflow-hidden rounded-2xl border border-[#233522] bg-[#0c100c] p-8 sm:p-11 md:p-12 text-center shadow-2xl transition-all duration-300 hover:border-[#39A751]/50"
            style={{
              boxShadow:
                '0 -1px 0 0 rgba(82, 255, 125, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.1), 0 25px 60px -15px rgba(0, 0, 0, 0.9)',
            }}
          >
            {/* ── Crisp & Clearly Visible Background Image ── */}
            <img
              src={bgImage}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-85 brightness-110 contrast-110"
            />
            {/* Soft Ambient Overlay for Text Readability */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0a0d0a]/70 via-[#0a0d0a]/50 to-[#0a0d0a]/90" />
            <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-48 w-80 rounded-full bg-[#39A751]/20 blur-2xl" />

            {/* ── Content ── */}
            <div className="relative z-10 flex flex-col items-center">
              {/* Stacked Proportional Headings */}
              <div className="space-y-1 max-w-xl mx-auto">
                {heading ? (
                  <h2 className="font-display text-2xl sm:text-3xl md:text-3xl font-extrabold tracking-tight text-white leading-tight">
                    {heading}
                  </h2>
                ) : (
                  <>
                    <span className="block font-display text-sm sm:text-base font-semibold text-[#52fe7d] tracking-tight">
                      {topHeading}
                    </span>
                    <h2 className="font-display text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                      {mainHeading}
                    </h2>
                  </>
                )}
              </div>

              {/* Short & Concise Paragraph */}
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#d2d7dc] max-w-md mx-auto">
                {body}
              </p>

              {/* Side-by-Side Action Buttons */}
              <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full max-w-md mx-auto">
                {primaryBtnText && (
                  <Link
                    to={primaryBtnTo}
                    className="btn-lime w-full sm:w-auto px-7 py-3 text-sm font-bold shadow-lg shadow-[#39A751]/30 hover:shadow-[#39A751]/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    <span>{primaryBtnText}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                )}

                {secondaryBtnText && (
                  <Link
                    to={secondaryBtnTo}
                    className="btn-outline w-full sm:w-auto px-6 py-3 text-sm font-medium hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    <span>{secondaryBtnText}</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
