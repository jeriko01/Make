import Reveal from '../common/Reveal'
import { useSiteData } from '../../context/SiteDataContext'

export default function ProcessSection() {
  const { data } = useSiteData()
  const steps = data?.process || []

  if (steps.length === 0) return null

  return (
    <section
      id="process"
      aria-label="How I work"
      className="section-pad bg-[#0e0e0e] border-t border-[#1e261d]"
    >
      <div className="container-page">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-eyebrow-lime">Workflow</p>
            <h2 className="mt-3 section-heading">How I work</h2>
            <p className="mt-4 mx-auto max-w-xl text-[#d2d7dc] text-base leading-relaxed">
              Four disciplined phases, zero ambiguity. Every engagement follows a dependable, collaborative cycle from day one to handoff.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal key={step.id} delay={i * 70}>
              <div className="group relative flex h-full flex-col justify-between rounded-xl border border-[#1e261d] bg-[#141714] p-7 transition-all duration-200 hover:-translate-y-1 hover:border-[#39A751]/40 hover:bg-[#161d15] hover:shadow-lg hover:shadow-[#39A751]/10">
                <div>
                  {/* Step number */}
                  <div className="flex items-center justify-between">
                    <span className="font-display text-4xl font-black text-[#1e261d] transition-colors group-hover:text-[#39A751]/60">
                      {step.step}
                    </span>
                    <span className="h-2 w-2 rounded-full bg-[#1e261d] transition-colors group-hover:bg-[#39A751]" />
                  </div>

                  {/* Neon accent rule */}
                  <div className="mt-4 mb-4 h-0.5 w-8 bg-[#39A751] rounded-full" />

                  <h3 className="font-display text-lg font-bold text-white group-hover:text-[#52fe7d] transition-colors">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-xs leading-relaxed text-[#8a949e]">
                    {step.body}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#1e261d]/60 text-[11px] font-mono text-[#52fe7d]/70">
                  Phase {step.step} · Milestones Verified
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
