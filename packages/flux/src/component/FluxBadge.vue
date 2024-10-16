<template>
    <Component
        :is="component"
        :class="clsx(
            color === 'gray' && $style.badgeGray,
            color === 'primary' && $style.badgePrimary,
            color === 'danger' && $style.badgeDanger,
            color === 'info' && $style.badgeInfo,
            color === 'success' && $style.badgeSuccess,
            color === 'warning' && $style.badgeWarning
        )"
        @click="onClick">
        <FluxSpinner
            v-if="isLoading"
            :class="$style.badgeIcon"
            :size="16"/>

        <span
            v-else-if="dot"
            :class="$style.badgeDot"/>

        <FluxIcon
            v-else-if="icon"
            :class="$style.badgeIcon"
            :size="16"
            :variant="icon"/>

        <span :class="$style.badgeLabel">
            {{ label }}
        </span>

        <button
            v-if="!isClickable && isDeletable"
            :class="$style.badgeClose"
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
    import FluxIcon from './FluxIcon.vue';
    import FluxSpinner from './FluxSpinner.vue';
    import $style from '@/css/component/Badge.module.scss';

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
