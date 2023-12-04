<template>
    <div
        class="flux-avatar"
        :class="{
            'is-clickable': isClickable,
            'has-status': !!status
        }"
        :aria-label="alt"
        role="img"
        @click="isClickable && $emit('click', $event)">
        <img
            v-if="url"
            class="flux-avatar-image"
            :alt="alt"
            :src="url"/>

        <div
            v-else
            class="flux-avatar-fallback"
            :class="`flux-avatar-${fallback}`">
            <span v-if="fallbackInitials">
                {{ fallbackInitials }}
            </span>

            <FluxIcon
                v-else-if="fallbackIcon"
                :variant="fallbackIcon"/>
        </div>

        <div
            v-if="status"
            class="flux-avatar-status"
            :class="`is-${status}`"/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { IconNames } from '@/data';
    import { computed, toRefs, unref } from 'vue-demi';
    import FluxIcon from './FluxIcon.vue';

    export interface Emits {
        (e: 'click', evt: MouseEvent): void;
    }

    export interface Props {
        readonly alt?: string;
        readonly fallback?: 'colorized' | 'neutral';
        readonly fallbackIcon?: IconNames;
        readonly fallbackInitials?: string;
        readonly isClickable?: boolean;
        readonly size?: number;
        readonly status?: 'gray' | 'primary' | 'danger' | 'info' | 'success' | 'warning';
        readonly url?: string;
    }

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

    defineEmits<Emits>();
    const props = withDefaults(defineProps<Props>(), {
        fallback: 'colorized',
        fallbackIcon: 'user',
        size: 30
    });
    const {fallbackIcon, fallbackInitials, size} = toRefs(props);

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

    const color = computed(() => colors[unref(colorSeed) % colors.length]);
    const sizePixels = computed(() => unref(size) + 'px');
</script>

<style lang="scss">
    .flux-avatar {
        --color: v-bind(color);

        position: relative;
        display: inline-flex;
        height: 1em;
        width: 1em;
        flex: 0 0 auto;
        border-radius: .5em;
        font-size: v-bind(sizePixels);
        user-select: none;

        &-image {
            height: inherit;
            width: inherit;
            background: black;
            border-radius: inherit;
        }

        &-fallback {
            position: absolute;
            display: flex;
            inset: 0;
            align-items: center;
            justify-content: center;
            border-radius: inherit;

            .flux-icon {
                font-size: .5em;
            }

            span {
                font-size: .4em;
                font-weight: 500;
                line-height: 1;
            }
        }

        &-status {
            position: absolute;
            display: block;
            right: 0.0238095238em;
            bottom: 0.0238095238em;
            height: 0.285714286em;
            width: 0.285714286em;
            background: black;
            border-radius: 99px;

            &.is-gray {
                background: rgb(var(--gray-6));
            }

            &.is-primary {
                background: rgb(var(--primary-7));
            }

            &.is-danger {
                background: rgb(var(--danger-7));
            }

            &.is-info {
                background: rgb(var(--info-7));
            }

            &.is-success {
                background: rgb(var(--success-7));
            }

            &.is-warning {
                background: rgb(var(--warning-7));
            }
        }

        &-colorized {
            background: rgb(var(--color) / .2);
            color: rgb(var(--color));
        }

        &-neutral {
            background: rgb(var(--gray-4));
            color: var(--foreground-secondary);
        }

        &.is-clickable {
            cursor: pointer;
            transition: filter 150ms var(--swift-out);

            &:hover {
                filter: brightness(110%);
            }
        }

        &.has-status &-fallback,
        &.has-status &-image {
            mask: url(@/image/avatar-mask.svg) no-repeat center center / cover;
            -webkit-mask: url(@/image/avatar-mask.svg) no-repeat center center / cover;
        }
    }
</style>
