import { useNavigate } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Globe, Zap, ShoppingCart, LayoutDashboard, Calendar, Smartphone, Server, Wrench } from 'lucide-react'
import { SiteDataProvider, useSiteData } from '../context/SiteDataContext'
import PageLayout from '../components/layout/PageLayout'
import Reveal from '../components/common/Reveal'
import CollaborateCTA from '../components/sections/CollaborateCTA'
import ProjectPlanner from '../components/sections/ProjectPlanner'

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

function ServiceCard({ service, index }) {
  const navigate = useNavigate()
  const IconComp = ICON_MAP[service.icon] || Globe

  const handleChoose = () => {
    navigate(`/support?service=${service.slug}`)
  }

  return (
    <Reveal delay={index * 50}>
      <article className="group flex h-full flex-col justify-between rounded-xl border border-[#1e261d] bg-[#141714] p-7 transition-all duration-200 hover:-translate-y-1 hover:border-[#39A751]/50 hover:bg-[#161d15] hover:shadow-xl hover:shadow-[#39A751]/10">
        <div>
          {/* Header row */}
          <div className="flex items-center justify-between gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1e2b1a] border border-[#39A751]/30 text-[#52fe7d] transition group-hover:scale-105 group-hover:bg-[#39A751] group-hover:text-white">
              <IconComp className="h-6 w-6" />
            </span>
            <span className="rounded-full border border-[#1e261d] bg-[#0e0e0e] px-3 py-1 text-[11px] font-mono font-medium text-[#52fe7d]">
              Service {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          {/* Title */}
          <h2 className="mt-5 font-display text-xl font-bold text-white group-hover:text-[#52fe7d] transition-colors">
            {service.title}
          </h2>

          {/* Target Audience Pill */}
          <div className="mt-3 inline-block rounded-md border border-[#1e261d] bg-[#161d15] px-2.5 py-1 text-xs text-[#8a949e]">
            {service.audience}
          </div>

          {/* Description */}
          <p className="mt-4 text-xs sm:text-sm leading-relaxed text-[#d2d7dc]">
            {service.description}
          </p>

          {/* Deliverables Checklist */}
          {service.deliverables?.length > 0 && (
            <div className="mt-6 border-t border-[#1e261d] pt-5">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#8a949e] mb-3">
                Key Deliverables
              </p>
              <ul className="space-y-2" aria-label="What is delivered">
                {service.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-2.5 text-xs text-[#d2d7dc]">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#39A751]" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Selection CTA carries selection into inquiry form */}
        <div className="mt-8 pt-4 border-t border-[#1e261d]">
          <button
            type="button"
            onClick={handleChoose}
            className="btn-lime w-full justify-center gap-2 py-3 text-xs sm:text-sm shadow-md shadow-[#39A751]/20 cursor-pointer"
            aria-label={`Select ${service.title} and start inquiry`}
          >
            <span>Choose this service</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </article>
    </Reveal>
  )
}

function ServicesContent() {
  const { data } = useSiteData()
  const services = data?.services || []

  return (
    <>
      {/* Page Hero */}
      <div className="bg-[#0e0e0e] pt-32 pb-16 border-b border-[#1e261d]">
        <div className="container-page">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#39A751]/30 bg-[#1e2b1a] px-3.5 py-1 text-xs font-bold tracking-widest text-[#52fe7d]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#39A751] animate-pulse" />
              <span>SERVICES &amp; SOLUTIONS</span>
            </div>
            <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Software engineering offerings
            </h1>
            <p className="mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-[#d2d7dc]">
              Specialized web, mobile, and API development services. Every project includes structured architecture, clean TypeScript or Python source code, and full intellectual property ownership.
            </p>
          </Reveal>
        </div>
      </div>

      {/* 8 Selectable Services Grid */}
      <section className="section-pad bg-[#0e0e0e]" aria-label="Services List">
        <div className="container-page">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {services.map((s, i) => (
              <ServiceCard key={s.id || s.slug} service={s} index={i} />
            ))}
          </div>

          {/* Engagement models assurance block */}
          <Reveal delay={250}>
            <div className="mt-16 rounded-xl border border-[#1e261d] bg-[#141714] p-8 sm:p-10 shadow-2xl">
              <h3 className="font-display text-xl font-bold text-white">
                How we work together
              </h3>
              <p className="mt-2 text-sm text-[#8a949e] max-w-2xl">
                Clear collaboration models tailored to your timeline, requirements, and internal team composition.
              </p>

              <div className="mt-8 grid gap-6 md:grid-cols-3">
                <div className="rounded-lg border border-[#1e261d] bg-[#0e0e0e] p-5">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#52fe7d]">Model 01</span>
                  <h4 className="mt-2 font-display text-base font-bold text-white">Milestone-Based Fixed Scope</h4>
                  <p className="mt-2 text-xs leading-relaxed text-[#8a949e]">
                    Ideal for MVPs, business websites, or defined feature sets. Clear deliverables, fixed deadlines, and zero scope creep.
                  </p>
                </div>

                <div className="rounded-lg border border-[#1e261d] bg-[#0e0e0e] p-5">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#52fe7d]">Model 02</span>
                  <h4 className="mt-2 font-display text-base font-bold text-white">Dedicated Sprint Engagements</h4>
                  <p className="mt-2 text-xs leading-relaxed text-[#8a949e]">
                    Two-week agile sprints embedded alongside your product team to ship complex full-stack features or mobile apps.
                  </p>
                </div>

                <div className="rounded-lg border border-[#1e261d] bg-[#0e0e0e] p-5">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#52fe7d]">Model 03</span>
                  <h4 className="mt-2 font-display text-base font-bold text-white">Maintenance &amp; Advisory</h4>
                  <p className="mt-2 text-xs leading-relaxed text-[#8a949e]">
                    Ongoing technical guardianship: security patches, performance tuning, and technical guidance on architecture.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Interactive Customer Project Planner */}
      <ProjectPlanner />

      {/* Final Collaborate CTA */}
      <CollaborateCTA
        heading="Have a custom product in mind?"
        body="Select one of the services above to jump directly into the inquiry form, or send a general description of your project."
      />
    </>
  )
}

export default function Services() {
  return (
    <SiteDataProvider>
      <PageLayout
        title="Services"
        description="Software engineering services by Make: business websites, custom web apps, mobile apps, and API integrations."
      >
        <ServicesContent />
      </PageLayout>
    </SiteDataProvider>
  )
}
