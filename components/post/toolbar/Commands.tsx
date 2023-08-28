"use client";
import { Editor } from "@tiptap/react";
import { useState } from "react";

export default function Commands(editor: any, setConfig: Function) {
    return (
        <div
            className={`
                fixed top-0 left-0 w-full h-full 
                bg-gray-900 bg-opacity-50 
                flex justify-center items-center z-50
            `}
        >
            <div className={`
                bg-white rounded-lg 
                flex flex-col
            `}>
                <span className={`
                    text-lg text-gray-600 displayMedium 
                    py-3 px-4 mb-3 w-full
                    border-b border-gray-200
                `}>
                    Configurações
                </span>
                <p className={`text-sm text-gray-600`}>
                    Tem certeza que deseja publicar este post?
                </p>
                <div className={`flex flex-row justify-end mt-4`}>
                    <button
                        className={`bg-gray-400 hover:bg-gray-500 transition px-4 py-2 rounded-lg text-gray-900 font-bold mr-4`}
                        onClick={() => {
                            setConfig(false);
                        }}
                    >
                        Cancelar
                    </button>
                    <button
                        className={`bg-violet-400 hover:bg-violet-500 transition px-4 py-2 rounded-lg text-gray-800 font-bold mr-4`}
                        onClick={() => {}}
                    >
                        Publicar
                    </button>
                </div>
            </div>
        </div>
    );
}
