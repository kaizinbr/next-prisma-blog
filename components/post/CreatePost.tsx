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

function PostForm() {
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
                class: "text-writer outline-none",
            },
        },
        content: `
        
        <p>Desde sua estreia, o Tomorrow X Together, mais conhecido como <a href="https://ibighit.com/txt/eng/" target="_blank">TXT</a>, tem cativado corações com sua música única e inovadora. Cada álbum lançado é uma obra-prima que reflete a evolução artística e criativa do grupo.</p>
        
        <p><strong>Lore Intrigante:</strong></p> 
        
        <blockquote><p>Uma das características mais notáveis da discografia do TXT é a construção cuidadosa da lore em seus álbuns. Através de elementos visuais, musicais e narrativos, eles criam universos coesos que interligam todas as faixas e álbuns. Essa narrativa transmídia não apenas envolve os fãs, mas também permite uma experiência imersiva única.</p></blockquote>
        
        <p><em>Representação da Geração Z:</em> Os <code>álbuns</code> do TXT são um reflexo sincero dos sentimentos, lutas e sonhos da geração Z. Suas letras abordam questões como autoaceitação, pressões sociais e busca de identidade. Através de músicas como "<em>Blue Hour</em>" e "<em>21st Century Girl</em>", eles capturam os altos e baixos emocionais pelos quais muitos jovens passam.</p>
        
        <p><strong>Liderança na 4ª Geração:</strong> Não se pode falar da 4ª geração do K-pop sem mencionar o TXT. Com sua musicalidade inovadora, coreografias marcantes e performances carismáticas, eles se estabeleceram como líderes incontestáveis dessa nova onda do gênero. Seu impacto vai além das fronteiras coreanas, conquistando fãs ao redor do mundo.</p>
        
        <p>Em conclusão, a discografia do TXT transcende simplesmente a música, mergulhando em narrativas profundas e representações genuínas da geração Z. Seu papel como líderes na 4ª geração do K-pop é evidente, cativando fãs e deixando uma marca indelével na indústria musical.</p>
        
        <h1>Teste de Título 1</h1>

        <h2>Teste de Título 2</h2>

        <h3>Teste de Título 3</h3>

        <h4>Teste de Título 4</h4>

        <h5>Teste de Título 5</h5>

        <h6>Teste de Título 6</h6>
        `,
    });

    const [exists, setExists] = useState(false);
    const [postId, setPostId] = useState("");
    const [authorId, setAuthorId] = useState("");
    const [loading, setLoading] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState("");

    const handleMessage = (msg: string) => {
        setMessage(msg);
        setShowMessage(true);
        setTimeout(() => {
            setShowMessage(false);
        }, 3000);
    };

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
                        setExists(true);
                        setPostId(data.post.id);
                        setAuthorId(data.post.authorId);
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
        title: string
    ) => {
        console.log("Atualizando post no banco de dados...");
        try {
            const res = await fetch("/api/posts/new", {
                method: "PUT",
                body: JSON.stringify({ postId, authorId, json, html, title }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    setLoading(false);
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
    const [title, setTitle] = useState(
        "A Genialidade da Discografia do TXT e sua Liderança na 4ª Geração do K-pop"
    );
    const titleRef = useRef<HTMLTextAreaElement>(null);

    const resizeTextArea = () => {
        // https://codesandbox.io/s/textarea-auto-resize-react-hngvd?file=/src/index.js:135-225
        if (titleRef.current !== null) {
            titleRef.current.style.height = "auto";
            titleRef.current.style.height =
                titleRef.current.scrollHeight + "px";
        }
    };
    useEffect(resizeTextArea, [title]);

    const onChange = (e: any) => {
        setTitle(e.target.value);
    };

    const json = editor?.getJSON();
    const html = editor?.getHTML();
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
                            console.log(json);
                            console.log(html);
                            console.log("Existe:", exists);
                            setLoading(true);
                            exists
                                ? updatePost(
                                      postId,
                                      authorId,
                                      json,
                                      html,
                                      title
                                  )
                                : savePost(json, html, title);
                        }}
                    >
                        Salvar rascunho
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
                        onClick={() => {}}
                    >
                        Publicar
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

export default PostForm;

// import React, { Component, useState, useEffect } from "react";
// import dynamic from "next/dynamic";

// import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
// import { EditorProps } from "react-draft-wysiwyg";
// import { convertToHTML } from "draft-convert";

// import { BiAngry } from "react-icons/bi";

// const Editor = dynamic<EditorProps>(
//     () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
//     { ssr: false }
// );
// import "@/node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// // import { Editor } from "react-draft-wysiwyg";
// // import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// function BoldBtn () {
//     return (
//         <div className={`
//             h-4 w-4 flex justify-center items-center rounded-md
//             hover:bg-gray-200 cursor-pointer
//         `}>
//             <BiAngry />
//         </div>
//     )
// }

// export default function EditorComponent(this: any) {
//     const [editorState, setEditorState] = useState(() =>
//         EditorState.createEmpty()
//     );

//     const [convertedContent, setConvertedContent] = useState<any>(null);

//     useEffect(() => {
//         // let html = convertToHTML(editorState.getCurrentContent());
//         // setConvertedContent(html);

//         let raw = convertToRaw(editorState.getCurrentContent());
//         setConvertedContent(raw);
//     }, [editorState]);

//     // printa o conteúdo do editor no console
//     console.log(convertedContent);
//     return (
//         <div>
//             <Editor
//                 toolbarClassName="toolbarClassName"
//                 wrapperClassName="wrapperClassName"
//                 editorClassName="editorClassName"
//                 toolbar={{
//                     image: {
//                         uploadCallback: () => {
//                             return new Promise((resolve, reject) => {
//                                 resolve({ data: { link: "link" } });
//                             });
//                         },
//                         previewImage: true,
//                         uploadEnabled: true,
//                     },

//                 }}
//                 editorState={editorState}
//                 onEditorStateChange={setEditorState}
//                 toolbarStyle={{
//                     border: "1px solid #ccc",
//                     borderRadius: "12px",
//                 }}
//                 localization={{
//                     locale: "pt",
//                 }}
//                 hashtag={{
//                     separator: " ",
//                     trigger: "#",
//                 }}
//                 // onEditorStateChange={this.onEditorStateChange}
//             />
//             {/* <pre>{JSON.stringify(convertedContent)}</pre> */}
//         </div>
//     );
// }
