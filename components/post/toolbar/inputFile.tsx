import { useCallback, useState, useRef } from "react";
import { DropzoneState, useDropzone } from "react-dropzone";
import { TbPhotoUp, TbX, TbCloudUpload } from "react-icons/tb";

interface InputProps {
    dropzone: DropzoneState;
}

interface HasFileProps {
    file?: File;
    removeFile: () => void;
}

export const FileInput = () => {
    const inputRef = useRef<HTMLInputElement>(null);

    // var inputRef = document.getElementById('dropzone');

    //     inputRef.current?.addEventListener('dragover', e => {
    //     e.preventDefault();
    //     inputRef.current?.classList.add('border-indigo-600');
    // });

    // inputRef.current?.addEventListener('dragleave', e => {
    //     e.preventDefault();
    //     inputRef.current?.classList.remove('border-indigo-600');
    // });

    // inputRef.current?.addEventListener('drop', e => {
    //     e.preventDefault();
    //     inputRef.current?.classList.remove('border-indigo-600');
    //     var file = e.dataTransfer.files[0];
    //     displayPreview(file);
    // });

    // inputRef.current?.addEventListener('change', e => {
    //     var file = e.target.files[0];
    //     displayPreview(file);
    // });

    // function displayPreview(file) {
    //     var reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onload = () => {
    //         var preview = document.getElementById('preview');
    //         preview.src = reader.result;
    //         preview.classList.remove('hidden');
    //     };
    // }
    return (
        <input
            className={`
                relative m-0 block w-full min-w-0 flex-auto 
                rounded-lg
                border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] 
                text-base font-normal text-neutral-700 
                transition duration-300 ease-in-out 
                file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 
                file:border-solid file:border-inherit file:bg-violet-100 file:px-3 file:py-[0.32rem] 
                file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] 
                file:[margin-inline-end:0.75rem] hover:file:bg-violet-200 focus:border-primary focus:text-neutral-700 
                focus:shadow-te-primary focus:outline-none 
            `}
            type="file"
            id="formFile"
            accept="image/*"
            onChange={(e) => {
                e.preventDefault();
                console.log(e.target.files);
            }}
        />
    );
};
