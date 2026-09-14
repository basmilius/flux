export type FluxFlowPosition = { readonly x: number; readonly y: number };

export type FluxFlowPath = {
    readonly path: string;
    readonly points: readonly FluxFlowPosition[];
    readonly labelX: number;
    readonly labelY: number;
    readonly fromDirection: readonly [number, number];
    readonly toDirection: readonly [number, number];
};
