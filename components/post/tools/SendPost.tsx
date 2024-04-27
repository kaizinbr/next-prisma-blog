"use client";

import React, { useState } from "react";

// eu percebi depois que se eu to salvando as fotos no firebase n tem nem pq salvar uma tabela so de foto se eu salvo a url no post kkkkk
// talvez depois isso seja util pra tornar isso relacional com o post pegando as fotos direto da tabela, mas agora to com preguiça de mudar
import { saveImgInDB } from "@/components/post/toolbar/imgUpload";

import { GoArrowUp } from "react-icons/go";

function convertContent(content: string) {
    const text = content; // conteúdo da textarea
    const sentences = text.split("\n"); // divide o texto em frases
    const html = sentences
        .map((sentence: string) => `<span>${sentence}</span>`)
        .join(""); // envolve cada frase com a tag span
    console.log(html);
    return html;
}

const Message = (msg: string, success: boolean) => {
    return (
        <div
            className={`${
                success ? "bg-green-500" : "bg-red-500"
            } py-2 px-4 rounded-lg text-white
                fixed bottom-4 right-4
            `}
        >
            {msg}
        </div>
    );
};

export function SendPost({
    contentBase,
    responseToBase,
    mediaDataBase,
    imgIdBase
}: {
    contentBase: string;
    responseToBase?: string;
    mediaDataBase?: { imgURL: string; alt: string; title: string };
    imgIdBase: string;
}) {
    const savePost = async (content: string, responseTo: string | any, imgId: string) => {
        console.log("Salvando post no banco de dados...");
        try {
            console.log(content, responseTo, imgId);

            const res = await fetch("/api/posts/new", {
                method: "POST",
                body: JSON.stringify({ content, responseTo, imgId }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.success) {
                        console.log("salvou");
                    } else {
                        console.log("deu ruim");
                    }
                });

            // if (!res.ok) {
            //     if (res.status === 403) {
            //         // setLoading(false);
            //     }
            //     return;
            // }
            // console.log(res.status);

            // setLoading(false);
        } catch (error: any) {
            // setLoading(false);
            console.error(error);
            // alert(error.message);
        }
    };

    const handleSave = async () => {
        await savePost(contentBase, responseToBase, imgIdBase);
    };



    return (
        <div>
            <button
                className={`
                        bg-gray-400 hover:bg-gray-500
                        transition
                        px-4 py-2
                        rounded-lg
                        text-gray-900
                        font-bold
                    `}
                onClick={() => {
                    handleSave();
                    console.log("salvando...");
                }}
            >
                Postar
            </button>
        </div>
    );
}


export function SendResponse({
    contentBase,
    responseToBase,
    mediaDataBase,
    imgIdBase,
    hasResponse,
    setHasResponse,
    setResponseSaved
}: {
    contentBase: string;
    responseToBase?: string;
    mediaDataBase?: { imgURL: string; alt: string; titleImg: string };
    imgIdBase: string;
    hasResponse: any;
    setHasResponse: Function;
    setResponseSaved: Function;
}) {
    const savePost = async (content: string, responseTo: string | any, imgId: string) => {
        console.log("Salvando post no banco de dados...");
        try {
            console.log(content, responseTo, imgId);

            const res = await fetch("/api/posts/new", {
                method: "POST",
                body: JSON.stringify({ content, responseTo, imgId }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.success) {
                        console.log("salvou");
                        setHasResponse([...hasResponse, data.post]);
                        console.log(hasResponse)
                        setResponseSaved(true);
                    } else {
                        console.log("deu ruim");
                    }
                });

        } catch (error: any) {
            console.error(error);
        }
    };

    const handleSave = async () => {
        await savePost(contentBase, responseToBase, imgIdBase);
    };



    return (
        <div>
            <button
                className={`
                    bg-neutral-300 rounded-full size-9 text-neutral-900 flex justify-center items-center
                    `}
                onClick={() => {
                    handleSave();
                    console.log("salvando...");
                }}
            >
                <GoArrowUp className="size-5" />
            </button>
        </div>
    );
}
