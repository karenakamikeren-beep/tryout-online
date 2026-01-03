import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    message: 'Health check API working',
    status: 'ok',
    timestamp: new Date().toISOString(),
  })
}
