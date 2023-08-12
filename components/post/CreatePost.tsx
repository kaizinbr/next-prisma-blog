"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const Tiptap = () => {
    const editor = useEditor({
        extensions: [StarterKit],
        content: "<p>im unhappy set me free im unhappy 🌎️</p>",
    });

    return <EditorContent editor={editor} className="mt-20 z-10" />;
};

export default Tiptap;


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
