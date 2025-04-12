<template>
    <FluxPressable
        :class="clsx(
            color === 'gray' && $style.tagGray,
            color === 'primary' && $style.tagPrimary,
            color === 'danger' && $style.tagDanger,
            color === 'info' && $style.tagInfo,
            color === 'success' && $style.tagSuccess,
            color === 'warning' && $style.tagWarning
        )"
        :component-type="type"
        :tabindex="tabindex"
        :href="href"
        :rel="rel"
        :target="target"
        :to="to"
        @click="$emit('click', $event)"
        @mouseenter="$emit('mouseenter', $event)"
        @mouseleave="$emit('mouseleave', $event)">
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
            :name="icon"
            :size="16"/>

        <span :class="$style.tagLabel">
            {{ label }}
        </span>

        <button
            v-if="!isClickable && isDeletable"
            :class="$style.tagClose"
            type="button"
            @click="onDeleteClick()">
            <FluxIcon name="xmark"/>
        </button>
    </FluxPressable>
</template>

<script
    lang="ts"
    setup>
    import type { FluxButtonEmits, FluxColor, FluxIconName, FluxPressableType, FluxTo } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import FluxIcon from './FluxIcon.vue';
    import FluxPressable from './FluxPressable.vue';
    import FluxSpinner from './FluxSpinner.vue';
    import $style from '$flux/css/component/Badge.module.scss';

    const emit = defineEmits<FluxButtonEmits & {
        delete: [];
    }>();

    const {
        color = 'gray',
        isClickable
    } = defineProps<{
        readonly color?: FluxColor;
        readonly dot?: boolean;
        readonly icon?: FluxIconName;
        readonly isClickable?: boolean;
        readonly isDeletable?: boolean;
        readonly isLoading?: boolean;
        readonly label: string;
        readonly type?: FluxPressableType;
        readonly tabindex?: string | number;
        readonly href?: string;
        readonly rel?: string;
        readonly target?: string;
        readonly to?: FluxTo;
    }>();

    function onDeleteClick(): void {
        emit('delete');
    }
</script>
