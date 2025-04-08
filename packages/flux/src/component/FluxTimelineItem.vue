<template>
    <div
        :class="clsx(
            color === 'gray' && $style.timelineItemGray,
            color === 'primary' && $style.timelineItemPrimary,
            color === 'danger' && $style.timelineItemDanger,
            color === 'info' && $style.timelineItemInfo,
            color === 'success' && $style.timelineItemSuccess,
            color === 'warning' && $style.timelineItemWarning
        )"
        role="article">
        <div :class="$style.timelineItemLine"/>

        <div
            v-if="photo"
            :class="$style.timelineItemPhoto">
            <img
                :class="$style.timelineItemPhotoImage"
                :src="photo"
                alt="">

            <div
                v-if="icon"
                :class="$style.timelineItemPhotoIcon">
                <FluxIcon
                    :name="icon"
                    :size="16"/>
            </div>
        </div>

        <div
            v-else-if="icon"
            :class="$style.timelineItemIcon">
            <FluxIcon
                :name="icon"
                :size="20"/>
        </div>

        <div :class="$style.timelineItemBody">
            <div
                v-if="title || when"
                :class="$style.timelineItemHeader">
                <strong v-if="title">{{ title }}</strong>
                <span v-if="when">{{ when }}</span>
            </div>

            <slot/>
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { FluxColor, FluxIconName } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import FluxIcon from './FluxIcon.vue';
    import $style from '$flux/css/component/Timeline.module.scss';

    const {
        color = 'gray'
    } = defineProps<{
        readonly color?: FluxColor;
        readonly icon?: FluxIconName;
        readonly photo?: string;
        readonly title?: string;
        readonly when?: string;
    }>();

    defineSlots<{
        default(): any;
    }>();
</script>
