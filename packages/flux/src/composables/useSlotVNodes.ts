import { onBeforeUpdate, Ref, ref, useSlots, VNode } from 'vue-demi';
import { flattenVNodeTree } from '../utils';

export function useSlotVNodes(slotName: string = 'default'): Ref<VNode[]> {
    const children = ref<VNode[]>([]);
    const slots = useSlots();

    onBeforeUpdate(() => checkChildren());

    function checkChildren(): void {
        children.value = flattenVNodeTree(slots[slotName]?.() ?? []);
    }

    checkChildren();

    return children;
}
