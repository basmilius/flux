export default function (value: number): string {
    return new Intl.NumberFormat(navigator.language, {
        maximumFractionDigits: 1,
        minimumFractionDigits: 0,
        style: 'percent'
    }).format(value);
}
