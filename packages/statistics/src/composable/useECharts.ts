import { useResizeObserver } from '@basmilius/common';
import { init, type EChartsCoreOption } from 'echarts/core';
import { markRaw, onBeforeUnmount, onMounted, ref, toValue, watch, type MaybeRefOrGetter, type Ref } from 'vue';
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

    watch(() => toValue(options), value => {
        chartInstance.value?.setOption(value, {notMerge: true});
    });

    onBeforeUnmount(() => {
        if (pendingResize !== null) {
            cancelAnimationFrame(pendingResize);
            pendingResize = null;
        }

        chartInstance.value?.dispose();
        chartInstance.value = null;
    });

    useResizeObserver(target, () => {
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
