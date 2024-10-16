<template>
    <div
        :class="clsx(
            !status && $style.avatar,
            !!status && $style.statusAvatar,
            isClickable && $style.avatarClickable
        )"
        :style="{
            '--color': color,
            fontSize: `${size}px`
        }"
        :aria-label="alt"
        role="img"
        @click="onClick">
        <img
            v-if="url"
            :class="$style.avatarImage"
            :alt="alt"
            :src="url"/>

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
    </div>
</template>

<script
    lang="ts"
    setup>
    import { clsx } from 'clsx';
    import { computed, unref } from 'vue';
    import type { ColorVariant, IconName } from '@/types';
    import FluxIcon from './FluxIcon.vue';
    import $style from '@/css/component/Avatar.module.scss';

    const COLORS = [
        '102 159 42',
        '102 198 28',
        '22 179 100',
        '18 183 106',
        '21 183 158',
        '6 174 212',
        '11 165 236',
        '46 144 250',
        '41 112 255',
        '97 114 243',
        '122 90 248',
        '135 91 247',
        '158 119 237',
        '212 68 241',
        '238 70 188',
        '246 61 104',
        '240 68 56',
        '255 68 5',
        '239 104 32',
        '247 144 9',
        '234 170 8'
    ];

    const STATUS_CLASS_MAP = {
        gray: $style.avatarStatusGray,
        primary: $style.avatarStatusPrimary,
        danger: $style.avatarStatusDanger,
        info: $style.avatarStatusInfo,
        success: $style.avatarStatusSuccess,
        warning: $style.avatarStatusWarning
    } as const;

    const emit = defineEmits<{
        click: [MouseEvent];
    }>();

    const {
        fallback = 'colorized',
        fallbackIcon = 'user',
        fallbackInitials,
        isClickable,
        size = 30
    } = defineProps<{
        readonly alt?: string;
        readonly fallback?: 'colorized' | 'neutral';
        readonly fallbackIcon?: IconName;
        readonly fallbackInitials?: string;
        readonly isClickable?: boolean;
        readonly size?: number;
        readonly status?: ColorVariant;
        readonly url?: string;
    }>();

    const color = computed(() => COLORS[unref(colorSeed) % COLORS.length]);
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

    function onClick(evt: MouseEvent): void {
        if (!isClickable) {
            return;
        }

        emit('click', evt);
    }
</script>
