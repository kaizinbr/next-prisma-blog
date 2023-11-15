export default async function getImage(json: any) {
    const image = json.content.filter((block: any) => block.type === 'image');
    // const image = images[0].data.file.url;
    const imageURL = image[0].attrs.src;
    const imageAlt = image[0].attrs.alt;
    const imageTitle = image[0].attrs.title;

    return { imageURL, imageAlt, imageTitle };
}
