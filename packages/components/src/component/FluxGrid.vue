<template>
    <div
        :class="$style.grid"
        :style="{
            '--gap': `${gap}px`,
            '--columns': columns
        }">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { VNode } from 'vue';
    import $style from '$flux/css/component/Grid.module.scss';

    const {
        columns = 12,
        gap = 18
    } = defineProps<{
        readonly columns?: number;
        readonly gap?: number;
    }>();

    defineSlots<{
        default(): VNode[];
    }>();
</script>
