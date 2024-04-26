"use client";

import React, { useState } from "react";

export function CommentBtn({ postId }: string | any) {
    const savePost = async (postId: string) => {
        console.log("Salvando post no banco de dados...");
        try {
            const res = await fetch("/api/posts/like", {
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
        <div className="">
            <button
                className={`
                       hover:bg-gray-300
                        transition
                        p-2
                        rounded-lg
                        text-neutral-300
                        flex flex-row items-center gap-2
                    `}
                onClick={() => {
                    // handleSave();
                    // console.log("curtiu");
                }}
            >
                <svg
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M22.7912 12.25C22.7912 6.98327 18.5168 2.7088 13.25 2.7088C7.98327 2.7088 3.7088 6.98327 3.7088 12.25C3.7088 16.2846 6.21678 19.7303 9.74976 21.1261C9.74976 21.1261 9.79338 21.1479 9.82609 21.1588C10.2295 21.3115 10.6439 21.4423 11.0692 21.5405C14.5258 22.4455 18.6258 22.2819 20.5995 21.9548C21.1338 21.8567 21.341 21.3878 21.0684 20.908C20.774 20.3846 20.3596 19.7522 20.2833 19.1851C20.0325 17.2769 22.7912 16.0229 22.7803 12.3591C22.7803 12.3264 22.7803 12.2936 22.7803 12.2609L22.7912 12.25Z"
                        stroke="#d4d4d4"
                        strokeWidth="2.2"
                        strokeMiterlimit="10"
                    ></path>
                </svg>
                {/* preenchido */}
                <span className="text-sm">300</span>
            </button>
        </div>
    );
}
