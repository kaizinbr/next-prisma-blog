import { DefPostCard } from "@/components/post/my/PostCard";
import Link from "next/link";

type userProps = {
    id: string;
    username: string;
    name: string | null;
    email: string | null;
    createdAt: Date;
    updatedAt: Date;
    Profile: {
        id: string;
        bio: string | null;
        name: string | null;
        image: string | null;
        userId: string;
        pronouns: string | null;
    } | null;
    posts: {
        id: string;
        slug: string;
        title: string | null;
        color: string | null;
        subtitle: string | null;
        tags: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[];
};

export default function Posts({ data }: [any] | any) {
    // const data = userData.userData;

    // console.log('aaaaaa', data);


    // https://github.com/nekusu/shopping-cart/blob/main/src/pages/GameList/components/Grid.tsx

    return (
        <div className="flex justify-center items-start col-span-8">
            <div
                className={`
                grid grid-cols-1 gap-6
                py-4 px-6 max-md:px-0
                max-w-3xl m-auto
            `}
            >
                <>
                    {data.map((post: any) => (
                        <DefPostCard key={post.id} post={post} />
                    ))}
                </>
            </div>
        </div>
    );
}
