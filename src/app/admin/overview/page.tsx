'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Database, FileText, Users, TrendingUp, Target, RefreshCw, AlertCircle } from 'lucide-react'

export default function AdminOverviewPage() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalTryouts: 0,
    totalQuestions: 0,
    totalUsers: 0,
    totalResults: 0,
  })
  const [error, setError] = useState('')

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/stats')
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      } else {
        const error = await response.json()
        setError(error.error || 'Gagal memuat statistik')
      }
    } catch (err) {
      console.error('Error fetching stats:', err)
      setError('Gagal memuat statistik')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 dark:border-green-500"></div>
        <p className="mt-4 text-slate-600 dark:text-slate-400">Memuat statistik...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="max-w-md">
          <CardContent className="py-12 text-center">
            <AlertCircle className="w-16 h-16 mx-auto text-red-500 mb-4" />
            <p className="text-slate-600 dark:text-slate-400">{error}</p>
            <button
              onClick={fetchStats}
              className="mt-4 bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Coba Lagi
            </button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <button
          onClick={() => window.location.href = '/admin/tryouts/new'}
          className="p-4 bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-600 text-white rounded-lg text-center transition-all hover:shadow-xl"
        >
          <FileText className="w-8 h-8 mx-auto mb-2" />
          <div className="text-sm font-semibold">Tambah Tryout</div>
        </button>
        <button
          onClick={() => window.location.href = '/admin/tryouts'}
          className="p-4 bg-emerald-600 dark:bg-emerald-500 hover:bg-emerald-700 dark:hover:bg-emerald-600 text-white rounded-lg text-center transition-all hover:shadow-xl"
        >
          <ListTodo className="w-8 h-8 mx-auto mb-2" />
          <div className="text-sm font-semibold">Kelola Tryout</div>
        </button>
        <button
          onClick={() => window.location.href = '/admin/questions'}
          className="p-4 bg-teal-600 dark:bg-teal-500 hover:bg-teal-700 dark:hover:bg-teal-600 text-white rounded-lg text-center transition-all hover:shadow-xl"
        >
          <Target className="w-8 h-8 mx-auto mb-2" />
          <div className="text-sm font-semibold">Kelola Soal</div>
        </button>
        <button
          onClick={() => window.location.href = '/admin/dummy-data'}
          className="p-4 bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white rounded-lg text-center transition-all hover:shadow-xl"
        >
          <Database className="w-8 h-8 mx-auto mb-2" />
          <div className="text-sm font-semibold">Generate Data</div>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-2 border-green-200 dark:border-green-700 hover:shadow-xl transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-3xl font-bold text-green-600 dark:text-green-400">
              {stats.totalTryouts}
            </CardTitle>
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
              <FileText className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600 dark:text-slate-400">Total Tryout</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-emerald-200 dark:border-emerald-700 hover:shadow-xl transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
              {stats.totalQuestions}
            </CardTitle>
            <div className="p-3 bg-emerald-100 dark:bg-emerald-900 rounded-full">
              <ListTodo className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600 dark:text-slate-400">Total Soal</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-teal-200 dark:border-teal-700 hover:shadow-xl transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-3xl font-bold text-teal-600 dark:text-teal-400">
              {stats.totalUsers}
            </CardTitle>
            <div className="p-3 bg-teal-100 dark:bg-teal-900 rounded-full">
              <Users className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600 dark:text-slate-400">Total Peserta</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-blue-200 dark:border-blue-700 hover:shadow-xl transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {stats.totalResults}
            </CardTitle>
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
              <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600 dark:text-slate-400">Total Hasil</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity (Placeholder) */}
      <Card className="border-2 border-green-200 dark:border-green-700">
        <CardHeader>
          <CardTitle>Aktivitas Terbaru</CardTitle>
          <CardDescription>
            Transaksi dan aktivitas terbaru di dashboard admin
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-slate-500 dark:text-slate-400 mb-4">Belum ada aktivitas tercatat</p>
            <p className="text-sm text-slate-400 dark:text-slate-500">
              Aktifitas log akan muncul di sini setelah Anda mulai mengelola data
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
