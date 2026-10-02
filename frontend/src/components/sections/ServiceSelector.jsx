import { Link } from 'react-router-dom'
import { ArrowRight, Globe, Zap, ShoppingCart, LayoutDashboard, Calendar, Smartphone, Server, Wrench } from 'lucide-react'
import Reveal from '../common/Reveal'

const SERVICE_ITEMS = [
  {
    slug: 'business-websites',
    title: 'Business Websites',
    desc: 'Clean, responsive multi-page sites that represent your company credibly and rank well.',
    icon: Globe,
  },
  {
    slug: 'landing-pages',
    title: 'Landing Pages',
    desc: 'Conversion-focused, high-speed single pages built for campaigns and product launches.',
    icon: Zap,
  },
  {
    slug: 'ecommerce',
    title: 'E-Commerce Solutions',
    desc: 'Modern online storefronts with clear checkout flows and payment processor integrations.',
    icon: ShoppingCart,
  },
  {
    slug: 'custom-web-apps',
    title: 'Custom Web Applications',
    desc: 'Full-stack software: React on frontend, FastAPI on backend, structured relational data.',
    icon: LayoutDashboard,
  },
  {
    slug: 'dashboards-booking',
    title: 'Dashboards & Booking Systems',
    desc: 'Interactive operational dashboards, calendar booking workflows, and client management.',
    icon: Calendar,
  },
  {
    slug: 'mobile-apps',
    title: 'Mobile Apps (iOS & Android)',
    desc: 'Cross-platform mobile apps with React Native or Flutter, plus native Swift and Kotlin.',
    icon: Smartphone,
  },
  {
    slug: 'api-database',
    title: 'API & Database Integration',
    desc: 'FastAPI services, asynchronous REST endpoints, and Supabase / PostgreSQL schema design.',
    icon: Server,
  },
  {
    slug: 'maintenance',
    title: 'Maintenance & Improvements',
    desc: 'Code health audits, performance tuning, bug fixes, dependency updates, and feature additions.',
    icon: Wrench,
  },
]

export default function ServiceSelector() {
  return (
    <section
      id="service-selector"
      aria-label="What do you need built?"
      className="section-pad bg-[#0e0e0e] border-t border-[#1e261d]"
    >
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-[#52fe7d] lowercase mb-2">offerings</p>
            <h2 className="mt-3 section-heading">
              What do you need built?
            </h2>
            <p className="mt-4 mx-auto max-w-xl text-base text-[#d2d7dc] leading-relaxed">
              Select the service that fits your current project. Your choice automatically carries into the inquiry form so we can discuss specific scope right away.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICE_ITEMS.map((item, i) => {
            const IconComp = item.icon
            return (
              <Reveal key={item.slug} delay={i * 45}>
                <Link
                  to={`/support?service=${item.slug}`}
                  className="group flex h-full flex-col justify-between rounded-xl border border-[#1e261d] bg-[#141714] p-5 transition-all duration-200 hover:-translate-y-1 hover:border-[#39A751]/50 hover:bg-[#161d15] hover:shadow-lg hover:shadow-[#39A751]/10 focus-visible:ring-2 focus-visible:ring-[#39A751]"
                >
                  <div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1e2b1a] border border-[#39A751]/30 text-[#52fe7d] transition group-hover:bg-[#39A751] group-hover:text-white">
                      <IconComp className="h-5 w-5" />
                    </div>

                    <h3 className="mt-4 font-display text-base font-bold text-white group-hover:text-[#52fe7d] transition-colors">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-xs leading-relaxed text-[#8a949e]">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center gap-1.5 pt-3 border-t border-[#1e261d] text-xs font-semibold text-[#39A751] group-hover:text-[#52fe7d]">
                    <span>Start inquiry</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={350}>
          <div className="mt-8 text-center sm:text-left">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#d2d7dc] hover:text-[#52fe7d] transition"
            >
              <span>Explore full services breakdown & deliverables</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
