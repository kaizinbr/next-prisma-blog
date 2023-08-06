"use client";

import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRef, useEffect } from "react";

export const LoginButton = () => {
    const urlRef = useRef<string>("");

    useEffect(() => {
        urlRef.current = window.location.href;
    }, []);
    
    const router = useRouter();
    return (
        <button
            className={`
                font-bold  border-violet-700 border-2
                rounded-xl py-2 text-violet-800
                hover:bg-violet-800 hover:border-violet-800 hover:text-gray-200
                shadow-none hover:shadow-lg shadow-purple-900
                transition duration-300 delay-100 ease-in-out
            `} 
            onClick={() => router.push(`/signin?callbackUrl=${urlRef.current}`)}
        >
            Login
        </button>
    );
};

// recarrega a pagina e os outros nao
export const LogoutButton = () => {
    return (
        <button className="font-bold" onClick={() => signOut()}>
            Sign Out
        </button>
    );
};

export const SignupButton = () => {
    const urlRef = useRef<string>("");

    useEffect(() => {
        urlRef.current = window.location.href;
    }, []);

    const router = useRouter();
    return (
        <button 
            className={`
                font-bold bg-violet-600 border-2 border-violet-700 
                rounded-xl py-2 text-gray-100
                hover:bg-violet-800 hover:border-violet-800 hover:text-gray-200
                shadow-none hover:shadow-lg shadow-purple-900
                transition duration-300 delay-100 ease-in-out
            `} 
            onClick={() => router.push(`/signup?callbackUrl=${urlRef.current}`)}
        >
            Cadastre-se
        </button>
    );
};
