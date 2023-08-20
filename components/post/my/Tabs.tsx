"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PostCard from "./PostCard";

export default function Tabs({ posts }: any) {
    // console.log(posts);
    const [activeTab, setActiveTab] = useState(0);

    const draftPosts = posts.filter((post: any) => !post.published);
    const publishedPosts = posts.filter((post: any) => post.published);
    // console.log(draftPosts);
    // console.log(publishedPosts);
    const tabs = ["Rascunhos", "Publicados"];

    useEffect(() => {
        setActiveTab(0);
    }, []);

    let drafts = <></>,
        publisheds = <></>;

    if (draftPosts.length === 0) {
        drafts = (
            <div className="text-gray-500">Nenhum rascunho encontrado</div>
        );
    } else {
        drafts = draftPosts.map((post: any) => (
            <PostCard key={post.id} post={post} />
        ));
    }

    if (publishedPosts.length === 0) {
        publisheds = (
            <div className="text-gray-500">Nenhum post publicado</div>
        );
    } else {
        publisheds = publishedPosts.map((post: any) => (
            <PostCard key={post.id} post={post} />
        ));
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
            <div className="flex flex-col gap-6 px-8">
                {/* <PostCard /> */}
                {activeTab === 0 ? drafts : publisheds}
                {/* {posts.map((post: any) => (
                        <div
                            key={post.id}
                            className="bg-white shadow overflow-hidden sm:rounded-lg col-span-3"
                        >
                            <div className="px-4 py-5 sm:px-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    {post.title}
                                </h3>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: post.subtitle!,
                                    }}
                                ></div>
                            </div>
                            <div className="px-4 py-4 sm:px-6">
                                <div className="text-sm text-gray-900">
                                    Created at {post.createdAt.toString()}
                                </div>
                            </div>
                        </div>
                    ))} */}
            </div>
        </div>
    );
}
