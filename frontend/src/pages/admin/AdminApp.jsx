import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from '../../context/AuthContext'
import AdminLogin from './Login'
import AdminLayout from './AdminLayout'
import RequireAuth from './RequireAuth'
import Dashboard from './Dashboard'
import ProfilePanel from './panels/ProfilePanel'
import HeroPanel from './panels/HeroPanel'
import AboutPanel from './panels/AboutPanel'
import ExperiencePanel from './panels/ExperiencePanel'
import SkillsPanel from './panels/SkillsPanel'
import ProjectsPanel from './panels/ProjectsPanel'
import ServicesPanel from './panels/ServicesPanel'
import TestimonialsPanel from './panels/TestimonialsPanel'
import ContactPanel from './panels/ContactPanel'
import MessagesPanel from './panels/MessagesPanel'
import SeoPanel from './panels/SeoPanel'

// Everything admin-related (including @supabase/supabase-js via AuthProvider)
// lives in this lazily-loaded chunk, keeping the public site bundle small.
export default function AdminApp() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="login" element={<AdminLogin />} />
        <Route
          path="/"
          element={
            <RequireAuth>
              <AdminLayout />
            </RequireAuth>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<ProfilePanel />} />
          <Route path="hero" element={<HeroPanel />} />
          <Route path="about" element={<AboutPanel />} />
          <Route path="experience" element={<ExperiencePanel />} />
          <Route path="skills" element={<SkillsPanel />} />
          <Route path="projects" element={<ProjectsPanel />} />
          <Route path="services" element={<ServicesPanel />} />
          <Route path="testimonials" element={<TestimonialsPanel />} />
          <Route path="contact" element={<ContactPanel />} />
          <Route path="messages" element={<MessagesPanel />} />
          <Route path="seo" element={<SeoPanel />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}
