/* eslint-disable @next/next/no-img-element */
"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { LoadingSm } from "./Loading";
import { BiShow, BiHide } from "react-icons/bi";

export default function LoginForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    function togglePasswordVisibility() {
        setIsPasswordVisible((prevState) => !prevState);
    }

    const searchParams = useSearchParams();
    let callbackUrl = searchParams.get("callbackUrl") || "/";
    callbackUrl = callbackUrl.includes("signin") ? "/" : callbackUrl;

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);

            const res = await signIn("credentials", {
                redirect: false,
                username: formValues.username,
                password: formValues.password,
                callbackUrl,
            });

            if (!res?.error) {
                setFormValues({ username: "", password: "" });
                router.push(callbackUrl);
                setLoading(false);
            } else {
                setError("invalid email or password");
                setLoading(false);
            }
        } catch (error: any) {
            setLoading(false);
            setError(error);
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
            h-[624px] rounded-2xl
            bg-gray-100
            hover:shadow-2xl hover:shadow-gray-400/20
            transition duration-300 ease-in-out
            px-16
        `}
        >
            {error && (
                <p className="text-center bg-red-300 py-4 mb-6 rounded">
                    {error}
                </p>
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
                    Entre na sua conta
                </legend>

                <div
                    className={`
                    flex flex-col
                `}
                >
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
                            focus:bg-gray-300
                            transition duration-200 ease-in-out
                        `}
                    />
                </div>
                <div
                    className={`
                    flex flex-col
                `}
                >
                    <label
                        htmlFor="password"
                        className="text-sm text-gray-500 displayBold mb-2"
                    >
                        Senha
                    </label>
                    <div
                        className={`
                        flex flex-row
                        mb-9 py-3 px-4 rounded-lg
                        outline-none
                        bg-gray-200
                        focus-within:bg-gray-300
                        transition duration-200 ease-in-out
                    `}
                    >
                        <input
                            required
                            type={isPasswordVisible ? "text" : "password"}
                            name="password"
                            value={formValues.password}
                            onChange={handleChange}
                            className={`
                                outline-none
                                bg-transparent
                                transition duration-200 ease-in-out
                                w-11/12
                            `}
                        />
                        <button
                            className=" text-gray-600 w-1/12"
                            onClick={togglePasswordVisibility}
                            type="button"
                        >
                            {isPasswordVisible ? (
                                <BiHide className="w-5 h-5" />
                            ) : (
                                <BiShow className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                </div>

                <button
                    disabled={loading}
                    className="h-14 bg-violet-400 hover:bg-violet-600 hover:text-gray-100 transition duration-200 rounded-xl displayBold text-xl mb-6"
                    type="submit"
                >
                    {loading ? <LoadingSm /> : "Entrar"}
                </button>

                <div className="flex flex-row text-gray-500 text-sm gap-8 justify-center items-center">
                    <Link
                        href={"/signup"}
                        className="hover:text-gray-950 transition duration-200"
                    >
                        Criar conta
                    </Link>
                    <Link
                        href={"/forgot-password"}
                        className="hover:text-gray-950 transition duration-200"
                    >
                        Esqueceu a senha?
                    </Link>
                </div>
            </form>
        </div>
    );
}
