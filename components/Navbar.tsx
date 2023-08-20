"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LoginButton, LogoutButton, SignupButton } from "@/components/auth";
import Loading from "./Loading";
import {
    BiHomeCircle,
    BiNotification,
    BiCog,
    BiFile,
    BiSearch,
    BiPlus,
    BiEdit,
    BiLogOut,
    BiUser,
} from "react-icons/bi";
import CreatePostBtn from "@/components/buttons/CreatePostBtn";

const Navbar: React.FC = () => {
    const router = usePathname();
    const isActive: (pathname: string) => boolean = (pathname) =>
        router === pathname;

    const { data: session, status } = useSession();

    let left = (
        <div className={`left`}>
            <Link href="/" className={`font-bold`}>
                Blog
            </Link>
        </div>
    );

    let right = null;

    if (status === "loading") {
        left = (
            <div className={`left`}>
                <Link
                    href="/"
                    className={`font-bold`}
                    data-active={isActive("/")}
                >
                    Blog
                </Link>
            </div>
        );
        right = (
            <div className={`right`}>
                <p>Validating session ...</p>
            </div>
        );
    }

    if (!session) {
        right = (
            <div className={`right flex flex-row gap-5`}>
                <LoginButton />
                <SignupButton />
            </div>
        );
    }

    if (session) {
        left = (
            <div className={`left`}>
                <Link
                    href="/"
                    className={`font-bold`}
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
            <div className={`right flex flex-row gap-5`}>
                <p className={`font-bold`}>
                    {session?.user?.name} ({session?.user?.email})
                </p>
                <Link href="/create">
                    <button>New post</button>
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

const AsideNavbar: React.FC = () => {
    const router = usePathname();
    const isActive: (pathname: string) => boolean = (pathname) =>
        router === pathname;

    const { data: session, status } = useSession();
    // console.log(session);


    let options = (
        <div className={``}>
            <ul className={`space-y-2 transition duration-300`}>
                <li>
                    <Link
                        href="/"
                        className={`
                                flex items-center p-2  rounded-lg 
                                hover:bg-violet-400  transition duration-300 group 
                            
                            `}
                    >
                        <BiHomeCircle
                            className={`
                                w-5 h-5 
                                
                            `}
                        />
                        <span className={`ml-3`}>Home</span>
                    </Link>
                </li>
                <li>
                    <Link
                        href="/blogs"
                        className={`
                                flex items-center p-2  rounded-lg 
                                hover:bg-violet-400  transition duration-300 group 
                            
                            `}
                    >
                        <BiFile
                            className={`
                                w-5 h-5 
                                
                            `}
                        />
                        <span className={`ml-3`}>Blogs</span>
                    </Link>
                </li>
                <li>
                    <Link
                        href="/search"
                        className={`
                                flex items-center p-2  rounded-lg 
                                hover:bg-violet-400  transition duration-300 group 
                            
                            `}
                    >
                        <BiSearch
                            className={`
                                w-5 h-5 
                                
                            `}
                        />
                        <span className={`ml-3`}>Pesquisar</span>
                    </Link>
                </li>
                <li>
                    <Link
                        href="#"
                        className={`
                                flex items-center p-2  rounded-lg 
                                hover:bg-violet-400  transition duration-300 group 
                            
                            `}
                    >
                        <BiEdit
                            className={`
                                w-5 h-5 
                                
                            `}
                        />
                        <span className={`ml-3`}>Meus Posts</span>
                    </Link>
                </li>
            </ul>
        </div>
    );

    let mainDiv = null;

    let writeButton = null;

    if (status === "loading") {
        mainDiv = <Loading />;
    }

    if (!session) {
        mainDiv = (
            <div
                className={`
                right flex flex-col gap-5 
                p-4 text-center
                rounded-lg bg-violet-300 border border-violet-500
            `}
            >
                <h3 className="font-bold text-violet-800 text-lg">
                    Personalize seu blog!
                </h3>
                <LoginButton />
                <SignupButton />
            </div>
        );
    }

    if (session) {
        options = (
            <div className={``}>
                <ul
                    className={`space-y-2 transition duration-300 displayMedium `}
                >
                    <li>
                        <Link
                            href="/"
                            className={`
                                flex items-center p-2  rounded-lg 
                                hover:bg-violet-400  transition duration-300 group 
                            
                            `}
                        >
                            <BiHomeCircle
                                className={`
                                    w-5 h-5                                
                                `}
                            />
                            <span className={`ml-3`}>Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/profile"
                            className={`
                                flex items-center p-2  rounded-lg 
                                hover:bg-violet-400  transition duration-300 group 
                            
                            `}
                        >
                            <BiUser
                                className={`
                                w-5 h-5 
                                
                            `}
                            />
                            <span className={`ml-3`}>Perfil</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/blogs"
                            className={`
                                flex items-center p-2  rounded-lg 
                                hover:bg-violet-400  transition duration-300 group 
                            
                            `}
                        >
                            <BiFile
                                className={`
                                w-5 h-5 
                                
                            `}
                            />
                            <span className={`ml-3`}>Blogs</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/search"
                            className={`
                                flex items-center p-2  rounded-lg 
                                hover:bg-violet-400  transition duration-300 group 
                            
                            `}
                        >
                            <BiSearch
                                className={`
                                w-5 h-5 
                                
                            `}
                            />
                            <span className={`ml-3`}>Pesquisar</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/notifications"
                            className={`
                                flex items-center p-2  rounded-lg 
                                hover:bg-violet-400  transition duration-300 group 
                            
                            `}
                        >
                            <BiNotification
                                className={`
                                w-5 h-5 
                                
                            `}
                            />
                            <span className={`ml-3`}>Notificações</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/posts/my"
                            className={`
                                flex items-center p-2  rounded-lg 
                                hover:bg-violet-400  transition duration-300 group 
                            
                            `}
                        >
                            <BiEdit
                                className={`
                                w-5 h-5 
                                
                            `}
                            />
                            <span className={`ml-3`}>Meus Posts</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/settings"
                            className={`
                                flex items-center p-2  rounded-lg 
                                hover:bg-violet-400  transition duration-300 group 
                            
                            `}
                        >
                            <BiCog
                                className={`
                                w-5 h-5 
                                
                            `}
                            />
                            <span className={`ml-3`}>Conta</span>
                        </Link>
                    </li>
                    <li>
                        <button
                            onClick={() => {
                                signOut();
                                
                            }}
                            className={`
                                flex items-center p-2 w-full rounded-lg 
                                hover:bg-violet-400  transition duration-300 group 
                            
                            `}
                        >
                            <BiLogOut
                                className={`
                                w-5 h-5 
                                
                            `}
                            />
                            <span className={`ml-3`}>Sair</span>
                        </button>
                    </li>
                </ul>
            </div>
        );

        mainDiv = (
            <div
                className={`flex flex-col items-center justify-between -mt-9 z-10`}
            >
                <div
                    className={`flex items-center justify-center flex-shrink-0 h-36 w-36 bg-gray-200 rounded-full`}
                >
                    <Image
                        className={`
                                 rounded-full
                            `}
                        src={session?.user?.image!}
                        height={144}
                        width={144}
                        alt="avatar"
                    />
                </div>
                <div className={`mt-4 flex flex-col justify-center items-center`}>
                    <h1
                        className={`text-xl displayExtBold leading-7 text-gray-900 sm:text-2xl sm:truncate`}
                    >
                        {session?.user?.name}
                    </h1>
                    <h3
                        className={`text-lg displayMedium leading-7 text-gray-500 sm:text-sm sm:truncate`}
                    >
                        @{session?.user?.username}
                    </h3>
                    
                </div>
            </div>
        );

        writeButton = (<CreatePostBtn />)
    }

    return (
        <aside
            id="default-sidebar"
            className={`
                fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0
                bg-gray-200 border-r border-gray-400
            `}
            aria-label="Sidebar"
        >
            <div
                className={`
                    flex flex-col 
                    h-full px-3 py-4 overflow-y-auto bg-gray-200 text-neutral-800 
                    gap-3
                `}
            >
                {/* <Loading /> */}
                {status === "loading" ? (
                    <Loading />
                ) : (
                    <>
                        <button
                            data-drawer-close="default-sidebar"
                            aria-controls="default-sidebar"
                            type="button"
                            className={`
                        w-9
                        inline-flex items-center p-2 rounded-lg hover:bg-gray-500 
                        hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200
                        transition duration-300 delay-100 ease-in-out
                        z-20
                    `}
                        >
                            <Link
                                href="#"
                                className={`
                        `}
                            >
                                <span className={`sr-only`}>Close sidebar</span>
                                <svg
                                    className={`w-5 h-5`}
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        clip-rule="evenodd"
                                        fill-rule="evenodd"
                                        d="M17.707 4.293a1 1 0 010 1.414L5.414 17.707a1 1 0 01-1.414-1.414L16.293 4.293a1 1 0 011.414 0z"
                                    ></path>
                                    <path
                                        clip-rule="evenodd"
                                        fill-rule="evenodd"
                                        d="M4.293 4.293a1 1 0 000 1.414L16.586 17.707a1 1 0 001.414-1.414L5.707 4.293a1 1 0 00-1.414 0z"
                                    ></path>
                                </svg>
                            </Link>
                        </button>

                        {mainDiv}
                        {options}
                        {writeButton}
                    </>
                )}
            </div>
        </aside>
    );
};

export { Navbar, AsideNavbar };
