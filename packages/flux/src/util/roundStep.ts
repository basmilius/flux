export default function (value: number, step: number): number {
    return Math.round(value / step) * step;
}
