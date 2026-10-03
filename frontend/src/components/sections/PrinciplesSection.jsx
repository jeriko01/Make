import Reveal from '../common/Reveal'
import { useSiteData } from '../../context/SiteDataContext'

export default function PrinciplesSection() {
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
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-[#38BDF8] lowercase mb-2">standards</p>
            <h2 className="mt-3 section-heading">
              Engineering principles
            </h2>
            <p className="mt-4 mx-auto max-w-xl text-[#CBD5E1] text-base leading-relaxed">
              These are not generic slogans—they are the practical standards that directly influence code structure, delivery speed, and system reliability.
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
