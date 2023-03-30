<template>
    <flux-base-button
        class="flux-table-action"
        :class="{
            'flux-table-action-destructive': destructive
        }"
        type="button"
        :icon-before="icon"
        v-bind="{disabled, isLoading, label}"
        @click="$emit('click', $event)"
        @mouseenter="$emit('mouseenter', $event)"
        @mouseleave="$emit('mouseleave', $event)"/>
</template>

<script
    lang="ts"
    setup>
    import type { IconNames } from '../data';
    import { FluxBaseButton } from '.';

    export interface Emits {
        (e: 'click', evt: MouseEvent): void;

        (e: 'mouseenter', evt: MouseEvent): void;

        (e: 'mouseleave', evt: MouseEvent): void;
    }

    export interface Props {
        readonly destructive?: boolean;
        readonly disabled?: boolean;
        readonly icon?: IconNames;
        readonly isLoading?: boolean;
        readonly label?: string;
    }

    defineEmits<Emits>();
    defineProps<Props>();
</script>

<style lang="scss">
    .flux-table-action {
        --button-background: transparent;
        --button-background-hover: rgb(var(--gray-2));
        --button-background-active: rgb(var(--gray-3));
        --button-foreground: var(--foreground);
        --button-icon: var(--foreground);
        --button-stroke: transparent;

        height: 30px;
        padding-left: 6px;
        padding-right: 6px;
        box-shadow: none;

        &-destructive {
            --button-icon: rgb(var(--danger-7))
        }
    }
</style>
