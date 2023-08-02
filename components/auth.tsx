"use client";

import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export const LoginButton = () => {
    const router = useRouter();
    return (
        <button className="font-bold" onClick={() => router.push('/auth/signin')}>
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
    const router = useRouter();
    return (
        <button className="font-bold" onClick={() => router.push('/auth/signup')}>
            Sign Up
        </button>
    );
};
