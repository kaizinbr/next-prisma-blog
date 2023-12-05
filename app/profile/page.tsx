import React from "react";
import { prisma } from "@/lib/prisma";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import Profile from "@/components/profile/me/Profile";

export default async function Page() {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    console.log(session?.user);

    const ME = await prisma.user.findUnique({
        where: {
            username: session?.user.username,
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
                include: {
                    author: {
                        select: {
                            name: true,
                            username: true,
                            Profile: {
                                select: {
                                    image: true,
                                },
                            },
                        },
                    },
                },
                orderBy: {
                    createdAt: "desc",
                },
            },
            Profile: true,
        },
    });

    const USERSLIST = await prisma.user.findMany({
        select: {
            username: true,
        },
    });
    // console.log(USERSLIST);
    const usersArr = USERSLIST.map((user) => user.username);
    console.log(usersArr);
    return (
        <div>
            {/* <div>Perfil de: {params.username}</div> */}
            <Profile data={{ME, usersArr}} allUsernames={usersArr} />
        </div>
    );
}
