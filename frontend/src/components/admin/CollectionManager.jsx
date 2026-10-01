import { useCallback, useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, ChevronUp, ChevronDown, Eye, EyeOff } from 'lucide-react'
import { useAdminApi } from './useAdmin'
import { PageHeader, Card, Button, Notice, Modal, Toggle, Spinner } from './AdminUI'
import FormFields from './FormFields'
import ConfirmDialog from './ConfirmDialog'

/**
 * Generic CRUD manager for an ordered, publishable collection.
 *
 * Props:
 *  - title, description
 *  - endpoint: e.g. "/admin/projects"
 *  - fields: FormFields descriptor
 *  - emptyItem: default object for new rows
 *  - renderRow(item): JSX summary for the list row
 *  - hasPublish (default true), hasOrder (default true)
 *  - validate(values) => errors object (optional)
 *  - beforeSave(values) => cleaned values (optional)
 */
export default function CollectionManager({
  title,
  description,
  endpoint,
  fields,
  emptyItem,
  renderRow,
  hasPublish = true,
  hasOrder = true,
  validate,
  beforeSave,
}) {
  const admin = useAdminApi()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [notice, setNotice] = useState(null)
  const [editing, setEditing] = useState(null) // values object or null
  const [errors, setErrors] = useState({})
  const [busy, setBusy] = useState(false)
  const [toDelete, setToDelete] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const data = await admin.get(endpoint)
      setItems(Array.isArray(data) ? data : [])
    } catch (e) {
      setNotice({ type: 'error', text: e.message })
    } finally {
      setLoading(false)
    }
  }, [admin, endpoint])

  useEffect(() => {
    load()
  }, [load])

  function openNew() {
    setErrors({})
    setEditing({ ...emptyItem, display_order: items.length })
  }
  function openEdit(item) {
    setErrors({})
    setEditing({ ...emptyItem, ...item })
  }

  async function save() {
    let values = { ...editing }
    if (beforeSave) values = beforeSave(values)
    if (validate) {
      const errs = validate(values)
      if (Object.keys(errs).length) {
        setErrors(errs)
        return
      }
    }
    setBusy(true)
    try {
      if (values.id) {
        await admin.put(`${endpoint}/${values.id}`, values)
      } else {
        await admin.post(endpoint, values)
      }
      setEditing(null)
      setNotice({ type: 'success', text: 'Saved.' })
      await load()
    } catch (e) {
      setNotice({ type: 'error', text: e.message })
    } finally {
      setBusy(false)
    }
  }

  async function confirmDelete() {
    setBusy(true)
    try {
      await admin.del(`${endpoint}/${toDelete.id}`)
      setToDelete(null)
      setNotice({ type: 'success', text: 'Deleted.' })
      await load()
    } catch (e) {
      setNotice({ type: 'error', text: e.message })
    } finally {
      setBusy(false)
    }
  }

  async function togglePublish(item) {
    try {
      await admin.patch(`${endpoint}/${item.id}/publish`, { is_published: !item.is_published })
      await load()
    } catch (e) {
      setNotice({ type: 'error', text: e.message })
    }
  }

  async function move(index, dir) {
    const j = index + dir
    if (j < 0 || j >= items.length) return
    const reordered = [...items]
    ;[reordered[index], reordered[j]] = [reordered[j], reordered[index]]
    setItems(reordered) // optimistic
    try {
      await admin.put(`${endpoint}/reorder`, {
        items: reordered.map((it, i) => ({ id: it.id, display_order: i })),
      })
    } catch (e) {
      setNotice({ type: 'error', text: e.message })
      await load()
    }
  }

  return (
    <div>
      <PageHeader
        title={title}
        description={description}
        actions={
          <Button onClick={openNew}>
            <Plus className="h-4 w-4" /> Add new
          </Button>
        }
      />

      {notice && (
        <div className="mb-4">
          <Notice type={notice.type} onClose={() => setNotice(null)}>
            {notice.text}
          </Notice>
        </div>
      )}

      {loading ? (
        <div className="grid place-items-center py-16 text-slate-400">
          <Spinner className="h-6 w-6 text-brand-400" />
        </div>
      ) : items.length === 0 ? (
        <Card className="text-center text-slate-400">
          Nothing here yet. Click <span className="text-white">“Add new”</span> to create your first item.
        </Card>
      ) : (
        <ul className="space-y-3">
          {items.map((item, i) => (
            <li key={item.id}>
              <Card className="flex items-center gap-4 !p-4">
                {hasOrder && (
                  <div className="flex flex-col">
                    <button className="text-slate-500 hover:text-white disabled:opacity-30" disabled={i === 0}
                      onClick={() => move(i, -1)} aria-label="Move up">
                      <ChevronUp className="h-4 w-4" />
                    </button>
                    <button className="text-slate-500 hover:text-white disabled:opacity-30" disabled={i === items.length - 1}
                      onClick={() => move(i, 1)} aria-label="Move down">
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </div>
                )}

                <div className="min-w-0 flex-1">{renderRow(item)}</div>

                <div className="flex items-center gap-1">
                  {hasPublish && (
                    <button
                      onClick={() => togglePublish(item)}
                      className={`btn-ghost !px-2.5 !py-2 text-xs ${item.is_published ? '!text-emerald-300' : '!text-slate-400'}`}
                      title={item.is_published ? 'Published — click to unpublish' : 'Draft — click to publish'}
                    >
                      {item.is_published ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </button>
                  )}
                  <button onClick={() => openEdit(item)} className="btn-ghost !px-2.5 !py-2" aria-label="Edit">
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button onClick={() => setToDelete(item)} className="btn-ghost !px-2.5 !py-2 !text-red-400" aria-label="Delete">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      )}

      {editing && (
        <Modal
          title={editing.id ? 'Edit' : 'Add new'}
          onClose={() => setEditing(null)}
          footer={
            <>
              <Button variant="ghost" onClick={() => setEditing(null)}>Cancel</Button>
              <Button onClick={save} busy={busy}>Save</Button>
            </>
          }
        >
          <FormFields fields={fields} values={editing} setValues={setEditing} errors={errors} />
          {hasPublish && (
            <div className="mt-4 border-t border-white/10 pt-4">
              <Toggle
                checked={editing.is_published ?? true}
                onChange={(v) => setEditing((p) => ({ ...p, is_published: v }))}
                label="Published (visible on the public site)"
              />
            </div>
          )}
        </Modal>
      )}

      <ConfirmDialog
        open={!!toDelete}
        message="This action cannot be undone."
        onCancel={() => setToDelete(null)}
        onConfirm={confirmDelete}
        busy={busy}
      />
    </div>
  )
}
