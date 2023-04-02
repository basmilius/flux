<template>
    <div
        class="flux-snackbar"
        :class="{
            [`flux-snackbar-${color}`]: !!color
        }">
        <flux-icon
            v-if="icon"
            class="flux-snackbar-icon"
            :size="18"
            :variant="icon"/>

        <div class="flux-snackbar-body">
            <div
                v-if="message"
                class="flux-snackbar-message">
                {{ message }}
            </div>

            <div
                v-if="subMessage"
                class="flux-snackbar-sub-message">
                {{ subMessage }}
            </div>
        </div>

        <flux-table-action icon="xmark"/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { IconNames } from '../data';
    import { FluxIcon, FluxTableAction } from '.';

    export interface Emits {
    }

    export interface Props {
        readonly color?: 'primary' | 'danger' | 'info' | 'success' | 'warning';
        readonly icon?: IconNames;
        readonly message?: string;
        readonly subMessage?: string;
    }

    defineEmits<Emits>();
    defineProps<Props>();
</script>

<style lang="scss">
    @use '../scss/mixin' as flux;

    .flux-snackbar {
        --snackbar-background: rgb(var(--gray-0));
        --snackbar-border: rgb(var(--gray-4) / .75);
        --snackbar-foreground: var(--foreground-prominent);
        --snackbar-foreground-secondary: var(--foreground-secondary);
        --snackbar-icon: var(--foreground);

        display: flex;
        padding: 18px;
        gap: 15px;
        box-shadow: var(--shadow-lg);
        background: var(--snackbar-background);
        background-clip: padding-box;
        border: 1px solid var(--snackbar-border);
        border-radius: var(--radius);
        color: var(--snackbar-foreground);

        &-body {
            display: flex;
            flex-flow: column;
            flex-grow: 1;
            gap: 1px;
        }

        &-icon {
            flex-shrink: 0;
            color: var(--snackbar-icon);
            translate: 0 3px;
        }

        &-message {
            font-weight: 500;
        }

        &-sub-message {
            color: var(--snackbar-foreground-secondary);
            font-size: 14px;
        }

        &-danger {
            --snackbar-background: rgb(var(--danger-8));
            --snackbar-border: rgb(var(--danger-8));
            --snackbar-foreground: rgb(var(--danger-0));
            --snackbar-foreground-secondary: rgb(var(--danger-3));
            --snackbar-icon: rgb(var(--danger-4));
        }

        &-success {
            --snackbar-background: rgb(var(--success-8));
            --snackbar-border: rgb(var(--success-8));
            --snackbar-foreground: rgb(var(--success-0));
            --snackbar-foreground-secondary: rgb(var(--success-3));
            --snackbar-icon: rgb(var(--success-4));
        }

        .flux-table-action {
            --button-background-active: rgb(0 0 0 / .1);
            --button-background-hover: rgb(0 0 0 / .1);
            --button-icon: var(--snackbar-foreground-secondary);

            margin-top: -6px;
            margin-right: -6px;
        }
    }
</style>
