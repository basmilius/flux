import type { IconName } from './common';

export type FluxFocalPointObject = {
    readonly x: number;
    readonly y: number;
};

export type FluxLegendObject = {
    readonly color: string;
    readonly label: string;
}

export type FluxPercentageBarItemObject = FluxLegendObject & {
    readonly icon: IconName;
    readonly value: number;
};

export type FluxSegmentedControlItemObject = {
    readonly icon?: IconName;
    readonly label?: string;
};
