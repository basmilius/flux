import type { FluxIconName } from './common';

export type FluxFocalPointObject = {
    readonly x: number;
    readonly y: number;
};

export type FluxLegendObject = {
    readonly color: string;
    readonly label: string;
}

export type FluxPercentageBarItemObject = FluxLegendObject & {
    readonly icon: FluxIconName;
    readonly value: number;
};

export type FluxSegmentedControlItemObject = {
    readonly icon?: FluxIconName;
    readonly label?: string;
};
