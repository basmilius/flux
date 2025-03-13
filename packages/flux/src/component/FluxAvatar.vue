<template>
    <FluxPressable
        :class="clsx(
            !status && $style.avatar,
            !!status && $style.statusAvatar,
            type !== 'none' && $style.avatarClickable
        )"
        :style="{
            '--color': color,
            fontSize: size && `${size}px`
        }"
        :component-type="type"
        role="img"
        :aria-label="alt"
        :tabindex="tabindex"
        :href="href"
        :rel="rel"
        :target="target"
        :to="to"
        @click="$emit('click', $event)"
        @mouseenter="$emit('mouseenter', $event)"
        @mouseleave="$emit('mouseleave', $event)">
        <img
            v-if="src"
            :class="$style.avatarImage"
            :alt="alt"
            :src="src"/>

        <div
            v-else
            :class="fallback === 'colorized' ? $style.avatarFallbackColorized : $style.avatarFallbackNeutral">
            <span v-if="fallbackInitials">
                {{ fallbackInitials }}
            </span>

            <FluxIcon
                v-else-if="fallbackIcon"
                :variant="fallbackIcon"/>
        </div>

        <div
            v-if="status"
            :class="STATUS_CLASS_MAP[status]"/>
    </FluxPressable>
</template>

<script
    lang="ts"
    setup>
    import { amber600, blue600, cyan600, emerald600, fuchsia600, green600, indigo600, lime600, orange600, pink600, purple600, red600, rose600, sky600, teal600, violet600, yellow600 } from '@basmilius/flux-internals';
    import { clsx } from 'clsx';
    import { computed, unref } from 'vue';
    import type { FluxButtonEmits, FluxColorVariant, FluxIconName, FluxPressableType, FluxTo } from '$flux/types';
    import FluxIcon from './FluxIcon.vue';
    import FluxPressable from './FluxPressable.vue';
    import $style from '$flux/css/component/Avatar.module.scss';

    const STATUS_CLASS_MAP = {
        gray: $style.avatarStatusGray,
        primary: $style.avatarStatusPrimary,
        danger: $style.avatarStatusDanger,
        info: $style.avatarStatusInfo,
        success: $style.avatarStatusSuccess,
        warning: $style.avatarStatusWarning
    } as const;

    defineEmits<FluxButtonEmits>();

    const {
        fallback = 'colorized',
        fallbackColors = [lime600, green600, emerald600, teal600, cyan600, sky600, blue600, indigo600, violet600, purple600, fuchsia600, pink600, rose600, red600, orange600, amber600, yellow600],
        fallbackIcon = 'user',
        fallbackInitials,
        type = 'none'
    } = defineProps<{
        readonly alt?: string;
        readonly fallback?: 'colorized' | 'neutral';
        readonly fallbackColors?: string[];
        readonly fallbackIcon?: FluxIconName;
        readonly fallbackInitials?: string;
        readonly size?: number;
        readonly src?: string;
        readonly status?: FluxColorVariant;
        readonly type?: FluxPressableType;
        readonly tabindex?: string | number;
        readonly href?: string;
        readonly rel?: string;
        readonly target?: string;
        readonly to?: FluxTo;
    }>();

    const color = computed(() => fallbackColors[unref(colorSeed) % fallbackColors.length]);
    const colorSeed = computed(() => {
        let seed = 6;

        if (fallbackInitials) {
            for (let i = 0; i < fallbackInitials.length; ++i) {
                seed ^= fallbackInitials.charCodeAt(i);
            }
        } else if (fallbackIcon) {
            for (let i = 0; i < fallbackIcon.length; ++i) {
                seed ^= fallbackIcon.charCodeAt(i);
            }
        }

        return seed;
    });
</script>
