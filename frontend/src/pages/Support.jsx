import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import {
  Mail, MapPin, Send, CheckCircle2, AlertCircle, ChevronDown,
  Clock, Shield, MessageSquare, Globe, ArrowRight, Zap,
} from 'lucide-react'
import { submitContact } from '../lib/contact'
import { SiteDataProvider, useSiteData } from '../context/SiteDataContext'
import PageLayout from '../components/layout/PageLayout'
import Reveal from '../components/common/Reveal'

const SERVICE_OPTIONS = [
  { value: '',                   label: 'Select a service…' },
  { value: 'business-websites',  label: 'Business Websites' },
  { value: 'landing-pages',      label: 'Landing Pages' },
  { value: 'ecommerce',          label: 'E-Commerce Solutions' },
  { value: 'custom-web-apps',    label: 'Custom Web Applications' },
  { value: 'dashboards-booking', label: 'Dashboards & Booking Systems' },
  { value: 'mobile-apps',        label: 'Mobile Apps (iOS & Android)' },
  { value: 'api-database',       label: 'API & Database Integration' },
  { value: 'maintenance',        label: 'Maintenance & Improvements' },
]

const SLUG_ALIASES = {
  'business-portfolio-website': 'business-websites',
  'landing-ecommerce': 'landing-pages',
  'web-application': 'custom-web-apps',
  'mobile-app': 'mobile-apps',
  'backend-api': 'api-database',
}

const PLATFORM_OPTIONS = [
  { value: '',            label: 'Target platform (optional)' },
  { value: 'web',         label: 'Web browser only' },
  { value: 'ios',         label: 'iOS (Apple App Store)' },
  { value: 'android',     label: 'Android (Google Play)' },
  { value: 'both-mobile', label: 'Cross-platform (iOS + Android)' },
  { value: 'api-only',    label: 'API / Backend service only' },
]

const EMPTY_FORM = {
  name: '', email: '', service: '', platform: '',
  description: '', timeline: '', budget: '', website: '',
}

function validate(v) {
  const e = {}
  if (!v.name.trim())        e.name        = 'Please enter your name.'
  if (!v.email.trim())       e.email       = 'Please enter your email address.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email))
                             e.email       = 'Please enter a valid email address.'
  if (!v.service)            e.service     = 'Please select a service.'
  if (!v.description.trim()) e.description = 'Please describe your project briefly.'
  else if (v.description.trim().length < 20)
                             e.description = 'Please provide at least 20 characters.'
  return e
}

const SUPPORT_FAQ = [
  { q: 'How quickly will I receive a reply?',
    a: 'I review inquiries and respond within one business day with technical thoughts, recommended stack, and next steps.' },
  { q: 'Do you work with international clients?',
    a: 'Yes. All engagements are remote with asynchronous updates and scheduled video milestones.' },
  { q: 'What information helps in the initial inquiry?',
    a: 'Briefly mention the core goal, who will use it, any preferred tech constraints or existing repositories, and your target timeline.' },
  { q: 'Will my contact information be shared?',
    a: 'Never. Your name and email are solely used to communicate regarding your project inquiry.' },
]

const WHY_ITEMS = [
  { icon: Clock,          title: '< 24h Response',      desc: 'Every inquiry reviewed and replied to within one business day.' },
  { icon: Globe,          title: 'Remote-First',         desc: 'Fully async-friendly with structured milestone check-ins.' },
  { icon: Shield,         title: 'NDA Available',        desc: 'Happy to sign NDAs before reviewing proprietary work.' },
  { icon: MessageSquare,  title: 'Direct Communication', desc: 'You talk directly to the engineer — no account manager.' },
]

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-[#1E2C4A] last:border-none">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className="flex w-full items-start justify-between gap-4 py-4 text-left focus-visible:rounded-lg focus-visible:ring-2 focus-visible:ring-[#0284C7]"
        aria-expanded={open}
      >
        <span className="text-sm font-medium text-white transition-colors hover:text-[#38BDF8]">{q}</span>
        <ChevronDown className={`mt-0.5 h-4 w-4 shrink-0 text-[#38BDF8] transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-48' : 'max-h-0'}`}>
        <p className="pb-4 text-xs leading-relaxed text-[#94A3B8]">{a}</p>
      </div>
    </div>
  )
}

