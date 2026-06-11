import { Fragment, type VNode } from 'vue';

export default function flattenVNodeTree(vnodes: VNode[]): VNode[] {
    const flattened: VNode[] = [];

    for (const vnode of vnodes) {
        if (vnode.type === Fragment && Array.isArray(vnode.children)) {
            flattened.push(...flattenVNodeTree(vnode.children as VNode[]));
            continue;
        }

        flattened.push(vnode);
    }

    return flattened;
}
