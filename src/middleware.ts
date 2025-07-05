import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_ROUTES = ['/', '/login', '/register']

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const token = req.cookies.get('refreshToken')?.value

  const isPublic = PUBLIC_ROUTES.includes(pathname)

  if (token) {
    // If logged in, prevent access to login/register pages
    if (pathname === '/login' || pathname === '/register') {
      // Redirect logged-in users to homepage or dashboard
      return NextResponse.redirect(new URL('/dashboard/analytics', req.url))
    }
    // Allow access to all other routes when logged in
    return NextResponse.next()
  } else {
    // If NOT logged in
    if (isPublic) {
      // Allow access to public routes
      return NextResponse.next()
    }
    // Block access to other routes, redirect to login
    return NextResponse.redirect(new URL('/login', req.url))
  }
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|api).*)'], // exclude Next.js internals and API routes
}
