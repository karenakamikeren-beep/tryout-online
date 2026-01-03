import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { searchParams } = new URL(request.url)
    const resultId = searchParams.get('resultId')

    if (!resultId) {
      return NextResponse.json(
        { error: 'Result ID is required' },
        { status: 400 }
      )
    }

    // Get result with tryout details
    const result = await db.result.findUnique({
      where: { id: resultId },
      include: {
        tryout: {
          include: {
            questions: {
              orderBy: {
                createdAt: 'asc',
              },
            },
          },
        },
      },
    })

    if (!result) {
      return NextResponse.json(
        { error: 'Result not found' },
        { status: 404 }
      )
    }

    // Parse user answers
    const userAnswers = JSON.parse(result.answers)

    // Combine questions with user answers and correct answers
    const questionDetails = result.tryout.questions.map((question) => ({
      id: question.id,
      questionText: question.questionText,
      optionA: question.optionA,
      optionB: question.optionB,
      optionC: question.optionC,
      optionD: question.optionD,
      correctAnswer: question.correctAnswer,
      userAnswer: userAnswers[question.id] || 'unanswered',
      isCorrect: userAnswers[question.id] === question.correctAnswer,
    }))

    return NextResponse.json({
      result: {
        id: result.id,
        score: result.score,
        totalQuestions: result.totalQuestions,
        correctAnswers: result.correctAnswers,
        timeTaken: result.timeTaken,
        passed: result.passed,
        completedAt: result.completedAt,
      },
      tryout: {
        id: result.tryout.id,
        title: result.tryout.title,
        description: result.tryout.description,
        passingScore: result.tryout.passingScore,
      },
      questions: questionDetails,
    })
  } catch (error) {
    console.error('Error fetching result:', error)
    return NextResponse.json(
      { error: 'Failed to fetch result' },
      { status: 500 }
    )
  }
}
