/* eslint-disable @next/next/no-img-element */
import { storage } from "@/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { FileInput } from "./inputFile";
import Loading from "@/components/Loading";
import { TbX } from "react-icons/tb";
import React, { useCallback } from "react";

const savingImg = (progress: number, savingInBD: any) => {
    return (
        <div
            className={`
                fixed top-0 left-0 w-full h-full
                bg-gray-900 bg-opacity-50
                flex justify-center items-center z-[60]

            `}
        >
            <div className="bg-gray-100 rounded-xl p-4">
                <p className="text-center">Salvando...</p>
                <label htmlFor="file">Downloading progress:</label>
                <progress id="file" value={progress} max="100">
                    {progress}
                </progress>
            </div>
        </div>
    );
};

export function ImgUpload(
    editor: any,
    authorId: string,
    setImgUpload: Function,
    setImgURL: Function,
    imgURL: string,
    setProgressPorcent: Function,
    progressPorcent: number,
    alt: string,
    setAlt: Function,
    subtitle: string,
    setSubtitle: Function,
    altRef: any,
    subtitleRef: any,
    saving: boolean,
    setSaving: Function
) {
    if (!editor) {
        return null;
    }

    const saveImgURL = async (
        url: string,
        authorId: any,
        alt: string,
        subtitle: string
    ) => {
        console.log("Salvando post no banco de dados...");
        try {
            const res = await fetch("/api/posts/image", {
                method: "POST",
                body: JSON.stringify({ url, authorId, alt, subtitle }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.success) {
                        console.log("salvou");
                    } else {
                        // handleMessage(data.message);
                    }
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

    const end = () => {
        setAlt("");
        setSubtitle("");
        // setImgURL("");
        setImgUpload(false);
        setProgressPorcent(0);
        setSaving(false);
    };

    // const addImage = useCallback((url: string) => {

    //     if (url) {
    //         editor.chain().focus().setImage({ src: url }).run();
    //     }
    // }, [editor]);

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const file = event.target[0]?.files[0];
        if (!file) return;
        if (alt === "") return alert("Adicione uma descrição da imagem");

        const storageRef = ref(storage, `images/${authorId}/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgressPorcent(progress);
            },
            (error) => {
                alert(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                        setImgURL(downloadURL);
                        (async () => {
                            await saveImgURL(imgURL, authorId, alt, subtitle);

                            console.log(imgURL);
                            editor
                                .chain()
                                .focus()
                                .setImage({ src: downloadURL, alt: alt, title: subtitle })
                                .run();
                        })();
                    })
                    .then(() => {
                        end();
                    });
            }
        );

        setSaving(true);

        console.log(imgURL);

        // end();
    };

    const onChangeAlt = (e: any) => {
        setAlt(e.target.value);
    };

    const onChangeSubtitle = (e: any) => {
        setSubtitle(e.target.value);
    };

    return (
        <div
            className={`
                fixed top-0 left-0 w-full h-full 
                bg-gray-900 bg-opacity-50 
                flex justify-center items-center z-50
            `}
        >
            <div className="relative bg-gray-100 rounded-xl p-4">
                <h2 className="text-center text-xl font-bold mb-4">
                    Adicionar imagem
                </h2>
                <button
                    className={`absolute top-2 right-2 text-gray-600 transition duration-200 hover:bg-gray-200 p-1 rounded-md`}
                    onClick={() => setImgUpload(false)}
                >
                    <TbX />
                </button>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <FileInput />
                    <div
                        className={`
                        flex flex-col
                    `}
                    >
                        <label
                            className="displayBold text-sm text-gray-600 mb-2"
                            htmlFor="alt"
                        >
                            Descrição da imagem (obrigatório):
                        </label>
                        <textarea
                            className={`
                                text-base font-normal text-neutral-700
                                outline-none w-full
                                mb-2 py-3 px-2 rounded-lg
                                bg-gray-200
                                focus:bg-gray-300
                                transition duration-200 ease-in-out
                                resize-none
                            `}
                            id="alt"
                            ref={altRef}
                            value={alt}
                            placeholder="Adicione uma descrição da imagem"
                            rows={1}
                            onChange={onChangeAlt}
                        />
                    </div>
                    <div
                        className={`
                        flex flex-col
                    `}
                    >
                        <label
                            className="displayBold text-sm text-gray-600 mb-2"
                            htmlFor="subtitle"
                        >
                            Legenda:
                        </label>
                        <textarea
                            className={`
                                text-base font-normal text-neutral-700
                                outline-none w-full
                                mb-2 py-3 px-2 rounded-lg
                                bg-gray-200
                                focus:bg-gray-300
                                transition duration-200 ease-in-out
                                resize-none
                            `}
                            id="subtitle"
                            ref={subtitleRef}
                            value={subtitle}
                            placeholder="Adicione informações sobre a imagem"
                            rows={1}
                            onChange={onChangeSubtitle}
                        />
                    </div>
                    <button
                        type="submit"
                        className="py-2 px-4 rounded-lg text-gray-100 bg-violet-400 hover:bg-violet-500 transition"
                    >
                        Enviar
                    </button>
                </form>

                {saving && (
                    <div
                        className={`
                                fixed top-0 left-0 w-full h-full
                                bg-gray-900 bg-opacity-50
                                flex justify-center items-center z-[60]

                            `}
                    >
                        <div className="bg-gray-100 rounded-xl p-4">
                            <span className="text-center">
                                Salvando {progressPorcent}%
                            </span>
                            <Loading />
                        </div>
                    </div>
                )}
                {/* {imgURL && (
                    <img
                        src={imgURL}
                        alt="Imagem"
                        style={{ maxHeight: 400, maxWidth: 600 }}
                    />
                )} */}
            </div>
        </div>
    );
}
