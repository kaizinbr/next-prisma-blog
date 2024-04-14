import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";


export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
  console.log(searchParams.get("search"));

    const id = searchParams.get("id")
    // const session = await getServerSession(authOptions);
    // const userId = session?.user?.id;

    try {
        const Profile = await prisma.profile.findUnique({
            where: {
                userId: id!,
            },
        });

        if (Profile) {
            return NextResponse.json({
                Profile,
            });
        } else {
            return NextResponse.json({
                message: "Você não segue este usuário",
                success: true,
                Profile,
            });
        }
    } catch (err) {
        return NextResponse.json({ message: err, success: false });
    }
}