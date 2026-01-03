'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { ArrowLeft, Clock, ArrowLeft as ArrowLeftIcon, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'

interface Question {
  id: string
  questionText: string
  optionA: string
  optionB: string
  optionC: string
  optionD: string
}

interface Tryout {
  id: string
  title: string
  duration: number
  passingScore: number
  questions: Question[]
}

export default function TryoutStartPage() {
  const params = useParams()
  const router = useRouter()
  const [tryout, setTryout] = useState<Tryout | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [timeLeft, setTimeLeft] = useState(0)
  const [startTime, setStartTime] = useState<Date | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [showSubmitDialog, setShowSubmitDialog] = useState(false)
  const [showTimeUpDialog, setShowTimeUpDialog] = useState(false)

  useEffect(() => {
    fetchTryout()
  }, [])

  useEffect(() => {
    if (timeLeft > 0 && startTime) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            setShowTimeUpDialog(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [timeLeft, startTime])

  const fetchTryout = async () => {
    try {
      const response = await fetch(`/api/tryouts/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setTryout(data)
        setTimeLeft(data.duration * 60)
        setStartTime(new Date())
      } else {
        toast.error('Gagal memuat data tryout')
      }
    } catch (error) {
      console.error('Error fetching tryout:', error)
      toast.error('Gagal memuat data tryout')
    } finally {
      setLoading(false)
    }
  }

  const handleAnswerChange = (value: string) => {
    if (!tryout) return
    setAnswers({
      ...answers,
      [tryout.questions[currentQuestionIndex].id]: value,
    })
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleNext = () => {
    if (!tryout) return
    if (currentQuestionIndex < tryout.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setShowSubmitDialog(true)
    }
  }

  const handleSubmit = async () => {
    if (!tryout || !startTime) return

    setSubmitting(true)
    setShowSubmitDialog(false)
    setShowTimeUpDialog(false)

    try {
      const timeTaken = Math.floor((Date.now() - startTime.getTime()) / 1000)

      const response = await fetch(`/api/tryouts/${params.id}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: null, // Optional: add user ID if authenticated
          userName: 'Guest', // Optional: add user name if authenticated
          answers,
          timeTaken,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        router.push(`/tryouts/${params.id}/result?resultId=${data.resultId}`)
      } else {
        toast.error('Gagal menyimpan hasil')
        router.push('/')
      }
    } catch (error) {
      console.error('Error submitting:', error)
      toast.error('Gagal menyimpan hasil')
      router.push('/')
    } finally {
      setSubmitting(false)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getProgress = () => {
    if (!tryout) return 0
    return ((currentQuestionIndex + 1) / tryout.questions.length) * 100
  }

  const getAnsweredCount = () => {
    return Object.keys(answers).length
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900 dark:border-slate-50"></div>
          <p className="mt-4 text-slate-600 dark:text-slate-400">Memuat soal...</p>
        </div>
      </div>
    )
  }

  if (!tryout) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="py-12 text-center">
            <AlertCircle className="w-16 h-16 mx-auto text-slate-400 mb-4" />
            <p className="text-slate-600 dark:text-slate-400">
              Tryout tidak ditemukan
            </p>
            <Button onClick={() => router.push('/')} className="mt-4">
              Kembali ke Beranda
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const currentQuestion = tryout.questions[currentQuestionIndex]
  const currentAnswer = answers[currentQuestion.id] || ''

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            onClick={() => router.push(`/tryouts/${params.id}`)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </Button>
          <div className="flex items-center gap-4">
            <Badge variant="outline">
              <CheckCircle className="w-3 h-3 mr-1" />
              {getAnsweredCount()}/{tryout.questions.length}
            </Badge>
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-slate-50 text-slate-50 dark:text-slate-900 rounded-lg">
              <Clock className="w-4 h-4" />
              <span className="font-mono font-bold">{formatTime(timeLeft)}</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <Progress value={getProgress()} className="h-2" />
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 text-center">
            Soal {currentQuestionIndex + 1} dari {tryout.questions.length}
          </p>
        </div>

        {/* Question Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl">
              <Badge className="mb-2" variant="secondary">
                {currentQuestionIndex + 1}
              </Badge>
              <p className="mt-2">{currentQuestion.questionText}</p>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={currentAnswer}
              onValueChange={handleAnswerChange}
            >
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <RadioGroupItem value="A" id="option-a" />
                  <Label htmlFor="option-a" className="flex-1 cursor-pointer">
                    <span className="font-semibold mr-2">A.</span>
                    {currentQuestion.optionA}
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <RadioGroupItem value="B" id="option-b" />
                  <Label htmlFor="option-b" className="flex-1 cursor-pointer">
                    <span className="font-semibold mr-2">B.</span>
                    {currentQuestion.optionB}
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <RadioGroupItem value="C" id="option-c" />
                  <Label htmlFor="option-c" className="flex-1 cursor-pointer">
                    <span className="font-semibold mr-2">C.</span>
                    {currentQuestion.optionC}
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <RadioGroupItem value="D" id="option-d" />
                  <Label htmlFor="option-d" className="flex-1 cursor-pointer">
                    <span className="font-semibold mr-2">D.</span>
                    {currentQuestion.optionD}
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            variant="outline"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Sebelumnya
          </Button>
          {currentQuestionIndex === tryout.questions.length - 1 ? (
            <Button
              onClick={() => setShowSubmitDialog(true)}
              className="bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Selesai & Submit
            </Button>
          ) : (
            <Button onClick={handleNext}>
              Selanjutnya
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>

        {/* Question Navigation */}
        <div className="mt-8">
          <h3 className="text-sm font-semibold mb-3 text-slate-600 dark:text-slate-400">
            Navigasi Soal
          </h3>
          <div className="flex flex-wrap gap-2">
            {tryout.questions.map((_, index) => (
              <Button
                key={index}
                variant={index === currentQuestionIndex ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCurrentQuestionIndex(index)}
                className={
                  answers[tryout.questions[index].id]
                    ? index === currentQuestionIndex
                      ? ''
                      : 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 border-green-300 dark:border-green-700'
                    : ''
                }
              >
                {index + 1}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Submit Confirmation Dialog */}
      <AlertDialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Submit Jawaban?</AlertDialogTitle>
            <AlertDialogDescription>
              Anda telah menjawab {getAnsweredCount()} dari {tryout.questions.length} soal.
              {getAnsweredCount() < tryout.questions.length && (
                <> Ada {tryout.questions.length - getAnsweredCount()} soal yang belum dijawaban.</>
              )}
              <br />
              Apakah Anda yakin ingin mengirim jawaban?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmit} disabled={submitting}>
              {submitting ? 'Mengirim...' : 'Ya, Submit'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Time Up Dialog */}
      <AlertDialog open={showTimeUpDialog} onOpenChange={setShowTimeUpDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Waktu Habis!</AlertDialogTitle>
            <AlertDialogDescription>
              Waktu pengerjaan tryout telah habis. Jawaban Anda akan otomatis disubmit.
              Anda telah menjawab {getAnsweredCount()} dari {tryout.questions.length} soal.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleSubmit} disabled={submitting}>
              {submitting ? 'Mengirim...' : 'Lihat Hasil'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
