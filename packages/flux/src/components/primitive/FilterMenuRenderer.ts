import type { FluxFilterBase, FluxFilterDateEntry, FluxFilterDateRangeEntry, FluxFilterItem, FluxFilterOptionEntry, FluxFilterOptionItem, FluxFilterOptionsEntry, FluxFilterValue } from '../../data';
import { DateTime } from 'luxon';
import { Component, defineComponent, VNode } from 'vue-demi';
import { FluxTranslator, useTranslate } from '../../composables';
import { camelizeTag, createLabelForDateRange, flattenVNodeTree, getNormalizedComponentName, getNormalizedComponentProps, isVNode, render } from '../../utils';
import { FluxMenu, FluxMenuGroup, FluxMenuItem, FluxSeparator } from '..';

export const FilterMenuRenderer = defineComponent({
    props: {
        navigate: Function,
        state: Object
    },

    setup(props, {slots}) {
        const translate = useTranslate();

        return () => {
            const children = flattenVNodeTree(slots.default?.() ?? []);
            const content: (FluxFilterItem | VNode)[][] = [[]];

            for (const child of children) {
                const name = getNormalizedComponentName(child);

                if (name === 'flux-separator') {
                    content.push([]);
                    continue;
                }

                if (name.startsWith('flux-filter-')) {
                    const props = getNormalizedComponentProps<Omit<FluxFilterItem, 'type'>>(child);
                    const type = camelizeTag(name.substring(12)) as FluxFilterItem['type'];

                    content[content.length - 1].push(parsers[type](props));
                    continue;
                }

                content[content.length - 1].push(child);
            }

            return render(FluxMenu as unknown as Component, {
                slots: {
                    default: () => content.map((group, index) => renderFilterGroup(group, index, translate, props.navigate!, props.state!))
                }
            });
        };
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

            return translate('flux_n_selected', {
                n: selected
            });
        }
    };
}

function renderFilterGroup(group: (FluxFilterItem | VNode)[], index: number, translate: FluxTranslator, navigate: Function, state: Record<string, FluxFilterValue>): VNode[] {
    const slot: VNode[] = [];

    if (index > 0) {
        slot.push(render(FluxSeparator as unknown as Component));
    }

    slot.push(render(FluxMenuGroup as unknown as Component, {
        slots: {
            default: () => group.map(item => renderFilterItem(item, translate, navigate, state))
        }
    }));

    return slot;
}

function renderFilterItem(item: FluxFilterItem | VNode, translate: FluxTranslator, navigate: Function, state: Record<string, FluxFilterValue>): VNode {
    if (isVNode(item)) {
        return item;
    }

    return render(FluxMenuItem as unknown as Component, {
        on: {
            click: () => navigate(item.name)
        },
        props: {
            command: item.getValueLabel(state[item.name] ?? null, translate),
            commandIcon: 'angle-right',
            iconBefore: item.icon,
            label: item.label
        } as object
    });
}

const parsers = {
    date: parseDate,
    dateRange: parseDateRange,
    option: parseOption,
    options: parseOptions
};
