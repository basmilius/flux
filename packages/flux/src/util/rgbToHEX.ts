export default function (r: number, g: number, b: number): string {
    const sr = r.toString(16).padStart(2, '0');
    const sg = g.toString(16).padStart(2, '0');
    const sb = b.toString(16).padStart(2, '0');

    return `#${sr}${sg}${sb}`;
}
