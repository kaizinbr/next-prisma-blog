import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
    req: NextRequest,
    res: NextResponse
) {
    const body = await req.json();    
    try  {

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
    } 
    
    catch (error){
        // 404
        // res.status(404).json({ message: "Not found" });
        console.log(error);
        return new NextResponse(JSON.stringify({ message: error }));
    }
}

export async function POST(
    req: NextRequest,
    res: NextResponse
) {
    const body = await req.json();    
    try  {

        // console.log(req.body, "id");
        await prisma.todo.create({
            data: {
                title: body.title,
                completed: false,
            },

        });

        // res.json({ message: "Updated" });
        return new NextResponse(JSON.stringify({ message: "Created" }));
    } 
    
    catch (error){
        // 404
        // res.status(404).json({ message: "Not found" });
        console.log(error);
        return new NextResponse(JSON.stringify({ message: error }));
    }
}
