import CollectionManager from '../../../components/admin/CollectionManager'

const fields = [
  { name: 'title', label: 'Title / phase', type: 'text', required: true },
  { name: 'organization', label: 'Organization / context', type: 'text' },
  { name: 'start_date', label: 'Start date', type: 'date', required: true },
  { name: 'end_date', label: 'End date', type: 'date', help: 'Leave empty if this is current' },
  { name: 'is_current', label: 'Current', type: 'checkbox', checkboxLabel: 'This is my current role/phase' },
  { name: 'description', label: 'Description', type: 'textarea', full: true },
  { name: 'tech_tags', label: 'Technology tags', type: 'tags', full: true },
  { name: 'is_sample', label: 'Sample', type: 'checkbox', checkboxLabel: 'Mark as SAMPLE (shows a badge)' },
]

function validate(v) {
  const e = {}
  if (!v.title?.trim()) e.title = 'Required.'
  if (!v.start_date) e.start_date = 'Required.'
  if (v.end_date && v.start_date && v.end_date < v.start_date) e.end_date = 'End must be after start.'
  return e
}

export default function ExperiencePanel() {
  return (
    <CollectionManager
      title="Experience timeline"
      description="Development phases / roles. Use SAMPLE for placeholders until you add real history."
      endpoint="/admin/experience"
      emptyItem={{ title: '', organization: '', start_date: '', end_date: null, is_current: false, description: '', tech_tags: [], is_sample: false, is_published: true }}
      fields={fields}
      validate={validate}
      beforeSave={(v) => ({ ...v, end_date: v.is_current ? null : v.end_date || null })}
      renderRow={(item) => (
        <div>
          <p className="font-medium text-white">
            {item.title} {item.is_sample && <span className="chip ml-2 border-amber-400/30 bg-amber-400/10 text-amber-300">Sample</span>}
          </p>
          <p className="text-xs text-slate-400">
            {item.organization} · {item.start_date} → {item.is_current ? 'Present' : item.end_date || '—'}
          </p>
        </div>
      )}
    />
  )
}
