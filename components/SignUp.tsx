"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { LoadingSm } from "./Loading";
import { BiShow, BiHide, BiX } from "react-icons/bi";

import containsSpecialChars from "@/services/containsSpecialChars";
import { useAnimate, stagger, motion, AnimatePresence } from "framer-motion";

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
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    function togglePasswordVisibility() {
        setIsPasswordVisible((prevState) => !prevState);
    }

    const [isShowNotif, setIsShowNotif] = useState(false);
    const [error, setError] = useState("");

    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (containsSpecialChars(formValues.username)) {
                setError(
                    "O nome de usuário não pode conter caracteres especiais"
                );
                setIsShowNotif(true);
                setLoading(false);
                return;
            } else if (formValues.username.length < 3) {
                setError("O nome de usuário deve ter pelo menos 3 caracteres");
                setIsShowNotif(true);
                setLoading(false);
                return;
            } else if (formValues.username.length > 20) {
                setError("O nome de usuário deve ter no máximo 20 caracteres");
                setIsShowNotif(true);
                setLoading(false);
                return;
            
            } else if (formValues.name == "" || !formValues.name.trim()) {
                setError("O nome não pode ficar em branco");
                setIsShowNotif(true);
                setLoading(false);
                return;
            } else if (
                formValues.username[0] == " " ||
                formValues.username[formValues.username.length - 1] == " "
            ) {
                formValues.username = formValues.username.trim();
            }
            const res = await fetch("/api/auth/register", {
                method: "POST",
                body: JSON.stringify(formValues),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) {
                if (res.status === 403) {
                    setError("O nome não pode ficar em branco");
                    setLoading(false);
                    setIsShowNotif(true);
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
                min-h-[624px] rounded-lg
                bg-gray-100
                hover:shadow-2xl hover:shadow-gray-400/20
                transition duration-300 ease-in-out
                px-10 md:px-16 py-12 justify-center
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
                    <legend className="displayBold  text-4xl md:text-3xl mb-12">
                        Faça seu cadastro
                    </legend>
                    <div className="flex flex-col">
                        <label
                            htmlFor="name"
                            className="text-lg md:text-sm text-gray-500 displayBold mb-2"
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
                                focus:bg-gray-300
                                transition duration-200 ease-in-out
                                text-lg md:text-sm
                            `}
                        />
                    </div>
                    <div className="flex flex-col">
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
                                    text-lg md:text-sm
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
                        {loading ? <LoadingSm /> : "Cadastrar"}
                    </button>
                    <div className="flex flex-row text-gray-500 text-lg md:text-sm gap-8 justify-center items-center">
                        <Link
                            href={"/signin"}
                            className="hover:text-gray-950 transition duration-200"
                        >
                            Faça Login
                        </Link>
                    </div>
                </form>
            </div>
        </AnimatePresence>
    );
};
