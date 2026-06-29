<template>
    <div
        role="img"
        :aria-label="ariaLabel"
        :class="$style.statisticsPercentageBar">
        <div :class="clsx($style.statisticsPercentageBarTrack, hoveredIndex !== null && $style.isHoverActive)">
            <FluxTooltip
                v-for="(item, index) of normalizedItems"
                :key="index">
                <template #content>
                    <div :class="$style.statisticsPercentageBarTooltip">
                        <FluxIcon
                            v-if="item.icon"
                            :name="item.icon"
                            :size="16"/>

                        <span>{{ formatPercentage(item.value) }} {{ item.label }}</span>
                    </div>
                </template>

                <div
                    :class="clsx($style.statisticsPercentageBarSegment, hoveredIndex === index && $style.isHovered)"
                    :style="{
                        backgroundColor: resolveColor(item.color),
                        flexGrow: item.value
                    }"
                    @mouseenter="onSegmentEnter(index)"
                    @mouseleave="onSegmentLeave"/>
            </FluxTooltip>
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { formatPercentage } from '@basmilius/utils';
    import { FluxIcon, FluxTooltip } from '@flux-ui/components';
    import type { FluxStatisticsChartColor, FluxStatisticsPercentageBarItemObject } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { computed, inject, watchEffect } from 'vue';
    import { type ChartLegendItem, FluxStatisticsChartLegendInjectionKey } from '~flux/statistics/composable';
    import { resolveChartColor } from '~flux/statistics/util';
    import $style from '~flux/statistics/css/PercentageBar.module.scss';

    const props = defineProps<{
        readonly items: FluxStatisticsPercentageBarItemObject[];
    }>();

    const legendContext = inject(FluxStatisticsChartLegendInjectionKey, null);

    const normalizedItems = computed(() =>
        props.items.map(item => ({
            ...item,
            value: Math.max(0, item.value)
        }))
    );

    const legendItems = computed<ChartLegendItem[]>(() =>
        props.items.map(item => ({
            color: resolveColor(item.color),
            icon: item.icon,
            label: item.label,
            value: item.displayValue
        }))
    );

    const ariaLabel = computed(() =>
        props.items.map(item => `${formatPercentage(Math.max(0, item.value))} ${item.label}`).join(', ')
    );

    const hoveredIndex = computed<number | null>(() => legendContext?.hoveredIndex.value ?? null);

    watchEffect(() => {
        if (legendContext) {
            legendContext.items.value = legendItems.value;
        }
    });

    function resolveColor(color?: FluxStatisticsChartColor): string | undefined {
        return resolveChartColor(color);
    }

    function onSegmentEnter(index: number): void {
        if (legendContext) {
            legendContext.hoveredIndex.value = index;
        }
    }

    function onSegmentLeave(): void {
        if (legendContext) {
            legendContext.hoveredIndex.value = null;
        }
    }
</script>
