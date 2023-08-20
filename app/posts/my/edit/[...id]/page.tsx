import React from "react";
import { prisma } from "@/lib/prisma";
import EditPostForm from "@/components/post/EditPost";

export default async function EditPost({ params }: { params: { id: string } }) {
    

    const postInfo = await prisma.post.findUnique({
        where: {
            id: `${params.id}`,
        },
    });

    console.log(postInfo);
    return (
        <div>
            <h1>Edit Post {params.id}</h1>
            <EditPostForm post={postInfo} />
        </div>
    )
}