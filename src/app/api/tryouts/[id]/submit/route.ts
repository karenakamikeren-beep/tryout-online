import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { auth } from '@/auth'

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await auth()
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Anda harus login untuk menyimpan hasil' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { answers, timeTaken } = body

    if (!answers || !timeTaken) {
      return NextResponse.json(
        { error: 'Jawaban dan waktu wajib diisi' },
        { status: 400 }
      )
    }

    // Get tryout
    const tryout = await db.tryout.findUnique({
      where: { id: params.id }
    })

    if (!tryout) {
      return NextResponse.json(
        { error: 'Tryout tidak ditemukan' },
        { status: 404 }
      )
    }

    // Calculate score
    const questions = await db.question.findMany({
      where: { tryoutId: params.id }
    })

    let correctAnswers = 0
    Object.entries(answers).forEach(([questionId, answer]) => {
      const question = questions.find(q => q.id === questionId)
      if (question && question.correctAnswer === answer) {
        correctAnswers++
      }
    })

    const totalQuestions = questions.length
    const score = (correctAnswers / totalQuestions) * 100
    const passed = score >= tryout.passingScore

    // Create result
    const result = await db.result.create({
      data: {
        tryoutId: params.id,
        userId: session.user.id,
        userName: session.user.name || 'User',
        score: parseFloat(score.toFixed(2)),
        totalQuestions,
        correctAnswers,
        answers: JSON.stringify(answers),
        timeTaken: parseInt(String(timeTaken)),
        passed,
      }
    })

    return NextResponse.json({
      message: 'Hasil berhasil disimpan',
      resultId: result.id,
      score: result.score,
      passed: result.passed,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error submitting:', error)
    return NextResponse.json(
      {
        error: 'Gagal menyimpan hasil',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}
