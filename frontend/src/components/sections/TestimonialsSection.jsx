import { useLanguage } from '../../context/LanguageContext'
import Reveal from '../common/Reveal'

/**
 * Compact, Refined Human-Designed Testimonial Marquee.
 * - Concise, balanced headings & paragraphs
 * - Scaled-down compact card dimensions (not overly large)
 * - Balanced equal-length quote text
 * - Signature quotation mark + male executive portrait images
 * - Seamless synchronized auto-scroll animation
 */
export default function TestimonialsSection() {
  const { lang } = useLanguage()

  const testimonials = [
    {
      id: 1,
      client_name: 'Alex Johnson',
      role_company: 'CTO, Apex Digital Systems',
      image: '/images/client-1.jpg',
      quote:
        lang === 'so'
          ? 'Sharmaarke wuxuu noo dhisay gateway API xawaare sare leh. Fahamkiisa concurrency-ga iyo qaab-dhismeedka nadiifka ah wuxuu keenay jawaabo ka yar 60ms xilliyada saxmadda culus.'
          : 'Sharmaarke engineered our high-throughput API gateway. His deep understanding of concurrency, clean architecture, and database indexing delivered sub-60ms response times under peak load.',
    },
    {
      id: 2,
      client_name: 'Marcus Vance',
      role_company: 'VP of Engineering, Nova Cloud',
      image: '/images/client-2.jpg',
      quote:
        lang === 'so'
          ? 'Wuxuu nidaamkayagii deploy-ga u beddelay dhuumo CI/CD oo otomaatig ah oo eber cilad ah. Khibraddiisa cloud-ka waxay waqtigii deploy-ga ka dhigtay 4 daqiiqo halkii ay ka ahayd 45 daqiiqo.'
          : 'He transformed our deployment workflow into an automated, zero-downtime CI/CD pipeline. His cloud discipline slashed release cycles from 45 minutes down to 4 minutes flat.',
    },
    {
      id: 3,
      client_name: 'David K. Chen',
      role_company: 'Founder & CEO, FinPulse Labs',
      image: '/images/client-3.jpg',
      quote:
        lang === 'so'
          ? 'Waxaan u wacannay inuu eber ka dhiso app mobiil fintech ah. UX-ga jilicsan, amniga heerka bangiga, iyo adkeysiga offline-ka ayaa si toos ah kalsooni buuxda u geliyay maalgashadayaashayada.'
          : 'We brought him on to build our cross-platform fintech app from scratch. The fluid native UX, banking-grade security, and offline resilience gave our investors immediate confidence.',
    },
    {
      id: 4,
      client_name: 'Dr. Farhan Guled',
      role_company: 'Co-Founder & COO, HornTech',
      image: '/images/client-4.jpg',
      quote:
        lang === 'so'
          ? 'Platform-ka SaaS iyo web apps-ka uu noo dhisay waa heer caalami. Daryeelka faahfaahinta, shaashadaha ku habboon, iyo xawaaraha degdegga ah waxay guul weyn u horseedeen launch-keenna.'
          : 'The SaaS platform and web applications he engineered for us are truly world-class. Attention to detail, responsive layouts, and sub-second page loads made our launch an absolute success.',
    },
  ]

  // Duplicate for seamless infinite loop
  const infiniteTrack = [...testimonials, ...testimonials]

  return (
    <section
      id="testimonials"
      aria-label="Client Testimonials"
      className="relative section-pad bg-[#06080E] border-t border-[#1E2C4A] overflow-hidden"
    >
      {/* Soft Ambient Glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[500px] rounded-full bg-[#38BDF8]/10 blur-[100px]"
        aria-hidden="true"
      />

      <div className="container-page relative z-10">
        {/* Compact, Focused Header */}
        <Reveal>
          <div className="mx-auto max-w-xl text-center mb-10 sm:mb-12">
            <p className="text-[11px] font-mono font-medium uppercase tracking-wider text-[#38BDF8] mb-2">
              {lang === 'so' ? 'Kalsoonida Macaamiisha' : 'Client Testimonials'}
            </p>
            <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight leading-snug">
              {lang === 'so' ? 'Waxa Ay Macaamiishu Yiraahdeen' : 'What Leaders Say About My Work'}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#94A3B8] leading-relaxed max-w-md mx-auto">
              {lang === 'so'
                ? 'Aragtiyo dhab ah oo laga xigtay aasaasayaasha aan u dhisay nidaamyadooda wax-soo-saarka.'
                : 'Direct feedback from founders and engineering leaders whose critical systems I built and deployed.'}
            </p>
          </div>
        </Reveal>
      </div>

      {/* Synchronized Infinite Carousel Track */}
      <Reveal delay={100}>
        <div className="relative w-full overflow-hidden">
          {/* Soft edge fade masks */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-[#06080E] to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-[#06080E] to-transparent z-10" />

          <div className="animate-marquee py-2 px-2 flex gap-5 sm:gap-6">
            {infiniteTrack.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="group relative w-[290px] sm:w-[320px] lg:w-[340px] shrink-0 rounded-xl border border-[#1E2C4A] bg-[#0D1424]/90 p-5 sm:p-6 backdrop-blur-md transition-all duration-300 hover:border-[#38BDF8]/60 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#38BDF8]/15 flex flex-col justify-between"
              >
                <div>
                  {/* Compact Quote Icon */}
                  <div className="mb-3.5 flex items-center justify-start" aria-hidden="true">
                    <svg
                      className="h-7 w-7 text-[#38BDF8] transition-transform duration-300 group-hover:scale-105"
                      viewBox="0 0 48 48"
                      fill="currentColor"
                    >
                      <path d="M14.4 28.8c3.96 0 7.2-3.24 7.2-7.2s-3.24-7.2-7.2-7.2c-1.32 0-2.52.36-3.6 1.08.72-4.68 4.68-8.28 9.6-8.28V3.6C12.84 3.6 6.6 9.84 6.6 17.4v11.4h7.8zm19.2 0c3.96 0 7.2-3.24 7.2-7.2s-3.24-7.2-7.2-7.2c-1.32 0-2.52.36-3.6 1.08.72-4.68 4.68-8.28 9.6-8.28V3.6C32.04 3.6 25.8 9.84 25.8 17.4v11.4h7.8z" />
                    </svg>
                  </div>

                  {/* Sized-down, Balanced Body Text */}
                  <p className="text-[13px] sm:text-[13.5px] leading-relaxed text-[#CBD5E1] font-normal group-hover:text-white transition-colors">
                    {item.quote}
                  </p>
                </div>

                {/* Bottom Profile Row */}
                <div className="mt-6 pt-4 border-t border-[#1E2C4A]/70 flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.client_name}
                    className="h-10 w-10 rounded-full object-cover border border-[#1E2C4A] group-hover:border-[#38BDF8] transition-colors shadow-sm shrink-0"
                    loading="lazy"
                  />
                  <div className="min-w-0">
                    <h3 className="font-display text-[13px] sm:text-sm font-bold text-white group-hover:text-[#38BDF8] transition-colors truncate">
                      {item.client_name}
                    </h3>
                    <p className="text-[11px] text-[#94A3B8] truncate">
                      {item.role_company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
