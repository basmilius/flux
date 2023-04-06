<template>
    <flux-base-button
        class="flux-action"
        :class="{
            'is-destructive': destructive
        }"
        type="button"
        :icon-before="icon"
        v-bind="{disabled, isLoading, label, href, rel, target, to, type}"
        @click="$emit('click', $event)"
        @mouseenter="$emit('mouseenter', $event)"
        @mouseleave="$emit('mouseleave', $event)"/>
</template>

<script
    lang="ts"
    setup>
    import type { FluxRoutingLocation, IconNames } from '../data';
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
        readonly href?: string;
        readonly rel?: string;
        readonly target?: string;
        readonly to?: FluxRoutingLocation;
        readonly type?: 'button' | 'link' | 'route';
    }

    defineEmits<Emits>();
    defineProps<Props>();
</script>

<style lang="scss">
    .flux-button.flux-action {
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

        &.is-destructive {
            --button-icon: rgb(var(--danger-7))
        }
    }
</style>
