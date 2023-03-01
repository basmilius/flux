<template>
    <flux-surface class="flux-pane">
        <slot/>

        <div
            v-if="isLoading"
            class="flux-pane-overlay">
            <flux-spinner/>
        </div>

        <div
            v-if="tag"
            class="flux-pane-tag">
            {{ tag }}
        </div>
    </flux-surface>
</template>

<script
    lang="ts"
    setup>
    import { FluxSpinner, FluxSurface } from '.';

    export interface Props {
        readonly isLoading?: boolean;
        readonly tag?: string;
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

        &-tag {
            position: absolute;
            top: 0;
            left: 21px;
            padding: 6px 9px;
            background: var(--gray-10);
            border-radius: calc(var(--radius) / 2);
            color: var(--gray-0);
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 1px;
            line-height: 1;
            text-transform: uppercase;
            translate: 0 -50%;
        }
    }
</style>
