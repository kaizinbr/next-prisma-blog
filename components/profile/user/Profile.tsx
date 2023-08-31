"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import getMyData from "@/services/useUserInfo";
import ProfileHeader from "./ProfileHeader";
import Bio from "../general/Bio";
import Posts from "../general/Posts";
import LoadingFullPage from "@/app/loading";

type userProps = ({
    id: string;
    username: string;
    name: string | null;
    email: string | null;
    createdAt: Date;
    updatedAt: Date;
    Profile: {
        id: string;
        bio: string | null;
        name: string | null;
        image: string | null;
        userId: string;
        pronouns: string | null;
    } | null;
    posts: {
        id: string;
        slug: string;
        title: string | null;
        subtitle: string | null;
        tags: string | null;
        createdAt: Date;
        updatedAt: Date;

    }[];
})

export default function Profile({userData}: userProps | any) {
    // const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    // console.log(userData)

    // useEffect(() => {
    //     const getUser = async () => {
    //         const data = await getUserData(session?.user?.id!);
    //         setUserData(data);
    //         setLoading(false);
    //     };
    //     if (session) {
    //         getUser();
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    // console.log(userData);

    return (
        <div
            className={`
                flex flex-col justify-center
            `}
        >
            <div
                className={`
                    profile
                    
                `}
            >
                <div
                    className={`
                    color h-40 w-full flex justify-center items-center
                    absolute top-0 left-0
                    bg-gradient-to-b from-violet-500/60 from-10% via-violet-500/40 via-30% to-transparent to-90%
                    mb-3
                    z-0
                `}
                ></div>
                {/* <ProfileHeader sessionData={session} userData={userData} /> */}
                <div
                    className={`
                            
                        w-full rounded-lg overflow-hidden
                        flex flex-row
                        z-10 relative mt-12 px-6

                    `}
                >
                    <div className="bgPfp flex flex-col justify-center items-start relative">
                        <Image
                            src={userData.Profile?.image!}
                            width={200}
                            height={200}
                            alt={`Profile picture of ${userData.name}`}
                            className={`
                        rounded-full
                        h-32 w-32
                    `}
                        />
                    </div>
                    <div className="flex flex-col justify-start items-start ml-6">
                        <h1 className="text-4xl displayExtBold mt-2">
                            {userData.name}
                        </h1>
                        <h2 className="text-base displayMedium text-gray-600 ">
                            @{userData.username}
                        </h2>
                        <div
                            className={`
                        flex flex-row gap-6 justify-center items-center mt-2
                        text-gray-800 text-sm
                    `}
                        >
                            {userData.Profile?.pronouns ? (
                                <Link
                                    // href={`/profile/${session?.user?.username}/following`}
                                    href={`#`}
                                    id="pronous"
                                >
                                    {userData.Profile?.pronouns!}
                                </Link>
                            ) : null}
                            {userData.createdAt ? (
                                <Link
                                    // href={`/profile/${session?.user?.username}/following`}
                                    href={`#`}
                                    id="pronous"
                                >
                                    Entrou em{" "}
                                    {new Date(
                                        userData.createdAt
                                    ).getUTCFullYear()}
                                </Link>
                            ) : null}
                            {userData.posts ? (
                                <Link
                                    // href={`/profile/${session?.user?.username}/following`}
                                    href={`#`}
                                    id="pronous"
                                    className="flex flex-row items-center hover:text-violet-500 transition-all"
                                >
                                    {userData.posts?.length} Posts
                                </Link>
                            ) : null}
                        </div>
                    </div>
                </div>
                <Bio Profile={userData.Profile} />
                <Posts data={userData.posts} />
            </div>
            {/* {loading && (
                <div className="fixed top-0 w-full h-full z-30 bg-gray-200">
                    <LoadingFullPage />
                </div>
            )} */}
        </div>
    );
}
