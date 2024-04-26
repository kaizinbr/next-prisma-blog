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
                        bg-gray-200 hover:bg-gray-300
                        transition
                        p-2
                        rounded-lg
                        text-gray-900
                        flex flex-row items-center gap-2
                    `}
                onClick={() => {
                    handleSave();
                    console.log("curtiu");
                }}
            >
                <svg
                    fill="#444444"
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    id="repost-round"
                    data-name="Flat Line"
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon flat-line"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    transform="rotate(-90)"
                >
                    <path
                        id="primary"
                        d="M6.021 14.021V9.011A6.021 6.021 0 0 1 16.926 5.558"
                        style={{
                            fill: "none",
                            stroke: "#444444",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                        }}
                    />
                    <path
                        id="primary-2"
                        data-name="primary"
                        d="M17.979 9.979v5.011a6.021 6.021 0 0 1 -10.905 3.453"
                        style={{
                            fill: "none",
                            stroke: "#444444",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                        }}
                    />
                    <path
                        id="primary-3"
                        data-name="primary"
                        points="8 12 6 14 4 12"
                        style={{
                            fill: "none",
                            stroke: "#444444",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                        }}
                        d="M8 12 6.021 14.021 4 12"
                    />
                    <path
                        id="primary-4"
                        data-name="primary"
                        points="16 12 18 10 20 12"
                        style={{
                            fill: "none",
                            stroke: "#444444",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                        }}
                        d="M16 12 17.979 9.979l2.021 2.021"
                    />
                </svg>
                <span className="text-sm">300</span>
            </button>
        </div>
    );
}
