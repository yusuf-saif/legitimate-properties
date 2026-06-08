import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'
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
    <section className="section-padding bg-cream">
      <div className="container-lp">
        <div className="mb-14 text-center">
          <p className="label-caps text-terracotta mb-3">Leadership</p>
          <h2 className="heading-h2 text-espresso">The people behind the standard.</h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map(member => {
            const hasPhoto = Boolean(member.photo?.asset)

            return (
              <article key={member._id} className="overflow-hidden rounded-card bg-white shadow-card">
                <div className="relative aspect-square overflow-hidden bg-cream">
                  {hasPhoto ? (
                    <Image
                      src={urlFor(member.photo).width(800).height(800).auto('format').url()}
                      alt={member.photo.alt ?? `${member.name} portrait`}
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
                  <p className="line-clamp-3 text-body-sm text-text-muted">{member.bio}</p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
