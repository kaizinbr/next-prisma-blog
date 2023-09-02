"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { TbTrash, TbSquareRoundedChevronRight } from "react-icons/tb";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useRef, useState, useContext } from "react";
import Context from "@/services/context";

export function MyPostCard(data: any) {
    const router = useRouter();
    const thisPost = useRef(null);

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
                    window.location.reload();
                    // setLoading(false);
                });
        } catch (error: any) {
            // setLoading(false);
            console.error(error);
            // alert(error.message);
        }
    };
    // const post = data.post;
    // console.log(post);
    const serifed = data.post.serifed ? "serifed" : "";
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
            ref={thisPost}
        >
            <div className="px-4 pt-5 pb-2 sm:px-6">
                <h3 className="text-lg mb-3 leading-6 displayBold text-gray-900">
                    {data.post.title}
                </h3>
                <div
                    className={
                        serifed +
                        `
                        text-sm text-gray-800
                    `
                    }
                    dangerouslySetInnerHTML={{
                        __html: data.post.subtitle!.slice(0, 200) + "...",
                    }}
                ></div>
            </div>
            <div
                className={`
                    flex flex-row gap-3 px-4 pt-2 pb-4 sm:px-6
                    text-xs text-gray-700
                `}
            >
                <div className="">
                    Criado em{" "}
                    {new Date(data.post.createdAt).toLocaleDateString()}
                </div>
                <span className="">|</span>
                <div className="">
                    Editado em{" "}
                    {new Date(data.post.updatedAt).toLocaleDateString()}
                </div>
            </div>
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
                        // deletePost(data.post.id, data.post.authorId);
                        deletePostCard(thisPost.current);
                    }}
                >
                    <TbTrash className="h-4 w-4" />
                </button>
                {data.post.published ? (
                    <button
                        className={`
                            flex flex-row gap-1 items-center
                            text-gray-700 py-2 px-3
                            bg-transparent hover:bg-indigo-300
                            rounded-md transition trasition-200 ease-in-out
                        `}
                    >
                        <Link href={`/post/${data.post.slug}`}>
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
                        router.push(`/post/my/edit/${data.post.id}`);
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
}

export function MyPostCardUp(data: any) {
    const router = useRouter();
    const thisPost = useRef(null);
    let totalContext = useContext(Context);
    const [total, setTotal] = useState(totalContext);

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
                    window.location.reload();
                    // setLoading(false);
                });
        } catch (error: any) {
            // setLoading(false);
            console.error(error);
            // alert(error.message);
        }
    };
    // const post = data.post;
    // console.log(post);
    const serifed = data.post.serifed ? "serifed" : "";
    return (
        <div
            className={`
                
                transition transition-300 delay-100 ease-in-out
                overflow-hidden
                sm:rounded-xl col-span-2
                min-[1144px]:col-span-1
                postcard
            `}
            ref={thisPost}
        >
            <div className="px-4 pt-5 pb-2 sm:px-6">
                <h3 className="text-lg mb-3 leading-6 displayBold text-gray-900">
                    {data.post.title}
                </h3>
                <div
                    className={
                        serifed +
                        `
                        text-sm text-gray-800
                    `
                    }
                    dangerouslySetInnerHTML={{
                        __html: data.post.subtitle!.slice(0, 200) + "...",
                    }}
                ></div>
            </div>
            <div
                className={`
                    flex flex-row gap-3 px-4 pt-2 pb-4 sm:px-6
                    text-xs text-gray-700
                `}
            >
                <div className="">
                    Criado em{" "}
                    {new Date(data.post.createdAt).toLocaleDateString()}
                </div>
                <span className="">|</span>
                <div className="">
                    Editado em{" "}
                    {new Date(data.post.updatedAt).toLocaleDateString()}
                </div>
                <div>
                <h3>{total}</h3>
                <button type="button" onClick={() => {
                    setTotal(total + 1)
                    console.log(total)
                }}>
                    Contador
                </button>
                </div>
            </div>
        </div>
    );
}

export function MyPostCardDown(data: any, setLoading: Function) {
    const router = useRouter();
    const thisPost = useRef(null);

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
                    window.location.reload();
                    // setLoading(false);
                });
        } catch (error: any) {
            // setLoading(false);
            console.error(error);
            // alert(error.message);
        }
    };
    // const post = data.post;
    // console.log(post);
    const serifed = data.post.serifed ? "serifed" : "";
    return (
        <div
            className={`
                
                overflow-hidden
                sm:rounded-xl col-span-2
                min-[1144px]:col-span-1
                postcard
            `}
            ref={thisPost}
        >
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
                        // deletePost(data.post.id, data.post.authorId);
                        // deletePostCard(thisPost.current);
                        setLoading(true);
                    }}
                >
                    <TbTrash className="h-4 w-4" />
                </button>
                {data.post.published ? (
                    <button
                        className={`
                            flex flex-row gap-1 items-center
                            text-gray-700 py-2 px-3
                            bg-transparent hover:bg-indigo-300
                            rounded-md transition trasition-200 ease-in-out
                        `}
                    >
                        <Link href={`/post/${data.post.slug}`}>
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
                        router.push(`/post/my/edit/${data.post.id}`);
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
}


export function DefPostCard(data: any) {
    const router = useRouter();
    // const post = data.post;
    // console.log(post);
    const serifed = data.post.serifed ? "serifed" : "";
    return (
        <Link
            href={`/post/${data.post.slug}`}
            className={`
                col-span-1
            `}
        >
            <div
                className={`
                    flex flex-col justify-between
                    bg-gray-50 border-2 border-transparent hover:border-gray-300/80
                    transition transition-300 delay-100 ease-in-out
                    overflow-hidden
                    sm:rounded-xl col-span-2
                    min-[1144px]:col-span-1
                    px-4 sm:px-6 py-6 gap-4
                    postcard
                `}
            >
                <div className="">
                    <h3 className="text-lg mb-3 leading-6 displayBold text-gray-900">
                        {data.post.title}
                    </h3>
                    <div
                        className={
                            serifed +
                            `
                            text-sm text-gray-800
                        `
                        }
                        dangerouslySetInnerHTML={{
                            __html: data.post.subtitle!.slice(0, 200) + "...",
                        }}
                    ></div>
                </div>
                <div
                    className={`
                        flex flex-row gap-3
                        text-xs text-gray-700
                    `}
                >
                    <div className="">
                        Criado em{" "}
                        {new Date(data.post.createdAt).toLocaleDateString()}
                    </div>
                    <span className="">|</span>
                    <div className="">
                        Editado em{" "}
                        {new Date(data.post.updatedAt).toLocaleDateString()}
                    </div>
                </div>
            </div>
        </Link>
    );
}
