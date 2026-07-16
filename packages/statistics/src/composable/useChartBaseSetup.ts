import { useI18n } from 'vue-i18n';

export interface UseChartBaseSetupReturn {
    readonly t: ReturnType<typeof useI18n>['t'];
}

export function useChartBaseSetup(): UseChartBaseSetupReturn {
    const {t} = useI18n({useScope: 'parent'});

    return {t};
}
