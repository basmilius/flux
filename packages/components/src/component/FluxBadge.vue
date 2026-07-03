<template>
    <FluxPressable
        :class="clsx(
            color === 'gray' && $style.badgeGray,
            color === 'primary' && $style.badgePrimary,
            color === 'danger' && $style.badgeDanger,
            color === 'info' && $style.badgeInfo,
            color === 'success' && $style.badgeSuccess,
            color === 'warning' && $style.badgeWarning,
            size === 'small' && $style.isSmall,
            size === 'large' && $style.isLarge
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
            :size="iconSize"/>

        <span
            v-else-if="dot"
            :class="$style.badgeDot"/>

        <FluxIcon
            v-else-if="icon"
            :class="$style.badgeIcon"
            :size="iconSize"
            :name="icon"/>

        <span :class="$style.badgeLabel">
            {{ label }}
        </span>

        <button
            v-if="type === 'none' && isDeletable"
            :class="$style.badgeClose"
            type="button"
            :aria-label="translate('flux.delete')"
            @click.stop="onDeleteClick()">
            <FluxIcon name="xmark"/>
        </button>
    </FluxPressable>
</template>

<script
    lang="ts"
    setup>
    import type { FluxButtonEmits, FluxColor, FluxIconName, FluxPressableType, FluxSize, FluxTo } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { computed } from 'vue';
    import { useTranslate } from '~flux/components/composable/private';
    import FluxIcon from './FluxIcon.vue';
    import FluxPressable from './FluxPressable.vue';
    import FluxSpinner from './FluxSpinner.vue';
    import $style from '~flux/components/css/component/Badge.module.scss';

    const emit = defineEmits<FluxButtonEmits & {
        delete: [];
    }>();

    const {
        color = 'gray',
        size = 'medium',
        type = 'none'
    } = defineProps<{
        readonly color?: FluxColor;
        readonly dot?: boolean;
        readonly icon?: FluxIconName;
        readonly isDeletable?: boolean;
        readonly isLoading?: boolean;
        readonly label: string;
        readonly size?: FluxSize;
        readonly type?: FluxPressableType;
        readonly tabindex?: string | number;
        readonly href?: string;
        readonly rel?: string;
        readonly target?: string;
        readonly to?: FluxTo;
    }>();

    const translate = useTranslate();

    const iconSizes = {
        small: 12,
        medium: 16,
        large: 18
    } as const;

    const iconSize = computed(() => iconSizes[size]);

    function onDeleteClick(): void {
        emit('delete');
    }
</script>
