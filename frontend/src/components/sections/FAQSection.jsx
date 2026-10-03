import { useState } from 'react'
import { ChevronDown, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useSiteData } from '../../context/SiteDataContext'
import Reveal from '../common/Reveal'

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false)
  const id = question.replace(/\s+/g, '-').toLowerCase().slice(0, 30)

  return (
    <div className="border-b border-[#1E2C4A] last:border-none">
      <button
        type="button"
        id={`faq-btn-${id}`}
        aria-expanded={open}
        aria-controls={`faq-panel-${id}`}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start justify-between gap-4 py-5 text-left transition focus-visible:rounded-lg focus-visible:ring-2 focus-visible:ring-[#0284C7]"
      >
        <span className="font-display text-sm sm:text-base font-bold text-white hover:text-[#38BDF8] transition-colors">
          {question}
        </span>
        <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[#1E2C4A] bg-[#06080E] text-[#38BDF8] transition-transform duration-200 ${open ? 'rotate-180 bg-[#0284C7] text-white' : ''}`}>
          <ChevronDown className="h-4 w-4" />
        </span>
      </button>
      <div
        id={`faq-panel-${id}`}
        role="region"
        aria-labelledby={`faq-btn-${id}`}
        className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-96' : 'max-h-0'}`}
      >
        <p className="pb-5 text-xs sm:text-sm leading-relaxed text-[#CBD5E1]">{answer}</p>
      </div>
    </div>
  )
}

export default function FAQSection({ limit = 5 }) {
  const { data } = useSiteData()
  const faq = (data?.faq || []).slice(0, limit)

  if (faq.length === 0) return null

  return (
    <section
      id="faq"
      aria-label="Frequently asked questions"
      className="section-pad bg-[#06080E] border-t border-[#1E2C4A]"
    >
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <Reveal>
            <p className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-[#38BDF8] lowercase mb-2">support &amp; faq</p>
            <h2 className="mt-3 section-heading">Clear answers before we start</h2>
            <p className="mt-4 mx-auto max-w-xl text-[#CBD5E1] text-base leading-relaxed">
              Transparent expectations regarding scope, technical stack choices, communication cadence, and project delivery.
            </p>
            <div className="mt-6 flex justify-center">
              <Link
                to="/support"
                className="btn-outline inline-flex items-center gap-2 text-sm"
              >
                <span>Have a specific inquiry? Contact support</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>

        <Reveal delay={80}>
          <div className="mx-auto max-w-3xl rounded-xl border border-[#1E2C4A] bg-[#0D1424] p-6 sm:p-8 shadow-xl">
            {faq.map((item) => (
              <FAQItem key={item.id} question={item.question} answer={item.answer} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
