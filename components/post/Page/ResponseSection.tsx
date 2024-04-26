"use client";

import { useEffect, useState } from "react";
import ResponseTo from "./ResponseTo";
import { ResponseCard } from "../my/ResponseCard";

export default function ResponseSection ({ postId, responses }: { postId: string; responses: any }) {
    const [hasResponse, setHasResponse] = useState(responses);
    useEffect(() => {
        setHasResponse(responses);
    }, [responses]);


    return (
        <>
            <div className="responses w-full">
                {hasResponse && hasResponse.length > 0 ? (
                    <div className="responses">
                        {hasResponse.map((response: any) => (
                            <div key={response.id} className="response">
                                <ResponseCard post={response} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="w-full my-12 flex">
                        <h3 className="text-neutral-400 text-base m-auto">Nenhuma resposta aqui por enquanto...</h3>
                    </div>
                )}
            </div>
            <ResponseTo responseTo={postId} hasResponse={hasResponse} setHasResponse={setHasResponse} />
        </>
    );
}