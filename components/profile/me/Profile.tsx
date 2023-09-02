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
import ProfilePic from "../general/ProfilePic";

export default function Profile() {
    const { data: session } = useSession();
    console.log(session);
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const ProfilePicProps = {
        src: session?.user?.image!,
        size: 250,
        alt: `Foto de perfil de ${session?.user?.name}`,
    };

    useEffect(() => {
        const getUser = async () => {
            const data = await getMyData();
            setUserData(data);
            setLoading(false);
        };
        if (session) {
            getUser();

        }
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


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
                <div
                    className={`
                            
                        w-full rounded-lg overflow-hidden
                        flex flex-row
                        z-10 relative mt-12 px-6

                    `}
                >
                    <ProfilePic props={ProfilePicProps} />
                    <div className="flex flex-col justify-start items-start ml-6">
                        <h1 className="text-4xl displayExtBold mt-2">
                            {session?.user?.name}
                        </h1>
                        <h2 className="text-base displayMedium text-gray-600 ">
                            @{session?.user?.username}
                        </h2>
                        <div
                            className={`
                        flex flex-row gap-6 justify-center items-center mt-2
                        text-gray-800 text-sm
                    `}
                        >
                            {userData?.Profile?.pronouns ? (
                                <Link
                                    // href={`/profile/${session?.user?.username}/following`}
                                    href={`#`}
                                    id="pronous"
                                >
                                    {userData?.Profile?.pronouns!}
                                </Link>
                            ) : null}
                            {userData?.createdAt ? (
                                <Link
                                    // href={`/profile/${session?.user?.username}/following`}
                                    href={`#`}
                                    id="pronous"
                                >
                                    Entrou em{" "}
                                    {new Date(
                                        userData?.createdAt
                                    ).getUTCFullYear()}
                                </Link>
                            ) : null}
                            {userData?.posts ? (
                                <Link
                                    // href={`/profile/${session?.user?.username}/following`}
                                    href={`#`}
                                    id="pronous"
                                    className="flex flex-row items-center hover:text-violet-500 transition-all"
                                >
                                    {userData?.posts?.length} Posts
                                </Link>
                            ) : null}
                        </div>
                    </div>
                </div>
                {userData?.Profile ? <Bio Profile={userData?.Profile} /> : null}
                {userData?.posts ? <Posts data={userData?.posts} /> : null}
            </div>
            {/* {loading && (
                <div className="fixed top-0 w-full h-full z-30 bg-gray-200">
                    <LoadingFullPage />
                </div>
            )} */}
        </div>
    );
}
