<template>
    <div
        class="flux-badge"
        :class="{
            [`flux-badge-${color}`]: true,
            'flux-badge-text-only': !dot && !icon && color
        }">
        <span
            v-if="dot"
            class="flux-badge-dot"/>

        <flux-icon
            v-if="icon"
            class="flux-badge-icon"
            :size="16"
            :variant="icon"/>

        <span>{{ label }}</span>

        <button
            v-if="isDeletable"
            class="flux-badge-close"
            @click="$emit('delete')">
            <flux-icon variant="xmark"/>
        </button>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { IconNames } from '../data';
    import { FluxIcon } from '.';

    export interface Emits {
        (e: 'delete'): void;
    }

    export interface Props {
        readonly color?: 'primary' | 'error' | 'info' | 'success' | 'warning';
        readonly dot?: boolean;
        readonly icon?: IconNames;
        readonly isDeletable?: boolean;
        readonly label: string;
    }

    defineEmits<Emits>();
    defineProps<Props>();
</script>

<style lang="scss">
    .flux-badge {
        --color: currentColor;

        display: inline-flex;
        height: 27px;
        padding-left: 9px;
        padding-right: 9px;
        align-items: center;
        gap: 6px;
        border: 1px solid var(--gray-4);
        border-radius: 99px;
        color: var(--foreground);
        font-size: 13px;
        font-weight: 500;

        &-primary {
            --color: var(--primary-7);
        }

        &-error {
            --color: #f04438;
        }

        &-info {
            --color: #2970ff;
        }

        &-success {
            --color: #12b76a;
        }

        &-warning {
            --color: #f79009;
        }

        &-close {
            display: flex;
            height: 19px;
            width: 19px;
            margin-right: -6px;
            align-items: center;
            justify-content: center;
            background: var(--gray-4);
            border: 0;
            border-radius: 99px;
            color: var(--foreground-secondary);

            &:hover {
                background: var(--gray-5);
            }
        }

        &-dot {
            display: inline-block;
            height: 9px;
            width: 9px;
            background: var(--color);
            border-radius: 99px;
        }

        &-icon {
            margin-left: -3px;
            color: var(--color);
        }

        &-text-only {
            border-color: var(--color);
        }
    }
</style>
