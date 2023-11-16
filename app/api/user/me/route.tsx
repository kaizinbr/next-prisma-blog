import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req: NextRequest, res: NextResponse) {
    const session = await getServerSession(authOptions);
    const id = session?.user?.id;
    // const id = params.id;
    const user = await prisma.user.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            username: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true,
            posts: {
                where: {
                    published: true,
                },
            },
            Profile: true,
        },
    });

    if (!user) {
        return new NextResponse("No user with ID found", { status: 404 });
    }

    return NextResponse.json(user);
}

export async function PUT(req: NextRequest, res: NextResponse) {
    const searchParams = req.nextUrl.searchParams;
    const session = await getServerSession(authOptions);

    const formParams = await req.json();
    const formId = formParams.myId;
    const sessionId = session?.user?.id;
    const paramsId = searchParams.get("id");
    // console.log(formParams)
    // console.log(formId, sessionId, paramsId);
    
    if (formId !== sessionId) {
        return new NextResponse("Unauthorized", { status: 401 });
    }
    else if (formId !== paramsId) {
        return new NextResponse("Unauthorized", { status: 401 });
    }
    else if (sessionId !== paramsId) {
        return new NextResponse("Unauthorized", { status: 401 });
    }
    else {
        const updateUser = await prisma.user.update({
            where: {
                id: sessionId,
            },
            data: {
                name: formParams.formValues.name,
                username: formParams.formValues.username,
                Profile: {
                    update: {
                        name: formParams.formValues.name,
                        bio: formParams.formValues.bio,
                        pronouns: formParams.formValues.pronouns,
                    },
                },
            },
        });
    
        if (!updateUser) {
            return new NextResponse("No user with ID found", { status: 404 });
        }

        return NextResponse.json(updateUser);
    }
    

    // return NextResponse.json(updateUser);
}

export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {
    const id = params.id;
    let json = await request.json();

    const updated_user = await prisma.user.update({
        where: { id },
        data: json,
    });

    if (!updated_user) {
        return new NextResponse("No user with ID found", { status: 404 });
    }

    return NextResponse.json(updated_user);
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    console.log(params);
    try {
        const id = params.id;
        await prisma.user.delete({
            where: { id },
        });

        return new NextResponse(null, { status: 204 });
    } catch (error: any) {
        if (error.code === "P2025") {
            return new NextResponse("No user with ID found", { status: 404 });
        }

        return new NextResponse(error.message, { status: 500 });
    }
}
