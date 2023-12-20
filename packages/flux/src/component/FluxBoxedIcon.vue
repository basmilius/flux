<template>
    <FluxSurface
        class="flux-icon-boxed"
        :style="{
            '--size': `${size * 3}px`
        }">
        <FluxIcon
            :size="size"
            :variant="variant"/>
    </FluxSurface>
</template>

<script
    lang="ts"
    setup>
    import type { IconNames } from '@/data';
    import FluxIcon from './FluxIcon.vue';
    import FluxSurface from './FluxSurface.vue';

    export interface Emits {
        (e: 'click', evt: MouseEvent): void;
    }

    export interface Props {
        readonly size?: number;
        readonly variant: IconNames;
    }

    defineEmits<Emits>();
    withDefaults(defineProps<Props>(), {
        size: 20
    });
</script>

<style
    lang="scss"
    scoped>
    .flux-icon-boxed {
        display: flex;
        height: var(--size);
        width: var(--size);
        align-items: center;
        flex-shrink: 0;
        justify-content: center;
        box-shadow: var(--shadow-sm);
    }
</style>
