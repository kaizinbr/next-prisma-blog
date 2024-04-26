/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LoginButton, LogoutButton, SignupButton } from "@/components/auth";
import Loading from "@/components/Loading";
import { ProfilePicGen } from "../profile/general/ProfilePic";
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
    BiX,
} from "react-icons/bi";
import {
    TbAlignCenter,
    TbX,
    TbExclamationMark,
    TbUserEdit,
} from "react-icons/tb";
import {
    GoHome,
    GoHomeFill,
    GoSearch,
    GoBell,
    GoCircle,
    GoPerson,
} from "react-icons/go";
import CreatePostBtn from "@/components/buttons/CreatePostBtn";
import { useAnimate, stagger, motion, AnimatePresence } from "framer-motion";

type Props = {
    children?: React.ReactNode;
};

const Navbar = () => {
    const router = useRouter();

    const { data: session, status } = useSession();

    const [open, setOpen] = useState(true);

    useEffect(() => {
        const menuState = localStorage.getItem("menuIs");
        // verifica se é ou nao true pq o menuIs é uma string
        menuState === "true"
            ? document.body.classList.add("is-open")
            : setOpen(false);
        console.log("agora o menu está", menuState);
    }, []);

    const urlRef = useRef<string>("");

    let options = (
        <div className={`w-[232px] mb-20`}>
            <ul className={`space-y-2 transition duration-300`}>
                <li>
                    <Link
                        href="/"
                        className={`
                                flex items-center p-2 
                                hover:bg-violet-400  transition duration-300 group 
                                ${
                                    open
                                        ? "w-full rounded-lg"
                                        : "w-10 h-10 rounded-full"
                                } justify-start 
                            `}
                    >
                        <BiHomeCircle
                            className={`
                                    w-5 h-5
                                    ${open ? "" : "fixed ml-[.13rem]"}
                                `}
                        />
                        <span
                            className={`transition duration-100 ml-3 ${
                                open ? "" : "scale-0 opacity-0"
                            }`}
                        >
                            Home
                        </span>
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
                                    ${
                                        open ? "" : "fixed ml-[.13rem]"
                                    }                                
                            `}
                        />
                        <span
                            className={`transition duration-100 ml-3 ${
                                open ? "" : "scale-0 opacity-0"
                            }`}
                        >
                            Blogs
                        </span>
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
                                    ${
                                        open ? "" : "fixed ml-[.13rem]"
                                    }                                
                            `}
                        />
                        <span
                            className={`transition duration-100 ml-3 ${
                                open ? "" : "scale-0 opacity-0"
                            }`}
                        >
                            Pesquisar
                        </span>
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
                flex flex-col  gap-5
                text-center
                 bg-violet-300 border
                mt-11
                transition-transform duration-300 ease-in-out
                ${
                    open
                        ? "p-4 w-[232px] rounded-xl"
                        : "p-1 h-16 w-16 rounded-full"
                }
            `}
            >
                {open ? (
                    <div
                        className={`
                        flex flex-col gap-3
                        transition-all duration-300 ease-in-out
                        
                        ${open ? "opacity-100 scale-100" : "opacity-0 scale-0"}
                    `}
                    >
                        <h3 className="font-bold text-violet-800 text-lg">
                            Personalize seu blog!
                        </h3>
                        <LoginButton />
                        <SignupButton />
                    </div>
                ) : (
                    <span
                        className="text-xl displayBold text-violet-800 cursor-pointer"
                        title="Faça login para personalizar seu blog!"
                        onClick={() => {
                            setOpen(true);
                        }}
                    >
                        !
                    </span>
                )}
            </div>
        );
    }

    if (session) {
        options = (
            <div className={`w-[232px] mb-20`}>
                <ul
                    className={`space-y-2 transition duration-300 font-semibold`}
                >
                    <li>
                        <Link
                            href="/"
                            className={`
                                flex items-center p-2 
                                hover:bg-violet-400  transition duration-300 group 
                                ${
                                    open
                                        ? "w-full rounded-lg"
                                        : "w-10 h-10 rounded-full"
                                } justify-start 
                            `}
                        >
                            <BiHomeCircle
                                className={`
                                    w-5 h-5
                                    ${open ? "" : "fixed ml-[.13rem]"}
                                `}
                            />
                            <span
                                className={`transition duration-100 ml-3 ${
                                    open ? "" : "scale-0 opacity-0"
                                }`}
                            >
                                Home
                            </span>
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
                            <TbUserEdit
                                className={`
                                w-5 h-5 
                                    ${
                                        open ? "" : "fixed ml-[.13rem]"
                                    }                                
                            `}
                            />
                            <span
                                className={`transition duration-100 ml-3 ${
                                    open ? "" : "scale-0 opacity-0"
                                }`}
                            >
                                Perfil
                            </span>
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
                                    ${
                                        open ? "" : "fixed ml-[.13rem]"
                                    }                                
                            `}
                            />
                            <span
                                className={`transition duration-100 ml-3 ${
                                    open ? "" : "scale-0 opacity-0"
                                }`}
                            >
                                Blogs
                            </span>
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
                                    ${
                                        open ? "" : "fixed ml-[.13rem]"
                                    }                                
                            `}
                            />
                            <span
                                className={`transition duration-100 ml-3 ${
                                    open ? "" : "scale-0 opacity-0"
                                }`}
                            >
                                Pesquisar
                            </span>
                        </Link>
                    </li>
                    {/* <li>
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
                    </li> */}
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
                                    ${
                                        open ? "" : "fixed ml-[.13rem]"
                                    }                                
                            `}
                            />
                            <span
                                className={`transition duration-100 ml-3 ${
                                    open ? "" : "scale-0 opacity-0"
                                }`}
                            >
                                Meus Posts
                            </span>
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
                                    ${
                                        open ? "" : "fixed ml-[.13rem]"
                                    }                                
                            `}
                            />
                            <span
                                className={`transition duration-100 ml-3 ${
                                    open ? "" : "scale-0 opacity-0"
                                }`}
                            >
                                Conta
                            </span>
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
                                    ${
                                        open ? "" : "fixed ml-[.13rem]"
                                    }                                
                            `}
                            />
                            <span
                                className={`transition duration-100 ml-3 ${
                                    open ? "" : "scale-0 opacity-0"
                                }`}
                            >
                                Sair
                            </span>
                        </button>
                    </li>
                </ul>
            </div>
        );

        // const profilePicProps = {
        //     src: session?.user?.image!,
        //     alt: "avatar",
        //     width: 144,
        //     height: 144,
        //     className: "rounded-full",
        // };
        // console.log(profilePicProps)

        mainDiv = (
            <div className={`flex flex-col items-center justify-between z-10`}>
                <Link href={`/${session.user.username}`}>
                    <div
                        className={`
                            flex items-center justify-center flex-shrink-0 bg-gray-200 rounded-full
                            transition-all duration-300 ease-in-out scale-100  p-[2px] border-[3px] border-violet-400
                        `}
                    >
                        <Image
                            className={`
                                    rounded-full
                                    transition duration-300 ease-in-out
                                    w-11 h-11
                                `}
                            src={session?.user?.image!}
                            height={144}
                            width={144}
                            alt="avatar"
                        />
                    </div>
                </Link>
            </div>
        );

        // writeButton = ()
    }

    return (
        <div>
            <aside
                id="default-sidebar"
                className={`
                    fixed top-0 right-0 z-40  h-auto p-2 transition-transform -translate-x-full md:translate-x-0
                    
                `}
                aria-label="Sidebar"
            >
                <div
                    className={`
                        flex flex-row items-center justify-between
                        h-full px-3 py-2 
                        gap-3
                        
                    `}
                >
                    {/* <Loading /> */}
                    {status === "loading" ? (
                        <Loading />
                    ) : (
                        <>
                            <Link
                                href="/"
                                className={`
                                    flex items-center justify-center
                                    hover:bg-violet-400  transition duration-300 group 
                                    w-[52.8px] h-[52.8px]
                                    right-3 top-3
                                    bg-white/80 backdrop-blur-xl
                                     p-[3px] rounded-full
                                    hover:border-violet-500 
                                `}
                            >
                                <BiHomeCircle
                                    className={`
                                        w-7 h-7
                                    `}
                                />
                            </Link>
                            <button
                                className={`
                                    w-[52.8px] h-[52.8px]
                                    right-3 top-3
                                    bg-white/80 backdrop-blur-xl
                                    inline-flex items-center justify-center p-[3px] rounded-full
                                    hover:bg-violet-400 hover:border-violet-500
                                    hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200
                                    transition duration-300 delay-100 ease-in-out 
                                    z-20
                                `}
                                onClick={() => {
                                    setOpen(!open);
                                    localStorage.setItem("menuIs", !open + "");
                                    open
                                        ? document.body.classList.remove(
                                              "is-open"
                                          )
                                        : document.body.classList.add(
                                              "is-open"
                                          );
                                }}
                            >
                                {open ? (
                                    <TbX className="h-5 w-5" />
                                ) : (
                                    <TbAlignCenter className="w-6 h-6" />
                                )}
                                {/* <IoIosArrowBack className={`h-6 w-6 duration {open ? "" : "rotate-180" }`} /> */}
                            </button>
                            {mainDiv}
                            {/* {options} */}
                            {/* {CreatePostBtn(open, router)} */}
                        </>
                    )}
                </div>
            </aside>
            <div
                className={`
                    bg-gray-200 bg-opacity-50
                    transition-all duration-300 ease-in-out
                    ${
                        open
                            ? "md:ml-64 md:w-[calc(100%-256px)] group is-open"
                            : "md:ml-16 md:w-[calc(100%-64px)]"
                    }
                    px-4 py-8 min-h-screen z-10
                    
                `}
            ></div>
        </div>
    );
};

