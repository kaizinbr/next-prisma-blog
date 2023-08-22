import { DefPostCard } from "@/components/post/my/PostCard";

export default function Posts(userData: any) {
    const data = userData.userData;
    return (
        <div
            className={`
            grid grid-cols-2 gap-6
            w-full py-4 px-6
        `}
        >
            {data?.user?.posts
                ?.sort(
                    (a: any, b: any) =>
                        new Date (b.updatedAt).getTime() - new Date (a.updatedAt).getTime()
                )
                .map((post: any) => (
                    <DefPostCard key={post.id} post={post} />
                ))}
        </div>
    );
}
