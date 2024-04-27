"use client";
import React, { useState, useEffect } from "react";
import { GoChevronLeft, GoKebabHorizontal, GoX } from "react-icons/go";
import { PiShareFat } from "react-icons/pi";
import { useRouter } from "next/navigation";
import { SendPost } from "../tools/SendPost";

export default function PageHeader({
    contentBase,
    responseToBase,
    imgIdBase,
}: {
    contentBase: string;
    responseToBase: any;
    imgIdBase: any;
}) {
    const router = useRouter();

    const [backClicked, setBackClicked] = useState(false);
    const [shareClicked, setShareClicked] = useState(false);
    const [moreOptionsClicked, setMoreOptionsClicked] = useState(false);

    useEffect(() => {
        if (backClicked) {
            console.log("Voltar clicado");
            setBackClicked(false);
        }
        if (shareClicked) {
            console.log("Compartilhar clicado");
            setShareClicked(false);
        }
        if (moreOptionsClicked) {
            console.log("Mais opções clicado");
            setMoreOptionsClicked(false);
        }
    }, [backClicked, shareClicked, moreOptionsClicked]);

    return (
        <div
            className={`
            fixed top-3 left-3 right-3 z-10 shadow-md px-3
            backdrop-blur-lg
            rounded-xl 
            transition-transform duration-300 md:translate-y-full translate-y-0
            bg-neutral-800/80 border border-neutral-700/40
        `}
        >
            <div className={`flex justify-between py-3`}>
                <div className="flex flex-row items-center">
                    <button onClick={() => router.back()}>
                        <GoX className="size-6" />
                    </button>
                    <h1 className="inline text-base font-medium ml-3">
                        Novo post
                    </h1>
                </div>
                <div className="flex flex-row items-center">
                    <SendPost
                        contentBase={contentBase}
                        responseToBase={responseToBase}
                        imgIdBase={imgIdBase}
                    />
                </div>
            </div>
        </div>
    );
}
