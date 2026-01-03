'use client'

import { useState, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Upload, Download, AlertCircle, CheckCircle, FileText, RefreshCw } from 'lucide-react'
import { toast } from 'sonner'

export default function AdminUploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [tryoutId, setTryoutId] = useState('')
  const [tryouts, setTryouts] = useState<any[]>([])
  const [preview, setPreview] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchTryouts()
  }, [])

  const fetchTryouts = async () => {
    try {
      const response = await fetch('/api/tryouts')
      if (response.ok) {
        const data = await response.json()
        setTryouts(data || [])
      }
    } catch (err) {
      console.error('Error fetching tryouts:', err)
      toast.error('Gagal memuat daftar tryout')
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      parseFile(selectedFile)
    }
  }

  const parseFile = async (file: File) => {
    try {
      const text = await file.text()
      let questions: any[] = []

      if (file.name.endsWith('.csv')) {
        // Parse CSV
        const lines = text.split('\n').filter(line => line.trim())
        const headers = lines[0].split(',').map(h => h.trim())

        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(',')
          const question: any = {}

          headers.forEach((header, index) => {
            question[header] = values[index]?.trim() || ''
          })

          if (question.tryoutId) {
            questions.push(question)
          }
        }
      } else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        // Parse Excel (simple implementation)
        // Note: For full Excel support, you'd need a library like 'xlsx'
        // This is a fallback for MVP
        toast.error('Format Excel belum didukung untuk MVP. Gunakan format CSV.')
        return
      }

      setPreview(questions)
    } catch (err) {
      console.error('Error parsing file:', err)
      toast.error('Gagal memparse file')
    }
  }

  const handleUpload = async () => {
    if (!file || preview.length === 0) {
      toast.error('Pilih file atau isi data upload terlebih dahulu')
      return
    }

    if (!tryoutId) {
      toast.error('Pilih tryout terlebih dahulu')
      return
    }

    setUploading(true)
    try {
      const response = await fetch('/api/admin/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questions: preview,
        }),
      })

      if (response.ok) {
        toast.success(`${preview.length} soal berhasil diupload`)
        setFile(null)
        setTryoutId('')
        setPreview([])
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
      } else {
        const error = await response.json()
        toast.error(error.error || 'Gagal mengupload soal')
      }
    } catch (err) {
      console.error('Error uploading:', err)
      toast.error('Gagal mengupload soal')
    } finally {
      setUploading(false)
    }
  }

  const downloadTemplate = () => {
    const headers = ['tryoutId', 'questionText', 'optionA', 'optionB', 'optionC', 'optionD', 'correctAnswer', 'explanation']
    const content = headers.join(',') + '\n'

    // Sample data
    const sample = [
      'TRYOUT_ID_HERE', 'Berapa 2 + 2?', '2', '3', '4', '1', 'Jawabannya adalah 1 karena 2 + 2 = 4.'
    ]

    const blob = new Blob([content + sample.join(',')], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'template_soal.csv'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" onClick={() => window.location.href = '/admin'}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Dashboard
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
            Upload Soal Sekali Banyak
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Upload ratusan soal melalui file CSV
          </p>
        </div>
      </div>

      {/* Instructions */}
      <Card className="mb-6 border-2 border-green-200 dark:border-green-700">
        <CardHeader>
          <CardTitle className="text-lg">Cara Penggunaan</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-2 text-sm text-slate-700 dark:text-slate-300">
            <li>
              <strong>1. Download Template</strong>
              <Button onClick={downloadTemplate} variant="ghost" size="sm" className="ml-2 h-6 px-2">
                <Download className="w-3 h-3" />
              </Button>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Format file CSV dengan header yang sesuai
              </p>
            </li>
            <li>
              <strong>2. Isi Data di Excel/CSV</strong>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Gunakan template yang sudah didownload, atau buat baru dengan header yang sama
              </p>
            </li>
            <li>
              <strong>3. Pilih Tryout</strong>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Soal akan diupload ke tryout yang dipilih
              </p>
            </li>
            <li>
              <strong>4. Upload File</strong>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Pilih file CSV yang sudah diisi, lalu klik tombol Upload
              </p>
            </li>
          </ol>
        </CardContent>
      </Card>

      {/* Upload Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Upload Form */}
        <Card>
          <CardHeader>
            <CardTitle>Upload File</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tryout">Pilih Tryout *</Label>
              <select
                id="tryout"
                value={tryoutId}
                onChange={(e) => setTryoutId(e.target.value)}
                className="w-full p-2 border border-green-200 dark:border-green-700 rounded-md"
                required
                disabled={uploading}
              >
                <option value="">Pilih tryout...</option>
                {tryouts.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="file">Pilih File CSV *</Label>
              <input
                ref={fileInputRef}
                id="file"
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                disabled={uploading}
                className="w-full p-2 border border-green-200 dark:border-green-700 rounded-md"
              />
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Hanya file .csv yang didukung untuk MVP
              </p>
            </div>

            {file && (
              <div className="p-3 bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-green-700 dark:text-green-300">
                  <FileText className="w-4 h-4" />
                  <span>File dipilih: <strong>{file.name}</strong> ({(file.size / 1024).toFixed(2)} KB)</span>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-2">
              <Button
                onClick={handleUpload}
                disabled={!file || preview.length === 0 || uploading || !tryoutId}
                className="w-full bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-600"
              >
                {uploading ? 'Mengupload...' : `Upload ${preview.length} Soal`}
              </Button>
              <Button
                onClick={downloadTemplate}
                variant="outline"
                disabled={uploading}
              >
                <Download className="w-4 h-4 mr-2" />
                Download Template
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Right: Preview */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Preview Soal</CardTitle>
              <Button
                onClick={() => {
                  setFile(null)
                  setPreview([])
                  if (fileInputRef.current) {
                    fileInputRef.current.value = ''
                  }
                }}
                variant="ghost"
                size="sm"
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {preview.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                <p className="text-slate-600 dark:text-slate-400">
                  {file ? 'Belum ada preview. Pastikan file CSV valid.' : 'Upload file untuk melihat preview'}
                </p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[60vh] overflow-y-auto">
                {preview.map((q, index) => (
                  <div key={index} className="p-3 border border-green-200 dark:border-green-700 rounded-lg">
                    <div className="text-sm font-semibold text-green-700 dark:text-green-300 mb-1">
                      Soal {index + 1}
                    </div>
                    <div className="mb-2 text-slate-900 dark:text-slate-50">
                      <strong>Pertanyaan:</strong> {q.questionText}
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <div><strong>A:</strong> {q.optionA}</div>
                      <div><strong>B:</strong> {q.optionB}</div>
                      <div><strong>C:</strong> {q.optionC}</div>
                      <div><strong>D:</strong> {q.optionD}</div>
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-sm">
                      <strong className="text-slate-900 dark:text-slate-50">Jawaban:</strong>
                      <span className="text-green-600 dark:text-green-400 font-bold">
                        {q.correctAnswer}
                      </span>
                    </div>
                    {q.explanation && (
                      <div className="mt-2 p-2 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-700 rounded">
                        <div className="text-xs font-semibold text-green-700 dark:text-green-300 mb-1">
                          Pembahasan:
                        </div>
                        <div className="text-xs text-slate-700 dark:text-slate-300">
                          {q.explanation}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
