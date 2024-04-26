import React from "react";
import { prisma } from "@/lib/prisma";
import User from "@/components/User";

import { TodoComponent, TodoCreate } from "@/components/Todo";
import UserCreate from "@/components/UserCreate";
import { LoginButton, LogoutButton } from "@/components/auth";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ClientUser } from "../clientUser";
import Link from "next/link";
import { PageWrapper } from "@/components/config/pageWrapper";

import Posts from "@/components/profile/general/Posts";

import styles from "../fonts/Fonts.module.css";
import NewPost from "@/components/post/NewPost";
import Image from "next/image";

function doIFollow(user: any, followList: any) {
    let follow = false;
    followList.map((item: any) => {
        if (item.followerId === user.id) {
            follow = true;
        }
    });
    console.log(follow)
    return follow;
}

export default async function Home() {
    const users = await prisma.user.findMany();
    const todos = await prisma.todo.findMany();
    const session = await getServerSession(authOptions);
    // console.log("session", session);

    const POSTS = await prisma.post.findMany({
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
            comments: {
                include: {
                    images: true,
                    reposts: true,
                    author: {
                        include: {
                            Profile: true,
                        },
                    },
                }
            },
            responseTo: {
                include: {
                    images: true,
                    author: {
                        include: {
                            Profile: true,
                        },
                    },
                }
            }
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    // const MYPOSTS = await prisma.post.findMany({
    //     where: {
    //         authorId: session?.user.id,
    //     },
    //     include: {
    //         author:{
    //             select: {
    //                 name: true,
    //                 username: true,
    //                 Profile: {
    //                     select: {
    //                         image: true,
    //                     },
    //                 },
    //             },
    //         },
    //         },
    //     orderBy: {
    //         createdAt: "desc",
    //     },

    // });

    const FOLLOWLIST = await prisma.follower.findMany({
        where: {
            userId: session?.user.id,
        },
    });


    const me = await prisma.user.findUnique({
        where: {
            id: session?.user.id,
        },
        include: {
            Profile: true,
            followers: true,
            following: true,
        },
    });

    const USERS = await prisma.user.findMany({
        include: {
            Profile: true,
        },
    });



    // console.log('aaaaa',FOLLOWLIST);

    return (
        <div className="">
            {/* essa é a principal 👇 */}
            <div className={`
                p-4 max-md:p-0
                max-w-screen-lg m-auto
            `}>
                <div className="grid grid-cols-12 gap-8 overflow-hidden">
                    <div className="left col-span-12">
                        <h1 className="displayBold text-lg">
                            Post recentes
                        </h1>
                        <Posts data={POSTS}/>
                        
                    </div>
                    <div className="db-test col-span-12">
                        <NewPost />
                        {/* <div className="bg-gray-100/50 py-4 px-6 rounded-xl w-fit border-2 border-gray-300/80">
                            <h1 className="text-2xl font-bold">
                                Olá, {session?.user.name}!
                            </h1>
                            <span>
                                Você está logado como {session?.user.username}
                            </span>
                        </div> */}

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

                    {/* <div className="col-span-12 flex flex-row">
                        <div className="flex flex-col gap-4 w-1/3">
                            {/* <Image 
                                src={me?.Profile?.image}
                                alt="profile"
                                width={200}
                                height={200}
                                className="rounded-full"
                            /> 
                        </div>
                        <div className="flex flex-col gap-4 w-1/3">
                            <h1>Eu sigo</h1>
                            <div className="flex flex-row gap-4">
                                {me?.following.length}
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 w-1/3">
                            <h1>me seguem</h1>
                            <div className="flex flex-row gap-4">
                                {me?.followers.length}
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
}
