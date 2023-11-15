import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import slugify from "@/services/slugify";
import replaceHtml from "@/services/replaceHtml";
import getImage from "@/services/formatImg";

export async function POST(req: Request) {
    const { json, html, title, serifed, imageURL, imageAlt, imageTitle } = await req.json();
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    const slug = slugify(title);
    const adaptHtml = replaceHtml(html);
    const subtitle = '<p>' + html.match(/<p.*?>(.*?)<\/p>/)[1] + '</p>';
    const image = await getImage(json);

    try {const exists = await prisma.post.findUnique({
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
    // console.log(exists);
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
                imageURL,
                imageAlt,
                imageTitle,
                serifed,
                author: {
                    connect: {
                        id: userId,
                    },
                },
                authorName: session?.user?.name,
            },
        });

        return NextResponse.json({ message: "Salvo com sucesso", success: true, post });
    }} catch (err) {
        return NextResponse.json({ message: err, success: false });
    }
}

export async function PUT(req: Request) {
    const { postId, authorId, json, html, title, published, serifed } = await req.json();
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    const slug = slugify(title);
    const adaptHtml = replaceHtml(html);
    const subtitle = '<p>' + html.match(/<p.*?>(.*?)<\/p>/)[1] + '</p>';

    try {
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
                    published,
                    serifed,
                    updatedAt: new Date(),
                },
            });

            return NextResponse.json({
                message: "atualizado com sucesso",
                success: true,
                post,
            });
        }
    } catch (err) {
        return NextResponse.json({ message: err, success: false });
    }
    
}

export async function DELETE(req: Request) {
    const { postId, authorId } = await req.json();
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    try {
        if (authorId === userId) {
            const post = await prisma.post.delete({
                where: {
                    id: postId,
                }
            });

            return NextResponse.json({
                message: "deletado com sucesso",
                success: true,
                post,
            });
        }
    } catch (err) {
        return NextResponse.json({ message: err, success: false });
    }
    
}

