import Reveal from '../common/Reveal'
import { useSiteData } from '../../context/SiteDataContext'
import { useLanguage } from '../../context/LanguageContext'

export default function PrinciplesSection() {
  const { lang } = useLanguage()
  const { data } = useSiteData()
  const principles = data?.about?.principles || []

  if (principles.length === 0) return null

  return (
    <section
      id="principles"
      aria-label="Engineering principles"
      className="section-pad bg-[#06080E] border-t border-[#1E2C4A]"
    >
      <div className="container-page">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="font-display text-2xl sm:text-3xl lg:text-[2rem] font-bold text-white tracking-tight leading-snug">
              {lang === 'so' ? 'Halbeegyada & Falsafada Tayada' : 'Standards That Guide Every Build'}
            </h2>
            <p className="mt-3 mx-auto max-w-lg text-[14px] sm:text-[15px] text-[#94A3B8] leading-relaxed">
              {lang === 'so' ? (
                <>
                  <span className="block">Xeerarka dhabta ah ee tooska u haga amniga koodhka,</span>
                  <span className="block">xawaaraha shaqada, iyo adkeysiga nidaamkaaga.</span>
                </>
              ) : (
                <>
                  <span className="block">Practical engineering standards that directly govern</span>
                  <span className="block">codebase resilience, delivery speed, and zero-downtime reliability.</span>
                </>
              )}
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {principles.map((p, i) => (
            <Reveal key={p.id} delay={i * 60}>
              <div className="group rounded-xl border border-[#1E2C4A] bg-[#0D1424] p-7 transition-all duration-200 hover:-translate-y-1 hover:border-[#0284C7]/40 hover:bg-[#111A30] hover:shadow-lg hover:shadow-[#0284C7]/10">
                <div className="mb-4 h-1 w-8 rounded-full bg-[#0284C7] transition-all duration-300 group-hover:w-14 group-hover:bg-[#38BDF8]" />
                <h3 className="font-display text-lg font-bold text-white group-hover:text-[#38BDF8] transition-colors">
                  {p.label}
                </h3>
                <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-[#94A3B8]">
                  {p.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
