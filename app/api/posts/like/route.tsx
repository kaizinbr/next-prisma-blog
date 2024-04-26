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
    const { postId } = await req.json();
    console.log(postId);
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    const username = session?.user?.username!;
    const name = session?.user?.name;

    try {
        console.log("Salvando post no banco de dados...");
        if (userId && postId) {
            const exists = await prisma.likesByUser.findFirst({
                where: {
                    postId,
                    userId,
                },
            });
            console.log('passou do exists')

            if (exists) {
                console.log('entrou no delete')
                await prisma.likesByUser.delete({
                    where: {
                        id: exists.id,
                    },
                });

                await prisma.post.update({
                    where: {
                        id: postId,
                    },
                    data: {
                        likesCount: {
                            decrement: 1,
                        },
                    },
                });

                return NextResponse.json({
                    message: "Salvo com sucesso",
                    success: true,
                    post: exists,
                    like: false
                });
            } else {
                console.log('entrou no create')
                const post = await prisma.likesByUser.create({
                    data: {
                        postId,
                        userId,
                    },
                });
                console.log(post);

                if (post) {
                    await prisma.post.update({
                        where: {
                            id: postId,
                        },
                        data: {
                            likesCount: {
                                increment: 1,
                            },
                        },
                    });
                }

                return NextResponse.json({
                    message: "Salvo com sucesso",
                    success: true,
                    post,
                    like: true
                });
            }
        }
        // }
    } catch (err) {
        return NextResponse.json({ message: err, success: false });
    }
}

// export async function PUT(req: Request) {
//     const { postId, authorId, json, html, title, published, serifed } =
//         await req.json();
//     const session = await getServerSession(authOptions);
//     const userId = session?.user?.id;
//     const slug = slugify(title);
//     const adaptHtml = replaceHtml(html);
//     const subtitle = "<p>" + html.match(/<p.*?>(.*?)<\/p>/)[1] + "</p>";

//     try {
//         if (authorId === userId) {
//             const post = await prisma.post.update({
//                 where: {
//                     id: postId,
//                 },
//                 data: {
//                     title,
//                     subtitle,
//                     slug,
//                     html: adaptHtml,
//                     json,
//                     published,
//                     serifed,
//                     updatedAt: new Date(),
//                 },
//             });

//             return NextResponse.json({
//                 message: "atualizado com sucesso",
//                 success: true,
//                 post,
//             });
//         }
//     } catch (err) {
//         return NextResponse.json({ message: err, success: false });
//     }
// }

export async function DELETE(req: Request) {
    const { postId, authorId } = await req.json();
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    try {
        if (authorId === userId) {
            const post = await prisma.post.delete({
                where: {
                    id: postId,
                },
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
