import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Plus, Edit } from 'lucide-react'
import { DeleteButton } from '../properties/DeleteButton'

export const dynamic = 'force-dynamic'

export default async function AdminTeamPage() {
  const members = await prisma.teamMember.findMany({ orderBy: { order: 'asc' } })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="heading-h2 text-espresso">Team Members</h1>
        <Link href="/admin/team/new"
          className="flex items-center gap-2 px-4 py-2 bg-terracotta text-white rounded-lg hover:bg-terracotta/90 transition-colors text-body-sm font-semibold">
          <Plus size={16} /> New Member
        </Link>
      </div>

      <div className="rounded-card bg-white shadow-card border border-border-soft overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-border-soft bg-cream/50">
              <th className="p-4 text-body-sm font-semibold text-espresso">Name</th>
              <th className="p-4 text-body-sm font-semibold text-espresso">Title</th>
              <th className="p-4 text-body-sm font-semibold text-espresso">Order</th>
              <th className="p-4 text-body-sm font-semibold text-espresso">Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.length === 0 ? (
              <tr><td colSpan={4} className="p-8 text-center text-text-muted text-body-sm">No team members yet.</td></tr>
            ) : members.map(m => (
              <tr key={m.id} className="border-b border-border-soft hover:bg-cream/30 transition-colors">
                <td className="p-4 text-body-sm text-text-body font-medium">{m.name}</td>
                <td className="p-4 text-body-sm text-text-muted">{m.title}</td>
                <td className="p-4 text-body-sm text-text-muted">{m.order}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/team/${m.id}/edit`}
                      className="p-1.5 text-text-muted hover:text-terracotta transition-colors">
                      <Edit size={16} />
                    </Link>
                    <DeleteButton id={m.id} type="team" />
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
