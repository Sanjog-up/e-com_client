
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Role } from './types/enum.types';
import { jwtDecode } from 'jwt-decode';

type TTokenPayload = {
  _id: string;
  email: string;
  role: Role;
  exp: number;
};

export function middleware(req: NextRequest) {
  const token = req.cookies.get('access_token')?.value;

  // matcher already restricts this to /admin/:path*, so no pathname check needed

  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  try {
    const decoded = jwtDecode<TTokenPayload>(token);

    if (decoded.exp * 1000 < Date.now()) {
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    const allowedRoles = [Role.ADMIN, Role.SUPER_ADMIN];
    if (!allowedRoles.includes(decoded.role)) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  } catch {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};