<template>
    <div
        class="flux-notice"
        :class="{
            [`is-${variant}`]: !!variant,
            'is-center': isCenter,
            'is-fluid': isFluid,
            'is-small': isSmall
        }">
        <FluxSpinner
            v-if="isLoading"
            class="flux-notice-prefix"
            :size="isSmall ? 16 : 20"/>

        <FluxIcon
            v-if="icon && !isLoading"
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
            <slot/>
        </div>

        <slot name="end"/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { IconNames } from '../data';
    import FluxIcon from './FluxIcon.vue';
    import FluxSpinner from './FluxSpinner.vue';

    export interface Props {
        readonly icon?: IconNames;
        readonly isCenter?: boolean;
        readonly isFluid?: boolean;
        readonly isLoading?: boolean;
        readonly isSmall?: boolean;
        readonly message?: string;
        readonly title?: string;
        readonly variant?: 'gray' | 'primary' | 'danger' | 'info' | 'success' | 'warning';
    }

    withDefaults(defineProps<Props>(), {
        variant: 'gray'
    });
</script>

<style lang="scss">
    @use '../scss/mixin' as flux;

    .flux-notice {
        display: flex;
        padding: 21px;
        gap: 15px;
        background: var(--notice-background);
        border-radius: var(--radius);
        color: var(--notice-foreground);

        &.is-gray {
            --notice-background: rgb(var(--gray-2));
            --notice-foreground: var(--foreground);
            --notice-foreground-prominent: var(--foreground-prominent);
            --spinner-track: rgb(var(--gray-4));
            --spinner-value: rgb(var(--gray-10));
        }

        &.is-primary {
            --notice-background: rgb(var(--primary-2));
            --notice-foreground: rgb(var(--primary-11));
            --notice-foreground-prominent: rgb(var(--primary-7));
            --spinner-track: rgb(var(--primary-3));
            --spinner-value: rgb(var(--primary-7));
        }

        &.is-danger {
            --notice-background: rgb(var(--danger-2));
            --notice-foreground: rgb(var(--danger-11));
            --notice-foreground-prominent: rgb(var(--danger-7));
            --spinner-track: rgb(var(--danger-3));
            --spinner-value: rgb(var(--danger-7));
        }

        &.is-info {
            --notice-background: rgb(var(--info-2));
            --notice-foreground: rgb(var(--info-11));
            --notice-foreground-prominent: rgb(var(--info-7));
            --spinner-track: rgb(var(--info-3));
            --spinner-value: rgb(var(--info-7));
        }

        &.is-success {
            --notice-background: rgb(var(--success-2));
            --notice-foreground: rgb(var(--success-11));
            --notice-foreground-prominent: rgb(var(--success-7));
            --spinner-track: rgb(var(--success-3));
            --spinner-value: rgb(var(--success-7));
        }

        &.is-warning {
            --notice-background: rgb(var(--warning-2));
            --notice-foreground: rgb(var(--warning-11));
            --notice-foreground-prominent: rgb(var(--warning-7));
            --spinner-track: rgb(var(--warning-3));
            --spinner-value: rgb(var(--warning-7));
        }

        &-body {
            display: flex;
            flex-flow: column;
            flex-grow: 1;
            gap: 3px;
        }

        &-prefix {
            margin-top: 1px;
            flex-shrink: 0;
            color: var(--notice-foreground-prominent);
        }

        &-message,
        &-title {
            margin: 0;
        }

        ul {
            padding-left: 0;
            list-style-type: none;

            li + li {
                margin-top: 9px;
            }
        }

        a {
            color: var(--notice-foreground);
        }

        &-title {
            color: var(--notice-foreground-prominent);
            font-weight: 700;
        }

        &.is-small {
            padding: 15px;
            gap: 12px;
        }

        &.is-center {
            justify-content: center;
            text-align: center;
        }

        &.is-fluid {
            border: 1px solid var(--spinner-track);
            border-left: 0;
            border-right: 0;
            border-radius: 0;

            &:first-child {
                border-top: 0;
            }

            &:last-child {
                border-bottom: 0;
            }
        }

        &.is-small &-body {
            margin-top: -3px;
            margin-bottom: -3px;
        }

        ul {
            margin-top: 3px;
            padding-left: 1em;
            list-style-type: disc;
        }

        .flux-button {
            margin-top: -9px;
            margin-right: -9px;
            margin-bottom: -9px;
        }

        &.is-small .flux-button {
            height: 36px;
        }
    }

    @include flux.dark-mode {
        .flux-notice {
            &.is-gray {
                --notice-background: rgb(var(--gray-2));
                --notice-foreground: var(--foreground);
                --notice-foreground-prominent: var(--foreground-prominent);
            }

            &.is-primary {
                --notice-background: rgb(var(--primary-11) / .5);
                --notice-foreground: rgb(var(--primary-4));
                --notice-foreground-prominent: rgb(var(--primary-6));
                --spinner-track: rgb(var(--primary-11));
            }

            &.is-danger {
                --notice-background: rgb(var(--danger-11) / .5);
                --notice-foreground: rgb(var(--danger-4));
                --notice-foreground-prominent: rgb(var(--danger-6));
                --spinner-track: rgb(var(--danger-11));
            }

            &.is-info {
                --notice-background: rgb(var(--info-11) / .5);
                --notice-foreground: rgb(var(--info-4));
                --notice-foreground-prominent: rgb(var(--info-6));
                --spinner-track: rgb(var(--info-11));
            }

            &.is-success {
                --notice-background: rgb(var(--success-11) / .5);
                --notice-foreground: rgb(var(--success-4));
                --notice-foreground-prominent: rgb(var(--success-6));
                --spinner-track: rgb(var(--success-11));
            }

            &.is-warning {
                --notice-background: rgb(var(--warning-11) / .5);
                --notice-foreground: rgb(var(--warning-4));
                --notice-foreground-prominent: rgb(var(--warning-6));
                --spinner-track: rgb(var(--warning-11));
            }
        }
    }

    .flux-pane-header + .flux-notice,
    .flux-pane-header + .flux-stack > .flux-notice {
        margin-top: 21px;
    }

    .flux-pane > .flux-notice,
    .flux-pane > .flux-stack > .flux-notice {
        padding-left: 21px;
        padding-right: 21px;
        border-radius: 0;
    }
</style>
