import { defineComponent, PropType, VNode } from 'vue-demi';

export const VNodeRenderer = defineComponent({
    props: {
        vnode: Object as PropType<VNode>
    },
    setup(props) {
        return () => props.vnode;
    }
});
