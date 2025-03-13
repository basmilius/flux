<template>
    <div
        v-if="isRendered"
        :class="clsx(
            color === 'gray' && $style.snackbarGray,
            color === 'primary' && $style.snackbarPrimary,
            color === 'danger' && $style.snackbarDanger,
            color === 'info' && $style.snackbarInfo,
            color === 'success' && $style.snackbarSuccess,
            color === 'warning' && $style.snackbarWarning
        )">
        <div :class="$style.snackbarContent">
            <FluxSpinner
                v-if="isLoading"
                :size="18"/>

            <FluxIcon
                v-else-if="icon"
                :size="18"
                :variant="icon"/>

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
                    v-if="progressIndeterminate || progressValue"
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
    import { clsx } from 'clsx';
    import { computed, getCurrentInstance, onBeforeUnmount, ref, watch, watchEffect } from 'vue';
    import { addSnackbar, removeSnackbar, updateSnackbar } from '$flux/data';
    import type { FluxColorVariant, FluxIconName, FluxSnackbarObject } from '$flux/types';
    import FluxAction from './FluxAction.vue';
    import FluxIcon from './FluxIcon.vue';
    import FluxProgressBar from './FluxProgressBar.vue';
    import FluxSpinner from './FluxSpinner.vue';
    import $style from '$flux/css/component/Snackbar.module.scss';

    const emit = defineEmits<{
        action: [string];
        close: [];
    }>();

    const {
        actions,
        color = 'gray',
        isRendered
    } = defineProps<{
        readonly actions?: Record<string, string>;
        readonly color?: FluxColorVariant;
        readonly icon?: FluxIconName;
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

    const instance = getCurrentInstance()!;

    const id = ref<number | null>(null);

    const hasActions = computed(() => actions && Object.entries(actions).length > 0);

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

    watchEffect(() => {
        if (!id.value) {
            return;
        }

        updateSnackbar(id.value, instance.props);
    });

    watch(() => isRendered, () => {
        if (isRendered) {
            if (id.value) {
                removeSnackbar(id.value);
            }

            return;
        }

        let spec: Omit<FluxSnackbarObject, 'id'> = instance.props;
        spec.onAction = onAction;
        spec.onClose = onClose;

        id.value = addSnackbar(spec);
    }, {immediate: true});
</script>
