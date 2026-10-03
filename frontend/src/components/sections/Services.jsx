import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Globe, Zap, ShoppingCart, LayoutDashboard, Calendar, Smartphone, Server, Wrench } from 'lucide-react'
import { useSiteData } from '../../context/SiteDataContext'
import Reveal from '../common/Reveal'

const ICON_MAP = {
  Globe,
  Zap,
  ShoppingCart,
  LayoutDashboard,
  Calendar,
  Smartphone,
  Server,
  Wrench,
}

export default function Services() {
  const { data } = useSiteData()
  const navigate = useNavigate()
  const services = (data?.services || []).slice(0, 4) // Show top 4 offerings

  return (
    <section id="services" className="section-pad bg-[#06080E] border-t border-[#1E2C4A]">
      <div className="container-page">
        <div className="flex items-end justify-between gap-4">
          <Reveal>
            <p className="section-eyebrow-lime">Capabilities</p>
            <h2 className="mt-2 section-heading">Software Engineering Services</h2>
          </Reveal>
          <Reveal delay={60}>
            <Link
              to="/services"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#CBD5E1] hover:text-[#38BDF8] transition shrink-0"
            >
              <span>Explore all services</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => {
            const IconComp = ICON_MAP[s.icon] || Globe
            return (
              <Reveal key={s.id || s.slug} delay={i * 60}>
                <div className="group flex h-full flex-col justify-between rounded-xl border border-[#1E2C4A] bg-[#0D1424] p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[#0284C7]/40 hover:bg-[#111A30] hover:shadow-lg hover:shadow-[#0284C7]/10">
                  <div>
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#131F37] border border-[#0284C7]/30 text-[#38BDF8] transition group-hover:scale-105 group-hover:bg-[#0284C7] group-hover:text-white">
                      <IconComp className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 font-display text-base font-bold text-white leading-snug group-hover:text-[#38BDF8] transition-colors">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-[#94A3B8]">
                      {s.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-[#1E2C4A]">
                    <button
                      type="button"
                      onClick={() => navigate(`/support?service=${s.slug}`)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#0284C7] hover:text-[#38BDF8] transition cursor-pointer"
                    >
                      <span>Select service</span>
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
