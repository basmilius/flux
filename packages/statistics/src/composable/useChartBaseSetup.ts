import { useStatisticsTranslate } from '~flux/statistics/data';
import type { Translator } from '~flux/statistics/util';

export interface UseChartBaseSetupReturn {
    readonly t: Translator;
}

export function useChartBaseSetup(): UseChartBaseSetupReturn {
    return {t: useStatisticsTranslate()};
}
