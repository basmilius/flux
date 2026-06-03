import type { FluxFilterDefinition, FluxFilterValue } from '@flux-ui/types';
import { defineComponent, h, isVNode, type PropType, unref, type VNode } from 'vue';
import { useFilterInjection } from '~flux/components/composable';
import FluxMenuGroup from '../FluxMenuGroup.vue';
import FluxSeparator from '../FluxSeparator.vue';
import FilterItem from './FilterItem.vue';

export const FilterMenuRenderer = defineComponent({
    props: {
        menuItems: {required: true, type: Array},
        navigate: {required: true, type: Function as PropType<(name: string) => void>}
    },

    setup(props) {
        const {state} = useFilterInjection();

        return () => props.menuItems.map((group, index) => renderFilterGroup(group as (FluxFilterDefinition | VNode)[], index, props.navigate, unref(state) as Record<string, FluxFilterValue>));
    }
});

function renderFilterGroup(group: (FluxFilterDefinition | VNode)[], index: number, navigate: (name: string) => void, state: Record<string, FluxFilterValue>): VNode[] {
    const slot: VNode[] = [];

    if (index > 0) {
        slot.push(h(FluxSeparator));
    }

    slot.push(h(FluxMenuGroup, {}, {
        default: () => group.map(item => renderFilterItem(item, navigate, state))
    }));

    return slot;
}

function renderFilterItem(item: FluxFilterDefinition | VNode, navigate: (name: string) => void, state: Record<string, FluxFilterValue>): VNode {
    if (isVNode(item)) {
        return item;
    }

    return h(FilterItem, {
        item,
        value: state[item.name] ?? null,
        disabled: item.disabled,
        onClick: () => {
            if (!item.disabled) {
                navigate(item.name);
            }
        }
    });
}
