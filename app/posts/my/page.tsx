import React from "react";
import { prisma } from "@/lib/prisma";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Tabs from "@/components/post/my/Tabs";

export default async function MyPosts() {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    const POSTS = await prisma.post.findMany({
        where: {
            authorId: userId,
        },
    });

    // console.log(typeof POSTS);
    return (
        <div className="flex flex-col items-center gap-6">
            <h1 className="displayExtBold">Meus Posts</h1>
            <div className="flex flex-col items-center gap-6 px-8">
                <Tabs posts={POSTS}/>

                {/* {posts.map((post) => (
                    <div
                        key={post.id}
                        className="bg-white shadow overflow-hidden sm:rounded-lg col-span-3"
                    >
                        <div className="px-4 py-5 sm:px-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                {post.title}
                            </h3>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: post.subtitle!,
                                }}
                            ></div>
                        </div>
                        <div className="px-4 py-4 sm:px-6">
                            <div className="text-sm text-gray-900">
                                Created at {post.createdAt.toString()}
                            </div>
                        </div>
                    </div>
                ))} */}
            </div>
        </div>
    );
}
