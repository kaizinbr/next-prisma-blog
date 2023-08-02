"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import { LoginButton, LogoutButton, SignupButton } from "@/components/auth";

const Navbar: React.FC = () => {
    const router = usePathname();
    const isActive: (pathname: string) => boolean = (pathname) =>
        router === pathname;

    const { data: session, status } = useSession();

    let left = (
        <div className="left">
            <Link href="/" className="font-bold" data-active={isActive("/")}>
                Blog
            </Link>
        </div>
    );

    let right = null;

    if (status === "loading") {
        left = (
            <div className="left">
                <Link
                    href="/"
                    className="font-bold"
                    data-active={isActive("/")}
                >
                    Blog
                </Link>
            </div>
        );
        right = (
            <div className="right">
                <p>Validating session ...</p>
            </div>
        );
    }

    if (!session) {
        right = (
            <div className="right flex flex-row gap-5">
                <LoginButton />
                <SignupButton />
            </div>
        );
    }

    if (session) {
        left = (
            <div className="left">
                <Link
                    href="/"
                    className="font-bold"
                    data-active={isActive("/")}
                >
                    Blog
                </Link>
                {/* <Link href="/drafts" data-active={isActive("/drafts")}>
                    My drafts
                </Link> */}
            </div>
        );
        right = (
            <div className="right flex flex-row gap-5">
                <p className="font-bold">
                    {session?.user?.name} ({session?.user?.email})
                </p>
                <Link href="/create">
                    <button>
                        New post
                    </button>
                </Link>
                <LogoutButton />
            </div>
        );
    }

    return (
        <nav
            className={`
            flex flex-row w-full
            fixed top-0 left-0
            justify-between items-center
            border-b border-gray-200
            px-4 py-5
            bg-gray-400/50
            backdrop-filter backdrop-blur-md
        `}
        >
            {left}
            {right}
        </nav>
    );
};

export default Navbar;
