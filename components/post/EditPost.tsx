"use client";
import Document from "@tiptap/extension-document";
import Color from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TaskList from "@tiptap/extension-task-list";
import Link from "@tiptap/extension-link";
import OrderedList from "@tiptap/extension-ordered-list";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Heading from "@tiptap/extension-heading";
import Blockquote from "@tiptap/extension-blockquote";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import Code from "@tiptap/extension-code";
import CodeBlock from "@tiptap/extension-code-block";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import HardBreak from "@tiptap/extension-hard-break";
import { useEditor, EditorContent } from "@tiptap/react";
// import { Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Toolbar } from "./toolbar/Toolbar";
import { TbSettings } from "react-icons/tb";
import { useEffect, useRef, useState } from "react";
import React from "react";
import Loading from "../Loading";

const Message = (msg: string, success: boolean) => {
    return (
        <div
            className={`${
                success ? "bg-green-500" : "bg-red-500"
            } p-2 rounded-lg text-white
                fixed bottom-4 right-4
            `}
        >
            {msg}
        </div>
    );
}

function EditPostForm(postInfo: any) {    
    const serifed = postInfo.post.serifed ? "serifed" : "";

    const editor = useEditor({
        extensions: [
            Document,
            Color.configure({ types: [TextStyle.name, ListItem.name] }),
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
            // TextStyle.configure({ types: [ListItem.name] }),
            StarterKit.configure({
                bulletList: {
                    keepMarks: true,
                    keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
                },
                orderedList: {
                    keepMarks: true,
                    keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
                },
                paragraph: {
                    HTMLAttributes: {
                        class: "sm:mb-4 mb-6",
                    },
                },
            }),
            Heading.configure({
                levels: [1, 2, 3, 4, 5, 6],
                HTMLAttributes: {
                    class: "mb-6",
                },
            }),
            Link.configure({
                protocols: ["ftp", "mailto"],
                openOnClick: false,
            }),
            Underline,
            Strike,
            ListItem,
            // TaskList,
            OrderedList,
            Blockquote,
            Code,
            CodeBlock,
            Subscript,
            Superscript,
            HardBreak,
        ],
        editorProps: {
            attributes: {
                class: `text-writer outline-none ${serifed}`,
            },
        },
        content: postInfo.post.json,
    });

    // new Editor({
    //     content: postInfo.json,
    // })

    const [published, setPublished] = useState(postInfo.post.published);
    const [loading, setLoading] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState("");
    const [confirm, setConfirm] = useState(false);
    const [title, setTitle] = useState(
        postInfo.post.title ? postInfo.post.title : ""
    );
    const titleRef = useRef<HTMLTextAreaElement>(null);

    const savePost = async (json: any, html: any, title: string) => {
        console.log("Salvando post no banco de dados...");
        try {
            const res = await fetch("/api/posts/new", {
                method: "POST",
                body: JSON.stringify({ json, html, title }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.success) {
                        setPublished(true);
                        handleMessage(data.message);
                    } else {
                        handleMessage(data.message);
                    }
                    setLoading(false);
                    // setShowMessage(true);
                });

            // if (!res.ok) {
            //     if (res.status === 403) {
            //         // setLoading(false);
            //     }
            //     return;
            // }
            // console.log(res.status);

            // setLoading(false);
        } catch (error: any) {
            // setLoading(false);
            console.error(error);
            alert(error.message);
        }
    };
    const updatePost = async (
        postId: string,
        authorId: string,
        json: any,
        html: any,
        title: string,
        published: boolean,
    ) => {
        console.log("Atualizando post no banco de dados...");
        try {
            const res = await fetch("/api/posts/new", {
                method: "PUT",
                body: JSON.stringify({ postId, authorId, json, html, title, published }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    setLoading(false);
                });
        } catch (error: any) {
            // setLoading(false);
            console.error(error);
            // alert(error.message);
        }
    };
    const publishPost = async (
        postId: string,
        authorId: string,
        published: boolean,
    ) => {
        console.log("Atualizando post no banco de dados...");
        try {
            const res = await fetch("/api/posts/publish", {
                method: "PUT",
                body: JSON.stringify({ postId, authorId, published }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    setLoading(false);
                });

        } catch (error: any) {
            console.error(error);
            alert(error.message);
        }
    };

    const resizeTextArea = () => {
        // https://codesandbox.io/s/textarea-auto-resize-react-hngvd?file=/src/index.js:135-225
        if (titleRef.current !== null) {
            titleRef.current.style.height = "auto";
            titleRef.current.style.height =
                titleRef.current.scrollHeight + "px";
        }
    };
    useEffect(resizeTextArea, [title]);

    const json = editor?.getJSON();
    const html = editor?.getHTML();

    const onChange = (e: any) => {
        setTitle(e.target.value);
    };
    const handleMessage = (msg: string) => {
        setMessage(msg);
        setShowMessage(true);
        setTimeout(() => {
            setShowMessage(false);
        }, 3000);
    };

    const handleSave = () => {
        updatePost(postInfo.post.id, postInfo.post.authorId, json, html, title, published);
    };

    const handlePublish = (publish: boolean) => {
        setLoading(true);
        setPublished(publish);
        console.log("mudando published para", publish)
        updatePost(postInfo.post.id, postInfo.post.authorId, json, html, title, publish);
        setConfirm(false);
    };


    return (
        <div>
            <div>
                <Toolbar editor={editor} />
                <div
                    className={`
                        flex flex-row
                        justify-end
                        mt-20
                    `}
                >
                    <button
                        className={`
                        bg-gray-400
                        p-2
                        h-full
                        rounded-lg text-2xl
                        font-bold
                        mr-4
                    `}
                        onClick={() => {}}
                    >
                        <TbSettings />
                    </button>
                    <button
                        className={`
                        bg-gray-400 hover:bg-gray-500
                        transition
                        px-4 py-2
                        rounded-lg
                        text-gray-900
                        font-bold
                        mr-4
                    `}
                        onClick={() => {
                            // console.log(json);
                            // console.log(html);
                            // console.log("Existe:", published);
                            setLoading(true);                            
                            handleSave();
                        }}
                    >
                        Salvar alterações
                    </button>
                    <button
                        className={`
                        bg-violet-400 hover:bg-violet-500 transition
                        px-4 py-2
                        rounded-lg
                        text-gray-800
                        font-bold
                        mr-4
                    `}
                        onClick={() => {setConfirm(true)}}
                    >
                        {published ? "Remover publicação" : "Publicar"}
                    </button>
                </div>
                <div
                    className={`
                    flex flex-col
                    justify-center
                    py-10 lg:px-16 px-2
                `}
                >
                    {/* <textarea value={val} onChange={onChange} rows={1} /> */}
                    <textarea
                        className={`
                            text-4xl displayBold
                            outline-none
                            mb-8 py-3 px-2 rounded-lg
                            bg-gray-200
                            focus:bg-gray-300
                            transition duration-200 ease-in-out
                            resize-none
                        `}
                        ref={titleRef}
                        value={title}
                        placeholder="Título"
                        rows={1}
                        onChange={onChange}
                    />
                    <EditorContent className="" editor={editor} />
                </div>
            </div>
            {confirm && (
                <div
                    className={`fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50`}
                >
                    <div
                        className={`bg-white rounded-lg py-4 px-9`}
                    >
                        <h1
                            className={`text-2xl font-bold mb-2`}
                        >
                            Publicar
                        </h1>
                        <p
                            className={`text-sm text-gray-600`}
                        >
                            Tem certeza que deseja publicar este post?
                        </p>
                        <div
                            className={`flex flex-row justify-end mt-4`}
                        >
                            <button
                                className={`bg-gray-400 hover:bg-gray-500 transition px-4 py-2 rounded-lg text-gray-900 font-bold mr-4`}
                                onClick={() => {setConfirm(false)}}
                            >
                                Cancelar
                            </button>
                            <button
                                className={`bg-violet-400 hover:bg-violet-500 transition px-4 py-2 rounded-lg text-gray-800 font-bold mr-4`}
                                onClick={() => {
                                    handlePublish(!published)
                                }}
                            >
                                Publicar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {loading && (
                <div
                    className={`
                fixed top-0 left-0
                w-full h-full
                bg-gray-900 bg-opacity-50
                flex justify-center items-center
                z-50
            `}
                >
                    <div
                        className={`
                    bg-white
                    rounded-lg
                    py-4 px-9
                `}
                    >
                        <h1
                            className={`
                        text-2xl font-bold
                        mb-2
                    `}
                        >
                            Salvando...
                        </h1>
                        <Loading />
                        {/* <p
                        className={`
                        text-sm
                        text-gray-600
                    `}
                    >
                        Aguarde um momento, estamos salvando seu rascunho...
                    </p> */}
                    </div>
                </div>
            )}
            {showMessage && Message(message, true)}
        </div>
    );
}

export default EditPostForm;
