import SingletonEditor from '../../../components/admin/SingletonEditor'
import CollectionManager from '../../../components/admin/CollectionManager'

const infoFields = [
  { name: 'email', label: 'Contact email', type: 'text', full: true },
  { name: 'location', label: 'Location', type: 'text', full: true },
  { name: 'availability', label: 'Availability note', type: 'textarea', full: true },
]

const PLATFORMS = ['github', 'linkedin', 'twitter', 'x', 'instagram', 'youtube', 'facebook', 'website', 'email']
  .map((p) => ({ value: p, label: p }))

const socialFields = [
  { name: 'platform', label: 'Platform', type: 'select', options: PLATFORMS },
  { name: 'label', label: 'Label (optional)', type: 'text' },
  { name: 'url', label: 'URL', type: 'url', full: true, required: true },
]

function validateSocial(v) {
  const e = {}
  if (!v.url?.trim()) e.url = 'Required.'
  else if (!/^https?:\/\//.test(v.url)) e.url = 'Must start with http(s)://'
  return e
}

export default function ContactPanel() {
  return (
    <div className="space-y-12">
      <SingletonEditor
        title="Contact information"
        description="Shown in the Contact section cards."
        endpoint="/admin/contact-info"
        fields={infoFields}
      />
      <CollectionManager
        title="Social links"
        description="Only published links with real URLs appear on the site — no dead placeholders."
        endpoint="/admin/social-links"
        emptyItem={{ platform: 'github', label: '', url: '', is_published: true }}
        fields={socialFields}
        validate={validateSocial}
        renderRow={(l) => (
          <div>
            <p className="font-medium capitalize text-white">{l.label || l.platform}</p>
            <p className="truncate text-xs text-slate-400">{l.url}</p>
          </div>
        )}
      />
    </div>
  )
}
