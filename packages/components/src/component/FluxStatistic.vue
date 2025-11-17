<template>
    <FluxPane
        :class="clsx(
            direction === 'horizontal' && $style.statisticHorizontal,
            direction === 'vertical' && $style.statisticVertical,
            color === 'gray' && $style.isGray,
            color === 'primary' && $style.isPrimary,
            color === 'danger' && $style.isDanger,
            color === 'info' && $style.isInfo,
            color === 'success' && $style.isSuccess,
            color === 'warning' && $style.isWarning
        )">
        <div :class="$style.statisticIcon" v-if="icon">
            <FluxIcon
                :name="icon"
                :size="24"/>
        </div>

        <div v-else-if="imageSrc">
            <img
                :class="$style.statisticImage"
                :src="imageSrc"
                :alt="imageAlt"/>
        </div>

        <div :class="$style.statisticData">
            <span>{{ label }}</span>
            <strong>{{ value }}</strong>
        </div>

        <div
            v-if="changeIcon || changeValue"
            :class="clsx(
                $style.statisticChange,
                changeColor === 'gray' && $style.isGray,
                changeColor === 'primary' && $style.isPrimary,
                changeColor === 'danger' && $style.isDanger,
                changeColor === 'info' && $style.isInfo,
                changeColor === 'success' && $style.isSuccess,
                changeColor === 'warning' && $style.isWarning
            )">
            <span v-if="changeValue">{{ changeValue }}</span>

            <FluxIcon
                v-if="changeIcon"
                :name="changeIcon"
                :size="14"/>
        </div>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import type { FluxColor, FluxDirection, FluxIconName } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import FluxIcon from './FluxIcon.vue';
    import FluxPane from './FluxPane.vue';
    import $style from '$flux/css/component/Statistic.module.scss';

    const {
        changeColor = 'gray',
        color = 'gray',
        direction = 'horizontal'
    } = defineProps<{
        readonly changeColor?: FluxColor;
        readonly changeIcon?: FluxIconName;
        readonly changeValue?: string;
        readonly color?: FluxColor;
        readonly direction?: FluxDirection;
        readonly icon?: FluxIconName;
        readonly imageSrc?: string;
        readonly imageAlt?: string;
        readonly label: string;
        readonly value: string;
    }>();
</script>
