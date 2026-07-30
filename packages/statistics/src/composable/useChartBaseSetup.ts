import { useTranslate } from '~flux/statistics/composable/private';
import type { Translator } from '~flux/statistics/util';

export interface UseChartBaseSetupReturn {
    readonly t: Translator;
}

export default function useChartBaseSetup(): UseChartBaseSetupReturn {
    return {t: useTranslate()};
}
