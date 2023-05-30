import { getCurrentInstance } from 'vue-demi';

const english: Record<string, string> = {
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
    flux_no_items: 'There are no items (left).',
    flux_pagination_navigate_title: 'Navigate',
    flux_pagination_navigate_message: 'Please provide the desired page number you wish to navigate to.',
    flux_pagination_navigate_page: 'Page',
    flux_sort: 'Sort',
    flux_sort_ascending: 'Ascending',
    flux_sort_descending: 'Descending',
    flux_sort_remove: 'Remove sorting',
    flux_today: 'Today',
    flux_gallery_placeholder_button: 'Pick image',
    flux_gallery_placeholder_message: 'Drop an image here or click the button to upload...',
    flux_gallery_placeholder_title: 'Gallery'
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

        let translation = english[key];

        for (let paramName in params) {
            translation = translation.replaceAll(`{${paramName}}`, params[paramName].toString());
        }

        return translation;
    };
}

export type FluxTranslator = (key: string, params?: Record<string, string | number>) => string;

interface VueI18n {
    $t: FluxTranslator;
}

function isVueI18n(obj: object | null): obj is VueI18n {
    return !!obj && '$t' in obj;
}
