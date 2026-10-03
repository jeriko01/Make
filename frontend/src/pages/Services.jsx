import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  CheckCircle2,
  Globe,
  Zap,
  ShoppingCart,
  LayoutDashboard,
  Calendar,
  Smartphone,
  Server,
  Wrench,
  Shield,
  Clock,
  Star,
  Users,
} from 'lucide-react'
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

const MODELS = [
  {
    id: '01',
    title: 'Milestone-Based Fixed Scope',
    desc: 'Ideal for MVPs and defined feature sets. Clear deliverables, fixed deadlines, zero scope creep.',
    badge: 'Most Popular',
    icon: Star,
  },
  {
    id: '02',
    title: 'Dedicated Sprint Engagement',
    desc: 'Two-week agile sprints embedded alongside your product team to ship complex full-stack features.',
    badge: null,
    icon: Clock,
  },
  {
    id: '03',
    title: 'Maintenance & Advisory',
    desc: 'Ongoing technical guardianship: patches, performance tuning, and architecture guidance.',
    badge: null,
    icon: Users,
  },
]

const GUARANTEES = [
  'Direct engineering — no outsourcing, ever',
  'Full source code & IP ownership transferred',
  'Responsive across mobile, tablet, and desktop',
  'OWASP-aligned security on every project',
  'Structured documentation on handover',
  'Post-launch support window included',
]

