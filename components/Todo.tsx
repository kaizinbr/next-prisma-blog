"use client";

import { Todo } from "@prisma/client";
import { useRouter } from "next/navigation";

export function TodoComponent({ todo }: { todo: Todo }) {
    const router = useRouter();
    // console.log(todo);
    const update = async (todo: Todo) => {
        await fetch(`/api/todo`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                completed: !todo.completed,
                id: todo.id,
            }),
        });
        router.refresh();
    };

    return (
        <li key={todo.id} className="space-x-4">
            <input
                onChange={() => update(todo)}
                type="checkbox"
                checked={todo.completed}
            />
            {todo.title}
        </li>
    );
}

export function TodoCreate() {
    const router = useRouter();
    // console.log(todo);

    return (
        <form action="">
            <input type="text" name="title" id="title" placeholder="crie um" />
            <button
                type="button"
                className="py-1 px-4 rounded-md bg-slate-600 text-gray-200"
                onClick={async () => {
                    const title = document.getElementById(
                        "title"
                    ) as HTMLInputElement;
                    await fetch(`/api/todo`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            title: title.value,
                        }),
                    });
                    title.value = "";
                    router.refresh();
                }}
            >
                Criar +
            </button>
        </form>
    );
}
