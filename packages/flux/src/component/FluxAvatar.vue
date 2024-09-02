<template>
    <div
        :class="clsx(
            !status && styles.avatar,
            !!status && styles.statusAvatar,
            isClickable && styles.avatarClickable
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
            :class="styles.avatarImage"
            :alt="alt"
            :src="url"/>

        <div
            v-else
            :class="fallback === 'colorized' ? styles.avatarFallbackColorized : styles.avatarFallbackNeutral">
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
    import { computed, toRefs, unref } from 'vue';
    import type { IconNames } from '@/data';
    import styles from '@/css/component/Avatar.module.scss';
    import FluxIcon from './FluxIcon.vue';

    const STATUS_CLASS_MAP = {
        gray: styles.avatarStatusGray,
        primary: styles.avatarStatusPrimary,
        danger: styles.avatarStatusDanger,
        info: styles.avatarStatusInfo,
        success: styles.avatarStatusSuccess,
        warning: styles.avatarStatusWarning
    } as const;

    export type Emits = {
        click: [MouseEvent];
    };

    export type Props = {
        readonly alt?: string;
        readonly fallback?: 'colorized' | 'neutral';
        readonly fallbackIcon?: IconNames;
        readonly fallbackInitials?: string;
        readonly isClickable?: boolean;
        readonly size?: number;
        readonly status?: 'gray' | 'primary' | 'danger' | 'info' | 'success' | 'warning';
        readonly url?: string;
    };

    const colors = [
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

    const emit = defineEmits<Emits>();
    const props = withDefaults(defineProps<Props>(), {
        fallback: 'colorized',
        fallbackIcon: 'user',
        size: 30
    });
    const {fallbackIcon, fallbackInitials, isClickable, size} = toRefs(props);

    const color = computed(() => colors[unref(colorSeed) % colors.length]);
    const colorSeed = computed(() => {
        const icon = unref(fallbackIcon);
        const initials = unref(fallbackInitials);
        let seed = 6;

        if (initials) {
            for (let i = 0; i < initials.length; ++i) {
                seed ^= initials.charCodeAt(i);
            }
        } else if (icon) {
            for (let i = 0; i < icon.length; ++i) {
                seed ^= icon.charCodeAt(i);
            }
        }

        return seed;
    });

    function onClick(evt: MouseEvent): void {
        if (!unref(isClickable)) {
            return;
        }

        emit('click', evt);
    }
</script>
