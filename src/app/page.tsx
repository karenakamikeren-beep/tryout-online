'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  GraduationCap,
  Clock,
  CheckCircle,
  Award,
  BookOpen,
  Users,
  Star,
  Shield,
  Zap,
  TrendingUp,
  ArrowRight,
  Play,
  Megaphone,
} from 'lucide-react'

export default function Home() {
  const [activeTab, setActiveTab] = useState<'tryout' | 'cpns' | 'utbk' | 'skb'>('tryout')

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-950 dark:via-emerald-950 dark:to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-16 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 dark:bg-green-500 text-white rounded-full text-sm font-semibold">
                <Star className="w-4 h-4 fill-yellow-300" />
                Platform #1 di Indonesia
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-slate-50 leading-tight">
                TryoutOnline
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                Latihan Soal Ujian dengan Sistem CAT Asli
                <br className="hidden md:block" />
                Tingkatkan Peluang Lolos CPNS & UTBK Hingga 3x Lipat
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-600 text-white text-lg px-8 h-14 transition-all hover:shadow-xl"
                  onClick={() => window.location.href = '/tryouts'}
                >
                  <Play className="w-5 h-5 mr-2" />
                  Mulai Latihan Gratis
                </Button>
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <Users className="w-4 h-4" />
                  <span>Ribuan user telah berhasil lolos ujian</span>
                </div>
              </div>
              <div className="pt-6 space-y-4">
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400 transition-all hover:text-green-700 dark:hover:text-green-500">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <span className="font-semibold">Tampilan & Sistem Pengerjaan CAT yang Sama dengan Aslinya</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400 transition-all hover:text-green-700 dark:hover:text-green-500">
                  <Zap className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <span className="font-semibold">Analisis Hasil & Pembahasan Lengkap Otomatis</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400 transition-all hover:text-green-700 dark:hover:text-green-500">
                  <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <span className="font-semibold">Bank Soal Ribuan yang Terupdate & Berkualitas</span>
                </div>
              </div>
            </div>
            <div className="hidden md:block relative">
              <div className="relative bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl p-8 text-white">
                <div className="absolute -top-4 -right-4 bg-white text-green-600 dark:text-green-500 px-4 py-2 rounded-full font-bold text-sm">
                  GRATIS
                </div>
                <div className="text-4xl font-bold mb-6">15.000+</div>
                <div className="text-xl mb-8">Soal Berkualitas</div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5" />
                    <span>Tersedia untuk CPNS, UTBK, SKB</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5" />
                    <span>Timer Akurat & Anti-Soal</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-5 h-5" />
                    <span>Tingkatkan Nilai & Peringkat</span>
                  </div>
                </div>
                <Button
                  variant="secondary"
                  className="w-full bg-white text-green-600 hover:bg-green-50 h-14 text-lg transition-all hover:shadow-xl"
                  onClick={() => window.location.href = '/tryouts'}
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Lihat Semua Tryout
                </Button>
              </div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-emerald-400 dark:bg-emerald-600 rounded-full opacity-50 blur-2xl" />
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-green-400 dark:bg-green-600 rounded-full opacity-50 blur-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-4">
              Apa Kata Peserta?
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Ribuan pengguna telah berhasil lolos ujian berkat latihan di TryoutOnline
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-2 border-green-200 dark:border-green-700 hover:border-green-400 dark:hover:border-green-500 transition-all hover:shadow-xl">
              <CardContent className="pt-8 pb-8">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                    <GraduationCap className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <p className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-2">
                    A U D 1945
                  </p>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    "Analisis hasil yang detail sangat membantu saya untuk fokus pada topik yang masih lemah. Skor saya terus meningkat setiap tryout yang saya kerjakan di TryoutOnline."
                  </p>
                  <div className="flex items-center justify-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 dark:fill-yellow-500 transition-all duration-500" />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-2 border-green-200 dark:border-green-700 hover:border-green-400 dark:hover:border-green-500 transition-all hover:shadow-xl">
              <CardContent className="pt-8 pb-8">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <p className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-2">
                    Andi Setiawan
                  </p>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    "Tampilan dan sistem pengerjaan yang sangat mirip dengan ujian CAT asli sangat membantu mengurangi rasa cemas saya saat ujian. Saya jadi lebih percaya diri dan siap."
                  </p>
                  <div className="flex items-center justify-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 dark:fill-yellow-500 transition-all duration-500" />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-2 border-green-200 dark:border-green-700 hover:border-green-400 dark:hover:border-green-500 transition-all hover:shadow-xl">
              <CardContent className="pt-8 pb-8">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center mb-4">
                    <Award className="w-8 h-8 text-teal-600 dark:text-teal-400" />
                  </div>
                  <p className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-2">
                    Budi Raharjo
                  </p>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    "Platform yang sangat user-friendly dengan harga yang terjangkau. Soal-soalnya berkualitas dan sesuai dengan materi ujian yang sebenarnya."
                  </p>
                  <div className="flex items-center justify-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 dark:fill-yellow-500 transition-all duration-500" />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-green-50 to-white dark:from-green-950 dark:to-slate-800">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-4">
              Fitur Unggulan
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Dapatkan pengalaman latihan ujian CAT yang realistis
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group">
              <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border-2 border-green-200 dark:border-green-700 hover:border-green-400 dark:hover:border-green-500 transition-all hover:shadow-xl">
                <div className="w-14 h-14 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-200 dark:group-hover:bg-green-800 transition-colors">
                  <Clock className="w-7 h-7 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">
                  Timer Akurat
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Fitur hitung mundur otomatis yang akurat untuk melatih manajemen waktu Anda, persis seperti ujian CAT asli.
                </p>
              </div>
            </div>
            <div className="group">
              <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border-2 border-green-200 dark:border-green-700 hover:border-green-400 dark:hover:border-green-500 transition-all hover:shadow-xl">
                <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-800 transition-colors">
                  <Zap className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">
                  Anti-Soal
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Algoritma pengacakan soal secara cerdas untuk menghindari kecurangan dan menjamin kejujuran ujian.
                </p>
              </div>
            </div>
            <div className="group">
              <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border-2 border-green-200 dark:border-green-700 hover:border-green-400 dark:hover:border-green-500 transition-all hover:shadow-xl">
                <div className="w-14 h-14 bg-teal-100 dark:bg-teal-900 rounded-xl flex items-center justify-center mb-6 group-hover:bg-teal-200 dark:group-hover:bg-teal-800 transition-colors">
                  <Shield className="w-7 h-7 text-teal-600 dark:text-teal-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">
                  Sertifikat Resmi
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Dapatkan sertifikat resmi sebagai bukti kelulusan tryout jika mencapai passing score (>=70%).
                </p>
              </div>
            </div>
            <div className="group">
              <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border-2 border-green-200 dark:border-green-700 hover:border-green-400 dark:hover:border-green-500 transition-all hover:shadow-xl">
                <div className="w-14 h-14 bg-yellow-100 dark:bg-yellow-900 rounded-xl flex items-center justify-center mb-6 group-hover:bg-yellow-200 dark:group-hover:bg-yellow-800 transition-colors">
                  <TrendingUp className="w-7 h-7 text-yellow-600 dark:text-yellow-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">
                  Peringkat Nasional
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Bandingkan skor Anda dengan ribuan peserta lain di seluruh Indonesia untuk melihat posisi Anda.
                </p>
              </div>
            </div>
            <div className="group">
              <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border-2 border-green-200 dark:border-green-700 hover:border-green-400 dark:hover:border-green-500 transition-all hover:shadow-xl">
                <div className="w-14 h-14 bg-lime-100 dark:bg-lime-900 rounded-xl flex items-center justify-center mb-6 group-hover:bg-lime-200 dark:group-hover:bg-lime-800 transition-colors">
                  <BookOpen className="w-7 h-7 text-lime-600 dark:text-lime-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">
                  Analisis Hasil
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Dapatkan skor detail, pembahasan, dan analisis performa per kategori soal untuk fokus pada kelemahan Anda.
                </p>
              </div>
            </div>
            <div className="group">
              <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border-2 border-green-200 dark:border-green-700 hover:border-green-400 dark:hover:border-green-500 transition-all hover:shadow-xl">
                <div className="w-14 h-14 bg-orange-100 dark:bg-orange-900 rounded-xl flex items-center justify-center mb-6 group-hover:bg-orange-200 dark:group-hover:bg-orange-800 transition-colors">
                  <Users className="w-7 h-7 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">
                  Simulasi CAT Asli
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Tampilan dan sistem pengerjaan yang sama persis dengan ujian CAT sebenarnya untuk menyiapkan mental Anda.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories & Tryouts Section */}
      <section className="py-20 bg-white dark:bg-slate-800">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-4">
              Pilih Jenis Tryout
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
              Temukan tryout yang sesuai dengan kebutuhan persiapan ujian Anda
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={() => setActiveTab('tryout')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'tryout'
                  ? 'bg-green-600 dark:bg-green-500 text-white shadow-lg hover:bg-green-700 dark:hover:bg-green-600'
                  : 'bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-700'
              }`}
            >
              Semua Tryout
            </button>
            <button
              onClick={() => setActiveTab('cpns')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'cpns'
                  ? 'bg-orange-600 dark:bg-orange-500 text-white shadow-lg hover:bg-orange-700 dark:hover:bg-orange-600'
                  : 'bg-orange-100 dark:bg-orange-800 text-orange-700 dark:text-orange-300 hover:bg-orange-200 dark:hover:bg-orange-700'
              }`}
            >
              CPNS
            </button>
            <button
              onClick={() => setActiveTab('utbk')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'utbk'
                  ? 'bg-emerald-600 dark:bg-emerald-500 text-white shadow-lg hover:bg-emerald-700 dark:hover:bg-emerald-600'
                  : 'bg-emerald-100 dark:bg-emerald-800 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-700'
              }`}
            >
              UTBK
            </button>
            <button
              onClick={() => setActiveTab('skb')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'skb'
                  ? 'bg-teal-600 dark:bg-teal-500 text-white shadow-lg hover:bg-teal-700 dark:hover:bg-teal-600'
                  : 'bg-teal-100 dark:bg-teal-800 text-teal-700 dark:text-teal-300 hover:bg-teal-200 dark:hover:bg-teal-700'
              }`}
            >
              SKB
            </button>
          </div>

          {/* Tryout Cards - Sample */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Tryout 1 */}
            <Card className="border-2 border-green-200 dark:border-green-700 hover:border-green-400 dark:hover:border-green-500 transition-all hover:shadow-xl">
              <CardContent className="pt-8 pb-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50">
                        Latihan CPNS Gratis
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Pelajari Lebih Lanjut
                      </p>
                    </div>
                  </div>
                  <div className="px-4 py-2 bg-green-100 dark:bg-green-900 rounded-lg">
                    <span className="text-sm font-semibold text-green-700 dark:text-green-300">
                      GRATIS
                    </span>
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  Latihan Seleksi Kompetensi Dasar CPNS 2025 sesuai standar BKN dengan ribuan soal berkualitas.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                    <Clock className="w-5 h-5" />
                    <span>110 Soal</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                    <BookOpen className="w-5 h-5" />
                    <span>100 Menit</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                    <Users className="w-5 h-5" />
                    <span>10K+ Peserta Aktif</span>
                  </div>
                </div>
                <Button
                  className="w-full bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-600 transition-all"
                  size="lg"
                  onClick={() => window.location.href = '/tryouts'}
                >
                  <Play className="w-5 h-5 mr-2" />
                  Mulai Latihan
                </Button>
              </CardContent>
            </Card>

            {/* Tryout 2 */}
            <Card className="border-2 border-green-200 dark:border-green-700 hover:border-green-400 dark:hover:border-green-500 transition-all hover:shadow-xl">
              <CardContent className="pt-8 pb-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center">
                      <Award className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50">
                        Tryout SKD CPNS 2025
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Premium
                      </p>
                    </div>
                  </div>
                  <div className="px-4 py-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                    <span className="text-sm font-semibold text-orange-700 dark:text-orange-300">
                      POPULER
                    </span>
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  Persiapan Ujian Tulis Berbasis Komputer Seleksi Nasional Bersama dengan tryout yang sesuai standar terbaru.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                    <Clock className="w-5 h-5" />
                    <span>180 Soal</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                    <BookOpen className="w-5 h-5" />
                    <span>195 Menit</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                    <Users className="w-5 h-5" />
                    <span>50K+ Peserta Aktif</span>
                  </div>
                </div>
                <div className="mb-6">
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mb-2">
                    <Star className="w-4 h-4 fill-yellow-400 dark:fill-yellow-500 transition-all duration-500" />
                    <span>4.8/5.0 Rating</span>
                  </div>
                  <p className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-3">
                    Rp 49.000
                  </p>
                </div>
                <Button
                  className="w-full bg-emerald-600 dark:bg-emerald-500 hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-all"
                  size="lg"
                  onClick={() => window.location.href = '/tryouts'}
                >
                  <Play className="w-5 h-5 mr-2" />
                  Mulai Tryout
                </Button>
              </CardContent>
            </Card>

            {/* Tryout 3 */}
            <Card className="border-2 border-green-200 dark:border-green-700 hover:border-green-400 dark:hover:border-green-500 transition-all hover:shadow-xl">
              <CardContent className="pt-8 pb-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50">
                        Tryout UTBK SNBT 2025
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Premium
                      </p>
                    </div>
                  </div>
                  <div className="px-4 py-2 bg-green-100 dark:bg-green-900 rounded-lg">
                    <span className="text-sm font-semibold text-green-700 dark:text-green-300">
                      LEBIH LENGKAP
                    </span>
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  Persiapan Ujian Tulis Berbasis Komputer Seleksi Nasional Bersama dengan fitur modern dan analisis lengkap.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                    <Clock className="w-5 h-5" />
                    <span>180 Soal</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                    <BookOpen className="w-5 h-5" />
                    <span>195 Menit</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                    <Users className="w-5 h-5" />
                    <span>75K+ Peserta Aktif</span>
                  </div>
                </div>
                <div className="mb-6">
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mb-2">
                    <Star className="w-4 h-4 fill-yellow-400 dark:fill-yellow-500 transition-all duration-500" />
                    <span>4.9/5.0 Rating</span>
                  </div>
                  <p className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-3">
                    Rp 79.000
                  </p>
                </div>
                <Button
                  className="w-full bg-teal-600 dark:bg-teal-500 hover:bg-teal-700 dark:hover:bg-teal-600 transition-all"
                  size="lg"
                  onClick={() => window.location.href = '/tryouts'}
                >
                  <Play className="w-5 h-5 mr-2" />
                  Mulai Tryout
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-b from-green-100 to-white dark:from-green-950 dark:to-slate-900">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-4">
              Kenapa Memilih Kami?
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white dark:bg-slate-800 rounded-2xl border-2 border-green-200 dark:border-green-700 transition-all hover:shadow-xl">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <div className="text-4xl font-bold text-slate-900 dark:text-slate-50 mb-2">
                50K+
              </div>
              <p className="text-slate-600 dark:text-slate-300">
                Peserta Aktif
              </p>
            </div>
            <div className="text-center p-8 bg-white dark:bg-slate-800 rounded-2xl border-2 border-green-200 dark:border-green-700 transition-all hover:shadow-xl">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="text-4xl font-bold text-slate-900 dark:text-slate-50 mb-2">
                15,000+
              </div>
              <p className="text-slate-600 dark:text-slate-300">
                Soal Berkualitas
              </p>
            </div>
            <div className="text-center p-8 bg-white dark:bg-slate-800 rounded-2xl border-2 border-green-200 dark:border-green-700 transition-all hover:shadow-xl">
              <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-teal-600 dark:text-teal-400" />
              </div>
              <div className="text-4xl font-bold text-slate-900 dark:text-slate-50 mb-2">
                95%+
              </div>
              <p className="text-slate-600 dark:text-slate-300">
                Tingkat Kelulusan
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600 dark:bg-green-500">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Siap Sukses Ujian Anda?
          </h2>
          <p className="text-xl text-green-100 dark:text-green-200 mb-8">
            Bergabung dengan ribuan peserta yang telah berhasil lulus ujian berkat latihan rutin di TryoutOnline
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-green-600 hover:bg-green-50 h-14 text-lg px-8 transition-all hover:shadow-xl"
              onClick={() => window.location.href = '/tryouts'}
            >
              <Play className="w-5 h-5 mr-2" />
              Mulai Latihan Gratis
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-white py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-lg font-bold mb-4">Produk</h3>
              <ul className="space-y-2 text-sm text-slate-300 dark:text-slate-400">
                <li><a href="#" className="hover:text-green-400 dark:hover:text-green-500 transition-colors">Tryout CPNS</a></li>
                <li><a href="#" className="hover:text-green-400 dark:hover:text-green-500 transition-colors">Tryout UTBK</a></li>
                <li><a href="#" className="hover:text-green-400 dark:hover:text-green-500 transition-colors">Tryout SKB</a></li>
                <li><a href="#" className="hover:text-green-400 dark:hover:text-green-500 transition-colors">Paket Lengkap</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Bantuan</h3>
              <ul className="space-y-2 text-sm text-slate-300 dark:text-slate-400">
                <li><a href="#" className="hover:text-green-400 dark:hover:text-green-500 transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-green-400 dark:hover:text-green-500 transition-colors">Panduan</a></li>
                <li><a href="#" className="hover:text-green-400 dark:hover:text-green-500 transition-colors">Kontak</a></li>
                <li><a href="#" className="hover:text-green-400 dark:hover:text-green-500 transition-colors">Syarat & Ketentuan</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Perusahaan</h3>
              <ul className="space-y-2 text-sm text-slate-300 dark:text-slate-400">
                <li><a href="#" className="hover:text-green-400 dark:hover:text-green-500 transition-colors">Tentang Kami</a></li>
                <li><a href="#" className="hover:text-green-400 dark:hover:text-green-500 transition-colors">Karir</a></li>
                <li><a href="#" className="hover:text-green-400 dark:hover:text-green-500 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-green-400 dark:hover:text-green-500 transition-colors">Partner</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Hubungi Kami</h3>
              <p className="text-sm text-slate-300 dark:text-slate-400 mb-2">
                support@tryoutonline.com
              </p>
              <p className="text-sm text-slate-300 dark:text-slate-400">
                WhatsApp: +62 812 3456
              </p>
              <p className="text-sm text-slate-300 dark:text-slate-400 mb-4">
                Jakarta, Indonesia
              </p>
              <div className="flex gap-3">
                <a href="#" className="inline-flex items-center justify-center w-10 h-10 bg-green-600 dark:bg-green-500 rounded-full transition-all hover:bg-green-700 dark:hover:bg-green-600">
                  <Megaphone className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-700 dark:border-slate-800 pt-8 text-center">
            <p className="text-sm text-slate-400 dark:text-slate-500">
              © 2025 TryoutOnline. All rights reserved. Platform latihan ujian online terpercaya di Indonesia.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
