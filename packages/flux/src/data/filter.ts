import type { IconNames } from '.';
import { DateTime } from 'luxon';

export interface FluxFilterBase {
    readonly icon?: IconNames;
    readonly label: string;
    readonly name: string;

    getValueLabel(value: FluxFilterValue, translate: Function): string | null;
}

export interface FluxFilterDate extends FluxFilterBase {
    readonly type: 'date';
}

export interface FluxFilterDateRange extends FluxFilterBase {
    readonly type: 'dateRange';
}

export interface FluxFilterOption extends FluxFilterBase {
    readonly type: 'option';
}

export interface FluxFilterOptions extends FluxFilterBase {
    readonly type: 'options';
}

export type FluxFilterItem = FluxFilterDate
    | FluxFilterOption
    | FluxFilterOptions;

export interface FluxFilterOptionItem {
    readonly label: string;
    readonly value: FluxFilterValue;
}

export type FluxFilterValue = DateTime | string | boolean | number | FluxFilterValue[];
