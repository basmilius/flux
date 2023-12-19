import type { Ref, VNode } from 'vue';
import { onBeforeUpdate, ref, useSlots } from 'vue';
import { flattenVNodeTree } from '@/util';

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
