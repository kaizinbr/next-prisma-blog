// import { getToken } from "next-auth/jwt";
// import { NextRequest, NextResponse } from "next/server";

// export function middleware(request: NextRequest) {
//     return NextResponse.redirect(new URL("/signin", request.url));
// }

// export { default } from "next-auth/middleware";

// export const config = {
//     matcher: [
//         /*
//          * Match all request paths except for the ones starting with:
//          * - api (API routes)
//          * - _next/static (static files)
//          * - _next/image (image optimization files)
//          * - favicon.ico (favicon file)
//          */
//         //    '/((?!signin|_next/static|_next/image|favicon.ico).*)',
//         "/api/auth/signin",
//         "/post/:path*"
//     ],
// };

import { withAuth } from "next-auth/middleware";

// middleware is applied to all routes, use conditionals to select

export default withAuth(
    function middleware(req) {}, {
        callbacks: {
            authorized: ({ req, token }) => {
                if (
                    token
                ) {
                    return true;
                }
                return false;
            },
        },
    });

    export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        //    '/((?!signin|_next/static|_next/image|favicon.ico).*)',
        "/api/auth/signin",
        "/post/:path*",
        "/profile"
    ],
};
