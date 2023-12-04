<template>
    <Component
        :is="component"
        class="flux-badge"
        :class="{
            [`is-${color}`]: true,
            'is-tag': isTag,
            'is-text-only': !dot && !icon && !isLoading && !isDeletable,
            'is-border-colored': !dot && !icon && !isLoading && !isDeletable && color
        }"
        @click="onClick">
        <FluxSpinner
            v-if="isLoading"
            class="flux-badge-icon"
            :size="16"/>

        <span
            v-else-if="dot"
            class="flux-badge-dot"/>

        <FluxIcon
            v-else-if="icon"
            class="flux-badge-icon"
            :size="16"
            :variant="icon"/>

        <span class="flux-badge-label">{{ label }}</span>

        <button
            v-if="!isClickable && isDeletable"
            class="flux-badge-close"
            type="button"
            @click="$emit('delete')">
            <FluxIcon variant="xmark"/>
        </button>
    </component>
</template>

<script
    lang="ts"
    setup>
    import type { IconNames } from '@/data';
    import { computed, toRefs, unref } from 'vue-demi';
    import FluxIcon from './FluxIcon.vue';
    import FluxSpinner from './FluxSpinner.vue';

    export interface Emits {
        (e: 'click', evt: MouseEvent): void;

        (e: 'delete'): void;
    }

    export interface Props {
        readonly color?: 'primary' | 'danger' | 'info' | 'success' | 'warning';
        readonly dot?: boolean;
        readonly icon?: IconNames;
        readonly isClickable?: boolean;
        readonly isDeletable?: boolean;
        readonly isLoading?: boolean;
        readonly isTag?: boolean;
        readonly label: string;
    }

    const emit = defineEmits<Emits>();
    const props = defineProps<Props>();
    const {isClickable} = toRefs(props);

    const component = computed(() => unref(isClickable) ? 'button' : 'div');

    function onClick(evt: MouseEvent): void {
        if (!unref(isClickable)) {
            return;
        }

        emit('click', evt);
    }
</script>

<style lang="scss">
    .flux-badge {
        --color: currentColor;

        display: inline-flex;
        height: 28px;
        margin-top: -2px;
        margin-bottom: -2px;
        padding-left: 9px;
        padding-right: 9px;
        align-items: center;
        gap: 6px;
        background: rgb(var(--gray-0));
        border: 1px solid rgb(var(--gray-4));
        border-radius: 99px;
        color: var(--foreground-prominent);
        font-size: 13px;
        font-weight: 500;

        &-close {
            display: flex;
            height: 20px;
            width: 20px;
            margin-right: -6px;
            padding: 5px;
            align-items: center;
            justify-content: center;
            background: rgb(var(--gray-4) / .75);
            border: 0;
            border-radius: 99px;
            color: var(--foreground-secondary);
            cursor: pointer;

            &:hover {
                background: rgb(var(--gray-5));
            }
        }

        &-dot {
            display: block;
            height: 9px;
            width: 9px;
            background: var(--color);
            border-radius: 99px;
        }

        &-icon {
            margin-left: -3px;
            color: var(--color);
        }

        &-label {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        &.is-tag {
            background: rgb(var(--gray-2));
            border-color: rgb(var(--gray-4));
            border-radius: calc(var(--radius) / 2);
            font-weight: 400;
        }

        &.is-tag &-close {
            background: rgb(var(--gray-2));
            border-radius: calc(var(--radius) / 3);
            color: rgb(var(--gray-7));

            &:hover {
                background: rgb(var(--gray-3));
            }
        }

        &.is-text-only {
            padding-left: 12px;
            padding-right: 12px;

            &.is-border-colored {
                border-color: var(--color);
            }
        }

        &.is-primary {
            --color: rgb(var(--primary-7));
        }

        &.is-danger {
            --color: rgb(var(--danger-7));
        }

        &.is-info {
            --color: rgb(var(--info-7));
        }

        &.is-success {
            --color: rgb(var(--success-7));
        }

        &.is-warning {
            --color: rgb(var(--warning-7));
        }
    }

    button.flux-badge {
        background: unset;
        cursor: pointer;
        transition: background 180ms var(--swift-out);

        &:hover {
            background: rgb(var(--gray-2));
        }
    }
</style>
