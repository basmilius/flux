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

    interface Props {
        readonly icon?: IconNames;
        readonly isLoading?: boolean;
        readonly isSmall?: boolean;
        readonly message: string;
        readonly title?: string;
        readonly variant?: 'error' | 'info' | 'success' | 'warning';
    }

    withDefaults(defineProps<Props>(), {
        variant: 'info'
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

        &-error {
            --background: #fef3f2;
            --foreground: #7a271a;
            --foreground-prominent: #f04438;
        }

        &-info {
            --background: #eff4ff;
            --foreground: #00359e;
            --foreground-prominent: #2970ff;
        }

        &-success {
            --background: #ecfdf3;
            --foreground: #054f31;
            --foreground-prominent: #12b76a;
        }

        &-warning {
            --background: #fffaeb;
            --foreground: #7a2e0e;
            --foreground-prominent: #f79009;
        }

        &-body {
            display: flex;
            flex-flow: column;
            gap: 3px;
        }

        &-prefix {
            --spinner-track: rgb(0 0 0 / .0375);
            --spinner-value: currentColor;

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
