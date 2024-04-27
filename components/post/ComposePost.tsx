"use client";

import React, { useRef, useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { SendPost } from "./tools/SendPost";
import { ImgUpload } from "./toolbar/imgUpload";
import Image from "next/image";
import PageHeader from "@/components/post/compose/PageHeader";
import { GoArrowUp, GoFileMedia, GoX } from "react-icons/go";
import PageFooter from "./compose/PageFooter";

export default function ComposePost({ responseTo }: { responseTo?: string }) {
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
    const [alt, setAlt] = useState<string>("")    
    const [title, setTitle] = useState<string>("")

    const mediaData = {imgURL, alt, title}

    const handleInputChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        // if (event.target.value.length <= 300) {
            setPostContent(event.target.value);
        // }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMedia(event.target.files ? event.target.files[0] : null);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Aqui você pode adicionar a lógica para enviar os dados para o banco de dados Prisma
    };

    // const [title, setTitle] = useState("");
    const titleRef = useRef<HTMLTextAreaElement>(null);
    const resizeTextArea = () => {
        // https://codesandbox.io/s/textarea-auto-resize-react-hngvd?file=/src/index.js:135-225
        if (titleRef.current !== null) {
            titleRef.current.style.height = "128px";
            titleRef.current.style.height = titleRef.current.scrollHeight + "px"
        }
    };

    useEffect(resizeTextArea, [postContent]);

    
    const { data: session, status } = useSession();
    console.log(session);
    return (
        <>
            <PageHeader  contentBase={postContent} responseToBase={responseTo} imgIdBase={imgId}  />
            <div>
                <div className={`
                    flex flex-row items-start space-x-2
                    p-3
                    rounded-md
                    transition duration-300
                `}>
                        <Image
                            src={session?.user?.image || ""}
                            alt="aaa"
                            className={`
                                    h-11 w-11 rounded-full md:h-10 md:w-10 m-0
                                    object-cover object-center
                                `}
                            width={44}
                            height={44}
                        />
                
                    <form onSubmit={handleSubmit}
                        className="flex flex-col w-full"
                    >
                        <textarea
                            value={postContent}
                            ref={titleRef}
                            onChange={handleInputChange}
                            placeholder="Diga mais..."
                            className={`
                                w-full h-32 p-2
                                bg-transparent text-lg
                                focus:outline-none
                                transition duration-300
                                resize-none
                            `}
                        />
                    
                    </form>
                </div>

                <div
                    className={`
                        flex flex-row items-end justify-end space-x-2
                        p-4 pb-7
                        rounded-md
                        transition duration-300
                    `}
                >
                    <div>
                        {imgURL && (
                            <picture className="flex relative w-28 h-28 border-neutral-600/80 rounded-xl overflow-hidden">
                                <Image
                                    src={imgURL}
                                    alt="media"
                                    className="w-28 h-28 object-cover"
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
            <PageFooter chrLenght={postContent.length} setImgUpload={setImgUpload}/>
        </>
    );
}
