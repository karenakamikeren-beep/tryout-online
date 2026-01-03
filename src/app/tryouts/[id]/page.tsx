import { notFound } from 'next/navigation'
import { db } from '@/lib/db'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, Clock, PlayCircle, CheckCircle, List } from 'lucide-react'
import Link from 'next/link'

async function getTryout(id: string) {
  const tryout = await db.tryout.findUnique({
    where: {
      id,
    },
    include: {
      questions: {
        orderBy: {
          createdAt: 'asc',
        },
        select: {
          id: true,
          questionText: true,
          optionA: true,
          optionB: true,
          optionC: true,
          optionD: true,
        },
      },
    },
  })

  return tryout
}

export default async function TryoutDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const tryout = await getTryout(id)

  if (!tryout) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Daftar Tryout
          </Button>
        </Link>

        {/* Tryout Info Card */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-start justify-between mb-2">
              <CardTitle className="text-3xl">{tryout.title}</CardTitle>
              {tryout.isActive ? (
                <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Aktif
                </Badge>
              ) : (
                <Badge variant="secondary">Non-Aktif</Badge>
              )}
            </div>
            <CardDescription className="text-base">
              {tryout.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <Clock className="w-5 h-5 mr-3 text-slate-600 dark:text-slate-400" />
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Durasi</p>
                  <p className="font-semibold">{tryout.duration} menit</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <List className="w-5 h-5 mr-3 text-slate-600 dark:text-slate-400" />
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Jumlah Soal</p>
                  <p className="font-semibold">{tryout.questions.length} soal</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <CheckCircle className="w-5 h-5 mr-3 text-slate-600 dark:text-slate-400" />
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Passing Score</p>
                  <p className="font-semibold">{tryout.passingScore}%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Questions Preview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Daftar Soal</CardTitle>
            <CardDescription>
              Preview soal yang akan dikerjakan. Jawaban yang benar tidak ditampilkan.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tryout.questions.map((question, index) => (
                <div key={question.id}>
                  <div className="flex items-start gap-3">
                    <Badge variant="outline" className="mt-1">
                      {index + 1}
                    </Badge>
                    <div className="flex-1">
                      <p className="text-slate-900 dark:text-slate-50 font-medium mb-3">
                        {question.questionText}
                      </p>
                      <div className="grid gap-2 pl-4">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-semibold text-slate-600 dark:text-slate-400">A.</span>
                          <span>{question.optionA}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-semibold text-slate-600 dark:text-slate-400">B.</span>
                          <span>{question.optionB}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-semibold text-slate-600 dark:text-slate-400">C.</span>
                          <span>{question.optionC}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-semibold text-slate-600 dark:text-slate-400">D.</span>
                          <span>{question.optionD}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {index < tryout.questions.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Start Button */}
        <div className="flex justify-center">
          <Button
            size="lg"
            disabled={!tryout.isActive}
            className="text-lg px-12"
            onClick={() => {
              window.location.href = `/tryouts/${tryout.id}/start`
            }}
          >
            <PlayCircle className="w-5 h-5 mr-2" />
            Mulai Mengerjakan
          </Button>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-slate-500 dark:text-slate-400">
          <p>© 2024 TryoutOnline. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}
