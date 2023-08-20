export default function replaceHtml(str: string) {
    return String(str).replaceAll("class=", "className=");
}
