import SingletonEditor from '../../../components/admin/SingletonEditor'

const fields = [
  { name: 'full_name', label: 'Full name', type: 'text', required: true },
  { name: 'title', label: 'Professional title', type: 'text', help: 'e.g. Web & Mobile App Developer' },
  { name: 'tagline', label: 'Tagline', type: 'text' },
  { name: 'years_experience_label', label: 'Experience label', type: 'text', help: 'e.g. 3+ years' },
  { name: 'email', label: 'Public email', type: 'text' },
  { name: 'location', label: 'Location', type: 'text' },
  { name: 'short_bio', label: 'Short bio', type: 'textarea', rows: 2, full: true },
  { name: 'long_bio', label: 'Long bio', type: 'textarea', rows: 6, full: true },
  { name: 'avatar_url', label: 'Avatar', type: 'image', folder: 'profile' },
  { name: 'resume_url', label: 'Résumé URL', type: 'url' },
]

export default function ProfilePanel() {
  return (
    <SingletonEditor
      title="Profile"
      description="Your identity and biography shown across the site."
      endpoint="/admin/profile"
      fields={fields}
    />
  )
}
