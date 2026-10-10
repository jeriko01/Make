import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useSiteData } from '../../context/SiteDataContext'
import { useLanguage } from '../../context/LanguageContext'
import Reveal from '../common/Reveal'
import Icon from '../common/Icon'

/**
 * About section.
 * When `brief` is true (used on Home), shows a compact version with capability cards.
 * When used standalone (About page), shows the full bio and principles.
 */
export default function About({ brief = false }) {
  const { lang } = useLanguage()
  const { data } = useSiteData()
  const profile = data?.profile || {}
  const about = data?.about || { cards: [], stats: [] }

  return (
    <section
      id="about"
      aria-label={brief ? 'Capabilities overview' : 'About Make'}
      className="section-pad bg-[#06080E]"
    >
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <Reveal>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-[2rem] font-bold text-white tracking-tight leading-snug">
              {brief
                ? (lang === 'so' ? 'Ku Qotoma 10+ Sano oo Khibrad ah' : 'Built on 10+ Years of Craft')
                : (lang === 'so' ? 'Faahfaahin Naga Saabsan' : 'About Make')}
            </h2>
            <p className="mt-3 mx-auto max-w-lg text-[14px] sm:text-[15px] text-[#94A3B8] leading-relaxed">
              {lang === 'so' ? (
                <>
                  <span className="block">Waxaan caawiyaa kooxaha iyo aasaasayaasha raba nidaamyo deggan</span>
                  <span className="block">oo u adkaysta koboca ganacsiga iyagoo aan marna istaagin.</span>
                </>
              ) : (
                <>
                  <span className="block">Helping founders and engineering teams eliminate downtime,</span>
                  <span className="block">ship reliable code, and scale with confidence.</span>
                </>
              )}
            </p>
            {brief && (
              <div className="mt-6 flex justify-center">
                <Link
                  to="/about-us"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full border border-[#38BDF8]/40 hover:border-[#38BDF8] hover:bg-[#38BDF8]/10 text-[#38BDF8] transition-all"
                >
                  <span>{lang === 'so' ? 'Akhri Khibradda Buuxda' : 'Read Full Background'}</span>
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
