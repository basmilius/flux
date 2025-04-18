<template>
    <FluxPressable
        :class="clsx(
            color === 'gray' && $style.badgeGray,
            color === 'primary' && $style.badgePrimary,
            color === 'danger' && $style.badgeDanger,
            color === 'info' && $style.badgeInfo,
            color === 'success' && $style.badgeSuccess,
            color === 'warning' && $style.badgeWarning
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
            :class="$style.badgeIcon"
            :size="16"/>

        <span
            v-else-if="dot"
            :class="$style.badgeDot"/>

        <FluxIcon
            v-else-if="icon"
            :class="$style.badgeIcon"
            :size="16"
            :name="icon"/>

        <span :class="$style.badgeLabel">
            {{ label }}
        </span>

        <button
            v-if="type === 'none' && isDeletable"
            :class="$style.badgeClose"
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
        type = 'none'
    } = defineProps<{
        readonly color?: FluxColor;
        readonly dot?: boolean;
        readonly icon?: FluxIconName;
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
