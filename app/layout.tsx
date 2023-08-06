import Link from "next/link";
import "./globals.css";
import Provider from "@/components/Provider";
import { Inter } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
    subsets: ["latin"],
    display: "swap",
});
import localFont from "next/font/local";
import { Navbar, AsideNavbar } from "@/components/Navbar";

// Font files can be colocated inside of `app`
// const pretendard = localFont({
//     src: "../fonts/HelveticaNeueLTPro-Roman.woff2",
//     display: "auto",
// });

// TESTANDO FONTES LOCAIS

const HelveticaNowText = localFont({
    src: [
        {
            path: "../fonts/HelveticaNowText/HelveticaNowText-Thin.woff2",
            weight: "100",
            style: "normal",
        },
        {
            path: "../fonts/HelveticaNowText/HelveticaNowText-ThinItalic.woff2",
            weight: "100",
            style: "italic",
        },
        {
            path: "../fonts/HelveticaNowText/HelveticaNowText-ExtraLight.woff2",
            weight: "200",
            style: "normal",
        },
        {
            path: "../fonts/HelveticaNowText/HelveticaNowText-ExtLtIta.woff2",
            weight: "200",
            style: "italic",
        },
        {
            path: "../fonts/HelveticaNowText/HelveticaNowText-Light.woff2",
            weight: "300",
            style: "normal",
        },
        {
            path: "../fonts/HelveticaNowText/HelveticaNowText-LightItalic.woff2",
            weight: "300",
            style: "italic",
        },
        {
            path: "../fonts/HelveticaNowText/HelveticaNowText-Regular.woff2",
            weight: "400",
            style: "normal",
        },
        {
            path: "../fonts/HelveticaNowText/HelveticaNowText-RegIta.woff2",
            weight: "400",
            style: "italic",
        },
        {
            path: "../fonts/HelveticaNowText/HelveticaNowText-Medium.woff2",
            weight: "500",
            style: "normal",
        },
        {
            path: "../fonts/HelveticaNowText/HelveticaNowText-MediumItalic.woff2",
            weight: "500",
            style: "italic",
        },
        {
            path: "../fonts/HelveticaNowText/HelveticaNowText-Bold.woff2",
            weight: "700",
            style: "normal",
        },
        {
            path: "../fonts/HelveticaNowText/HelveticaNowText-BoldItalic.woff2",
            weight: "700",
            style: "italic",
        },
        {
            path: "../fonts/HelveticaNowText/HelveticaNowText-ExtraBold.woff2",
            weight: "800",
            style: "normal",
        },
        {
            path: "../fonts/HelveticaNowText/HelveticaNowText-ExtBdIta.woff2",
            weight: "800",
            style: "italic",
        },
        {
            path: "../fonts/HelveticaNowText/HelveticaNowText-Black.woff2",
            weight: "900",
            style: "normal",
        },
        {
            path: "../fonts/HelveticaNowText/HelveticaNowText-BlackItalic.woff2",
            weight: "900",
            style: "italic",
        },
    ],
});

export const metadata = {
    title: "dots",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // primary: emerald-300
    // secondary: emerald-200
    // background: bg-neutral-900
    // main test: neutral-300

    return (
        <html lang="pt-br">
            <body
                className={
                    HelveticaNowText.className +
                    ` 
                        bg-gray-200 h-screen text-neutral-800
                        relative
                    `
                }
            >
                <Provider>
                    <header className="relative">
                        {/* <Navbar /> */}
                        <button
                            data-drawer-target="default-sidebar"
                            data-drawer-toggle="default-sidebar"
                            aria-controls="default-sidebar"
                            type="button"
                            className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        >
                            <span className="sr-only">Open sidebar</span>
                            <svg
                                className="w-6 h-6"
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    clip-rule="evenodd"
                                    fill-rule="evenodd"
                                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                                ></path>
                            </svg>
                        </button>
                        <AsideNavbar />
                    </header>
                    <main className="px-4 py-8 sm:ml-64 min-h-screen">{children}</main>
                </Provider>
            </body>
        </html>
    );
}