function Field({ id, label, error, textarea, required, hint, ...props }) {
  const base = `w-full rounded-xl border bg-[#06080E] px-4 py-3 text-sm text-white placeholder-[#4a5568] outline-none transition focus:ring-2 focus:ring-[#0284C7]/60 ${
    error ? 'border-red-500/60' : 'border-[#1E2C4A] focus:border-[#0284C7]/60'
  }`
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#CBD5E1]">
        {label}{required && <span className="ml-1 text-[#38BDF8]" aria-hidden="true">*</span>}
      </label>
      {hint && <p className="mb-2 text-xs text-[#94A3B8]">{hint}</p>}
      {textarea
        ? <textarea id={id} rows={5} className={base} aria-invalid={!!error} aria-required={required} {...props} />
        : <input id={id} className={base} aria-invalid={!!error} aria-required={required} {...props} />
      }
      {error && (
        <p id={`${id}-err`} role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />{error}
        </p>
      )}
    </div>
  )
}

function SelectField({ id, label, error, required, options, ...props }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#CBD5E1]">
        {label}{required && <span className="ml-1 text-[#38BDF8]" aria-hidden="true">*</span>}
      </label>
      <select
        id={id}
        className={`w-full appearance-none rounded-xl border bg-[#06080E] px-4 py-3 text-sm text-white outline-none transition focus:ring-2 focus:ring-[#0284C7]/60 ${
          error ? 'border-red-500/60' : 'border-[#1E2C4A] focus:border-[#0284C7]/60'
        }`}
        aria-invalid={!!error}
        aria-required={required}
        {...props}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-[#0D1424] text-white">{o.label}</option>
        ))}
      </select>
      {error && (
        <p id={`${id}-err`} role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />{error}
        </p>
      )}
    </div>
  )
}

