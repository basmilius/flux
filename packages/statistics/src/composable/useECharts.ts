import { type MaybeRefOrGetter, type Ref } from 'vue';
import { registerAllCharts } from '~flux/statistics/echarts';
import { type EChartsOption, useEChartsCore, type UseEChartsReturn } from './private';

export type { EChartsInstance, EChartsOption, UseEChartsReturn } from './private';

export default function useECharts(target: Ref<HTMLElement | null>, options: MaybeRefOrGetter<EChartsOption>): UseEChartsReturn {
    registerAllCharts();

    return useEChartsCore(target, options);
}
