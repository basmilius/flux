import { DateTime } from 'luxon';
import { computed, defineComponent, h, isVNode, unref, VNode } from 'vue';
import { FluxMenu, FluxMenuGroup, FluxMenuItem, FluxSeparator } from '@/component';
import { FluxTranslator, useTranslate } from '@/composable/private';
import type { FluxFilterBase, FluxFilterDateEntry, FluxFilterDateRangeEntry, FluxFilterItem, FluxFilterOptionEntry, FluxFilterOptionItem, FluxFilterOptionsEntry, FluxFilterRangeEntry, FluxFilterValue } from '@/data';
import { camelizeTag, createLabelForDateRange, flattenVNodeTree, formatNumber, getComponentName, getComponentProps } from '@/util';

export const FilterMenuRenderer = defineComponent({
    props: {
        navigate: Function,
        state: Object
    },

    setup(props, {slots}) {
        const translate = useTranslate();

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
                    const type = camelizeTag(name.substring(10)) as FluxFilterItem['type'];

                    content[content.length - 1].push(parsers[type](props));
                    continue;
                }

                content[content.length - 1].push(child);
            }

            return content;
        });

        return () => h(FluxMenu, {}, {
            default: () => unref(content).map((group, index) => renderFilterGroup(group, index, translate, props.navigate!, props.state!))
        });
    }
});

function parseDate(base: FluxFilterBase): FluxFilterDateEntry {
    return {
        ...base,
        type: 'date',

        getValueLabel(value) {
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

        getValueLabel(value, translate) {
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

        getValueLabel(value) {
            return options.find(o => o.value === value)?.label ?? null;
        }
    };
}

function parseOptions(base: FluxFilterBase): FluxFilterOptionsEntry {
    const options = (base as any).options as FluxFilterOptionItem[];

    return {
        ...base,
        type: 'options',

        getValueLabel(value, translate) {
            if (!Array.isArray(value)) {
                return null;
            }

            const selected = options.filter(o => value?.includes(o.value)).length;

            if (selected <= 0) {
                return null;
            }

            if (selected === 1) {
                return options.find(o => value?.includes(o.value))!.label;
            }

            return translate('flux.nSelected', {
                n: selected
            });
        }
    };
}

function parseRange(base: FluxFilterBase): FluxFilterRangeEntry {
    return {
        ...base,
        type: 'range',

        getValueLabel(value) {
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

function renderFilterGroup(group: (FluxFilterItem | VNode)[], index: number, translate: FluxTranslator, navigate: Function, state: Record<string, FluxFilterValue>): VNode[] {
    const slot: VNode[] = [];

    if (index > 0) {
        slot.push(h(FluxSeparator));
    }

    slot.push(h(FluxMenuGroup, {}, {
        default: () => group.map(item => renderFilterItem(item, translate, navigate, state))
    }));

    return slot;
}

function renderFilterItem(item: FluxFilterItem | VNode, translate: FluxTranslator, navigate: Function, state: Record<string, FluxFilterValue>): VNode {
    if (isVNode(item)) {
        return item;
    }

    return h(FluxMenuItem, {
        command: item.getValueLabel(state[item.name] ?? null, translate) ?? undefined,
        commandIcon: 'angle-right',
        iconBefore: item.icon,
        label: item.label,
        type: 'button',
        onClick: () => navigate(item.name)
    });
}

const parsers = {
    date: parseDate,
    dateRange: parseDateRange,
    option: parseOption,
    options: parseOptions,
    range: parseRange
} as const;
