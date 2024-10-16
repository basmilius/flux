<script lang="ts">
    import { cloneVNode, defineComponent, Fragment, h, PropType } from 'vue';
    import { flattenVNodeTree } from '@/util';
    import $style from '@/css/component/Visual.module.scss';

    export default defineComponent({
        inheritAttrs: false,
        props: {
            colors: {default: ['#9333ea', 'transparent', '#ea580c', 'transparent', '#db2777', 'transparent', '#9333ea'], type: Array as PropType<string[]>},
            duration: {default: 9, type: Number},
            offset: {default: 1, type: Number},
            radius: {default: undefined, type: [String, Number] as PropType<string | number>},
            width: {default: 2, type: Number}
        },
        setup(props, {slots}) {
            return () => h(
                Fragment,
                flattenVNodeTree(slots.default?.() ?? []).map(vnode => cloneVNode(vnode, {
                    class: $style.borderShine,
                    style: {
                        '--shine-colors': props.colors.join(', '),
                        '--shine-duration': props.duration,
                        '--shine-offset': props.offset,
                        '--shine-radius': props.radius,
                        '--shine-width': props.width
                    }
                }))
            );
        }
    });
</script>
