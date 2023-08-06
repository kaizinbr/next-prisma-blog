import React from "react";
import { prisma } from "@/lib/prisma";

export default async function Posts() {
    const posts = await prisma.post.findMany();

    return (
        <div>
            <h1>Posts</h1>
            <div className="grid grid-cols-3 gap-6 px-8">
                {posts.map((post) => (
                    <div key={post.id} className={`
                        border border-gray-300 rounded-md p-4
                        hover:border-gray-500 hover:shadow-md
                        transition duration-200 ease-in-out
                        col-span-1
                        overflow-hidden
                
                    `}>
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
