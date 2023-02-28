<template>
    <flux-base-button
        class="flux-toolbar-button"
        :class="{
            'flux-toolbar-button-destructive': destructive
        }"
        type="button"
        :icon-before="icon"
        :is-loading="isLoading"
        :label="label"
        @click="$emit('click', $event)"/>
</template>

<script
    lang="ts"
    setup>
    import { IconNames } from '../data';
    import { FluxBaseButton } from '.';

    export interface Emits {
        (e: 'click', evt: MouseEvent): void;
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
        --background: var(--secondary-button-background);
        --background-hover: var(--secondary-button-background-hover);
        --background-active: var(--secondary-button-background-active);
        --foreground: var(--secondary-button-foreground);
        --icon: var(--secondary-button-icon);
        --stroke: transparent;

        height: 30px;
        padding: 0 6px;
        box-shadow: none;

        &-destructive {
            --icon: var(--destructive-button-icon);
        }
    }
</style>
