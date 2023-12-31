
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
        "/api/:path*",
        "/post/:path*",
        "/profile"
    ],
};
