import React from "react";
import { prisma } from "@/lib/prisma";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Tabs from "@/components/post/my/Tabs";
import getmyPosts from "@/services/usePostInfo";
import Context, { ContextProvider } from "@/services/context";

export default async function Posts() {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    const POSTS = await prisma.post.findMany({
        where: {
            authorId: userId,
        },
    });

    // const test = await getmyPosts();
    // console.log(test);

    return (
        <ContextProvider>
            <div className="flex flex-col items-center gap-6">
                <h1 className="displayExtBold">Meus Posts</h1>
                <div className="flex flex-col items-center gap-6 px-8">
                    <Tabs posts={POSTS} />
                </div>
            </div>
        </ContextProvider>
    );
}
