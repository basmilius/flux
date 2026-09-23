import type { DateTime } from 'luxon';
import type { FluxIconName } from './common';

export type FluxFilterValueSingle =
    | DateTime
    | string
    | boolean
    | number
    | null;

export type FluxFilterValue =
    | FluxFilterValueSingle
    | FluxFilterValueSingle[];

export type FluxFilterState<T extends Record<string, unknown> = Record<string, FluxFilterValue>> = T;

export type FluxFilterDefinition<TValue = FluxFilterValue> = {
    readonly type: string;
    readonly name: string;
    readonly label: string;
    readonly icon?: FluxIconName;
    readonly disabled?: boolean;
    readonly defaultValue?: TValue;
    getValueLabel(value: TValue): Promise<string | null>;
    onChange?(value: TValue): void;
    onClear?(): void;
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

export type FluxFilterSpec = {
    readonly icon?: FluxIconName;
    readonly label: string;
    readonly name: string;
    readonly disabled?: boolean;
    readonly defaultValue?: FluxFilterValue;
    onChange?(value: FluxFilterValue): void;
    onClear?(): void;
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
