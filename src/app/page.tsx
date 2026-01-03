'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Clock, PlayCircle, Database, CheckCircle, AlertCircle, RefreshCw, CirclePlus } from 'lucide-react'
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
  const [migrating, setMigrating] = useState(false)

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

  const handleMigrate = async () => {
    setMigrating(true)
    try {
      const response = await fetch('/api/migrate', {
        method: 'POST',
      })
      if (response.ok) {
        const data = await response.json()
        toast.success(data.message || 'Database schema berhasil dibuat')
        fetchTryouts()
      } else {
        const error = await response.json()
        toast.error(error.error || 'Gagal membuat database schema')
      }
    } catch (error) {
      console.error('Error migrating:', error)
      toast.error('Gagal membuat database schema')
    } finally {
      setMigrating(false)
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

        {/* Admin Link */}
        <div className="flex justify-center mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.location.href = '/admin/quick-add'}
          >
            <CirclePlus className="w-4 h-4 mr-2" />
            Admin Quick Add
          </Button>
        </div>

        {/* Database Setup Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-8">
          <Button
            onClick={handleMigrate}
            disabled={migrating || loading}
            variant="outline"
            size="lg"
            className="flex items-center justify-center gap-2"
          >
            <Database className="w-4 h-4" />
            {migrating ? 'Sedang migrate...' : 'Buat Database Schema'}
          </Button>
          <Button
            onClick={handleSeed}
            disabled={seeding || loading || tryouts.length === 0}
            variant={tryouts.length > 0 ? 'outline' : 'default'}
            size="lg"
            className="flex items-center justify-center gap-2"
          >
            {tryouts.length > 0 ? (
              <Database className="w-4 h-4" />
            ) : (
              <RefreshCw className="w-4 h-4" />
            )}
            {seeding ? 'Sedang seeding...' : tryouts.length > 0 ? 'Refresh Data' : 'Populate Database'}
          </Button>
        </div>

        {/* Info Card */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-sm">
            <p className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
              📋 Langkah Setup Database (WAJIB dilakukan urut):
            </p>
            <ol className="list-decimal list-inside space-y-1 text-blue-800 dark:text-blue-200">
              <li><strong>Pastikan</strong> DATABASE_URL dan DIRECT_URL sudah diset di Vercel environment variables</li>
              <li>Klik tombol <strong>"Buat Database Schema"</strong> untuk membuat tabel (Tryout, Question, Result)</li>
              <li>Tunggu notifikasi sukses</li>
              <li>Kemudian klik tombol <strong>"Populate Database"</strong> untuk mengisi data sample</li>
            </ol>
            <p className="mt-3 text-xs text-blue-600 dark:text-blue-300">
              💡 DATABASE_URL harus dimulai dengan <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">prisma://</code>
            </p>
          </div>
        </div>

        {/* Tryouts List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900 dark:border-slate-50"></div>
            <p className="mt-4 text-slate-600 dark:text-slate-400">Memuat data...</p>
          </div>
        ) : tryouts.length === 0 ? (
          <div className="max-w-2xl mx-auto space-y-6">
            <Card>
              <CardContent className="py-12 text-center">
                <AlertCircle className="w-16 h-16 mx-auto text-slate-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">Database Belum Siap</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Tabel database belum ada. Silakan ikuti langkah di atas untuk setup database.
                </p>
                <ol className="text-left text-sm text-slate-600 dark:text-slate-400 space-y-2">
                  <li>1. Setup DATABASE_URL di Vercel Environment Variables</li>
                  <li>2. Klik tombol <strong>"Buat Database Schema"</strong></li>
                  <li>3. Tunggu notifikasi sukses</li>
                  <li>4. Kemudian klik tombol <strong>"Populate Database"</strong></li>
                </ol>
              </CardContent>
            </Card>
          </div>
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
