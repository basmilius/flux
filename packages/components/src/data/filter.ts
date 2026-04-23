import { formatNumber } from '@basmilius/utils';
import type { FluxFilterDateEntry, FluxFilterDateRangeEntry, FluxFilterDateRangeSpec, FluxFilterDateSpec, FluxFilterEntryMap, FluxFilterOptionAsyncSpec, FluxFilterOptionEntry, FluxFilterOptionHeader, FluxFilterOptionItem, FluxFilterOptionSpec, FluxFilterOptionsAsyncSpec, FluxFilterOptionsEntry, FluxFilterOptionsSpec, FluxFilterRangeEntry, FluxFilterRangeSpec, FluxFilterSpecMap, FluxFilterValueSingle } from '@flux-ui/types';
import { DateTime } from 'luxon';
import { useTranslate } from '$flux/composable/private';
import type { FluxTranslate } from '$flux/data';
import { createLabelForDateRange } from '$flux/util';

function parseDate(base: FluxFilterDateSpec): FluxFilterDateEntry {
    return {
        ...base,
        type: 'date',

        async getValueLabel(value): Promise<string | null> {
            if (!DateTime.isDateTime(value)) {
                return null;
            }

            return value.toLocaleString({
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            });
        }
    };
}

function parseDateRange(base: FluxFilterDateRangeSpec): FluxFilterDateRangeEntry {
    return {
        ...base,
        type: 'dateRange',

        async getValueLabel(value): Promise<string | null> {
            if (!Array.isArray(value) || value.length !== 2) {
                return null;
            }

            const [start, end] = value;

            if (!DateTime.isDateTime(start) || !DateTime.isDateTime(end)) {
                return null;
            }

            return createLabelForDateRange(start, end);
        }
    };
}

function parseOption({options, ...base}: FluxFilterOptionSpec): FluxFilterOptionEntry {
    const items = options.filter(isFluxFilterOptionItem);

    return {
        ...base,
        type: 'option',

        async getValueLabel(value): Promise<string | null> {
            return items.find(o => o.value === value)?.label ?? null;
        }
    };
}

function parseOptionAsync({fetchOptions, ...base}: FluxFilterOptionAsyncSpec): FluxFilterOptionEntry {
    return {
        ...base,
        type: 'option',

        async getValueLabel(value): Promise<string | null> {
            const items = (await fetchOptions([value])).filter(isFluxFilterOptionItem);

            return items.find(o => o.value === value)?.label ?? null;
        }
    };
}

function parseOptions({options, ...base}: FluxFilterOptionsSpec): FluxFilterOptionsEntry {
    const items = options.filter(isFluxFilterOptionItem);
    const translate = useTranslate();

    return {
        ...base,
        type: 'options',

        async getValueLabel(value): Promise<string | null> {
            if (!Array.isArray(value)) {
                return null;
            }

            return generateMultiOptionsLabel(translate, items, value);
        }
    };
}

function parseOptionsAsync({fetchOptions, ...base}: FluxFilterOptionsAsyncSpec): FluxFilterOptionsEntry {
    const translate = useTranslate();

    return {
        ...base,
        type: 'options',

        async getValueLabel(value): Promise<string | null> {
            if (!Array.isArray(value)) {
                return null;
            }

            const items = (await fetchOptions(value)).filter(isFluxFilterOptionItem);

            return generateMultiOptionsLabel(translate, items, value);
        }
    };
}

function parseRange(base: FluxFilterRangeSpec): FluxFilterRangeEntry {
    return {
        ...base,
        type: 'range',

        async getValueLabel(value): Promise<string | null> {
            if (!value || !Array.isArray(value) || value.length !== 2) {
                return null;
            }

            const [lower, upper] = value as number[];
            const formatter = base.formatter ?? formatNumber;

            return `${formatter(lower!)} – ${formatter(upper!)}`;
        }
    };
}

function generateMultiOptionsLabel(translate: FluxTranslate, options: FluxFilterOptionItem[], values: FluxFilterValueSingle[]): string | null {
    const selected = options.filter(o => values.includes(o.value)).length;

    if (selected <= 0) {
        return null;
    }

    if (selected === 1) {
        return options.find(o => values.includes(o.value))!.label;
    }

    return translate('flux.nSelected', {
        n: selected
    });
}

export type FluxFilterParsers = {
    [K in keyof FluxFilterSpecMap]: (spec: FluxFilterSpecMap[K]) => FluxFilterEntryMap[K];
};

export const filterParsers: FluxFilterParsers = {
    date: parseDate,
    dateRange: parseDateRange,
    option: parseOption,
    optionAsync: parseOptionAsync,
    options: parseOptions,
    optionsAsync: parseOptionsAsync,
    range: parseRange
};

export function isFluxFilterOptionHeader(obj: object): obj is FluxFilterOptionHeader {
    return 'title' in obj;
}

export function isFluxFilterOptionItem(obj: object): obj is FluxFilterOptionItem {
    return 'label' in obj && 'value' in obj;
}
