import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import slugify from "@/services/slugify";
import replaceHtml from "@/services/replaceHtml";

export async function PUT(req: Request) {
    const { postId, authorId, json, html, title } = await req.json();
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    const slug = slugify(title);
    const adaptHtml = replaceHtml(html);
    const subtitle = "<p>" + html.match(/<p.*?>(.*?)<\/p>/)[1] + "</p>";

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
                    updatedAt: new Date(),
                },
            });

            return NextResponse.json({
                message: "atualizado com sucesso",
                success: true,
            });
        }
    } catch (err) {
        return NextResponse.json({ message: err, success: false });
    }
}

// try {
//     return NextResponse.json({ message: "This Worked", success: true });
// } catch (err) {
//     console.log(err);
//     return NextResponse.json({ message: err, success: false });
// }
