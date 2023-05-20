import type { DateTime } from 'luxon';
import type { FluxTranslator } from '@/composables';
import type { IconNames } from './types';

export interface FluxFilterBase {
    readonly icon?: IconNames;
    readonly label: string;
    readonly name: string;

    getValueLabel(value: FluxFilterValue, translate: FluxTranslator): string | null;
}

export interface FluxFilterDateEntry extends FluxFilterBase {
    readonly type: 'date';
}

export interface FluxFilterDateRangeEntry extends FluxFilterBase {
    readonly type: 'dateRange';
}

export interface FluxFilterOptionEntry extends FluxFilterBase {
    readonly type: 'option';
}

export interface FluxFilterOptionsEntry extends FluxFilterBase {
    readonly type: 'options';
}

export type FluxFilterItem = FluxFilterDateEntry
    | FluxFilterDateRangeEntry
    | FluxFilterOptionEntry
    | FluxFilterOptionsEntry;

export interface FluxFilterOptionHeader {
    readonly title: string;
}

export interface FluxFilterOptionItem {
    readonly label: string;
    readonly value: FluxFilterValue;
}

export type FluxFilterValue = DateTime | string | boolean | number | FluxFilterValue[];

export function isFluxFilterOptionHeader(obj: object): obj is FluxFilterOptionHeader {
    return 'title' in obj;
}

export function isFluxFilterOptionItem(obj: object): obj is FluxFilterOptionItem {
    return 'label' in obj && 'value' in obj;
}
