import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { DeleteButton } from './DeleteButton'

export const dynamic = 'force-dynamic'

export default async function AdminPropertiesPage() {
  const properties = await prisma.property.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="heading-h2 text-espresso">Properties</h1>
        <Link href="/admin/properties/new"
          className="flex items-center gap-2 px-4 py-2 bg-terracotta text-white rounded-lg hover:bg-terracotta/90 transition-colors text-body-sm font-semibold">
          <Plus size={16} /> New Property
        </Link>
      </div>

      <div className="rounded-card bg-white shadow-card border border-border-soft overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-border-soft bg-cream/50">
              <th className="p-4 text-body-sm font-semibold text-espresso">Title</th>
              <th className="p-4 text-body-sm font-semibold text-espresso">Type</th>
              <th className="p-4 text-body-sm font-semibold text-espresso">Status</th>
              <th className="p-4 text-body-sm font-semibold text-espresso">Price</th>
              <th className="p-4 text-body-sm font-semibold text-espresso">Featured</th>
              <th className="p-4 text-body-sm font-semibold text-espresso">Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.length === 0 ? (
              <tr><td colSpan={6} className="p-8 text-center text-text-muted text-body-sm">No properties yet.</td></tr>
            ) : properties.map(p => (
              <tr key={p.id} className="border-b border-border-soft hover:bg-cream/30 transition-colors">
                <td className="p-4 text-body-sm text-text-body font-medium">{p.title}</td>
                <td className="p-4 text-body-sm text-text-muted">{p.type}</td>
                <td className="p-4"><span className="label-caps text-text-muted">{p.status}</span></td>
                <td className="p-4 text-body-sm text-text-muted">{p.price ? `₦${p.price.toLocaleString()}` : '—'}</td>
                <td className="p-4">{p.featured ? <span className="text-green-600 text-body-sm">Yes</span> : <span className="text-text-muted text-body-sm">No</span>}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/properties/${p.id}/edit`}
                      className="p-1.5 text-text-muted hover:text-terracotta transition-colors">
                      <Edit size={16} />
                    </Link>
                    <DeleteButton id={p.id} type="property" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
