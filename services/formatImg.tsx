export default async function getImage(json: any) {
    const image = json.content.filter((block: any) => block.type === 'image');
    // const image = images[0].data.file.url;
    console.log(image)

    return image;
}
