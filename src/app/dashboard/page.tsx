'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  LayoutDashboard, 
  History, 
  TrendingUp, 
  Clock, 
  Target, 
  ArrowRight,
  LogOut,
  User,
  BookOpen,
} from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 dark:border-green-500"></div>
      </div>
    )
  }

  if (!session?.user) {
    redirect('/auth/login')
  }

  const stats = {
    totalTryouts: 0,
    avgScore: 0,
    highestScore: 0,
    totalHours: 0,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-950 dark:via-emerald-950 dark:to-slate-900">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-green-200 dark:border-green-700">
        <div className="container mx-auto px-4 py-4 max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600 dark:bg-green-500 rounded-lg flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-slate-50">
                Dashboard Peserta
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Selamat datang, {session.user.name}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/history">
              <Button variant="ghost" size="sm">
                <History className="w-4 h-4 mr-2" />
                Riwayat
              </Button>
            </Link>
            <Link href="/auth/signout" className="hidden">
              <Button variant="ghost" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Keluar
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-2 border-green-200 dark:border-green-700 hover:shadow-xl transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-3xl font-bold text-green-600 dark:text-green-400">
                {stats.totalTryouts}
              </CardTitle>
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <BookOpen className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-400">Total Tryout</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-emerald-200 dark:border-emerald-700 hover:shadow-xl transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                {stats.avgScore.toFixed(1)}%
              </CardTitle>
              <div className="p-2 bg-emerald-100 dark:bg-emerald-900 rounded-lg">
                <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-400">Rata-rata Nilai</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-teal-200 dark:border-teal-700 hover:shadow-xl transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-3xl font-bold text-teal-600 dark:text-teal-400">
                {stats.highestScore}%
              </CardTitle>
              <div className="p-2 bg-teal-100 dark:bg-teal-900 rounded-lg">
                <Target className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-400">Nilai Tertinggi</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-yellow-200 dark:border-yellow-700 hover:shadow-xl transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                {stats.totalHours}j
              </CardTitle>
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-400">Total Jam Belajar</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity & Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Recent Results */}
          <Card className="border-2 border-green-200 dark:border-green-700">
            <CardHeader>
              <CardTitle>Riwayat Terbaru</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <History className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                <p className="text-slate-600 dark:text-slate-400 mb-4">Belum ada riwayat tryout</p>
                <Link href="/history">
                  <Button variant="outline" size="sm">
                    Lihat Semua Riwayat
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card className="border-2 border-emerald-200 dark:border-emerald-700">
            <CardHeader>
              <CardTitle>Rekomendasi Tryout</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <BookOpen className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                <p className="text-slate-600 dark:text-slate-400 mb-4">Mulai pengerjaan tryout untuk mendapatkan rekomendasi</p>
                <Link href="/tryouts">
                  <Button className="bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-600">
                    Cari Tryout Baru
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="border-2 border-teal-200 dark:border-teal-700">
          <CardHeader>
            <CardTitle>Aksi Cepat</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/tryouts">
                <Button variant="outline" className="w-full justify-start h-12">
                  <BookOpen className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <div className="font-semibold">Cari Tryout</div>
                    <div className="text-xs text-slate-500">Temukan tryout sesuai kategori</div>
                  </div>
                </Button>
              </Link>
              <Link href="/history">
                <Button variant="outline" className="w-full justify-start h-12">
                  <History className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <div className="font-semibold">Lihat Riwayat</div>
                    <div className="text-xs text-slate-500">Cek jejak pengerjaan Anda</div>
                  </div>
                </Button>
              </Link>
              <Link href="/leaderboard">
                <Button variant="outline" className="w-full justify-start h-12">
                  <TrendingUp className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <div className="font-semibold">Peringkat</div>
                    <div className="text-xs text-slate-500">Bandingkan skor dengan peserta lain</div>
                  </div>
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="w-full justify-start h-12">
                  <User className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <div className="font-semibold">Profil Saya</div>
                    <div className="text-xs text-slate-500">Kelola akun dan pengaturan</div>
                  </div>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="mt-16 border-t border-green-200 dark:border-green-700 py-6 text-center text-sm text-slate-500 dark:text-slate-400">
        <p>© 2025 TryoutOnline. Dashboard Peserta.</p>
      </footer>
    </div>
  )
}
