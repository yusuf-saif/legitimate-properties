import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import { join } from 'path'
import sharp from 'sharp'

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif']
const MAX_SIZE = 10 * 1024 * 1024

async function processFile(file: File): Promise<string> {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error(`Invalid file type: ${file.type}. Accepted: jpeg, png, webp, avif`)
  }
  if (file.size > MAX_SIZE) {
    throw new Error(`File too large: ${(file.size / 1024 / 1024).toFixed(1)}MB. Maximum 10MB`)
  }

  const ext = file.type.split('/')[1] as 'jpeg' | 'png' | 'webp' | 'avif'
  const filename = `${crypto.randomUUID()}.${ext}`
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const optimized = await sharp(buffer)
    .resize(1920, 1920, { fit: 'inside', withoutEnlargement: true })
    .toFormat(ext, { quality: 85 })
    .toBuffer()

  const filepath = join(process.cwd(), 'public', 'uploads', filename)
  await writeFile(filepath, optimized)

  return `/uploads/${filename}`
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    const files = formData.getAll('file') as File[]

    if (!files.length) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 })
    }

    if (files.length === 1) {
      try {
        const url = await processFile(files[0])
        return NextResponse.json({ url })
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Upload failed'
        return NextResponse.json({ error: message }, { status: 400 })
      }
    }

    const urls: string[] = []
    const errors: string[] = []

    for (const file of files) {
      try {
        const url = await processFile(file)
        urls.push(url)
      } catch (error) {
        errors.push(`${file.name}: ${error instanceof Error ? error.message : 'Failed'}`)
      }
    }

    return NextResponse.json({ urls, errors: errors.length ? errors : undefined })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
