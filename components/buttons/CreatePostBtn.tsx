"use client";

import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRef, useEffect } from "react";
import { BiPlus } from "react-icons/bi";

export default function CreatePostBtn () {
    const urlRef = useRef<string>("");

    useEffect(() => {
        urlRef.current = window.location.href;
    }, []);
    
    const router = useRouter();
    return (
        <button
                className={`
                    flex items-center justify-center flex-shrink-0 h-11 w-full bg-violet-300 rounded-xl
                    gap-2 font-semibold
                    hover:bg-violet-400 hover:text-gray-100 transition duration-300
                `}
                onClick={() => {
                    router.push("/posts/create");

                }}
            >
                <BiPlus className={`w-6 h-6 `} />
                <span>Crie um post</span>
            </button>
    );
};