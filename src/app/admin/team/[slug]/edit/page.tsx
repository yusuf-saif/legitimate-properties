import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { TeamForm } from '../../TeamForm'

export default async function EditTeamPage({ params }: { params: { slug: string } }) {
  const member = await prisma.teamMember.findUnique({ where: { id: params.slug } })
  if (!member) notFound()

  return (
    <TeamForm initial={{
      id: member.id,
      name: member.name,
      title: member.title,
      bio: member.bio,
      photoUrl: member.photoUrl,
      photoAlt: member.photoAlt,
      order: member.order,
    }} />
  )
}
