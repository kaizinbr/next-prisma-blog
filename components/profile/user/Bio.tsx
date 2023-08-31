export default function Bio({Profile}: any) {
    // const data = Profile.Profile;
    // console.log(Profile);
    return (
        <div className={`
            max-w-lg py-4 px-6 
            bg-gray-200 rounded-lg 
            text-gray-600 text-sm
        `}>
            <p>{Profile.bio!}</p>
        </div>
    );
}
