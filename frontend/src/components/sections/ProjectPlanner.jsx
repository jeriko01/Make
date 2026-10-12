import { useState } from 'react'
import {
  Check,
  ArrowRight,
  Building,
  SmartphoneNfc,
  X,
  Clock,
  CreditCard,
  Sparkles,
} from 'lucide-react'
import Reveal from '../common/Reveal'
import { useLanguage } from '../../context/LanguageContext'

export default function ProjectPlanner() {
  const { lang } = useLanguage()

  const [selectedTier, setSelectedTier] = useState(null)
  const [paymentModalOpen, setPaymentModalOpen] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('premier')

  // All tiers unified to the user's brand color (#38BDF8 / #0284C7)
  const TIERS = [
    {
      id: 'mvp',
      badge: lang === 'so' ? 'Web & Mobile Sprint' : 'Full-Stack Delivery',
      title: lang === 'so' ? 'Barnaamij Web & Mobile Dhameystiran' : 'Production Web & Mobile Product',
      desc: lang === 'so'
        ? 'Dhisidda barnaamij dhameystiran oo diyaar u ah suuqa, leh koodh nadiif ah iyo amni adag.'
        : 'End-to-end digital product engineered from scratch with clean architecture, tests, and speed.',
      price: 1850,
      priceLabel: '$1,850',
      period: lang === 'so' ? 'Kharash go\'an' : 'Fixed Investment',
      timeline: lang === 'so' ? '3 – 4 Toddobaad' : '3 – 4 Weeks',
      popular: false,
      accent: '#38BDF8',
      accentBg: 'rgba(56,189,248,0.08)',
      accentBorder: 'rgba(56,189,248,0.25)',
      features: lang === 'so' ? [
        'React 19 / Next.js web application casri ah',
        'Mobile app (React Native ama Flutter)',
        'FastAPI / Node.js backend API degdeg badan',
        'PostgreSQL database leh RLS & backups',
        'Docker container & CI/CD deployment pipeline',
        '100% Xuquuqda Koodhka & IP Transfer buuxa',
      ] : [
        'Modern React 19 / Next.js frontend application',
        'Cross-platform mobile app (React Native / Flutter)',
        'Asynchronous Python FastAPI or Node.js backend',
        'PostgreSQL schema with Row-Level Security & backups',
        'Docker containerization & automated CI/CD pipeline',
        '100% Source code ownership & full IP transfer',
      ],
    },
    {
      id: 'devops',
      badge: lang === 'so' ? 'Enterprise · Ugu Caansan' : 'Enterprise · Most Popular',
      title: lang === 'so' ? 'Cloud Architecture & DevOps Platform' : 'Cloud Infrastructure & DevOps Platform',
      desc: lang === 'so'
        ? 'Kaabayaal cloud oo loogu talagalay malaayiin isticmaale, zero-downtime, iyo 99.99% uptime.'
        : 'Mission-critical cloud infrastructure engineered for massive concurrency, zero downtime, and resiliency.',
      price: 2950,
      priceLabel: '$2,950',
      period: lang === 'so' ? 'Kharash go\'an' : 'Fixed Investment',
      timeline: lang === 'so' ? '4 – 6 Toddobaad' : '4 – 6 Weeks',
      popular: true,
      accent: '#38BDF8',
      accentBg: 'rgba(56,189,248,0.12)',
      accentBorder: 'rgba(56,189,248,0.50)',
      features: lang === 'so' ? [
        'AWS / GCP / Bare-Metal multi-region cloud architecture',
        'Kubernetes / Docker container orchestration',
        'GitHub Actions automated CI/CD (Zero Downtime)',
        '99.99% Production Uptime SLA & Redis caching',
        'Database clustering, automated failover & S3 backups',
        'Amniga sare, SSL/TLS, DDoS mitigation & audit buuxa',
      ] : [
        'Multi-region cloud architecture (AWS / GCP / Bare-Metal)',
        'Kubernetes & Docker container orchestration',
        'Zero-downtime GitHub Actions CI/CD deployment pipeline',
        '99.99% Production Uptime SLA with Redis caching',
        'Database replication, automated failover & S3 vaults',
        'Hardened security audit, SSL/TLS, and DDoS mitigation',
      ],
    },
    {
      id: 'retainer',
      badge: lang === 'so' ? 'Iskaashi Joogto ah' : 'Dedicated Partnership',
      title: lang === 'so' ? 'Senior Platform Lead (Bishii)' : 'Fractional Senior Platform Lead',
      desc: lang === 'so'
        ? 'Iskaashi farsamo oo toos ah bil kasta, adigoo helaya khibrad 3+ sano ah oo aan joogsi lahayn.'
        : 'Dedicated engineering leadership, continuous feature delivery, and 24/7 reliability for your platform.',
      price: 2000,
      priceLabel: '$2,000',
      period: lang === 'so' ? 'Bishiiba · Cancel wakhti kasta' : 'Monthly · No Lock-in',
      timeline: lang === 'so' ? 'Iskaashi Joogto ah' : 'Ongoing',
      popular: false,
      accent: '#38BDF8',
      accentBg: 'rgba(56,189,248,0.08)',
      accentBorder: 'rgba(56,189,248,0.25)',
      features: lang === 'so' ? [
        'Khabiir Senior DevOps & Full-Stack ah (3+ sano khibrad)',
        'Toos u wada-xiriirka Slack / Discord & maalinle Loom updates',
        'Horumarinta feature-yada cusub & xallinta cilladaha',
        '24/7 Ka-jawaabidda xaaladaha degdegga ah (Incident Response)',
        'Code review joogto ah, architecture refactoring & talo-bixin',
        'Heshiis bishii ah oo dabacsan, adoon ku xirneyn qandaraas adag',
      ] : [
        'Dedicated Senior DevOps & Full-Stack Engineer (3+ yrs exp)',
        'Direct Slack/Discord channel access + daily Loom updates',
        'Continuous feature shipping & architectural velocity',
        '24/7 Critical incident response & monitoring alerts',
        'Ongoing code reviews, security hardening & optimizations',
        'Flexible month-to-month engagement with zero lock-in',
      ],
    },
  ]

  const handleSelectTier = (tier) => {
    setSelectedTier(tier)
    setPaymentModalOpen(true)
  }

  return (
    <section id="estimator" aria-label="Project Scope and Investment" className="relative py-20 sm:py-28 bg-[#070A12] border-t border-[#1E2C4A]">
      <div className="container-page">

        {/* Section Header — Centered, No Eyebrow */}
        <Reveal>
          <div className="mb-16 max-w-2xl text-center mx-auto">
            <h2 className="font-display text-2xl sm:text-3xl lg:text-[2.2rem] font-bold text-white tracking-tight leading-snug">
              {lang === 'so'
                ? 'Qiime cad. Deliverables hubaal ah.'
                : 'Transparent scope. Fixed investment.'}
            </h2>
            <p className="mt-3 max-w-lg text-sm text-[#94A3B8] leading-relaxed mx-auto">
              {lang === 'so'
                ? 'Qiime go\'an, deliverables hufan, iyo iskaashi toos ah oo aan dhex-dhexaad lahayn.'
                : 'Clear engineering deliverables, direct senior collaboration, and no junior middlemen. Every tier includes full IP transfer.'}
            </p>
          </div>
        </Reveal>

        {/* ── 3 Tier Cards ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch max-w-6xl mx-auto">
          {TIERS.map((tier, idx) => {
            const isFeatured = tier.popular

            return (
              <Reveal key={tier.id} delay={idx * 80} className="h-full">
                <div
                  className={`relative flex flex-col justify-between h-full rounded-2xl p-6 sm:p-7 transition-all duration-300 ${
                    isFeatured
                      ? 'bg-[#0B1120] border-2 border-[#38BDF8] shadow-[0_12px_48px_-12px_rgba(56,189,248,0.25)] lg:-translate-y-2'
                      : 'bg-[#0A0F1A] border border-[#1E2C4A] hover:border-[#38BDF8]/50 hover:bg-[#0D1424] hover:shadow-[0_8px_32px_-10px_rgba(56,189,248,0.15)]'
                  }`}
                >
                  {/* Accent top line */}
                  <div
                    className={`absolute top-0 left-6 right-6 h-[2px] rounded-full bg-[#38BDF8] ${
                      isFeatured ? 'opacity-100' : 'opacity-40'
                    }`}
                  />

                  {/* Badge Row */}
                  <div className="flex items-center justify-between gap-2 mb-5 pt-1">
                    <span
                      className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider ${
                        isFeatured
                          ? 'bg-[#38BDF8] text-[#06080E]'
                          : 'bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/25'
                      }`}
                    >
                      {isFeatured && <Sparkles className="h-3 w-3" />}
                      {tier.badge}
                    </span>
                    <span className="text-[10px] font-semibold flex items-center gap-1 tracking-wide text-[#38BDF8]/80">
                      <Clock className="h-3 w-3" />
                      {tier.timeline}
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <div>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-white tracking-tight leading-snug">
                      {tier.title}
                    </h3>
                    <p className="mt-2 text-[12.5px] sm:text-[13px] text-[#94A3B8] leading-[1.65]">
                      {tier.desc}
                    </p>
                  </div>

                  {/* Price — editorial large type */}
                  <div className="my-6 py-5 border-y border-[#1E2C4A]/60">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-display text-[2.2rem] sm:text-[2.6rem] font-black text-white tracking-tight leading-none">
                        {tier.priceLabel}
                      </span>
                      <span className="text-xs font-bold text-[#38BDF8]">
                        {tier.id === 'retainer' ? '/mo' : 'USD'}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#64748B] block mt-1.5 font-medium">
                      {tier.period}
                    </span>
                  </div>

                  {/* Deliverables */}
                  <div className="space-y-3 flex-1 mb-7">
                    <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#38BDF8] block">
                      {lang === 'so' ? 'Waxa Ku Jira:' : 'Included:'}
                    </span>
                    <ul className="space-y-2.5">
                      {tier.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2.5">
                          <span className="mt-[3px] h-[14px] w-[14px] rounded-full flex items-center justify-center shrink-0 bg-[#38BDF8]/10 text-[#38BDF8]">
                            <Check className="h-2.5 w-2.5 stroke-[3]" />
                          </span>
                          <span className="text-[12px] text-[#CBD5E1] leading-[1.55]">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <button
                    type="button"
                    onClick={() => handleSelectTier(tier)}
                    className={`w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-[12px] sm:text-[13px] uppercase tracking-wider transition-all duration-200 ${
                      isFeatured
                        ? 'bg-[#0284C7] text-white shadow-lg shadow-[#0284C7]/30 hover:bg-[#0369A1] hover:shadow-[#0284C7]/50 active:scale-[0.98]'
                        : 'border border-[#1E2C4A] bg-[#06080E] text-[#38BDF8] hover:border-[#38BDF8] hover:bg-[#0284C7] hover:text-white active:scale-[0.98]'
                    }`}
                  >
                    <span>{lang === 'so' ? 'Dooro & Bilow' : 'Lock in Scope'}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </Reveal>
            )
          })}
        </div>



      </div>

      {/* ── Payment & Contract Modal ── */}
      {paymentModalOpen && selectedTier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg">
          <div className="relative w-full max-w-lg rounded-2xl border border-[#38BDF8]/40 bg-[#0A0F1A] p-6 sm:p-8 shadow-2xl overflow-hidden">
            {/* Accent top line on modal */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#38BDF8]" />

            {/* Close */}
            <button
              onClick={() => setPaymentModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-lg text-[#94A3B8] hover:text-white hover:bg-white/5 transition"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header */}
            <div className="mb-6 pt-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#38BDF8] block">
                {lang === 'so' ? 'Qandaraaska & Lacag-Bixinta' : 'Contract & Payment'}
              </span>
              <h3 className="font-display text-lg sm:text-xl font-bold text-white mt-1.5">
                {selectedTier.title}
              </h3>
              <div className="flex items-center gap-3 mt-2 text-xs">
                <span className="text-[#94A3B8]">{lang === 'so' ? 'Qiimaha:' : 'Amount:'}</span>
                <span className="font-bold text-sm text-[#38BDF8]">
                  ${selectedTier.price.toLocaleString()} USD
                </span>
                <span className="text-[#38BDF8] font-semibold text-[11px]">• 50/50 Milestone</span>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="space-y-4">
              <span className="text-[11px] font-semibold text-[#CBD5E1] block">
                {lang === 'so' ? 'Dooro habka lacag-bixinta:' : 'Select payment channel:'}
              </span>

              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { id: 'premier', label: 'Premier Bank (SWIFT)', icon: Building },
                  { id: 'zaad', label: 'Telesom Zaad', icon: SmartphoneNfc },
                  { id: 'sahal', label: 'Golis Sahal', icon: SmartphoneNfc },
                  { id: 'waafi', label: 'Waafi / Hormuud', icon: SmartphoneNfc },
                  { id: 'stripe', label: 'Stripe / Card', icon: CreditCard },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPaymentMethod(item.id)}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all duration-200 ${
                      paymentMethod === item.id
                        ? 'border-[#38BDF8] bg-[#38BDF8]/10 text-white shadow-[0_0_12px_rgba(56,189,248,0.15)]'
                        : 'border-[#1E2C4A] bg-[#06080E] text-[#94A3B8] hover:border-[#38BDF8]/40 hover:text-white'
                    }`}
                  >
                    <item.icon className="h-3.5 w-3.5 shrink-0 text-[#38BDF8]" />
                    <span className="font-medium truncate text-[11px]">{item.label}</span>
                  </button>
                ))}
              </div>

              {/* Payment Coordinates */}
              <div className="p-4 rounded-xl border border-[#1E2C4A] bg-[#06080E] space-y-2 font-sans">
                <span className="text-[10px] font-bold block uppercase tracking-wider text-[#38BDF8]">
                  {lang === 'so' ? 'Xogta Xisaabta' : 'Payment Coordinates'}
                </span>

                {paymentMethod === 'premier' && (
                  <div className="space-y-1 text-xs text-[#CBD5E1]">
                    <p><span className="text-[#94A3B8]">Bank:</span> <strong className="text-white">Premier Bank Ltd.</strong></p>
                    <p><span className="text-[#94A3B8]">Beneficiary:</span> <strong className="text-white">Make Engineering Studio</strong></p>
                    <p><span className="text-[#94A3B8]">USD Account:</span> <strong className="font-mono text-[#38BDF8]">0104000389201</strong></p>
                    <p><span className="text-[#94A3B8]">SWIFT:</span> <strong className="text-white font-mono">PRMRSO22</strong></p>
                    <p className="text-[10px] text-[#64748B] pt-1">Ku habboon wire transfer-ka caalamiga ah.</p>
                  </div>
                )}

                {paymentMethod === 'zaad' && (
                  <div className="space-y-1 text-xs text-[#CBD5E1]">
                    <p><span className="text-[#94A3B8]">Service:</span> <strong className="text-white">Telesom Zaad</strong></p>
                    <p><span className="text-[#94A3B8]">Zaad Number:</span> <strong className="font-mono text-[#38BDF8]">+252 63 4892010</strong></p>
                    <p><span className="text-[#94A3B8]">Account Name:</span> <strong className="text-white">Make Platform Studio</strong></p>
                    <p className="text-[10px] text-[#64748B] pt-1">Bixi hormarka 50% ah ka dibna rasiidka tixraaca.</p>
                  </div>
                )}

                {paymentMethod === 'sahal' && (
                  <div className="space-y-1 text-xs text-[#CBD5E1]">
                    <p><span className="text-[#94A3B8]">Service:</span> <strong className="text-white">Golis Sahal</strong></p>
                    <p><span className="text-[#94A3B8]">Sahal Number:</span> <strong className="font-mono text-[#38BDF8]">+252 90 7892010</strong></p>
                    <p><span className="text-[#94A3B8]">Account Name:</span> <strong className="text-white">Make Platform Studio</strong></p>
                    <p className="text-[10px] text-[#64748B] pt-1">Rasiidka ayaa toos loogu xaqiijinayaa.</p>
                  </div>
                )}

                {paymentMethod === 'waafi' && (
                  <div className="space-y-1 text-xs text-[#CBD5E1]">
                    <p><span className="text-[#94A3B8]">Service:</span> <strong className="text-white">Waafi / Hormuud</strong></p>
                    <p><span className="text-[#94A3B8]">Merchant ID:</span> <strong className="font-mono text-[#38BDF8]">829104</strong></p>
                    <p><span className="text-[#94A3B8]">Number:</span> <strong className="text-white font-mono">+252 61 5892010</strong></p>
                    <p className="text-[10px] text-[#64748B] pt-1">Lacag-bixinta tooska ah ee Waafi, Hormuud, ama E-Dahab.</p>
                  </div>
                )}

                {paymentMethod === 'stripe' && (
                  <div className="space-y-1 text-xs text-[#CBD5E1]">
                    <p><span className="text-[#94A3B8]">Channel:</span> <strong className="text-white">Stripe Corporate Invoice</strong></p>
                    <p><span className="text-[#94A3B8]">Security:</span> <strong className="text-[#38BDF8]">256-Bit SSL Encrypted &amp; NDA</strong></p>
                    <p className="text-[10px] text-[#64748B] pt-1">Invoice toos ah ayaa email-kaaga loogu soo dirayaa.</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    alert(lang === 'so' ? 'Mahadsanid! Dalabkaaga waa la diiwaangeliyey. Waxaan kula soo xiriiraynaa 1 saac gudaheed.' : 'Thank you! Your scope selection has been registered. I will contact you within 1 hour.')
                    setPaymentModalOpen(false)
                  }}
                  className="flex-1 py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-[#0284C7] text-white hover:bg-[#0369A1] transition-all duration-200 shadow-md shadow-[#0284C7]/30"
                >
                  {lang === 'so' ? 'Xaqiiji & Bilow' : 'Confirm & Dispatch'}
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentModalOpen(false)}
                  className="px-4 py-3.5 rounded-xl border border-[#1E2C4A] text-xs font-semibold text-[#94A3B8] hover:text-white transition"
                >
                  {lang === 'so' ? 'Xir' : 'Cancel'}
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  )
}
