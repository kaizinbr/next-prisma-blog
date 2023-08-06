import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";
const secret = process.env.NEXTAUTH_SECRET;

export async function getServerSideProps(cookie: any) {
    const sessionToken = cookie;

    const decoded = await decode({
        token: sessionToken,
        secret: secret?.toString() || "",
    });

    return decoded;
}

export default async function Dashboard() {

    const cookieStore = cookies();
    const cook = cookieStore.get("next-auth.session-token");
    console.log(cook);

    const decoded = await getServerSideProps(cook?.value);
    console.log('decoded',decoded);

    return <>Super Secret Page</>;
}
