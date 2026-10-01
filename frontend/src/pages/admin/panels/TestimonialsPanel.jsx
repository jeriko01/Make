import CollectionManager from '../../../components/admin/CollectionManager'

const fields = [
  { name: 'client_name', label: 'Client name', type: 'text', required: true },
  { name: 'role_company', label: 'Role / company', type: 'text' },
  { name: 'rating', label: 'Rating (1–5)', type: 'number', min: 1, max: 5 },
  { name: 'photo_url', label: 'Photo', type: 'image', folder: 'testimonials' },
  { name: 'quote', label: 'Quote', type: 'textarea', full: true, required: true },
  { name: 'metrics', label: 'Metric line (optional)', type: 'text', full: true },
  { name: 'is_sample', label: 'Sample', type: 'checkbox', checkboxLabel: 'Mark as SAMPLE (shows a badge)' },
]

function validate(v) {
  const e = {}
  if (!v.client_name?.trim()) e.client_name = 'Required.'
  if (!v.quote?.trim()) e.quote = 'Required.'
  return e
}

export default function TestimonialsPanel() {
  return (
    <CollectionManager
      title="Testimonials"
      description="Only publish real testimonials. Keep placeholders marked SAMPLE."
      endpoint="/admin/testimonials"
      emptyItem={{ client_name: '', role_company: '', rating: 5, photo_url: null, quote: '', metrics: '', is_sample: false, is_published: true }}
      fields={fields}
      validate={validate}
      beforeSave={(v) => ({ ...v, photo_url: v.photo_url || null, rating: Number(v.rating) || 5 })}
      renderRow={(t) => (
        <div>
          <p className="font-medium text-white">
            {t.client_name} {t.is_sample && <span className="chip ml-2 border-amber-400/30 bg-amber-400/10 text-amber-300">Sample</span>}
          </p>
          <p className="truncate text-xs text-slate-400">{t.quote}</p>
        </div>
      )}
    />
  )
}
