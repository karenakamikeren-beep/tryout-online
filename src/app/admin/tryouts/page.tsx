'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { FileText, Plus, Edit2, Trash2, AlertCircle, RefreshCw } from 'lucide-react'
import { toast } from 'sonner'

interface Tryout {
  id: string
  title: string
  description: string | null
  duration: number
  passingScore: number
  categoryId: string | null
  category: {
    id: string
    name: string
  } | null
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export default function AdminTryoutsPage() {
  const [tryouts, setTryouts] = useState<Tryout[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedTryout, setSelectedTryout] = useState<Tryout | null>(null)
  const [categories, setCategories] = useState<any[]>([])

  // Form state
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [duration, setDuration] = useState('30')
  const [passingScore, setPassingScore] = useState('70')
  const [categoryId, setCategoryId] = useState('')
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    fetchTryouts()
    fetchCategories()
  }, [])

  const fetchTryouts = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/tryouts')
      if (response.ok) {
        const data = await response.json()
        setTryouts(data.tryouts || [])
      } else {
        const error = await response.json()
        setError(error.error || 'Gagal memuat tryouts')
      }
    } catch (err) {
      console.error('Error fetching tryouts:', err)
      setError('Gagal memuat tryouts')
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/admin/categories')
      if (response.ok) {
        const data = await response.json()
        setCategories(data.categories || [])
      }
    } catch (err) {
      console.error('Error fetching categories:', err)
    }
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/admin/tryouts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          duration,
          passingScore,
          categoryId,
          isActive,
        }),
      })

      if (response.ok) {
        toast.success('Tryout berhasil dibuat')
        setIsDialogOpen(false)
        resetForm()
        fetchTryouts()
      } else {
        const error = await response.json()
        setError(error.error || 'Gagal membuat tryout')
      }
    } catch (err) {
      console.error('Error creating tryout:', err)
      setError('Gagal membuat tryout')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedTryout) return

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/admin/tryouts', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selectedTryout.id,
          title,
          description,
          duration,
          passingScore,
          categoryId,
          isActive,
        }),
      })

      if (response.ok) {
        toast.success('Tryout berhasil diperbarui')
        setIsDialogOpen(false)
        setSelectedTryout(null)
        resetForm()
        fetchTryouts()
      } else {
        const error = await response.json()
        setError(error.error || 'Gagal memperbarui tryout')
      }
    } catch (err) {
      console.error('Error updating tryout:', err)
      setError('Gagal memperbarui tryout')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!selectedTryout) return

    setLoading(true)
    setError('')

    try {
      const response = await fetch(`/api/admin/tryouts?id=${selectedTryout.id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast.success('Tryout berhasil dihapus')
        setIsDeleteDialogOpen(false)
        setSelectedTryout(null)
        fetchTryouts()
      } else {
        const error = await response.json()
        setError(error.error || 'Gagal menghapus tryout')
      }
    } catch (err) {
      console.error('Error deleting tryout:', err)
      setError('Gagal menghapus tryout')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setTitle('')
    setDescription('')
    setDuration('30')
    setPassingScore('70')
    setCategoryId('')
    setIsActive(true)
  }

  const openCreateDialog = () => {
    setSelectedTryout(null)
    resetForm()
    setIsDialogOpen(true)
  }

  const openEditDialog = (tryout: Tryout) => {
    setSelectedTryout(tryout)
    setTitle(tryout.title)
    setDescription(tryout.description || '')
    setDuration(String(tryout.duration))
    setPassingScore(String(tryout.passingScore))
    setCategoryId(tryout.categoryId || '')
    setIsActive(tryout.isActive)
    setIsDialogOpen(true)
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
            Manajemen Tryout
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Kelola semua tryout yang tersedia di platform
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={openCreateDialog} size="sm" className="bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-600">
            <Plus className="w-4 h-4 mr-2" />
            Buat Tryout
          </Button>
          <Button onClick={fetchTryouts} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-[40vh]">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 dark:border-green-500"></div>
          <p className="mt-4 text-slate-600 dark:text-slate-400">Memuat tryouts...</p>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center min-h-[40vh]">
          <Card className="max-w-md">
            <CardContent className="py-12 text-center">
              <AlertCircle className="w-16 h-16 mx-auto text-red-500 mb-4" />
              <p className="text-slate-600 dark:text-slate-400">{error}</p>
              <Button onClick={fetchTryouts} className="mt-4">
                <RefreshCw className="w-4 h-4 mr-2" />
                Coba Lagi
              </Button>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Tryouts List */}
          <Card>
            <CardHeader>
              <CardTitle>Daftar Tryout</CardTitle>
            </CardHeader>
            <CardContent>
              {tryouts.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                  <p className="text-slate-600 dark:text-slate-400 mb-4">Belum ada tryout</p>
                  <Button onClick={openCreateDialog}>
                    <Plus className="w-4 h-4 mr-2" />
                    Buat Tryout Pertama
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {tryouts.map((tryout) => (
                    <div key={tryout.id} className="p-4 border border-green-200 dark:border-green-700 rounded-lg hover:shadow-md transition-all">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">
                              {tryout.title}
                            </h3>
                            {tryout.category && (
                              <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs rounded-full">
                                {tryout.category.name}
                              </span>
                            )}
                          </div>
                          {tryout.description && (
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                              {tryout.description}
                            </p>
                          )}
                          <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400">
                            <span className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              <span>{tryout.duration} menit</span>
                            </span>
                            <span className="flex items-center gap-2">
                              <FileText className="w-4 h-4" />
                              <span>20 Soal (Default)</span>
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button onClick={() => openEditDialog(tryout)} variant="outline" size="sm">
                            <Edit2 className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                          <Button onClick={() => {
                            setSelectedTryout(tryout)
                            setIsDeleteDialogOpen(true)
                          }} variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Hapus
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedTryout ? 'Edit Tryout' : 'Buat Tryout Baru'}
            </DialogTitle>
            <DialogDescription>
              {selectedTryout ? 'Perbarui informasi tryout' : 'Buat tryout baru untuk platform'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={selectedTryout ? handleUpdate : handleCreate}>
            <div className="space-y-4 py-4">
              {error && (
                <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-3 text-sm">
                  <div className="flex items-center gap-2 text-red-700 dark:text-red-300">
                    <AlertCircle className="w-4 h-4" />
                    <span>{error}</span>
                  </div>
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="title">Judul Tryout *</Label>
                <Input
                  id="title"
                  placeholder="Contoh: Matematika Dasar"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea
                  id="description"
                  placeholder="Deskripsi singkat tentang tryout..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Durasi (menit) *</Label>
                <Input
                  id="duration"
                  type="number"
                  placeholder="30"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  required
                  disabled={loading}
                  min="1"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="passingScore">Passing Score (%)</Label>
                <Input
                  id="passingScore"
                  type="number"
                  placeholder="70"
                  value={passingScore}
                  onChange={(e) => setPassingScore(e.target.value)}
                  disabled={loading}
                  min="0"
                  max="100"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Kategori</Label>
                <select
                  id="category"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full p-2 border border-green-200 dark:border-green-700 rounded-md"
                  disabled={loading}
                >
                  <option value="">Pilih kategori (Opsional)</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  disabled={loading}
                />
                <Label htmlFor="isActive" className="cursor-pointer">
                  Aktif (Muncul di Landing Page)
                </Label>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                disabled={loading}
              >
                Batal
              </Button>
              <Button
                type="submit"
                disabled={loading || !title || !duration}
                className="bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-600"
              >
                {loading ? 'Memproses...' : selectedTryout ? 'Perbarui' : 'Buat'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus Tryout?</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus tryout <strong>{selectedTryout?.title}</strong>?
              <br />
              <span className="text-red-600 dark:text-red-400 font-semibold">
                Semua soal dan hasil ujian yang terhubung juga akan dihapus!
              </span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              disabled={loading}
            >
              Batal
            </Button>
            <Button
              onClick={handleDelete}
              variant="destructive"
              disabled={loading}
            >
              {loading ? 'Menghapus...' : 'Hapus'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
