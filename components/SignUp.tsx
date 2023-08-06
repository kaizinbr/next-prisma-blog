"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { LoadingSm } from "./Loading";

const useLoginAfterRegister = async (username: string, password: string) => {
    const res = await signIn("credentials", {
        redirect: false,
        username,
        password,
    });

    if (!res?.error) {
        window.location.href = "/";
    }
};

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

            if (!res.ok) {
                if (res.status === 403) {
                    setUserExists(true);
                    setLoading(false);
                }
                return;
            }

            signIn("credentials", {
                redirect: true,
                username: formValues.username,
                password: formValues.password,
                callbackUrl,
            });
            setLoading(false);
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
        <div
            className={`
            flex flex-col
            w-full max-w-lg
            h-[624px] rounded-lg
            bg-gray-100
            hover:shadow-2xl hover:shadow-gray-400/20
            transition duration-300 ease-in-out
            px-16
        `}
        >
            {userExists && (
                <div className="flex flex-rox flex-wrap text-center bg-red-300 py-4 mb-6 rounded-md justify-around">
                    <span
                        className={`
                        cursor-pointer
                    `}
                        onClick={() => setUserExists(false)}
                    >
                        x
                    </span>
                    <p className="">
                        O nome de usuário já existe, tente outro.
                    </p>
                    <Link href={"/signin"}>Faça Login</Link>
                </div>
            )}

            <form
                onSubmit={onSubmit}
                className={`
                    flex flex-col justify-center
                    
                    h-full
                `}
                autoComplete="off"
            >
                <legend className="displayBold text-3xl mb-12">
                    Faça seu cadastro
                </legend>
                <label
                    htmlFor="name"
                    className="text-sm text-gray-500 displayBold mb-2"
                >
                    Nome
                </label>
                <input
                    required
                    type="text"
                    name="name"
                    value={formValues.name}
                    onChange={handleChange}
                    className={`
                        mb-6 py-3 px-4 rounded-lg
                        outline-none
                        bg-gray-200
                        focus:bg-gray-50
                        transition duration-200 ease-in-out
                    `}
                />

                <label
                    htmlFor="username"
                    className="text-sm text-gray-500 displayBold mb-2"
                >
                    Nome de usuário
                </label>
                <input
                    required
                    type="text"
                    name="username"
                    value={formValues.username}
                    onChange={handleChange}
                    className={`
                        mb-6 py-3 px-4 rounded-lg
                        outline-none
                        bg-gray-200
                        focus:bg-gray-50
                        transition duration-200 ease-in-out
                    `}
                />
                <label
                    htmlFor="password"
                    className="text-sm text-gray-500 displayBold mb-2"
                >
                    Senha
                </label>
                <input
                    required
                    type="password"
                    name="password"
                    value={formValues.password}
                    onChange={handleChange}
                    className={`
                        mb-6 py-3 px-4 rounded-lg
                        outline-none
                        bg-gray-200
                        focus:bg-gray-50
                        transition duration-200 ease-in-out 
                        
                    `}
                />

                <div className="flex flex-row gap-2 items-center text-gray-700 text-sm mb-4">
                    <input type="checkbox" name="terms" id="terms" />
                    <label htmlFor="terms">
                        Concordo com os{" "}
                        <Link
                            className="text-violet-500 hover:text-violet-900 transition duration-200"
                            href={"#"}
                        >
                            termos
                        </Link>{" "}
                        e{" "}
                        <Link
                            className="text-violet-500 hover:text-violet-900 transition duration-200"
                            href={"#"}
                        >
                            política de privacidade
                        </Link>
                    </label>
                </div>

                <button
                    disabled={loading}
                    className="h-14 bg-violet-400 hover:bg-violet-600 hover:text-gray-100 transition duration-200 rounded-xl displayBold text-xl mb-6"
                >
                    {loading ? <LoadingSm />  : "Cadastrar"}
                </button>

                <div className="flex flex-row text-gray-500 text-sm gap-8 justify-center items-center">
                    <Link
                        href={"/signin"}
                        className="hover:text-gray-950 transition duration-200"
                    >
                        Faça Login
                    </Link>
                </div>
            </form>
        </div>
    );
};
