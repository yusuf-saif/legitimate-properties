'use client'

import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function DeleteButton({ id, type }: { id: string; type: 'property' | 'news' | 'team' }) {
  const router = useRouter()

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this item?')) return
    try {
      const res = await fetch(`/api/admin/${type}s/${id}`, { method: 'DELETE' })
      if (res.ok) router.refresh()
      else alert('Failed to delete')
    } catch {
      alert('Failed to delete')
    }
  }

  return (
    <button onClick={handleDelete} className="p-1.5 text-text-muted hover:text-red-500 transition-colors">
      <Trash2 size={16} />
    </button>
  )
}
