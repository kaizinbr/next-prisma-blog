"use client";
import { useState, useEffect, useRef } from "react";
import {
    TbArrowBackUp,
    TbArrowForwardUp,
    TbChevronDown,
    TbAlignRight,
    TbAlignLeft,
    TbAlignJustified,
    TbAlignCenter,
    TbBold,
    TbItalic,
    TbUnderline,
    TbStrikethrough,
    TbCode,
    TbSuperscript,
    TbSubscript,
    TbLink,
    TbListNumbers,
    TbList,
    TbQuote,
    TbPhoto,
    TbTextSize,
    TbLetterT,
} from "react-icons/tb";

export default function Toolbar() {
    const [textStyle, setTextStyle] = useState("Normal");
    const [showTextStyle, setShowTextStyle] = useState(false);
    const txtStyleRef = useRef<HTMLButtonElement>(null);

    const handleTextStyle = () => {
        setShowTextStyle(!showTextStyle);
    };

    useEffect(() => {
        // const textStyle = txtStyleRef.current?.value;
        // setTextStyle(textStyle);
    }, [textStyle]);

    return (
        <div
            className={`
            flex justify-center items-center
            transition duration-300 delay-100
            fixed top-8 w-[calc(100%-18rem)]
            h-12
            z-30
        `}
        >
            <div
                className={`
                    flex justify-between items-center
                    bg-white 
                    rounded-xl shadow-md shadow-gray-100/30
                    px-4 py-2
                    transition duration-300 delay-100
                `}
            >
                <div className="flex items-center text-xl gap-2">
                    <div className="arrows flex gap-1">
                        <button
                            className={`
                                h-8 w-8 flex justify-center items-center rounded-md
                                hover:bg-gray-200 cursor-pointer
                                transition duration-300 delay-100
                            `}
                        >
                            <TbArrowBackUp />
                        </button>
                        <button
                            className={`
                                h-8 w-8 flex justify-center items-center rounded-md
                                hover:bg-gray-200 cursor-pointer
                                transition duration-300 delay-100
                            `}
                        >
                            <TbArrowForwardUp />
                        </button>
                    </div>
                    <div className="text-base">
                        <button
                            className={`
                                w-24
                                displayMedium px-2 py-1
                                rounded-md
                                hover:bg-gray-200 cursor-pointer
                                transition duration-300 delay-100
                                flex justify-between items-center
                            `}
                            ref={txtStyleRef}
                            onClick={() => setShowTextStyle(!showTextStyle)}
                        >
                            {textStyle}{" "}
                            <TbChevronDown
                                className={`transition duration-150`}
                                style={{
                                    transform: showTextStyle
                                        ? "rotate(180deg)"
                                        : "rotate(0)",
                                }}
                            />
                        </button>
                        {showTextStyle && (
                            <div
                                className={`
                            absolute top-14 
                            flex flex-col gap-1
                            bg-white rounded-xl shadow-md shadow-gray-100/30
                            px-2 py-2
                            z-30
                        `}
                            >
                                <button
                                    onClick={() => {
                                        setTextStyle("Normal");
                                        setShowTextStyle(false);
                                    }}
                                    className={`
                                    hover:bg-gray-200 cursor-pointer
                                    rounded-md px-2
                                    transition duration-300 delay-100
                                `}
                                >
                                    Normal
                                </button>
                                <button
                                    onClick={() => {
                                        setTextStyle("Título 1");
                                        setShowTextStyle(false);
                                    }}
                                    className={`
                                    hover:bg-gray-200 cursor-pointer
                                    rounded-md px-2
                                    transition duration-300 delay-100
                                `}
                                >
                                    Heading 1
                                </button>
                                <button
                                    onClick={() => {
                                        setTextStyle("Título 2");
                                        setShowTextStyle(false);
                                    }}
                                    className={`
                                    hover:bg-gray-200 cursor-pointer
                                    rounded-md px-2
                                    transition duration-300 delay-100
                                `}
                                >
                                    Heading 2
                                </button>
                                <button
                                    onClick={() => {
                                        setTextStyle("Título 3");
                                        setShowTextStyle(false);
                                    }}
                                    className={`
                                    hover:bg-gray-200 cursor-pointer
                                    rounded-md px-2
                                    transition duration-300 delay-100
                                `}
                                >
                                    Heading 3
                                </button>
                                <button
                                    onClick={() => {
                                        setTextStyle("Título 4");
                                        setShowTextStyle(false);
                                    }}
                                    className={`
                                    hover:bg-gray-200 cursor-pointer
                                    rounded-md px-2
                                    transition duration-300 delay-100
                                `}
                                >
                                    Heading 4
                                </button>
                                <button
                                    onClick={() => {
                                        setTextStyle("Título 5");
                                        setShowTextStyle(false);
                                    }}
                                    className={`
                                    hover:bg-gray-200 cursor-pointer
                                    rounded-md px-2
                                    transition duration-300 delay-100
                                `}
                                >
                                    Heading 5
                                </button>
                                <button
                                    onClick={() => {
                                        setTextStyle("Título 6");
                                        setShowTextStyle(false);
                                    }}
                                    className={`
                                    hover:bg-gray-200 cursor-pointer
                                    rounded-md px-2
                                    transition duration-300 delay-100
                                `}
                                >
                                    Heading 6
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="text-base">
                        <button
                            className={`
                                w-24
                                displayMedium px-2 py-1
                                rounded-md
                                hover:bg-gray-200 cursor-pointer
                                transition duration-300 delay-100
                                flex justify-between items-center
                            `}
                            ref={txtStyleRef}
                            onClick={() => setShowTextStyle(!showTextStyle)}
                        >
                            {textStyle}{" "}
                            <TbChevronDown
                                className={`transition duration-150`}
                                style={{
                                    transform: showTextStyle
                                        ? "rotate(180deg)"
                                        : "rotate(0)",
                                }}
                            />
                        </button>
                        {showTextStyle && (
                            <div
                                className={`
                            absolute top-14 
                            flex flex-col gap-1
                            bg-white rounded-xl shadow-md shadow-gray-100/30
                            px-2 py-2
                            z-30
                        `}
                            >
                                <button
                                    onClick={() => {
                                        setTextStyle("Normal");
                                        setShowTextStyle(false);
                                    }}
                                    className={`
                                    hover:bg-gray-200 cursor-pointer
                                    rounded-md px-2
                                    transition duration-300 delay-100
                                `}
                                >
                                    Normal
                                </button>
                                <button
                                    onClick={() => {
                                        setTextStyle("Título 1");
                                        setShowTextStyle(false);
                                    }}
                                    className={`
                                    hover:bg-gray-200 cursor-pointer
                                    rounded-md px-2
                                    transition duration-300 delay-100
                                `}
                                >
                                    Heading 1
                                </button>
                                <button
                                    onClick={() => {
                                        setTextStyle("Título 2");
                                        setShowTextStyle(false);
                                    }}
                                    className={`
                                    hover:bg-gray-200 cursor-pointer
                                    rounded-md px-2
                                    transition duration-300 delay-100
                                `}
                                >
                                    Heading 2
                                </button>
                                <button
                                    onClick={() => {
                                        setTextStyle("Título 3");
                                        setShowTextStyle(false);
                                    }}
                                    className={`
                                    hover:bg-gray-200 cursor-pointer
                                    rounded-md px-2
                                    transition duration-300 delay-100
                                `}
                                >
                                    Heading 3
                                </button>
                                <button
                                    onClick={() => {
                                        setTextStyle("Título 4");
                                        setShowTextStyle(false);
                                    }}
                                    className={`
                                    hover:bg-gray-200 cursor-pointer
                                    rounded-md px-2
                                    transition duration-300 delay-100
                                `}
                                >
                                    Heading 4
                                </button>
                                <button
                                    onClick={() => {
                                        setTextStyle("Título 5");
                                        setShowTextStyle(false);
                                    }}
                                    className={`
                                    hover:bg-gray-200 cursor-pointer
                                    rounded-md px-2
                                    transition duration-300 delay-100
                                `}
                                >
                                    Heading 5
                                </button>
                                <button
                                    onClick={() => {
                                        setTextStyle("Título 6");
                                        setShowTextStyle(false);
                                    }}
                                    className={`
                                    hover:bg-gray-200 cursor-pointer
                                    rounded-md px-2
                                    transition duration-300 delay-100
                                `}
                                >
                                    Heading 6
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-row">
                        <button
                            className={`
                                h-8 w-8 flex justify-center items-center rounded-md
                                text-lg
                                hover:bg-gray-200 cursor-pointer
                                transition duration-300 delay-100
                            `}
                        >
                            <TbBold />
                        </button>
                        <button
                            className={`
                                h-8 w-8 flex justify-center items-center rounded-md
                                hover:bg-gray-200 cursor-pointer
                                transition duration-300 delay-100
                            `}
                        >
                            <TbItalic />
                        </button>
                        <button
                            className={`
                                h-8 w-8 flex justify-center items-center rounded-md
                                hover:bg-gray-200 cursor-pointer
                                transition duration-300 delay-100
                            `}
                        >
                            <TbStrikethrough />
                        </button>
                        <button
                            className={`
                                h-8 w-8 flex justify-center items-center rounded-md
                                hover:bg-gray-200 cursor-pointer
                                transition duration-300 delay-100
                            `}
                        >
                            <TbUnderline />
                        </button>
                    </div>
                    <div className="flex flex-row">
                        <button
                            className={`
                                h-8 w-8 flex justify-center items-center rounded-md
                                hover:bg-gray-200 cursor-pointer
                                transition duration-300 delay-100
                            `}
                        >
                            <div
                                className={`
                                bg-gray-900 rounded-sm
                                h-4 w-4
                            `}
                            ></div>
                        </button>
                    </div>
                    <div className="flex flex-row">
                        <button
                            className={`
                                h-8 w-8 flex justify-center items-center rounded-md
                                hover:bg-gray-200 cursor-pointer
                                transition duration-300 delay-100
                            `}
                        >
                            <TbAlignLeft />
                        </button>
                        <button
                            className={`
                                h-8 w-8 flex justify-center items-center rounded-md
                                hover:bg-gray-200 cursor-pointer
                                transition duration-300 delay-100
                            `}
                        >
                            <TbAlignCenter />
                        </button>
                        <button
                            className={`
                                h-8 w-8 flex justify-center items-center rounded-md
                                hover:bg-gray-200 cursor-pointer
                                transition duration-300 delay-100
                            `}
                        >
                            <TbAlignRight />
                        </button>
                        <button
                            className={`
                                h-8 w-8 flex justify-center items-center rounded-md
                                hover:bg-gray-200 cursor-pointer
                                transition duration-300 delay-100
                            `}
                        >
                            <TbAlignJustified />
                        </button>
                    </div>
                    <div className="flex flex-row">
                        <button
                            className={`
                                h-8 w-8 flex justify-center items-center rounded-md
                                hover:bg-gray-200 cursor-pointer
                                transition duration-300 delay-100
                            `}
                        >
                            <TbLetterT />
                        </button>
                        {true && (
                            <div
                                className={`
                            absolute top-14 
                            flex flex-col gap-1
                            bg-white rounded-xl shadow-md shadow-gray-100/30
                            px-2 py-2
                            z-30
                        `}
                            >
                                <button
                                    className={`
                                h-8 w-8 flex justify-center items-center rounded-md
                                hover:bg-gray-200 cursor-pointer
                                transition duration-300 delay-100
                            `}
                                >
                                    <TbList />
                                </button>
                                <button
                                    className={`
                                h-8 w-8 flex justify-center items-center rounded-md
                                hover:bg-gray-200 cursor-pointer
                                transition duration-300 delay-100
                            `}
                                >
                                    <TbListNumbers />
                                </button>
                                <button
                                    className={`
                                h-8 w-8 flex justify-center items-center rounded-md
                                hover:bg-gray-200 cursor-pointer
                                transition duration-300 delay-100
                            `}
                                >
                                    <TbQuote />
                                </button>
                                <button
                                    className={`
                                h-8 w-8 flex justify-center items-center rounded-md
                                hover:bg-gray-200 cursor-pointer
                                transition duration-300 delay-100
                            `}
                                >
                                    <TbCode />
                                </button>
                                <button
                                    className={`
                                h-8 w-8 flex justify-center items-center rounded-md
                                hover:bg-gray-200 cursor-pointer
                                transition duration-300 delay-100
                            `}
                                >
                                    <TbSuperscript />
                                </button>
                                <button
                                    className={`
                                h-8 w-8 flex justify-center items-center rounded-md
                                hover:bg-gray-200 cursor-pointer
                                transition duration-300 delay-100
                            `}
                                >
                                    <TbSubscript />
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-row">
                        <button
                            className={`
                                h-8 w-8 flex justify-center items-center rounded-md
                                hover:bg-gray-200 cursor-pointer
                                transition duration-300 delay-100
                            `}
                        >
                            <TbPhoto />
                        </button>
                        <button
                            className={`
                                h-8 w-8 flex justify-center items-center rounded-md
                                hover:bg-gray-200 cursor-pointer
                                transition duration-300 delay-100
                            `}
                        >
                            <TbLink />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
