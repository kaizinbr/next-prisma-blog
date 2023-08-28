"use client";

type Props = {
    children?: React.ReactNode;
};

import { useState } from "react";
import { Navbar, AsideNavbar } from "@/components/Navbar";
import { Suspense } from "react";
import LoadingFullPage from "@/app/loading";

const BasicBody = ({ children }: Props) => {
    const [open, setOpen] = useState(true);

    return (
        <>
            <header className={`z-30`}>
                <AsideNavbar />
            </header>
            <main className={`px-4 py-8 w-auto min-h-screen z-10 ${open ? "ml-64" : "ml-16"}`}>
                <Suspense fallback={<LoadingFullPage />}>{children}</Suspense>
            </main>
        </>
    );
};

export default BasicBody;
