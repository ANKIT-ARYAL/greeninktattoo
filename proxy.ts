import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function proxy(request: NextRequest) {
  const token = request.cookies.get('admin_session')?.value;
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin') && pathname !== '/admin') {
    if (!token) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch (err) {
      // If token is invalid, kick back to login
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  // 2. Optional: If a user IS logged in and tries to go to the login page (/admin)
  // Redirect them straight to the dashboard
  if (pathname === '/admin' && token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(token, secret);
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    } catch (err) {
      // Token invalid, let them stay on /admin to log in again
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  // This ensures the middleware runs for all admin routes
  matcher: '/admin/:path*',
};