import type { DateTime } from 'luxon';
import type { FluxTranslator } from '@/composable/private';
import type { IconNames } from './types';

export type FluxFilterBase = {
    readonly icon?: IconNames;
    readonly label: string;
    readonly name: string;

    getValueLabel(value: FluxFilterValue, translate: FluxTranslator): Promise<string | null>;
};

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

export type FluxFilterItem =
    | FluxFilterDateEntry
    | FluxFilterDateRangeEntry
    | FluxFilterOptionEntry
    | FluxFilterOptionsEntry
    | FluxFilterRangeEntry;

export type FluxFilterOptionHeader = {
    readonly title: string;
};

export type FluxFilterOptionItem = {
    readonly label: string;
    readonly value: FluxFilterValueSingle;
};

export type FluxFilterOptionRow = FluxFilterOptionHeader | FluxFilterOptionItem;

export type FluxFilterValueSingle = DateTime | string | boolean | number | null;
export type FluxFilterValue = FluxFilterValueSingle | FluxFilterValueSingle[];

export type FluxFilterState = {
    [key: string]: FluxFilterValue | Function;
};

export function isFluxFilterOptionHeader(obj: object): obj is FluxFilterOptionHeader {
    return 'title' in obj;
}

export function isFluxFilterOptionItem(obj: object): obj is FluxFilterOptionItem {
    return 'label' in obj && 'value' in obj;
}
