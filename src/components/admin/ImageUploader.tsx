'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Upload, X } from 'lucide-react'

interface Props {
  value?: { url: string; alt?: string; caption?: string } | null
  onChange: (value: { url: string; alt?: string; caption?: string } | null) => void
  showAlt?: boolean
  showCaption?: boolean
}

export function ImageUploader({ value, onChange, showAlt = true, showCaption = false }: Props) {
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      const data = await res.json()
      if (data.url) {
        onChange({ url: data.url, alt: value?.alt, caption: value?.caption })
      }
    } catch (err) {
      console.error('Upload failed:', err)
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-3">
      {value?.url ? (
        <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-border-soft bg-cream">
          <Image src={value.url} alt={value.alt ?? ''} fill className="object-cover" />
          <button
            type="button"
            onClick={() => onChange(null)}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-full aspect-video rounded-lg border-2 border-dashed border-border-soft bg-cream flex flex-col items-center justify-center gap-2 hover:border-terracotta transition-colors cursor-pointer disabled:opacity-50"
        >
          <Upload size={24} className="text-text-muted" />
          <span className="text-body-sm text-text-muted">{uploading ? 'Uploading...' : 'Click to upload image'}</span>
        </button>
      )}
      <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp,image/avif" onChange={handleFile} className="hidden" />
      {showAlt && value?.url && (
        <input
          type="text"
          placeholder="Alt text"
          value={value.alt ?? ''}
          onChange={e => onChange({ ...value, alt: e.target.value })}
          className="w-full px-3 py-2 border border-border-soft rounded-lg text-body-sm text-text-body focus:outline-none focus:border-terracotta transition-colors"
        />
      )}
      {showCaption && value?.url && (
        <input
          type="text"
          placeholder="Caption"
          value={value.caption ?? ''}
          onChange={e => onChange({ ...value, caption: e.target.value })}
          className="w-full px-3 py-2 border border-border-soft rounded-lg text-body-sm text-text-body focus:outline-none focus:border-terracotta transition-colors"
        />
      )}
    </div>
  )
}
