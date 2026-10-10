import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Code2,
  Smartphone,
  Server,
  LayoutDashboard,
  ShoppingCart,
  Globe,
  Zap,
  Cpu,
} from 'lucide-react'
import Reveal from '../common/Reveal'
import { useLanguage } from '../../context/LanguageContext'

const SERVICE_ITEMS = [
  {
    slug: 'custom-web-apps',
    badge: 'FULL STACK',
    title: 'Custom Web Applications',
    desc: 'React frontend, FastAPI backend, and structured PostgreSQL models engineered for speed.',
    icon: Code2,
  },
  {
    slug: 'mobile-apps',
    badge: 'IOS & ANDROID',
    title: 'Mobile Applications',
    desc: 'Cross-platform React Native and Flutter apps with native device performance and animations.',
    icon: Smartphone,
  },
  {
    slug: 'api-database',
    badge: 'BACKEND & CLOUD',
    title: 'Cloud APIs & Microservices',
    desc: 'High-throughput asynchronous REST endpoints and scalable Supabase schema architectures.',
    icon: Server,
  },
  {
    slug: 'dashboards-booking',
    badge: 'SAAS & OPS',
    title: 'Dashboards & SaaS Systems',
    desc: 'Real-time operational metrics, multi-tenant user portals, and automated business workflows.',
    icon: LayoutDashboard,
  },
  {
    slug: 'ecommerce',
    badge: 'COMMERCE',
    title: 'E-Commerce Solutions',
    desc: 'Custom high-conversion storefronts, seamless Stripe checkouts, and inventory sync.',
    icon: ShoppingCart,
  },
  {
    slug: 'business-websites',
    badge: 'WEB PLATFORMS',
    title: 'High-Performance Websites',
    desc: 'Accessible, modern web platforms engineered for search authority and sub-second load times.',
    icon: Globe,
  },
  {
    slug: 'landing-pages',
    badge: 'CONVERSIONS',
    title: 'Campaign Landing Pages',
    desc: 'Ultra-fast launch pages with tight analytics tracking and automated lead capture flows.',
    icon: Zap,
  },
  {
    slug: 'maintenance',
    badge: 'DEVOPS & AUDITS',
    title: 'Architecture & DevOps',
    desc: 'Codebase health audits, CI/CD pipeline automation, security hardening, and performance tuning.',
    icon: Cpu,
  },
]

export default function ServiceSelector() {
  const { lang } = useLanguage()

  return (
    <section
      id="service-selector"
      aria-label="Engineering offerings"
      className="section-pad bg-[#06080E] relative overflow-hidden"
    >
      <div className="container-page relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-[2rem] font-bold text-white tracking-tight leading-snug">
              {lang === 'so' ? 'Waxa Aan Dhisno & Xalka Farsamo' : 'What I Build & Engineer'}
            </h2>
            <p className="mt-3 mx-auto max-w-lg text-[14px] sm:text-[15px] text-[#94A3B8] leading-relaxed">
              {lang === 'so' ? (
                <>
                  <span className="block">Laga bilaabo kaabayaasha server-yada cloud-ka</span>
                  <span className="block">ilaa barnaamijyada casriga ah ee web-ka iyo apps-ka mobile-ka.</span>
                </>
              ) : (
                <>
                  <span className="block">From high-throughput cloud infrastructure</span>
                  <span className="block">to fluid web and mobile digital products.</span>
                </>
              )}
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICE_ITEMS.map((item, i) => {
            const IconComp = item.icon
            return (
              <Reveal key={item.slug} delay={i * 35}>
                <Link
                  to={`/support?service=${item.slug}`}
                  className="group relative flex h-full flex-col justify-between rounded-xl border border-[#1E2C4A] bg-[#0D1424] p-5 transition-all duration-200 hover:-translate-y-1 hover:border-[#38BDF8]/50 hover:bg-[#111A30] hover:shadow-xl hover:shadow-[#38BDF8]/10 focus-visible:ring-2 focus-visible:ring-[#38BDF8]"
                  style={{
                    boxShadow: '0 4px 20px -5px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.04)',
                  }}
                >
                  <div>
                    {/* Top Row: Icon + Badge */}
                    <div className="flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#131F37] border border-[#38BDF8]/30 text-[#38BDF8] transition-all group-hover:scale-105 group-hover:bg-[#0284C7] group-hover:text-white">
                        <IconComp className="h-5 w-5" />
                      </div>
                      <span className="rounded-md border border-[#1E2C4A] bg-[#06080E] px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-[#94A3B8] group-hover:border-[#38BDF8]/30 group-hover:text-[#38BDF8] transition-colors">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="mt-4 font-display text-base font-bold text-white group-hover:text-[#38BDF8] transition-colors">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-xs leading-relaxed text-[#94A3B8] group-hover:text-[#CBD5E1] transition-colors">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center gap-1.5 pt-3.5 border-t border-[#1E2C4A]/80 text-xs font-semibold text-[#38BDF8] transition-colors">
                    <span>Discuss scope</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={300}>
          <div className="mt-10 flex items-center justify-center">
            <Link
              to="/services"
              className="btn-outline gap-2 px-6 py-3 text-sm font-medium hover:border-[#38BDF8] transition"
            >
              <span>Explore full service breakdowns & deliverables</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
