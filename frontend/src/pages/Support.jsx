import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import {
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  ArrowRight,
  Zap,
} from 'lucide-react'
import { submitContact } from '../lib/contact'
import { SiteDataProvider, useSiteData } from '../context/SiteDataContext'
import { useLanguage } from '../context/LanguageContext'
import PageLayout from '../components/layout/PageLayout'
import Reveal from '../components/common/Reveal'

/* â”€â”€ Service Options (Dual-Language) â”€â”€ */
const SERVICE_OPTIONS = [
  { value: '', label: 'Select a serviceâ€¦', labelSo: 'Dooro nooca adeeggaâ€¦' },
  { value: 'custom-web-apps', label: 'Custom Web Applications (React / TypeScript)', labelSo: 'Codsiyada Web-ka (React / TypeScript)' },
  { value: 'backend-api', label: 'High-Performance APIs (FastAPI / Node.js)', labelSo: 'API-yada Xawaaraha Sare (FastAPI / Node)' },
  { value: 'mobile-apps', label: 'Cross-Platform Mobile Apps (Flutter / React Native)', labelSo: 'Codsiyada Mobile-ka (Flutter / React Native)' },
  { value: 'cloud-devops', label: 'DevOps & Cloud Infrastructure (Docker / CI-CD)', labelSo: 'DevOps & Kaabayaasha Cloud (Docker / CI-CD)' },
  { value: 'database-optimization', label: 'Database Architecture & Performance (PostgreSQL)', labelSo: 'Qaab-dhismeedka Database-ka (PostgreSQL)' },
  { value: 'architecture-review', label: 'Architecture Review & Code Modernization', labelSo: 'Dib-u-eegista Qaab-dhismeedka & Casriyayn' },
]

const SLUG_ALIASES = {
  'business-portfolio-website': 'custom-web-apps',
  'landing-ecommerce': 'custom-web-apps',
  'web-application': 'custom-web-apps',
  'mobile-app': 'mobile-apps',
  'backend-api': 'backend-api',
  'cloud-devops': 'cloud-devops',
}

const PLATFORM_OPTIONS = [
  { value: '', label: 'Target platform (optional)', labelSo: 'Platform-ka aad beegsanayso (ikhtiyaari)' },
  { value: 'web', label: 'Web browser only', labelSo: 'Web kaliya' },
  { value: 'both-mobile', label: 'Cross-platform Mobile (iOS + Android)', labelSo: 'Mobile Labadaba (iOS + Android)' },
  { value: 'fullstack', label: 'Full-Stack (Web + Mobile + Backend)', labelSo: 'Full-Stack (Web + Mobile + API)' },
  { value: 'api-only', label: 'Backend / Cloud API service only', labelSo: 'Backend / Cloud API kaliya' },
]

const EMPTY_FORM = {
  name: '',
  email: '',
  service: '',
  platform: '',
  description: '',
  timeline: '',
  budget: '',
  website: '',
}

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

function validate(v, lang) {
  const e = {}
  if (!v.name.trim()) {
    e.name = lang === 'so' ? 'Fadlan geli magacaaga.' : 'Please enter your name.'
  } else if (v.name.trim().length < 2) {
    e.name = lang === 'so' ? 'Magacu waa inuu ka koobnaadaa ugu yaraan 2 xaraf.' : 'Name must be at least 2 characters.'
  }

  if (!v.email.trim()) {
    e.email = lang === 'so' ? 'Fadlan geli email-kaaga.' : 'Please enter your email address.'
  } else if (!EMAIL_REGEX.test(v.email.trim())) {
    e.email =
      lang === 'so'
        ? 'Fadlan geli email sax ah (tusaale: magac@domain.com).'
        : 'Please enter a valid email address (e.g. name@company.com).'
  }

  if (!v.service) {
    e.service = lang === 'so' ? 'Fadlan dooro adeegga aad u baahan tahay.' : 'Please select a service required.'
  }

  if (!v.description.trim()) {
    e.description = lang === 'so' ? 'Fadlan qor faahfaahinta mashruucaaga.' : 'Please describe your project briefly.'
  } else if (v.description.trim().length < 15) {
    e.description =
      lang === 'so'
        ? 'Fadlan qor ugu yaraan 15 xaraf si aan u fahanno baahidaada.'
        : 'Please provide at least 15 characters describing your scope.'
  }

  return e
}

