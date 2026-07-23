<template>
    <component :is="rendered"/>
</template>

<script
    lang="ts"
    setup>
    import { flattenVNodeTree } from '@flux-ui/internals';
    import { clsx } from 'clsx';
    import { cloneVNode, computed, h, useSlots, type VNode } from 'vue';
    import $style from '~flux/components/css/component/Prose.module.scss';

    const {
        asChild,
        container,
        tag
    } = defineProps<{
        readonly asChild?: boolean;
        readonly container?: boolean;
        readonly tag?: keyof HTMLElementTagNameMap;
    }>();

    defineSlots<{
        default(): VNode[];
    }>();

    const slots = useSlots();

    const rendered = computed(() => {
        const children = flattenVNodeTree(slots.default?.() ?? []);
        const extra = {
            class: clsx($style.prose, container && $style.proseContainer),
            'data-prose': ''
        };

        if (asChild && children.length === 1) {
            return cloneVNode(children[0], extra);
        }

        return h(tag ?? 'div', extra, children);
    });
</script>
