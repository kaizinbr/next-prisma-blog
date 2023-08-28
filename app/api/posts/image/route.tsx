import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import slugify from "@/services/slugify";
import replaceHtml from "@/services/replaceHtml";

export async function POST(req: Request) {
    const { url, authorId, alt, subtitle } = await req.json();
    // const session = await getServerSession(authOptions);
    // const userId = session?.user?.id;

    try {
        
            const img = await prisma.img.create({
                data: {
                    url,
                    alt,
                    subtitle,
                    author: authorId,
                },
            });

            return NextResponse.json({ message: "Salvo com sucesso", success: true, img });
        
    } catch (err) {
        return NextResponse.json({ message: err, success: false });
    }
}