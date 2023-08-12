"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";


export default function ProfileHeader(userData: any) {
    const data = userData.userData; 
    console.log(data);

    return (
        <div
            className={`
            
            h-96 w-full rounded-lg
            bg-gray-100 overflow-hidden

        `}
        >
            <div className="bgPfp flex flex-col justify-center items-center relative mb-14">
                <div
                    className={`
                        bg-gradient-to-r from-purple-500 to-blue-800
                        h-48 w-full
                
                    `}
                ></div>
                <Image
                    src={data?.userProfile?.image!}
                    width={176}
                    height={176}
                    alt="pfp"
                    className={`
                        rounded-full
                        transform translate-y-1/3
                        absolute
                    `}
                />
            </div>
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-2xl displayExtBold mt-2">
                    {data?.user?.name}
                </h1>
                <h2 className="text-base displayMedium text-gray-600 ">
                    @{data?.user?.username}
                </h2>
                <div className="flex flex-row gap-6 justify-center items-center mt-4">
                    <Link
                        // href={`/profile/${session?.user?.username}/following`}
                        href={`#`}
                        id="pronous"
                    >
                        {data?.userProfile?.pronous!} 
                    </Link>
                    <Link
                        // href={`/profile/${session?.user?.username}/following`}
                        href={`#`}
                        id="created"
                    >
                        Entrou em {new Date(data?.user?.createdAt).getUTCFullYear()}
                    </Link>
                    <Link
                        // href={`/profile/${session?.user?.username}/following`}
                        href={`#`}

                    >
                        {data?.user?.posts?.length} Posts
                    </Link>
                </div>
            </div>
        </div>
    );
}

