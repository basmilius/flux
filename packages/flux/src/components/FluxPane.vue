<template>
    <flux-surface class="flux-pane">
        <slot/>

        <div
            v-if="isLoading"
            class="flux-pane-overlay">
            <flux-spinner/>
        </div>
    </flux-surface>
</template>

<script
    lang="ts"
    setup>
    import { FluxSpinner, FluxSurface } from '.';

    export interface Props {
        readonly isLoading?: boolean;
    }

    defineProps<Props>();
</script>

<style lang="scss">
    .flux-pane {
        position: relative;
        margin: 0;
        box-shadow: var(--shadow);

        &-overlay {
            position: absolute;
            display: flex;
            inset: 0;
            align-items: center;
            justify-content: center;
            background: var(--surface-overlay);
            border-radius: inherit;
            z-index: 100;
        }
    }
</style>
