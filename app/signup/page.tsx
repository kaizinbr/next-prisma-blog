import { RegisterForm } from "@/components/SignUp";

export default function Signup() {
    return (
        <div className={`
            flex flex-col items-center justify-center min-h-[calc(100vh-64px)]
            py-2 md:px-4  px-0
        `}>
            <RegisterForm />
        </div>
    );
}