import type { Ref, VNode } from 'vue-demi';
import { onBeforeUpdate, ref, useSlots } from 'vue-demi';
import { flattenVNodeTree } from '@/utils';

export function useSlotVNodes(slotName: string = 'default'): Ref<VNode[]> {
    const children = ref<VNode[]>([]);
    const slots = useSlots();

    onBeforeUpdate(() => requestAnimationFrame(() => checkChildren()));

    function checkChildren(): void {
        children.value = flattenVNodeTree(slots[slotName]?.() ?? []);
    }

    checkChildren();

    return children;
}
