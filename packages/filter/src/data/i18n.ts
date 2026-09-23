export type FluxFilterTranslate = (key: FluxFilterTranslation, params?: Record<string, string | number>) => string;
export type FluxFilterTranslation = keyof typeof english;

// These keys predate the package and keep their names so existing translations still apply.
export const english = {
    'flux.back': 'Back',
    'flux.customPeriod': 'Custom period',
    'flux.filter': 'Filter',
    'flux.filterRemove': 'Remove filter',
    'flux.filterReset': 'Reset filters',
    'flux.max': 'Max',
    'flux.min': 'Min',
    'flux.nSelected': '{n} selected'
} as const;
