import type { FluxFilterItem, FluxFilterValue } from '@flux-ui/types';
import { defineComponent, h, isVNode, unref, type VNode } from 'vue';
import { useFilterInjection } from '$flux/composable';
import FluxMenuGroup from '../FluxMenuGroup.vue';
import FluxSeparator from '../FluxSeparator.vue';
import FilterItem from './FilterItem.vue';

export const FilterMenuRenderer = defineComponent({
    props: {
        menuItems: {required: true, type: Array},
        navigate: {required: true, type: Function}
    },

    setup(props) {
        const {state} = useFilterInjection();

        return () => props.menuItems.map((group, index) => renderFilterGroup(group as (FluxFilterItem | VNode)[], index, props.navigate, unref(state) as Record<string, FluxFilterValue>));
    }
});

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
