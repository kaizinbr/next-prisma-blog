"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Bio from "../general/Bio";
import Posts from "../general/Posts";
import ProfilePic from "../general/ProfilePic";

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

export default function Profile({ userData }: userProps | any) {
    // const name = userData.name;

    const [loading, setLoading] = useState(true);

    return (
        <div
            className={`
                flex flex-col justify-center
            `}
        >
            <div
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
                <Posts data={userData.posts}/>
                <Bio userData={userData}  />
            </div>
            {/* {loading && (
                <div className="fixed top-0 w-full h-full z-30 bg-gray-200">
                    <LoadingFullPage />
                </div>
            )} */}
        </div>
    );
}
