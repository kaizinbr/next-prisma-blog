import { prisma } from "@/lib/prisma";
import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from "next";
import encryptPass from "@/services/encryptPass";
import containsSpecialChars from "@/services/containsSpecialChars";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { name, username, password } = await req.json();
    console.log(name, username, password);
    const specialChars = containsSpecialChars(username);
    if (specialChars) {
        return NextResponse.json(
            { error: "O nome de usuário não pode contar com caracteres especiais" },
            { status: 403 }
        );
    }
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
                password: await encryptPass(password),
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
