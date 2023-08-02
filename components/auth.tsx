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
            className="font-bold"
            onClick={() => router.push(`/signin?callbackUrl=${urlRef.current}`)}
        >
            Sign in
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
        <button className="font-bold" onClick={() => router.push(`/signup?callbackUrl=${urlRef.current}`)}>
            Sign Up
        </button>
    );
};
