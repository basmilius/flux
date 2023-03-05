<template>
    <div
        class="flux-notice"
        :class="{
            [`flux-notice-${variant}`]: !!variant,
            'is-small': isSmall
        }">
        <flux-spinner
            v-if="isLoading"
            class="flux-notice-prefix"
            :size="isSmall ? 16 : 20"/>
        <flux-icon
            v-else-if="icon"
            class="flux-notice-prefix"
            :size="isSmall ? 16 : 20"
            :variant="icon"/>

        <div class="flux-notice-body">
            <p
                v-if="title"
                class="flux-notice-title">
                {{ title }}
            </p>
            <p
                v-if="message"
                class="flux-notice-message">
                {{ message }}
            </p>
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { IconNames } from '../data';
    import { FluxIcon, FluxSpinner } from '.';

    export interface Props {
        readonly icon?: IconNames;
        readonly isLoading?: boolean;
        readonly isSmall?: boolean;
        readonly message: string;
        readonly title?: string;
        readonly variant?: 'gray' | 'primary' | 'danger' | 'info' | 'success' | 'warning';
    }

    withDefaults(defineProps<Props>(), {
        variant: 'gray'
    });
</script>

<style lang="scss">
    .flux-notice {
        display: flex;
        padding: 21px;
        gap: 15px;
        background: var(--background);
        border-radius: var(--radius);
        color: var(--foreground);

        &-gray {
            --background: rgb(var(--gray-2));
            --foreground: rgb(var(--gray-9));
            --foreground-prominent: rgb(var(--gray-11));
            --spinner-track: rgb(var(--gray-4));
            --spinner-value: rgb(var(--gray-10));
        }

        &-primary {
            --background: rgb(var(--primary-2));
            --foreground: rgb(var(--primary-11));
            --foreground-prominent: rgb(var(--primary-7));
            --spinner-track: rgb(var(--primary-3));
            --spinner-value: rgb(var(--primary-7));
        }

        &-danger {
            --background: rgb(var(--danger-2));
            --foreground: rgb(var(--danger-11));
            --foreground-prominent: rgb(var(--danger-7));
            --spinner-track: rgb(var(--danger-3));
            --spinner-value: rgb(var(--danger-7));
        }

        &-info {
            --background: rgb(var(--info-2));
            --foreground: rgb(var(--info-11));
            --foreground-prominent: rgb(var(--info-7));
            --spinner-track: rgb(var(--info-3));
            --spinner-value: rgb(var(--info-7));
        }

        &-success {
            --background: rgb(var(--success-2));
            --foreground: rgb(var(--success-11));
            --foreground-prominent: rgb(var(--success-7));
            --spinner-track: rgb(var(--success-3));
            --spinner-value: rgb(var(--success-7));
        }

        &-warning {
            --background: rgb(var(--warning-2));
            --foreground: rgb(var(--warning-11));
            --foreground-prominent: rgb(var(--warning-7));
            --spinner-track: rgb(var(--warning-3));
            --spinner-value: rgb(var(--warning-7));
        }

        &-body {
            display: flex;
            flex-flow: column;
            gap: 3px;
        }

        &-prefix {
            margin-top: 1px;
            flex-shrink: 0;
            color: var(--foreground-prominent);
        }

        &-message,
        &-title {
            margin: 0;
        }

        &-title {
            color: var(--foreground-prominent);
            font-weight: 700;
        }

        &.is-small {
            padding: 15px;
            gap: 12px;
        }

        &.is-small &-body {
            margin-top: -3px;
            margin-bottom: -3px;
        }
    }
</style>
