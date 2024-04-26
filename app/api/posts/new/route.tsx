import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

export async function POST(req: Request) {
    const { content, responseTo, imgId } = await req.json();
    console.log(
        content,
        responseTo,
        imgId,
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaasfd caralho"
    );
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    try {
        console.log("Salvando post no banco de dados...");
        if (imgId) {
            console.log("tem imagem", imgId);
            // olha se é resposta ou nao, sempre com imagem
            if (responseTo != undefined) {
                console.log("respondendo um post com foto...");
                const post = await prisma.post.create({
                    data: {
                        content: content,
                        author: {
                            connect: {
                                id: userId,
                            },
                        },
                        authorName: session?.user?.name,
                        responseTo: {
                            connect: {
                                id: responseTo[0],
                            },
                        },
                        images: {
                            connect: {
                                id: imgId,
                            },
                        },
                    },
                    include: {
                        images: true,
                        reposts: true,
                        author: {
                            include: {
                                Profile: true,
                            },
                        },
                    },
                });
                return NextResponse.json({
                    message: "Salvo com sucesso",
                    success: true,
                    post,
                });
            } else {
                console.log("criando com imagem");
                const post = await prisma.post.create({
                    data: {
                        content: content,
                        author: {
                            connect: {
                                id: userId,
                            },
                        },
                        images: {
                            connect: {
                                id: imgId,
                            },
                        },
                    },
                    include: {
                        images: true,
                        reposts: true,
                        author: {
                            include: {
                                Profile: true,
                            },
                        },
                    },
                });
                return NextResponse.json({
                    message: "Salvo com sucesso",
                    success: true,
                    post,
                });
            }
        } else {
            console.log("não tem imagem");
            if (responseTo) {
                console.log("respondendo um post sem foto...");
                const post = await prisma.post.create({
                    data: {
                        content: content,
                        author: {
                            connect: {
                                id: userId,
                            },
                        },
                        authorName: session?.user?.name,
                        responseTo: {
                            connect: {
                                id: responseTo[0],
                            },
                        },
                    },
                    include: {
                        images: true,
                        reposts: true,
                        author: {
                            include: {
                                Profile: true,
                            },
                        },
                    },
                });
                return NextResponse.json({
                    message: "Salvo com sucesso",
                    success: true,
                    post,
                });
            } else {
                console.log("criando sem imagem");
                const post = await prisma.post.create({
                    data: {
                        content: content,
                        author: {
                            connect: {
                                id: userId,
                            },
                        },
                        authorName: session?.user?.name,
                        images: {
                            
                        },
                    },
                    include: {
                        images: true,
                        reposts: true,
                        author: {
                            include: {
                                Profile: true,
                            },
                        },
                    },
                });
                return NextResponse.json({
                    message: "Salvo com sucesso",
                    success: true,
                    post,
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
