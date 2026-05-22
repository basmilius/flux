import { computed, useTemplateRef, type ComputedRef } from 'vue';
import { useI18n } from 'vue-i18n';
import type { EChartsInstance } from './useECharts';

export interface UseChartBaseSetupReturn {
    readonly t: ReturnType<typeof useI18n>['t'];
    readonly chartInstance: ComputedRef<EChartsInstance | null>;
}

export function useChartBaseSetup(): UseChartBaseSetupReturn {
    const { t } = useI18n({ useScope: 'parent' });
    const chartRef = useTemplateRef<{ chartInstance: EChartsInstance | null } | null>('chartRef');
    const chartInstance = computed<EChartsInstance | null>(() => chartRef.value?.chartInstance ?? null);

    return { t, chartInstance };
}
