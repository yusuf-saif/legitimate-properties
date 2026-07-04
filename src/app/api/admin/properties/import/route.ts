import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import Papa from 'papaparse'

function parseBoolean(value: string | undefined): boolean {
  if (!value) return false
  const v = value.trim().toLowerCase()
  return ['true', 'yes', '1'].includes(v)
}

function validateType(v: string | undefined): string {
  const t = v?.trim().toLowerCase()
  if (t && ['residential', 'commercial', 'land', 'mixed-use'].includes(t)) return t
  return 'residential'
}

function validateStatus(v: string | undefined): string {
  const s = v?.trim().toLowerCase()
  if (s && ['available', 'sold', 'reserved', 'off-plan'].includes(s)) return s
  return 'available'
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

async function deduplicateSlug(base: string): Promise<string> {
  const slug = slugify(base) || 'property'
  const existing = await prisma.property.findUnique({ where: { slug } })
  if (!existing) return slug
  for (let i = 2; i <= 100; i++) {
    const candidate = `${slug}-${i}`
    const taken = await prisma.property.findUnique({ where: { slug: candidate } })
    if (!taken) return candidate
  }
  return `${slug}-${crypto.randomUUID().slice(0, 8)}`
}

function parseLocation(location: string | undefined) {
  const parts = (location ?? '').split(',').map(s => s.trim()).filter(Boolean)
  return {
    locationArea: parts[0] ?? '',
    locationCity: parts[1] ?? '',
    locationState: parts[2] ?? '',
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    const text = await file.text()
    const { data, errors: parseErrors } = Papa.parse(text, {
      header: true,
      skipEmptyLines: true,
    })

    const rows = data as Record<string, string>[]
    const imported: { id: string; slug: string; title: string }[] = []
    const skipped: { row: number; reason: string }[] = []

    for (const pe of parseErrors) {
      skipped.push({ row: (pe.row ?? 0) + 2, reason: `CSV parse: ${pe.message}` })
    }

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i]
      const rowNum = i + 2

      const title = row.title?.trim()
      if (!title) {
        skipped.push({ row: rowNum, reason: 'Missing title' })
        continue
      }

      const price = parseFloat(row.price)
      if (isNaN(price)) {
        skipped.push({ row: rowNum, reason: `Invalid price: "${row.price}"` })
        continue
      }

      const description = row.description?.trim()
      if (!description) {
        skipped.push({ row: rowNum, reason: 'Missing description' })
        continue
      }

      const slug = row.slug?.trim() ? slugify(row.slug) : slugify(title)
      const uniqueSlug = await deduplicateSlug(slug || title)
      const location = parseLocation(row.location)

      const property = await prisma.property.create({
        data: {
          slug: uniqueSlug,
          title,
          type: validateType(row.property_type),
          status: validateStatus(row.status),
          ...location,
          price,
          priceOnRequest: false,
          specsBedrooms: row.bedrooms ? parseInt(row.bedrooms) || null : null,
          specsBathrooms: row.bathrooms ? parseInt(row.bathrooms) || null : null,
          specsSqm: row.size ? parseFloat(row.size.replace(/[^0-9.]/g, '')) || null : null,
          specsParking: null,
          description: `<p>${description}</p>`,
          highlights: row.features ? JSON.stringify(row.features.split('|').map(s => s.trim()).filter(Boolean)) : '[]',
          featured: parseBoolean(row.featured),
          published: parseBoolean(row.published),
        },
      })

      imported.push({ id: property.id, slug: property.slug, title: property.title })
    }

    return NextResponse.json({
      total: rows.length,
      imported: imported.length,
      skipped: skipped.length,
      errors: skipped,
      properties: imported,
    })
  } catch (error) {
    console.error('Import error:', error)
    return NextResponse.json({ error: 'Failed to import properties' }, { status: 500 })
  }
}
