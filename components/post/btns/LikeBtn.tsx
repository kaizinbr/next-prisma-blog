"use client";

import React, { useState } from "react";

export function LikeBtn({
    postId,
    likesCount,
    setLikesCount,
    isLiked,
    setIsLiked
}: {
    postId: string;
    likesCount: number;
    setLikesCount: Function;
    isLiked: boolean;
    setIsLiked: Function;
}) {
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

                        if (data.like) {
                            setLikesCount(likesCount + 1);
                            setIsLiked(true);
                        } else {
                            setLikesCount(likesCount - 1);
                            setIsLiked(false);
                        }

                        handleMessage(data.message);
                    } else {
                        handleMessage(data.message);
                    }
                });

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

    const HeartFill = (
        <svg width="26" height="26" xmlns="http://www.w3.org/2000/svg">
            <g className="layer">
                <title>Layer 1</title>
                <path
                    d="m9.75,20.59l0.52,-0.65l-0.52,0.65zm3.35,-14.78l-0.6,0.57c0.15,0.17 0.37,0.25 0.6,0.25c0.22,0 0.44,-0.09 0.6,-0.25l-0.6,-0.57zm3.35,14.78l0.51,0.65l-0.51,-0.65zm-6.18,-0.65c-1.68,-1.31 -3.51,-2.6 -4.95,-4.23c-1.42,-1.6 -2.41,-3.47 -2.41,-5.89l-1.65,0c0,2.93 1.22,5.18 2.83,6.99c1.58,1.77 3.58,3.2 5.16,4.43l1.03,-1.3zm-7.36,-10.12c0,-2.37 1.34,-4.37 3.16,-5.2c1.79,-0.8 4.17,-0.6 6.44,1.76l1.19,-1.15c-2.69,-2.8 -5.82,-3.25 -8.31,-2.12c-2.45,1.11 -4.13,3.71 -4.13,6.7l1.65,0zm6.34,11.42c0.56,0.44 1.17,0.91 1.79,1.28c0.61,0.36 1.31,0.65 2.07,0.65l0,-1.65c-0.34,0 -0.74,-0.13 -1.25,-0.43c-0.5,-0.29 -1.01,-0.68 -1.59,-1.15l-1.03,1.3zm7.72,0c1.58,-1.23 3.58,-2.66 5.16,-4.43c1.61,-1.81 2.83,-4.06 2.83,-6.99l-1.65,0c0,2.41 -0.99,4.29 -2.41,5.89c-1.44,1.63 -3.27,2.92 -4.95,4.23l1.03,1.3zm7.99,-11.42c0,-2.99 -1.69,-5.59 -4.13,-6.7c-2.49,-1.14 -5.62,-0.68 -8.31,2.12l1.19,1.15c2.27,-2.36 4.65,-2.57 6.44,-1.76c1.82,0.84 3.16,2.83 3.16,5.2l1.65,0zm-9.02,10.12c-0.57,0.46 -1.09,0.86 -1.59,1.15c-0.51,0.3 -0.9,0.43 -1.25,0.43l0,1.65c0.76,0 1.47,-0.29 2.07,-0.65c0.62,-0.36 1.22,-0.84 1.79,-1.28l-1.03,-1.3z"
                    fill="#d4d4d4"
                    id="svg_1"
                    stroke="#d4d4d4"
                    strokeMiterlimit="10"
                    strokeWidth="0.7"
                />
                <path
                    d="m2.36,6.8l-0.06,4.8l3.1,6l5,2.9l3.2,2l3.7,-3.1l3.1,-2.6l2.6,-3l0.7,-2c0,0 -0.24,-2.6 -0.24,-2.7c0,-0.1 0,-2 -0.06,-2.1c-0.06,-0.1 -1.24,-1.2 -1.3,-1.3c-0.06,-0.1 -1.14,-1.2 -1.2,-1.3c-0.06,-0.1 -1.74,-0.9 -1.8,-1c-0.06,-0.1 -1.84,0.1 -1.9,0c-0.06,-0.1 -1.54,0.9 -1.6,0.8c-0.06,-0.1 -1.94,1.3 -2,1.2c-0.06,-0.1 -1.44,-0.4 -1.5,-0.5c-0.06,-0.1 -1.24,-0.9 -1.3,-1c-0.06,-0.1 -2.84,0 -2.9,-0.1c-0.06,-0.1 -2.14,0 -2.2,-0.1c-0.06,-0.1 -1.34,1.7 -1.4,1.6c-0.06,-0.1 -1.94,1.5 -1.94,1.5z"
                    fill="#d4d4d4"
                    id="svg_4"
                    stroke="#d4d4d4"
                />
            </g>
        </svg>
    );

    const HeartOutline = (
        <svg width="26" height="26" xmlns="http://www.w3.org/2000/svg">
                    <g className="layer">
                        <title>Layer 1</title>
                        <path
                            d="m9.75,20.59l0.52,-0.65l-0.52,0.65zm3.35,-14.78l-0.6,0.57c0.15,0.17 0.37,0.25 0.6,0.25c0.22,0 0.44,-0.09 0.6,-0.25l-0.6,-0.57zm3.35,14.78l0.51,0.65l-0.51,-0.65zm-6.18,-0.65c-1.68,-1.31 -3.51,-2.6 -4.95,-4.23c-1.42,-1.6 -2.41,-3.47 -2.41,-5.89l-1.65,0c0,2.93 1.22,5.18 2.83,6.99c1.58,1.77 3.58,3.2 5.16,4.43l1.03,-1.3zm-7.36,-10.12c0,-2.37 1.34,-4.37 3.16,-5.2c1.79,-0.8 4.17,-0.6 6.44,1.76l1.19,-1.15c-2.69,-2.8 -5.82,-3.25 -8.31,-2.12c-2.45,1.11 -4.13,3.71 -4.13,6.7l1.65,0zm6.34,11.42c0.56,0.44 1.17,0.91 1.79,1.28c0.61,0.36 1.31,0.65 2.07,0.65l0,-1.65c-0.34,0 -0.74,-0.13 -1.25,-0.43c-0.5,-0.29 -1.01,-0.68 -1.59,-1.15l-1.03,1.3zm7.72,0c1.58,-1.23 3.58,-2.66 5.16,-4.43c1.61,-1.81 2.83,-4.06 2.83,-6.99l-1.65,0c0,2.41 -0.99,4.29 -2.41,5.89c-1.44,1.63 -3.27,2.92 -4.95,4.23l1.03,1.3zm7.99,-11.42c0,-2.99 -1.69,-5.59 -4.13,-6.7c-2.49,-1.14 -5.62,-0.68 -8.31,2.12l1.19,1.15c2.27,-2.36 4.65,-2.57 6.44,-1.76c1.82,0.84 3.16,2.83 3.16,5.2l1.65,0zm-9.02,10.12c-0.57,0.46 -1.09,0.86 -1.59,1.15c-0.51,0.3 -0.9,0.43 -1.25,0.43l0,1.65c0.76,0 1.47,-0.29 2.07,-0.65c0.62,-0.36 1.22,-0.84 1.79,-1.28l-1.03,-1.3z"
                            fill="#d4d4d4"
                            id="svg_1"
                            stroke="#d4d4d4"
                            strokeMiterlimit="10"
                            strokeWidth="0.7"
                        />
                    </g>
                </svg>
    )

    return (
        <div className="">
            <button
                className={`
                        hover:bg-neutral-700
                        transition
                        p-2
                        rounded-lg
                        text-neutral-200
                        flex flex-row items-center gap-2
                    `}
                onClick={() => {
                    handleSave();
                    console.log("curtiu");
                }}
            >
                
                {isLiked ? HeartFill : HeartOutline}

                <span className="text-sm">{likesCount}</span>
            </button>
        </div>
    );
}
