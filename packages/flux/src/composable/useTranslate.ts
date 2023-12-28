import { getCurrentInstance } from 'vue';

export const english = {
    flux_back: 'Back',
    flux_cancel: 'Cancel',
    flux_coming_soon: 'Coming soon',
    flux_continue: 'Continue',
    flux_custom_period: 'Custom period',
    flux_filter: 'Filter',
    flux_filter_reset: 'Reset filters',
    flux_n_selected: '{n} selected',
    flux_ok: 'Ok',
    flux_optional: 'Optional',
    flux_preview: 'Preview',
    flux_preview_close: 'Close preview',
    flux_displaying_of: '{from}–{to} of {total}',
    flux_rows_per_page: 'Rows per page',
    flux_next: 'Next',
    flux_no_items: 'There are no items (left).',
    flux_pagination: 'Pagination',
    flux_pagination_navigate_title: 'Navigate',
    flux_pagination_navigate_message: 'Please provide the desired page number you wish to navigate to.',
    flux_pagination_navigate_page: 'Page',
    flux_previous: 'Previous',
    flux_search: 'Search...',
    flux_sort: 'Sort',
    flux_sort_ascending: 'Ascending',
    flux_sort_descending: 'Descending',
    flux_sort_remove: 'Remove sorting',
    flux_today: 'Today',
    flux_gallery_placeholder_button: 'Pick image',
    flux_gallery_placeholder_message: 'Drop an image here or click the button to upload...',
    flux_gallery_placeholder_title: 'Gallery',
    flux_timezone_europe: 'Europe',
    flux_timezone_america: 'America',
    flux_timezone_us: 'United States',
    flux_timezone_australia: 'Australia',
    flux_timezone_canada: 'Canada',
    flux_timezone_mexico: 'Mexico',
    flux_timezone_africa: 'Africa',
    flux_timezone_antarctica: 'Antarctica',
    flux_timezone_arctic: 'Arctic',
    flux_timezone_asia: 'Asia',
    flux_timezone_atlantic: 'Atlantic',
    flux_timezone_brazil: 'Brazil',
    flux_timezone_chile: 'Chile',
    flux_timezone_etc: 'ETC',
    flux_timezone_other: 'Other',
    flux_timezone_indian: 'Indian',
    flux_timezone_pacific: 'Pacific'
} as const;

type TranslationKey = keyof typeof english;

export function useTranslate(): FluxTranslator {
    const instance = getCurrentInstance()!.proxy;

    if (isVueI18n(instance)) {
        return (key, params) => instance.$t(key, params);
    }

    return (key, params) => {
        if (!(key in english)) {
            return key;
        }

        let translation: string = english[key as TranslationKey];

        for (let paramName in params) {
            translation = translation.replaceAll(`{${paramName}}`, params[paramName].toString());
        }

        return translation;
    };
}

export type FluxTranslator = (key: TranslationKey | ({} & string), params?: Record<string, string | number>) => string;

type VueI18n = {
    $t: FluxTranslator;
}

function isVueI18n(obj: object | null): obj is VueI18n {
    return !!obj && '$t' in obj;
}
