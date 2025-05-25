import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // If the user visits the root path, redirect to /home
  if (request.nextUrl.pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/home";
    return NextResponse.redirect(url);
  }

  if (request.nextUrl.pathname === "/our-blog") {
    const userData = request.cookies.get('userData');
    if (!userData) {
      const url = request.nextUrl.clone();
      url.pathname = "/signin";
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

// Optionally, specify which paths to match
export const config = {
  matcher: ["/", "/home", "/our-blog"],
};