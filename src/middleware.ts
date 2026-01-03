import { NextResponse } from 'next/server'
import { auth } from "@/auth"

export async function middleware(req: NextRequest) {
  const session = await auth()

  // Protect Admin Routes
  if (req.nextUrl.pathname.startsWith('/admin')) {
    if (!session?.user) {
      return NextResponse.redirect(new URL('/auth/login', req.url))
    }
  }

  // Protect User Routes (Dashboard, History, Profile)
  if (req.nextUrl.pathname.startsWith('/dashboard') ||
      req.nextUrl.pathname.startsWith('/history') ||
      req.nextUrl.pathname.startsWith('/profile')) {
    if (!session?.user) {
      return NextResponse.redirect(new URL('/auth/login', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/dashboard/:path*',
    '/history/:path*',
    '/profile/:path*',
  ]
}
