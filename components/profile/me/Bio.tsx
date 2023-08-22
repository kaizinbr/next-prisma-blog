export default function Bio(userData: any) {
    const data = userData.userData;
    return (
        <div className={`
            max-w-lg py-4 px-6 
            bg-gray-200 rounded-lg 
            text-gray-600 text-sm
        `}>
            <p>{data?.userProfile?.bio!}</p>
        </div>
    );
}
