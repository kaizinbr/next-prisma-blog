"use client";

import React, { useState } from "react";

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

export function SendPost({ content, responseTo }: string | any) {
    const savePost = async (content: string) => {
        console.log("Salvando post no banco de dados...");
        try {
            console.log("Calmaí, precisamos converter rapidinho...");
            const html = convertContent(content);
            console.log("Convertido! Enviando para o servidor...", html);

            const res = await fetch("/api/posts/new", {
                method: "POST",
                body: JSON.stringify({ content, responseTo }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.success) {
                        console.log("salvou");
                        // setExists(true);
                        // setPostId(data.post.id);
                        // setAuthorId(data.post.authorId);
                        handleMessage(data.message);
                    } else {
                        handleMessage(data.message);
                    }
                    // setLoading(false);
                    // setShowMessage(true);
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
        // setLoading(true);

        // exists
        await savePost(content);
        // : await savePost(json, html, title, serifed);
    };

    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState("");
    const [confirm, setConfirm] = useState(false);

    const handleMessage = (msg: string) => {
        setMessage(msg);
        setShowMessage(true);
        setTimeout(() => {
            setShowMessage(false);
        }, 3000);
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
                        mr-4
                    `}
                onClick={() => {
                    handleSave();
                    console.log("salvando...");
                }}
            >
                Salvar
            </button>
        </div>
    );
}
