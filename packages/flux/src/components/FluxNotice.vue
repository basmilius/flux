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
            <slot/>
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { IconNames } from '../data';
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
    @use '../scss/mixin' as flux;

    .flux-notice {
        display: flex;
        padding: 21px;
        gap: 15px;
        background: var(--notice-background);
        border-radius: var(--radius);
        color: var(--notice-foreground);

        &-gray {
            --notice-background: rgb(var(--gray-2));
            --notice-foreground: var(--foreground);
            --notice-foreground-prominent: var(--foreground-prominent);
            --spinner-track: rgb(var(--gray-4));
            --spinner-value: rgb(var(--gray-10));
        }

        &-primary {
            --notice-background: rgb(var(--primary-2));
            --notice-foreground: rgb(var(--primary-11));
            --notice-foreground-prominent: rgb(var(--primary-7));
            --spinner-track: rgb(var(--primary-3));
            --spinner-value: rgb(var(--primary-7));
        }

        &-danger {
            --notice-background: rgb(var(--danger-2));
            --notice-foreground: rgb(var(--danger-11));
            --notice-foreground-prominent: rgb(var(--danger-7));
            --spinner-track: rgb(var(--danger-3));
            --spinner-value: rgb(var(--danger-7));
        }

        &-info {
            --notice-background: rgb(var(--info-2));
            --notice-foreground: rgb(var(--info-11));
            --notice-foreground-prominent: rgb(var(--info-7));
            --spinner-track: rgb(var(--info-3));
            --spinner-value: rgb(var(--info-7));
        }

        &-success {
            --notice-background: rgb(var(--success-2));
            --notice-foreground: rgb(var(--success-11));
            --notice-foreground-prominent: rgb(var(--success-7));
            --spinner-track: rgb(var(--success-3));
            --spinner-value: rgb(var(--success-7));
        }

        &-warning {
            --notice-background: rgb(var(--warning-2));
            --notice-foreground: rgb(var(--warning-11));
            --notice-foreground-prominent: rgb(var(--warning-7));
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

        &-title {
            color: var(--notice-foreground-prominent);
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

    @include flux.dark-mode {
        .flux-notice {
            &-gray {
                --notice-background: rgb(var(--gray-2));
                --notice-foreground: var(--foreground);
                --notice-foreground-prominent: var(--foreground-prominent);
            }

            &-primary {
                --notice-background: rgb(var(--primary-11) / .5);
                --notice-foreground: rgb(var(--primary-4));
                --notice-foreground-prominent: rgb(var(--primary-6));
                --spinner-track: rgb(var(--primary-11));
            }

            &-danger {
                --notice-background: rgb(var(--danger-11) / .5);
                --notice-foreground: rgb(var(--danger-4));
                --notice-foreground-prominent: rgb(var(--danger-6));
                --spinner-track: rgb(var(--danger-11));
            }

            &-info {
                --notice-background: rgb(var(--info-11) / .5);
                --notice-foreground: rgb(var(--info-4));
                --notice-foreground-prominent: rgb(var(--info-6));
                --spinner-track: rgb(var(--info-11));
            }

            &-success {
                --notice-background: rgb(var(--success-11) / .5);
                --notice-foreground: rgb(var(--success-4));
                --notice-foreground-prominent: rgb(var(--success-6));
                --spinner-track: rgb(var(--success-11));
            }

            &-warning {
                --notice-background: rgb(var(--warning-11) / .5);
                --notice-foreground: rgb(var(--warning-4));
                --notice-foreground-prominent: rgb(var(--warning-6));
                --spinner-track: rgb(var(--warning-11));
            }
        }
    }
</style>
