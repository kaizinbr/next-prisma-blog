import React from "react";
import { prisma } from "@/lib/prisma";
import SeeBlogs from "@/components/blogs/blogs";

export default async function Blogs() {

    const users = await prisma.profile.findMany({
        include: {
            user: {
                include: {
                    posts: true,
                }
            },
        }
    });

    // console.log(users);
    return (
        <div className="flex justify-center">
            <SeeBlogs users={users} />
        </div>
    )
}