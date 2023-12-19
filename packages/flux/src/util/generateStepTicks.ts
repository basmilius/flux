const STEP_TICK_SIZES = [1, 5, 10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000] as const;
const STEP_TICK_SMALL_SIZES = [.1, .5, ...STEP_TICK_SIZES];

export default function (lower: number, upper: number, target: number = 5, isSmall?: boolean): number[] {
    const delta = upper - lower;
    const sizes = isSmall ? STEP_TICK_SMALL_SIZES : STEP_TICK_SIZES;

    for (const size of sizes) {
        const count = Math.floor(delta / size);
        const steps: number[] = [];

        if (count > target + 1) {
            continue;
        }

        steps.push(lower);

        for (let i = 1; i < count; ++i) {
            steps.push(i * size + lower);
        }

        steps.push(upper);

        return steps;
    }

    const digits = delta.toString().length - 1;
    const power = Math.pow(10, digits);
    const steps: number[] = [];

    for (let i = 0; i < delta; i += power) {
        steps.push(i + lower);
    }

    return steps;
}
