import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

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

    if (!tryout) {
      return NextResponse.json(
        { error: 'Tryout not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(tryout)
  } catch (error) {
    console.error('Error fetching tryout:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tryout' },
      { status: 500 }
    )
  }
}
