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
      className="section-pad bg-[#0e0e0e] border-t border-[#1e261d]"
    >
      <div className="container-page">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-[#52fe7d] lowercase mb-2">standards</p>
            <h2 className="mt-3 section-heading">
              Engineering principles
            </h2>
            <p className="mt-4 mx-auto max-w-xl text-[#d2d7dc] text-base leading-relaxed">
              These are not generic slogans—they are the practical standards that directly influence code structure, delivery speed, and system reliability.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {principles.map((p, i) => (
            <Reveal key={p.id} delay={i * 60}>
              <div className="group rounded-xl border border-[#1e261d] bg-[#141714] p-7 transition-all duration-200 hover:-translate-y-1 hover:border-[#39A751]/40 hover:bg-[#161d15] hover:shadow-lg hover:shadow-[#39A751]/10">
                {/* Neon accent bar */}
                <div className="mb-4 h-1 w-8 rounded-full bg-[#39A751] transition-all duration-300 group-hover:w-14 group-hover:bg-[#52fe7d]" />
                <h3 className="font-display text-lg font-bold text-white group-hover:text-[#52fe7d] transition-colors">
                  {p.label}
                </h3>
                <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-[#8a949e]">
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
