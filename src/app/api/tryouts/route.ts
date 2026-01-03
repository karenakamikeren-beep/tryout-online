import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const tryouts = await db.tryout.findMany({
      where: {
        isActive: true,
      },
      include: {
        _count: {
          select: {
            questions: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(tryouts)
  } catch (error) {
    console.error('Error fetching tryouts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tryouts' },
      { status: 500 }
    )
  }
}
