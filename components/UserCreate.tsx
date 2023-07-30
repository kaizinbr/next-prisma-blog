"use client";
/* eslint-disable @next/next/no-img-element */

import { User } from "@prisma/client";
import { useRouter } from "next/navigation";

export default function UserCreate() {
    const router = useRouter();
    // console.log(todo);

    return (
        <form action="" className="flex flex-col gap-4">
            {/* <label htmlFor="title">Titulo</label> */}
            <input type="text" name="name" id="name" placeholder="username" />
            <input type="text" name="mail" id="mail" placeholder="email" />
            <button
                type="button"
                className="py-1 px-4 rounded-md bg-slate-600 text-gray-200"
                onClick={async () => {
                    const name = document.getElementById(
                        "name"
                    ) as HTMLInputElement;
                    const mail = document.getElementById(
                        "mail"
                    ) as HTMLInputElement;
                    await fetch(`/api/user`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            name: name.value,
                            email: mail.value,
                        }),
                    });
                    name.value = "";
                    mail.value = "";
                    router.refresh();
                }}
            >
                Criar +
            </button>
        </form>
    );
}
