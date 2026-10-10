import Reveal from '../common/Reveal'
import { useSiteData } from '../../context/SiteDataContext'
import { useLanguage } from '../../context/LanguageContext'

export default function ProcessSection() {
  const { lang } = useLanguage()
  const { data } = useSiteData()
  const steps = data?.process || []

  if (steps.length === 0) return null

  return (
    <section
      id="process"
      aria-label="How I work"
      className="section-pad bg-[#06080E] border-t border-[#1E2C4A]"
    >
      <div className="container-page">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="font-display text-2xl sm:text-3xl lg:text-[2rem] font-bold text-white tracking-tight leading-snug">
              {lang === 'so' ? 'Sida Aan U Wada Shaqeyno' : 'How We Deliver Together'}
            </h2>
            <p className="mt-3 mx-auto max-w-lg text-[14px] sm:text-[15px] text-[#94A3B8] leading-relaxed">
              {lang === 'so' ? (
                <>
                  <span className="block">Afar weji oo cad, qorshaysan, oo bilaa mugdi ah</span>
                  <span className="block">laga bilaabo maabka koowaad ilaa wareejinta koodhka.</span>
                </>
              ) : (
                <>
                  <span className="block">A clear four-phase delivery cycle with complete transparency</span>
                  <span className="block">from architecture planning to final launch.</span>
                </>
              )}
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal key={step.id} delay={i * 70}>
              <div className="group relative flex h-full flex-col justify-between rounded-xl border border-[#1E2C4A] bg-[#0D1424] p-7 transition-all duration-200 hover:-translate-y-1 hover:border-[#0284C7]/40 hover:bg-[#111A30] hover:shadow-lg hover:shadow-[#0284C7]/10">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-4xl font-black text-[#1E2C4A] transition-colors group-hover:text-[#0284C7]/60">
                      {step.step}
                    </span>
                    <span className="h-2 w-2 rounded-full bg-[#1E2C4A] transition-colors group-hover:bg-[#0284C7]" />
                  </div>

                  <div className="mt-4 mb-4 h-0.5 w-8 bg-[#0284C7] rounded-full" />

                  <h3 className="font-display text-lg font-bold text-white group-hover:text-[#38BDF8] transition-colors">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-xs leading-relaxed text-[#94A3B8]">
                    {step.body}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#1E2C4A]/60 text-[11px] font-mono text-[#38BDF8]/70">
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
