import { Link } from 'react-router-dom'
import { Home, ArrowRight } from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { SiteDataProvider } from '../context/SiteDataContext'

function NotFoundContent() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0e0e0e] text-[#d2d7dc]">
      <Navbar />
      <main id="main-content" className="flex flex-1 items-center justify-center px-5 py-32">
        <div className="text-center max-w-lg">
          {/* Large 404 */}
          <p className="font-display text-[7rem] sm:text-[9rem] font-black leading-none text-[#1e261d] select-none" aria-hidden="true">
            404
          </p>

          {/* Neon rule */}
          <div className="mx-auto my-6 h-1 w-12 rounded-full bg-[#39A751]" />

          <h1 className="font-display text-2xl sm:text-3xl font-bold text-white">Page not found</h1>
          <p className="mt-3 text-sm text-[#8a949e] leading-relaxed">
            The requested page does not exist or has been relocated. Use the navigation links below to return to Make&apos;s portfolio.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/" className="btn-lime gap-2 px-6 py-3 text-sm">
              <Home className="h-4 w-4" />
              <span>Return Home</span>
            </Link>
            <Link to="/support" className="btn-outline gap-2 px-6 py-3 text-sm">
              <span>Contact Make</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Quick jump */}
          <nav aria-label="Quick navigation" className="mt-12">
            <p className="text-xs font-bold uppercase tracking-widest text-[#8a949e] mb-3">Explore pages</p>
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
                  className="rounded-lg border border-[#1e261d] bg-[#141714] px-3.5 py-1.5 text-xs font-medium text-[#d2d7dc] hover:border-[#39A751]/50 hover:text-white transition"
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
