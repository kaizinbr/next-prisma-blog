"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export function CheckFollow(userId: any) {
    const [follow, setFollow] = useState(false);

    useEffect(() => {
        const doIFollow = async () => {
            console.log(userId);
            let res;
            await fetch(`/api/follow?id=${userId.userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                res = data;
                setFollow(res.follow);
            });


        }
        doIFollow();
    }, []);

    const router = useRouter();

    return (
        <div>
            {follow ? <UnFollowBtn myId={userId.userId} userId={userId.userId} /> : <FollowBtn myId={userId.userId} userId={userId.userId} />}
            </div>
    );
}

function FollowBtn(myId: any, userId: any) {
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        if (isClicked) {
            fetch(`/api/follow`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: myId.userId,
                }),
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            });
        }
    }, [isClicked]);

    return (
        <button 
                className="bg-red-300 px-4 py-2 rounded-md cursor-pointer hover:text-neutral-200 hover:bg-red-500 transition-all"
                onClick={() => setIsClicked(true)}
            >
                Seguir
            </button>
    );
}


function UnFollowBtn(myId: any, userId: any) {
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        if (isClicked) {
            fetch(`/api/follow`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: myId.userId,
                }),
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            });
        }
    }, [isClicked]);

    return (
        <button 
                className="bg-red-300 px-4 py-2 rounded-md cursor-pointer hover:text-neutral-200 hover:bg-red-500 transition-all"
                onClick={() => setIsClicked(true)}
            >
                Deixar de seguir
            </button>
    );
}