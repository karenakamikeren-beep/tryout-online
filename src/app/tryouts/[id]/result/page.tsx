'use client'

import { useEffect, useState, useRef } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, Download, Award, Clock, CheckCircle, XCircle, SkipForward } from 'lucide-react'

interface Question {
  id: string
  questionText: string
  optionA: string
  optionB: string
  optionC: string
  optionD: string
  correctAnswer: string
  userAnswer: string
  isCorrect: boolean
}

interface Tryout {
  id: string
  title: string
  description: string | null
  passingScore: number
}

interface Result {
  id: string
  score: number
  totalQuestions: number
  correctAnswers: number
  timeTaken: number
  passed: boolean
  completedAt: string
}

export default function TryoutResultPage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const resultId = searchParams.get('resultId')
  const [data, setData] = useState<{
    result: Result
    tryout: Tryout
    questions: Question[]
  } | null>(null)
  const [loading, setLoading] = useState(true)
  const certificateRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchResult()
  }, [])

  const fetchResult = async () => {
    try {
      const response = await fetch(`/api/tryouts/${params.id}/result?resultId=${resultId}`)
      if (response.ok) {
        const data = await response.json()
        setData(data)
      } else {
        console.error('Failed to fetch result')
      }
    } catch (error) {
      console.error('Error fetching result:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins} menit ${secs} detik`
  }

  const downloadCertificate = () => {
    if (!data || !data.result.passed) return

    const certificateElement = certificateRef.current
    if (!certificateElement) return

    // Create a simple text-based certificate download
    const content = `
SERTIFIKAT KELULUSAN

=====================================

TryoutOnline dengan bangga memberikan sertifikat ini kepada:

User yang lulus

Atas kelulusannya dalam:

${data.tryout.title}

Dengan nilai: ${data.result.score.toFixed(0)}%

Tanggal: ${new Date(data.result.completedAt).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })}

=====================================

Sertifikat ini diberikan sebagai bukti kelulusan
dengan mencapai nilai di atas passing score.

TryoutOnline - Platform Latihan Tryout Online
    `.trim()

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `sertifikat-${data.tryout.title.replace(/\s+/g, '-')}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900 dark:border-slate-50"></div>
          <p className="mt-4 text-slate-600 dark:text-slate-400">Memuat hasil...</p>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="py-12 text-center">
            <p className="text-slate-600 dark:text-slate-400">
              Hasil tidak ditemukan
            </p>
            <Button onClick={() => router.push('/')} className="mt-4">
              Kembali ke Beranda
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const { result, tryout, questions } = data

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.push(`/tryouts/${params.id}`)}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Detail Tryout
        </Button>

        {/* Score Card */}
        <Card className={`mb-8 ${result.passed ? 'border-green-500 dark:border-green-400' : 'border-red-500 dark:border-red-400'}`}>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl mb-2">Hasil Tryout</CardTitle>
            <CardDescription className="text-lg">
              {tryout.title}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <div className={`w-32 h-32 rounded-full flex items-center justify-center mb-6 ${
                result.passed
                  ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400'
                  : 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400'
              }`}>
                <div className="text-center">
                  <Award className="w-12 h-12 mx-auto mb-2" />
                  <span className="text-3xl font-bold">{result.score.toFixed(0)}%</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 w-full max-w-2xl mb-6">
                <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Jawaban Benar</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {result.correctAnswers}
                  </p>
                </div>
                <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Jawaban Salah</p>
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                    {result.totalQuestions - result.correctAnswers}
                  </p>
                </div>
                <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Waktu</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                    {formatTime(result.timeTaken)}
                  </p>
                </div>
              </div>

              <Badge
                variant={result.passed ? 'default' : 'destructive'}
                className={`text-lg px-6 py-2 ${
                  result.passed ? 'bg-green-600 hover:bg-green-700' : ''
                }`}
              >
                {result.passed ? (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    LULUS
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 mr-2" />
                    TIDAK LULUS
                  </>
                )}
              </Badge>

              <p className="mt-4 text-slate-600 dark:text-slate-400">
                Passing Score: {tryout.passingScore}%
              </p>

              {result.passed && (
                <Button
                  onClick={downloadCertificate}
                  className="mt-6"
                  size="lg"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Sertifikat
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Certificate (hidden, for download) */}
        <div ref={certificateRef} className="hidden print:block">
          <div className="p-12 border-4 border-slate-900 dark:border-slate-50">
            <div className="text-center">
              <Award className="w-16 h-16 mx-auto mb-4" />
              <h1 className="text-4xl font-bold mb-4">SERTIFIKAT KELULUSAN</h1>
              <Separator className="my-6" />
              <p className="text-xl mb-2">TryoutOnline dengan bangga memberikan sertifikat ini kepada:</p>
              <p className="text-2xl font-bold mb-4">User yang lulus</p>
              <p className="text-xl mb-2">Atas kelulusannya dalam:</p>
              <p className="text-3xl font-bold mb-4">{tryout.title}</p>
              <p className="text-2xl mb-2">Dengan nilai: {result.score.toFixed(0)}%</p>
              <p className="text-xl">Tanggal: {new Date(result.completedAt).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</p>
              <Separator className="my-6" />
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Sertifikat ini diberikan sebagai bukti kelulusan dengan mencapai nilai di atas passing score.
              </p>
              <p className="text-lg font-bold mt-4">TryoutOnline - Platform Latihan Tryout Online</p>
            </div>
          </div>
        </div>

        {/* Question Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Detail Jawaban</CardTitle>
            <CardDescription>
              Review jawaban Anda untuk setiap soal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {questions.map((question, index) => (
                <div key={question.id}>
                  <div className="flex items-start gap-3">
                    <Badge
                      variant={question.isCorrect ? 'default' : 'destructive'}
                      className="mt-1"
                    >
                      {index + 1}
                    </Badge>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        {question.isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                        )}
                        <span className={`font-semibold ${
                          question.isCorrect
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-red-600 dark:text-red-400'
                        }`}>
                          {question.isCorrect ? 'Benar' : 'Salah'}
                        </span>
                      </div>
                      <p className="text-slate-900 dark:text-slate-50 font-medium mb-3">
                        {question.questionText}
                      </p>
                      <div className="grid gap-2 pl-4">
                        <div className={`flex items-center gap-2 text-sm p-2 rounded ${
                          question.userAnswer === 'A'
                            ? question.correctAnswer === 'A'
                              ? 'bg-green-50 dark:bg-green-950 border border-green-300 dark:border-green-700'
                              : 'bg-red-50 dark:bg-red-950 border border-red-300 dark:border-red-700'
                            : 'bg-slate-50 dark:bg-slate-800'
                        }`}>
                          <span className="font-semibold text-slate-600 dark:text-slate-400">A.</span>
                          <span className={question.correctAnswer === 'A' ? 'font-bold' : ''}>
                            {question.optionA}
                          </span>
                          {question.correctAnswer === 'A' && (
                            <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 ml-auto" />
                          )}
                        </div>
                        <div className={`flex items-center gap-2 text-sm p-2 rounded ${
                          question.userAnswer === 'B'
                            ? question.correctAnswer === 'B'
                              ? 'bg-green-50 dark:bg-green-950 border border-green-300 dark:border-green-700'
                              : 'bg-red-50 dark:bg-red-950 border border-red-300 dark:border-red-700'
                            : 'bg-slate-50 dark:bg-slate-800'
                        }`}>
                          <span className="font-semibold text-slate-600 dark:text-slate-400">B.</span>
                          <span className={question.correctAnswer === 'B' ? 'font-bold' : ''}>
                            {question.optionB}
                          </span>
                          {question.correctAnswer === 'B' && (
                            <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 ml-auto" />
                          )}
                        </div>
                        <div className={`flex items-center gap-2 text-sm p-2 rounded ${
                          question.userAnswer === 'C'
                            ? question.correctAnswer === 'C'
                              ? 'bg-green-50 dark:bg-green-950 border border-green-300 dark:border-green-700'
                              : 'bg-red-50 dark:bg-red-950 border border-red-300 dark:border-red-700'
                            : 'bg-slate-50 dark:bg-slate-800'
                        }`}>
                          <span className="font-semibold text-slate-600 dark:text-slate-400">C.</span>
                          <span className={question.correctAnswer === 'C' ? 'font-bold' : ''}>
                            {question.optionC}
                          </span>
                          {question.correctAnswer === 'C' && (
                            <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 ml-auto" />
                          )}
                        </div>
                        <div className={`flex items-center gap-2 text-sm p-2 rounded ${
                          question.userAnswer === 'D'
                            ? question.correctAnswer === 'D'
                              ? 'bg-green-50 dark:bg-green-950 border border-green-300 dark:border-green-700'
                              : 'bg-red-50 dark:bg-red-950 border border-red-300 dark:border-red-700'
                            : 'bg-slate-50 dark:bg-slate-800'
                        }`}>
                          <span className="font-semibold text-slate-600 dark:text-slate-400">D.</span>
                          <span className={question.correctAnswer === 'D' ? 'font-bold' : ''}>
                            {question.optionD}
                          </span>
                          {question.correctAnswer === 'D' && (
                            <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 ml-auto" />
                          )}
                        </div>
                        {question.userAnswer === 'unanswered' && (
                          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 pl-4">
                            <SkipForward className="w-4 h-4" />
                            <span>Soal tidak dijawab</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {index < questions.length - 1 && <Separator className="mt-6" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-slate-500 dark:text-slate-400">
          <p>© 2024 TryoutOnline. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}
