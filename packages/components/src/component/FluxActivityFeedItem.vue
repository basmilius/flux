<template>
    <li :class="COLOR_CLASS[color]">
        <FluxAvatar
            v-if="avatarSrc || avatarFallbackInitials"
            ref="marker"
            :class="$style.activityFeedItemAvatar"
            :fallback-initials="avatarFallbackInitials"
            :size="30"
            :src="avatarSrc"
            aria-hidden="true"/>

        <div
            v-else-if="icon"
            ref="marker"
            :class="$style.activityFeedItemIcon">
            <FluxIcon
                :name="icon"
                :size="16"/>
        </div>

        <span
            v-else
            ref="marker"
            :class="$style.activityFeedItemDot"/>

        <div :class="$style.activityFeedItemBody">
            <div :class="$style.activityFeedItemAction">
                <strong v-if="actor">{{ actor }}</strong>

                <span><slot/></span>

                <time
                    v-if="when"
                    :class="$style.activityFeedItemWhen"
                    :datetime="dateTime">{{ when }}</time>
            </div>

            <div
                v-if="$slots.details"
                :class="$style.activityFeedItemDetails">
                <slot name="details"/>
            </div>
        </div>
    </li>
</template>

<script
    lang="ts"
    setup>
    import { unwrapElement } from '@basmilius/common';
    import type { FluxColor, FluxIconName } from '@flux-ui/types';
    import { computed, inject, onUnmounted, useTemplateRef, type VNode } from 'vue';
    import { FluxTimelineInjectionKey } from '~flux/components/data';
    import FluxAvatar from './FluxAvatar.vue';
    import FluxIcon from './FluxIcon.vue';
    import $style from '~flux/components/css/component/ActivityFeed.module.scss';

    const COLOR_CLASS = {
        gray: $style.activityFeedItemGray,
        primary: $style.activityFeedItemPrimary,
        danger: $style.activityFeedItemDanger,
        info: $style.activityFeedItemInfo,
        success: $style.activityFeedItemSuccess,
        warning: $style.activityFeedItemWarning
    } as const;

    const {
        color = 'gray'
    } = defineProps<{
        readonly actor?: string;
        readonly avatarFallbackInitials?: string;
        readonly avatarSrc?: string;
        readonly color?: FluxColor;
        readonly dateTime?: string;
        readonly day?: string;
        readonly icon?: FluxIconName;
        readonly when?: string;
    }>();

    defineSlots<{
        default(): VNode[];
        details(): VNode[];
    }>();

    const timeline = inject(FluxTimelineInjectionKey, null);
    const markerRef = useTemplateRef<HTMLElement>('marker');
    const markerElementRef = computed(() => unwrapElement(markerRef));

    const cleanup = timeline?.registerMarker(markerElementRef);

    onUnmounted(() => cleanup?.());
</script>
