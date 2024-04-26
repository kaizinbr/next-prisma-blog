"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Bio from "../general/Bio";
import Posts from "../general/Posts";
import { ProfilePic } from "../general/ProfilePic";
import ProfileCanva from "../general/UserContent";

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
};

export default function Profile({
    userData,
    itsMe,
}: {
    userData: userProps | any;
    itsMe: boolean;
}) {
    // const name = userData.name;

    // console.log(userData);

    const [loading, setLoading] = useState(true);

    return (
        <div
            className={`
                flex flex-col justify-start
                
            `}
        >
            <div
                className={`
                    bgPfp flex flex-col justify-end items-start relative
                    h-[412px] w-full
                `}
            >
                <div className={`
                
                    flex flex-row gap-3 py-8 px-4 w-full h-64 
                    bg-gradient-to-b from-transparent to-black/45 from-40% 
                    items-end
                `}>
                    <ProfilePic
                        props={{ size: 64, alt: "profile picture" }}
                        imgURL={userData.Profile.image}
                        setImgURL={() => {}}
                    />
                    <div className="flex flex-col">
                        <h1 className="text-2xl text-neutral-100 font-bold">{userData.name}</h1>
                        <p className="text-base text-neutral-300">@{userData.username}</p>
                    </div>
                </div>
                <div className="flex absolute left-0 -z-10 w-full h-[430px] overflow-hidden">
                    <div className={`
                        before:bg-black/10 before:z-10 before:absolute before:top-0 before:left-0 before:w-full before:h-full
                    `}></div>
                    <Image
                        src="/static/images/image_cover.png"
                        alt="cover"
                        width={400}
                        height={500}
                        className={`
                            object-cover object-center
                            min-w-full min-h-full
                            absolute left-0 -z-10
                    
                        `}
                    />
                </div>
            </div>

            {/* <div
                className={`
                    profile grid flex-col-reverse
                    grid-cols-6 gap-4 
                    lg:grid-cols-12 lg:gap-8
                    
                `}
            >
                <div
                    className={`
                        color h-40 w-full flex justify-center items-center
                        absolute top-0 left-0
                        bg-gradient-to-b from-[#F79256]/60 from-10% via-[#F79256]/40 via-30% to-transparent to-90%
                        mb-3
                        -z-10
                    `}
                    style={{
                        backgroundImage: `linear-gradient(${userData.Profile.color}99 10%, ${userData.Profile.color}66 30%, rgba(0, 0, 0, 0) 90%)
                    `,
                    }}
                ></div>
                <Bio userData={userData} itsMe />
            </div> */}
            {/* {loading && (
                <div className="fixed top-0 w-full h-full z-30 bg-gray-200">
                    <LoadingFullPage />
                </div>
            )} */}
        </div>
    );
}
