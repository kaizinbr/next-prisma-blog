import React from "react";
import { prisma } from "@/lib/prisma";
import NewPost from "@/components/post/NewPost";

export default async function Post({ params }: { params: { id: string } }) {

    const postId = params.id;
    
    const POSTINFO = await prisma.post.findUnique({
        where: {
            id: `${params.id}`,
        },
        include: {
            comments: true,
        }
    });


    const authorData = await prisma.user.findUnique({
        where: {
            id: POSTINFO?.authorId!,
        },
    });

    const hasResponse = POSTINFO!.comments
    console.log(POSTINFO!.comments);


    return (
        <div className={`
            post-content flex flex-col justify-start items-center
        `}>
            <div className="max-w-3xl m-auto">
                <div 
                    className={`
                        flex flex-row justify-start gap-2 items-center mb-6
                        text-sm text-gray-500
                    `}
                >
                    <span>Criado {new Date (POSTINFO?.createdAt!).toLocaleDateString()}</span>
                    {"-"}
                    <span>Atualizado {new Date (POSTINFO?.updatedAt!).toLocaleDateString()}</span>
                    {"-"}
                    <span>Por {authorData?.name!}</span>
                </div>
                {/* <h2 dangerouslySetInnerHTML={subtitle}></h2> */}
                <div className={`
                    content
                    text-xl
                    lg:text-[1.076rem]
                    whitespace-pre-wrap mb-10
                `} 
                >
                    <p>{POSTINFO?.content}</p>
                </div>
                <NewPost responseTo={postId} />
                {hasResponse && (
                    <div className="responses">
                        <h3>Respostas</h3>
                        {hasResponse.map((response) => (
                            <div key={response.id} className="response">
                                <p>{response.content}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}