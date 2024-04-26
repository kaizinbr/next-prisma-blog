"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";


export default function CreatePostBtn() {

    const [scrollY, setScrollY] = useState(0);
    const [scrollDirection, setScrollDirection] = useState("up");

    const handleScroll = () => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > scrollY) {
            setScrollDirection("down");
            // console.log("down");
        } else {
            setScrollDirection("up");
            // console.log("up");
        }
        setScrollY(currentScrollY);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scrollY]);

    return (
        <Link href="#"
            className={`
                transition-transform duration-300 ease-in-out fixed bottom-24 right-3
            ${
                scrollDirection === "up"
                    ? "translate-y-0"
                    : "translate-y-16"
            }
            `}
        >
            <span className={`
                bg-neutral-300 hover:bg-blue-700 text-neutral-800 font-bold py-2 px-4 rounded-full h-14 w-14
                flex items-center justify-center
                shadow-md border border-neutral-200/60
            `}>
                <GoPlus className="h-7 w-7"/>
            </span>
        </Link>
    );
}