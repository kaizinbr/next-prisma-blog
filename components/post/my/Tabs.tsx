"use client";
import React, { useState, useEffect, ReactElement } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MyPostCard, MyPostCardUp, MyPostCardDown } from "./PostCard";
import Loading from "@/components/Loading";
import Link from "next/link";
import { TbTrash, TbSquareRoundedChevronRight } from "react-icons/tb";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import getMyPosts from "@/services/usePostInfo";

export default function Tabs({ posts1 }: any) {
    // const { data: session, status } = useSession()
    const [activeTab, setActiveTab] = useState(0);

    const [loading, setLoading] = useState(false);
    const handleLoading = (value: boolean) => {
        setLoading(value);
    };
    const tabs = ["Rascunhos", "Publicados"];

    const [draftPosts, setDraftPosts] = useState([]);
    const [publishedPosts, setPublishedPosts] = useState([]);
    const getPosts = async () => {
        const posts = await getMyPosts(id);
        setDraftPosts(posts.filter((post: any) => !post.published));
        setPublishedPosts(posts.filter((post: any) => post.published));
    };

    const id = "cllst1yms0000v32kcgtxqokn";
    useEffect(() => {
        setActiveTab(0);

        // if (session) {
        getPosts();
        // }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const router = useRouter();
    // const thisPost = useRef(null);

    function deletePostCard(e: any) {
        const item = e;
        console.log(item);
        item.classList.add("hidden");
    }

    const deletePost = async (postId: string, authorId: string) => {
        console.log("Atualizando post no banco de dados...");
        try {
            const res = await fetch("/api/posts/new", {
                method: "DELETE",
                body: JSON.stringify({ postId, authorId }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    // window.location.reload();
                    getPosts();
                    setLoading(false);
                });
        } catch (error: any) {
            // setLoading(false);
            console.error(error);
            // alert(error.message);
        }
    };
    // const post = data.post;
    // console.log(post);

    let drafts, publisheds;

    if (draftPosts.length === 0) {
        drafts = (
            <div className="text-gray-500">Nenhum rascunho encontrado</div>
        );
    } else {
        drafts = draftPosts.map((post: any) => {
            return (
                <div
                    className={`
                            bg-gray-50 shadow-lg shadow-transparent hover:shadow-violet-300/50 
                            transition transition-300 delay-100 ease-in-out
                            overflow-hidden
                            sm:rounded-xl col-span-2
                            min-[1144px]:col-span-1
                            postcard
                        `}
                    key={post.id}
                >
                    <MyPostCardUp post={post} />
                    <div
                        className={`
                                flex flex-row gap-2 justify-end
                                px-4 py-2 sm:px-6
                                text-base text-gray-700
                                border-t border-gray-200
                            `}
                    >
                        <button
                            className={`
                                    flex flex-row gap-1 items-center
                                    text-gray-700 py-2 px-3
                                    bg-transparent hover:bg-red-300
                                    rounded-md transition trasition-200 ease-in-out
                                `}
                            onClick={(e) => {
                                setLoading(true);
                                deletePost(post.id, post.authorId);
                                // deletePostCard(thisPost.current);
                            }}
                        >
                            <TbTrash className="h-4 w-4" />
                        </button>
                        {post.published ? (
                            <button
                                className={`
                            flex flex-row gap-1 items-center
                            text-gray-700 py-2 px-3
                            bg-transparent hover:bg-indigo-300
                            rounded-md transition trasition-200 ease-in-out
                        `}
                            >
                                <Link href={`/post/${post.slug}`}>
                                    <span className="flex flex-row items-center">
                                        Ver publicação
                                    </span>
                                </Link>
                            </button>
                        ) : (
                            ""
                        )}
                        <button
                            className={`
                                    flex flex-row gap-1 items-center
                                    text-gray-700 py-2 pl-4 pr-2
                                    bg-transparent hover:bg-violet-300
                                    rounded-md transition trasition-200 ease-in-out
                                `}
                            onClick={() => {
                                router.push(`/post/my/edit/${post.id}`);
                            }}
                        >
                            <span className="flex flex-row items-center">
                                Editar
                                <MdOutlineKeyboardArrowRight className="h-5 w-5" />
                            </span>
                        </button>
                    </div>
                </div>
            );
        });
    }

    if (publishedPosts.length === 0) {
        publisheds = <div className="text-gray-500">Nenhum post publicado</div>;
    } else {
        publisheds = publishedPosts.map((post: any) => {
            return (
                <div
                    className={`
                        bg-gray-50 shadow-lg shadow-transparent hover:shadow-violet-300/50 
                        transition transition-300 delay-100 ease-in-out
                        overflow-hidden
                        sm:rounded-xl col-span-2
                        min-[1144px]:col-span-1
                        postcard
                    `}
                    key={post.id}
                >
                    <MyPostCardUp post={post} />
                    <div
                        className={`
                            flex flex-row gap-2 justify-end
                            px-4 py-2 sm:px-6
                            text-base text-gray-700
                            border-t border-gray-200
                        `}
                    >
                        <button
                            className={`
                                flex flex-row gap-1 items-center
                                text-gray-700 py-2 px-3
                                bg-transparent hover:bg-red-300
                                rounded-md transition trasition-200 ease-in-out
                            `}
                            onClick={(e) => {
                                setLoading(true);
                                deletePost(post.id, post.authorId);
                                // deletePostCard(thisPost.current);
                            }}
                        >
                            <TbTrash className="h-4 w-4" />
                        </button>
                        {post.published ? (
                            <button
                                className={`
                        flex flex-row gap-1 items-center
                        text-gray-700 py-2 px-3
                        bg-transparent hover:bg-indigo-300
                        rounded-md transition trasition-200 ease-in-out
                    `}
                            >
                                <Link href={`/post/${post.slug}`}>
                                    <span className="flex flex-row items-center">
                                        Ver publicação
                                    </span>
                                </Link>
                            </button>
                        ) : (
                            ""
                        )}
                        <button
                            className={`
                                flex flex-row gap-1 items-center
                                text-gray-700 py-2 pl-4 pr-2
                                bg-transparent hover:bg-violet-300
                                rounded-md transition trasition-200 ease-in-out
                            `}
                            onClick={() => {
                                router.push(`/post/my/edit/${post.id}`);
                            }}
                        >
                            <span className="flex flex-row items-center">
                                Editar
                                <MdOutlineKeyboardArrowRight className="h-5 w-5" />
                            </span>
                        </button>
                    </div>
                </div>
            );
        });
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-center flex-row">
                {tabs.map((tab: any, index: any) => (
                    <div
                        key={index}
                        className={`px-4 py-2 cursor-pointer ${
                            activeTab === index
                                ? "bg-gray-200 text-gray-900"
                                : "text-gray-500"
                        }`}
                        onClick={() => setActiveTab(index)}
                    >
                        {tab}
                    </div>
                ))}
            </div>
            <div
                className={`
                grid grid-cols-2 gap-6
            `}
            >
                {activeTab === 0 ? drafts : publisheds}
            </div>
            {loading && (
                <div
                    className={`
                fixed top-0 left-0
                w-full h-full
                bg-gray-900 bg-opacity-50
                flex justify-center items-center
                z-50
            `}
                >
                    <div
                        className={`
                        bg-white
                        rounded-lg
                        py-4 px-9
                    `}
                    >
                        <Loading />
                    </div>
                </div>
            )}
        </div>
    );
}
