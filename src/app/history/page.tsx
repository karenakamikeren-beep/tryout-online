'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, CheckCircle, XCircle, Clock, AlertCircle, RefreshCw } from 'lucide-react'

interface Result {
  id: string
  tryoutId: string
  tryout: {
    id: string
    title: string
    duration: number
    category?: {
      name: string
    }
  }
  score: number
  totalQuestions: number
  correctAnswers: number
  passed: boolean
  timeTaken: number
  completedAt: Date
}

export default function HistoryPage() {
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(true)
  const [results, setResults] = useState<Result[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchHistory()
  }, [])

  const fetchHistory = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/history')
      if (response.ok) {
        const data = await response.json()
        setResults(data.results)
      } else {
        const error = await response.json()
        setError(error.error || 'Gagal memuat riwayat')
      }
    } catch (err) {
      console.error('Error fetching history:', err)
      setError('Gagal memuat riwayat')
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-950 dark:via-emerald-950 dark:to-slate-900 flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 dark:border-green-500"></div>
        <p className="mt-4 text-slate-600 dark:text-slate-400">Memuat riwayat...</p>
      </div>
    )
  }

  if (!session?.user) {
    redirect('/auth/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-950 dark:via-emerald-950 dark:to-slate-900">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-green-200 dark:border-green-700">
        <div className="container mx-auto px-4 py-4 max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={() => window.location.href = '/dashboard'}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Dashboard
            </Button>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
              Riwayat Pengerjaan
            </h1>
          </div>
          <Button onClick={fetchHistory} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {loading ? (
          <div className="flex items-center justify-center min-h-[40vh]">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 dark:border-green-500"></div>
            <p className="mt-4 text-slate-600 dark:text-slate-400">Memuat riwayat...</p>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center min-h-[40vh]">
            <Card className="max-w-md">
              <CardContent className="py-12 text-center">
                <AlertCircle className="w-16 h-16 mx-auto text-red-500 mb-4" />
                <p className="text-slate-600 dark:text-slate-400">{error}</p>
                <Button onClick={fetchHistory} className="mt-4">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Coba Lagi
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : results.length === 0 ? (
          <div className="flex items-center justify-center min-h-[40vh]">
            <Card className="max-w-md">
              <CardContent className="py-12 text-center">
                <Clock className="w-16 h-16 mx-auto text-slate-400 mb-4" />
                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-50">
                  Belum ada Riwayat
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Anda belum mengerjakan tryout manapun.
                </p>
                <Button onClick={() => window.location.href = '/tryouts'} className="bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-600">
                  Mulai Mengerjakan Tryout
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          <>
            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="border-2 border-green-200 dark:border-green-700">
                <CardContent className="pt-6">
                  <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                    {results.length}
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Total Tryout</p>
                </CardContent>
              </Card>
              <Card className="border-2 border-emerald-200 dark:border-emerald-700">
                <CardContent className="pt-6">
                  <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                    {results.length > 0 ? (results.reduce((sum, r) => sum + r.score, 0) / results.length).toFixed(1) : 0}%
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Rata-rata Skor</p>
                </CardContent>
              </Card>
              <Card className="border-2 border-teal-200 dark:border-teal-700">
                <CardContent className="pt-6">
                  <div className="text-4xl font-bold text-teal-600 dark:text-teal-400 mb-2">
                    {results.filter(r => r.passed).length}
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Tryout Lulus</p>
                </CardContent>
              </Card>
            </div>

            {/* Results List */}
            <div className="space-y-4">
              {results.map((result) => (
                <Card key={result.id} className="border-2 border-green-200 dark:border-green-700 hover:shadow-xl transition-all">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">
                            {result.tryout.title}
                          </h3>
                          {result.tryout.category && (
                            <Badge variant="outline" className="text-xs">
                              {result.tryout.category.name}
                            </Badge>
                          )}
                          <Badge variant={result.passed ? 'default' : 'secondary'} className={result.passed ? 'bg-green-600 dark:bg-green-500' : 'bg-red-100 dark:bg-red-900'}>
                            {result.passed ? 'LULUS' : 'TIDAK LULUS'}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                            <span>Benar: {result.correctAnswers}/{result.totalQuestions}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <XCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                            <span>Salah: {result.totalQuestions - result.correctAnswers}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                            <span>Waktu: {Math.floor(result.timeTaken / 60)}m</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                          {result.score}%
                        </div>
                        <Button
                          onClick={() => window.location.href = `/tryouts/${result.tryoutId}/result`}
                          size="sm"
                          variant="outline"
                          className="text-xs"
                        >
                          Lihat Hasil
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
