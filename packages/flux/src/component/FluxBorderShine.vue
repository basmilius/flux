<script lang="ts">
    import { flattenVNodeTree, orange600, pink600, purple600 } from '@basmilius/flux-internals';
    import { clsx } from 'clsx';
    import { cloneVNode, defineComponent, Fragment, h, PropType } from 'vue';
    import $style from '$flux/css/component/Visual.module.scss';

    export default defineComponent({
        inheritAttrs: false,
        props: {
            colors: {default: [purple600, 'transparent', orange600, 'transparent', pink600, 'transparent', purple600], type: Array as PropType<string[]>},
            duration: {default: 9, type: Number},
            offset: {default: 1, type: Number},
            radius: {default: undefined, type: [String, Number] as PropType<string | number>},
            width: {default: 2, type: Number}
        },
        setup(props, {attrs, slots}) {
            return () => h(
                Fragment,
                flattenVNodeTree(slots.default?.() ?? []).map(vnode => cloneVNode(vnode, {
                    ...attrs,
                    class: clsx(
                        attrs.class as string,
                        $style.borderShine
                    ),
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
