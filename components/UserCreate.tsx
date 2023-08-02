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
            <input type="text" name="name" id="name" placeholder="seu nome" />
            <input type="text" name="username" id="username" placeholder="seu username" />
            <input type="text" name="mail" id="mail" placeholder="seu email" />
            <input type="password" name="password" id="password" />
            <button
                type="button"
                className="py-1 px-4 rounded-md bg-slate-600 text-gray-200"
                onClick={async () => {
                    const name = document.getElementById(
                        "name"
                    ) as HTMLInputElement;
                    const username = document.getElementById(
                        "username"
                    ) as HTMLInputElement;
                    const mail = document.getElementById(
                        "mail"
                    ) as HTMLInputElement;
                    const password = document.getElementById(
                        "password"
                    ) as HTMLInputElement;

                    await fetch(`/api/users`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            name: name.value,
                            username: username.value,
                            email: mail.value,
                            password: password.value,
                        }),
                    });
                    name.value = "";
                    username.value = "";
                    mail.value = "";
                    password.value = "";
                    router.refresh();
                }}
            >
                Criar +
            </button>
        </form>
    );
}
