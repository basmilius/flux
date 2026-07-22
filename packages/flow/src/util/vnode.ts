import { Fragment, type VNode } from 'vue';

/**
 * The vnodes of a slot with its fragments opened up, so a run written with a
 * `v-for` or a `<template>` reads as the flat list it renders as. Used by the
 * components that derive their layout from what was written inside them.
 */
export function flattenFragments(vnodes: readonly VNode[]): VNode[] {
    return vnodes.flatMap(vnode => (vnode.type === Fragment && Array.isArray(vnode.children)
        ? flattenFragments(vnode.children as VNode[])
        : [vnode]));
}
