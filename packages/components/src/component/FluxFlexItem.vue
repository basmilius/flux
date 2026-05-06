<template>
    <component :is="rendered"/>
</template>

<script
    lang="ts"
    setup>
    import { flattenVNodeTree } from '@flux-ui/internals';
    import { cloneVNode, computed, h, useSlots, type VNode } from 'vue';
    import $style from '~flux/components/css/component/Flex.module.scss';

    const props = defineProps<{
        readonly basis?: number | string;
        readonly grow?: number;
        readonly shrink?: number;
    }>();

    defineSlots<{
        default(): VNode[];
    }>();

    const slots = useSlots();

    const flexStyle = computed(() => ({
        flexBasis: typeof props.basis === 'number' ? `${props.basis}px` : props.basis,
        flexGrow: props.grow,
        flexShrink: props.shrink
    }));

    const rendered = computed(() => {
        const children = flattenVNodeTree(slots.default?.() ?? []);
        const extra = {class: $style.flexItem, style: flexStyle.value};

        if (children.length === 1) {
            return cloneVNode(children[0], extra);
        }

        return h('div', extra, children);
    });
</script>
