import { useCallback, useEffect, useState } from 'react'
import { useAdminApi } from './useAdmin'
import { PageHeader, Card, Button, Notice, Spinner } from './AdminUI'
import FormFields from './FormFields'

/** Editor for a single-row section (profile, hero, contact info, SEO). */
export default function SingletonEditor({ title, description, endpoint, fields, beforeSave }) {
  const admin = useAdminApi()
  const [values, setValues] = useState(null)
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [notice, setNotice] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const data = await admin.get(endpoint)
      setValues(data || {})
    } catch (e) {
      setNotice({ type: 'error', text: e.message })
    } finally {
      setLoading(false)
    }
  }, [admin, endpoint])

  useEffect(() => {
    load()
  }, [load])

  async function save() {
    setBusy(true)
    setNotice(null)
    try {
      let payload = { ...values }
      delete payload.id
      delete payload.updated_at
      if (beforeSave) payload = beforeSave(payload)
      await admin.put(endpoint, payload)
      setNotice({ type: 'success', text: 'Saved. Refresh the public site to see changes.' })
    } catch (e) {
      setNotice({ type: 'error', text: e.message })
    } finally {
      setBusy(false)
    }
  }

  return (
    <div>
      <PageHeader
        title={title}
        description={description}
        actions={<Button onClick={save} busy={busy} disabled={loading}>Save changes</Button>}
      />
      {notice && (
        <div className="mb-4">
          <Notice type={notice.type} onClose={() => setNotice(null)}>{notice.text}</Notice>
        </div>
      )}
      {loading || !values ? (
        <div className="grid place-items-center py-16">
          <Spinner className="h-6 w-6 text-brand-400" />
        </div>
      ) : (
        <Card>
          <FormFields fields={fields} values={values} setValues={setValues} />
        </Card>
      )}
    </div>
  )
}
