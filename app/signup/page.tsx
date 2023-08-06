import { RegisterForm } from "@/components/SignUp";

export default function Signup() {
    return (
        <div className={`
            flex flex-col items-center justify-center min-h-[calc(100vh-64px)]
            py-2 p-4 
        `}>
            <RegisterForm />
        </div>
    );
}