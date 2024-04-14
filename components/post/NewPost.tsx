"use client";

import React, { useState } from 'react';
import { SendPost } from './tools/SendPost';

export default function NewPost ({responseTo}: {responseTo?: string})  {
    const [postContent, setPostContent] = useState('');
    const [media, setMedia] = useState<File | null>(null);

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (event.target.value.length <= 300) {
            setPostContent(event.target.value);
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMedia(event.target.files ? event.target.files[0] : null);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Aqui você pode adicionar a lógica para enviar os dados para o banco de dados Prisma
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={postContent}
                    onChange={handleInputChange}
                    placeholder="What's happening?"
                />
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Post</button>
            </form>
            <p>{300 - postContent.length} characters remaining</p>
            <SendPost content={postContent} responseTo={responseTo} />
        </div>
    );
};
