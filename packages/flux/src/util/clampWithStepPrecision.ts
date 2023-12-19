import roundStep from './roundStep';

export default function (value: number, min: number, max: number, step: number): number {
    return Math.max(min, Math.min(max, +roundStep(value * (max - min) + min, step).toPrecision(4)));
}
