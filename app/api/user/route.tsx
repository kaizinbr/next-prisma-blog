import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: NextRequest, res: NextResponse) {
    const body = await req.json();
    try {
        // console.log(req.body, "id");
        await prisma.todo.update({
            where: {
                id: parseInt(body.id),
            },
            data: {
                completed: body.completed,
            },
        });

        // res.json({ message: "Updated" });
        return new NextResponse(JSON.stringify({ message: "Updated" }));
    } catch (error) {
        // 404
        // res.status(404).json({ message: "Not found" });
        console.log(error);
        return new NextResponse(JSON.stringify({ message: error }));
    }
}

export async function POST(req: NextRequest, res: NextResponse) {
    const body = await req.json();
    try {
        await prisma.user.create({
            data: {
                name: body.name,
                username: body.username,
                email: body.email,
                password: body.password,
            },
        });

        // res.json({ message: "Updated" });
        return new NextResponse(JSON.stringify({ message: "User created" }));
    } catch (error: any) {
        if (error.code === "P2002") {
            return new NextResponse("User with email already exists", {
                status: 409,
            });
        }
        return new NextResponse(error.message, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, res: NextResponse) {
    const body = await req.json();
    try {
        console.log(req.body, "id");
        await prisma.user.delete({
            where: {
                id: body.id,
            },
        });

        // res.json({ message: "Updated" });
        return new NextResponse(JSON.stringify({ message: "User deleted" }));
    } catch (error) {
        // 404
        // res.status(404).json({ message: "Not found" });
        console.log(error);
        return new NextResponse(JSON.stringify({ message: error }));
    }
}
