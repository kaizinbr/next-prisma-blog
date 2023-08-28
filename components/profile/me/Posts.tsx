import { DefPostCard } from "@/components/post/my/PostCard";
import Link from "next/link";

export default function Posts(userData: any) {
    const data = userData.userData;

    // https://github.com/nekusu/shopping-cart/blob/main/src/pages/GameList/components/Grid.tsx
    const columnsCount = 2;
    const postsPerCol = Math.ceil(data?.user?.posts?.length / columnsCount);
    const columns = Array(columnsCount)
        .fill(null)
        .map((_, index) => {
            const postsToDisplay = [];
            for (let i = 0; i < postsPerCol; i++) {
                const postIndex = i * columnsCount + index;
                if (postIndex < data?.user?.posts.length) {
                    postsToDisplay.push(data?.user?.posts[postIndex]);
                }
            }
            return postsToDisplay;
        });

    return (
        <div className="flex justify-start items-start w-full">
            <div
                className={`
                grid grid-cols-2 gap-6
                 py-4 px-6
            `}
            >
                {/* {data?.user?.posts
                    ?.sort(
                        (a: any, b: any) =>
                            new Date(b.updatedAt).getTime() -
                            new Date(a.updatedAt).getTime()
                    )
                    .map((post: any) => (
                        <Link
                            key={post.id}
                            href={`/post/${post.id}`}
                            className={`
                                col-span-2
                            `}
                        >
                            <DefPostCard post={post} />
                        </Link>
                    ))} */}
                <>
                    {columns.map((column, index) => (
                        <div
                            key={`column-${index}`}
                            className="Column flex flex-col gap-6 xl:col-span-1 col-span-2 "
                        >
                            {column.map((post) => (
                                    <DefPostCard key={post.id} post={post} />
                            ))}
                        </div>
                    ))}
                </>
            </div>
        </div>
    );
}
