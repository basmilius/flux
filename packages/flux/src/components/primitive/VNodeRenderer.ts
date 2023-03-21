import type { PropType, VNode } from 'vue-demi';
import { defineComponent } from 'vue-demi';

export const VNodeRenderer = defineComponent({
    props: {
        vnode: Object as PropType<VNode>
    },
    setup(props) {
        return () => props.vnode;
    }
});
