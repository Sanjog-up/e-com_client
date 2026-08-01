// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  if (req.nextUrl.pathname.startsWith('/admin')) {
    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }
    // if you need role checks here too, you'd need to decode the JWT
    // (jwtDecode, not verify — middleware runs on edge runtime)
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};