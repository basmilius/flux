<template>
    <div
        v-if="isRendered"
        :aria-live="color === 'danger' ? 'assertive' : 'polite'"
        :class="clsx(
            color === 'gray' && $style.snackbarGray,
            color === 'primary' && $style.snackbarPrimary,
            color === 'danger' && $style.snackbarDanger,
            color === 'info' && $style.snackbarInfo,
            color === 'success' && $style.snackbarSuccess,
            color === 'warning' && $style.snackbarWarning
        )"
        :role="color === 'danger' ? 'alert' : 'status'"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave">
        <div :class="$style.snackbarContent">
            <FluxSpinner
                v-if="isLoading"
                :size="18"/>

            <FluxIcon
                v-else-if="icon"
                :size="18"
                :name="icon"/>

            <div :class="$style.snackbarBody">
                <div
                    v-if="title"
                    :class="$style.snackbarTitle">
                    {{ title }}
                </div>

                <div
                    v-if="message"
                    :class="$style.snackbarMessage">
                    {{ message }}
                </div>

                <FluxProgressBar
                    v-if="progressIndeterminate || progressValue != null"
                    :is-indeterminate="progressIndeterminate"
                    :max="progressMax"
                    :min="progressMin"
                    :status="progressStatus"
                    :value="progressValue"/>

                <div
                    v-if="subMessage"
                    :class="$style.snackbarSubMessage">
                    {{ subMessage }}
                </div>
            </div>
        </div>

        <div
            v-if="hasActions"
            :class="$style.snackbarActions">
            <button
                v-for="(actionLabel, actionKey) of actions"
                :key="actionKey"
                :class="$style.snackbarAction"
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
    import type { FluxColor, FluxIconName, FluxSnackbarObject } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { computed, onBeforeUnmount, ref, watch, watchEffect } from 'vue';
    import { addSnackbar, pauseSnackbar, removeSnackbar, resumeSnackbar, updateSnackbar } from '~flux/components/data';
    import FluxAction from './FluxAction.vue';
    import FluxIcon from './FluxIcon.vue';
    import FluxProgressBar from './FluxProgressBar.vue';
    import FluxSpinner from './FluxSpinner.vue';
    import $style from '~flux/components/css/component/Snackbar.module.scss';

    const emit = defineEmits<{
        action: [string];
        close: [];
    }>();

    const {
        actions,
        color = 'gray',
        icon,
        id: storeId,
        isCloseable,
        isLoading,
        isRendered,
        message,
        progressIndeterminate,
        progressMax,
        progressMin,
        progressStatus,
        progressValue,
        subMessage,
        title
    } = defineProps<{
        readonly actions?: Record<string, string>;
        readonly color?: FluxColor;
        readonly icon?: FluxIconName;
        readonly id?: number;
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
    }>();

    const id = ref<number | null>(null);

    const hasActions = computed(() => actions && Object.entries(actions).length > 0);

    function onMouseEnter(): void {
        if (storeId != null) {
            pauseSnackbar(storeId);
        }
    }

    function onMouseLeave(): void {
        if (storeId != null) {
            resumeSnackbar(storeId);
        }
    }

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

    function buildSpec(): Omit<FluxSnackbarObject, 'id'> {
        return {
            actions,
            color,
            icon,
            isCloseable,
            isLoading,
            isRendered,
            message,
            progressIndeterminate,
            progressMax,
            progressMin,
            progressStatus,
            progressValue,
            subMessage,
            title,
            onAction,
            onClose
        };
    }

    watchEffect(() => {
        if (!id.value) {
            return;
        }

        updateSnackbar(id.value, buildSpec());
    });

    watch(() => isRendered, () => {
        if (isRendered) {
            if (id.value) {
                removeSnackbar(id.value);
            }

            return;
        }

        id.value = addSnackbar(buildSpec());
    }, {immediate: true});
</script>
