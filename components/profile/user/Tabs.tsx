"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { GoChevronLeft, GoKebabHorizontal } from "react-icons/go";
import { HiDotsVertical } from "react-icons/hi";

export default function Tabs({setTab, tab}: {setTab: Function, tab: string}) {
    // const [tab, setTab] = useState("posts");

    return (
        <div
            className={`
            flex flex-row justify-center items-center gap-4
            z-40  rounded-xl px-4 py-2
            transition-transform duration-300 md:translate-y-full translate-y-0
            bg-neutral-800/80 backdrop-blur-lg border border-neutral-700/40
        `}
        >
            <button
                onClick={() => {
                    setTab("posts");
                }}
                className={`
                    text-base font-semibold px-3 py-1 border-b-2 border-transparent
                    duration-300 transition-all
                    ${
                        tab === "posts"
                            ? "text-primary-500 border-neutral-500/80"
                            : "text-neutral-600"
                    }
                `}
            >
                Posts
            </button>
            <button
                onClick={() => {
                    setTab("responses");
                }}
                className={`
                    text-base font-semibold  px-3 py-1 border-b-2 border-transparent
                    transition-all duration-300
                    ${
                        tab === "responses"
                            ? "text-primary-500 border-neutral-500/80"
                            : "text-neutral-600"
                    }
                `}
            >
                Respostas
            </button>
            {/* <button
                onClick={() => {
                    setTab("responses");
                }}
                className={`
                    text-base font-semibold  px-3 py-1 border-b-2 border-transparent
                    transition-all duration-300
                    ${
                        tab === "responses"
                            ? "text-primary-500 border-neutral-500/80"
                            : "text-neutral-600"
                    }
                `}
            >
                Perfil
            </button>
            <button
                // onClick={() => setMoreOptionsClicked(true)}
                className="ml-3 "
            >
                <HiDotsVertical className="size-6" />
            </button> */}
        </div>
    );
}
