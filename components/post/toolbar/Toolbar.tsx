/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect, useRef, SetStateAction } from "react";
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
    TbSourceCode,
    TbDotsVertical,
    TbPageBreak,
    TbCloudUpload,
} from "react-icons/tb";
import { setLink } from "./SetLink";

import { useSession } from "next-auth/react";
import { storage } from "@/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { FileInput } from "./inputFile"
import { ImgUpload } from "./imgUpload";
// import { useState } from "react";



export function Toolbar({ editor }: any) {
    const { data: session } = useSession();
    // fonte
    const [textStyle, setTextStyle] = useState("Normal");
    const [showTextStyle, setShowTextStyle] = useState(false);
    const txtStyleRef = useRef<HTMLButtonElement>(null);
    // tamanho
    const [textSize, setTextSize] = useState(16);
    const [showTextSize, setShowTextSize] = useState(false);
    const txtSizeRef = useRef<HTMLButtonElement>(null);
    // ferramentas de texto
    const [showTextTools, setShowTextTools] = useState(false);
    const txtToolsRef = useRef<HTMLButtonElement>(null);
    // demais ferramentas
    const [showMoreTools, setShowMoreTools] = useState(false);
    const moreToolsRef = useRef<HTMLButtonElement>(null);
    // adicionar link
    const [showLinkModal, setShowLinkModal] = useState(false);
    const linkRef = useRef<HTMLButtonElement>(null);

    const [imgUpload, setImgUpload] = useState(false);
    const [imgURL, setImgURL] = useState("");
    const [progressPorcent, setPorgessPorcent] = useState(0);
    const [saving, setSaving] = useState(false);
    const [url, setUrl] = useState("");        
    const altRef = useRef<HTMLTextAreaElement>(null);
    const subtitleRef = useRef<HTMLTextAreaElement>(null);
    const [alt, setAlt] = useState<string>("")
    const [title, setTitle] = useState<string>("")

    if (!editor) {
        return null;
    }

    const handleChange = (event: {
        target: { value: SetStateAction<string> };
    }) => {
        setUrl(event.target.value);
        console.log("value is:", event.target.value);
    };

    return (
        <div
            className={`
            flex justify-center items-center
            transition-all duration-300
            fixed top-8 w-[calc(100%-6rem)] group-[.is-open]:w-[calc(100%-18rem)]
            max-[1024px]:top-0 max-[1024px]:w-[calc(100%-64px)] max-[1024px]:left-16 
            max-[1024px]:group-[.is-open]:left-64 max-[1024px]:group-[.is-open]:w-[calc(100%-16rem)]
            h-12 z-50 overflow-hidden
        `}
        >
            <div
                className={`
                    flex justify-between items-center
                    bg-white 
                    rounded-xl shadow-md shadow-gray-100/30
                    px-4 py-2
                    transition duration-300 delay-100
                    max-w-full
                `}
            >
                <div className="flex items-center text-xl gap-2">
                    <div className="arrows flex">
                        <button
                            className={`
                                h-8 w-8 flex justify-center items-center rounded-md
                                hover:bg-gray-200 cursor-pointer
                                transition duration-300 delay-100
                            `}
                            onClick={() => editor.chain().focus().undo().run()}
                            disabled={
                                !editor.can().chain().focus().undo().run()
                            }
                        >
                            <TbArrowBackUp />
                        </button>
                        <button
                            className={`
                                h-8 w-8 flex justify-center items-center rounded-md
                                hover:bg-gray-200 cursor-pointer
                                transition duration-300 delay-100
                            `}
                            onClick={() => editor.chain().focus().redo().run()}
                            disabled={
                                !editor.can().chain().focus().redo().run()
                            }
                        >
                            <TbArrowForwardUp />
                        </button>
                    </div>
                    <div className="text-base flex flex-row justify-center">
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
                            onClick={() => {
                                setShowTextSize(false);
                                setShowTextStyle(!showTextStyle);
                            }}
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
                                        editor
                                            .chain()
                                            .focus()
                                            .setParagraph()
                                            .run();
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
                                        editor
                                            .chain()
                                            .focus()
                                            .toggleHeading({ level: 1 })
                                            .run();
                                    }}
                                    className={
                                        editor.isActive("heading", { level: 1 })
                                            ? "is-active"
                                            : "" +
                                              `
                                        hover:bg-gray-200 cursor-pointer
                                        rounded-md px-2
                                        transition duration-300 delay-100
                                    `
                                    }
                                >
                                    Título 1
                                </button>
                                <button
                                    onClick={() => {
                                        setTextStyle("Título 2");
                                        setShowTextStyle(false);
                                        editor
                                            .chain()
                                            .focus()
                                            .toggleHeading({ level: 2 })
                                            .run();
                                    }}
                                    className={
                                        editor.isActive("heading", { level: 2 })
                                            ? "is-active"
                                            : "" +
                                              `
                                        hover:bg-gray-200 cursor-pointer
                                        rounded-md px-2
                                        transition duration-300 delay-100
                                    `
                                    }
                                >
                                    Título 2
                                </button>
                                <button
                                    onClick={() => {
                                        setTextStyle("Título 3");
                                        setShowTextStyle(false);
                                        editor
                                            .chain()
                                            .focus()
                                            .toggleHeading({ level: 3 })
                                            .run();
                                    }}
                                    className={
                                        editor.isActive("heading", { level: 3 })
                                            ? "is-active"
                                            : "" +
                                              `
                                        hover:bg-gray-200 cursor-pointer
                                        rounded-md px-2
                                        transition duration-300 delay-100
                                    `
                                    }
                                >
                                    Título 3
                                </button>
                                <button
                                    onClick={() => {
                                        setTextStyle("Título 4");
                                        setShowTextStyle(false);
                                        editor
                                            .chain()
                                            .focus()
                                            .toggleHeading({ level: 4 })
                                            .run();
                                    }}
                                    className={
                                        editor.isActive("heading", { level: 4 })
                                            ? "is-active"
                                            : "" +
                                              `
                                        hover:bg-gray-200 cursor-pointer
                                        rounded-md px-2
                                        transition duration-300 delay-100
                                    `
                                    }
                                >
                                    Título 4
                                </button>
                                <button
                                    onClick={() => {
                                        setTextStyle("Título 5");
                                        setShowTextStyle(false);
                                        editor
                                            .chain()
                                            .focus()
                                            .toggleHeading({ level: 5 })
                                            .run();
                                    }}
                                    className={
                                        editor.isActive("heading", { level: 5 })
                                            ? "is-active"
                                            : "" +
                                              `
                                        hover:bg-gray-200 cursor-pointer
                                        rounded-md px-2
                                        transition duration-300 delay-100
                                    `
                                    }
                                >
                                    Título 5
                                </button>
                                <button
                                    onClick={() => {
                                        setTextStyle("Título 6");
                                        setShowTextStyle(false);
                                        editor
                                            .chain()
                                            .focus()
                                            .toggleHeading({ level: 6 })
                                            .run();
                                    }}
                                    className={
                                        editor.isActive("heading", { level: 6 })
                                            ? "is-active"
                                            : "" +
                                              `
                                        hover:bg-gray-200 cursor-pointer
                                        rounded-md px-2
                                        transition duration-300 delay-100
                                    `
                                    }
                                >
                                    Título 6
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
                            onClick={() =>
                                editor.chain().focus().toggleBold().run()
                            }
                            disabled={
                                !editor.can().chain().focus().toggleBold().run()
                            }
                        >
                            <TbBold />
                        </button>
                        <button
                            className={`
                                h-8 w-8 flex justify-center items-center rounded-md
                                hover:bg-gray-200 cursor-pointer
                                transition duration-300 delay-100
                            `}
                            onClick={() =>
                                editor.chain().focus().toggleItalic().run()
                            }
                            disabled={
                                !editor
                                    .can()
                                    .chain()
                                    .focus()
                                    .toggleItalic()
                                    .run()
                            }
                        >
                            <TbItalic />
                        </button>
                        <button
                            className={`
                                h-8 w-8 flex justify-center items-center rounded-md
                                hover:bg-gray-200 cursor-pointer
                                transition duration-300 delay-100
                            `}
                            onClick={() => {
                                editor.chain().focus().toggleStrike().run();
                            }}
                            disabled={
                                !editor
                                    .can()
                                    .chain()
                                    .focus()
                                    .toggleStrike()
                                    .run()
                            }
                        >
                            <TbStrikethrough />
                        </button>
                        <button
                            className={`
                                h-8 w-8 flex justify-center items-center rounded-md
                                hover:bg-gray-200 cursor-pointer
                                transition duration-300 delay-100
                            `}
                            onClick={() => {
                                editor.chain().focus().toggleUnderline().run();
                            }}
                            disabled={
                                !editor
                                    .can()
                                    .chain()
                                    .focus()
                                    .toggleUnderline()
                                    .run()
                            }
                        >
                            <TbUnderline />
                        </button>
                    </div>
                    <div className="flex colorBtn flex-row">
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
                            onClick={() =>
                                editor
                                    .chain()
                                    .focus()
                                    .setTextAlign("left")
                                    .run()
                            }
                        >
                            <TbAlignLeft />
                        </button>
                        <button
                            className={`
                                h-8 w-8 flex justify-center items-center rounded-md
                                hover:bg-gray-200 cursor-pointer
                                transition duration-300 delay-100
                            `}
                            onClick={() =>
                                editor
                                    .chain()
                                    .focus()
                                    .setTextAlign("center")
                                    .run()
                            }
                        >
                            <TbAlignCenter />
                        </button>
                        <button
                            className={`
                                h-8 w-8 flex justify-center items-center rounded-md
                                hover:bg-gray-200 cursor-pointer
                                transition duration-300 delay-100
                            `}
                            onClick={() =>
                                editor
                                    .chain()
                                    .focus()
                                    .setTextAlign("right")
                                    .run()
                            }
                        >
                            <TbAlignRight />
                        </button>
                        <button
                            className={`
                                h-8 w-8 flex justify-center items-center rounded-md
                                hover:bg-gray-200 cursor-pointer
                                transition duration-300 delay-100
                            `}
                            onClick={() =>
                                editor
                                    .chain()
                                    .focus()
                                    .setTextAlign("justify")
                                    .run()
                            }
                        >
                            <TbAlignJustified />
                        </button>

                        {/* <button
                            onClick={() => editor.chain().focus().splitListItem('listItem').run()}
                            disabled={!editor.can().splitListItem('listItem')}
                        >
                            splitListItem
                        </button>
                        <button
                            onClick={() => editor.chain().focus().sinkListItem('listItem').run()}
                            disabled={!editor.can().sinkListItem('listItem')}
                        >
                            sinkListItem
                        </button>
                        <button
                            onClick={() => editor.chain().focus().liftListItem('listItem').run()}
                            disabled={!editor.can().liftListItem('listItem')}
                        >
                            liftListItem
                        </button> */}
                    </div>
                    <div className="moreTextTools flex flex-row justify-center">
                        <button
                            onClick={() => {
                                setShowTextTools(!showTextTools);
                            }}
                            className={`
                                h-8 w-12 flex justify-center items-center rounded-md
                                hover:bg-gray-200 cursor-pointer
                                transition duration-300 delay-100
                            `}
                            ref={txtToolsRef}
                        >
                            <TbLetterT />
                            <TbChevronDown
                                className={`
                                    transition duration-150
                                    text-base 
                                `}
                                style={{
                                    transform: showTextTools
                                        ? "rotate(180deg)"
                                        : "rotate(0)",
                                }}
                            />
                        </button>
                        {showTextTools && (
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
                                    onClick={() =>
                                        editor
                                            .chain()
                                            .focus()
                                            .setHardBreak()
                                            .run()
                                    }
                                >
                                    <TbPageBreak />
                                </button>
                                <button
                                    className={`
                                        h-8 w-8 flex justify-center items-center rounded-md
                                        hover:bg-gray-200 cursor-pointer
                                        text-red-400
                                        transition duration-300 delay-100
                                    `}
                                    onClick={() =>
                                        editor
                                            .chain()
                                            .focus()
                                            .toggleTaskList()
                                            .run()
                                    }
                                >
                                    <TbList />
                                </button>
                                <button
                                    className={`
                                        h-8 w-8 flex justify-center items-center rounded-md
                                        hover:bg-gray-200 cursor-pointer
                                        text-red-400
                                        transition duration-300 delay-100
                                    `}
                                    onClick={() =>
                                        editor
                                            .chain()
                                            .focus()
                                            .toggleOrderedList()
                                            .run()
                                    }
                                >
                                    <TbListNumbers />
                                </button>
                                <button
                                    className={`
                                        h-8 w-8 flex justify-center items-center rounded-md
                                        hover:bg-gray-200 cursor-pointer
                                        transition duration-300 delay-100
                                    `}
                                    onClick={() => {
                                        editor
                                            .chain()
                                            .focus()
                                            .toggleBlockquote()
                                            .run();

                                        console.log("clicou");
                                    }}
                                >
                                    <TbQuote />
                                </button>
                                <button
                                    className={`
                                        h-8 w-8 flex justify-center items-center rounded-md
                                        hover:bg-gray-200 cursor-pointer
                                        transition duration-300 delay-100
                                    `}
                                    onClick={() =>
                                        editor
                                            .chain()
                                            .focus()
                                            .toggleCode()
                                            .run()
                                    }
                                >
                                    <TbCode />
                                </button>
                                <button
                                    className={`
                                        h-8 w-8 flex justify-center items-center rounded-md
                                        hover:bg-gray-200 cursor-pointer
                                        transition duration-300 delay-100
                                    `}
                                    onClick={() =>
                                        editor
                                            .chain()
                                            .focus()
                                            .toggleSubscript()
                                            .run()
                                    }
                                >
                                    <TbSubscript />
                                </button>
                                <button
                                    className={`
                                        h-8 w-8 flex justify-center items-center rounded-md
                                        hover:bg-gray-200 cursor-pointer
                                        transition duration-300 delay-100
                                    `}
                                    onClick={() =>
                                        editor
                                            .chain()
                                            .focus()
                                            .toggleSuperscript()
                                            .run()
                                    }
                                >
                                    <TbSuperscript />
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
                            onClick={() => {
                                setImgUpload(true);
                            }}
                        >
                            <TbPhoto />
                        </button>

                        <div className="flex flex-row justify-center">
                            <button
                                className={`
                                    h-8 w-8 flex justify-center items-center rounded-md
                                    hover:bg-gray-200 cursor-pointer
                                    transition duration-300 delay-100
                                `}
                                onClick={() => {
                                    // setLink(editor)
                                    setShowLinkModal(!showLinkModal);
                                    setUrl(editor.getAttributes("link").href);
                                }}
                            >
                                <TbLink />
                            </button>
                            {showLinkModal && (
                                <div
                                    className={`
                                    absolute top-14 w-full
                                    flex left-1/2 transform -translate-x-1/2
                                    z-30
                                `}
                                >
                                    <div
                                        className={`
                                            flex flex-col
                                            m-auto
                                            bg-white rounded-xl shadow-md shadow-gray-100/30
                                            px-2 py-2
                                            gap-4
                                            z-30
                                        `}
                                    >
                                        <input
                                            type="text"
                                            placeholder="URL"
                                            className={`
                                                outline-none bg-gray-300/30 rounded-md
                                                px-2 py-1
                                                text-sm min-w-[300px]
                                            `}
                                            onChange={handleChange}
                                            value={url}
                                        />
                                        <div className="flex flex-row justify-between">
                                            <button
                                                onClick={() => {
                                                    // const url = document.querySelector("input")?.value;
                                                    setLink(url, editor);
                                                    setShowLinkModal(
                                                        !showLinkModal
                                                    );
                                                    setUrl("");
                                                }}
                                                className={`
                                                    bg-blue-500 hover:bg-blue-600 text-base text-white
                                                    px-2 py-1 rounded-md
                                                `}
                                            >
                                                Adicionar link
                                            </button>
                                            <button
                                                onClick={() => {
                                                    editor
                                                        .chain()
                                                        .focus()
                                                        .extendMarkRange("link")
                                                        .unsetLink()
                                                        .run();

                                                    setShowLinkModal(
                                                        !showLinkModal
                                                    );
                                                    setUrl("");
                                                }}
                                                className={`
                                                    border border-blue-500 hover:bg-blue-400 hover:text-white text-base 
                                                    px-2 py-1 rounded-md
                                                `}
                                            >
                                                Remover link
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="moreGeneralTools flex flex-row justify-center">
                        <button
                            onClick={() => {
                                setShowMoreTools(!showMoreTools);
                            }}
                            className={`
                                h-8 w-12 flex justify-center items-center rounded-md
                                hover:bg-gray-200 cursor-pointer
                                transition duration-300 delay-100
                            `}
                            ref={moreToolsRef}
                        >
                            <TbDotsVertical />
                            <TbChevronDown
                                className={`
                                    transition duration-150
                                    text-base 
                                `}
                                style={{
                                    transform: showMoreTools
                                        ? "rotate(180deg)"
                                        : "rotate(0)",
                                }}
                            />
                        </button>
                        {showMoreTools && (
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
                                        
                                        text-red-400
                                    `}
                                    onClick={() =>
                                        editor
                                            .chain()
                                            .focus()
                                            .toggleCodeBlock()
                                            .run()
                                    }
                                >
                                    <TbSourceCode />
                                </button>
                                <button
                                    className={`
                                        h-8 w-8 flex justify-center items-center rounded-md
                                        hover:bg-gray-200 cursor-pointer
                                        transition duration-300 delay-100
                                    `}
                                    onClick={() =>
                                        editor
                                            .chain()
                                            .focus()
                                            .toggleOrderedList()
                                            .run()
                                    }
                                >
                                    <TbListNumbers />
                                </button>
                                <button
                                    className={`
                                        h-8 w-8 flex justify-center items-center rounded-md
                                        hover:bg-gray-200 cursor-pointer
                                        transition duration-300 delay-100
                                    `}
                                    onClick={() =>
                                        editor
                                            .chain()
                                            .focus()
                                            .toggleBlockquote()
                                            .run()
                                    }
                                >
                                    <TbQuote />
                                </button>
                                <button
                                    className={`
                                        h-8 w-8 flex justify-center items-center rounded-md
                                        hover:bg-gray-200 cursor-pointer
                                        transition duration-300 delay-100
                                    `}
                                    onClick={() =>
                                        editor
                                            .chain()
                                            .focus()
                                            .toggleTaskList()
                                            .run()
                                    }
                                >
                                    <TbCode />
                                </button>
                                <button
                                    className={`
                                        h-8 w-8 flex justify-center items-center rounded-md
                                        hover:bg-gray-200 cursor-pointer
                                        transition duration-300 delay-100
                                    `}
                                    onClick={() =>
                                        editor
                                            .chain()
                                            .focus()
                                            .toggleTaskList()
                                            .run()
                                    }
                                >
                                    <TbSubscript />
                                </button>
                                <button
                                    className={`
                                        h-8 w-8 flex justify-center items-center rounded-md
                                        hover:bg-gray-200 cursor-pointer
                                        transition duration-300 delay-100
                                    `}
                                    onClick={() =>
                                        editor
                                            .chain()
                                            .focus()
                                            .toggleTaskList()
                                            .run()
                                    }
                                >
                                    <TbSuperscript />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {imgUpload &&
                ImgUpload(
                    editor,
                    session?.user?.id!,
                    setImgUpload,
                    setImgURL,
                    imgURL,
                    setPorgessPorcent,
                    progressPorcent,
                    alt,
                    setAlt,
                    title,
                    setTitle,
                    altRef,
                    subtitleRef,
                    saving,
                    setSaving            
                )}
                
        </div>
    );
}
