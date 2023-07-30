import React from "react";
import { prisma } from "../lib/prisma";
import User from "@/components/User";

// export const getStaticProps: GetStaticProps = async () => {
//     const feed = await prisma.post.findMany({
//         where: {
//             published: true,
//         },
//         include: {
//             author: {
//                 select: {
//                     name: true,
//                 },
//             },
//         },
//     });
//     return {
//         props: { feed },
//         revalidate: 10,
//     };
// };

// type Props = {
//     feed: PostProps[];
// };

import { TodoComponent, TodoCreate } from "@/components/Todo";
import UserCreate from "@/components/UserCreate";

export default async function Home() {
    const users = await prisma.user.findMany();
    const todos = await prisma.todo.findMany();
    return (
        <main className="flex flex-row gap-8">
            <div className="left">
                <h1 className="font-bold">Todos</h1>
                <ul>
                    {todos.map((todo, index) => (
                        <TodoComponent key={index} todo={todo}></TodoComponent>
                    ))}
                </ul>
                <TodoCreate ></TodoCreate>
            </div>
            <div className="right">
                <h1 className="font-bold">Users</h1>
                <ul>
                    {users.map((user, index) => (
                        <User key={index} index={index} user={user}></User>
                    ))}
                </ul>
                <UserCreate></UserCreate>
            </div>
        </main>
    );
}
