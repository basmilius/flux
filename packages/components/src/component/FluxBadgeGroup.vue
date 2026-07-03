<template>
    <FluxPressable
        :class="clsx(
            color === 'gray' && $style.badgeGroupGray,
            color === 'primary' && $style.badgeGroupPrimary,
            color === 'danger' && $style.badgeGroupDanger,
            color === 'info' && $style.badgeGroupInfo,
            color === 'success' && $style.badgeGroupSuccess,
            color === 'warning' && $style.badgeGroupWarning,
            size === 'small' && $style.badgeGroupSmall,
            size === 'large' && $style.badgeGroupLarge,
            align === 'trailing' && $style.badgeGroupTrailing
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
        <FluxBadge
            v-if="align === 'leading'"
            :color="color"
            :label="badgeLabel"
            :size="size"/>

        <span :class="$style.badgeGroupLabel">
            {{ label }}
        </span>

        <FluxBadge
            v-if="align === 'trailing'"
            :color="color"
            :label="badgeLabel"
            :size="size"/>

        <FluxIcon
            v-if="icon"
            :class="$style.badgeGroupIcon"
            :name="icon"
            :size="iconSize"/>
    </FluxPressable>
</template>

<script
    lang="ts"
    setup>
    import type { FluxButtonEmits, FluxColor, FluxIconName, FluxPressableType, FluxSize, FluxTo } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { computed } from 'vue';
    import FluxBadge from './FluxBadge.vue';
    import FluxIcon from './FluxIcon.vue';
    import FluxPressable from './FluxPressable.vue';
    import $style from '~flux/components/css/component/Badge.module.scss';

    defineEmits<FluxButtonEmits>();

    const {
        align = 'leading',
        color = 'gray',
        size = 'medium',
        type = 'none'
    } = defineProps<{
        readonly align?: 'leading' | 'trailing';
        readonly badgeLabel: string;
        readonly color?: FluxColor;
        readonly icon?: FluxIconName;
        readonly label: string;
        readonly size?: FluxSize;
        readonly type?: FluxPressableType;
        readonly tabindex?: string | number;
        readonly href?: string;
        readonly rel?: string;
        readonly target?: string;
        readonly to?: FluxTo;
    }>();

    const iconSizes = {
        small: 12,
        medium: 16,
        large: 18
    } as const;

    const iconSize = computed(() => iconSizes[size]);
</script>
