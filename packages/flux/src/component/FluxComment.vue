<template>
    <div
        :class="clsx(
            styles.comment,
            isFlipped && styles.isFlipped,
            isReceived && styles.isReceived
        )"
        role="article">
        <FluxAvatar
            :class="styles.commentAvatar"
            :alt="avatarAlt"
            :fallback="avatarFallback"
            :fallback-icon="avatarFallbackIcon"
            :fallback-initials="avatarFallbackInitials"
            :size="42"
            :url="avatarUrl"/>

        <div :class="styles.commentBody">
            <div :class="styles.commentHeader">
                <strong>{{ name }}</strong>
                <time v-if="period">{{ period }}</time>
            </div>

            <div :class="styles.commentMessage">
                <slot/>
            </div>
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { clsx } from 'clsx';
    import type { IconName } from '@/types';
    import FluxAvatar from './FluxAvatar.vue';
    import styles from '@/css/component/Comment.module.scss';

    const {
        avatarFallback = 'colorized',
        avatarFallbackIcon = 'user'
    } = defineProps<{
        readonly avatarAlt?: string;
        readonly avatarFallback?: 'colorized' | 'neutral';
        readonly avatarFallbackIcon?: IconName;
        readonly avatarFallbackInitials?: string;
        readonly avatarUrl?: string;
        readonly isFlipped?: boolean;
        readonly isReceived?: boolean;
        readonly name: string;
        readonly period?: string;
    }>();

    defineSlots<{
        default(): any;
    }>();
</script>
