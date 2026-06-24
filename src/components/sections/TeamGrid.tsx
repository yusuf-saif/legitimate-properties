'use client'

import Image from 'next/image'
import { Reveal } from '@/components/ui/Reveal'
import { StaggerGrid, StaggerItem } from '@/components/ui/StaggerGrid'
import type { TeamMember } from '@/types'

interface Props {
  team: TeamMember[]
}

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase() ?? '')
    .join('')
}

export function TeamGrid({ team }: Props) {
  if (!team.length) return null

  return (
    <Reveal as="section" className="section-padding bg-cream">
      <div className="container-lp">
        <Reveal className="mb-14 text-center">
          <p className="label-caps text-terracotta mb-3">Leadership</p>
          <h2 className="heading-h2 text-espresso">The people behind the standard.</h2>
        </Reveal>

        <StaggerGrid className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map(member => {
            const hasPhoto = Boolean(member.photo?.url)

            return (
              <StaggerItem key={member.id}>
                <article className="overflow-hidden rounded-card bg-white shadow-card">
                  <div className="relative aspect-square overflow-hidden bg-cream">
                    {hasPhoto ? (
                      <Image
                        src={member.photo!.url}
                        alt={member.photo!.alt ?? `${member.name} portrait`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-cream">
                        <span className="heading-h3 text-taupe">{getInitials(member.name)}</span>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="heading-h4 text-espresso mb-1">{member.name}</h3>
                    <p className="text-body-sm text-text-muted mb-3">{member.title}</p>
                    {member.bio && (
                      <p className="line-clamp-3 text-body-sm text-text-muted">{member.bio}</p>
                    )}
                  </div>
                </article>
              </StaggerItem>
            )
          })}
        </StaggerGrid>
      </div>
    </Reveal>
  )
}
