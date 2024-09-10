export default function (r: number, g: number, b: number): [number, number, number] {
    r /= 255;
    g /= 255;
    b /= 255;

    let cmin = Math.min(r, g, b),
        cmax = Math.max(r, g, b),
        delta = cmax - cmin,
        h, s = (cmax === 0 ? 0 : delta / cmax), v = cmax;

    if (cmax === cmin) {
        h = 0;
    } else {
        if (cmax === r)
            h = (g - b) / delta + (g < b ? 6 : 0);
        else if (cmax === g)
            h = (b - r) / delta + 2;
        else
            h = (r - g) / delta + 4;

        h /= 6;
    }

    return [h, s, v];
};
