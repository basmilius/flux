<template>
    <div
        v-if="isRendered"
        class="flux-surface flux-snackbar"
        :class="{
            [`is-${color}`]: !!color
        }">
        <div class="flux-snackbar-content">
            <FluxSpinner
                v-if="isLoading"
                class="flux-snackbar-spinner"
                :size="18"/>

            <FluxIcon
                v-else-if="icon"
                class="flux-snackbar-icon"
                :size="18"
                :variant="icon"/>

            <div class="flux-snackbar-body">
                <div
                    v-if="title"
                    class="flux-snackbar-title">
                    {{ title }}
                </div>

                <div
                    v-if="message"
                    class="flux-snackbar-message">
                    {{ message }}
                </div>

                <FluxProgressBar
                    v-if="progressIndeterminate || progressValue"
                    class="flux-snackbar-progress-bar"
                    :is-indeterminate="progressIndeterminate"
                    :max="progressMax"
                    :min="progressMin"
                    :status="progressStatus"
                    :value="progressValue"/>

                <div
                    v-if="subMessage"
                    class="flux-snackbar-sub-message">
                    {{ subMessage }}
                </div>
            </div>
        </div>

        <div
            v-if="hasActions"
            class="flux-snackbar-actions">
            <button
                v-for="(actionLabel, actionKey) of actions"
                :key="actionKey"
                class="flux-snackbar-action"
                tabindex="-1"
                type="button"
                @click="onAction(actionKey)">
                <span>{{ actionLabel }}</span>
            </button>
        </div>

        <FluxAction
            v-if="isCloseable"
            icon="xmark"
            @click="onClose()"/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { computed, onBeforeUnmount, ref, toRefs, watch } from 'vue';
    import type { FluxSnackbarSpec, IconNames } from '@/data';
    import { addSnackbar, removeSnackbar, updateSnackbar } from '@/data';
    import { unrefObject } from '@/util';
    import FluxAction from './FluxAction.vue';
    import FluxIcon from './FluxIcon.vue';
    import FluxProgressBar from './FluxProgressBar.vue';
    import FluxSpinner from './FluxSpinner.vue';

    export interface Emits {
        (e: 'action', actionKey: string): void;

        (e: 'close'): void;
    }

    export interface Props {
        readonly actions?: Record<string, string>;
        readonly color?: 'primary' | 'danger' | 'info' | 'success' | 'warning';
        readonly icon?: IconNames;
        readonly isCloseable?: boolean;
        readonly isLoading?: boolean;
        readonly isRendered?: boolean;
        readonly message?: string;
        readonly progressIndeterminate?: boolean;
        readonly progressMax?: number;
        readonly progressMin?: number;
        readonly progressStatus?: string;
        readonly progressValue?: number;
        readonly subMessage?: string;
        readonly title?: string;
    }

    const emit = defineEmits<Emits>();
    const props = defineProps<Props>();
    const propRefs = toRefs(props);

    const id = ref<number | null>(null);

    const hasActions = computed(() => props.actions && Object.entries(props.actions).length > 0);

    onBeforeUnmount(() => {
        if (id.value) {
            removeSnackbar(id.value);
        }
    });

    function onAction(actionKey: string): void {
        emit('action', actionKey);
    }

    function onClose(): void {
        emit('close');
    }

    watch(props, props => {
        if (!id.value) {
            return;
        }

        updateSnackbar(id.value, props);
    });

    watch(propRefs.isRendered, isRendered => {
        if (isRendered) {
            if (id.value) {
                removeSnackbar(id.value);
            }

            return;
        }

        let spec: Omit<FluxSnackbarSpec, 'id'> = unrefObject(propRefs);
        spec.onAction = onAction;
        spec.onClose = onClose;

        id.value = addSnackbar(spec);
    }, {immediate: true});
</script>

<style lang="scss">
    @use '../css/mixin' as flux;

    .flux-snackbar {
        --snackbar-title: var(--foreground-prominent);

        display: flex;
        box-shadow: var(--shadow-lg);
        overflow: hidden;

        &-content {
            display: flex;
            padding: 15px 18px;
            align-items: flex-start;
            flex-grow: 1;
            gap: 15px;
        }

        &-body {
            display: flex;
            align-self: stretch;
            flex-flow: column;
            flex-grow: 1;
            gap: 3px;
        }

        &-action {
            display: flex;
            padding: 9px 15px;
            min-width: 84px;
            align-items: center;
            justify-content: center;
            flex-grow: 1;
            background: rgb(var(--gray-0));
            border: 0;
            border-radius: 0;
            color: var(--foreground);
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            outline: 0;
            text-align: center;
            transition: 180ms var(--swift-out);
            transition-property: background, color;

            &:hover {
                background: rgb(var(--gray-1));
                color: var(--foreground-prominent);
            }

            &:active {
                background: rgb(var(--gray-2));
            }

            &:first-child {
                color: var(--snackbar-title);
            }
        }

        &-actions {
            display: flex;
            padding-left: 1px;
            flex-flow: column;
            gap: 1px;
            background: rgb(var(--gray-3));
        }

        &-message {
            color: var(--foreground);
        }

        &-progress-bar {
            margin-top: 9px;

            &:not(:last-child) {
                margin-bottom: 6px;
            }

            .flux-progress-bar-track {
                height: 6px;
            }
        }

        &-sub-message {
            color: var(--foreground-secondary);
            font-size: 13px;
        }

        &-title {
            color: var(--snackbar-title);
            font-weight: 500;
        }

        &-icon,
        &-spinner {
            flex-shrink: 0;
            translate: 0 3px;
        }

        &-icon {
            color: var(--snackbar-title);
        }

        &.is-danger {
            --snackbar-title: rgb(var(--danger-7));
            --spinner-value: rgb(var(--danger-8));
        }

        &.is-info {
            --snackbar-title: rgb(var(--info-7));
            --spinner-value: rgb(var(--info-8));
        }

        &.is-primary {
            --snackbar-title: rgb(var(--primary-7));
            --spinner-value: rgb(var(--primary-8));
        }

        &.is-success {
            --snackbar-title: rgb(var(--success-7));
            --spinner-value: rgb(var(--success-8));
        }

        &.is-warning {
            --snackbar-title: rgb(var(--warning-7));
            --spinner-value: rgb(var(--warning-8));
        }

        .flux-action {
            --button-background-active: rgb(0 0 0 / .1);
            --button-background-hover: rgb(0 0 0 / .1);
            --button-icon: var(--foreground-secondary);

            margin-top: 12px;
            margin-right: 12px;
            margin-bottom: 12px;
        }
    }
</style>
