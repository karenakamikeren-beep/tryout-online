'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { FileText, Plus, Trash2, AlertCircle, RefreshCw, FileSearch, FileText } from 'lucide-react'
import { toast } from 'sonner'

interface Question {
  id: string
  tryoutId: string
  tryout: {
    id: string
    title: string
    category?: {
      name: string
    }
  }
  questionText: string
  optionA: string
  optionB: string
  optionC: string
  optionD: string
  correctAnswer: string
  explanation: string
}

interface Tryout {
  id: string
  title: string
  duration: number
}

export default function AdminQuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [tryouts, setTryouts] = useState<Tryout[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null)

  // Form state
  const [tryoutId, setTryoutId] = useState('')
  const [questionText, setQuestionText] = useState('')
  const [optionA, setOptionA] = useState('')
  const [optionB, setOptionB] = useState('')
  const [optionC, setOptionC] = useState('')
  const [optionD, setOptionD] = useState('')
  const [correctAnswer, setCorrectAnswer] = useState('A')
  const [explanation, setExplanation] = useState('')

  useEffect(() => {
    fetchQuestions()
    fetchTryouts()
  }, [])

  const fetchQuestions = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/questions')
      if (response.ok) {
        const data = await response.json()
        setQuestions(data.questions || [])
      } else {
        const error = await response.json()
        setError(error.error || 'Gagal memuat soal')
      }
    } catch (err) {
      console.error('Error fetching questions:', err)
      setError('Gagal memuat soal')
    } finally {
      setLoading(false)
    }
  }

  const fetchTryouts = async () => {
    try {
      const response = await fetch('/api/tryouts')
      if (response.ok) {
        const data = await response.json()
        setTryouts(data || [])
      }
    } catch (err) {
      console.error('Error fetching tryouts:', err)
    }
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/admin/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tryoutId,
          questionText,
          optionA,
          optionB,
          optionC,
          optionD,
          correctAnswer,
          explanation,
        }),
      })

      if (response.ok) {
        toast.success('Soal berhasil dibuat')
        setIsDialogOpen(false)
        resetForm()
        fetchQuestions()
      } else {
        const error = await response.json()
        setError(error.error || 'Gagal membuat soal')
      }
    } catch (err) {
      console.error('Error creating question:', err)
      setError('Gagal membuat soal')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!selectedQuestion) return

    setLoading(true)
    setError('')

    try {
      const response = await fetch(`/api/admin/questions?id=${selectedQuestion.id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast.success('Soal berhasil dihapus')
        setIsDeleteDialogOpen(false)
        setSelectedQuestion(null)
        fetchQuestions()
      } else {
        const error = await response.json()
        setError(error.error || 'Gagal menghapus soal')
      }
    } catch (err) {
      console.error('Error deleting question:', err)
      setError('Gagal menghapus soal')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setTryoutId('')
    setQuestionText('')
    setOptionA('')
    setOptionB('')
    setOptionC('')
    setOptionD('')
    setCorrectAnswer('A')
    setExplanation('')
  }

  const openCreateDialog = () => {
    setSelectedQuestion(null)
    resetForm()
    setIsDialogOpen(true)
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
            Manajemen Soal
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Kelola semua soal yang tersedia di platform
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={openCreateDialog} size="sm" className="bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-600">
            <Plus className="w-4 h-4 mr-2" />
            Buat Soal
          </Button>
          <Button onClick={fetchQuestions} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-[40vh]">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 dark:border-green-500"></div>
          <p className="mt-4 text-slate-600 dark:text-slate-400">Memuat soal...</p>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center min-h-[40vh]">
          <Card className="max-w-md">
            <CardContent className="py-12 text-center">
              <AlertCircle className="w-16 h-16 mx-auto text-red-500 mb-4" />
              <p className="text-slate-600 dark:text-slate-400">{error}</p>
              <Button onClick={fetchQuestions} className="mt-4">
                <RefreshCw className="w-4 h-4 mr-2" />
                Coba Lagi
              </Button>
            </CardContent>
          </Card>
        </div>
      ) : (
        <>
          {/* Questions List */}
          <Card>
            <CardHeader>
              <CardTitle>Daftar Soal</CardTitle>
            </CardHeader>
            <CardContent>
              {questions.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                  <p className="text-slate-600 dark:text-slate-400 mb-4">Belum ada soal</p>
                  <Button onClick={openCreateDialog}>
                    <Plus className="w-4 h-4 mr-2" />
                    Buat Soal Pertama
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {questions.map((question) => (
                    <div key={question.id} className="p-4 border border-green-200 dark:border-green-700 rounded-lg hover:shadow-md transition-all">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <FileSearch className="w-4 h-4 text-green-600 dark:text-green-400" />
                            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50">
                              {question.questionText}
                            </h3>
                            <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs rounded-full">
                              {question.tryout.category && question.tryout.category.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                            <span className="flex items-center gap-1">
                              <FileText className="w-3 h-3" />
                              <strong>{question.tryout.title}</strong>
                            </span>
                            <span>•</span>
                            <span>Jawaban: <strong>{question.correctAnswer}</strong></span>
                          </div>
                          {question.explanation && (
                            <div className="mt-2 p-2 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-700 rounded-lg text-sm">
                              <span className="font-semibold text-green-700 dark:text-green-300">Pembahasan:</span> {question.explanation}
                            </div>
                          )}
                        </div>
                        <Button
                          onClick={() => {
                            setSelectedQuestion(question)
                            setIsDeleteDialogOpen(true)
                          }}
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700 dark:text-red-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}

      {/* Create Question Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Buat Soal Baru</DialogTitle>
            <DialogDescription>
              Tambah soal baru ke platform
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreate}>
            <div className="space-y-4 py-4">
              {error && (
                <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-3 text-sm">
                  <div className="flex items-center gap-2 text-red-700 dark:text-red-300">
                    <AlertCircle className="w-4 h-4" />
                    <span>{error}</span>
                  </div>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tryout">Tryout *</Label>
                  <select
                    id="tryout"
                    value={tryoutId}
                    onChange={(e) => setTryoutId(e.target.value)}
                    className="w-full p-2 border border-green-200 dark:border-green-700 rounded-md"
                    required
                  >
                    <option value="">Pilih tryout</option>
                    {tryouts.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="correctAnswer">Jawaban Benar *</Label>
                  <select
                    id="correctAnswer"
                    value={correctAnswer}
                    onChange={(e) => setCorrectAnswer(e.target.value)}
                    className="w-full p-2 border border-green-200 dark:border-green-700 rounded-md"
                    required
                  >
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="questionText">Pertanyaan *</Label>
                <Textarea
                  id="questionText"
                  placeholder="Tulis pertanyaan di sini..."
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  rows={4}
                  required
                  disabled={loading}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="optionA">Opsi A *</Label>
                  <Input
                    id="optionA"
                    placeholder="Opsi A"
                    value={optionA}
                    onChange={(e) => setOptionA(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="optionB">Opsi B *</Label>
                  <Input
                    id="optionB"
                    placeholder="Opsi B"
                    value={optionB}
                    onChange={(e) => setOptionB(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="optionC">Opsi C *</Label>
                  <Input
                    id="optionC"
                    placeholder="Opsi C"
                    value={optionC}
                    onChange={(e) => setOptionC(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="optionD">Opsi D *</Label>
                  <Input
                    id="optionD"
                    placeholder="Opsi D"
                    value={optionD}
                    onChange={(e) => setOptionD(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="explanation">Pembahasan</Label>
                <Textarea
                  id="explanation"
                  placeholder="Jelaskan mengapa jawaban tersebut benar..."
                  value={explanation}
                  onChange={(e) => setExplanation(e.target.value)}
                  rows={4}
                  disabled={loading}
                />
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
                disabled={loading || !tryoutId || !questionText || !optionA || !optionB || !optionC || !optionD || !correctAnswer}
                className="bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-600"
              >
                {loading ? 'Memproses...' : 'Buat Soal'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus Soal?</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus soal ini?
              <br />
              <span className="text-red-600 dark:text-red-400 font-semibold">
                Tindakan ini tidak dapat dibatalkan!
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
