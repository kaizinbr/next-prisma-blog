/* eslint-disable @next/next/no-img-element */
"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BiHeart } from "react-icons/bi";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useRef, useState, useContext, useEffect } from "react";
import Context from "@/services/context";
import Image from "next/image";

import { GetAuthor } from "./GetAuthor";
import { LikeBtn } from "../btns/LikeBtn";
import { RepostBtn } from "../btns/RepostBtn";
import { CommentBtn } from "../btns/CommentBtn";

export function DefPostCard(data: any) {
    const router = useRouter();
    console.log(data);

    const img = data.post.images[0] ? true : false;

    let imagePreview;

    if (img) {
        imagePreview = (
            <picture className="flex flex-col gap-2 overflow-hidden aspect-square rounded-xl justify-center items-center">
                <Image
                    src={data.post.images[0].url}
                    alt={data.post.images[0].alt}
                    width={500}
                    height={500}
                    className="rounded-xl"
                />
            </picture>
        );
    }

    

    const [isLiked, setIsLiked] = useState(false);
    const [isReposted, setIsReposted] = useState(false);
    const [likesCount, setLikesCount] = useState(data.post.likesCount);
    const [repostsCount, setRepostsCount] = useState(data.post.reposts.length);

    let isResponse = false;
    let respData;
    
    if (data.post.responseId != null) {
        isResponse = true;
        respData = data.post.responseTo;
    } else {
        isResponse = false
    };
    console.log(isResponse, "é resposta");

    return (
        <div
            className={`
                w-full flex flex-col gap-3
                 border-b border-neutral-800/80
                pb-4 md:pb-8 pt-0 md:pt-4
            `}
        >
            <Link
                href={`/p/${data.post.id}`}
                className={`
                    col-span-1
                `}
            >
            <div
                className={`
                        flex flex-col justify-between
                        border-2 border-transparent 
                        transition transition-300 delay-100 ease-in-out
                        overflow-hidden
                        rounded-xl 
                        w-full
                        gap-4
                        px-4 md:px-0
                        postcard
                    `}
            >
                {isResponse ? (
                    <div
                        className={`
                            flex flex-row gap-3 items-center
                            text-neutral-400 text-sm py-1 px-2 rounded-md 
                        `}
                    >
                        {/* <MdOutlineKeyboardArrowRight className="text-2xl" /> */}
                        <p className="">Respondendo a <span>@{respData.author.username}</span></p>
                    </div>
                ) : (
                    ""
                )}
                <div
                    className={` head
                        flex flex-row gap-3 items-center
                    
                    `}
                >
                    <Image
                        src={data.post.author.Profile.image}
                        alt="aaa"
                        className={`
                                h-11 w-11 rounded-full md:h-10 md:w-10
                                object-cover object-center
                            `}
                        width={44}
                        height={44}
                    />
                    <div className="flex flex-col gap-1">
                        <div className="flex flex-row gap-2">
                            <h3 className="md:text-sm text-base font-bold text-neutral-300">
                                {data.post.author.name}
                            </h3>
                            <span className="md:text-sm text-base text-neutral-300">
                                @{data.post.author.username}
                            </span>
                        </div>
                        <span className="text-xs text-neutral-300">
                            {new Date(data.post.createdAt).toLocaleString()}
                        </span>
                    </div>
                </div>
                <div className="w- ml-14 flex flex-col gap-3">
                    <span className="text-base displayBold text-neutral-300 whitespace-pre-wrap text-wrap max-w-full break-words">
                        {data.post.content}
                    </span>
                {img ? imagePreview : ""}
                </div>
            </div>
            </Link>
            <div className="flex flex-row ml-12 px-4 md:px-0 gap-3">
                <LikeBtn
                    postId={data.post.id}
                    likesCount={likesCount}
                    setLikesCount={setLikesCount}
                    isLiked={isLiked}
                    setIsLiked={setIsLiked}
                />
                {/* <RepostBtn postId={data.post.id} /> */}
                <CommentBtn postId={data.post.id} />
            </div>
        </div>
    );
}
