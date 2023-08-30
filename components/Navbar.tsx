"use client";

import React, { useEffect, useRef, useState } from "react";
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
    BiArrowBack,
    BiX
} from "react-icons/bi";
import { TbAlignCenter, TbX } from "react-icons/tb";
import { IoIosArrowBack } from "react-icons/io";
import CreatePostBtn from "@/components/buttons/CreatePostBtn";
import { useSetMenuState, useMenuState } from "@/services/userLocalStorage";

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

type Props = {
    children?: React.ReactNode;
};

const AsideNavbar = ({ children}: Props ) => {
    // const router = usePathname();
    // const isActive: (pathname: string) => boolean = (pathname) =>
    //     router === pathname;
    const router = useRouter();

    const { data: session, status } = useSession();
    // const initialMenuState = useMenuState();
    // console.log(initialMenuState);

    const [open, setOpen] = useState(true);
    
    useEffect(() => {
        const menuState = localStorage.getItem("menuIs");
        // verifica se é ou nao true pq o menuIs é uma string
        menuState === "true" ? 'ta em true' : setOpen(false);
        console.log("agora o menu está", menuState)
    }, []);


    const urlRef = useRef<string>("");


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
                        <span className={`transition duration-100 ml-3 ${open ? "" : "scale-0 opacity-0"}`}>Home</span>
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
                        <span className={`transition duration-100 ml-3 ${open ? "" : "scale-0 opacity-0"}`}>Blogs</span>
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
                        <span className={`transition duration-100 ml-3 ${open ? "" : "scale-0 opacity-0"}`}>Pesquisar</span>
                    </Link>
                </li>
                <li>
                    <Link
                        href="/post/my"
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
                        <span className={`transition duration-100 ml-3 ${open ? "" : "scale-0 opacity-0"}`}>Meus Posts</span>
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
            <div className={`w-[232px] mb-20`}>
                <ul
                    className={`space-y-2 transition duration-300 displayMedium`}
                >
                    <li>
                        <Link
                            href="/"
                            className={`
                                flex items-center p-2 
                                hover:bg-violet-400  transition duration-300 group 
                                ${open ? "w-full rounded-lg" : "w-10 h-10 rounded-full"} justify-start 
                            `}
                        >
                            <BiHomeCircle
                                className={`
                                    w-5 h-5
                                    ${open ? "" : "fixed ml-[.13rem]"}
                                `}
                            />
                            <span className={`transition duration-100 ml-3 ${open ? "" : "scale-0 opacity-0"}`}>Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/profile"
                            className={`
                                flex items-center p-2  rounded-lg 
                                hover:bg-violet-400  transition duration-300 group 
                                ${open ? "w-full" : "w-10 h-10"} justify-start 
                            
                            `}
                        >
                            <BiUser
                                className={`
                                w-5 h-5 
                                    ${open ? "" : "fixed ml-[.13rem]"}                                
                            `}
                            />
                            <span className={`transition duration-100 ml-3 ${open ? "" : "scale-0 opacity-0"}`}>Perfil</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/blogs"
                            className={`
                                flex items-center p-2  rounded-lg 
                                hover:bg-violet-400  transition duration-300 group 
                                ${open ? "w-full" : "w-10 h-10"} justify-start 
                            
                            `}
                        >
                            <BiFile
                                className={`
                                w-5 h-5 
                                    ${open ? "" : "fixed ml-[.13rem]"}                                
                            `}
                            />
                            <span className={`transition duration-100 ml-3 ${open ? "" : "scale-0 opacity-0"}`}>Blogs</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/search"
                            className={`
                                flex items-center p-2  rounded-lg 
                                hover:bg-violet-400  transition duration-300 group 
                                ${open ? "w-full" : "w-10 h-10"} justify-start 
                            
                            `}
                        >
                            <BiSearch
                                className={`
                                w-5 h-5 
                                    ${open ? "" : "fixed ml-[.13rem]"}                                
                            `}
                            />
                            <span className={`transition duration-100 ml-3 ${open ? "" : "scale-0 opacity-0"}`}>Pesquisar</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/notifications"
                            className={`
                                flex items-center p-2  rounded-lg 
                                hover:bg-violet-400  transition duration-300 group 
                                ${open ? "w-full" : "w-10 h-10"} justify-start 
                            
                            `}
                        >
                            <BiNotification
                                className={`
                                w-5 h-5 
                                    ${open ? "" : "fixed ml-[.13rem]"}                                
                            `}
                            />
                            <span className={`transition duration-100 ml-3 ${open ? "" : "scale-0 opacity-0"}`}>Notificações</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/post/my"
                            className={`
                                flex items-center p-2  rounded-lg 
                                hover:bg-violet-400  transition duration-300 group 
                                ${open ? "w-full" : "w-10 h-10"} justify-start 
                            
                            `}
                        >
                            <BiEdit
                                className={`
                                w-5 h-5 
                                    ${open ? "" : "fixed ml-[.13rem]"}                                
                            `}
                            />
                            <span className={`transition duration-100 ml-3 ${open ? "" : "scale-0 opacity-0"}`}>Meus Posts</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/settings"
                            className={`
                                flex items-center p-2 rounded-lg 
                                hover:bg-violet-400 transition duration-300 group 
                                ${open ? "w-full" : "w-10 h-10"} justify-start 
                            
                            `}
                        >
                            <BiCog
                                className={`
                                w-5 h-5 
                                    ${open ? "" : "fixed ml-[.13rem]"}                                
                            `}
                            />
                            <span className={`transition duration-100 ml-3 ${open ? "" : "scale-0 opacity-0"}`}>Conta</span>
                        </Link>
                    </li>
                    <li>
                        <button
                            onClick={() => {
                                signOut();
                                
                            }}
                            className={`
                                flex items-center p-2 rounded-lg 
                                hover:bg-violet-400  transition duration-300 group 
                                ${open ? "w-full" : "w-10 h-10"} justify-start 
                            
                            `}
                        >
                            <BiLogOut
                                className={`
                                w-5 h-5 
                                    ${open ? "" : "fixed ml-[.13rem]"}                                
                            `}
                            />
                            <span className={`transition duration-100 ml-3 ${open ? "" : "scale-0 opacity-0"}`}>Sair</span>
                        </button>
                    </li>
                </ul>
            </div>
        );

        mainDiv = (
            <div
                className={`flex flex-col items-center justify-between w-full z-10`}
            >
                <div
                    className={`
                        flex items-center justify-center flex-shrink-0 bg-gray-200 rounded-full
                        transition-all duration-300 ease-in-out scale-100 
                        ${open ? "w-36 h-36" : "w-11 h-11 mt-11"}
                    `}
                >
                    <Image
                        className={`
                                 rounded-full
                                 transition duration-300 ease-in-out
                            `}
                        src={session?.user?.image!}
                        height={144}
                        width={144}
                        alt="avatar"
                    />
                </div>
                <div className={`flex flex-col justify-center items-center text-center duration-300 ${open ? "mt-4" : "scale-0 h-0 mt-2"}`}>
                    <h1
                        className={`text-xl displayExtBold leading-7 text-gray-900 sm:text-2xl`}
                    >
                        {session?.user?.name}
                    </h1>
                    <h3
                        className={`text-lg displayMedium leading-7 text-gray-500 sm:text-sm`}
                    >
                        @{session?.user?.username}
                    </h3>
                    
                </div>
            </div>
        );

        // writeButton = ()
    }

    return (
        <div>
            <aside
                id="default-sidebar"
                className={`
                    fixed top-0 left-0 z-40  h-screen transition-transform -translate-x-full sm:translate-x-0
                    bg-gray-200 border-r border-gray-400
                `}
                aria-label="Sidebar"
            >
                <div
                    className={`
                        flex flex-col items-start
                        h-full px-3 py-4 overflow-y-auto bg-gray-200 text-neutral-800
                        gap-3
                        transition-all duration-300 ease-in-out
                        ${open ? "w-64" : "w-16"}
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
                                    w-10 h-10
                                    absolute right-3 top-3
                                    bg-gray-200
                                    inline-flex items-center justify-center p-2 rounded-full hover:bg-violet-400 hover:border-violet-500
                                    hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200
                                    transition duration-300 delay-100 ease-in-out 
                                    z-20
                                `}
                                onClick={() =>{
                                    setOpen(!open)
                                    localStorage.setItem("menuIs", !open + "");
                                }}
                            >
                                {open ? <TbX className="h-5 w-5" /> : <TbAlignCenter className="h-5 w-5"/>}
                                {/* <IoIosArrowBack className={`h-6 w-6 duration {open ? "" : "rotate-180" }`} /> */}
                            </button>
                            {mainDiv}
                            {options}
                            {CreatePostBtn(open, router)}
                        </>
                    )}
                </div>
            </aside>
            <div
                className={`
                    bg-gray-200 bg-opacity-50
                    transition-all duration-300 ease-in-out
                    ${open ? "ml-64 w-[calc(100%-256px)] group is-open" : "ml-16  w-[calc(100%-64px)]"}
                    px-4 py-8 min-h-screen z-10
                    
                `}
            >{children}</div>
        </div>
    );
};

export { Navbar, AsideNavbar };
