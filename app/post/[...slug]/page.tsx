import React from "react";
import { prisma } from "@/lib/prisma";

export default async function Post({ params }: { params: { slug: string } }) {
    
    const postInfo = await prisma.post.findUnique({
        where: {
            slug: `${params.slug}`,
        },
    });

    const authorData = await prisma.user.findUnique({
        where: {
            id: postInfo?.authorId!,
        },
    });


    // console.log(postInfo);

    const subtitle = { __html: postInfo?.subtitle!};
    // let contentStr = postInfo?.html!.replace('className=', 'class=');
    // const content = { __html: (postInfo?.html!).replaceAll('className=', 'class=')};
    
    // console.log(postInfo);
    const serifed = postInfo?.serifed ? "serifed" : "";

    
    return (
        <div className={ serifed + `
            post-content flex flex-col justify-start items-center
        `}>
            <div className="max-w-3xl m-auto">
                <h1 className="mb-6">{postInfo?.title}</h1>
                <div 
                    className={`
                        flex flex-row justify-start gap-2 items-center mb-6
                        text-sm text-gray-500
                    `}
                >
                    <span>Criado {new Date (postInfo?.createdAt!).toLocaleDateString()}</span>
                    {"-"}
                    <span>Atualizado {new Date (postInfo?.updatedAt!).toLocaleDateString()}</span>
                    {"-"}
                    <span>Por {authorData?.name!}</span>
                </div>
                {/* <h2 dangerouslySetInnerHTML={subtitle}></h2> */}
                {/* <div className={`
                    content
                    lg:text-[1.076rem]
                `} dangerouslySetInnerHTML={content}></div> */}
            </div>
        </div>
    )
}