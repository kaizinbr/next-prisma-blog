import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { name, username, password } = await req.json();
    const exists = await prisma.user.findUnique({
        where: {
            username,
        },
    });
    if (exists) {
        return NextResponse.json(
            { error: "O nome de usuário não está disponível" },
            { status: 403 }
        );
    } else {
        const user = await prisma.user.create({
            data: {
                name,
                username,
                password: await hash(password, 12),
            },
        });

        const profile = await prisma.profile.create({
            data: {
                name,
                // userId: user?.id,
                pronouns: "he/him",
                bio: "I like cats",
                user: {
                    connect: {
                        id: user.id,
                    },
                },
            },
        });

        return NextResponse.json(user);
    }
}
