import { useState } from 'react'
import {
  ShieldCheck,
  Check,
  ArrowRight,
  Building,
  SmartphoneNfc,
  X,
  Clock,
  CreditCard,
} from 'lucide-react'
import Reveal from '../common/Reveal'
import { useLanguage } from '../../context/LanguageContext'

export default function ProjectPlanner() {
  const { lang } = useLanguage()

  const [selectedTier, setSelectedTier] = useState(null)
  const [paymentModalOpen, setPaymentModalOpen] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('premier')

  const TIERS = [
    {
      id: 'mvp',
      badge: lang === 'so' ? 'Web & Mobile Sprint' : 'Full-Stack Delivery',
      title: lang === 'so' ? 'Barnaamij Web & Mobile Dhameystiran' : 'Production Web & Mobile Product',
      desc: lang === 'so'
        ? 'Dhisidda barnaamij dhameystiran oo diyaar u ah suuqa, leh koodh nadiif ah iyo amni adag.'
        : 'End-to-end digital product engineered from scratch with clean architecture, tests, and speed.',
      price: 1850,
      priceLabel: lang === 'so' ? '$1,850 USD' : '$1,850',
      period: lang === 'so' ? 'Kharash go\'an' : 'Fixed Investment',
      timeline: lang === 'so' ? '3 – 4 Toddobaad' : '3 – 4 Weeks Delivery',
      popular: false,
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
      badge: lang === 'so' ? 'Ugu Caansan · Enterprise' : 'Most Popular · Enterprise SLA',
      title: lang === 'so' ? 'Cloud Architecture & DevOps Platform' : 'Cloud Infrastructure & DevOps Platform',
      desc: lang === 'so'
        ? 'Kaabayaal cloud oo loogu talagalay malaayiin isticmaale, zero-downtime, iyo 99.99% uptime.'
        : 'Mission-critical cloud infrastructure engineered for massive concurrency, zero downtime, and resiliency.',
      price: 2950,
      priceLabel: lang === 'so' ? '$2,950 USD' : '$2,950',
      period: lang === 'so' ? 'Kharash go\'an' : 'Fixed Investment',
      timeline: lang === 'so' ? '4 – 6 Toddobaad' : '4 – 6 Weeks Delivery',
      popular: true,
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
        ? 'Iskaashi farsamo oo toos ah bil kasta, adigoo helaya khibrad 10+ sano ah oo aan joogsi lahayn.'
        : 'Dedicated engineering leadership, continuous feature delivery, and 24/7 reliability for your platform.',
      price: 2000,
      priceLabel: lang === 'so' ? '$2,000 / Bil' : '$2,000 / mo',
      period: lang === 'so' ? 'Bishiiba · Cancel wakhti kasta' : 'Monthly Retainer · No Lock-in',
      timeline: lang === 'so' ? 'Iskaashi Joogto ah' : 'Ongoing Dedicated Support',
      popular: false,
      features: lang === 'so' ? [
        'Khabiir Senior DevOps & Full-Stack ah (10+ sano khibrad)',
        'Toos u wada-xiriirka Slack / Discord & maalinle Loom updates',
        'Horumarinta feature-yada cusub & xallinta cilladaha',
        '24/7 Ka-jawaabidda xaaladaha degdegga ah (Incident Response)',
        'Code review joogto ah, architecture refactoring & talo-bixin',
        'Heshiis bishii ah oo dabacsan, adoon ku xirneyn qandaraas adag',
      ] : [
        'Dedicated Senior DevOps & Full-Stack Engineer (10+ yrs exp)',
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
    <section id="estimator" aria-label="Project Scope and Investment" className="relative py-20 sm:py-24 bg-[#06080E] border-t border-[#1E2C4A]">
      <div className="container-page px-5 sm:px-10 lg:px-16">

        {/* Section Header - Clean, unified, centered */}
        <Reveal>
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="font-display text-2xl sm:text-3xl lg:text-[2rem] font-bold text-white tracking-tight leading-snug">
              {lang === 'so'
                ? 'Heshiisyada & Qiimaha Shaqada'
                : 'Project Scope & Investment Tiers'}
            </h2>
            <p className="mt-3 mx-auto max-w-lg text-[14px] sm:text-[15px] text-[#94A3B8] leading-relaxed">
              {lang === 'so' ? (
                <>
                  <span className="block">Qiime cad, deliverables hufan, iyo shaqo lagu kalsoonaan karo</span>
                  <span className="block">oo toos loogu dhisayo nidaamkaaga adigoo aan dhex-dhexaad lahayn.</span>
                </>
              ) : (
                <>
                  <span className="block">Transparent fixed pricing, clear engineering deliverables,</span>
                  <span className="block">and direct collaboration without junior middlemen.</span>
                </>
              )}
            </p>
          </div>
        </Reveal>

        {/* 3 High-Authority Architecture Packages */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-7 items-stretch">
          {TIERS.map((tier, idx) => {
            const isFeatured = tier.popular

            return (
              <Reveal key={tier.id} delay={idx * 80} className="h-full">
                <div
                  className={`relative flex flex-col justify-between h-full rounded-2xl p-6 sm:p-8 transition-all duration-300 ${
                    isFeatured
                      ? 'bg-gradient-to-b from-[#0E1729] to-[#070A11] border-2 border-[#38BDF8] shadow-[0_0_40px_rgba(56,189,248,0.22)] -translate-y-1 lg:-translate-y-2'
                      : 'bg-[#0A0E18] border border-[#1E2C4A] hover:border-[#38BDF8]/40 hover:bg-[#0C121F]'
                  }`}
                >
                  {/* Top Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span
                      className={`inline-block font-mono text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                        isFeatured
                          ? 'bg-[#38BDF8] text-black shadow-sm'
                          : 'bg-[#131F37] text-[#38BDF8] border border-[#1E2C4A]'
                      }`}
                    >
                      {tier.badge}
                    </span>
                    <span className="text-[11px] font-mono text-[#94A3B8] flex items-center gap-1">
                      <Clock className="h-3 w-3 text-[#38BDF8]" />
                      {tier.timeline}
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <div>
                    <h3 className="font-display text-xl font-bold text-white tracking-tight leading-snug">
                      {tier.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-[13px] text-[#94A3B8] leading-relaxed">
                      {tier.desc}
                    </p>
                  </div>

                  {/* Price Box */}
                  <div className="my-6 pt-5 pb-5 border-y border-[#1E2C4A]/80">
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                        {tier.priceLabel}
                      </span>
                      {tier.id !== 'retainer' && (
                        <span className="font-mono text-xs text-[#38BDF8] font-bold">USD</span>
                      )}
                    </div>
                    <span className="text-[11px] font-mono text-[#64748B] block mt-1">
                      {tier.period}
                    </span>
                  </div>

                  {/* Deliverables List */}
                  <div className="space-y-3 flex-1 mb-8">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#CBD5E1] block font-semibold">
                      {lang === 'so' ? 'Waxa Ku Jira (Deliverables):' : 'Core Architecture Included:'}
                    </span>
                    <ul className="space-y-2.5 text-xs text-[#CBD5E1]">
                      {tier.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2.5">
                          <span className="mt-0.5 h-4 w-4 rounded-full bg-[#38BDF8]/15 text-[#38BDF8] flex items-center justify-center shrink-0">
                            <Check className="h-2.5 w-2.5 stroke-[3]" />
                          </span>
                          <span className="leading-relaxed">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Action Button */}
                  <button
                    type="button"
                    onClick={() => handleSelectTier(tier)}
                    className={`w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 ${
                      isFeatured
                        ? 'bg-[#38BDF8] text-black hover:bg-white shadow-lg shadow-[#38BDF8]/20 font-bold'
                        : 'border border-[#38BDF8]/50 text-[#38BDF8] hover:bg-[#38BDF8]/10 hover:border-[#38BDF8]'
                    }`}
                  >
                    <span>{lang === 'so' ? 'Dooro Qandaraaskan' : 'Lock in Scope & Contract'}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </Reveal>
            )
          })}
        </div>

        {/* Global Confidence & Reassurance Strip */}
        <Reveal delay={200}>
          <div className="mt-14 rounded-2xl border border-[#1E2C4A] bg-[#0A0E18] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-[#0D1829] border border-[#38BDF8]/30 text-[#38BDF8] flex items-center justify-center shrink-0">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-display text-sm sm:text-base font-bold text-white">
                  {lang === 'so' ? 'Ballanqaadka Amniga & Tayada (Direct Engineering)' : 'Direct Engineering Guarantee · Zero Risk'}
                </h4>
                <p className="text-xs text-[#94A3B8] mt-1 max-w-xl">
                  {lang === 'so'
                    ? '100% Xuquuqda Koodhka adigaa iska leh laga bilaabo maalinta koowaad. Waxaa ku jira heshiis NDA, testing buuxa, iyo 60 maalmood oo taageero toos ah.'
                    : '100% IP and source code ownership transferred on milestone completion. Complete with mutual NDA, clean git history, and 60-day post-launch warranty.'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="font-mono text-xs text-[#CBD5E1] bg-[#06080E] px-4 py-2.5 rounded-xl border border-[#1E2C4A]">
                Premier Bank SWIFT · Zaad · Sahal · Stripe
              </span>
            </div>
          </div>
        </Reveal>

      </div>

      {/* Real Verified Payment & Contract Modal */}
      {paymentModalOpen && selectedTier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-2xl border border-[#38BDF8]/40 bg-[#0A0E18] p-6 sm:p-8 shadow-2xl overflow-hidden">

            {/* Close Button */}
            <button
              onClick={() => setPaymentModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-lg text-[#94A3B8] hover:text-white hover:bg-white/5 transition"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Header */}
            <div className="mb-6">
              <span className="font-mono text-xs font-bold text-[#38BDF8] uppercase tracking-wider block">
                {lang === 'so' ? 'Qandaraaska & Xisaabaadka Lacag-Bixinta' : 'Contract Execution & Payment Rail'}
              </span>
              <h3 className="font-display text-lg sm:text-xl font-bold text-white mt-1">
                {selectedTier.title}
              </h3>
              <div className="flex items-center gap-3 mt-1.5 font-mono text-xs">
                <span className="text-[#94A3B8]">Verified Amount:</span>
                <span className="text-[#38BDF8] font-bold text-sm">${selectedTier.price.toLocaleString()} USD</span>
                <span className="text-emerald-400 font-semibold">• Milestone 50/50</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-4">
              <span className="text-xs font-mono text-[#CBD5E1] block">
                {lang === 'so' ? 'Dooro Habka aad ku bixinayso:' : 'Select Official Payment Channel:'}
              </span>

              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { id: 'premier', label: 'Premier Bank (Intl Wire/SWIFT)', icon: Building },
                  { id: 'zaad', label: 'Telesom Zaad', icon: SmartphoneNfc },
                  { id: 'sahal', label: 'Golis Sahal', icon: SmartphoneNfc },
                  { id: 'waafi', label: 'Waafi / Hormuud', icon: SmartphoneNfc },
                  { id: 'stripe', label: 'Stripe / Corporate Card', icon: CreditCard },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPaymentMethod(item.id)}
                    className={`flex items-center gap-2 p-3 rounded-xl border text-left transition ${
                      paymentMethod === item.id
                        ? 'border-[#38BDF8] bg-[#0D1829] text-white shadow-[0_0_12px_rgba(56,189,248,0.2)]'
                        : 'border-[#1E2C4A] bg-[#06080E] text-[#94A3B8] hover:text-white'
                    }`}
                  >
                    <item.icon className="h-4 w-4 text-[#38BDF8] shrink-0" />
                    <span className="font-medium truncate">{item.label}</span>
                  </button>
                ))}
              </div>

              {/* Dynamic Real Coordinates */}
              <div className="p-4 rounded-xl border border-[#1E2C4A] bg-[#06080E] space-y-2.5 font-sans">
                <span className="text-[11px] font-mono text-[#38BDF8] block uppercase">
                  {lang === 'so' ? 'Xogta Rasmiga ah ee Xisaabta' : 'Verified Banking & Mobile Coordinates'}
                </span>

                {paymentMethod === 'premier' && (
                  <div className="space-y-1 text-xs text-[#CBD5E1]">
                    <p><span className="text-[#94A3B8]">Bank Name:</span> <strong className="text-white">Premier Bank Ltd.</strong></p>
                    <p><span className="text-[#94A3B8]">Beneficiary:</span> <strong className="text-white">Make Engineering Studio</strong></p>
                    <p><span className="text-[#94A3B8]">USD Account No:</span> <strong className="text-[#38BDF8] font-mono">0104000389201</strong></p>
                    <p><span className="text-[#94A3B8]">SWIFT Code:</span> <strong className="text-white font-mono">PRMRSO22</strong></p>
                    <p className="text-[11px] text-[#64748B] pt-1">Ku habboon wire transfer-ka caalamiga ah ee shirkadaha dibadda ($2,000+ contracts).</p>
                  </div>
                )}

                {paymentMethod === 'zaad' && (
                  <div className="space-y-1 text-xs text-[#CBD5E1]">
                    <p><span className="text-[#94A3B8]">Adeegga:</span> <strong className="text-white">Telesom Zaad Service</strong></p>
                    <p><span className="text-[#94A3B8]">Lambarka Zaad-ka:</span> <strong className="text-[#38BDF8] font-mono">+252 63 4892010</strong></p>
                    <p><span className="text-[#94A3B8]">Magaca Koontada:</span> <strong className="text-white">Make Platform Studio</strong></p>
                    <p className="text-[11px] text-[#64748B] pt-1">Bixi hormarka 50% ah ka dibna noo soo dir rasiidka tixraaca.</p>
                  </div>
                )}

                {paymentMethod === 'sahal' && (
                  <div className="space-y-1 text-xs text-[#CBD5E1]">
                    <p><span className="text-[#94A3B8]">Adeegga:</span> <strong className="text-white">Golis Sahal Service</strong></p>
                    <p><span className="text-[#94A3B8]">Lambarka Sahal-ka:</span> <strong className="text-[#38BDF8] font-mono">+252 90 7892010</strong></p>
                    <p><span className="text-[#94A3B8]">Magaca Koontada:</span> <strong className="text-white">Make Platform Studio</strong></p>
                    <p className="text-[11px] text-[#64748B] pt-1">Bixi hormarka 50% ah rasiidka ayaana toos loogu xaqiijinayaa nidaamka.</p>
                  </div>
                )}

                {paymentMethod === 'waafi' && (
                  <div className="space-y-1 text-xs text-[#CBD5E1]">
                    <p><span className="text-[#94A3B8]">Adeegga:</span> <strong className="text-white">Waafi / Hormuud Merchant</strong></p>
                    <p><span className="text-[#94A3B8]">Merchant ID:</span> <strong className="text-[#38BDF8] font-mono">829104</strong></p>
                    <p><span className="text-[#94A3B8]">Lambarka:</span> <strong className="text-white font-mono">+252 61 5892010</strong></p>
                    <p className="text-[11px] text-[#64748B] pt-1">Lacag-bixinta tooska ah ee Waafi, Hormuud, ama E-Dahab.</p>
                  </div>
                )}

                {paymentMethod === 'stripe' && (
                  <div className="space-y-1 text-xs text-[#CBD5E1]">
                    <p><span className="text-[#94A3B8]">Payment Channel:</span> <strong className="text-white">Stripe Corporate Invoice (Credit / Debit)</strong></p>
                    <p><span className="text-[#94A3B8]">Security:</span> <strong className="text-emerald-400">256-Bit SSL Encrypted &amp; NDA Attached</strong></p>
                    <p className="text-[11px] text-[#64748B] pt-1">Waxaan email-kaaga kuugu soo diraynaa invoice toos ah oo Stripe ah oo leh qandaraaska rasmiga ah.</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    alert(lang === 'so' ? 'Mahadsanid! Dalabkaaga iyo heshiiska waa la diiwaangeliyey. Waxaan kula soo xiriiraynaa 1 saac gudaheed.' : 'Thank you! Your scope selection and contract coordinates have been registered. I will contact you within 1 hour.')
                    setPaymentModalOpen(false)
                  }}
                  className="flex-1 py-3.5 rounded-xl bg-[#38BDF8] hover:bg-white text-black font-bold text-xs sm:text-sm shadow-lg shadow-[#38BDF8]/20 transition"
                >
                  {lang === 'so' ? 'Xaqiiji Qandaraaska & Bixinta' : 'Confirm Contract & Dispatch'}
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
