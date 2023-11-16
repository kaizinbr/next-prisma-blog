"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import MyBio from "./MyBio";
import Posts from "../general/Posts";
import ProfilePic from "../general/ProfilePic";
import { signIn, useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { BiShow, BiHide } from "react-icons/bi";
import { MdErrorOutline } from "react-icons/md";

import Loading, { LoadingSm } from "@/components/Loading";
import containsSpecialChars from "@/services/containsSpecialChars";

type userProps = {
    id: string;
    username: string;
    name: string | null;
    email: string | null;
    createdAt: Date;
    updatedAt: Date;
    Profile: {
        id: string;
        bio: string | null;
        name: string | null;
        image: string | null;
        userId: string;
        pronouns: string | null;
    } | null;
    posts: {
        id: string;
        slug: string;
        title: string | null;
        color: string | null;
        subtitle: string | null;
        tags: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[];
};

type usernameProps = {
    username: string;
};

export default function Profile(
    { data }: userProps | any
) {
    console.log(data);
    const myData = data.ME;
    const ProfilePicProps = {
        src: myData.Profile?.image!,
        size: 220,
        alt: `Foto de perfil de ${myData.name}`,
    };

    // FORM

    const { data: session, status, update } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState({
        name: myData.name,
        username: myData.username,
        pronouns: myData.Profile?.pronouns,
        bio: myData.Profile?.bio,
    });
    const defaultValues = {
        name: myData.name,
        username: myData.username,
        pronouns: myData.Profile?.pronouns,
        bio: myData.Profile?.bio,
    };
    const [error, setError] = useState("");
    const [disabled, setDisabled] = useState(false);

    const searchParams = useSearchParams();

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // setLoading(true);
            console.log("mandando", formValues);
            if (containsSpecialChars(formValues.username) ) {
                setError('O nome de usuário não pode conter caracteres especiais');
                setDisabled(true);
                return;
            } else if (formValues.username.length < 3 ) {
                setError('O nome de usuário deve ter pelo menos 3 caracteres')
                setDisabled(true);
                return;
            } else if (formValues.username.length > 20) {
                setError('O nome de usuário deve ter no máximo 20 caracteres')
                setDisabled(true);
                return;
            } else if (userAlreadyExists(formValues.username)) {
                setError('Esse nome de usuário já está sendo usado')
                setDisabled(true);
                return;
            } else if (formValues.name == '' || !formValues.name.trim()) {
                setError('O nome não pode ficar em branco')
                setDisabled(true);
                return;
            } else if (formValues.username[0] == ' ' || formValues.username[formValues.username.length - 1] == ' ') {
                formValues.username = formValues.username.trim();
            }
            const myId = myData.id;
            const res = await fetch(`/api/user/me?id=${myData.id}`, {
                method: "PUT",
                body: JSON.stringify({ formValues, myId }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    setLoading(false);
                    update({
                        name: formValues.name,
                        username: formValues.username,
                    });
                    router.refresh();
                });

        
        } catch (error: any) {
            setLoading(false);
            setError(error);
        }
    };

    const handleChange = (
        event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
    ) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const resetForm = () => {
        setFormValues(defaultValues);
    };
    const allUsernames = data.usersArr.filter((user: any) => user !== myData.username);

    const testUsername = (username: string) => {
        if (username.length < 3) {
            return "O nome de usuário deve ter pelo menos 3 caracteres";
        } else if (username.length > 20) {
            return "O nome de usuário deve ter no máximo 20 caracteres";
        } else if (containsSpecialChars(username)) {
            return "O nome de usuário não pode conter caracteres especiais";
        } else if (userAlreadyExists(username)) {
            return "Esse nome de usuário já está sendo usado";
        } else {
            return null;
        }
    }

    const userAlreadyExists = (username: string) => {
        return allUsernames.includes(username);
    };

    return (
        <div
            className={`
                flex flex-col justify-center
            `}
        >
            <div
                className={`
                    profile grid grid-cols-12 gap-8 flex-col-reverse
                    
                `}
            >
                <div
                    className={`
                        color h-40 w-full flex justify-center items-center
                        absolute top-0 left-0
                        bg-gradient-to-b from-[#F79256]/60 from-10% via-[#F79256]/40 via-30% to-transparent to-90%
                        mb-3
                        -z-10
                    `}
                    style={{
                        backgroundImage: `linear-gradient(${myData.Profile.color}99 10%, ${myData.Profile.color}66 30%, rgba(0, 0, 0, 0) 90%)
                    `,
                    }}
                ></div>
                {/* <Posts data={myData.posts}/> */}
                <div
                    className={`
                        flex items-center justify-center
                        col-span-4 col-start-8
                        relative
                    
                    `}
                >
                    <div
                        className={`
                            flex flex-col justify-center items-center
                            border-2 border-gray-300/80
                            bg-gray-100/60
                            rounded-2xl fixed w-[352px] top-9
                            py-4 px-6 gap-6
                        `}
                    >
                        <ProfilePic props={ProfilePicProps} />
                        <form
                            onSubmit={onSubmit}
                            autoComplete="off"
                            spellCheck="false"
                            className="flex flex-col justify-start items-start w-full"
                        >
                            <label
                                htmlFor="name"
                                className="text-xs text-gray-500 displayMedium mb-2"
                            >
                                Seu nome
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formValues.name}
                                onChange={handleChange}
                                className={`
                                    py-2 px-4 rounded-lg
                                    outline-none
                                    bg-gray-200 w-full
                                    focus:bg-gray-300
                                    transition duration-200 ease-in-out
                                    text-base displayMedium text-gray-600
                                `}
                            ></input>
                            <label
                                htmlFor="username"
                                className="text-xs text-gray-500 displayMedium mb-2 mt-6"
                            >
                                Nome de usuário
                            </label>
                            <input
                                type="text"
                                name="username"
                                value={formValues.username}
                                onChange={handleChange}
                                onKeyUp={(e) => {
                                    if (userAlreadyExists(e.currentTarget.value)) {
                                        console.log('user already exists')
                                    }
                                }}
                                className={`
                                    py-2 px-4 rounded-lg
                                    outline-none
                                    bg-gray-200 w-full
                                    focus:bg-gray-300
                                    transition duration-200 ease-in-out
                                    text-base displayMedium text-gray-600
                                `}
                            ></input>
                            <span>
                                {testUsername(formValues.username) ? (
                                    <p className="text-xs text-red-500">
                                        {testUsername(formValues.username)}
                                    </p>
                                ) : null}
                            </span>

                            <label
                                htmlFor="pronouns"
                                className="text-xs text-gray-500 displayMedium mb-2 mt-6"
                            >
                                Seus pronomes
                            </label>
                            <input
                                type="text"
                                name="pronouns"
                                value={
                                    formValues.pronouns
                                        ? formValues.pronouns
                                        : ""
                                }
                                onChange={handleChange}
                                className={`
                                    mb-6 py-2 px-4 rounded-lg
                                    outline-none
                                    bg-gray-200 w-full
                                    focus:bg-gray-300
                                    transition duration-200 ease-in-out
                                    text-base displayMedium text-gray-600
                                `}
                            ></input>
                            <div
                                className={`
                                    flex flex-row gap-6 justify-center items-center mt-2
                                    text-gray-800 text-sm mb-6
                                `}
                            >
                                {myData.createdAt ? (
                                    <Link
                                        // href={`/profile/${session?.user?.username}/following`}
                                        href={`#`}
                                        id="pronous"
                                    >
                                        Entrou em{" "}
                                        {new Date(
                                            myData.createdAt
                                        ).getUTCFullYear()}
                                    </Link>
                                ) : null}
                                {myData.posts ? (
                                    <Link
                                        // href={`/profile/${session?.user?.username}/following`}
                                        href={`#`}
                                        id="pronous"
                                        className="flex flex-row items-center hover:text-violet-500 transition-all"
                                    >
                                        {myData.posts?.length} Posts
                                    </Link>
                                ) : null}
                            </div>
                            <div
                                className={`
                    
                                text-gray-600 text-sm
                                w-full
                            `}
                            >
                                <label
                                    htmlFor="bio"
                                    className="text-xs text-gray-500 displayMedium mb-2"
                                >
                                    Bio
                                </label>
                                <textarea
                                    name="bio"
                                    value={formValues.bio}
                                    onChange={handleChange}
                                    className={`
                                    mb-6 py-2 px-4 rounded-lg
                                    outline-none
                                    bg-gray-200 w-full
                                    focus:bg-gray-300
                                    transition duration-200 ease-in-out
                                    text-base displayMedium text-gray-600
                                `}
                                ></textarea>
                            </div>
                            <div className="flex flex-row justify-between w-full">
                                <button
                                    disabled={loading}
                                    className={`
                                        bg-gray-300 hover:bg-gray-300 
                                        px-6 py-2
                                        transition duration-200 rounded-md displayBold text-base mb-6
                                    `}
                                    type="button"
                                    onClick={resetForm}
                                >
                                    Cancelar
                                </button>
                                <button
                                    disabled={loading}
                                    className={`
                                        bg-violet-400 hover:bg-violet-600 hover:text-gray-100
                                        px-6 py-2
                                        transition duration-200 rounded-md displayBold text-base mb-6
                                    `}
                                    type="submit"
                                >
                                    Salvar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {disabled && (
                <div
                    className={`
                fixed top-0 left-0
                w-full h-full
                bg-gray-900 bg-opacity-50
                flex justify-center items-center
                z-50
            `}
                >
                    <div
                        className={`
                            bg-white
                            rounded-lg
                            py-4 px-9
                        `}
                    >
                        <div className="w-full mb-4 flex justify-center items-center">
                            <MdErrorOutline
                                className="text-6xl text-red-500"
                                aria-label="Erro"
                            />
                        </div>
                        <h1
                            className={`
                            text-xl font-medium text-gray-800
                            mb-6
                        `}
                        >
                            {error}!
                        </h1>
                        <button
                            className={`
                            bg-red-500 hover:bg-red-700 text-gray-100
                            px-6 py-2
                            transition duration-200 rounded-xl displayBold text-base
                            w-full
                        `}
                                onClick={() => setDisabled(false)}
                        >
                            Ok
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
