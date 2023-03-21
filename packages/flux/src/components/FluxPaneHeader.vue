<template>
    <div class="flux-pane-header">
        <flux-icon
            v-if="icon"
            class="flux-pane-header-icon"
            :variant="icon"/>

        <span
            v-if="title"
            class="flux-pane-header-title">
            {{ title }}
        </span>

        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { IconNames } from '../data';
    import { FluxIcon } from '.';

    export interface Props {
        readonly icon?: IconNames;
        readonly title?: string;
    }

    defineProps<Props>();
</script>

<style lang="scss">
    .flux-pane-header {
        display: flex;
        padding: 21px 21px 0;
        align-items: center;
        gap: 15px;

        &-icon {
            color: rgb(var(--primary-7));
        }

        &-title {
            flex-grow: 1;
            color: var(--foreground-prominent);
            font-weight: 700;
        }

        &:first-child {
            border-radius: var(--radius) var(--radius) 0 0;
        }
    }
</style>
