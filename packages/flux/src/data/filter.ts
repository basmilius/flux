import type { DateTime } from 'luxon';
import type { FluxTranslator } from '@/composable';
import type { IconNames } from './types';

export type FluxFilterBase = {
    readonly icon?: IconNames;
    readonly label: string;
    readonly name: string;

    getValueLabel(value: FluxFilterValue, translate: FluxTranslator): string | null;
}

export type FluxFilterDateEntry = FluxFilterBase & {
    readonly type: 'date';
}

export type FluxFilterDateRangeEntry = FluxFilterBase & {
    readonly type: 'dateRange';
}

export type FluxFilterOptionEntry = FluxFilterBase & {
    readonly type: 'option';
}

export type FluxFilterOptionsEntry = FluxFilterBase & {
    readonly type: 'options';
}

export type FluxFilterItem =
    | FluxFilterDateEntry
    | FluxFilterDateRangeEntry
    | FluxFilterOptionEntry
    | FluxFilterOptionsEntry;

export type FluxFilterOptionHeader = {
    readonly title: string;
}

export type FluxFilterOptionItem = {
    readonly label: string;
    readonly value: FluxFilterValue;
}

export type FluxFilterValue = DateTime | string | boolean | null | number | FluxFilterValue[];

export type FluxFilterState = {
    readonly [key: string]: FluxFilterValue | Function;
    readonly resettable: string[];
    reset(field?: string): void;
};

export function isFluxFilterOptionHeader(obj: object): obj is FluxFilterOptionHeader {
    return 'title' in obj;
}

export function isFluxFilterOptionItem(obj: object): obj is FluxFilterOptionItem {
    return 'label' in obj && 'value' in obj;
}
