'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ImageUploader } from '@/components/admin/ImageUploader'

interface Props {
  initial?: {
    id: string
    name: string
    title: string
    bio: string | null
    photoUrl: string | null
    photoAlt: string | null
    order: number
  }
}

export function TeamForm({ initial }: Props) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    name: initial?.name ?? '',
    title: initial?.title ?? '',
    bio: initial?.bio ?? '',
    photoUrl: initial?.photoUrl ?? '',
    photoAlt: initial?.photoAlt ?? '',
    order: initial?.order?.toString() ?? '99',
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      const url = initial ? `/api/admin/team/${initial.id}` : '/api/admin/team'
      const method = initial ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          photoUrl: form.photoUrl || null,
          photoAlt: form.photoAlt || null,
          order: parseInt(form.order),
        }),
      })
      if (res.ok) router.push('/admin/team')
      else alert('Failed to save')
    } catch {
      alert('Failed to save')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="heading-h3 text-espresso">{initial ? 'Edit Member' : 'New Member'}</h1>
        <button type="submit" disabled={saving}
          className="px-6 py-2.5 bg-terracotta text-white rounded-lg hover:bg-terracotta/90 transition-colors text-body-sm font-semibold disabled:opacity-50">
          {saving ? 'Saving...' : initial ? 'Update' : 'Create'}
        </button>
      </div>

      <div>
        <label className="block text-body-sm font-semibold text-espresso mb-1">Name</label>
        <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required
          className="w-full px-3 py-2 border border-border-soft rounded-lg text-body-sm focus:outline-none focus:border-terracotta transition-colors" />
      </div>
      <div>
        <label className="block text-body-sm font-semibold text-espresso mb-1">Title</label>
        <input type="text" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required
          className="w-full px-3 py-2 border border-border-soft rounded-lg text-body-sm focus:outline-none focus:border-terracotta transition-colors" />
      </div>
      <div>
        <label className="block text-body-sm font-semibold text-espresso mb-1">Bio</label>
        <textarea value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} rows={4}
          className="w-full px-3 py-2 border border-border-soft rounded-lg text-body-sm focus:outline-none focus:border-terracotta transition-colors" />
      </div>
      <div>
        <label className="block text-body-sm font-semibold text-espresso mb-1">Order</label>
        <input type="number" value={form.order} onChange={e => setForm(f => ({ ...f, order: e.target.value }))}
          className="w-full px-3 py-2 border border-border-soft rounded-lg text-body-sm focus:outline-none focus:border-terracotta transition-colors" />
      </div>
      <div>
        <label className="block text-body-sm font-semibold text-espresso mb-2">Photo</label>
        <div className="max-w-xs">
          <ImageUploader
            value={form.photoUrl ? { url: form.photoUrl, alt: form.photoAlt } : null}
            onChange={img => setForm(f => ({ ...f, photoUrl: img?.url ?? '', photoAlt: img?.alt ?? '' }))}
          />
        </div>
      </div>
    </form>
  )
}
