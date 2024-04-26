import React from "react";
import { prisma } from "@/lib/prisma";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import EditProfile from "@/components/profile/me/MyProfile";

export default async function Page() {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    console.log(session?.user);

    const ME = await prisma.user.findUnique({
        where: {
            id: userId,
        },

        select: {
            username: true,
            id: true,
            
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true,
            posts: {
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
                    images: true,
                    LikesByUser: {
                        select: {
                            userId: true,
                        },
                    },
                    reposts: {
                        select: {
                            userId: true,
                        },
                    },
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
    console.log(ME);
    const usersArr = USERSLIST.map((user) => user.username);
    console.log(usersArr);
    return (
        <div>
            {/* <div>Perfil de: {params.username}</div> */}
            <EditProfile ME={ME} allUsernames={usersArr} />
        </div>
    );
}
