<template>
    <div
        ref="list"
        role="list"
        :class="containerClass">
        <slot v-if="slots.default"/>
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
    import { useFocusZone } from '@flux-ui/internals';
    import type { FluxDirection } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { computed, inject, provide, toRef, useSlots, useTemplateRef } from 'vue';
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

    const listRef = useTemplateRef('list');

    const slots = useSlots();
    const legendContext = inject(FluxStatisticsChartLegendInjectionKey, null);

    // One tab stop for the whole legend; arrow keys move focus between items. Bidirectional handles
    // every layout (detailed column, compact row/wrap/column) since it resolves the next item
    // geometrically. Focusing an item drives the same hover sync as the mouse.
    useFocusZone(listRef, {direction: 'bidirectional'});

    provide(FluxStatisticsLegendVariantInjectionKey, toRef(() => variant));

    const autoItems = computed(() => legendContext?.items.value ?? []);

    const containerClass = computed(() => {
        if (variant === 'compact') {
            return clsx($style.statisticsLegendCompact, direction === 'vertical' ? $style.isVertical : $style.isHorizontal);
        }

        return $style.statisticsLegend;
    });

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
