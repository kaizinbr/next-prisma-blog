import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import slugify from "@/services/slugify";
import replaceHtml from "@/services/replaceHtml";

export async function POST(req: Request) {
    const { json, html, title } = await req.json();
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    const slug = slugify(title);
    const adaptHtml = replaceHtml(html);
    const subtitle = '<p>' + html.match(/<p.*?>(.*?)<\/p>/)[1] + '</p>';

    const exists = await prisma.post.findUnique({
        where: {
            slug,
        },
        select: {
            author: {
                select: {
                    id: true,
                },
            },
            authorId: true,
        },
    });
    console.log(exists);
    if (exists) {
        return NextResponse.json({ message: "Parece que já existe um post com esse título, tente outro", success: false });
    } else {
        const post = await prisma.post.create({
            data: {
                title,
                subtitle,
                slug,
                html: adaptHtml,
                json,
                author: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });

        return NextResponse.json({ message: "Salvo com sucesso", success: true, post });
    }
}

export async function PUT(req: Request) {
    const { postId, authorId, json, html, title } = await req.json();
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    const slug = slugify(title);
    const adaptHtml = replaceHtml(html);
    const subtitle = '<p>' + html.match(/<p.*?>(.*?)<\/p>/)[1] + '</p>';

    if (authorId === userId) {
        const post = await prisma.post.update({
            where: {
                id: postId,
            },
            data: {
                title,
                subtitle,
                slug,
                html: adaptHtml,
                json,
            },
        });

        return NextResponse.json({ message: "atualizado com sucesso", success: true });
    } else {    
        return NextResponse.json({ message: "Ocorreu um erro", success: false });
    }
    
}

// try {
//     return NextResponse.json({ message: "This Worked", success: true });
// } catch (err) {
//     console.log(err);
//     return NextResponse.json({ message: err, success: false });
// }
