'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Database, CheckCircle, AlertCircle, Plus } from 'lucide-react'
import { toast } from 'sonner'

export default function AdminQuickAdd() {
  const [tryoutId, setTryoutId] = useState('')

  const [tryoutTitle, setTryoutTitle] = useState('')
  const [tryoutDescription, setTryoutDescription] = useState('')
  const [tryoutDuration, setTryoutDuration] = useState('30')

  const [questionText, setQuestionText] = useState('')
  const [optionA, setOptionA] = useState('')
  const [optionB, setOptionB] = useState('')
  const [optionC, setOptionC] = useState('')
  const [optionD, setOptionD] = useState('')
  const [correctAnswer, setCorrectAnswer] = useState('A')

  const [addingTryout, setAddingTryout] = useState(false)
  const [addingQuestion, setAddingQuestion] = useState(false)

  const handleAddTryout = async () => {
    if (!tryoutTitle || !tryoutDuration) {
      toast.error('Judul dan durasi wajib diisi')
      return
    }

    setAddingTryout(true)
    try {
      const response = await fetch('/api/admin/tryouts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: tryoutTitle,
          description: tryoutDescription,
          duration: tryoutDuration,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        toast.success('Tryout berhasil ditambah!')
        setTryoutId(data.tryout.id)
        // Reset form
        setTryoutTitle('')
        setTryoutDescription('')
        setTryoutDuration('30')
      } else {
        const error = await response.json()
        toast.error(error.error || 'Gagal menambah tryout')
      }
    } catch (error) {
      console.error('Error adding tryout:', error)
      toast.error('Gagal menambah tryout')
    } finally {
      setAddingTryout(false)
    }
  }

  const handleAddQuestion = async () => {
    if (!tryoutId || !questionText || !optionA || !optionB || !optionC || !optionD) {
      toast.error('Semua field soal wajib diisi')
      return
    }

    setAddingQuestion(true)
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
        }),
      })

      if (response.ok) {
        const data = await response.json()
        toast.success('Soal berhasil ditambah!')
        // Reset question form only
        setQuestionText('')
        setOptionA('')
        setOptionB('')
        setOptionC('')
        setOptionD('')
        setCorrectAnswer('A')
      } else {
        const error = await response.json()
        toast.error(error.error || 'Gagal menambah soal')
      }
    } catch (error) {
      console.error('Error adding question:', error)
      toast.error('Gagal menambah soal')
    } finally {
      setAddingQuestion(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Quick Add</h1>
            <p className="text-slate-600 dark:text-slate-400">
              Menambah tryout dan soal secara cepat
            </p>
          </div>
          <Button variant="outline" onClick={() => window.location.href = '/'}>
            <Database className="w-4 h-4 mr-2" />
            Kembali ke Beranda
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Add Tryout Card */}
          <Card>
            <CardHeader>
              <CardTitle>Tambah Tryout Baru</CardTitle>
              <CardDescription>
                Buat tryout baru untuk menyimpan soal-soal
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="tryout-title">Judul Tryout</Label>
                <Input
                  id="tryout-title"
                  placeholder="Contoh: Matematika Tingkat 1"
                  value={tryoutTitle}
                  onChange={(e) => setTryoutTitle(e.target.value)}
                  disabled={addingTryout}
                />
              </div>
              <div>
                <Label htmlFor="tryout-description">Deskripsi</Label>
                <Textarea
                  id="tryout-description"
                  placeholder="Deskripsi tryout..."
                  value={tryoutDescription}
                  onChange={(e) => setTryoutDescription(e.target.value)}
                  rows={3}
                  disabled={addingTryout}
                />
              </div>
              <div>
                <Label htmlFor="tryout-duration">Durasi (menit)</Label>
                <Input
                  id="tryout-duration"
                  type="number"
                  placeholder="30"
                  value={tryoutDuration}
                  onChange={(e) => setTryoutDuration(e.target.value)}
                  disabled={addingTryout}
                />
              </div>
              {tryoutId && (
                <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-3 text-sm">
                  <div className="flex items-center gap-2 text-green-800 dark:text-green-200">
                    <CheckCircle className="w-4 h-4" />
                    <span>
                      <strong>Tryout ID:</strong> {tryoutId}
                    </span>
                  </div>
                  <p className="text-xs mt-1 text-green-600 dark:text-green-300">
                    Sekarang Anda bisa menambah soal ke tryout ini
                  </p>
                </div>
              )}
              <Button
                onClick={handleAddTryout}
                disabled={addingTryout || addingQuestion || !tryoutTitle || !tryoutDuration}
                className="w-full"
              >
                {addingTryout ? 'Menambahkan...' : 'Tambah Tryout'}
              </Button>
            </CardContent>
          </Card>

          {/* Add Question Card */}
          <Card>
            <CardHeader>
              <CardTitle>Tambah Soal Baru</CardTitle>
              <CardDescription>
                Tambah soal ke tryout yang sudah ada
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!tryoutId ? (
                <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 text-sm">
                  <div className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
                    <AlertCircle className="w-4 h-4" />
                    <span>
                      <strong>Belum ada tryout!</strong>
                    </span>
                  </div>
                  <p className="text-xs mt-1 text-yellow-600 dark:text-yellow-300">
                    Silakan tambah tryout baru dulu
                  </p>
                </div>
              ) : (
                <>
                  <div>
                    <Label htmlFor="question-text">Pertanyaan</Label>
                    <Textarea
                      id="question-text"
                      placeholder="Berapa hasil dari 2 + 2?"
                      value={questionText}
                      onChange={(e) => setQuestionText(e.target.value)}
                      rows={3}
                      disabled={addingQuestion || !tryoutId}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="option-a">Opsi A</Label>
                      <Input
                        id="option-a"
                        placeholder="Opsi A"
                        value={optionA}
                        onChange={(e) => setOptionA(e.target.value)}
                        disabled={addingQuestion || !tryoutId}
                      />
                    </div>
                    <div>
                      <Label htmlFor="option-b">Opsi B</Label>
                      <Input
                        id="option-b"
                        placeholder="Opsi B"
                        value={optionB}
                        onChange={(e) => setOptionB(e.target.value)}
                        disabled={addingQuestion || !tryoutId}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="option-c">Opsi C</Label>
                      <Input
                        id="option-c"
                        placeholder="Opsi C"
                        value={optionC}
                        onChange={(e) => setOptionC(e.target.value)}
                        disabled={addingQuestion || !tryoutId}
                      />
                    </div>
                    <div>
                      <Label htmlFor="option-d">Opsi D</Label>
                      <Input
                        id="option-d"
                        placeholder="Opsi D"
                        value={optionD}
                        onChange={(e) => setOptionD(e.target.value)}
                        disabled={addingQuestion || !tryoutId}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="correct-answer">Jawaban Benar</Label>
                    <select
                      id="correct-answer"
                      value={correctAnswer}
                      onChange={(e) => setCorrectAnswer(e.target.value)}
                      disabled={addingQuestion || !tryoutId}
                      className="w-full p-2 border rounded-md bg-slate-50 dark:bg-slate-800"
                    >
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                    </select>
                  </div>
                  <Button
                    onClick={handleAddQuestion}
                    disabled={addingQuestion || addingTryout || !tryoutId || !questionText || !optionA || !optionB || !optionC || !optionD}
                    className="w-full"
                  >
                    {addingQuestion ? 'Menambahkan...' : 'Tambah Soal'}
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
          <p>© 2024 TryoutOnline. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}
