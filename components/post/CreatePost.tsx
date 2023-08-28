"use client";
import Document from "@tiptap/extension-document";
import Color from "@tiptap/extension-color";
import Image from "@tiptap/extension-image";
import ListItem from "@tiptap/extension-list-item";
import TaskList from "@tiptap/extension-task-list";
import FontFamily from "@tiptap/extension-font-family";
import Link from "@tiptap/extension-link";
import OrderedList from "@tiptap/extension-ordered-list";
import TextAlign from "@tiptap/extension-text-align";
import Text from "@tiptap/extension-text";
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
import { TbSettings, TbX } from "react-icons/tb";
import { useEffect, useRef, useState } from "react";
import React from "react";
import Loading from "../Loading";
// import Commands from "./toolbar/Commands";

const Message = (msg: string, success: boolean) => {
    return (
        <div
            className={`${
                success ? "bg-green-500" : "bg-red-500"
            } py-2 px-4 rounded-lg text-white
                fixed bottom-4 right-4
            `}
        >
            {msg}
        </div>
    );
};

function Commands(
    editor: any,
    setConfig: Function,
    serifed: boolean,
    setSerif: Function
) {
    let Anko = (
        <button
            className={`
                px-4 py-2 rounded-lg
                border-2 border-gray-500 text-gray-500
                transition duration-200 hover:bg-gray-200
            `}
            onClick={() => {
                editor.setOptions({
                    editorProps: {
                        attributes: {
                            class: "text-writer outline-none serifed",
                        },
                    },
                });
                setSerif(true);
            }}
        >
            <span className="anko">Anko</span>
        </button>
    );
    let Helvetica = (
        <button
            className={`
                px-4 py-2 rounded-lg
                border-2 border-gray-500 text-gray-600
                transition duration-200 hover:bg-gray-200
            `}
            onClick={() => {
                editor.setOptions({
                    editorProps: {
                        attributes: {
                            class: "text-writer outline-none",
                        },
                    },
                });
                setSerif(false);
            }}
        >
            <span className="helvetica">Helvetica</span>
        </button>
    );

    if (serifed) {
        Anko = (
            <button
                className={`
                    px-4 py-2 rounded-lg
                    border-2 border-gray-500 text-gray-100 bg-gray-500
                    transition duration-200 hover:bg-gray-600
                `}
                onClick={() => {
                    // altera a visualização do editor
                    editor.setOptiFons({
                        editorProps: {
                            attributes: {
                                class: "text-writer outline-none serifed",
                            },
                        },
                    });
                    // altera o estado pro banco de dados
                    setSerif(true);
                }}
            >
                <span className="anko">Anko</span>
            </button>
        );
    } else {
        Helvetica = (
            <button
                className={`
                    px-4 py-2 rounded-lg
                    border-2 border-gray-500 text-gray-100 bg-gray-500
                    transition duration-200 hover:bg-gray-600
                `}
                onClick={() => {
                    // altera a visualização do editor
                    editor.setOptiFons({
                        editorProps: {
                            attributes: {
                                class: "text-writer outline-none serifed",
                            },
                        },
                    });
                    // altera o estado pro banco de dados
                    setSerif(true);
                }}
            >
                <span className="helvetica">Helvetica</span>
            </button>
        );
    }

    return (
        <div
            className={`
                fixed top-0 left-0 w-full h-full 
                bg-gray-900 bg-opacity-50 
                flex justify-center items-center z-50
            `}
        >
            <div
                className={`
                bg-white rounded-lg 
                flex flex-col
            `}
            >
                <div
                    className={`
                    py-3 px-4 mb-3 w-full border-b border-gray-200
                    flex flex-row justify-between items-center
                `}
                >
                    <span
                        className={`
                        text-lg text-gray-600 displayMedium
                    `}
                    >
                        Configurações
                    </span>
                    <button
                        className={`text-gray-600 transition duration-200 hover:bg-gray-200 p-1 rounded-md`}
                        onClick={() => setConfig(false)}
                    >
                        <TbX />
                    </button>
                </div>
                <div
                    className={`
                        flex flex-col
                        py-3 px-4
                    `}
                >
                    <div
                        className={`
                        flex flex-row gap-3 items-center
                    `}
                    >
                        <span>Fonte:</span>
                        {Anko}
                        {Helvetica}
                    </div>
                </div>
            </div>
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
            Text,
            TextStyle,
            FontFamily,
            Image.configure({
                HTMLAttributes: {
                    class: "my-custom-class",
                },
            }),
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

    const [config, setConfig] = useState(false);
    // const [imgUpload, setImgUpload] = useState(false);
    const [serifed, setSerif] = useState(false);
    const [published, setPublished] = useState(false);
    const [exists, setExists] = useState(false);
    const [postId, setPostId] = useState("");
    const [authorId, setAuthorId] = useState("");
    const [loading, setLoading] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState("");
    const [confirm, setConfirm] = useState(false);
    const [title, setTitle] = useState(
        "A Genialidade da Discografia do TXT e sua Liderança na 4ª Geração do K-pop"
    );
    const titleRef = useRef<HTMLTextAreaElement>(null);

    const savePost = async (
        json: any,
        html: any,
        title: string,
        serifed: boolean
    ) => {
        console.log("Salvando post no banco de dados...");
        try {
            const res = await fetch("/api/posts/new", {
                method: "POST",
                body: JSON.stringify({ json, html, title, serifed }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.success) {
                        console.log("salvou");
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
            // alert(error.message);
        }
    };
    const updatePost = async (
        postId: string,
        authorId: string,
        json: any,
        html: any,
        title: string,
        published: boolean,
        serifed: boolean
    ) => {
        console.log("Atualizando post no banco de dados...");
        try {
            const res = await fetch("/api/posts/new", {
                method: "PUT",
                body: JSON.stringify({
                    postId,
                    authorId,
                    json,
                    html,
                    title,
                    published,
                    serifed,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    // console.log(data);
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
    const publishPost = async (
        postId: string,
        authorId: string,
        published: boolean
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
                    // console.log(data);
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

    const handleSave = async () => {
        setLoading(true);
        exists
            ? await updatePost(
                  postId,
                  authorId,
                  json,
                  html,
                  title,
                  published,
                  serifed
              )
            : await savePost(json, html, title, serifed);
    };

    const handlePublish = async (publish: boolean) => {
        !exists && (await savePost(json, html, title, serifed));
        setLoading(true);
        setPublished(publish);
        console.log("mudando published para", publish);
        updatePost(postId, authorId, json, html, title, publish, serifed);
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
                        onClick={() => setConfig(!config)}
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
                            handleSave();
                        }}
                    >
                        Salvar
                    </button>
                    {exists && (
                        <button
                            className={`
                        bg-violet-400 hover:bg-violet-500 transition
                        px-4 py-2
                        rounded-lg
                        text-gray-800
                        font-bold
                        mr-4
                    `}
                            onClick={() => {
                                setConfirm(true);
                            }}
                        >
                            {published ? "Remover publicação" : "Publicar"}
                        </button>
                    )}
                </div>
                <div
                    className={`
                    flex flex-col
                    justify-center
                    py-10 max-w-3xl m-auto
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
                    <EditorContent className="serifed" editor={editor} />
                </div>
            </div>
            {config && Commands(editor, setConfig, serifed, setSerif)}
            {confirm && (
                <div
                    className={`fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50`}
                >
                    <div className={`bg-white rounded-lg py-4 px-9`}>
                        <h1 className={`text-2xl font-bold mb-2`}>Publicar</h1>
                        <p className={`text-sm text-gray-600`}>
                            Tem certeza que deseja publicar este post?
                        </p>
                        <div className={`flex flex-row justify-end mt-4`}>
                            <button
                                className={`bg-gray-400 hover:bg-gray-500 transition px-4 py-2 rounded-lg text-gray-900 font-bold mr-4`}
                                onClick={() => {
                                    setConfirm(false);
                                }}
                            >
                                Cancelar
                            </button>
                            <button
                                className={`bg-violet-400 hover:bg-violet-500 transition px-4 py-2 rounded-lg text-gray-800 font-bold mr-4`}
                                onClick={() => {
                                    handlePublish(!published);
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

export default PostForm;
