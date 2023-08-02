import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: "Sign in",
            credentials: {
                username: { label: "Username", type: "name" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const { username, password } = credentials ?? {};
                if (!username || !password) {
                    throw new Error("Missing username or password");
                }
                const user = await prisma.user.findUnique({
                    where: {
                        username,
                    },
                });
                
                if (!user || !(await compare(password, user.password))) {
                    throw new Error("Invalid username or password");
                }
                return {
                    id: user.id,
                    username: user.username,
                    name: user.name,
                    randomKey: "Hey cool",
                };
            },
        }),
    ],
    pages: {    
        signIn: "/signin",
        signOut: "/signout",
        error: "/error", // Error code passed in query string as ?error=
        verifyRequest: "/auth/verify-request", // (used for check email message)
        // newUser: null, // If set, new users will be directed here on first sign in
    },
    callbacks: {
        session: ({ session, token }) => {
            // console.log("Session Callback", { session, token });
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    randomKey: token.randomKey,
                },
            };
        },
        jwt: ({ token, user }) => {
            // console.log("JWT Callback", { token, user });
            if (user) {
                const u = user as unknown as any;
                return {
                    ...token,
                    id: u.id,
                    randomKey: u.randomKey,
                };
            }
            return token;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };