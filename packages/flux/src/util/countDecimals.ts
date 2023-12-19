export default function (value: number): number {
    return value.toString().split('.')[1]?.length ?? 0;
}
