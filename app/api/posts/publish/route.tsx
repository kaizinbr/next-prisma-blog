import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import slugify from "@/services/slugify";
import replaceHtml from "@/services/replaceHtml";

export async function PUT(req: Request) {
    const { postId, authorId, published } = await req.json();
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    // if (authorId === userId) {
    //     const post = await prisma.post.update({
    //         where: {
    //             id: postId,
    //         },
    //         data: {
    //             published: published,
    //         },
    //         select: {
    //             id: true,
    //             title: true,
    //             subtitle: true,
    //             published: true,
    //             slug: true,
    //         }
    //     });

    //     return NextResponse.json({ message: `post ${postId} publicado com sucesso!`, post, success: true });
    // } else {
    //     return NextResponse.json({ message: "Ocorreu um erro", success: false });
    // }
    try {
        if (authorId === userId) {
            const post = await prisma.post.update({
                where: {
                    id: `${postId}`,
                },
                data: {
                    published: published,
                },
                select: {
                    id: true,
                    title: true,
                    subtitle: true,
                    published: true,
                    slug: true,
                },
            });

            return NextResponse.json({
                message: `post ${postId} publicado com sucesso!`,
                post,
                success: true,
            });
        }
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: err, success: false });
    }
}

// try {
//     return NextResponse.json({ message: "This Worked", success: true });
// } catch (err) {
//     console.log(err);
//     return NextResponse.json({ message: err, success: false });
// }
