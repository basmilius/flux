<template>
    <div
        v-if="isRendered"
        :class="clsx(
            color === 'gray' && styles.snackbarGray,
            color === 'primary' && styles.snackbarPrimary,
            color === 'danger' && styles.snackbarDanger,
            color === 'info' && styles.snackbarInfo,
            color === 'success' && styles.snackbarSuccess,
            color === 'warning' && styles.snackbarWarning
        )">
        <div :class="styles.snackbarContent">
            <FluxSpinner
                v-if="isLoading"
                :size="18"/>

            <FluxIcon
                v-else-if="icon"
                :size="18"
                :variant="icon"/>

            <div :class="styles.snackbarBody">
                <div
                    v-if="title"
                    :class="styles.snackbarTitle">
                    {{ title }}
                </div>

                <div
                    v-if="message"
                    :class="styles.snackbarMessage">
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
                    :class="styles.snackbarSubMessage">
                    {{ subMessage }}
                </div>
            </div>
        </div>

        <div
            v-if="hasActions"
            :class="styles.snackbarActions">
            <button
                v-for="(actionLabel, actionKey) of actions"
                :key="actionKey"
                :class="styles.snackbarAction"
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
    import { addSnackbar, removeSnackbar, updateSnackbar } from '@/data';
    import type { ColorVariant, FluxSnackbarObject, IconName } from '@/types';
    import FluxAction from './FluxAction.vue';
    import FluxIcon from './FluxIcon.vue';
    import FluxProgressBar from './FluxProgressBar.vue';
    import FluxSpinner from './FluxSpinner.vue';
    import styles from '@/css/component/Snackbar.module.scss';

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
        readonly color?: ColorVariant;
        readonly icon?: IconName;
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
