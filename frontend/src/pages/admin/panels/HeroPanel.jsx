import SingletonEditor from '../../../components/admin/SingletonEditor'
import CollectionManager from '../../../components/admin/CollectionManager'

const heroFields = [
  { name: 'headline', label: 'Headline', type: 'text', full: true, required: true },
  { name: 'subtitle', label: 'Subtitle', type: 'text', full: true },
  { name: 'description', label: 'Description', type: 'textarea', full: true },
  { name: 'primary_cta_label', label: 'Primary button label', type: 'text' },
  { name: 'primary_cta_href', label: 'Primary button link', type: 'text', help: 'e.g. #projects' },
  { name: 'secondary_cta_label', label: 'Secondary button label', type: 'text' },
  { name: 'secondary_cta_href', label: 'Secondary button link', type: 'text', help: 'e.g. #contact' },
]

const statFields = [
  { name: 'label', label: 'Label', type: 'text', required: true },
  { name: 'value', label: 'Value', type: 'text', required: true },
]

export default function HeroPanel() {
  return (
    <div className="space-y-12">
      <SingletonEditor
        title="Hero"
        description="The first thing visitors see."
        endpoint="/admin/hero"
        fields={heroFields}
      />
      <CollectionManager
        title="Hero stats"
        description="Small stat cards shown in the hero (e.g. “3+ years of experience”)."
        endpoint="/admin/hero-stats"
        emptyItem={{ label: '', value: '', is_published: true }}
        fields={statFields}
        renderRow={(s) => (
          <div>
            <p className="font-medium text-white">{s.value}</p>
            <p className="text-xs text-slate-400">{s.label}</p>
          </div>
        )}
      />
    </div>
  )
}
