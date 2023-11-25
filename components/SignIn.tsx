/* eslint-disable @next/next/no-img-element */
"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { LoadingSm } from "./Loading";
import { BiShow, BiHide, BiX } from "react-icons/bi";

import { useAnimate, stagger, motion, AnimatePresence } from "framer-motion";

export default function LoginForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState({
        username: "",
        password: "",
    });
    function togglePasswordVisibility() {
        setIsPasswordVisible((prevState) => !prevState);
    }
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const [isShowNotif, setIsShowNotif] = useState(false);
    const [error, setError] = useState("");

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
                setError("Senha ou usuário incorretos");
                setIsShowNotif(true);
                console.log(res);
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
        <AnimatePresence>
            {isShowNotif && (
                <motion.div
                    className={`
                    absolute top-8 left-0 right-0
                    flex flex-col justify-center items-center
                    h-14
                `}
                    initial={{ opacity: 0, translateY: -100 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    exit={{ opacity: 0, translateY: -100 }}

                    // ref={scope}
                >
                    <div
                        className={`
                            text-center text-gray-50 text-lg bg-red-400 py-4 pl-6 pr-4 mb-6 rounded-lg
                            justify-between items-center flex gap-4
                        `}
                    >
                        <span className="font-bold">{error}</span>
                        <button
                            onClick={() => {
                                // setMoreOptions(!moreOptions);
                                setIsShowNotif(!isShowNotif);
                                setError("");
                            }}
                        >
                            <BiX className="w-8 h-8" />
                        </button>
                    </div>
                </motion.div>
            )}
            <div
                className={`
            flex flex-col
            w-full max-w-lg
            h-[624px] rounded-2xl
            bg-gray-100
            hover:shadow-2xl hover:shadow-gray-400/20
            transition duration-300 ease-in-out
            px-10 md:px-16 py-12 relative
        `}
            >
                <form
                    onSubmit={onSubmit}
                    className={`
                    flex flex-col justify-center
                    
                    h-full
                `}
                    autoComplete="off"
                >
                    <legend className="displayBold text-4xl md:text-3xl mb-12">
                        Entre na sua conta
                    </legend>

                    <div
                        className={`
                    flex flex-col
                `}
                    >
                        <label
                            htmlFor="username"
                            className="text-lg md:text-sm text-gray-500 displayBold mb-2"
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
                            text-lg md:text-sm
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
                            className="text-lg md:text-sm text-gray-500 displayBold mb-2"
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
                        text-lg md:text-sm
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

                    <div className="flex flex-row text-gray-500 text-lg md:text-sm gap-8 justify-center items-center">
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
                <div
                    className={`
                            flex justify-center items-center
                            relative
                        `}
                >
                </div>
            </div>
        </AnimatePresence>
    );
}
