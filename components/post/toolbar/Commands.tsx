"use client";
import { Editor } from "@tiptap/react";
import { useState } from "react";
export default function Commands(editor:  Editor | any) {
    const json = editor?.getJSON();
    return (
        <div
            className={`
                flex flex-row
                items-end
                justify-end
                mt-20
            `}
        >
            <button
                className={`
                    bg-gray-200
                    px-4 py-2
                    rounded-lg
                    text-gray-800
                    font-bold
                    mr-4
                `}
                onClick={() => {
                    console.log(json)
                }}
            >Salvar</button>
        </div>
    )
}