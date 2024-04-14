import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import slugify from "@/services/slugify";
import replaceHtml from "@/services/replaceHtml";
import getImage from "@/services/formatImg";

export async function POST(req: Request) {
    const { id } = await req.json();
    console.log(id);
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    try {
        // const exists = false
        // console.log(exists);

        const exists = await prisma.follower.findFirst({
            where: {
                userId: `${userId}`,
                followerId: `${id}`,
            },
        });

        if (exists) {
            return NextResponse.json({
                message:
                    "Parece que já existe um post com esse título, tente outro",
                success: false,
            });
        } else {
            console.log("Salvando post no banco de dados...");
            const follower = await prisma.follower.create({
                data: {
                    userId: `${userId}`,
                    followerId: `${id}`,

                },
            });

            return NextResponse.json({
                message: "Salvo com sucesso",
                success: true,
                follower,
            });
        }
    } catch (err) {
        return NextResponse.json({ message: err, success: false });
    }
}

export async function DELETE(req: Request) {
    const { id } = await req.json();
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    try {
        const IFollow = await prisma.follower.findFirst({
            where: {
                userId: `${userId}`,
                followerId: `${id}`,
            },
        });

        if (IFollow) {
            await prisma.follower.delete({
                where: {
                    id: IFollow.id,
                },
            });

            return NextResponse.json({
                message: "Deletado com sucesso",
                success: true,
                IFollow,
            });
        } else {
            return NextResponse.json({
                message: "Você não segue este usuário",
                success: false,
            });
        }
    } catch (err) {
        return NextResponse.json({ message: err, success: false });
    }

}

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
  console.log(searchParams.get("search"));

    const id = searchParams.get("id")
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    try {
        const IFollow = await prisma.follower.findFirst({
            where: {
                userId: `${userId}`,
                followerId: `${id}`,
            },
        });

        if (IFollow) {
            return NextResponse.json({
                message: "Você já segue este usuário",
                success: true,
                IFollow,
                follow: true
            });
        } else {
            return NextResponse.json({
                message: "Você não segue este usuário",
                success: true,
                IFollow,
                follow: false,
            });
        }
    } catch (err) {
        return NextResponse.json({ message: err, success: false });
    }
}