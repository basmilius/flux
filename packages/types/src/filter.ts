import type { DateTime } from 'luxon';
import type { FluxIconName } from './common';

export type FluxFilterBase = {
    getValueLabel(value: FluxFilterValue): Promise<string | null>;

    readonly icon?: FluxIconName;
    readonly label: string;
    readonly name: string;
};

export type FluxFilterItem =
    | FluxFilterDateEntry
    | FluxFilterDateRangeEntry
    | FluxFilterOptionEntry
    | FluxFilterOptionsEntry
    | FluxFilterRangeEntry;

export type FluxFilterDateEntry = FluxFilterBase & {
    readonly type: 'date';
};

export type FluxFilterDateRangeEntry = FluxFilterBase & {
    readonly type: 'dateRange';
};

export type FluxFilterOptionEntry = FluxFilterBase & {
    readonly type: 'option';
};

export type FluxFilterOptionsEntry = FluxFilterBase & {
    readonly type: 'options';
};

export type FluxFilterRangeEntry = FluxFilterBase & {
    readonly type: 'range';
};

export type FluxFilterOptionHeader = {
    readonly title: string;
};

export type FluxFilterOptionItem = {
    readonly label: string;
    readonly value: FluxFilterValueSingle;
};

export type FluxFilterOptionRow =
    | FluxFilterOptionHeader
    | FluxFilterOptionItem;

export type FluxFilterValueSingle =
    | DateTime
    | string
    | boolean
    | number
    | null;

export type FluxFilterValue =
    | FluxFilterValueSingle
    | FluxFilterValueSingle[];

export type FluxFilterState = {
    get resettable(): string[];

    reset(): void;
} & {
    [key: string]: FluxFilterValue | Function;
};
