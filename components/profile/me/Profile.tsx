"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import getUserData from "@/services/useUserInfo";
import ProfileHeader from "./ProfileHeader";
import Bio from "./Bio";
import Posts from "./Posts";

export default function Profile() {
    const { data: session } = useSession();
    console.log(session);
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUser = async () => {
            const data = await getUserData(session?.user?.id!);
            setUserData(data);
            setLoading(false);
        };
        if (session) {
            getUser();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // console.log(userData);

    return (
        <div
            className={`
            profile
            
        `}
        >
            {/* {loading ? (
                <Loading />
            ) : ( */}
                {/* <div> */}

                <div className={`
                    color h-40 w-full flex justify-center items-center
                    absolute top-0 left-0
                    bg-gradient-to-b from-violet-500/60 from-10% via-violet-500/40 via-30% to-transparent to-90%
                    mb-3
                    z-0
                `}>

                </div>
                    <ProfileHeader userData={userData} />
                    <Bio userData={userData} />
                    <Posts userData={userData} />
                {/* </div> */}
            {/* )} */}
        </div>
    );
}
