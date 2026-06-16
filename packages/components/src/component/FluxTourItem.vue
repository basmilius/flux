<script
    lang="ts"
    setup>
    import type { VNode } from 'vue';

    type FluxTourPosition =
        | 'top' | 'top-left' | 'top-right'
        | 'left' | 'left-top' | 'left-bottom'
        | 'right' | 'right-top' | 'right-bottom'
        | 'bottom' | 'bottom-left' | 'bottom-right';

    defineProps<{
        readonly target: string | (() => HTMLElement | null);
        readonly title?: string;
        readonly position?: FluxTourPosition;
    }>();

    defineSlots<{
        default(): VNode[];
    }>();
</script>

<template>
    <span
        aria-hidden="true"
        style="display: none"/>
</template>
