<template>
    <FluxSurface class="flux-icon-boxed">
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
        readonly size?: number | string;
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
        height: calc(v-bind(size) * 3px);
        width: calc(v-bind(size) * 3px);
        align-items: center;
        justify-content: center;
        box-shadow: var(--shadow-sm);
    }
</style>
