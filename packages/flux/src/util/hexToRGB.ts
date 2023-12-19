export default function (hex: string): [number, number, number] {
    const color = parseInt(hex.startsWith('#') ? hex.substring(1) : hex);

    return [
        (color >> 16) & 255,
        (color >> 8) & 255,
        color & 255
    ];
}
