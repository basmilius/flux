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
    import { computed, onBeforeUnmount, ref, toRefs, watch } from 'vue';
    import type { FluxSnackbarSpec, IconNames } from '@/data';
    import { addSnackbar, removeSnackbar, updateSnackbar } from '@/data';
    import { unrefObject } from '@/util';
    import FluxAction from './FluxAction.vue';
    import FluxIcon from './FluxIcon.vue';
    import FluxProgressBar from './FluxProgressBar.vue';
    import FluxSpinner from './FluxSpinner.vue';
    import styles from '@/css/component/Snackbar.module.scss';

    export type Emits = {
        action: [string];
        close: [];
    };

    export type Props = {
        readonly actions?: Record<string, string>;
        readonly color?: 'gray' | 'primary' | 'danger' | 'info' | 'success' | 'warning';
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
    };

    const emit = defineEmits<Emits>();
    const props = withDefaults(defineProps<Props>(), {
        color: 'gray'
    });
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
