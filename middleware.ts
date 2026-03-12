// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const adminToken = request.cookies.get('admin_token')?.value;
  if (!adminToken && url.pathname !== '/admin/login') {
    url.pathname = '/admin/login';
    return NextResponse.redirect(url);
  }
  if (adminToken && url.pathname === '/admin/login') {
    url.pathname = '/admin';
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}
export const config = {
  matcher: ['/admin/:path*'], 
};