function ServiceCard({ service, index }) {
  const navigate = useNavigate()
  const IconComp = ICON_MAP[service.icon] || Globe

  return (
    <Reveal delay={index * 55}>
      <article
        className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-[#1E2C4A] bg-[#0D1424] p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#0284C7]/60 hover:shadow-2xl hover:shadow-[#0284C7]/10"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#38BDF8]/0 to-transparent transition-all duration-300 group-hover:via-[#38BDF8]/60" />

        <div>
          <div className="flex items-center justify-between">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#0284C7]/25 bg-[#131F37] text-[#38BDF8] transition-all duration-300 group-hover:scale-110 group-hover:border-[#0284C7]/70 group-hover:bg-[#0284C7] group-hover:text-white">
              <IconComp className="h-5 w-5" />
            </span>
            <span className="font-mono text-[11px] font-bold tracking-widest text-[#0284C7]/60">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          <h2 className="mt-5 font-display text-lg font-bold leading-snug text-white transition-colors duration-200 group-hover:text-[#38BDF8]">
            {service.title}
          </h2>

          {service.audience && (
            <p className="mt-2 text-xs text-[#94A3B8]">{service.audience}</p>
          )}

          <p className="mt-3 text-sm leading-relaxed text-[#94A3B8]">
            {service.description}
          </p>

          {service.deliverables?.length > 0 && (
            <ul className="mt-5 space-y-1.5" aria-label="Key deliverables">
              {service.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-2 text-xs text-[#CBD5E1]">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0284C7]" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-7 border-t border-[#1E2C4A] pt-5">
          <button
            type="button"
            onClick={() => navigate(`/support?service=${service.slug}`)}
            className="group/btn flex w-full items-center justify-center gap-2 rounded-xl bg-[#131F37] border border-[#0284C7]/30 py-2.5 text-xs font-semibold text-[#38BDF8] transition-all duration-200 hover:bg-[#0284C7] hover:text-white hover:border-[#0284C7] hover:shadow-lg hover:shadow-[#0284C7]/20"
            aria-label={`Select ${service.title}`}
          >
            <span>Choose this service</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
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
      <div
        className="relative overflow-hidden border-b border-[#1E2C4A] pt-32 pb-24"
        style={{
          backgroundImage: 'url(/images/services-hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[#06080E]/78" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#06080E]" />
        <div className="pointer-events-none absolute -left-64 top-0 h-[500px] w-[500px] rounded-full bg-[#0284C7]/10 blur-[130px]" />
        <div className="pointer-events-none absolute right-0 top-1/3 h-[300px] w-[300px] rounded-full bg-[#38BDF8]/5 blur-[100px]" />

        <div className="container-page relative z-10 mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="font-mono text-xs font-semibold tracking-widest text-[#38BDF8] lowercase">
              services &amp; solutions
            </p>

            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
              Engineering services{' '}
              <span className="text-[#38BDF8]">built for real products</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#94A3B8] sm:text-lg">
              Specialized web, mobile, and API development with clean architecture, type-safe codebases, and full IP ownership on handover.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-8 border-t border-[#1E2C4A]/60 pt-8">
              {[
                { num: '8', label: 'Service Areas' },
                { num: '3+', label: 'Years Active' },
                { num: '20+', label: 'Projects Shipped' },
                { num: '100%', label: 'IP Ownership Transferred' },
              ].map(({ num, label }) => (
                <div key={label} className="text-center">
                  <p className="font-display text-2xl font-black text-white">{num}</p>
                  <p className="mt-0.5 text-[11px] font-medium text-[#94A3B8]">{label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      <section className="section-pad bg-[#06080E]" aria-label="Services">
        <div className="container-page">
          <Reveal>
            <div className="mb-12 text-center">
              <p className="font-mono text-xs font-semibold tracking-widest text-[#38BDF8] lowercase">what i build</p>
              <h2 className="mt-3 font-display text-3xl font-extrabold text-white sm:text-4xl">
                Choose your service
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-[#94A3B8]">
                Each service is a standalone engagement. Select one below — your choice carries directly into the inquiry form.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {services.map((s, i) => (
              <ServiceCard key={s.id || s.slug} service={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#1E2C4A] bg-[#06080E] py-14" aria-label="Engineering guarantees">
        <div className="container-page">
          <Reveal>
            <div className="mx-auto mb-8 max-w-xl text-center">
              <p className="font-mono text-xs font-semibold tracking-widest text-[#38BDF8] lowercase">every project</p>
              <h2 className="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">
                What&apos;s included — always
              </h2>
            </div>
          </Reveal>
          <div className="mx-auto grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {GUARANTEES.map((g, i) => (
              <Reveal key={g} delay={i * 40}>
                <div className="flex items-start gap-3 rounded-xl border border-[#1E2C4A] bg-[#0D1424] px-5 py-4">
                  <Shield className="mt-0.5 h-4 w-4 shrink-0 text-[#0284C7]" />
                  <p className="text-sm text-[#CBD5E1]">{g}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-[#06080E]" aria-label="Engagement models">
        <div className="container-page">
          <Reveal>
            <div className="mb-12 text-center">
              <p className="font-mono text-xs font-semibold tracking-widest text-[#38BDF8] lowercase">how we work</p>
              <h2 className="mt-3 font-display text-3xl font-extrabold text-white sm:text-4xl">
                Three collaboration models
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-[#94A3B8]">
                Tailored to your timeline, team, and project complexity.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {MODELS.map((m, i) => {
              const IconComp = m.icon
              return (
                <Reveal key={m.id} delay={i * 80}>
                  <div className="group relative flex h-full flex-col rounded-2xl border border-[#1E2C4A] bg-[#0D1424] p-7 transition-all duration-300 hover:border-[#0284C7]/50 hover:shadow-xl hover:shadow-[#0284C7]/8">
                    {m.badge && (
                      <span className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-[#0284C7]/40 bg-[#131F37] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#38BDF8]">
                        <Star className="h-3 w-3" />
                        {m.badge}
                      </span>
                    )}
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#0284C7]/25 bg-[#131F37] text-[#38BDF8] transition group-hover:bg-[#0284C7] group-hover:text-white">
                        <IconComp className="h-5 w-5" />
                      </span>
                      <span className="font-mono text-xs font-bold tracking-widest text-[#0284C7]/60">
                        Model {m.id}
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-lg font-bold text-white">{m.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-[#94A3B8]">{m.desc}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <ProjectPlanner />

      <CollaborateCTA
        topHeading="Tailored engineering"
        mainHeading="Need a custom solution built?"
        body="Whether building a new product from scratch or scaling an existing system, I engineer reliable software tailored to your exact business goals."
        bgImage="/images/cta-services-bg.jpg"
        primaryBtnText="Request a proposal"
        primaryBtnTo="/support"
        secondaryBtnText="Check tech stack"
        secondaryBtnTo="/skills"
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
