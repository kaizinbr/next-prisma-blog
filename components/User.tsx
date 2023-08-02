"use client";
/* eslint-disable @next/next/no-img-element */


import { useRouter } from "next/navigation";
export default function User(user: any) {
    
    const router = useRouter();
    // console.log(user)
    // console.log(user.index)
    return (
        <div style={{ border: "1px solid #ccc", textAlign: "center" }}>
            <img
                src={`https://robohash.org/${user.index}?set=set2&size=180x180`}
                alt={user.name}
                style={{ height: 180, width: 180 }}
            />
            <h3>{user.user.name}</h3>
            <p>{user.user.email}</p>
            <p>{user.user.id}</p>
            <button 
                className="bg-red-300 cursor-pointer hover:text-neutral-200 hover:bg-red-500 transition-all"
                onClick={async () => {
                    await fetch(`/api/users`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            id: user.user.id,
                        }),
                    }); 
                    router.refresh();
                }}
            >
                excluir
            </button>
        </div>
    );
}
