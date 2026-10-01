import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import {
  Mail, MapPin, Send, CheckCircle2, AlertCircle, ChevronDown,
} from 'lucide-react'
import { api } from '../lib/api'
import { SiteDataProvider, useSiteData } from '../context/SiteDataContext'
import PageLayout from '../components/layout/PageLayout'
import Reveal from '../components/common/Reveal'

/* ── Service options matching all 8 offerings ── */
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

// Normalize any legacy slugs into current slugs
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
  name: '',
  email: '',
  service: '',
  platform: '',
  description: '',
  timeline: '',
  budget: '',
  website: '', // honeypot
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
                             e.description = 'Please provide at least 20 characters describing the project.'
  return e
}

/* ── FAQ for the Support page ── */
const SUPPORT_FAQ = [
  {
    q: 'How quickly will I receive a reply?',
    a: 'I review inquiries and respond within one business day with technical thoughts, recommended stack, and next steps.',
  },
  {
    q: 'Do you work with international clients?',
    a: 'Yes. All engagements are remote with asynchronous updates and scheduled video milestones.',
  },
  {
    q: 'What information helps in the initial inquiry?',
    a: 'Briefly mention the core goal, who will use it, any preferred tech constraints or existing repositories, and your target timeline.',
  },
  {
    q: 'Will my contact information be shared?',
    a: 'Never. Your name and email are solely used to communicate regarding your project inquiry.',
  },
]

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-[#1e261d] last:border-none">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className="flex w-full items-start justify-between gap-4 py-4 text-left transition focus-visible:rounded-lg focus-visible:ring-2 focus-visible:ring-[#39A751]"
        aria-expanded={open}
      >
        <span className="font-display font-medium text-white text-sm hover:text-[#52fe7d] transition-colors">
          {q}
        </span>
        <ChevronDown className={`mt-0.5 h-4 w-4 shrink-0 text-[#52fe7d] transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-200 ${open ? 'max-h-48' : 'max-h-0'}`}>
        <p className="pb-4 text-xs text-[#8a949e] leading-relaxed">{a}</p>
      </div>
    </div>
  )
}

function Field({ id, label, error, textarea, required, hint, children, ...props }) {
  const baseClass = `field-input-dark ${error ? 'field-input-error' : ''}`
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-white">
        {label}
        {required && <span className="ml-1 text-[#52fe7d]" aria-hidden="true">*</span>}
      </label>
      {hint && <p className="mb-1.5 text-xs text-[#8a949e]">{hint}</p>}
      {children
        ? children
        : textarea
          ? (
            <textarea
              id={id}
              rows={5}
              className={baseClass}
              aria-invalid={!!error}
              aria-describedby={error ? `${id}-err` : undefined}
              aria-required={required}
              {...props}
            />
          ) : (
            <input
              id={id}
              className={baseClass}
              aria-invalid={!!error}
              aria-describedby={error ? `${id}-err` : undefined}
              aria-required={required}
              {...props}
            />
          )
      }
      {error && (
        <p id={`${id}-err`} role="alert" className="mt-1.5 flex items-center gap-1 text-xs text-red-400">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  )
}

function Select({ id, label, error, required, options, ...props }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-white">
        {label}
        {required && <span className="ml-1 text-[#52fe7d]" aria-hidden="true">*</span>}
      </label>
      <select
        id={id}
        className={`field-input-dark appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='%2352fe7d' d='M8 10L3 5h10z'/%3E%3C/svg%3E")] bg-no-repeat bg-[right_0.75rem_center] pr-10 ${error ? 'field-input-error' : ''}`}
        aria-invalid={!!error}
        aria-required={required}
        {...props}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-[#141714] text-white">
            {o.label}
          </option>
        ))}
      </select>
      {error && (
        <p id={`${id}-err`} role="alert" className="mt-1.5 flex items-center gap-1 text-xs text-red-400">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  )
}

