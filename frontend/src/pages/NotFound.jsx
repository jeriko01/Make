import { Link } from 'react-router-dom'
import { Home, ArrowRight } from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { SiteDataProvider } from '../context/SiteDataContext'

function NotFoundContent() {
  return (
    <div className="flex min-h-screen flex-col bg-[#06080E] text-[#CBD5E1]">
      <Navbar />
      <main id="main-content" className="flex flex-1 items-center justify-center px-5 py-32">
        <div className="text-center max-w-lg">
          <p className="font-display text-[7rem] sm:text-[9rem] font-black leading-none text-[#1E2C4A] select-none" aria-hidden="true">
            404
          </p>

          <div className="mx-auto my-6 h-1 w-12 rounded-full bg-[#0284C7]" />

          <h1 className="font-display text-2xl sm:text-3xl font-bold text-white">Page not found</h1>
          <p className="mt-3 text-sm text-[#94A3B8] leading-relaxed">
            The requested page does not exist or has been relocated. Use the navigation links below to return to Make&apos;s portfolio.
          </p>

          <div className="mt-8 flex flex-row items-center justify-center gap-2.5 sm:gap-3.5">
            <Link
              to="/"
              className="btn-lime flex-1 sm:flex-initial shrink-0 justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-bold shadow-lg shadow-[#0284C7]/20 hover:shadow-[#0284C7]/35 transition-all text-center whitespace-nowrap"
            >
              <Home className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
              <span>Return Home</span>
            </Link>
            <Link
              to="/support"
              className="btn-outline flex-1 sm:flex-initial shrink-0 justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm transition-all text-center whitespace-nowrap"
            >
              <span>Contact Make</span>
              <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
            </Link>
          </div>

          <nav aria-label="Quick navigation" className="mt-12">
            <p className="text-xs font-bold uppercase tracking-widest text-[#94A3B8] mb-3">Explore pages</p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                { path: '/skills', label: 'Skills' },
                { path: '/services', label: 'Services' },
                { path: '/about', label: 'About' },
                { path: '/projects', label: 'Projects' },
                { path: '/support', label: 'Support' },
              ].map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  className="rounded-lg border border-[#1E2C4A] bg-[#0D1424] px-3.5 py-1.5 text-xs font-medium text-[#CBD5E1] hover:border-[#0284C7]/50 hover:text-white transition"
                >
                  {label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default function NotFoundPage() {
  return (
    <SiteDataProvider>
      <NotFoundContent />
    </SiteDataProvider>
  )
}
