<template>
    <component
        :is="component"
        class="flux-badge"
        :class="{
            [`flux-badge-${color}`]: true,
            'flux-badge-text-only': !dot && !icon && color
        }"
        @click="onClick">
        <flux-spinner
            v-if="isLoading"
            class="flux-badge-icon"
            :size="16"/>

        <span
            v-else-if="dot"
            class="flux-badge-dot"/>

        <flux-icon
            v-else-if="icon"
            class="flux-badge-icon"
            :size="16"
            :variant="icon"/>

        <span>{{ label }}</span>

        <button
            v-if="!isClickable && isDeletable"
            class="flux-badge-close"
            @click="$emit('delete')">
            <flux-icon variant="xmark"/>
        </button>
    </component>
</template>

<script
    lang="ts"
    setup>
    import type { IconNames } from '../data';
    import { computed, toRefs, unref } from 'vue-demi';
    import { FluxIcon, FluxSpinner } from '.';

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
    @layer component {
        .flux-badge {
            --color: currentColor;

            display: inline-flex;
            height: 27px;
            padding-left: 9px;
            padding-right: 9px;
            align-items: center;
            gap: 6px;
            background: rgb(var(--gray-0));
            border: 1px solid rgb(var(--gray-4));
            border-radius: 99px;
            color: var(--foreground);
            font-size: 13px;
            font-weight: 500;

            &-primary {
                --color: rgb(var(--primary-7));
            }

            &-danger {
                --color: rgb(var(--danger-7));
            }

            &-info {
                --color: rgb(var(--info-7));
            }

            &-success {
                --color: rgb(var(--success-7));
            }

            &-warning {
                --color: rgb(var(--warning-7));
            }

            &-close {
                display: flex;
                height: 19px;
                width: 19px;
                margin-right: -6px;
                padding: 5px;
                align-items: center;
                justify-content: center;
                background: rgb(var(--gray-4));
                border: 0;
                border-radius: 99px;
                color: var(--foreground-secondary);

                &:hover {
                    background: rgb(var(--gray-5));
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

        button.flux-badge {
            background: unset;
            cursor: pointer;
            transition: background 180ms var(--swift-out);

            &:hover {
                background: rgb(var(--gray-2));
            }
        }
    }
</style>
