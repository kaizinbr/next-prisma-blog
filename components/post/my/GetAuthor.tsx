// Code to get author details

export async function GetAuthor(authorId: any) {
    const author = await fetch(`/api/profile?id=${authorId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((response) => response.json())
    .then((data) => {
        // console.log(data);
        // res = data;
        // setFollow(res.follow);
    });
    return author;
}