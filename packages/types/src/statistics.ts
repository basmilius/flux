import type { FluxColor, FluxIconName } from './common';

export type FluxStatisticsChange = {
    readonly color?: FluxColor;
    readonly icon?: FluxIconName;
    readonly value: string | number;
};
