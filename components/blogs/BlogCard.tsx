import Image from "next/image";
import Link from "next/link";
import ProfilePic from "../profile/general/ProfilePic";

const BlogCard = ({ blog }: any) => {
    const ProfilePicProps = {
        src: blog.image!,
        size: 132,
        alt: `Foto de perfil de ${blog.name}`,
    };

    return (
        <div
            className={`
                flex flex-col justify-start items-center
                bg-gray-100 rounded-2xl p-6
                w-60 h-80
                 relative
            `}
        >
                <ProfilePic props={ProfilePicProps} />
            <div className="flex flex-col items-center">
                <h1 className="text-2xl displayExtBold mt-2 text-ellipsis whitespace-nowrap overflow-hidden max-w-[192px]">{blog.name}</h1>
                <h2 className="text-sm displayMedium text-gray-600 ">
                    @{blog.user.username}
                </h2>
                <div
                    className={`
                            flex flex-row gap-8 justify-center items-center mt-2
                            text-gray-800 text-sm
                        `}
                >
                    {blog.pronouns ? (
                        <Link
                            // href={`/profile/${session?.user?.username}/following`}
                            href={`#`}
                            id="pronous"
                        >
                            {blog.pronouns!}
                        </Link>
                    ) : null}
                    {blog.user.posts ? (
                        <Link
                            // href={`/profile/${session?.user?.username}/following`}
                            href={`#`}
                            id="pronous"
                            className="flex flex-row items-center hover:text-violet-500 transition-all"
                        >
                            {blog.user.posts?.length} Posts
                        </Link>
                    ) : null}
                </div>
            </div>
            <Link
                href={`/${blog.user.username}`}
                className={`
                    bg-violet-400 text-gray-50 rounded-full px-6 py-2 mt-4
                    hover:bg-violet-600 transition-all duration-300
                    displayMedium
                    absolute bottom-6
                `}
            >
                {" "}
                Ver blog
            </Link>
        </div>
    );
};

export default BlogCard;