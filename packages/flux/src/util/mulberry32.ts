function mulberry32(seed: number): Mulberry32 {
    const state = new Uint32Array(1);
    state[0] = seed;

    function next(): number {
        const innerState = (state[0] = (state[0] + 0x6d2b79f5) | 0);
        let t = Math.imul(innerState ^ (innerState >>> 15), 1 | innerState);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;

        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }

    function nextBetween(from: number, to: number): number {
        return next() * (to - from) + from;
    }

    function fork(): Mulberry32 {
        return mulberry32(next() * 2 ** 32);
    }

    return {
        fork,
        next,
        nextBetween
    };
}

export default mulberry32;

type Mulberry32 = {
    fork(): Mulberry32;
    next(): number;
    nextBetween(min: number, max: number): number;
}
