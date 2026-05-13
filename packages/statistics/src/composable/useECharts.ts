import { useResizeObserver } from '@basmilius/common';
import type { EChartsCoreOption } from 'echarts/core';
import { init } from 'echarts/core';
import { onBeforeUnmount, onMounted, type MaybeRefOrGetter, type Ref, ref, toValue } from 'vue';
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
    let ready = false;
    let pendingResize: number | null = null;

    onMounted(() => {
        if (!target.value) {
            return;
        }

        chartInstance.value = init(target.value);
        chartInstance.value.setOption(toValue(options));
        ready = true;
    });

    onBeforeUnmount(() => {
        ready = false;

        if (pendingResize !== null) {
            cancelAnimationFrame(pendingResize);
            pendingResize = null;
        }

        chartInstance.value?.dispose();
        chartInstance.value = null;
    });

    let lastWidth = 0;
    let lastHeight = 0;

    useResizeObserver(target as any, () => {
        if (!ready || pendingResize !== null) {
            return;
        }

        pendingResize = requestAnimationFrame(() => {
            pendingResize = null;

            if (!target.value || !chartInstance.value) {
                return;
            }

            const rect = target.value.getBoundingClientRect();

            if (rect.width === 0 || rect.height === 0) {
                return;
            }

            if (Math.abs(rect.width - lastWidth) < 1 && Math.abs(rect.height - lastHeight) < 1) {
                return;
            }

            lastWidth = rect.width;
            lastHeight = rect.height;

            // Workaround for ECharts 6.0.0 bug: chart.resize() runs coordSysMgr.create
            // on every update but the axis-grid lookup gets stale, causing
            // "cartesian2d cannot be found" warnings. Dispose + reinit is reliable.
            chartInstance.value.dispose();
            chartInstance.value = init(target.value);
            chartInstance.value.setOption(toValue(options));
        });
    });

    return {
        chartInstance: chartInstance as Ref<EChartsInstance | null>,
        resize: () => chartInstance.value?.resize()
    };
}
