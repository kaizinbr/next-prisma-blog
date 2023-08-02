"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const useLoginAfterRegister = async (username: string, password: string) => {
    
    const res = await signIn("credentials", {
        redirect: false,
        username,
        password,
    });

    if (!res?.error) {
        window.location.href = "/";
    }
}

export const RegisterForm = () => {
    let [loading, setLoading] = useState(false);
    let [formValues, setFormValues] = useState({
        name: "",
        username: "",
        password: "",
    });
    const [userExists, setUserExists] = useState(false);

    
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                body: JSON.stringify(formValues),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            setLoading(false);
            if (!res.ok) {

                if (res.status === 403) {
                    setUserExists(true);
                }
                return;
            }

            signIn("credentials", {
                redirect: true,
                username: formValues.username,
                password: formValues.password,
                callbackUrl,
            });
        } catch (error: any) {
            setLoading(false);
            console.error(error);
            alert(error.message);
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    return (
        <div>
            {userExists && (
                <div className="flex flex-rox flex-wrap text-center bg-red-300 py-4 mb-6 rounded-md justify-around">
                    <span 
                    className={`
                        cursor-pointer
                    `}
                    onClick={
                        () => setUserExists(false)
                    }>x</span>
                    <p className="">
                        O nome de usuário já existe, tente outro.
                    </p>
                    <Link href={'/signin'}>Faça Login</Link>
                </div>
            )}

            <form
                onSubmit={onSubmit}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: 500,
                    rowGap: 10,
                }}
            >
                <label htmlFor="name">Name</label>
                <input
                    required
                    type="text"
                    name="name"
                    value={formValues.name}
                    onChange={handleChange}
                    style={{ padding: "1rem" }}
                />
                <label htmlFor="username">username</label>
                <input
                    required
                    type="text"
                    name="username"
                    value={formValues.username}
                    onChange={handleChange}
                    style={{ padding: "1rem" }}
                />
                <label htmlFor="password">Password</label>
                <input
                    required
                    type="password"
                    name="password"
                    value={formValues.password}
                    onChange={handleChange}
                    style={{ padding: "1rem" }}
                />
                <button
                    style={{
                        backgroundColor: `${loading ? "#ccc" : "#3446eb"}`,
                        color: "#fff",
                        padding: "1rem",
                        cursor: "pointer",
                    }}
                    disabled={loading}
                >
                    {loading ? "loading..." : "Register"}
                </button>
            </form>
        </div>
    );
};
