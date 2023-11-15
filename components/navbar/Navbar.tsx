"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LoginButton, LogoutButton, SignupButton } from "@/components/auth";
import Loading from "@/components/Loading";
import ProfilePic from "../profile/general/ProfilePic";
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
import CreatePostBtn from "@/components/buttons/CreatePostBtn";
import { useAnimate, stagger, motion, AnimatePresence } from "framer-motion";

type Props = {
    children?: React.ReactNode;
};

const AsideNavbar = ({ children }: Props) => {
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
                        : "p-1 h-10 w-10 rounded-full"
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
                            href="/profile/edit"
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
            <div
                className={`flex flex-col items-center justify-between w-full z-10`}
            >
                <Link href={`/${session.user.username}`}>
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
                </Link>
                {/* <ProfilePic {...profilePicProps} /> */}
                <Link href={"/profile"}></Link>
                <div
                    className={`flex flex-col justify-center items-center text-center duration-300 ${
                        open ? "mt-4" : "scale-0 h-0 mt-2"
                    }`}
                >
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
                    fixed top-0 left-0 z-40  h-screen transition-transform -translate-x-full md:translate-x-0
                    bg-gray-200 border-r border-gray-400/70
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
                                    <TbAlignCenter className="h-5 w-5" />
                                )}
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
                    ${
                        open
                            ? "md:ml-64 md:w-[calc(100%-256px)] group is-open"
                            : "md:ml-16 md:w-[calc(100%-64px)]"
                    }
                    px-4 py-8 min-h-screen z-10
                    
                `}
            >
                {children}
            </div>
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
                clipPath: isOpen
                    ? "inset(0% 0% 0% 0% round 10px)"
                    : "inset(90% 50% 10% 50% round 10px)",
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
                ? { opacity: 1, scale: 1, filter: "blur(0px)" }
                : { opacity: 0, scale: 0.3, filter: "blur(20px)" },
            {
                duration: 0.2,
                delay: isOpen ? staggerMenuItems : 0,
            }
        );
    }, [isOpen]);

    return scope;
}

const MobileMenu = () => {
    const [scrollY, setScrollY] = useState(0);
    const [scrollDirection, setScrollDirection] = useState("up");
    const [moreOptions, setMoreOptions] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const scope = useMenuAnimation(isOpen);

    const handleScroll = () => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > scrollY) {
            setScrollDirection("down");
            console.log("down");
        } else {
            setScrollDirection("up");
            console.log("up");
        }
        setScrollY(currentScrollY);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scrollY]);

    return (
        <div
            className={`
                fixed bottom-0 left-0 z-40  h-16 w-screen transition-transform md:translate-y-full translate-y-0
                bg-gray-100/80 backdrop-blur-lg border-t border-gray-400/30
                rounded-t-2xl
                ${scrollDirection === "up" ? "translate-y-0" : "translate-y-16"}
            `}
        >
            <AnimatePresence>
                {/* <span>O scroll está para {scrollDirection}</span> */}
                <div
                    className={`
                        flex justify-between items-center h-full 
                        px-8 py-4 overflow-y-auto 
                        text-gray-600 gap-3
                    `}
                >
                    <Link href="/">
                        <BiHomeCircle className="h-6 w-6" />
                    </Link>
                    <Link href="/search">
                        <BiSearch className="h-6 w-6" />
                    </Link>
                    <Link href="/notifications">
                        <BiPlus className="h-6 w-6" />
                    </Link>
                    <Link href="/notifications">
                        <BiEdit className="h-6 w-6" />
                    </Link>
                    <div
                        className={`
                        flex justify-center items-center
                        relative
                    `}
                    >
                        <button
                            onClick={() => {
                                setMoreOptions(!moreOptions);
                                setIsOpen(!isOpen);
                            }}
                        >
                            <TbAlignCenter className="h-6 w-6" />
                        </button>
                        <motion.div
                            className={`
                                fixed bottom-20
                                h-52
                            `}
                            ref={scope}
                        >
                            <ul
                                className={`
                                    flex flex-col-reverse gap-2
                                    bg-gray-100 border-gray-400/30
                                    rounded-xl p-2
                                    transition-all duration-300 ease-in-out
                                    ${isOpen ? "z-40" : "-z-10"}
                                `}
                                style={{
                                    pointerEvents: isOpen ? "auto" : "none",
                                    clipPath:
                                        "inset(90% 50% 10% 50% round 10px)",
                                }}
                            >
                                <li>
                                    <Link
                                        href="/profile"
                                        className={`
                                            h-10 w-10 justify-center items-center flex
                                            rounded-lg
                                            bg-transparent hover:bg-violet-300
                                        `}
                                    >
                                        <BiUser className="h-6 w-6" />
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className={`
                                            h-10 w-10 justify-center items-center flex
                                            rounded-lg
                                            bg-transparent hover:bg-violet-300
                                        `}
                                    >
                                        <BiNotification className="h-6 w-6" />
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className={`
                                            h-10 w-10 justify-center items-center flex
                                            rounded-lg
                                            bg-transparent hover:bg-violet-300
                                        `}
                                    >
                                        <BiCog className="h-6 w-6" />
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className={`
                                            h-10 w-10 justify-center items-center flex
                                            rounded-lg
                                            bg-transparent hover:bg-violet-300
                                        `}
                                    >
                                        <BiLogOut className="h-6 w-6" />
                                    </Link>
                                </li>
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </AnimatePresence>
        </div>
    );
};

export { AsideNavbar, MobileMenu };
