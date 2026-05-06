<template>
    <Component
        :is="tag ?? 'div'"
        :class="$style.grid"
        :style="{
            '--gap': `${gap}px`,
            '--columns': columns
        }">
        <slot/>
    </Component>
</template>

<script
    lang="ts"
    setup>
    import type { VNode } from 'vue';
    import $style from '~flux/components/css/component/Grid.module.scss';

    const {
        columns = 12,
        gap = 18
    } = defineProps<{
        readonly columns?: number;
        readonly gap?: number;
        readonly tag?: keyof HTMLElementTagNameMap;
    }>();

    defineSlots<{
        default(): VNode[];
    }>();
</script>
