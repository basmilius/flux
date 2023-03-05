<template>
    <flux-base-button
        class="flux-toolbar-button"
        :class="{
            'flux-toolbar-button-destructive': destructive
        }"
        type="button"
        :disabled="disabled"
        :icon-before="icon"
        :is-loading="isLoading"
        :label="label"
        @click="$emit('click', $event)"
        @mouseenter="$emit('mouseenter', $event)"
        @mouseleave="$emit('mouseleave', $event)"/>
</template>

<script
    lang="ts"
    setup>
    import { IconNames } from '../data';
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
    .flux-toolbar-button {
        --background: transparent;
        --background-hover: rgb(var(--gray-2));
        --background-active: rgb(var(--gray-3));
        --foreground: rgb(var(--gray-7));
        --icon: rgb(var(--gray-7));
        --stroke: transparent;

        height: 30px;
        padding: 0 6px;
        box-shadow: none;

        &-destructive {
            --icon: rgb(var(--danger-7))
        }
    }
</style>
