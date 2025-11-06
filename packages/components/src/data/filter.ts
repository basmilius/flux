import { formatNumber } from '@basmilius/utils';
import type { FluxFilterBase, FluxFilterDateEntry, FluxFilterDateRangeEntry, FluxFilterOptionEntry, FluxFilterOptionHeader, FluxFilterOptionItem, FluxFilterOptionRow, FluxFilterOptionsEntry, FluxFilterRangeEntry, FluxFilterValue, FluxFilterValueSingle } from '@flux-ui/types';
import { DateTime } from 'luxon';
import { useTranslate } from '$flux/composable/private';
import type { FluxTranslate } from '$flux/data';
import { createLabelForDateRange } from '$flux/util';

function parseDate(base: FluxFilterBase): FluxFilterDateEntry {
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

function parseDateRange(base: FluxFilterBase): FluxFilterDateRangeEntry {
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

function parseOption(base: FluxFilterBase): FluxFilterOptionEntry {
    const options = (base as any).options as FluxFilterOptionItem[];

    return {
        ...base,
        type: 'option',

        async getValueLabel(value): Promise<string | null> {
            return options.find(o => o.value === value)?.label ?? null;
        }
    };
}

function parseOptionAsync(base: FluxFilterBase): FluxFilterOptionEntry {
    const fetchOptions = (base as any).fetchOptions as (ids: FluxFilterValue[]) => Promise<FluxFilterOptionRow[]>;

    return {
        ...base,
        type: 'option',

        async getValueLabel(value): Promise<string | null> {
            const options = (await fetchOptions([value])).filter(isFluxFilterOptionItem);

            return options.find(o => o.value === value)?.label ?? null;
        }
    };
}

function parseOptions(base: FluxFilterBase): FluxFilterOptionsEntry {
    const options = (base as any).options as FluxFilterOptionItem[];
    const translate = useTranslate();

    return {
        ...base,
        type: 'options',

        async getValueLabel(value): Promise<string | null> {
            if (!Array.isArray(value)) {
                return null;
            }

            return generateMultiOptionsLabel(translate, options, value);
        }
    };
}

function parseOptionsAsync(base: FluxFilterBase): FluxFilterOptionsEntry {
    const fetchOptions = (base as any).fetchOptions as (ids: FluxFilterValue[]) => Promise<FluxFilterOptionRow[]>;
    const translate = useTranslate();

    return {
        ...base,
        type: 'options',

        async getValueLabel(value): Promise<string | null> {
            if (!Array.isArray(value)) {
                return null;
            }

            const options = (await fetchOptions(value)).filter(isFluxFilterOptionItem);

            return generateMultiOptionsLabel(translate, options, value);
        }
    };
}

function parseRange(base: FluxFilterBase): FluxFilterRangeEntry {
    return {
        ...base,
        type: 'range',

        async getValueLabel(value): Promise<string | null> {
            if (!value || !Array.isArray(value) || value.length !== 2) {
                return null;
            }

            const [lower, upper] = value as number[];

            if ('formatter' in base) {
                const formatter = base.formatter as (value: number) => string;

                return `${formatter(lower!)} – ${formatter(upper!)}`;
            }

            return `${formatNumber(lower!)} – ${formatNumber(upper!)}`;
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

export const filterParsers = {
    date: parseDate,
    dateRange: parseDateRange,
    option: parseOption,
    optionAsync: parseOptionAsync,
    options: parseOptions,
    optionsAsync: parseOptionsAsync,
    range: parseRange
} as const;

export function isFluxFilterOptionHeader(obj: object): obj is FluxFilterOptionHeader {
    return 'title' in obj;
}

export function isFluxFilterOptionItem(obj: object): obj is FluxFilterOptionItem {
    return 'label' in obj && 'value' in obj;
}
