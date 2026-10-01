import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

// Public pages — code-split for faster initial load
const Home     = lazy(() => import('./pages/Home'))
const Skills   = lazy(() => import('./pages/Skills'))
const Services = lazy(() => import('./pages/Services'))
const About    = lazy(() => import('./pages/About'))
const Projects = lazy(() => import('./pages/Projects'))
const Support  = lazy(() => import('./pages/Support'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Admin (Supabase auth) loads only when /admin/* is visited
const AdminApp = lazy(() => import('./pages/admin/AdminApp'))

/** Full-page loading spinner shown while lazy chunks load */
function PageSpinner() {
  return (
    <div className="grid min-h-screen place-items-center bg-canvas-50">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-canvas-200 border-t-graphite-900" />
        <p className="text-sm font-medium text-graphite-400">Loading…</p>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <Suspense fallback={<PageSpinner />}>
      <Routes>
        {/* ── Public pages ── */}
        <Route path="/"         element={<Home />} />
        <Route path="/skills"   element={<Skills />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about"    element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/support"  element={<Support />} />

        {/* ── Admin ── */}
        <Route path="/admin/*"  element={<AdminApp />} />

        {/* ── 404 ── */}
        <Route path="*"         element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}