const staggerMenuItems = stagger(0.1, { startDelay: 0.15 });

function useMenuAnimation(isOpen: boolean) {
    const [scope, animate] = useAnimate();

    useEffect(() => {
        // animate(".arrow", { rotate: isOpen ? 180 : 0 }, { duration: 0.2 });

        animate(
            "ul",
            {
                // clipPath: isOpen
                //     ? "inset(0% 0% 0% 0% round 10px)"
                //     : "inset(0% 0% 0% 0% round 10px)",
                // : "inset(90% 50% 10% 50% round 10px)",
            },
            {
                type: "spring",
                bounce: 0,
                duration: 0.5,
            }
        );

        animate(
            "li",
            isOpen
                ? {
                      opacity: 1,
                      scale: 1,
                      filter: "blur(0px)",
                      transform: "translateX(0)",
                  }
                : {
                      opacity: 0,
                      scale: 0.3,
                      filter: "blur(20px)",
                      transform: "translateX(150%)",
                  },
            {
                duration: 0.2,
                delay: isOpen ? staggerMenuItems : 0,
            }
        );
    }, [isOpen]);

    return scope;
}

const MobileMenu = () => {
    const { data: session, status } = useSession();

    let options = (
        <>
            <Link
                href="/"
                className="flex flex-col justify-center items-center basis-1/4"
            >
                <picture>
                    <GoHomeFill className="h-6 w-6" />
                </picture>
                {/* <span className="text-[10px]">Home</span> */}
            </Link>
            <Link
                href="/"
                className="flex flex-col justify-center items-center basis-1/4"
            >
                <picture>
                    <GoSearch className="h-6 w-6" />
                </picture>
                {/* <span className="text-[10px]">Pesquisa</span> */}
            </Link>
            <Link
                href="/"
                className="flex flex-col justify-center items-center basis-1/4"
            >
                <picture>
                    <GoBell className="h-6 w-6" />
                </picture>
                {/* <span className="text-[10px]">Notificações</span> */}
            </Link>
            <Link
                href="/"
                className="flex flex-col justify-center items-center basis-1/4"
            >
                <picture>
                    <GoPerson className="h-6 w-6" />
                </picture>
                {/* <span className="text-[10px]">Conta</span> */}
            </Link>
        </>
    );

    if (session) {
        options = (
            <>
                <Link
                    href="/"
                    className="flex flex-col justify-center items-center basis-1/4"
                >
                    <picture>
                        <GoHomeFill className="h-6 w-6" />
                    </picture>
                    {/* <span className="text-[10px]">Home</span> */}
                </Link>
                <Link
                    href="/"
                    className="flex flex-col justify-center items-center basis-1/4"
                >
                    <picture>
                        <GoSearch className="h-6 w-6" />
                    </picture>
                    {/* <span className="text-[10px]">Pesquisa</span> */}
                </Link>
                <Link
                    href="/"
                    className="flex flex-col justify-center items-center basis-1/4"
                >
                    <picture>
                        <GoBell className="h-6 w-6" />
                    </picture>
                    {/* <span className="text-[10px]">Notificações</span> */}
                </Link>
                <Link
                    href={`/${session.user.username}`}
                    className="flex flex-col justify-center items-center basis-1/4"
                >
                    <picture>
                        <Image
                                className={`
                                     rounded-full h-7 w-7
                                     transition duration-300 ease-in-out
                                `}
                                src={session?.user?.image!}
                                height={34}
                                width={34}
                                alt="avatar"
                            />
                    </picture>
                    {/* <span className="text-[10px]">Conta</span> */}
                </Link>
            </>
        );
    }

    const [scrollY, setScrollY] = useState(0);
    const [scrollDirection, setScrollDirection] = useState("up");
    const [moreOptions, setMoreOptions] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    // const scope = useMenuAnimation(isOpen);

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
        <div className="fixed">
            {/* <AnimatePresence> */}
                <div
                    className={`
                        fixed bottom-3 left-3 right-3 z-40  h-16 w- rounded-xl 
                        transition-transform duration-300 md:translate-y-full translate-y-0
                        bg-neutral-800/80 backdrop-blur-lg border border-neutral-700/40
                    
                    ${
                        scrollDirection === "up"
                            ? "translate-y-0"
                            : "translate-y-20"
                    }
                `}
                >
                    {/* <span>O scroll está para {scrollDirection}</span> */}
                    <div
                        className={`
                            flex justify-between items-center h-full
                            px-2  overflow-y-auto
                            text-gray-100 gap-
                        `}
                    >
                        {options}
                    </div>
                </div>
            {/* </AnimatePresence> */}
        </div>
    );
};

export { Navbar, MobileMenu };
