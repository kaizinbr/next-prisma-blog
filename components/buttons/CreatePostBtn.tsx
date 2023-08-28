"use client";

import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRef, useEffect } from "react";
import { BiPlus } from "react-icons/bi";

export default function CreatePostBtn(open: boolean, router: any) {
    // const urlRef = useRef<string>("");

    // useEffect(() => {
    //     urlRef.current = window.location.href;
    // }, []);

    // const router = useRouter();
    return (
        <div
            className={`
                fixed bottom-0 left-0 
                flex flex-col justify-center items-center
                z-10 transition-all duration-300
                ${open ? "w-64 px-3 " : "w-16 px-2"}
                py-4
                bg-gray-200
            `}
        >
            <button
                className={`
                        flex items-center justify-center flex-shrink-0 w-full bg-violet-300
                        gap-2 font-semibold
                        hover:bg-violet-400 hover:text-gray-100 transition duration-300 
                        h-12
                        ${open ? "rounded-xl" : " rounded-full"}
                    `}
                onClick={() => {
                    router.push("/post/create");
                }}
            >
                <BiPlus
                    className={`w-6 h-6 duration-300 ${open ? "" : "fixed"} `}
                />
                <span className={`transition duration-300 ${!open && "scale-0"}`}>
                    Crie um post
                </span>
            </button>
        </div>
    );
}
