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
            <div
                v-if="isTyping"
                :class="$style.commentTyping"/>
            <slot v-else/>
        </div>

        <div :class="$style.commentFooter">
            <span v-if="isReceived && postedBy">{{ postedBy }}</span>
            <time
                v-if="iso && relative && !isTyping"
                :datetime="iso">
                {{ isJustNowVisible ? translate('flux.justNow') : relative }}
            </time>
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { FluxIconName } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import type { DateTime } from 'luxon';
    import { computed, onBeforeUnmount, onMounted, ref, type VNode } from 'vue';
    import { useTranslate } from '~flux/components/composable/private';
    import FluxAvatar from './FluxAvatar.vue';
    import $style from '~flux/components/css/component/Comment.module.scss';

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
        default(): VNode[];
    }>();

    const timeTick = ref(0);
    let timeTickInterval: ReturnType<typeof setInterval> | undefined;

    const translate = useTranslate();

    const isJustNowVisible = computed(() => {
        void timeTick.value;
        return postedOn && Math.abs(postedOn.diffNow().as('seconds')) < 15;
    });
    const iso = computed(() => postedOn?.toISO() ?? null);
    const relative = computed(() => {
        void timeTick.value;
        return postedOn?.toRelative() ?? null;
    });

    onMounted(() => {
        timeTickInterval = setInterval(() => {
            timeTick.value++;
        }, 30000);
    });

    onBeforeUnmount(() => {
        clearInterval(timeTickInterval);
    });
</script>
