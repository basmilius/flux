<template>
    <div
        :class="isSmall ? $style.statisticsMeterSmall : $style.statisticsMeter"
        :style="{
            '--color': colorValue,
            '--percentage': `${value * 100}%`
        }">
        <div :class="$style.statisticsMeterHeader">
            <FluxIcon
                v-if="icon"
                :class="$style.statisticsMeterHeaderIcon"
                :name="icon"
                :size="16"/>

            <span
                v-if="title"
                :class="$style.statisticsMeterHeaderTitle">
                {{ title }}
            </span>

            <span
                v-if="subTitle"
                :class="$style.statisticsMeterHeaderSubTitle">
                {{ subTitle }}
            </span>

            <span :class="$style.statisticsMeterHeaderValue">
                {{ formatPercentage(value) }}
            </span>

            <span
                v-if="tip"
                :class="$style.statisticsMeterHeaderTip">
                {{ tip }}
            </span>
        </div>

        <div
            v-if="variant === 'blocks'"
            ref="blocks"
            :class="$style.statisticsMeterBlocks">
            <div
                v-for="index of blockCount"
                :key="index"
                :class="clsx($style.statisticsMeterBlock, index <= filledCount && $style.isFilled)"/>
        </div>

        <div
            v-else
            :class="$style.statisticsMeterBar">
            <div :class="$style.statisticsMeterBarValue"/>
        </div>

        <div
            v-if="footer"
            :class="$style.statisticsMeterFooter">
            {{ footer }}
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { useResizeObserver } from '@basmilius/common';
    import { formatPercentage } from '@basmilius/utils';
    import { FluxIcon } from '@flux-ui/components';
    import type { FluxIconName, FluxStatisticsChartColor } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { computed, ref, useTemplateRef } from 'vue';
    import { resolveChartColor } from '~flux/statistics/util';
    import $style from '~flux/statistics/css/Meter.module.scss';

    const BLOCK_WIDTH = 6;
    const BLOCK_GAP = 3;

    const {
        color,
        value,
        variant = 'bar'
    } = defineProps<{
        readonly color?: FluxStatisticsChartColor;
        readonly icon?: FluxIconName;
        readonly isSmall?: boolean;
        readonly footer?: string;
        readonly subTitle?: string;
        readonly tip?: string;
        readonly title?: string;
        readonly value: number;
        readonly variant?: 'bar' | 'blocks';
    }>();

    const blocksRef = useTemplateRef('blocks');
    const trackWidth = ref(0);

    const colorValue = computed(() => resolveChartColor(color));

    const blockCount = computed(() => Math.max(1, Math.floor((trackWidth.value + BLOCK_GAP) / (BLOCK_WIDTH + BLOCK_GAP))));

    const filledCount = computed(() => Math.max(0, Math.min(blockCount.value, Math.round(value * blockCount.value))));

    useResizeObserver(blocksRef, entries => {
        trackWidth.value = entries[0].contentRect.width;
    });
</script>
