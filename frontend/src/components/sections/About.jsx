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
      className="section-pad bg-[#06080E] border-t border-[#1E2C4A]"
    >
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <Reveal>
            <p className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-[#38BDF8] lowercase mb-2">capabilities</p>
            <h2 className="section-heading">
              {brief
                ? 'Engineering dependable systems across the stack'
                : 'About Make'}
            </h2>
            <p className="mt-4 mx-auto max-w-xl text-base text-[#CBD5E1] leading-relaxed">
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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {about.cards.map((c, i) => (
              <Reveal key={c.id} delay={i * 70}>
                <div className="group rounded-xl border border-[#1E2C4A] bg-[#0D1424] p-6 transition-all duration-200 hover:border-[#0284C7]/40 hover:bg-[#111A30] hover:shadow-lg hover:shadow-[#0284C7]/10">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#131F37] border border-[#0284C7]/30 text-[#38BDF8] transition group-hover:bg-[#0284C7] group-hover:text-white">
                    <Icon name={c.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display font-bold text-white group-hover:text-[#38BDF8] transition-colors">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#94A3B8]">
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
