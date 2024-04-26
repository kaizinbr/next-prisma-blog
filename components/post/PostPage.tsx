/* eslint-disable @next/next/no-img-element */
"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BiHeart } from "react-icons/bi";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { TbArrowForwardUp } from "react-icons/tb";
import { useRef, useState, useContext, useEffect } from "react";
import Context from "@/services/context";
import Image from "next/image";

import { GetAuthor } from "./my/GetAuthor";
import { LikeBtn } from "./btns/LikeBtn";
import { RepostBtn } from "./btns/RepostBtn";
import { CommentBtn } from "./btns/CommentBtn";
import { ResponsedCard } from "./my/ResponsedCard";

export function PostPage({ post, authorData }: { post: any; authorData: any }) {
    const router = useRouter();
    console.log(post);

    const img = post.images[0] ? true : false;

    let imagePreview;

    if (img) {
        imagePreview = (
            <picture className="flex flex-col gap-2 overflow-hidden aspect-square rounded-xl justify-center items-center border border-neutral-400/40">
                <Image
                    src={post.images[0].url}
                    alt={post.images[0].alt}
                    width={500}
                    height={500}
                    className="rounded-xl"
                />
            </picture>
        );
    }

    const [isLiked, setIsLiked] = useState(false);
    const [isReposted, setIsReposted] = useState(false);
    const [likesCount, setLikesCount] = useState(post.likesCount);
    const [repostsCount, setRepostsCount] = useState(post.reposts.length);

    let isResponse = false;
    let respData;
    
    if (post.responseId != null) {
        isResponse = true;
        respData = post.responseTo;
        console.log(respData)
    } else {
        isResponse = false
    };

    return (
        <div
            className={`
                w-full flex flex-col gap-3
                border-b border-neutral-800/80
                pb-4 md:pb-8 pt-0 md:pt-4
                px-4
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
                        px-0
                        postcard
                    `}
            >
                {isResponse && (
                    <ResponsedCard data={respData} />
                )}
                <div
                    className={` head
                        flex flex-row gap-3 items-center
                    
                    `}
                >
                    <Image
                        src={post.author.Profile.image}
                        alt="aaa"
                        className={`
                                h-11 w-11 rounded-full md:h-10 md:w-10 m-0
                                object-cover object-center
                            `}
                        width={44}
                        height={44}
                    />
                    <div className="flex flex-col gap-1">
                        <div className="flex flex-row gap-2 text-neutral-300">
                            <h3 className="md:text-sm text-base font-bold">
                                {post.author.name}
                            </h3>
                            <span className="md:text-sm text-base">
                                @{post.author.username}
                            </span>
                        </div>
                        <span className="text-xs">
                            {new Date(post.createdAt).toLocaleString()}
                        </span>
                    </div>
                </div>
                <div className="w-full content">
                    <span
                        className={`
                            content
                            text-base
                            lg:text-[1.076rem]
                            whitespace-pre-wrap mb-10
                            w-full text-wrap max-w-full break-words
                        `}
                    >
                        <p>{post.content}</p>
                    </span>
                </div>
                {img ? imagePreview : ""}
            </div>
            <div className="btns flex flex-row w-full px-4 md:px-0 gap-3">
                <LikeBtn
                    postId={post.id}
                    likesCount={likesCount}
                    setLikesCount={setLikesCount}
                    isLiked={isLiked}
                    setIsLiked={setIsLiked}
                />
                {/* <RepostBtn postId={post.id} /> */}
                <CommentBtn postId={post.id} />
            </div>
        </div>
    );
}
