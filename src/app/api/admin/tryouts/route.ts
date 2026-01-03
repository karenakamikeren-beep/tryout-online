import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const tryouts = await db.tryout.findMany({
      include: {
        category: true,
        _count: {
          select: { questions: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({
      tryouts: tryouts.map(t => ({
        ...t,
        questionsCount: t._count.questions
      })),
      total: tryouts.length,
    })
  } catch (error) {
    console.error('Error fetching tryouts:', error)
    return NextResponse.json(
      { error: 'Gagal memuat tryouts' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, description, duration, passingScore, categoryId, isActive } = body

    if (!title || !duration) {
      return NextResponse.json(
        { error: 'Judul dan durasi wajib diisi' },
        { status: 400 }
      )
    }

    const tryout = await db.tryout.create({
      data: {
        title,
        description: description || null,
        duration: parseInt(String(duration)),
        passingScore: parseInt(String(passingScore || '70')),
        categoryId: categoryId || null,
        isActive: isActive !== undefined ? isActive : true,
      }
    })

    return NextResponse.json({
      message: 'Tryout berhasil dibuat',
      tryout,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error creating tryout:', error)
    return NextResponse.json(
      {
        error: 'Gagal membuat tryout',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { id, title, description, duration, passingScore, categoryId, isActive } = body

    if (!id) {
      return NextResponse.json(
        { error: 'ID Tryout wajib diisi' },
        { status: 400 }
      )
    }

    const tryout = await db.tryout.update({
      where: { id },
      data: {
        title: title !== undefined ? title : undefined,
        description: description !== undefined ? description : undefined,
        duration: duration !== undefined ? parseInt(String(duration)) : undefined,
        passingScore: passingScore !== undefined ? parseInt(String(passingScore)) : undefined,
        categoryId: categoryId !== undefined ? categoryId : undefined,
        isActive: isActive !== undefined ? isActive : undefined,
      }
    })

    return NextResponse.json({
      message: 'Tryout berhasil diperbarui',
      tryout,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error updating tryout:', error)
    return NextResponse.json(
      {
        error: 'Gagal memperbarui tryout',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'ID Tryout wajib diisi' },
        { status: 400 }
      )
    }

    await db.tryout.delete({
      where: { id }
    })

    return NextResponse.json({
      message: 'Tryout berhasil dihapus',
      id,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error deleting tryout:', error)
    return NextResponse.json(
      {
        error: 'Gagal menghapus tryout',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}
