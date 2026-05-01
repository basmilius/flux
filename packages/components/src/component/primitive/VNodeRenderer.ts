import { defineComponent, type PropType, type VNode } from 'vue';

export const VNodeRenderer = defineComponent({
    props: {
        vnode: Object as PropType<VNode>
    },
    setup(props) {
        return () => props.vnode;
    }
});
