import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

import { authOptions } from "../../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import slugify from "@/services/slugify";
import replaceHtml from "@/services/replaceHtml";

export async function GET(req: Request) {
    // const { onlyPublisheds } = await req.json();
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    try {
        // if (onlyPublisheds) {
        const post = await (
            await prisma.post.findMany({
                where: {
                    authorId: userId,
                },
            })
        ).sort(
            (a: any, b: any) => b.updatedAt.getTime() - a.updatedAt.getTime()
        );

        return NextResponse.json({
            message: `posts de ${userId}`,
            post,
            success: true,
        });
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
