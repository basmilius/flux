<template>
    <Component
        :is="tag ?? 'div'"
        :class="$style.aspectRatio"
        :style="{aspectRatio}">
        <slot/>
    </Component>
</template>

<script
    lang="ts"
    setup>
    import type { VNode } from 'vue';
    import $style from '~flux/components/css/component/Layout.module.scss';

    defineProps<{
        readonly aspectRatio: number;
        readonly tag?: keyof HTMLElementTagNameMap;
    }>();

    defineSlots<{
        default(): VNode[];
    }>();
</script>
