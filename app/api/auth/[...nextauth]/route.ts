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

                console.log('pass', password, 'e word', user?.password)

                if (!user || !(await compare(password, user.password))) {
                    throw new Error("Invalid username or password");
                }

                const profile = await prisma.profile.findUnique({
                    where: {
                        userId: user.id,
                    },
                });


                return {
                    id: user.id,
                    username: user.username,
                    name: user.name,
                    image: profile?.image,
                    randomKey: "hey why so serious",
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
                    username: token.username,
                    name: token.name,
                    image: session.user?.image,
                    randomKey: token.randomKey,
                },
            };
        },
        jwt: ({ token, user, trigger, session }) => {
            // console.log("JWT Callback", { token, user });
            if (user) {
                const u = user as unknown as any;
                return {
                    ...token,
                    id: u.id,
                    username: u.username,
                    image: u.image,
                    randomKey: u.randomKey,
                };
            }
            if (trigger === "update" && session?.name) {
                // Note, that `session` can be any arbitrary object, remember to validate it!
                token.name = session.name;
                token.image = session.image;
                token.username = session.username;
            }
            // console.log(token)
            return token;
        },
    },
};

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST}