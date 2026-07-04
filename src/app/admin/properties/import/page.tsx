'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { Upload, ArrowLeft, CheckCircle2, AlertCircle, FileDown } from 'lucide-react'

interface ImportResult {
  total: number
  imported: number
  skipped: number
  errors: { row: number; reason: string }[]
  properties: { id: string; slug: string; title: string }[]
}

export default function ImportPropertiesPage() {
  const [file, setFile] = useState<File | null>(null)
  const [dragging, setDragging] = useState(false)
  const [importing, setImporting] = useState(false)
  const [result, setResult] = useState<ImportResult | null>(null)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  function handleFile(f: File) {
    if (!f.name.endsWith('.csv')) {
      setError('Please select a CSV file')
      return
    }
    setFile(f)
    setError('')
    setResult(null)
  }

  async function handleImport() {
    if (!file) return
    setImporting(true)
    setError('')
    setResult(null)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/admin/properties/import', { method: 'POST', body: formData })
      if (!res.ok) {
        const err = await res.json()
        const msg = err.details
          ? `${err.error}: ${err.details.map((d: { message?: string }) => d.message).filter(Boolean).join('; ')}`
          : err.error || 'Import failed'
        setError(msg)
        return
      }
      const data: ImportResult = await res.json()
      setResult(data)
    } catch {
      setError('Network error — please try again')
    } finally {
      setImporting(false)
    }
  }

  function reset() {
    setFile(null)
    setResult(null)
    setError('')
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="heading-h2 text-espresso">Import Properties</h1>
        <Link href="/admin/properties"
          className="flex items-center gap-2 px-4 py-2 border border-border-soft text-text-body rounded-lg hover:border-terracotta hover:text-terracotta transition-colors text-body-sm font-semibold">
          <ArrowLeft size={16} /> Back to Properties
        </Link>
      </div>

      <div className="max-w-2xl space-y-6">
        <div className="rounded-card bg-white shadow-card border border-border-soft p-6">
          <p className="text-body-sm text-text-muted mb-4">
            Upload a CSV file to bulk-create property listings. Images are not included — add them later from the edit page.
          </p>
          <Link href="/sample-properties.csv" download
            className="inline-flex items-center gap-2 text-terracotta hover:text-terracotta/80 transition-colors text-body-sm font-semibold mb-6">
            <FileDown size={16} /> Download Sample CSV
          </Link>

          {!result ? (
            <>
              <div
                onDragOver={e => { e.preventDefault(); setDragging(true) }}
                onDragLeave={() => setDragging(false)}
                onDrop={e => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]) }}
                onClick={() => inputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${dragging ? 'border-terracotta bg-terracotta/5' : 'border-border-soft hover:border-terracotta/50'}`}
              >
                <Upload size={36} className="mx-auto mb-3 text-text-muted" />
                <p className="text-body-sm text-text-muted mb-1">
                  {file ? file.name : 'Click or drag & drop a CSV file'}
                </p>
                {file && (
                  <p className="text-body-xs text-text-muted">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                )}
                <input
                  ref={inputRef}
                  type="file"
                  accept=".csv"
                  onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])}
                  className="hidden"
                />
              </div>

              {error && (
                <p className="mt-3 text-body-sm text-red-500 flex items-center gap-2">
                  <AlertCircle size={14} /> {error}
                </p>
              )}

              <button
                type="button"
                onClick={handleImport}
                disabled={!file || importing}
                className="mt-6 w-full px-6 py-2.5 bg-terracotta text-white rounded-lg hover:bg-terracotta/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-body-sm font-semibold flex items-center justify-center gap-2"
              >
                {importing ? (
                  <>Importing...</>
                ) : (
                  <><Upload size={16} /> Import Properties</>
                )}
              </button>
            </>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-green-600">
                <CheckCircle2 size={20} />
                <span className="text-body-sm font-semibold">Import complete</span>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-lg bg-cream p-4 text-center">
                  <p className="text-h3 font-semibold text-espresso">{result.total}</p>
                  <p className="text-body-xs text-text-muted">Total rows</p>
                </div>
                <div className="rounded-lg bg-green-50 p-4 text-center">
                  <p className="text-h3 font-semibold text-green-700">{result.imported}</p>
                  <p className="text-body-xs text-green-600">Imported</p>
                </div>
                <div className="rounded-lg bg-amber-50 p-4 text-center">
                  <p className="text-h3 font-semibold text-amber-700">{result.skipped}</p>
                  <p className="text-body-xs text-amber-600">Skipped</p>
                </div>
              </div>

              {result.errors.length > 0 && (
                <div>
                  <p className="text-body-sm font-semibold text-espresso mb-2">Skipped rows</p>
                  <div className="space-y-1 max-h-40 overflow-y-auto">
                    {result.errors.map((e, i) => (
                      <p key={i} className="text-body-xs text-text-muted">
                        Row {e.row}: {e.reason}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {result.properties.length > 0 && (
                <div>
                  <p className="text-body-sm font-semibold text-espresso mb-2">Imported properties</p>
                  <div className="space-y-1 max-h-40 overflow-y-auto">
                    {result.properties.map(p => (
                      <Link key={p.id} href={`/admin/properties/${p.slug}/edit`}
                        className="block text-body-xs text-terracotta hover:underline">
                        {p.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={reset}
                className="w-full px-6 py-2.5 border border-border-soft text-text-body rounded-lg hover:border-terracotta hover:text-terracotta transition-colors text-body-sm font-semibold"
              >
                Import another file
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
