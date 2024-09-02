<template>
    <div
        :class="clsx(
            color === 'gray' && styles.timelineItemGray,
            color === 'primary' && styles.timelineItemPrimary,
            color === 'danger' && styles.timelineItemDanger,
            color === 'info' && styles.timelineItemInfo,
            color === 'success' && styles.timelineItemSuccess,
            color === 'warning' && styles.timelineItemWarning
        )"
        role="article">
        <div :class="styles.timelineItemLine"/>

        <div
            v-if="photo"
            :class="styles.timelineItemPhoto">
            <img
                :class="styles.timelineItemPhotoImage"
                :src="photo"
                alt="">

            <div
                v-if="icon"
                :class="styles.timelineItemPhotoIcon">
                <FluxIcon
                    :size="16"
                    :variant="icon"/>
            </div>
        </div>

        <div
            v-else-if="icon"
            :class="styles.timelineItemIcon">
            <FluxIcon
                :size="20"
                :variant="icon"/>
        </div>

        <div :class="styles.timelineItemBody">
            <div
                v-if="title || when"
                :class="styles.timelineItemHeader">
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
    import { clsx } from 'clsx';
    import type { IconNames } from '@/data';
    import FluxIcon from './FluxIcon.vue';
    import styles from '@/css/component/Timeline.module.scss';

    export type Props = {
        readonly color?: 'gray' | 'primary' | 'danger' | 'info' | 'success' | 'warning';
        readonly icon?: IconNames;
        readonly photo?: string;
        readonly title?: string;
        readonly when?: string;
    };

    withDefaults(defineProps<Props>(), {
        color: 'gray'
    });
</script>
