import Image from "next/image";

const ProfilePic = ({ props }: any) => {
    // console.log('é a profile pic')
    return (
        <div className="bgPfp flex flex-col justify-center items-start relative">
            <picture
                className={`
                        flex flex-row justify-center items-center
                        bg-gray-200 rounded-full overflow-hidden
                        w-32 h-32
                        
                    `}
            >
                <Image
                    src={props.src}
                    width={props.size}
                    height={props.size}
                    alt={props.alt}
                    className={`
                        object-cover object-center 
                        min-w-full min-h-full
                    `}
                />
            </picture>
        </div>
    );
};

export default ProfilePic;
