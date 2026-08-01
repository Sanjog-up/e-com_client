// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Role } from './types/enum.types';
import { jwtDecode } from 'jwt-decode';

type TTokenPayload = {
    _id: string;
    email: string;
    role: Role;
    exp: number;
}
export function middleware(req: NextRequest) {
  const token = req.cookies.get('access_token')?.value;
  const { pathname } = req.nextUrl;

  if(pathname.startsWith('/admin')){
    return NextResponse.next();
  }

  if(!token){
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  try{
    const decoded = jwtDecode<TTokenPayload>(token);

    if(decoded.exp * 1000 < Date.now()){
        return NextResponse.redirect(new URL('/auth/login', req.url));
    }
  }catch(err){
    return NextResponse.redirect(new URL('/auth/login', req.url));
}

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};