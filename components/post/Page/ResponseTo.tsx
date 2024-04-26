"use client";

import React, { useEffect, useRef, useState } from "react";
import { SendPost, SendResponse } from "@/components/post/tools/SendPost";
import { ImgUpload } from "@/components/post/toolbar/imgUpload";
import Image from "next/image";
import { GoArrowUp, GoFileMedia, GoX } from "react-icons/go";

export default function ResponseTo({
    responseTo,
    hasResponse,
    setHasResponse,
}: {
    responseTo?: string;
    hasResponse: any;
    setHasResponse: any;
}) {
    const [postContent, setPostContent] = useState("");
    const [media, setMedia] = useState<File | null>(null);
    const [imgUpload, setImgUpload] = useState(false);
    const [imgURL, setImgURL] = useState("");
    const [imgId, setImgId] = useState("");
    const [progressPorcent, setPorgessPorcent] = useState(0);
    const [saving, setSaving] = useState(false);
    const [url, setUrl] = useState("");
    const altRef = useRef<HTMLTextAreaElement>(null);
    const subtitleRef = useRef<HTMLTextAreaElement>(null);
    const [alt, setAlt] = useState<string>("");
    const [titleImg, setTitleImg] = useState<string>("");

    const mediaData = { imgURL, alt, titleImg };

    const handleInputChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        if (event.target.value.length <= 300) {
            setPostContent(event.target.value);
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMedia(event.target.files ? event.target.files[0] : null);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Aqui você pode adicionar a lógica para enviar os dados para o banco de dados Prisma
    };

    // resize automatico da textarea
    const [title, setTitle] = useState("");
    const titleRef = useRef<HTMLTextAreaElement>(null);
    const resizeTextArea = () => {
        // https://codesandbox.io/s/textarea-auto-resize-react-hngvd?file=/src/index.js:135-225
        if (titleRef.current !== null) {
            titleRef.current.style.height = "48px";
            titleRef.current.style.height =
                titleRef.current.scrollHeight < 168
                    ? titleRef.current.scrollHeight + "px"
                    : "168px";
        }
    };

    useEffect(resizeTextArea, [postContent]);

    
    const [responseSaved, setResponseSaved] = useState(false);

    useEffect(() => {
        if (responseSaved) {
            setPostContent("");
            setImgURL("");
            setImgId("");
            setResponseSaved(false);
        }
    }, [responseSaved]);

    return (
        <div className="relative">
            <div
                className={`
                    flex flex-col
                    fixed right-0 left-0 bottom-0
                    bg-default
                    mt-4
                    border-t border-neutral-800/80 backdrop-blur-lg
                    pt-4
                    transition
                `}
            >
                <div className="flex px-4">
                    {imgURL && (
                        <picture className="flex relative w-28 h-28 rounded-lg overflow-hidden">
                            <Image
                                src={imgURL}
                                alt="media"
                                className="w-28 h-28 rounded-lg border border-neutral-600/80 object-cover"
                                width={112}
                                height={112}
                            />
                            <span
                                onClick={() => {
                                    setImgURL("");
                                    setImgId("");
                                }}
                                className="flex absolute right-1 top-1 justify-center items-center size-5 rounded-full bg-neutral-800"
                            >
                                <GoX className="size-4" />
                            </span>
                        </picture>
                    )}
                </div>
                <form
                    onSubmit={handleSubmit}
                    className={`
                        flex flex-row justify-between items-center
                        w-full
                        px-4 py-3
                    `}
                >
                    <textarea
                        value={postContent}
                        onChange={handleInputChange}
                        ref={titleRef}
                        placeholder="What's happening?"
                        className={`
                            w-9/12 h-12 rounded-[24px]
                            text-neutral-200 bg-neutral-600/80
                            resize-none
                            outline-none
                            border-b border-neutral-800
                            py-2 px-4
                        `}
                    />
                    {/* <input type="file" onChange={handleFileChange} /> */}
                    <button
                        className={`
                                md:h-8 md:w-8
                                hover:bg-gray-200 cursor-pointer
                                transition duration-300 delay-100
                                rounded-full size-9  flex justify-center items-center
            
                            `}
                        onClick={() => {
                            setImgUpload(true);
                        }}
                    >
                        <GoFileMedia className="size-5" />
                    </button>
                    <SendResponse
                        contentBase={postContent}
                        responseToBase={responseTo}
                        mediaDataBase={mediaData}
                        imgIdBase={imgId}
                        hasResponse={hasResponse}
                        setHasResponse={setHasResponse}
                        setResponseSaved={setResponseSaved}
                    />
                </form>
            </div>
            {imgUpload &&
                ImgUpload(
                    setImgUpload,
                    setImgURL,
                    setImgId,
                    imgURL,
                    setPorgessPorcent,
                    progressPorcent,
                    alt,
                    setAlt,
                    title,
                    setTitle,
                    altRef,
                    subtitleRef,
                    saving,
                    setSaving
                )}
        </div>
    );
}
