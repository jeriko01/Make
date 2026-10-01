import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import Reveal from '../common/Reveal'

/**
 * CollaborateCTA — Final project inquiry CTA block.
 */
export default function CollaborateCTA({ heading, body }) {
  return (
    <section
      aria-label="Start a project"
      className="section-pad bg-[#0e0e0e] border-t border-[#1e261d]"
    >
      <div className="container-page">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-[#1e261d] bg-[#141714] p-8 sm:p-12 md:p-16 shadow-2xl"
               style={{
                 boxShadow: '0 -1px 0 0 #52ff7d29, 0 0 0 1px rgba(255, 255, 255, 0.12), 0 20px 50px rgba(0, 0, 0, 0.7)'
               }}>

            {/* Background subtle neon glow */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[#39A751]/10 blur-3xl" />
            <div className="pointer-events-none absolute -left-20 -bottom-20 h-80 w-80 rounded-full bg-[#52fe7d]/5 blur-3xl" />

            <div className="relative z-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                {/* Clean plain text in lowercase (no button) */}
                <p className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-[#52fe7d] lowercase mb-2">
                  start a project
                </p>

                <h2 className="mt-4 font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                  {heading || 'Ready to build your next web or mobile product?'}
                </h2>

                <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#d2d7dc] max-w-xl">
                  {body ||
                    'Share what you need built. I will review your goals and respond with a clear breakdown, recommended tech architecture, and actionable next steps.'}
                </p>

                {/* Value list */}
                <div className="mt-8 space-y-3">
                  {[
                    'Direct communication with the engineer building your product',
                    'Clean TypeScript & Python architecture with full code ownership',
                    'Predictable milestone delivery with working software from sprint one',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1e2b1a] text-[#52fe7d]">
                        <CheckCircle2 className="h-4 w-4" />
                      </span>
                      <span className="text-xs sm:text-sm font-medium text-[#d2d7dc]">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Column */}
              <div className="flex flex-col items-start lg:items-center justify-center gap-4 rounded-xl border border-[#1e261d] bg-[#0e0e0e]/80 p-8 text-center backdrop-blur-md">
                <p className="font-display text-lg font-bold text-white">
                  Let&apos;s build something dependable
                </p>
                <p className="text-xs text-[#8a949e] max-w-xs">
                  No commitment required. Inquiries are answered within one business day.
                </p>

                <div className="mt-2 w-full space-y-3">
                  <Link
                    to="/support"
                    className="btn-lime w-full gap-2 py-3.5 text-base shadow-lg shadow-[#39A751]/25 hover:shadow-[#39A751]/40"
                  >
                    <span>Let&apos;s collaborate</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <Link
                    to="/projects"
                    className="btn-outline w-full gap-2 py-3 text-sm"
                  >
                    <span>Explore project gallery</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
