"use client";
import { useRouter } from "next/navigation";
import { TbTrash, TbSquareRoundedChevronRight } from "react-icons/tb"
import { MdOutlineKeyboardArrowRight } from "react-icons/md"

export default function PostCard (data: any) {
    const router = useRouter()
    // const post = data.post;
    // console.log(post);
    return (
        <div 
            className={`
                bg-gray-50 shadow-lg shadow-transparent hover:shadow-violet-300/50 
                transition transition-300 delay-100 ease-in-out
                overflow-hidden
                sm:rounded-xl col-span-2
                min-[1144px]:col-span-1
            `}>
            <div className="px-4 pt-5 pb-2 sm:px-6">
                <h3 className="text-lg mb-3 leading-6 displayBold text-gray-900">
                    {data.post.title}
                </h3>
                <div
                    className={`
                        text-sm text-gray-800
                    `}
                    dangerouslySetInnerHTML={{
                        __html: data.post.subtitle!.slice(0, 200) + "..."
                    }}
                ></div>
            </div>
            <div 
                className={`
                    flex flex-row gap-3 px-4 pt-2 pb-4 sm:px-6
                    text-xs text-gray-700
                `}
            >
                <div className="">
                    Criado em {new Date(data.post.createdAt).toLocaleDateString()}
                </div>
                <span className="">|</span>
                <div className="">
                    Editado em {new Date(data.post.updatedAt).toLocaleDateString()}
                </div>
            </div>
            <div 
                className={`
                    flex flex-row gap-2 justify-end
                    px-4 py-2 sm:px-6
                    text-base text-gray-700
                    border-t border-gray-200
                `}
            >
                <button 
                    className={`
                        flex flex-row gap-1 items-center
                        text-gray-700 py-2 px-3
                        bg-transparent hover:bg-red-300
                        rounded-md transition trasition-200 ease-in-out
                    `}
                >
                    <TbTrash className="h-4 w-4" />
                </button>
                <button 
                    className={`
                        flex flex-row gap-1 items-center
                        text-gray-700 py-2 pl-4 pr-2
                        bg-transparent hover:bg-violet-300
                        rounded-md transition trasition-200 ease-in-out
                    `}
                    onClick={() => {
                        router.push(`/posts/my/edit/${data.post.id}`)
                    }
                    }
                >
                    <span className="flex flex-row items-center">
                        Editar
                        <MdOutlineKeyboardArrowRight className="h-5 w-5" />    
                    </span>
                </button>
                
            </div>
        </div>
    )
}