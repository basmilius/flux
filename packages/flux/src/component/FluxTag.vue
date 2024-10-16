<template>
    <Component
        :is="component"
        :class="clsx(
            color === 'gray' && $style.tagGray,
            color === 'primary' && $style.tagPrimary,
            color === 'danger' && $style.tagDanger,
            color === 'info' && $style.tagInfo,
            color === 'success' && $style.tagSuccess,
            color === 'warning' && $style.tagWarning
        )"
        @click="onClick">
        <FluxSpinner
            v-if="isLoading"
            :class="$style.tagIcon"
            :size="16"/>

        <span
            v-else-if="dot"
            :class="$style.tagDot"/>

        <FluxIcon
            v-else-if="icon"
            :class="$style.tagIcon"
            :size="16"
            :variant="icon"/>

        <span :class="$style.tagLabel">
            {{ label }}
        </span>

        <button
            v-if="!isClickable && isDeletable"
            :class="$style.tagClose"
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
