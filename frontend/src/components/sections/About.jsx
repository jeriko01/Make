import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useSiteData } from '../../context/SiteDataContext'
import Reveal from '../common/Reveal'
import Icon from '../common/Icon'

/**
 * About section.
 * When `brief` is true (used on Home), shows a compact version with capability cards.
 * When used standalone (About page), shows the full bio and principles.
 */
export default function About({ brief = false }) {
  const { data } = useSiteData()
  const profile = data?.profile || {}
  const about = data?.about || { cards: [], stats: [] }

  return (
    <section
      id="about"
      aria-label={brief ? 'Capabilities overview' : 'About Make'}
      className="section-pad bg-[#0e0e0e] border-t border-[#1e261d]"
    >
      <div className="container-page">
        {/* Header - Centered */}
        <div className="mx-auto max-w-2xl text-center mb-12">
          <Reveal>
            <p className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-[#52fe7d] lowercase mb-2">capabilities</p>
            <h2 className="section-heading">
              {brief
                ? 'Engineering dependable systems across the stack'
                : 'About Make'}
            </h2>
            <p className="mt-4 mx-auto max-w-xl text-base text-[#d2d7dc] leading-relaxed">
              {profile.short_bio || profile.long_bio || 'Senior engineer specializing in web and mobile applications.'}
            </p>
            {brief && (
              <div className="mt-6 flex justify-center">
                <Link
                  to="/about"
                  className="btn-outline inline-flex items-center gap-2 text-sm"
                >
                  <span>More about Make & engineering values</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </Reveal>
        </div>

        {/* ── Capability cards ── */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {about.cards.map((c, i) => (
              <Reveal key={c.id} delay={i * 70}>
                <div className="group rounded-xl border border-[#1e261d] bg-[#141714] p-6 transition-all duration-200 hover:border-[#39A751]/40 hover:bg-[#161d15] hover:shadow-lg hover:shadow-[#39A751]/10">
                  {/* Icon */}
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1e2b1a] border border-[#39A751]/30 text-[#52fe7d] transition group-hover:bg-[#39A751] group-hover:text-white">
                    <Icon name={c.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display font-bold text-white group-hover:text-[#52fe7d] transition-colors">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#8a949e]">
                    {c.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    )
  }
