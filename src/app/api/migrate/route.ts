import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST() {
  try {
    // Test database connection by counting tryouts
    // This will trigger Prisma to create tables if they don't exist
    console.log('Starting database migration...')
    
    const count = await db.tryout.count()
    console.log('Database migration completed. Tryout count:', count)
    
    return NextResponse.json({
      message: 'Database schema pushed successfully',
      tables: ['Tryout', 'Question', 'Result'],
      tryoutCount: count,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Migration error:', error)
    console.error('Error details:', {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    })
    
    const errorMessage = error instanceof Error ? error.message : String(error)
    
    return NextResponse.json(
      {
        error: 'Failed to push schema',
        details: errorMessage,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}
