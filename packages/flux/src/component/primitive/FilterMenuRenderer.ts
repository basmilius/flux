import { formatNumber } from '@basmilius/utils';
import { camelCase } from 'lodash-es';
import { DateTime } from 'luxon';
import { computed, defineComponent, h, isVNode, unref, VNode } from 'vue';
import { FluxMenu, FluxMenuGroup, FluxSeparator } from '@/component';
import type { FluxTranslator } from '@/composable/private';
import { isFluxFilterOptionItem } from '@/data';
import type { FluxFilterBase, FluxFilterDateEntry, FluxFilterDateRangeEntry, FluxFilterItem, FluxFilterOptionEntry, FluxFilterOptionItem, FluxFilterOptionRow, FluxFilterOptionsEntry, FluxFilterRangeEntry, FluxFilterValue, FluxFilterValueSingle } from '@/types';
import { createLabelForDateRange, flattenVNodeTree, getComponentName, getComponentProps } from '@/util';
import FilterItem from './FilterItem.vue';

export const FilterMenuRenderer = defineComponent({
    props: {
        navigate: Function,
        state: Object
    },

    setup(props, {slots}) {
        const content = computed<(FluxFilterItem | VNode)[][]>(() => {
            const children = flattenVNodeTree(slots.default?.() ?? []);
            const content: (FluxFilterItem | VNode)[][] = [[]];

            for (const child of children) {
                const name = getComponentName(child);

                if (name === 'FluxSeparator') {
                    content.push([]);
                    continue;
                }

                if (name.startsWith('FluxFilter')) {
                    const props = getComponentProps<Omit<FluxFilterItem, 'type'>>(child);
                    const type = camelCase(name.substring(10)) as FluxFilterItem['type'];

                    content[content.length - 1].push(parsers[type](props));
                    continue;
                }

                content[content.length - 1].push(child);
            }

            return content;
        });

        return () => h(FluxMenu, {}, {
            default: () => unref(content).map((group, index) => renderFilterGroup(group, index, props.navigate!, props.state!))
        });
    }
});

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

        async getValueLabel(value, translate): Promise<string | null> {
            if (!Array.isArray(value) || value.length !== 2) {
                return null;
            }

            const [start, end] = value;

            if (!DateTime.isDateTime(start) || !DateTime.isDateTime(end)) {
                return null;
            }

            return createLabelForDateRange(translate, start, end);
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

    return {
        ...base,
        type: 'options',

        async getValueLabel(value, translate): Promise<string | null> {
            if (!Array.isArray(value)) {
                return null;
            }

            return generateMultiOptionsLabel(options, value, translate);
        }
    };
}

function parseOptionsAsync(base: FluxFilterBase): FluxFilterOptionsEntry {
    const fetchOptions = (base as any).fetchOptions as (ids: FluxFilterValue[]) => Promise<FluxFilterOptionRow[]>;

    return {
        ...base,
        type: 'options',

        async getValueLabel(value, translate): Promise<string | null> {
            if (!Array.isArray(value)) {
                return null;
            }

            const options = (await fetchOptions(value)).filter(isFluxFilterOptionItem);

            return generateMultiOptionsLabel(options, value, translate);
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

                return `${formatter(lower)} – ${formatter(upper)}`;
            }

            return `${formatNumber(lower)} – ${formatNumber(upper)}`;
        }
    };
}

function renderFilterGroup(group: (FluxFilterItem | VNode)[], index: number, navigate: Function, state: Record<string, FluxFilterValue>): VNode[] {
    const slot: VNode[] = [];

    if (index > 0) {
        slot.push(h(FluxSeparator));
    }

    slot.push(h(FluxMenuGroup, {}, {
        default: () => group.map(item => renderFilterItem(item, navigate, state))
    }));

    return slot;
}

function renderFilterItem(item: FluxFilterItem | VNode, navigate: Function, state: Record<string, FluxFilterValue>): VNode {
    if (isVNode(item)) {
        return item;
    }

    return h(FilterItem, {
        item,
        value: state[item.name] ?? null,
        onClick: () => navigate(item.name)
    });
}

function generateMultiOptionsLabel(options: FluxFilterOptionItem[], values: FluxFilterValueSingle[], translate: FluxTranslator): string | null {
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

const parsers = {
    date: parseDate,
    dateRange: parseDateRange,
    option: parseOption,
    optionAsync: parseOptionAsync,
    options: parseOptions,
    optionsAsync: parseOptionsAsync,
    range: parseRange
} as const;
