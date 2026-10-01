import SingletonEditor from '../../../components/admin/SingletonEditor'

const fields = [
  { name: 'title', label: 'Site title', type: 'text', full: true },
  { name: 'description', label: 'Meta description', type: 'textarea', full: true, help: '~150–160 characters' },
  { name: 'keywords', label: 'Keywords', type: 'tags', full: true },
  { name: 'og_image_url', label: 'Social share image', type: 'image', folder: 'seo' },
  { name: 'canonical_url', label: 'Canonical URL', type: 'url' },
  { name: 'twitter_handle', label: 'Twitter/X handle', type: 'text', help: 'e.g. @username' },
]

export default function SeoPanel() {
  return (
    <SingletonEditor
      title="SEO metadata"
      description="Controls the page title, description, and social share preview."
      endpoint="/admin/seo"
      fields={fields}
      beforeSave={(v) => ({ ...v, og_image_url: v.og_image_url || null, canonical_url: v.canonical_url || null })}
    />
  )
}
