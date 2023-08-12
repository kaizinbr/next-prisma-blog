import React from "react";

export default async function getUserData(userId: string) {
    const userData = await fetch(`http://localhost:3000/api/user/${userId}`)
        .then((response) => response.json())
        .then((data) => data)
        .catch((error) => console.log(error));

    console.log(userData);
    return userData
}