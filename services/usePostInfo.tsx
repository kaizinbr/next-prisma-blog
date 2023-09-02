import React from "react";

export default async function getMyPosts() {
    const POSTS = await fetch(`http://localhost:3000/api/posts/my`)
        .then((response) => response.json())
        .then((data) => data)
        .catch((error) => console.log(error));

    console.log(POSTS);
    return POSTS
}