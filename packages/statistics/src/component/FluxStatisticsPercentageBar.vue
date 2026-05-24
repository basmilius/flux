<template>
    <div :class="$style.statisticsPercentageBar">
        <div :class="clsx($style.statisticsPercentageBarTrack, hoveredIndex !== null && $style.isHoverActive)">
            <FluxTooltip
                v-for="(item, index) of items"
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
    import { FluxStatisticsChartLegendInjectionKey, type ChartLegendItem } from '~flux/statistics/composable';
    import $style from '~flux/statistics/css/PercentageBar.module.scss';

    const SEMANTIC_COLORS = ['gray', 'primary', 'danger', 'info', 'success', 'warning'] as const;

    const props = defineProps<{
        readonly items: FluxStatisticsPercentageBarItemObject[];
    }>();

    const legendContext = inject(FluxStatisticsChartLegendInjectionKey, null);

    const legendItems = computed<ChartLegendItem[]>(() =>
        props.items.map(item => ({
            color: resolveColor(item.color),
            icon: item.icon,
            label: item.label,
            value: item.displayValue
        }))
    );

    const hoveredIndex = computed<number | null>(() => legendContext?.hoveredIndex.value ?? null);

    watchEffect(() => {
        if (legendContext) {
            legendContext.items.value = legendItems.value;
        }
    });

    function resolveColor(color?: FluxStatisticsChartColor): string | undefined {
        if (!color) {
            return;
        }

        if (SEMANTIC_COLORS.includes(color as typeof SEMANTIC_COLORS[number])) {
            return `var(--${color}-600)`;
        }

        return color;
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
