import React from "react";
import { prisma } from "@/lib/prisma";
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
import { authOptions } from "./api/auth/[...nextauth]/route";
import { ClientUser } from "./clientUser";
import Link from "next/link";

import styles from "../fonts/Fonts.module.css"

export default async function Home() {
    const users = await prisma.user.findMany();
    const todos = await prisma.todo.findMany();
    const session = await getServerSession(authOptions);

    return (
        <div className="bg-gray-200">
            <div className="p-4 border-2 border-gray-800 border-dashed rounded-lg ">
                <div className="grid grid-cols-12 gap-8 overflow-hidden">
                    <div className="db-test col-span-12">
                        <Link href="/posts">Posts</Link>
                        <br />
                        <LoginButton />
                        <LogoutButton />
                        <h2>Server Session</h2>
                        <pre className="flex flex-wrap">{JSON.stringify(session)}</pre>
                        {/* <h2>Client Call</h2> */}










                        
                        {/* <ClientUser /> */}
                    </div>
                    <div className="left col-span-6">
                        <h1 className={styles.displayBold}><span>Todos</span></h1>
                        <ul>
                            {todos.map((todo, index) => (
                                <TodoComponent
                                    key={index}
                                    todo={todo}
                                ></TodoComponent>
                            ))}
                        </ul>
                        <TodoCreate></TodoCreate>
                    </div>
                    <div className="right col-span-6">
                        <h1 className="font-bold">Users</h1>
                        <ul>
                            {users.map((user, index) => (
                                <User
                                    key={index}
                                    index={index}
                                    user={user}
                                ></User>
                            ))}
                        </ul>
                        <UserCreate></UserCreate>
                    </div>
                </div>
            </div>
        </div>
    );
}
