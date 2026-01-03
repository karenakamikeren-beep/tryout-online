'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Mail, Lock, AlertCircle } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Email atau password salah')
      } else {
        // Redirect to dashboard
        window.location.href = '/dashboard'
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('Terjadi kesalahan saat login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-950 dark:via-emerald-950 dark:to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-2 border-green-200 dark:border-green-700 shadow-xl">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-green-600 dark:bg-green-500 rounded-lg flex items-center justify-center">
              <Lock className="w-5 h-5 text-white" />
            </div>
            <CardTitle className="text-2xl">Masuk</CardTitle>
          </div>
          <CardDescription>
            Masuk ke akun TryoutOnline Anda untuk mengakses Dashboard dan History
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-3 text-sm">
                <div className="flex items-center gap-2 text-red-700 dark:text-red-300">
                  <AlertCircle className="w-4 h-4" />
                  <span>{error}</span>
                </div>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className="border-green-200 dark:border-green-700 focus:border-green-600 dark:focus:border-green-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                className="border-green-200 dark:border-green-700 focus:border-green-600 dark:focus:border-green-500"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-600 h-12 text-lg"
              disabled={loading}
            >
              {loading ? 'Memproses...' : 'Masuk'}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <Button
              variant="ghost"
              onClick={() => window.location.href = '/'}
              className="text-sm text-slate-600 dark:text-slate-400"
            >
              <ArrowLeft className="w-4 h-4 mr-1 inline" />
              Kembali ke Beranda
            </Button>
          </div>
          <div className="mt-4 pt-4 border-t border-green-200 dark:border-green-700">
            <p className="text-xs text-center text-slate-600 dark:text-slate-400">
              Belum punya akun? <a href="#" className="text-green-600 dark:text-green-500 font-semibold hover:underline">Daftar sekarang</a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
