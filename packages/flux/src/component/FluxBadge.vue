<template>
    <Component
        :is="component"
        :class="clsx(
            color === 'gray' && styles.badgeGray,
            color === 'primary' && styles.badgePrimary,
            color === 'danger' && styles.badgeDanger,
            color === 'info' && styles.badgeInfo,
            color === 'success' && styles.badgeSuccess,
            color === 'warning' && styles.badgeWarning
        )"
        @click="onClick">
        <FluxSpinner
            v-if="isLoading"
            :class="styles.badgeIcon"
            :size="16"/>

        <span
            v-else-if="dot"
            :class="styles.badgeDot"/>

        <FluxIcon
            v-else-if="icon"
            :class="styles.badgeIcon"
            :size="16"
            :variant="icon"/>

        <span :class="styles.badgeLabel">
            {{ label }}
        </span>

        <button
            v-if="!isClickable && isDeletable"
            :class="styles.badgeClose"
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
