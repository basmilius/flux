export default function (tag: string): string {
    return tag[0].toLowerCase() + tag
        .substring(1)
        .replace(/-(\w)/g, (_, c) => c ? c.toUpperCase() : '');
}
