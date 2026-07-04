'use client'

import { useState, useRef } from 'react'
import { Upload } from 'lucide-react'

interface Props {
  onUpload: (urls: string[]) => void
}

export function MultiImageUploader({ onUpload }: Props) {
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files?.length) return

    setUploading(true)
    const formData = new FormData()
    for (const file of Array.from(files)) {
      formData.append('file', file)
    }

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      const data = await res.json()
      if (data.urls?.length) onUpload(data.urls)
    } catch (err) {
      console.error('Upload failed:', err)
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="w-full aspect-square rounded-lg border-2 border-dashed border-border-soft bg-cream flex flex-col items-center justify-center gap-2 hover:border-terracotta transition-colors cursor-pointer disabled:opacity-50"
      >
        <Upload size={24} className="text-text-muted" />
        <span className="text-body-sm text-text-muted">{uploading ? 'Uploading...' : 'Add images'}</span>
      </button>
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/jpeg,image/png,image/webp,image/avif"
        onChange={handleFiles}
        className="hidden"
      />
    </>
  )
}
