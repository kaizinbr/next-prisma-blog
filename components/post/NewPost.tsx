"use client";

import React, { useRef, useState } from "react";
import { SendPost } from "./tools/SendPost";
import { ImgUpload } from "./toolbar/imgUpload";
import Image from "next/image";

export default function NewPost({ responseTo }: { responseTo?: string }) {
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

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={postContent}
                    onChange={handleInputChange}
                    placeholder="What's happening?"
                />
                {/* <input type="file" onChange={handleFileChange} /> */}
                <button type="submit">Post</button>
            </form>
            <button
                className={`
                                md:h-8 md:w-8 w-11 h-11 flex justify-center items-center rounded-md
                                hover:bg-gray-200 cursor-pointer
                                transition duration-300 delay-100
                            `}
                onClick={() => {
                    setImgUpload(true);
                }}
            >
                foto
            </button>
            <div>
                {imgURL && (
                    <Image
                        src={imgURL}
                        alt="media"
                        className="w-1/4"
                        width={400}
                        height={400}
                    />
                )}
            </div>
            <p>{300 - postContent.length} characters remaining</p>
            <SendPost contentBase={postContent} responseToBase={responseTo} imgIdBase={imgId} />

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
