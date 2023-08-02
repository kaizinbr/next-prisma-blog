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
import { LoginButton, LogoutButton } from "@/components/auth";
import { getServerSession } from "next-auth";
import { authOptions } from './api/auth/[...nextauth]/route'
import { ClientUser } from "./clientUser";


export default async function Home() {
    const users = await prisma.user.findMany();
    const todos = await prisma.todo.findMany();
    const session = await getServerSession(authOptions)

    return (
        <div className="grid grid-cols-12 gap-8">
            <div className="db-test col-span-12">
                <LoginButton />
                <LogoutButton />
                <h2>Server Session</h2>
                <pre>{JSON.stringify(session)}</pre>
                {/* <h2>Client Call</h2> */}
                {/* <ClientUser /> */}
            </div>
            <div className="left col-span-6">
                <h1 className="font-bold">Todos</h1>
                <ul>
                    {todos.map((todo, index) => (
                        <TodoComponent key={index} todo={todo}></TodoComponent>
                    ))}
                </ul>
                <TodoCreate></TodoCreate>
            </div>
            <div className="right col-span-6">
                <h1 className="font-bold">Users</h1>
                <ul>
                    {users.map((user, index) => (
                        <User key={index} index={index} user={user}></User>
                    ))}
                </ul>
                <UserCreate></UserCreate>
            </div>
        </div>
    );
}
