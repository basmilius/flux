<template>
    <Component
        :is="tag ?? 'div'"
        :class="$style.container"
        :style="{'--gutter': `${gutter}px`}">
        <slot/>
    </Component>
</template>

<script
    lang="ts"
    setup>
    import type { VNode } from 'vue';
    import $style from '~flux/components/css/component/Layout.module.scss';

    const {
        gutter = 18
    } = defineProps<{
        readonly gutter?: number;
        readonly tag?: keyof HTMLElementTagNameMap;
    }>();

    defineSlots<{
        default(): VNode[];
    }>();
</script>
