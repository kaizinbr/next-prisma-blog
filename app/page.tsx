import React from "react";
import { prisma } from "@/lib/prisma";
import User from "@/components/User";

import { TodoComponent, TodoCreate } from "@/components/Todo";
import UserCreate from "@/components/UserCreate";
import { LoginButton, LogoutButton } from "@/components/auth";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { ClientUser } from "./clientUser";
import Link from "next/link";
import { PageWrapper } from "@/components/config/pageWrapper";

import Posts from "@/components/profile/general/Posts";

import styles from "../fonts/Fonts.module.css";

export default async function Home() {
    const users = await prisma.user.findMany();
    const todos = await prisma.todo.findMany();
    const session = await getServerSession(authOptions);
    // console.log("session", session);

    const POSTS = await prisma.post.findMany({
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
    });
    // console.log(POSTS.author.Profile.image);

    return (
        <div className="bg-gray-200">
            <div className="p-4 max-md:p-0 ">
                <div className="grid grid-cols-12 gap-8 overflow-hidden">
                    <div className="db-test col-span-12">
                        <div className="bg-gray-100/50 py-4 px-6 rounded-xl w-fit border-2 border-gray-300/80">
                            <h1 className="text-2xl font-bold">
                                Olá, {session?.user.name}!
                            </h1>
                            <span>
                                Você está logado como {session?.user.username}
                            </span>
                        </div>

                        {/* <Link href="/posts">Posts</Link>
                        <br />
                        <LoginButton />
                        <LogoutButton />
                        <h2>Server Session</h2>
                        <pre className="flex flex-wrap">
                            {JSON.stringify(session)}
                        </pre> */}
                        {/* <h2>Client Call</h2> */}

                        {/* <ClientUser /> */}
                    </div>
                    <div className="left col-span-12">
                        <h1 className="displayBold text-lg">
                            Post recentes
                        </h1>
                        <Posts data={POSTS}/>
                        
                    </div>
                    {/* <div className="right col-span-4">
                        <h1 className="font-bold">Users</h1>
                        <ul>
                            {users.map((user, index) => (
                                <User
                                    key={index}
                                    index={index}
                                    user={user}
                                ></User>
                            ))}
                        </ul>
                        <UserCreate></UserCreate>
                    </div> */}
                </div>
            </div>
            {/* <ul>
                            {todos.map((todo, index) => (
                                <TodoComponent
                                    key={index}
                                    todo={todo}
                                ></TodoComponent>
                            ))}
                        </ul>
                        <TodoCreate></TodoCreate> */}
        </div>
    );
}
