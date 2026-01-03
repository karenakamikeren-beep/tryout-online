'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Clock, PlayCircle, Database, CheckCircle, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'

interface Tryout {
  id: string
  title: string
  description: string | null
  duration: number
  passingScore: number
  isActive: boolean
  _count: {
    questions: number
  }
}

export default function Home() {
  const [tryouts, setTryouts] = useState<Tryout[]>([])
  const [loading, setLoading] = useState(true)
  const [seeding, setSeeding] = useState(false)

  useEffect(() => {
    fetchTryouts()
  }, [])

  const fetchTryouts = async () => {
    try {
      const response = await fetch('/api/tryouts')
      if (response.ok) {
        const data = await response.json()
        setTryouts(data)
      } else {
        toast.error('Gagal memuat data tryout')
      }
    } catch (error) {
      console.error('Error fetching tryouts:', error)
      toast.error('Gagal memuat data tryout')
    } finally {
      setLoading(false)
    }
  }

  const handleSeed = async () => {
    setSeeding(true)
    try {
      const response = await fetch('/api/seed', {
        method: 'POST',
      })
      if (response.ok) {
        const data = await response.json()
        toast.success(data.message || 'Database berhasil di-seed')
        fetchTryouts()
      } else {
        const error = await response.json()
        toast.error(error.error || 'Gagal seeding database')
      }
    } catch (error) {
      console.error('Error seeding:', error)
      toast.error('Gagal seeding database')
    } finally {
      setSeeding(false)
    }
  }

  const handleStartTryout = (tryoutId: string) => {
    window.location.href = `/tryouts/${tryoutId}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-50 mb-2">
            TryoutOnline
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Platform latihan tryout online dengan sistem penilaian otomatis
          </p>
        </div>

        {/* Seed Button */}
        <div className="flex justify-center mb-8">
          <Button
            onClick={handleSeed}
            disabled={seeding || loading}
            variant={tryouts.length > 0 ? 'outline' : 'default'}
            size="lg"
          >
            <Database className="w-4 h-4 mr-2" />
            {seeding ? 'Sedang seeding...' : tryouts.length > 0 ? 'Refresh Data' : 'Mulai Populate Database'}
          </Button>
        </div>

        {/* Tryouts List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900 dark:border-slate-50"></div>
            <p className="mt-4 text-slate-600 dark:text-slate-400">Memuat data...</p>
          </div>
        ) : tryouts.length === 0 ? (
          <Card className="max-w-md mx-auto">
            <CardContent className="py-12 text-center">
              <AlertCircle className="w-16 h-16 mx-auto text-slate-400 mb-4" />
              <p className="text-slate-600 dark:text-slate-400">
                Belum ada data tryout. Klik tombol di atas untuk memulai.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tryouts.map((tryout) => (
              <Card
                key={tryout.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-xl">{tryout.title}</CardTitle>
                    {tryout.isActive ? (
                      <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Aktif
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Non-Aktif</Badge>
                    )}
                  </div>
                  <CardDescription>{tryout.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>Durasi: {tryout.duration} menit</span>
                    </div>
                    <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                      <PlayCircle className="w-4 h-4 mr-2" />
                      <span>{tryout._count.questions} Soal</span>
                    </div>
                    <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      <span>Passing Score: {tryout.passingScore}%</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => handleStartTryout(tryout.id)}
                    disabled={!tryout.isActive}
                    className="w-full"
                  >
                    <PlayCircle className="w-4 h-4 mr-2" />
                    Mulai Mengerjakan
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-slate-500 dark:text-slate-400">
          <p>© 2024 TryoutOnline. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}
