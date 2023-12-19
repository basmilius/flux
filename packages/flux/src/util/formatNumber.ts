export default function (value: number, decimals: number = 0): string {
    const formatter = new Intl.NumberFormat(navigator.language, {
        maximumFractionDigits: decimals,
        minimumFractionDigits: decimals
    });

    return formatter.format(value);
}
