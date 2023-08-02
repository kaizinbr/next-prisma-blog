"use client";
import { Metadata } from "next";
import { useRouter, usePathname } from "next/navigation";
import React, { useRef, useEffect } from "react";

export const metadata: Metadata = {
    title: "Next.js - Coding Beauty",
    description: "Next.js Tutorials by Coding Beauty",
};
export default function Page() {
    const urlRef = useRef<string>("");
    //   const { pathname } = useRouter();
    const pathname = usePathname()

    useEffect(() => {        
        urlRef.current = window.location.href;
        console.log(urlRef.current);
    }, []);
    return (
        <main>
            Welcome to Coding Beauty 😄
            <br />
            <br />
            URL: <b>{urlRef.current}</b>
            <br />
            route: <b>{pathname}</b>
        </main>
    );
}
