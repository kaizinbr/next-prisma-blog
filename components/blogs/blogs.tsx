import Image from "next/image";
import Link from "next/link";
import BlogCard from "./BlogCard";

export default function SeeBlogs({ users }: any) {
    return (
            <div className={`
                flex flex-row justify-center items-center flex-wrap
                gap-8 
            `}>
                {users.map((user: any, index: number) => (
                    <BlogCard key={index} blog={user} />
                ))}
            </div>
    );
}
