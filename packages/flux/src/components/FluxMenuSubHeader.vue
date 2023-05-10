<template>
    <div class="flux-menu-sub-header">
        <FluxIcon
            v-if="iconBefore"
            class="flux-button-icon flux-menu-sub-header-icon"
            :size="16"
            :variant="iconBefore"/>

        <span>{{ label }}</span>

        <FluxIcon
            v-if="iconAfter"
            class="flux-button-icon"
            :variant="iconAfter"/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { IconNames } from '../data';
    import FluxIcon from './FluxIcon.vue';

    export interface Props {
        readonly iconAfter?: IconNames | null;
        readonly iconBefore?: IconNames | null;
        readonly label: string;
    }

    defineProps<Props>();
</script>

<style lang="scss">
    .flux-menu-sub-header {
        position: sticky;
        display: flex;
        top: 0;
        margin-top: -9px;
        margin-bottom: -3px;
        padding: 12px 12px 6px;
        gap: 9px;
        background: linear-gradient(to bottom, rgb(var(--gray-0)) 75%, transparent);
        font-size: 14px;
        pointer-events: none;
        z-index: 1;

        span,
        &-icon {
            color: var(--foreground-secondary);
        }
    }

    .flux-menu-item + .flux-menu-sub-header {
        margin-top: 9px;
    }

    .flux-menu.is-large .flux-menu-sub-header {
        margin-bottom: -15px;
    }
</style>
