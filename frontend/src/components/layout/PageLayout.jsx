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
    const fullTitle = title ? `${title} · Make` : 'Make — Senior Web & Mobile Application Studio'
    document.title = fullTitle

    const setMeta = (selector, attr, val) => {
      let el = document.head.querySelector(selector)
      if (!el && val) {
        el = document.createElement(selector.startsWith('meta') ? 'meta' : 'link')
        if (selector.includes('[name=')) {
          const name = selector.match(/\[name="([^"]+)"\]/)?.[1]
          if (name) el.setAttribute('name', name)
        } else if (selector.includes('[property=')) {
          const prop = selector.match(/\[property="([^"]+)"\]/)?.[1]
          if (prop) el.setAttribute('property', prop)
        } else if (selector.includes('[rel=')) {
          const rel = selector.match(/\[rel="([^"]+)"\]/)?.[1]
          if (rel) el.setAttribute('rel', rel)
        }
        document.head.appendChild(el)
      }
      if (el && val) el.setAttribute(attr, val)
    }

    if (description) {
      setMeta('meta[name="description"]', 'content', description)
      setMeta('meta[property="og:description"]', 'content', description)
      setMeta('meta[name="twitter:description"]', 'content', description)
    }
    setMeta('meta[property="og:title"]', 'content', fullTitle)
    setMeta('meta[name="twitter:title"]', 'content', fullTitle)

    // Canonical link
    const canonicalUrl = `https://make.dev${window.location.pathname}`
    setMeta('link[rel="canonical"]', 'href', canonicalUrl)
    setMeta('meta[property="og:url"]', 'content', canonicalUrl)

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
