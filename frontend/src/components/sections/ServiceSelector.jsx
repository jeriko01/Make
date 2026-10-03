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
  return (
    <section
      id="service-selector"
      aria-label="Engineering offerings"
      className="section-pad bg-[#0e0e0e] border-t border-[#1e261d]/80 relative overflow-hidden"
    >
      <div className="container-page relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#39A751]/30 bg-[#1e2b1a]/70 px-3.5 py-1 text-xs font-mono font-semibold tracking-wide text-[#52fe7d] shadow-sm backdrop-blur-md mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#52fe7d] animate-pulse" />
              <span>SPECIALIZED ENGINEERING</span>
            </div>
            <h2 className="section-heading">
              Focused capabilities, built for production.
            </h2>
            <p className="mt-3.5 mx-auto max-w-xl text-sm sm:text-base text-[#8a949e] leading-relaxed">
              From early-stage product prototypes to enterprise cloud infrastructure — select an engineering domain to start your project inquiry.
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
                  className="group relative flex h-full flex-col justify-between rounded-xl border border-[#1e261d] bg-[#121512] p-5 transition-all duration-200 hover:-translate-y-1 hover:border-[#39A751]/50 hover:bg-[#151915] hover:shadow-xl hover:shadow-[#39A751]/10 focus-visible:ring-2 focus-visible:ring-[#39A751]"
                  style={{
                    boxShadow: '0 4px 20px -5px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.04)',
                  }}
                >
                  <div>
                    {/* Top Row: Icon + Badge */}
                    <div className="flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#182216] border border-[#39A751]/30 text-[#52fe7d] transition-all group-hover:scale-105 group-hover:bg-[#39A751] group-hover:text-white">
                        <IconComp className="h-5 w-5" />
                      </div>
                      <span className="rounded-md border border-[#1e261d] bg-[#0c100c] px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-[#8a949e] group-hover:border-[#39A751]/30 group-hover:text-[#52fe7d] transition-colors">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="mt-4 font-display text-base font-bold text-white group-hover:text-[#52fe7d] transition-colors">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-xs leading-relaxed text-[#8a949e] group-hover:text-[#a8b3be] transition-colors">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center gap-1.5 pt-3.5 border-t border-[#1e261d]/80 text-xs font-semibold text-[#52fe7d] transition-colors">
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
              className="btn-outline gap-2 px-6 py-3 text-sm font-medium hover:border-[#39A751] transition"
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
