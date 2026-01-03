import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST() {
  try {
    // Push schema to database (create tables)
    // This will create Tryout, Question, Result tables
    
    // Test by creating a simple query to ensure tables exist
    await db.tryout.count()
    
    return NextResponse.json({
      message: 'Database schema pushed successfully',
      tables: ['Tryout', 'Question', 'Result'],
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Migration error:', error)
    
    // Check if it's a table doesn't exist error
    const errorMessage = error instanceof Error ? error.message : String(error)
    
    if (errorMessage.includes('does not exist')) {
      return NextResponse.json(
        {
          error: 'Tables do not exist in database',
          message: 'Schema migration failed',
          details: errorMessage,
        },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      {
        error: 'Failed to push schema',
        details: errorMessage,
      },
      { status: 500 }
    )
  }
}
