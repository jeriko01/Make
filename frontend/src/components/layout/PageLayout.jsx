import { useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

/**
 * PageLayout — wraps every public-facing page with Navbar, content area, and Footer.
 *
 * Props:
 *  - title: string — used for document.title on each page
 *  - description: string — updates the meta description per page
 *  - children: React node
 *  - className: extra class for the main element (default: '')
 */
export default function PageLayout({ title, description, children, className = '' }) {
  useEffect(() => {
    if (title) document.title = `${title} · Make`
    if (description) {
      const el = document.head.querySelector('meta[name="description"]')
      if (el) el.setAttribute('content', description)
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [title, description])

  return (
    <div className="flex min-h-screen flex-col bg-[#0e0e0e] text-[#d2d7dc]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-[#39A751] focus:px-4 focus:py-2 focus:text-white focus:font-semibold"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" className={`flex-1 ${className}`}>
        {children}
      </main>
      <Footer />
    </div>
  )
}
