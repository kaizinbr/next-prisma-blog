"use client";
import React, { useState, useEffect } from 'react';
import { GoChevronLeft, GoKebabHorizontal, GoX, GoFileMedia } from "react-icons/go";
import { PiShareFat } from "react-icons/pi";
import { useRouter } from 'next/navigation';

export default function PageFooter({chrLenght, setImgUpload}: {chrLenght: number; setImgUpload: Function}) {

    const router = useRouter();



    const [backClicked, setBackClicked] = useState(false);
    const [shareClicked, setShareClicked] = useState(false);
    const [moreOptionsClicked, setMoreOptionsClicked] = useState(false);

    useEffect(() => {
        if (backClicked) {
            console.log('Voltar clicado');
            setBackClicked(false);
        }
        if (shareClicked) {
            console.log('Compartilhar clicado');
            setShareClicked(false);
        }
        if (moreOptionsClicked) {
            console.log('Mais opções clicado');
            setMoreOptionsClicked(false);
        }
    }, [backClicked, shareClicked, moreOptionsClicked]);

    return (
        <div className={`
            sticky bottom-3 mb-0 mx-3 z-10 shadow-md px-4
            backdrop-blur-lg
            rounded-xl 
            transition-transform duration-300 md:translate-y-full translate-y-0
            bg-neutral-800/80 border border-neutral-700/40
        `}>
            <div className={`flex justify-between py-4`}>
                <div className='flex flex-row items-center'>
                    
                <span>{chrLenght} caracteres</span>
                </div>
                <div className='flex flex-row items-center'>
                    <button onClick={() => setImgUpload(true)}
                        className={`
                            
                        `}
                    >
                        <GoFileMedia className="size-6" />
                    </button>
                </div>
            </div>
        </div>
    );
}
