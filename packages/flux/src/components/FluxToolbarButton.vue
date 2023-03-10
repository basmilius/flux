<template>
    <flux-base-button
        class="flux-toolbar-button"
        :class="{
            'flux-toolbar-button-destructive': destructive
        }"
        type="button"
        :icon-before="icon"
        v-bind="{disabled, isLoading, isSubmit, label}"
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
        readonly isSubmit?: boolean;
        readonly label?: string;
    }

    defineEmits<Emits>();
    defineProps<Props>();
</script>

<style lang="scss">
    .flux-toolbar-button {
        --button-background: transparent;
        --button-background-hover: rgb(var(--gray-2));
        --button-background-active: rgb(var(--gray-3));
        --button-foreground: rgb(var(--gray-7));
        --button-icon: rgb(var(--gray-7));
        --button-stroke: transparent;

        height: 30px;
        padding: 0 6px;
        box-shadow: none;

        &-destructive {
            --button-icon: rgb(var(--danger-7))
        }
    }
</style>
