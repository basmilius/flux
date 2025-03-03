<template>
    <div
        :class="clsx(
            $style.comment,
            isTyping && $style.isTyping,
            isReceived && $style.isReceived
        )"
        role="article">
        <FluxAvatar
            :alt="avatarAlt"
            :fallback="avatarFallback"
            :fallback-icon="avatarFallbackIcon"
            :fallback-initials="avatarFallbackInitials"
            :size="42"
            :src="avatarSrc"/>

        <div :class="$style.commentContent">
            <div v-if="isTyping" :class="$style.commentTyping"/>
            <slot v-else/>
        </div>

        <div :class="$style.commentFooter">
            <span v-if="isReceived && postedBy">{{ postedBy }}</span>
            <time v-if="iso && relative && !isTyping" :datetime="iso">
                {{ isJustNowVisible ? translate('flux.justNow') : relative }}
            </time>
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { clsx } from 'clsx';
    import type { DateTime } from 'luxon';
    import { computed } from 'vue';
    import { useTranslate } from '@/composable/private';
    import type { FluxIconName } from '@/types';
    import FluxAvatar from './FluxAvatar.vue';
    import $style from '@/css/component/Comment.module.scss';

    const {
        avatarFallback = 'colorized',
        avatarFallbackIcon = 'user',
        postedOn
    } = defineProps<{
        readonly avatarAlt?: string;
        readonly avatarFallback?: 'colorized' | 'neutral';
        readonly avatarFallbackIcon?: FluxIconName;
        readonly avatarFallbackInitials?: string;
        readonly avatarSrc?: string;
        readonly isReceived?: boolean;
        readonly isTyping?: boolean;
        readonly postedBy?: string;
        readonly postedOn?: DateTime;
    }>();

    defineSlots<{
        default(): any;
    }>();

    const translate = useTranslate();

    const isJustNowVisible = computed(() => postedOn && Math.abs(postedOn.diffNow().as('seconds')) < 15);
    const iso = computed(() => postedOn?.toISO() ?? null);
    const relative = computed(() => postedOn?.toRelative() ?? null);
</script>
