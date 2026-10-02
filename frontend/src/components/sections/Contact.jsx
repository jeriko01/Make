import { useState } from 'react'
import { Mail, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react'
import { api } from '../../lib/api'
import { useSiteData } from '../../context/SiteDataContext'
import { SectionHeading, Spinner } from '../common/ui'
import Reveal from '../common/Reveal'
import SocialLinks from '../common/SocialLinks'

const EMPTY = { name: '', email: '', subject: '', message: '', website: '' }

function validate(v) {
  const e = {}
  if (!v.name.trim()) e.name = 'Please enter your name.'
  if (!v.email.trim()) e.email = 'Please enter your email.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = 'Please enter a valid email.'
  if (!v.subject.trim()) e.subject = 'Please enter a subject.'
  if (!v.message.trim()) e.message = 'Please enter a message.'
  else if (v.message.trim().length < 10) e.message = 'Message should be at least 10 characters.'
  return e
}

export default function Contact() {
  const { data } = useSiteData()
  const info = data?.contact_info || {}
  const social = data?.social_links || []
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [serverError, setServerError] = useState('')

  const setField = (k) => (ev) => setValues((v) => ({ ...v, [k]: ev.target.value }))

  async function onSubmit(ev) {
    ev.preventDefault()
    const errs = validate(values)
    setErrors(errs)
    if (Object.keys(errs).length) return
    setStatus('submitting')
    setServerError('')
    try {
      await api.post('/contact', values)
      setStatus('success')
      setValues(EMPTY)
    } catch (err) {
      setStatus('error')
      setServerError(err.message || 'Something went wrong. Please try again.')
    }
  }

  return (
    <section id="contact" className="section-pad">
      <div className="container-page">
        <SectionHeading
          eyebrow="Contact"
          title="Let’s build something"
          description="Have a project in mind? Send a message and I’ll get back to you."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4">
            {info.email && (
              <Reveal>
                <a href={`mailto:${info.email}`} className="glass flex items-center gap-4 rounded-2xl p-5 border border-blue-500/30 hover:border-blue-400/50 hover:bg-blue-600/15 transition">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-blue-600/20 text-blue-300 border border-blue-400/30">
                    <Mail className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold text-slate-200">Email</span>
                    <span className="font-bold text-white">{info.email}</span>
                  </span>
                </a>
              </Reveal>
            )}
            {info.location && (
              <Reveal delay={80}>
                <div className="glass flex items-center gap-4 rounded-2xl p-5 border border-blue-500/30">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-indigo-600/20 text-indigo-300 border border-indigo-400/30">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold text-slate-200">Location</span>
                    <span className="font-bold text-white">{info.location}</span>
                  </span>
                </div>
              </Reveal>
            )}
            {info.availability && (
              <Reveal delay={160}>
                <div className="glass rounded-2xl p-5 text-sm font-medium text-slate-100 border border-blue-500/30">{info.availability}</div>
              </Reveal>
            )}
            {social.length > 0 && (
              <Reveal delay={200}>
                <SocialLinks links={social} />
              </Reveal>
            )}
          </div>

          <Reveal delay={120}>
            <form onSubmit={onSubmit} noValidate className="glass rounded-3xl p-6 sm:p-8 border border-blue-500/30 shadow-xl shadow-blue-950/50">
              {status === 'success' ? (
                <div className="flex flex-col items-center gap-3 py-10 text-center" role="status">
                  <CheckCircle2 className="h-12 w-12 text-emerald-400" />
                  <h3 className="font-display text-xl font-bold text-white">Message received</h3>
                  <p className="max-w-sm text-sm text-slate-100">
                    Thanks for reaching out — your message was saved and I’ll reply by email soon.
                  </p>
                  <button type="button" className="btn-ghost mt-2" onClick={() => setStatus('idle')}>
                    Send another
                  </button>
                </div>
              ) : (
                <div className="grid gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field id="name" label="Name" value={values.name} onChange={setField('name')} error={errors.name} />
                    <Field id="email" label="Email" type="email" value={values.email} onChange={setField('email')} error={errors.email} />
                  </div>
                  <Field id="subject" label="Subject" value={values.subject} onChange={setField('subject')} error={errors.subject} />
                  <Field
                    id="message"
                    label="Message"
                    textarea
                    value={values.message}
                    onChange={setField('message')}
                    error={errors.message}
                  />

                  <div className="absolute left-[-9999px]" aria-hidden="true">
                    <label htmlFor="website">Leave this field empty</label>
                    <input
                      id="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={values.website}
                      onChange={setField('website')}
                    />
                  </div>

                  {status === 'error' && (
                    <p className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300" role="alert">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      {serverError}
                    </p>
                  )}

                  <button type="submit" className="btn-primary mt-2" disabled={status === 'submitting'}>
                    {status === 'submitting' ? (
                      <>
                        <Spinner className="h-4 w-4" /> Sending…
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" /> Send message
                      </>
                    )}
                  </button>
                </div>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Field({ id, label, error, textarea, ...props }) {
  const cls = `w-full rounded-xl border bg-[#09153a]/80 px-4 py-3 text-sm text-white placeholder:text-slate-300 outline-none transition focus:border-blue-400 focus:bg-[#0c1c4d] focus:ring-2 focus:ring-blue-400/20 ${
    error ? 'border-red-500/50' : 'border-blue-500/30'
  }`
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-white">
        {label}
      </label>
      {textarea ? (
        <textarea id={id} rows={5} className={cls} aria-invalid={!!error} aria-describedby={error ? `${id}-err` : undefined} {...props} />
      ) : (
        <input id={id} className={cls} aria-invalid={!!error} aria-describedby={error ? `${id}-err` : undefined} {...props} />
      )}
      {error && (
        <p id={`${id}-err`} className="mt-1 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}
