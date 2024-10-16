<template>
    <FluxPane
        :class="clsx(
            axis === 'horizontal' && $style.statisticHorizontal,
            axis === 'vertical' && $style.statisticVertical,
            color === 'gray' && $style.isGray,
            color === 'primary' && $style.isPrimary,
            color === 'danger' && $style.isDanger,
            color === 'info' && $style.isInfo,
            color === 'success' && $style.isSuccess,
            color === 'warning' && $style.isWarning
        )">
        <div :class="$style.statisticIcon">
            <FluxIcon
                :size="24"
                :variant="icon"/>
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
                :size="14"
                :variant="changeIcon"/>
        </div>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { clsx } from 'clsx';
    import type { Axis, ColorVariant, IconName } from '@/types';
    import FluxIcon from './FluxIcon.vue';
    import FluxPane from './FluxPane.vue';
    import $style from '@/css/component/Statistic.module.scss';

    const {
        axis = 'horizontal',
        changeColor = 'gray',
        color = 'gray'
    } = defineProps<{
        readonly axis?: Axis;
        readonly changeColor?: ColorVariant;
        readonly changeIcon?: IconName;
        readonly changeValue?: string;
        readonly color?: ColorVariant;
        readonly icon: IconName;
        readonly label: string;
        readonly value: string;
    }>();
</script>
