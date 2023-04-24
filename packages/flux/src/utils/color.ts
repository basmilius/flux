export function hexToHSL(hex: string): [number, number, number] {
    let [r, g, b] = hexToRGB(hex);
    r /= 255;
    g /= 255;
    b /= 255;

    const l = Math.max(r, g, b);
    const s = l - Math.min(r, g, b);
    const h = s
        ? l === r
            ? (g - b) / s
            : l === g
                ? 2 + (b - r) / s
                : 4 + (r - g) / s
        : 0;

    return [
        60 * h < 0 ? 60 * h + 360 : 60 * h,
        100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
        (100 * (2 * l - s)) / 2
    ];
}

export function hexToRGB(hex: string): [number, number, number] {
    const color = parseInt(hex.startsWith('#') ? hex.substring(1) : hex);

    return [
        (color >> 16) & 255,
        (color >> 8) & 255,
        color & 255
    ];
}