function InquiryForm() {
  const [searchParams] = useSearchParams()
  const rawServiceParam = searchParams.get('service') || ''
  const resolvedService = SLUG_ALIASES[rawServiceParam] || rawServiceParam

  const [values, setValues] = useState(() => ({
    ...EMPTY_FORM,
    service: resolvedService,
  }))
  const [errors, setErrors] = useState({})
  const [formStatus, setFormStatus] = useState('idle') // idle | submitting | success | error
  const [serverError, setServerError] = useState('')
  const [backendReady, setBackendReady] = useState(null)

  useEffect(() => {
    const svc = searchParams.get('service')
    if (svc) {
      setValues((v) => ({ ...v, service: SLUG_ALIASES[svc] || svc }))
    }
  }, [searchParams])

  useEffect(() => {
    // Check backend health honestly
    api.get('/health')
      .then(() => setBackendReady(true))
      .catch(() => setBackendReady(false))
  }, [])

  const set = (k) => (ev) => setValues((v) => ({ ...v, [k]: ev.target.value }))

  async function handleSubmit(ev) {
    ev.preventDefault()
    if (values.website) return // honeypot

    const errs = validate(values)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setFormStatus('submitting')
    setServerError('')

    try {
      await api.post('/contact', {
        name:     values.name,
        email:    values.email,
        subject:  `Service inquiry: ${SERVICE_OPTIONS.find(o => o.value === values.service)?.label || values.service}`,
        message:  `Service: ${values.service}\nPlatform: ${values.platform || 'Not specified'}\nTimeline: ${values.timeline || 'Not specified'}\nBudget: ${values.budget || 'Not specified'}\n\n${values.description}`,
        website:  values.website,
      })
      setFormStatus('success')
      setValues(EMPTY_FORM)
    } catch (err) {
      setFormStatus('error')
      setServerError(
        err.status === 503 || !backendReady
          ? 'FastAPI backend connection is not configured yet. Please email Make directly.'
          : (err.message || 'Something went wrong. Please try again.')
      )
    }
  }

  if (formStatus === 'success') {
    return (
      <div className="rounded-xl border border-[#39A751]/40 bg-[#161d15] p-10 text-center" role="status">
        <CheckCircle2 className="mx-auto mb-4 h-14 w-14 text-[#52fe7d]" />
        <h3 className="font-display text-2xl font-bold text-white">Inquiry received</h3>
        <p className="mt-3 text-[#d2d7dc] max-w-sm mx-auto text-sm leading-relaxed">
          Thanks for reaching out. I will review your requirements and reply by email—typically within one business day.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={() => setFormStatus('idle')}
            className="btn-outline text-xs px-5 py-2.5"
          >
            Send another inquiry
          </button>
          <Link to="/projects" className="btn-lime text-xs px-5 py-2.5">
            Explore project gallery
          </Link>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Project inquiry form">
      <div className="space-y-5">

        {/* Selected Service indicator */}
        {values.service && (
          <div className="flex items-center justify-between rounded-lg border border-[#39A751]/30 bg-[#1e2b1a]/60 px-4 py-2.5 text-xs text-[#52fe7d]">
            <span>Selected Service: <strong>{SERVICE_OPTIONS.find(o => o.value === values.service)?.label || values.service}</strong></span>
            <button
              type="button"
              onClick={() => setValues(v => ({ ...v, service: '' }))}
              className="text-xs text-[#8a949e] hover:text-white underline cursor-pointer"
            >
              Change
            </button>
          </div>
        )}

        {/* Name + Email */}
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            id="name"
            label="Your Name"
            required
            type="text"
            autoComplete="name"
            placeholder="Jane Doe"
            value={values.name}
            onChange={set('name')}
            error={errors.name}
          />
          <Field
            id="email"
            label="Email Address"
            required
            type="email"
            autoComplete="email"
            placeholder="jane@example.com"
            value={values.email}
            onChange={set('email')}
            error={errors.email}
          />
        </div>

        {/* Service selector */}
        <Select
          id="service"
          label="Service Required"
          required
          options={SERVICE_OPTIONS}
          value={values.service}
          onChange={set('service')}
          error={errors.service}
        />

        {/* Platform */}
        <Select
          id="platform"
          label="Target Platform"
          options={PLATFORM_OPTIONS}
          value={values.platform}
          onChange={set('platform')}
        />

        {/* Description */}
        <Field
          id="description"
          label="Project Description & Goals"
          required
          textarea
          hint="What are you building? Who will use it? What is the main outcome?"
          placeholder="Describe your product requirements, existing codebase or designs, and target functionality…"
          value={values.description}
          onChange={set('description')}
          error={errors.description}
        />

        {/* Optional fields */}
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            id="timeline"
            label="Target Timeline (optional)"
            type="text"
            placeholder="e.g. 4-6 weeks, Q2 release"
            value={values.timeline}
            onChange={set('timeline')}
          />
          <Field
            id="budget"
            label="Estimated Budget (optional)"
            type="text"
            placeholder="e.g. $3,000 - $7,000"
            value={values.budget}
            onChange={set('budget')}
          />
        </div>

        {/* Honeypot field */}
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <label htmlFor="website">Leave empty</label>
          <input
            id="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={set('website')}
          />
        </div>

        {/* Server error */}
        {formStatus === 'error' && (
          <div className="flex items-start gap-3 rounded-lg border border-red-500/30 bg-red-950/20 px-4 py-3" role="alert">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
            <p className="text-xs text-red-300">{serverError}</p>
          </div>
        )}

        {/* Privacy reassurance */}
        <p className="text-[11px] text-[#8a949e]">
          Your details are strictly used to respond to this technical inquiry and are never shared.
        </p>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={formStatus === 'submitting'}
          className="btn-lime w-full gap-2 py-3.5 text-sm font-bold shadow-lg shadow-[#39A751]/25 hover:shadow-[#39A751]/40 cursor-pointer"
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
      </div>
    </form>
  )
}

function SupportContent() {
  const { data } = useSiteData()
  const info = data?.contact_info || {}
  const profile = data?.profile || {}

  return (
    <>
      {/* Page Hero */}
      <div className="bg-[#0e0e0e] pt-32 pb-16 border-b border-[#1e261d]">
        <div className="container-page">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#39A751]/30 bg-[#1e2b1a] px-3.5 py-1 text-xs font-bold tracking-widest text-[#52fe7d]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#39A751] animate-pulse" />
              <span>SUPPORT &amp; INQUIRIES</span>
            </div>
            <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Start a project or request support
            </h1>
            <p className="mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-[#d2d7dc]">
              Share your project vision, scope, or technical challenge. I respond with technical analysis, architecture recommendations, and estimated milestones.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Main Form & Info Section */}
      <section className="section-pad bg-[#0e0e0e]" aria-label="Contact and inquiry">
        <div className="container-page grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">

          {/* Left Column: Direct Info & Quick Answers */}
          <div className="space-y-6">
            {/* Direct Contact Card */}
            <Reveal>
              <div className="rounded-xl border border-[#1e261d] bg-[#141714] p-6 space-y-4">
                <h2 className="font-display text-base font-bold text-white">Direct Communication</h2>

                <div className="space-y-3">
                  <a
                    href={`mailto:${profile.email || info.email || 'hello@make.dev'}`}
                    className="flex items-center gap-3 text-xs font-medium text-[#d2d7dc] hover:text-[#52fe7d] transition"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1e2b1a] text-[#52fe7d]">
                      <Mail className="h-4 w-4" />
                    </span>
                    <span>{profile.email || info.email || 'hello@make.dev'}</span>
                  </a>

                  <div className="flex items-center gap-3 text-xs text-[#8a949e]">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1e2b1a] text-[#52fe7d]">
                      <MapPin className="h-4 w-4" />
                    </span>
                    <span>{profile.location || info.location || 'Available Worldwide · Remote'}</span>
                  </div>
                </div>

                <div className="rounded-lg border border-[#39A751]/30 bg-[#1e2b1a]/70 p-3 text-xs text-[#52fe7d]">
                  <p className="font-bold">Typical Response Time</p>
                  <p className="text-[11px] text-[#d2d7dc] mt-0.5">
                    Replies sent within 24 business hours with concrete technical recommendations.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Quick Answers Accordion */}
            <Reveal delay={80}>
              <div className="rounded-xl border border-[#1e261d] bg-[#141714] p-6">
                <h2 className="font-display text-base font-bold text-white mb-2">Quick Answers</h2>
                {SUPPORT_FAQ.map((item) => (
                  <FAQItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </Reveal>

            {/* Privacy Reassurance */}
            <Reveal delay={120}>
              <div className="rounded-xl border border-[#1e261d] bg-[#141714] p-5">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#8a949e] mb-1">
                  Confidentiality
                </p>
                <p className="text-xs leading-relaxed text-[#8a949e]">
                  Non-disclosure agreements (NDAs) are happily signed prior to reviewing proprietary designs, codebases, or intellectual property.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Inquiry Form */}
          <Reveal delay={60}>
            <div className="rounded-xl border border-[#1e261d] bg-[#141714] p-7 sm:p-9 shadow-2xl"
                 style={{
                   boxShadow: '0 -1px 0 0 #52ff7d29, 0 0 0 1px rgba(255, 255, 255, 0.08), 0 20px 40px rgba(0, 0, 0, 0.6)'
                 }}>
              <div className="flex items-center justify-between pb-6 border-b border-[#1e261d] mb-6">
                <div>
                  <h2 className="font-display text-xl font-bold text-white">Project Inquiry Form</h2>
                  <p className="mt-1 text-xs text-[#8a949e]">
                    Fill in your details below to kick off our technical conversation.
                  </p>
                </div>
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
        title="Support & Project Inquiry"
        description="Contact Make to discuss your web application, mobile app, API integration, or maintenance requirements."
      >
        <SupportContent />
      </PageLayout>
    </SiteDataProvider>
  )
}
