import type { FunctionalComponent, VNode } from 'vue';

export const VNodeRenderer: FunctionalComponent<{ readonly vnode?: VNode; }> = props => props.vnode;
