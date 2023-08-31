import React from "react";
import { prisma } from "@/lib/prisma";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Tabs from "@/components/post/my/Tabs";
import getmyPosts from "@/services/usePostInfo";
import Context, { ContextProvider } from "@/services/context";

import Profile from "@/components/profile/user/Profile";

export default async function Page({
    params,
}: {
    params: { username: string };
}) {
    // const session = await getServerSession(authOptions);
    // const userId = session?.user?.id;

    const USER = await prisma.user.findUnique({
        where: {
            username: params.username,
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
                    published: false,
                },
            },
            Profile: true,
        },
    });

    // const test = await getmyPosts();
    // console.log(USER);

    return (
        <div>
            <div>Perfil de: {params.username}</div>
            <Profile userData={USER} />
        </div>
    );
}
