"use client";
import { useRef, useState } from "react";
import { TbChevronDown } from "react-icons/tb";

export default function FonteSize() {

    
    const [textSize, setTextSize] = useState(16);
    const [showTextSize, setShowTextSize] = useState(false);
    const txtSizeRef = useRef<HTMLButtonElement>(null);
    const [showTextStyle, setShowTextStyle] = useState(false);
    return (
        <div className="text-base">
                        <button
                            className={`
                                w-14
                                displayMedium px-2 py-1
                                rounded-md
                                hover:bg-gray-200 cursor-pointer
                                transition duration-300 delay-100
                                flex justify-between items-center
                            `}
                            ref={txtSizeRef}
                            onClick={() => {
                                setShowTextStyle(false);
                                setShowTextSize(!showTextSize);
                                
                            }}
                        >
                            {textSize}{" "}
                            <TbChevronDown
                                className={`transition duration-150`}
                                style={{
                                    transform: showTextSize
                                        ? "rotate(180deg)"
                                        : "rotate(0)",
                                }}
                            />
                        </button>
                        {showTextSize && (
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
                                        setTextSize(8);
                                        setShowTextSize(false);
                                    }}
                                    className={`
                                    hover:bg-gray-200 cursor-pointer
                                    rounded-md px-2
                                    transition duration-300 delay-100
                                `}
                                >
                                    8
                                </button>
                                <button
                                    onClick={() => {
                                        setTextSize(10);
                                        setShowTextSize(false);
                                    }}
                                    className={`
                                    hover:bg-gray-200 cursor-pointer
                                    rounded-md px-2
                                    transition duration-300 delay-100
                                `}
                                >
                                    10
                                </button>
                                <button
                                    onClick={() => {
                                        setTextSize(12);
                                        setShowTextSize(false);
                                    }}
                                    className={`
                                    hover:bg-gray-200 cursor-pointer
                                    rounded-md px-2
                                    transition duration-300 delay-100
                                `}
                                >
                                    12
                                </button>
                                <button
                                    onClick={() => {
                                        setTextSize(16);
                                        setShowTextSize(false);
                                    }}
                                    className={`
                                    hover:bg-gray-200 cursor-pointer
                                    rounded-md px-2
                                    transition duration-300 delay-100
                                `}
                                >
                                    16
                                </button>
                                <button
                                    onClick={() => {
                                        setTextSize(24);
                                        setShowTextSize(false);
                                    }}
                                    className={`
                                    hover:bg-gray-200 cursor-pointer
                                    rounded-md px-2
                                    transition duration-300 delay-100
                                `}
                                >
                                    24
                                </button>
                                <button
                                    onClick={() => {
                                        setTextSize(32);
                                        setShowTextSize(false);
                                    }}
                                    className={`
                                    hover:bg-gray-200 cursor-pointer
                                    rounded-md px-2
                                    transition duration-300 delay-100
                                `}
                                >
                                    32
                                </button>
                                <button
                                    onClick={() => {
                                        setTextSize(36);
                                        setShowTextSize(false);
                                    }}
                                    className={`
                                    hover:bg-gray-200 cursor-pointer
                                    rounded-md px-2
                                    transition duration-300 delay-100
                                `}
                                >
                                    36
                                </button>
                            </div>
                        )}
                    </div>
    )
}