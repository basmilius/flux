<template>
    <Component
        :is="component"
        :class="clsx(
            color === 'gray' && styles.tagGray,
            color === 'primary' && styles.tagPrimary,
            color === 'danger' && styles.tagDanger,
            color === 'info' && styles.tagInfo,
            color === 'success' && styles.tagSuccess,
            color === 'warning' && styles.tagWarning
        )"
        @click="onClick">
        <FluxSpinner
            v-if="isLoading"
            :class="styles.tagIcon"
            :size="16"/>

        <span
            v-else-if="dot"
            :class="styles.tagDot"/>

        <FluxIcon
            v-else-if="icon"
            :class="styles.tagIcon"
            :size="16"
            :variant="icon"/>

        <span :class="styles.tagLabel">
            {{ label }}
        </span>

        <button
            v-if="!isClickable && isDeletable"
            :class="styles.tagClose"
            type="button"
            @click="onDeleteClick()">
            <FluxIcon variant="xmark"/>
        </button>
    </component>
</template>

<script
    lang="ts"
    setup>
    import { clsx } from 'clsx';
    import { computed } from 'vue';
    import type { ColorVariant, IconName } from '@/types';
    import styles from '@/css/component/Badge.module.scss';
    import FluxIcon from './FluxIcon.vue';
    import FluxSpinner from './FluxSpinner.vue';

    const emit = defineEmits<{
        click: [MouseEvent];
        delete: [];
    }>();

    const {
        color = 'gray',
        isClickable
    } = defineProps<{
        readonly color?: ColorVariant;
        readonly dot?: boolean;
        readonly icon?: IconName;
        readonly isClickable?: boolean;
        readonly isDeletable?: boolean;
        readonly isLoading?: boolean;
        readonly label: string;
    }>();

    const component = computed(() => isClickable ? 'button' : 'div');

    function onClick(evt: MouseEvent): void {
        if (!isClickable) {
            return;
        }

        emit('click', evt);
    }

    function onDeleteClick(): void {
        emit('delete');
    }
</script>
