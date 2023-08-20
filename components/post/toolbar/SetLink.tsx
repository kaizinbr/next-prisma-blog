import { Editor } from "@tiptap/react";
import { SetStateAction, useState } from "react";

function Modal(editor: Editor | any) {    
    const previousUrl = editor.getAttributes("link").href;

    const [message, setMessage] = useState('');

  const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setMessage(event.target.value);

    console.log('value is:', event.target.value);
  };

    return (
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
                value={message}
            />
            <div className="flex flex-row justify-between">
                <button
                    onClick={() => {
                        // const url = document.querySelector("input")?.value;
                        setLink(message, editor)

                    }}
                    className={`
                        bg-blue-500 hover:bg-blue-600 text-base text-white
                        px-2 py-1 rounded-md
                    `}
                >
                    Ok
                </button>
                <button
                    onClick={() => editor.chain().focus().extendMarkRange("link").unsetLink().run()}
                    className={`
                        border border-blue-500 hover:bg-blue-400 hover:text-white text-base 
                        px-2 py-1 rounded-md
                    `}
                >
                    Cancelar
                </button>
            </div>
        </div>
    );
}

function setLink(url: any, editor: Editor) {
    // const previousUrl = editor.getAttributes("link").href;
    // const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
        return;
    }

    // empty
    if (url === "") {
        editor.chain().focus().extendMarkRange("link").unsetLink().run();

        return;
    }

    if (url.includes('http://') || url.includes('https://')) {
        url = url;
    }
    else {
        url = 'http://' + url;
    }

    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url, target: '_blank' }).run();
}

export { setLink };
