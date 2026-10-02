import { lazy, Suspense, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Preloader from './components/common/Preloader'

const Home     = lazy(() => import('./pages/Home'))
const Skills   = lazy(() => import('./pages/Skills'))
const Services = lazy(() => import('./pages/Services'))
const About    = lazy(() => import('./pages/About'))
const Projects = lazy(() => import('./pages/Projects'))
const Support  = lazy(() => import('./pages/Support'))
const NotFound = lazy(() => import('./pages/NotFound'))

const AdminApp = lazy(() => import('./pages/admin/AdminApp'))

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
  const [loaded, setLoaded] = useState(() => sessionStorage.getItem('mk_loaded') === '1')

  const handleDone = () => {
    sessionStorage.setItem('mk_loaded', '1')
    setLoaded(true)
  }

  return (
    <>
      {!loaded && <Preloader onDone={handleDone} />}
      <Suspense fallback={<PageSpinner />}>
        <Routes>
          <Route path="/"         element={<Home />} />
          <Route path="/skills"   element={<Skills />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about"    element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/support"  element={<Support />} />

          <Route path="/admin/*"  element={<AdminApp />} />

          <Route path="*"         element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  )
}