/* â”€â”€ FAQ Item Component â”€â”€ */
function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-[#1E2C4A] last:border-none">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start justify-between gap-4 py-3.5 text-left focus-visible:rounded-lg focus-visible:ring-2 focus-visible:ring-[#38BDF8]"
        aria-expanded={open}
      >
        <span className="text-xs sm:text-[13px] font-medium text-white transition-colors hover:text-[#38BDF8]">
          {q}
        </span>
        <ChevronDown
          className={`mt-0.5 h-3.5 w-3.5 shrink-0 text-[#38BDF8] transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-48' : 'max-h-0'}`}>
        <p className="pb-3 text-xs leading-relaxed text-[#94A3B8]">{a}</p>
      </div>
    </div>
  )
}

/* â”€â”€ Reusable Input Field â”€â”€ */
function Field({ id, label, error, textarea, required, hint, touched, ...props }) {
  const isInvalid = Boolean(error && touched)
  const base = `w-full rounded-xl border px-4 py-3 text-sm text-white placeholder-[#475569] outline-none transition duration-200 focus:ring-1 ${
    isInvalid
      ? 'border-rose-500/80 bg-rose-950/15 focus:border-rose-500 focus:ring-rose-500/30'
      : 'border-[#1E2C4A] bg-[#06080E] focus:border-[#38BDF8] focus:ring-[#38BDF8]'
  }`
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#CBD5E1]">
        {label}
      </label>
      {hint && <p className="mb-2 text-xs text-[#94A3B8]">{hint}</p>}
      {textarea ? (
        <textarea id={id} rows={4} className={base} aria-invalid={isInvalid} aria-required={required} {...props} />
      ) : (
        <input id={id} className={base} aria-invalid={isInvalid} aria-required={required} {...props} />
      )}
      {isInvalid && (
        <p id={`${id}-err`} role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-400">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  )
}

/* â”€â”€ Reusable Select Field â”€â”€ */
function SelectField({ id, label, error, required, options, lang, touched, ...props }) {
  const isInvalid = Boolean(error && touched)
  const base = `w-full appearance-none rounded-xl border px-4 py-3 text-sm text-white outline-none transition duration-200 focus:ring-1 ${
    isInvalid
      ? 'border-rose-500/80 bg-rose-950/15 focus:border-rose-500 focus:ring-rose-500/30'
      : 'border-[#1E2C4A] bg-[#06080E] focus:border-[#38BDF8] focus:ring-[#38BDF8]'
  }`
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#CBD5E1]">
        {label}
      </label>
      <select
        id={id}
        className={base}
        aria-invalid={isInvalid}
        aria-required={required}
        {...props}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-[#0A0F1A] text-white">
            {lang === 'so' && o.labelSo ? o.labelSo : o.label}
          </option>
        ))}
      </select>
      {isInvalid && (
        <p id={`${id}-err`} role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-400">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  )
}

/* â”€â”€ Clean Project Inquiry Form â”€â”€ */
function InquiryForm() {
  const { lang } = useLanguage()
  const [searchParams] = useSearchParams()

  const rawServiceParam = searchParams.get('service') || ''
  const resolvedService = SLUG_ALIASES[rawServiceParam] || rawServiceParam

  const [values, setValues] = useState(() => ({ ...EMPTY_FORM, service: resolvedService }))
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [formStatus, setFormStatus] = useState('idle')
  const [serverError, setServerError] = useState('')

  useEffect(() => {
    const svc = searchParams.get('service')
    if (svc) setValues((v) => ({ ...v, service: SLUG_ALIASES[svc] || svc }))
  }, [searchParams])

  const handleBlur = (field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    const currentErrors = validate(values, lang)
    setErrors(currentErrors)
  }

  const set = (k) => (ev) => {
    const val = ev.target.value
    setValues((v) => ({ ...v, [k]: val }))
    if (touched[k]) {
      const currentErrors = validate({ ...values, [k]: val }, lang)
      setErrors(currentErrors)
    }
  }

  async function handleSubmit(ev) {
    ev.preventDefault()
    if (values.website) return // Honeypot check
    
    const errs = validate(values, lang)
    setErrors(errs)
    setTouched({
      name: true,
      email: true,
      service: true,
      description: true,
    })

    if (Object.keys(errs).length > 0) {
      const firstFieldId = Object.keys(errs)[0]
      document.getElementById(firstFieldId)?.focus()
      return
    }

    setFormStatus('submitting')
    setServerError('')
    try {
      const selectedServiceObj = SERVICE_OPTIONS.find((o) => o.value === values.service)
      const serviceLabel = selectedServiceObj?.label || values.service

      await submitContact({
        name: values.name.trim(),
        email: values.email.trim(),
        subject: `Project Inquiry: ${serviceLabel}`,
        message: `Service: ${serviceLabel}\nPlatform: ${values.platform || 'Not specified'}\nTimeline: ${values.timeline || 'Not specified'}\nBudget: ${values.budget || 'Not specified'}\n\nProject Scope:\n${values.description.trim()}`,
        website: values.website,
      })
      setFormStatus('success')
      setValues(EMPTY_FORM)
      setTouched({})
      setErrors({})
    } catch (err) {
      setFormStatus('error')
      setServerError(
        err.message ||
          (lang === 'so'
            ? 'Cilad baa dhacday. Fadlan mar kale isku day ama toos iila soo xiriir.'
            : 'Something went wrong. Please try again or email directly.')
      )
    }
  }

  if (formStatus === 'success') {
    return (
      <div
        className="flex flex-col items-center rounded-2xl border border-[#38BDF8]/40 bg-[#0A0F1A] p-8 sm:p-12 text-center"
        role="status"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#38BDF8]/40 bg-[#06080E] shadow-[0_0_20px_rgba(56,189,248,0.25)]">
          <CheckCircle2 className="h-7 w-7 text-[#38BDF8]" />
        </div>
        <h3 className="mt-5 font-display text-2xl font-bold text-white">
          {lang === 'so' ? 'Farriintaada waa la helay' : 'Inquiry Received'}
        </h3>
        <p className="mx-auto mt-2.5 max-w-sm text-xs sm:text-sm leading-relaxed text-[#94A3B8]">
          {lang === 'so'
            ? 'Waad ku mahadsan tahay la-soo-xiriirkaaga. Waxaan dib u eegi doonaa baahidaada, waxaana kuugu soo jawaabi doonaa 24 saacadood gudahood.'
            : 'Thank you for reaching out. I review all inquiries thoroughly and will reply by email within 24 business hours.'}
        </p>
        <div className="mt-7 flex flex-row items-center justify-center gap-3 w-full max-w-xs flex-nowrap">
          <button
            type="button"
            onClick={() => setFormStatus('idle')}
            className="btn-outline text-center whitespace-nowrap px-4 py-2 text-xs"
          >
            {lang === 'so' ? 'Dir Farriin Kale' : 'Send Another'}
          </button>
          <Link
            to="/projects"
            className="btn-lime text-center whitespace-nowrap px-4 py-2 text-xs"
          >
            <span>{lang === 'so' ? 'Mashaariicda' : 'View Projects'}</span>
            <ArrowRight className="h-3.5 w-3.5 shrink-0" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Project inquiry form" className="space-y-4 sm:space-y-5">

      {/* Name & Email */}
      <div className="grid gap-3.5 sm:grid-cols-2">
        <Field
          id="name"
          label={lang === 'so' ? 'Magac' : 'Name'}
          required
          type="text"
          autoComplete="name"
          placeholder={lang === 'so' ? 'Magacaaga' : 'Your full name'}
          value={values.name}
          onChange={set('name')}
          onBlur={handleBlur('name')}
          touched={touched.name}
          error={errors.name}
        />
        <Field
          id="email"
          label="Email"
          required
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          value={values.email}
          onChange={set('email')}
          onBlur={handleBlur('email')}
          touched={touched.email}
          error={errors.email}
        />
      </div>

      {/* Service & Platform */}
      <div className="grid gap-3.5 sm:grid-cols-2">
        <SelectField
          id="service"
          label={lang === 'so' ? 'Adeeg' : 'Service'}
          required
          options={SERVICE_OPTIONS}
          lang={lang}
          value={values.service}
          onChange={set('service')}
          onBlur={handleBlur('service')}
          touched={touched.service}
          error={errors.service}
        />
        <SelectField
          id="platform"
          label={lang === 'so' ? 'Platform' : 'Platform'}
          options={PLATFORM_OPTIONS}
          lang={lang}
          value={values.platform}
          onChange={set('platform')}
          onBlur={handleBlur('platform')}
          touched={touched.platform}
        />
      </div>

      {/* Description */}
      <Field
        id="description"
        label={lang === 'so' ? 'Mashruuca' : 'Project'}
        required
        textarea
        placeholder={
          lang === 'so'
            ? 'Sharax gaaban â€” maxaad dhisayso, iyo baahida ugu weynâ€¦'
            : "Brief scope â€” what you're building and the core requirementâ€¦"
        }
        value={values.description}
        onChange={set('description')}
        onBlur={handleBlur('description')}
        touched={touched.description}
        error={errors.description}
      />

      {/* Timeline & Budget */}
      <div className="grid gap-3.5 sm:grid-cols-2">
        <Field
          id="timeline"
          label={lang === 'so' ? 'Waqtiga' : 'Timeline'}
          type="text"
          placeholder={lang === 'so' ? 'Tusaale: 3â€“6 toddobaad' : 'e.g. 4â€“6 weeks'}
          value={values.timeline}
          onChange={set('timeline')}
          onBlur={handleBlur('timeline')}
          touched={touched.timeline}
        />
        <Field
          id="budget"
          label={lang === 'so' ? 'Miisaaniyad' : 'Budget'}
          type="text"
          placeholder={lang === 'so' ? 'Tusaale: $2,000 â€“ $5,000' : '$2,000 â€“ $10,000'}
          value={values.budget}
          onChange={set('budget')}
          onBlur={handleBlur('budget')}
          touched={touched.budget}
        />
      </div>

      {/* Anti-spam honeypot â€” completely hidden from view */}
      <div className="hidden sr-only" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={set('website')}
        />
      </div>

      {formStatus === 'error' && (
        <div
          className="flex items-start gap-3 rounded-xl border border-rose-500/40 bg-rose-950/20 px-4 py-3"
          role="alert"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
          <p className="text-xs text-rose-300">{serverError}</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={formStatus === 'submitting'}
        className="btn-lime w-full gap-2 py-3.5 text-sm font-bold shadow-xl shadow-[#0284C7]/20 hover:shadow-[#0284C7]/35 transition-all text-center justify-center cursor-pointer"
      >
        {formStatus === 'submitting' ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            <span>{lang === 'so' ? 'Dirayaâ€¦' : 'Sendingâ€¦'}</span>
          </>
        ) : (
          <>
            <Send className="h-4 w-4 shrink-0" />
            <span>{lang === 'so' ? 'Dir Farriin' : 'Send Message'}</span>
          </>
        )}
      </button>
    </form>
  )
}

function SupportContent() {
  const { lang } = useLanguage()
  const { data } = useSiteData()
  const info = data?.contact_info || {}
  const profile = data?.profile || {}
  const email = profile.email || info.email || 'engmake1.1@gmail.com'
  const location = profile.location || info.location || 'Available Worldwide Â· Remote'

  const faqItems = [
    {
      q: lang === 'so' ? "Intee in le'eg ayay qaadataa jawaabta?" : 'How quickly will I receive a reply?',
      a:
        lang === 'so'
          ? 'Waxaan dib u eegaa farriin kasta anigoo ku soo jawaabaya 24 saacadood gudahood, leh talo farsamo oo cad iyo talaabooyinka xiga.'
          : 'I review all incoming scopes and reply within 24 business hours with concrete architectural recommendations and next steps.',
    },
    {
      q: lang === 'so' ? 'Miyaad la shaqaysaa macaamiisha caalamiga ah?' : 'Do you take international remote engagements?',
      a:
        lang === 'so'
          ? 'Haa, 100% shaqadeydu waa remote oo loogu talagalay shirkadaha caalamiga ah, anigoo isticmaalaya habab async ah iyo la-kulanno video ah.'
          : 'Yes. All contracts are structured remote engagements with asynchronous progress tracking and milestone check-ins.',
    },
    {
      q: lang === 'so' ? 'Maxaa ku dhacaya xuquuqda koodhka (IP)?' : 'How is intellectual property handled?',
      a:
        lang === 'so'
          ? '100% xuquuqda koodhka, repositories-ka, iyo dukumiintiyada waxaa si toos ah loogu wareejiyaa macmiilka marka mashruucu dhammaado.'
          : '100% source code, repository commits, and infrastructure access are cleanly transferred to you on milestone completion.',
    },
  ]

  return (
    <>
      {/* ── SECTION 1: HERO — Full-Vibrancy Studio Image, Clean Spacing & Bold Text ── */}
      <section className="relative min-h-[520px] sm:min-h-[580px] overflow-hidden border-b border-[#1E2C4A] bg-[#06080E] pt-36 sm:pt-44 pb-20 sm:pb-28">
        {/* Real engineering studio background image — 100% visible, zero obscuring color */}
        <img
          src="/images/support-hero-bg.jpg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
        />
        {/* Soft bottom edge blend to transition cleanly into section 2 */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#06080E] via-[#06080E]/60 to-transparent" />

        <div className="container-page relative z-10 mx-auto max-w-4xl text-center px-4 sm:px-6">
          <Reveal>
            {/* Main Headline — High Contrast & Larger Scale */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-black leading-[1.12] tracking-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
              {lang === 'so' ? (
                <>
                  <span className="block text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">Aan ka wadahadalno</span>
                  <span className="block mt-1 sm:mt-2 bg-gradient-to-r from-[#38BDF8] via-cyan-200 to-white bg-clip-text text-transparent drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
                    qorshahaaga farsamo.
                  </span>
                </>
              ) : (
                <>
                  <span className="block text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">Direct engineering for</span>
                  <span className="block mt-1 sm:mt-2 bg-gradient-to-r from-[#38BDF8] via-cyan-200 to-white bg-clip-text text-transparent drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
                    serious projects.
                  </span>
                </>
              )}
            </h1>

            {/* Subtext — Senior, Readable & Properly Spaced */}
            <p className="mx-auto mt-6 sm:mt-7 max-w-2xl text-base sm:text-lg leading-relaxed text-[#F1F5F9] font-medium drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
              {lang === 'so'
                ? "Wadahadal toos ah, dhex-dhexaad la'aan. Haddii aad casriyeynayso nidaam jira ama aad dhisayso madal cusub, iila wadaag faahfaahintaada farsamo si aan u dejino talaabooyinka xiga."
                : "No sales reps, no layers in between. Whether you're modernizing an existing infrastructure or building a new product from scratch, send over your scope and let's map out the execution."}
            </p>
          </Reveal>
        </div>
      </section>

      {/* â”€â”€ SECTION 2: STREAMLINED TWO-COLUMN INTERACTION â”€â”€ */}
      <section className="section-pad bg-[#06080E]" aria-label="Contact and inquiry form">
        <div className="container-page grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          
          {/* Left Column: Direct Info & Quick FAQ */}
          <div className="space-y-6">
            
            {/* Card 1: Direct Contact Details â€” Zero nested box borders */}
            <Reveal>
              <div className="rounded-2xl border border-[#1E2C4A] bg-[#0A0F1A] p-6 sm:p-7 shadow-lg">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#38BDF8]">
                  {lang === 'so' ? 'Xiriir Toos ah' : 'Direct Contact'}
                </span>
                <h2 className="mt-1 font-display text-base sm:text-lg font-bold text-white">
                  {lang === 'so' ? 'Ila Soo Xiriir' : 'Reach Out Directly'}
                </h2>

                <div className="mt-5 space-y-3">
                  {/* Email */}
                  <a
                    href={`mailto:${email}`}
                    className="group flex items-center gap-2.5 transition"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-[#38BDF8]" />
                    <span className="font-mono text-xs sm:text-[13px] text-white group-hover:text-[#38BDF8] transition truncate">
                      {email}
                    </span>
                  </a>

                  {/* Location */}
                  <div className="flex items-center gap-2.5">
                    <MapPin className="h-4 w-4 shrink-0 text-[#38BDF8]" />
                    <span className="text-xs sm:text-[13px] text-[#94A3B8]">
                      {location}
                    </span>
                  </div>

                  {/* Availability */}
                  <div className="flex items-center gap-2.5">
                    <Zap className="h-4 w-4 shrink-0 text-[#38BDF8]" />
                    <span className="text-xs sm:text-[13px] font-semibold text-white">
                      {lang === 'so' ? 'Diyaar u ah Qandaraasyo Cusub' : 'Accepting New Contracts'}
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Card 2: Common Questions Accordion */}
            <Reveal delay={80}>
              <div className="rounded-2xl border border-[#1E2C4A] bg-[#0A0F1A] p-6 sm:p-7 shadow-lg">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#38BDF8]">
                  {lang === 'so' ? 'Su\'aalaha Badan' : 'FAQ'}
                </span>
                <h3 className="mt-1 mb-2 font-display text-sm font-bold text-white">
                  {lang === 'so' ? 'Jawaabo Degdeg ah' : 'Quick Answers'}
                </h3>
                {faqItems.map((item) => (
                  <FAQItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </Reveal>

          </div>

          {/* Right Column: High-Conversion Clean Form */}
          <Reveal delay={60}>
            <div className="relative overflow-hidden rounded-2xl border border-[#1E2C4A] bg-[#0A0F1A] p-6 sm:p-8 shadow-2xl">
              {/* Top ambient cyan accent line */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#38BDF8]/60 to-transparent" />
              <div className="mb-5 border-b border-[#1E2C4A] pb-4">
                <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
                  {lang === 'so' ? 'Iiga warran mashruucaaga' : 'Start a project'}
                </h2>
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
  const { lang } = useLanguage()

  return (
    <SiteDataProvider>
      <PageLayout
        title={lang === 'so' ? 'Taageero & Xiriir' : 'Support & Contact'}
        description={
          lang === 'so'
            ? 'Kala xiriir Make wada-shaqeynta mashaariicda web-ka, apps-ka mobile-ka, DevOps, iyo API integration.'
            : 'Contact Make to discuss custom web applications, mobile apps, DevOps pipelines, or backend API integrations.'
        }
      >
        <SupportContent />
      </PageLayout>
    </SiteDataProvider>
  )
}

