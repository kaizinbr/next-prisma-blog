"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import getUserData from "@/services/useUserInfo";
import ProfileHeader from "./ProfileHeader";

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

    console.log(userData);

    return (
        <div
            className={`
            

        `}
        >
            {/* {loading ? (
                <Loading />
            ) : ( */}
                {/* <div> */}
                    <ProfileHeader userData={userData} />
                {/* </div> */}
            {/* )} */}
        </div>
    );
}
