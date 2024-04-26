import React from "react";
import { prisma } from "@/lib/prisma";
import SeeBlogs from "@/components/blogs/blogs";
import Image from "next/image"
import { Navbar, MobileMenu } from "@/components/navbar/Nav";
import CreatePostBtn from "@/components/navbar/CreatePostBtn";

export default async function Blogs() {

    // const users = await prisma.profile.findMany({
    //     include: {
    //         user: {
    //             include: {
    //                 posts: true,
    //             }
    //         },
    //     }
    // });

    // console.log(users);
    return (
        <div className={`
            flex flex-col justify-center border border-dashed border-blue-500
            w-full min-h-screen
        `}>
            {/* <SeeBlogs users={users} /> */}
            <h1>CONTEUDO</h1>
            <Image unoptimized src="/static/images/beomgyu.webp" alt="Next.js" width={200} height={200} />
            {/* <MobileMenu /> */}
        </div>
    )
}