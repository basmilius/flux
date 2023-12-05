import type { PropType, VNode } from 'vue';
import { defineComponent } from 'vue';

export const VNodeRenderer = defineComponent({
    props: {
        vnode: Object as PropType<VNode>
    },
    setup(props) {
        return () => props.vnode;
    }
});
