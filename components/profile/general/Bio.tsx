"use client";

import Link from "next/link";
import {ProfilePicGen} from "./ProfilePic";
import { useEffect, useState, useRef } from "react";

import Tabs from "../user/Tabs";

type userProps = {
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
        color: string | null;
        subtitle: string | null;
        tags: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[];
    followers: {
        userId: string;
    }[];
    following: {
        followerId: string;
    }[];
};

export default function Bio({
    userData,
    isItMe,
    setTab,
    tab,
}: {
    userData: userProps | any;
    isItMe: boolean;
    setTab: Function;
    tab: string;
}) {
    console.log(userData.followers, "followers");
    const ProfilePicProps = {
        src: userData.Profile?.image!,
        size: 220,
        alt: `Foto de perfil de ${userData.name}`,
    };

    // checa se a bio esta visivel e ativa as tabs
    const [isVisible, setIsVisible] = useState(false);
    const targetRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            {
                root: null, // viewport
                rootMargin: "0px", // no margin
                threshold: 0.5, // 50% of target visible
            }
        );

        if (targetRef.current) {
            observer.observe(targetRef.current);
        }

        // Clean up the observer
        return () => {
            if (targetRef.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(targetRef.current);
            }
        };
    }, []);


    // console.log(isItMe, "isItMe");

    return (
        <>
            <div
                className={`
                    flex items-center justify-center
                    col-span-6 lg:col-span-4 
                    relative
                    order-1 lg:order-none w-full 
                    -top-4
                    border-b border-neutral-800/80
                `}
                ref={targetRef}
            >
                <div
                    className={`
                        flex flex-col justify-center lg:items-center
                        
                        bg-default-fill
                        rounded-2xl lg:fixed w-full md:w-[352px] top-9
                        py-6 px-6 gap-3
                    `}
                >
                    {isItMe ? (
                        <Link href="/settings/profile">
                            <span className="text-center text-violet-500 text-sm">
                                Editar perfil
                            </span>
                        </Link>
                    ) : null}
                    <div
                        className={`
                        
                            text-neutral-200 text-sm
                            w-full
                        `}
                    >
                        {/* <span className="font-semibold">Bio:</span> */}
                        <p>{userData.Profile?.bio!}</p>
                    </div>

                    <div className="flex flex-col justify-start items-start w-full">
                        {/* <h1 className="text-3xl displayBold mt-2">
                            {userData.name}
                        </h1>
                        <h2 className="text-base displayMedium text-gray-600 ">
                            @{userData.username}
                        </h2> */}
                        <div
                            className={`
                                        flex flex-row gap-6 justify-center items-center
                                        text-neutral-200 text-sm
                                    `}
                        >
                            {userData.posts ? (
                                <Link
                                    // href={`/profile/${session?.user?.username}/following`}
                                    href={`#`}
                                    id="pronous"
                                    className="flex flex-row items-center hover:text-violet-500 transition-all"
                                >
                                    <span>{userData.posts?.length}{" "}</span> <span className="text-neutral-400 ml-1">Posts</span>
                                </Link>
                            ) : null}
                            {userData.posts ? (
                                <Link
                                    // href={`/profile/${session?.user?.username}/following`}
                                    href={`#`}
                                    id="pronous"
                                    className="flex flex-row items-center hover:text-violet-500 transition-all"
                                >
                                    <span>{userData.followers?.length}</span> <span className="text-neutral-400 ml-1">Seguidores</span>
                                </Link>
                            ) : null}
                            
                            {userData.posts ? (
                                <Link
                                    // href={`/profile/${session?.user?.username}/following`}
                                    href={`#`}
                                    id="pronous"
                                    className="flex flex-row items-center hover:text-violet-500 transition-all"
                                >
                                    <span>{userData.following?.length}</span> <span className="text-neutral-400 ml-1">Seguindo</span>
                                </Link>
                            ) : null}
                        </div>
                    </div>
                    
                    <div className="flex flex-col justify-start items-start w-full">
                        {/* <h1 className="text-3xl displayBold mt-2">
                            {userData.name}
                        </h1>
                        <h2 className="text-base displayMedium text-gray-600 ">
                            @{userData.username}
                        </h2> */}
                        <div
                            className={`
                                        flex flex-row gap-6 justify-center items-center
                                        text-neutral-200 text-sm
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
                                    {new Date(userData.createdAt).getUTCFullYear()}
                                </Link>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center relative">
                <div className={`
                    fixed top-3 m-auto  flex items-center justify-center
                    transition-transform duration-300
                    ${isVisible ? "-translate-y-[200%]" : "translate-y-0"}
                `}>
                    <Tabs setTab={setTab} tab={tab}/>
                </div>
            </div>
        </>
    );
}
