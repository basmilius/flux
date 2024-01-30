import { getCurrentInstance } from 'vue';

export const english = {
    'flux.back': 'Back',
    'flux.cancel': 'Cancel',
    'flux.comingSoon': 'Coming soon',
    'flux.continue': 'Continue',
    'flux.customPeriod': 'Custom period',
    'flux.filter': 'Filter',
    'flux.filterReset': 'Reset filters',
    'flux.max': 'Max',
    'flux.min': 'Min',
    'flux.nSelected': '{n} selected',
    'flux.ok': 'Ok',
    'flux.optional': 'Optional',
    'flux.preview': 'Preview',
    'flux.previewClose': 'Close preview',
    'flux.displayingOf': '{from}–{to} of {total}',
    'flux.rowsPerPage': 'Rows per page',
    'flux.next': 'Next',
    'flux.noItems': 'There are no items (left).',
    'flux.pagination': 'Pagination',
    'flux.paginationNavigateTitle': 'Navigate',
    'flux.paginationNavigateMessage': 'Please provide the desired page number you wish to navigate to.',
    'flux.paginationNavigatePage': 'Page',
    'flux.previous': 'Previous',
    'flux.search': 'Search...',
    'flux.sort': 'Sort',
    'flux.sortAscending': 'Ascending',
    'flux.sortDescending': 'Descending',
    'flux.sortRemove': 'Remove sorting',
    'flux.today': 'Today',
    'flux.galleryPlaceholderButton': 'Pick image',
    'flux.galleryPlaceholderMessage': 'Drop an image here or click the button to upload...',
    'flux.galleryPlaceholderTitle': 'Gallery',
    'flux.timezoneEurope': 'Europe',
    'flux.timezoneAmerica': 'America',
    'flux.timezoneUs': 'United States',
    'flux.timezoneAustralia': 'Australia',
    'flux.timezoneCanada': 'Canada',
    'flux.timezoneMexico': 'Mexico',
    'flux.timezoneAfrica': 'Africa',
    'flux.timezoneAntarctica': 'Antarctica',
    'flux.timezoneArctic': 'Arctic',
    'flux.timezoneAsia': 'Asia',
    'flux.timezoneAtlantic': 'Atlantic',
    'flux.timezoneBrazil': 'Brazil',
    'flux.timezoneChile': 'Chile',
    'flux.timezoneEtc': 'ETC',
    'flux.timezoneOther': 'Other',
    'flux.timezoneIndian': 'Indian',
    'flux.timezonePacific': 'Pacific'
} as const;

export function useTranslate(): FluxTranslator {
    const instance = getCurrentInstance()!.proxy;

    if (isVueI18n(instance)) {
        return (key, params) => instance.$t(key, params);
    }

    return (key, params) => {
        if (!(key in english)) {
            return key;
        }

        let translation: string = english[key as FluxTranslationKey];

        for (let paramName in params) {
            translation = translation.replaceAll(`{${paramName}}`, params[paramName].toString());
        }

        return translation;
    };
}

export type FluxTranslator = (key: FluxTranslationKey, params?: Record<string, string | number>) => string;
export type FluxTranslationKey = keyof typeof english;

type VueI18n = {
    $t: FluxTranslator;
}

function isVueI18n(obj: object | null): obj is VueI18n {
    return !!obj && '$t' in obj;
}
