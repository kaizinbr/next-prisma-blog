import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// export default async function middleware(req: NextRequest) {
//   // Get the pathname of the request (e.g. /, /protected)
//   const path = req.nextUrl.pathname;

//   // If it's the root path, just render it
//   if (path === "/") {
//     return NextResponse.next();
//   }

//   const session = await getToken({
//     req,
//     secret: process.env.NEXTAUTH_SECRET,
//   });

//   if (!session && path === "/protected") {
//     return NextResponse.redirect(new URL("/login", req.url));
//   } else if (session && (path === "/login" || path === "/register")) {
//     return NextResponse.redirect(new URL("/protected", req.url));
//   }
//   return NextResponse.next();
// }

export function middleware(request: NextRequest) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }

export { default } from "next-auth/middleware";

export const config = {
    matcher: [/*
    * Match all request paths except for the ones starting with:
    * - api (API routes)
    * - _next/static (static files)
    * - _next/image (image optimization files)
    * - favicon.ico (favicon file)
    */
//    '/((?!signin|_next/static|_next/image|favicon.ico).*)',
    '/api/auth/signin',],
};
