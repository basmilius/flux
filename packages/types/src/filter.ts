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
    readonly icon?: FluxIconName;
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

export type FluxFilterState = Record<string, FluxFilterValue>;

export type FluxFilterSpec = {
    readonly icon?: FluxIconName;
    readonly label: string;
    readonly name: string;
};

export type FluxFilterDateSpec = FluxFilterSpec;

export type FluxFilterDateRangeSpec = FluxFilterSpec;

export type FluxFilterOptionSpec = FluxFilterSpec & {
    readonly options: FluxFilterOptionRow[];
};

export type FluxFilterOptionAsyncSpec = FluxFilterSpec & {
    fetchOptions(ids: FluxFilterValue[]): Promise<FluxFilterOptionRow[]>;
};

export type FluxFilterOptionsSpec = FluxFilterSpec & {
    readonly options: FluxFilterOptionRow[];
};

export type FluxFilterOptionsAsyncSpec = FluxFilterSpec & {
    fetchOptions(ids: FluxFilterValue[]): Promise<FluxFilterOptionRow[]>;
};

export type FluxFilterRangeSpec = FluxFilterSpec & {
    formatter?(value: number): string;
};

export type FluxFilterSpecMap = {
    date: FluxFilterDateSpec;
    dateRange: FluxFilterDateRangeSpec;
    option: FluxFilterOptionSpec;
    optionAsync: FluxFilterOptionAsyncSpec;
    options: FluxFilterOptionsSpec;
    optionsAsync: FluxFilterOptionsAsyncSpec;
    range: FluxFilterRangeSpec;
};

export type FluxFilterEntryMap = {
    date: FluxFilterDateEntry;
    dateRange: FluxFilterDateRangeEntry;
    option: FluxFilterOptionEntry;
    optionAsync: FluxFilterOptionEntry;
    options: FluxFilterOptionsEntry;
    optionsAsync: FluxFilterOptionsEntry;
    range: FluxFilterRangeEntry;
};
