import { onBeforeUnmount, watch, type Ref } from 'vue';
import type { ChartLegendContext } from './useChartLegend';
import type { EChartsInstance } from './useECharts';

export type ChartHoverSyncMode = 'series' | 'data';

export interface UseChartHoverSyncOptions {
    readonly mode: ChartHoverSyncMode;
    readonly seriesIndex?: number;
}

export function useChartHoverSync(
    chartInstance: Ref<EChartsInstance | null>,
    legendContext: ChartLegendContext | null,
    options: UseChartHoverSyncOptions
): void {
    if (!legendContext) {
        return;
    }

    const { mode, seriesIndex: forcedSeriesIndex = 0 } = options;

    let attached: EChartsInstance | null = null;
    let syncing = false;

    const toSeriesIndex = (itemIndex: number): number => {
        return legendContext.items.value[itemIndex]?.seriesIndex ?? itemIndex;
    };

    const toItemIndex = (seriesIndex: number): number => {
        const mapped = legendContext.items.value.findIndex(item => item.seriesIndex === seriesIndex);
        return mapped !== -1 ? mapped : seriesIndex;
    };

    const onMouseOver = (params: { seriesIndex?: number; dataIndex?: number }) => {
        if (syncing) {
            return;
        }

        const index = mode === 'series'
            ? (params.seriesIndex !== undefined ? toItemIndex(params.seriesIndex) : null)
            : params.dataIndex ?? null;

        legendContext.hoveredIndex.value = index;
    };

    const onMouseOut = () => {
        if (syncing) {
            return;
        }

        legendContext.hoveredIndex.value = null;
    };

    const dispatchHighlight = (instance: EChartsInstance, index: number | null) => {
        syncing = true;

        try {
            instance.dispatchAction({ type: 'downplay' });

            if (index !== null) {
                if (mode === 'series') {
                    instance.dispatchAction({ type: 'highlight', seriesIndex: toSeriesIndex(index) });
                } else {
                    instance.dispatchAction({ type: 'highlight', seriesIndex: forcedSeriesIndex, dataIndex: index });
                }
            }
        } finally {
            syncing = false;
        }
    };

    watch(chartInstance, instance => {
        if (attached) {
            attached.off('mouseover', onMouseOver as never);
            attached.off('mouseout', onMouseOut as never);
            attached = null;
        }

        if (instance) {
            instance.on('mouseover', onMouseOver as never);
            instance.on('mouseout', onMouseOut as never);
            attached = instance;
            dispatchHighlight(instance, legendContext.hoveredIndex.value);
        }
    }, { immediate: true });

    watch(() => legendContext.hoveredIndex.value, index => {
        if (chartInstance.value) {
            dispatchHighlight(chartInstance.value, index);
        }
    });

    onBeforeUnmount(() => {
        if (attached) {
            attached.off('mouseover', onMouseOver as never);
            attached.off('mouseout', onMouseOut as never);
            attached = null;
        }
    });
}
