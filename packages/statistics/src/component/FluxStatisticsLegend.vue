<template>
    <div
        role="list"
        :class="containerClass">
        <slot v-if="hasSlot"/>
        <FluxStatisticsLegendItem
            v-else
            v-for="(item, index) in autoItems"
            :key="`${index}-${item.label}`"
            :color="item.color as `#${string}` | undefined"
            :icon="item.icon"
            :is-hovered="legendContext?.hoveredIndex.value === index"
            :label="item.label"
            :value="item.value"
            @mouseenter="onItemMouseEnter(index)"
            @mouseleave="onItemMouseLeave"
            @focus="onItemMouseEnter(index)"
            @blur="onItemMouseLeave"/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { FluxDirection } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { computed, inject, provide, toRef, useSlots } from 'vue';
    import { FluxStatisticsChartLegendInjectionKey, type FluxStatisticsLegendVariant, FluxStatisticsLegendVariantInjectionKey } from '~flux/statistics/composable';
    import FluxStatisticsLegendItem from './FluxStatisticsLegendItem.vue';
    import $style from '~flux/statistics/css/Legend.module.scss';

    const {
        direction = 'horizontal',
        variant = 'detailed'
    } = defineProps<{
        readonly direction?: FluxDirection;
        readonly variant?: FluxStatisticsLegendVariant;
    }>();

    const slots = useSlots();
    const legendContext = inject(FluxStatisticsChartLegendInjectionKey, null);

    const hasSlot = computed(() => !!slots.default);
    const autoItems = computed(() => legendContext?.items.value ?? []);

    const containerClass = computed(() => {
        if (variant === 'compact') {
            return clsx($style.statisticsLegendCompact, direction === 'vertical' ? $style.isVertical : $style.isHorizontal);
        }

        return $style.statisticsLegend;
    });

    provide(FluxStatisticsLegendVariantInjectionKey, toRef(() => variant));

    function onItemMouseEnter(index: number): void {
        if (legendContext) {
            legendContext.hoveredIndex.value = index;
        }
    }

    function onItemMouseLeave(): void {
        if (legendContext) {
            legendContext.hoveredIndex.value = null;
        }
    }
</script>
