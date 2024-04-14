"use client";

import React, { useState } from "react";

export function RepostBtn({ postId }: string | any) {
    const savePost = async (postId: string) => {
        console.log("Salvando post no banco de dados...");
        try {

            const res = await fetch("/api/posts/repost", {
                method: "POST",
                body: JSON.stringify({ postId }),
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
        await savePost(postId);
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
                    console.log("curtiu");
                }}
            >
                retuítar
            </button>
        </div>
    );
}
