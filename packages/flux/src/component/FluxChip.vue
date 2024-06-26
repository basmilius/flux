<template>
    <Component
        :is="isSelectable ? 'button' : 'div'"
        class="flux-chip"
        :class="{
            'is-selectable': isSelectable,
            'is-selected': isSelected
        }"
        @click="$emit('click', $event)">
        <FluxIcon
            v-if="isSelectable"
            :size="16"
            :variant="isSelected ? 'check' : (iconBefore ?? 'plus')"/>

        <FluxIcon
            v-else-if="iconBefore"
            :size="16"
            :variant="iconBefore"/>

        <span>{{ label }}</span>

        <FluxIcon
            v-if="iconAfter"
            :size="16"
            :variant="iconAfter"/>
    </component>
</template>

<script
    lang="ts"
    setup>
    import type { IconNames } from '@/data';
    import FluxIcon from './FluxIcon.vue';

    export interface Emits {
        (e: 'click', evt: MouseEvent): void;
    }

    export interface Props {
        readonly iconAfter?: IconNames;
        readonly iconBefore?: IconNames;
        readonly isSelectable?: boolean;
        readonly isSelected?: boolean;
        readonly label: string;
    }

    defineEmits<Emits>();
    defineProps<Props>();
</script>

<style lang="scss">
    @use '../css/mixin' as flux;

    .flux-chip {
        display: inline-flex;
        height: 36px;
        padding: 0 12px;
        align-items: center;
        gap: 9px;
        background: rgb(var(--gray-1));
        border: 1px solid rgb(var(--gray-4));
        border-radius: 99px;
        color: var(--foreground);
        transition: 180ms var(--swift-out);
        transition-property: background, border, color, flux.focus-ring-transition-properties();

        &.is-selectable {
            @include flux.focus-ring(2px);

            cursor: pointer;
        }

        &.is-selectable:hover {
            background: rgb(var(--gray-3) / .75);
        }

        &.is-selected {
            background: rgb(var(--primary-2));
            border-color: rgb(var(--primary-6));
            color: rgb(var(--primary-7));

            &:hover {
                background: rgb(var(--primary-3) / .75);
            }
        }

        span {
            font-size: 14px;
            font-weight: 500;
            white-space: nowrap;
        }
    }

    [dark] .flux-chip.is-selected {
        background: rgb(var(--primary-11) / .5);
        border-color: rgb(var(--primary-11));
        color: rgb(var(--primary-5));

        &:hover {
            background: rgb(var(--primary-10) / .5);
        }
    }
</style>
