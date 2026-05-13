import { useResizeObserver } from '@basmilius/common';
import type { EChartsCoreOption } from 'echarts/core';
import { init } from 'echarts/core';
import { markRaw, onBeforeUnmount, onMounted, type MaybeRefOrGetter, type Ref, ref, toValue } from 'vue';
import '~flux/statistics/echarts';

export type EChartsOption = EChartsCoreOption;
export type EChartsInstance = ReturnType<typeof init>;

export interface UseEChartsReturn {
    readonly chartInstance: Ref<EChartsInstance | null>;
    resize(): void;
}

export function useECharts(
    target: Ref<HTMLElement | null>,
    options: MaybeRefOrGetter<EChartsOption>
): UseEChartsReturn {
    const chartInstance = ref<EChartsInstance | null>(null);
    let pendingResize: number | null = null;

    onMounted(() => {
        if (!target.value) {
            return;
        }

        chartInstance.value = markRaw(init(target.value));
        chartInstance.value.setOption(toValue(options));
    });

    onBeforeUnmount(() => {
        if (pendingResize !== null) {
            cancelAnimationFrame(pendingResize);
            pendingResize = null;
        }

        chartInstance.value?.dispose();
        chartInstance.value = null;
    });

    useResizeObserver(target as any, () => {
        if (pendingResize !== null) {
            return;
        }

        pendingResize = requestAnimationFrame(() => {
            pendingResize = null;
            chartInstance.value?.resize();
        });
    });

    return {
        chartInstance: chartInstance as Ref<EChartsInstance | null>,
        resize: () => chartInstance.value?.resize()
    };
}
