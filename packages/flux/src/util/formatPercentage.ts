const formatter = new Intl.NumberFormat(navigator.language, {
    maximumFractionDigits: 1,
    minimumFractionDigits: 0,
    style: 'percent'
});

export default function (value: number): string {
    return formatter.format(value);
}
