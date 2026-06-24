import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create a sample property
  const property = await prisma.property.create({
    data: {
      slug: 'luxury-3-bedroom-terrace-maitama',
      title: 'Luxury 3-Bedroom Terrace — Maitama',
      type: 'residential',
      status: 'available',
      locationArea: 'Maitama',
      locationCity: 'Abuja',
      locationState: 'FCT',
      price: 185_000_000,
      priceOnRequest: false,
      specsBedrooms: 3,
      specsBathrooms: 3,
      specsSqm: 210,
      specsParking: 2,
      description: '<p>A meticulously designed 3-bedroom terrace home in the heart of Maitama. Open-plan living, premium finishes, and a private garden create an urban retreat that balances comfort with sophistication.</p><p>Located in one of Abuja’s most desirable districts, this property offers easy access to embassies, diplomatic residences, and the central business district.</p>',
      highlights: JSON.stringify(['Private garden', '24/7 security', 'Premium finishes', 'Ample parking', 'CCTV installed']),
      featured: true,
    },
  })

  // Create a sample news post
  await prisma.newsPost.create({
    data: {
      slug: 'real-estate-trends-nigeria-2024',
      title: 'Real Estate Trends Shaping Nigeria in 2024',
      excerpt: 'From shifting buyer preferences to emerging investment corridors, here is what is defining the Nigerian property market this year.',
      category: 'market-insight',
      author: 'Legitimate Properties',
      body: '<p>The Nigerian real estate market continues to evolve, driven by urbanisation, infrastructure development, and changing buyer expectations.</p><p>At Legitimate Properties, we track these shifts closely to ensure our clients make informed decisions.</p><h2>Key Trends</h2><p>Demand for mixed-use developments is rising, particularly in Abuja and Lagos corridors. Buyers increasingly value walkable neighbourhoods with integrated retail, green spaces, and reliable utilities.</p>',
    },
  })

  // Create a sample team member
  await prisma.teamMember.create({
    data: {
      name: 'Saif Yusuph',
      title: 'Founder & Lead',
      bio: 'With over a decade of experience in Nigerian real estate, Saif leads the team with a commitment to transparency and quality.',
      order: 0,
    },
  })

  console.log('Seed data created successfully')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
