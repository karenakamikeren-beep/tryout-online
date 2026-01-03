import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    message: 'Admin routes are working',
    status: 'ok',
    routes: {
      admin: '/admin',
      quickAdd: '/admin/quick-add',
      createTryout: '/api/admin/tryouts',
      createQuestion: '/api/admin/questions',
    },
    timestamp: new Date().toISOString(),
  })
}
