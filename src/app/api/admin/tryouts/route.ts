import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: Request) {
  console.log('[POST /api/admin/tryouts] Received request')

  try {
    // Check content type
    const contentType = request.headers.get('content-type')
    console.log('[POST /api/admin/tryouts] Content-Type:', contentType)

    if (!contentType?.includes('application/json')) {
      return NextResponse.json(
        { error: 'Content-Type must be application/json' },
        { status: 400 }
      )
    }

    const body = await request.json()
    console.log('[POST /api/admin/tryouts] Request body:', body)

    const {
      title,
      description,
      duration,
      passingScore = 70,
      isActive = true,
    } = body

    if (!title || !duration) {
      console.log('[POST /api/admin/tryouts] Validation failed: missing title or duration')
      return NextResponse.json(
        { error: 'Title and duration are required' },
        { status: 400 }
      )
    }

    console.log('[POST /api/admin/tryouts] Creating tryout...')

    const tryout = await db.tryout.create({
      data: {
        title,
        description: description || null,
        duration: parseInt(String(duration)),
        passingScore: parseInt(String(passingScore)),
        isActive,
      },
    })

    console.log('[POST /api/admin/tryouts] Tryout created:', tryout)

    return NextResponse.json({
      message: 'Tryout created successfully',
      tryout: {
        id: tryout.id,
        title: tryout.title,
        description: tryout.description,
        duration: tryout.duration,
        passingScore: tryout.passingScore,
        isActive: tryout.isActive,
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('[POST /api/admin/tryouts] Error creating tryout:', error)
    console.error('[POST /api/admin/tryouts] Error stack:', error instanceof Error ? error.stack : 'No stack')

    return NextResponse.json(
      {
        error: 'Failed to create tryout',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  console.log('[GET /api/admin/tryouts] Listing all tryouts')

  try {
    const tryouts = await db.tryout.findMany({
      orderBy: { createdAt: 'desc' },
    })

    console.log('[GET /api/admin/tryouts] Found tryouts:', tryouts.length)

    return NextResponse.json({
      tryouts,
      count: tryouts.length,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('[GET /api/admin/tryouts] Error fetching tryouts:', error)

    return NextResponse.json(
      {
        error: 'Failed to fetch tryouts',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}
