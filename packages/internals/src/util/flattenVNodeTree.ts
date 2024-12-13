import type { VNode } from 'vue';
import { Fragment } from 'vue';

export default function (vnodes: VNode[]): VNode[] {
    const flattened: VNode[] = [];

    for (const vnode of vnodes) {
        if (vnode.type === Fragment && Array.isArray(vnode.children)) {
            flattened.push(...(vnode.children as VNode[]));
            continue;
        }

        flattened.push(vnode);
    }

    return flattened;
}
