export function formatNumber(value: number, decimals: number = 0): string {
    const formatter = new Intl.NumberFormat(navigator.language, {
        maximumFractionDigits: decimals,
        minimumFractionDigits: decimals
    });

    return formatter.format(value);
}

export function formatPercentage(value: number): string {
    const formatter = new Intl.NumberFormat(navigator.language, {
        maximumFractionDigits: 1,
        minimumFractionDigits: 0,
        style: 'percent'
    });

    return formatter.format(value);
}
