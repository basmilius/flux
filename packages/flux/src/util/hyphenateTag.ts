export default function (tag: string): string {
    return tag.substring(0, 1).toLowerCase() + tag
        .substring(1)
        .replace(/[A-Z]/g, c => `-${c}`)
        .replace(/ +/g, '-')
        .toLowerCase();
}
