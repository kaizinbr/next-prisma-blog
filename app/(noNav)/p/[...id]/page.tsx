import React from "react";
import { prisma } from "@/lib/prisma";
import NewPost from "@/components/post/NewPost";
import { PostPage } from "@/components/post/PostPage";
import PostHeader from "@/components/post/Page/PostHeader";
import ResponseTo from "@/components/post/Page/ResponseTo";
import ResponseSection from "@/components/post/Page/ResponseSection";

export default async function Post({ params }: { params: { id: string } }) {
    const postId = params.id;

    const POSTINFO = await prisma.post.findUnique({
        where: {
            id: `${params.id}`,
        },
        include: {
            comments: {
                include: {
                    images: true,
                    reposts: true,
                    author: {
                        include: {
                            Profile: true,
                        },
                    },
                }
            },
            images: true,
            reposts: true,
            author: {
                include: {
                    Profile: true,
                },
            },
            responseTo: {
                include: {
                    images: true,
                    author: {
                        include: {
                            Profile: true,
                        },
                    },
                }
            }
        },
    });

    const authorData = await prisma.user.findUnique({
        where: {
            id: POSTINFO?.authorId!,
        },
    });

    const hasResponse = POSTINFO!.comments;
    // console.log(hasResponse);

    return (
        <div
            className={`
                post-content flex flex-col justify-start items-center mb-28
            `}
        >
            <section>
                <PostHeader />
            </section>
            <section className="md:max-w-3xl max-w-full w-full m-auto mt-4  py-3">
                <PostPage post={POSTINFO} authorData={authorData} />
            </section>
            <section className="w-full">
                <ResponseSection
                    postId={postId}
                    responses={POSTINFO!.comments}
                />
            </section>
        </div>
    );
}
