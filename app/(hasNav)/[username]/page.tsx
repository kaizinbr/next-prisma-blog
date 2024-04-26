import React from "react";
import { prisma } from "@/lib/prisma";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Tabs from "@/components/profile/user/Tabs";
import getmyPosts from "@/services/usePostInfo";
import Context, { ContextProvider } from "@/services/context";

import Profile from "@/components/profile/user/Profile";
import Posts from "@/components/profile/general/Posts";
import Bio from "@/components/profile/general/Bio";
import ElementVisibilityChecker from "@/components/profile/general/UserContent";
import UserContent from "@/components/profile/general/UserContent";

export default async function Page({
    params,
}: {
    params: { username: string };
}) {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

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
            followers: {
                select: {
                    userId: true,
                },
            },
            following: {
                select: {
                    followerId: true,
                },
            },

        },
    });
    // console.log(USER?.posts);

    const POSTS = await prisma.post.findMany({
        where: {
            authorId: USER?.id,
            responseId: null,
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
    })

    const RESPONSES = await prisma.post.findMany({
        where: {
            authorId: USER?.id,
            responseId: {
                not: null,
            },
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
            responseTo: {
                select: {
                    id: true,
                    authorId: true,
                    author: {
                        select: {
                            name: true,
                            username: true,
                        },
                    },
                },
            },
        },
    });

    const isItMe = userId === USER?.id;
    console.log(isItMe)
    return (
        <div>
            {/* <div>Perfil de: {params.username}</div> */}
            <Profile userData={USER} itsMe={isItMe} />
            <UserContent POSTS={POSTS} RESPONSES={RESPONSES} userData={USER} isItMe={isItMe} />
        </div>
    );
}
