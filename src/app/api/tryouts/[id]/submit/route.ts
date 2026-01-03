import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const { userId, userName, answers, timeTaken } = body

    // Get tryout with questions and correct answers
    const tryout = await db.tryout.findUnique({
      where: { id },
      include: {
        questions: {
          select: {
            id: true,
            correctAnswer: true,
          },
        },
      },
    })

    if (!tryout) {
      return NextResponse.json({ error: 'Tryout not found' }, { status: 404 })
    }

    // Calculate score
    let correctAnswers = 0
    const answerDetails: Record<string, string> = {}

    tryout.questions.forEach((question) => {
      const userAnswer = answers[question.id]
      answerDetails[question.id] = userAnswer || 'unanswered'
      if (userAnswer === question.correctAnswer) {
        correctAnswers++
      }
    })

    const totalQuestions = tryout.questions.length
    const score = (correctAnswers / totalQuestions) * 100
    const passed = score >= tryout.passingScore

    // Save result
    const result = await db.result.create({
      data: {
        tryoutId: id,
        userId,
        userName,
        score,
        totalQuestions,
        correctAnswers,
        answers: JSON.stringify(answerDetails),
        timeTaken,
        passed,
      },
    })

    return NextResponse.json({
      resultId: result.id,
      score,
      correctAnswers,
      totalQuestions,
      passed,
      passingScore: tryout.passingScore,
    })
  } catch (error) {
    console.error('Error submitting result:', error)
    return NextResponse.json(
      { error: 'Failed to submit result' },
      { status: 500 }
    )
  }
}