function InquiryForm() {
  const { data } = useSiteData()
  const [searchParams] = useSearchParams()
  const rawServiceParam = searchParams.get('service') || ''
  const resolvedService = SLUG_ALIASES[rawServiceParam] || rawServiceParam

  const dbServices = data?.services && data.services.length > 0
    ? data.services.map(s => ({ value: s.slug || s.title?.toLowerCase().replace(/\s+/g, '-'), label: s.title }))
    : []

  const serviceOptions = [
    { value: '', label: 'Select a service…' },
    ...(dbServices.length > 0 ? dbServices : SERVICE_OPTIONS.slice(1))
  ]

  const [values, setValues] = useState(() => ({ ...EMPTY_FORM, service: resolvedService }))
  const [errors, setErrors] = useState({})
  const [formStatus, setFormStatus] = useState('idle')
  const [serverError, setServerError] = useState('')
  useEffect(() => {
    const svc = searchParams.get('service')
    if (svc) setValues(v => ({ ...v, service: SLUG_ALIASES[svc] || svc }))
  }, [searchParams])

  const set = (k) => (ev) => setValues(v => ({ ...v, [k]: ev.target.value }))

  async function handleSubmit(ev) {
    ev.preventDefault()
    if (values.website) return
    const errs = validate(values)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return
    setFormStatus('submitting')
    setServerError('')
    try {
      await submitContact({
        name:    values.name,
        email:   values.email,
        subject: `Service inquiry: ${serviceOptions.find(o => o.value === values.service)?.label || values.service}`,
        message: `Service: ${values.service}\nPlatform: ${values.platform || 'Not specified'}\nTimeline: ${values.timeline || 'Not specified'}\nBudget: ${values.budget || 'Not specified'}\n\n${values.description}`,
        website: values.website,
      })
      setFormStatus('success')
      setValues(EMPTY_FORM)
    } catch (err) {
      setFormStatus('error')
      setServerError(err.message || 'Something went wrong. Please try again.')
    }
  }

  if (formStatus === 'success') {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-[#0284C7]/40 bg-[#0e1a0e] p-12 text-center" role="status">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#0284C7]/40 bg-[#131F37]">
          <CheckCircle2 className="h-8 w-8 text-[#38BDF8]" />
        </div>
        <h3 className="mt-5 font-display text-2xl font-bold text-white">Inquiry received</h3>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-[#94A3B8]">
          Thanks for reaching out. I will review your requirements and reply by email — typically within one business day.
        </p>
        <div className="mt-7 flex flex-row items-center justify-center gap-2.5 sm:gap-3 w-full max-w-sm">
          <button
            type="button"
            onClick={() => setFormStatus('idle')}
            className="btn-outline flex-1 sm:flex-initial shrink-0 justify-center px-3 sm:px-5 py-2.5 text-xs sm:text-sm text-center whitespace-nowrap"
          >
            Send another inquiry
          </button>
          <Link
            to="/projects"
            className="btn-lime flex-1 sm:flex-initial shrink-0 justify-center items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2.5 text-xs sm:text-sm font-bold text-center whitespace-nowrap"
          >
            <span>View projects</span>
            <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Project inquiry form" className="space-y-5">

      {values.service && (
        <div className="flex items-center justify-between rounded-xl border border-[#0284C7]/35 bg-[#131F37] px-4 py-3 text-xs">
          <div className="flex items-center gap-2 text-[#38BDF8]">
            <Zap className="h-3.5 w-3.5" />
            <span>Selected: <strong>{SERVICE_OPTIONS.find(o => o.value === values.service)?.label || values.service}</strong></span>
          </div>
          <button type="button" onClick={() => setValues(v => ({ ...v, service: '' }))} className="text-[#94A3B8] underline hover:text-white transition text-xs">
            Change
          </button>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Your Name" required type="text" autoComplete="name"
          placeholder="Jane Doe" value={values.name} onChange={set('name')} error={errors.name} />
        <Field id="email" label="Email Address" required type="email" autoComplete="email"
          placeholder="jane@company.com" value={values.email} onChange={set('email')} error={errors.email} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField id="service" label="Service Required" required
          options={SERVICE_OPTIONS} value={values.service} onChange={set('service')} error={errors.service} />
        <SelectField id="platform" label="Target Platform"
          options={PLATFORM_OPTIONS} value={values.platform} onChange={set('platform')} />
      </div>

      <Field id="description" label="Project Description & Goals" required textarea
        hint="What are you building? Who will use it? What's the main goal?"
        placeholder="Describe your product requirements, existing codebase or designs, and target functionality…"
        value={values.description} onChange={set('description')} error={errors.description} />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="timeline" label="Target Timeline (optional)" type="text"
          placeholder="e.g. 4–6 weeks, Q2 release" value={values.timeline} onChange={set('timeline')} />
        <Field id="budget" label="Estimated Budget (optional)" type="text"
          placeholder="e.g. $3,000 – $7,000" value={values.budget} onChange={set('budget')} />
      </div>

      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Leave empty</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off"
          value={values.website} onChange={set('website')} />
      </div>

      {formStatus === 'error' && (
        <div className="flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-950/20 px-4 py-3" role="alert">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
          <p className="text-xs text-red-300">{serverError}</p>
        </div>
      )}

      <p className="text-[11px] text-[#4a5568]">
        Your details are strictly used to respond to this inquiry and are never shared with third parties.
      </p>

      <button
        type="submit"
        disabled={formStatus === 'submitting'}
        className="btn-lime w-full gap-2.5 py-4 text-sm font-bold shadow-xl shadow-[#0284C7]/20 hover:shadow-[#0284C7]/35 transition-all"
      >
        {formStatus === 'submitting' ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            <span>Sending inquiry…</span>
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            <span>Send project inquiry</span>
          </>
        )}
      </button>
    </form>
  )
}

function SupportContent() {
  const { data } = useSiteData()
  const info = data?.contact_info || {}
  const profile = data?.profile || {}
  const email = profile.email || info.email || 'hello@make.dev'
  const location = profile.location || info.location || 'Available Worldwide · Remote'

  return (
    <>
      <div
        className="relative overflow-hidden border-b border-[#1E2C4A] pt-32 pb-24"
        style={{
          backgroundImage: 'url(/images/support-hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[#06080E]/82" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#06080E]" />
        <div className="pointer-events-none absolute right-0 top-0 h-[450px] w-[450px] translate-x-1/3 rounded-full bg-[#0284C7]/8 blur-[130px]" />

        <div className="container-page relative z-10 mx-auto max-w-3xl text-center">
          <Reveal>
            <h1 className="font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.25rem]">
              Let&apos;s build something{' '}
              <span className="text-[#38BDF8]">together.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#94A3B8] sm:text-lg">
              Share your project vision, scope, or technical challenge. I reply with architecture recommendations, recommended stack, and estimated milestones.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {WHY_ITEMS.map((item, i) => {
                const IconComp = item.icon
                return (
                  <Reveal key={item.title} delay={i * 50}>
                    <div className="flex flex-col items-center gap-2 rounded-xl border border-[#1E2C4A] bg-[#0D1424]/80 p-4 text-center backdrop-blur-sm">
                      <IconComp className="h-5 w-5 text-[#38BDF8]" />
                      <p className="text-xs font-bold text-white">{item.title}</p>
                      <p className="text-[10px] leading-snug text-[#94A3B8]">{item.desc}</p>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </Reveal>
        </div>
      </div>

      <section className="section-pad bg-[#06080E]" aria-label="Contact and inquiry">
        <div className="container-page grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">

          <div className="space-y-5">

            <Reveal>
              <div className="rounded-2xl border border-[#1E2C4A] bg-[#0D1424] p-6">
                <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#38BDF8]">Direct Contact</p>
                <h2 className="mt-2 font-display text-lg font-bold text-white">Get in touch</h2>

                <div className="mt-5 space-y-4">
                  <a
                    href={`mailto:${email}`}
                    className="group flex items-center gap-3 rounded-xl border border-[#1E2C4A] bg-[#06080E] p-3.5 transition hover:border-[#0284C7]/50 hover:bg-[#131F37]"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#0284C7]/25 bg-[#131F37] text-[#38BDF8] transition group-hover:bg-[#0284C7] group-hover:text-white">
                      <Mail className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-[10px] text-[#94A3B8]">Email</p>
                      <p className="text-xs font-semibold text-white group-hover:text-[#38BDF8] transition">{email}</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-3 rounded-xl border border-[#1E2C4A] bg-[#06080E] p-3.5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#1E2C4A] bg-[#0D1424] text-[#38BDF8]">
                      <MapPin className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-[10px] text-[#94A3B8]">Location</p>
                      <p className="text-xs font-semibold text-white">{location}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 rounded-xl border border-[#0284C7]/25 bg-[#131F37] px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#38BDF8] shadow-[0_0_6px_rgba(82,254,125,0.8)]" />
                    <p className="text-xs font-bold text-[#38BDF8]">Currently accepting new projects</p>
                  </div>
                  <p className="mt-1.5 text-[11px] leading-relaxed text-[#94A3B8]">
                    Replies within 24 business hours with concrete technical recommendations.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="rounded-2xl border border-[#1E2C4A] bg-[#0D1424] p-6">
                <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#38BDF8]">Common Questions</p>
                <h2 className="mt-2 mb-1 font-display text-base font-bold text-white">Quick answers</h2>
                {SUPPORT_FAQ.map((item) => (
                  <FAQItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="rounded-2xl border border-[#1E2C4A] bg-[#0D1424] p-5">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-[#38BDF8]" />
                  <p className="text-xs font-bold text-white">Confidentiality</p>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-[#94A3B8]">
                  NDAs are signed prior to reviewing any proprietary designs, codebases, or intellectual property.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={60}>
            <div
              className="relative overflow-hidden rounded-2xl border border-[#1E2C4A] bg-[#0D1424] p-7 sm:p-9"
              style={{ boxShadow: '0 0 0 1px rgba(57,167,81,0.08), 0 30px 60px rgba(0,0,0,0.6), 0 -1px 0 0 rgba(82,254,125,0.12)' }}
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#38BDF8]/40 to-transparent" />

              <div className="mb-7 border-b border-[#1E2C4A] pb-6">
                <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#38BDF8]">Project Inquiry</p>
                <h2 className="mt-2 font-display text-2xl font-bold text-white">Tell me about your project</h2>
                <p className="mt-1.5 text-sm text-[#94A3B8]">
                  Fill in the details below and I&apos;ll come back with a concrete technical response.
                </p>
              </div>

              <InquiryForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

export default function SupportPage() {
  return (
    <SiteDataProvider>
      <PageLayout
        title="Support"
        description="Contact Make to discuss your web application, mobile app, API integration, or maintenance requirements."
      >
        <SupportContent />
      </PageLayout>
    </SiteDataProvider>
  )
}
