import { getCurrentInstance } from 'vue-demi';

const english: Record<string, string> = {
    flux_back: 'Back',
    flux_cancel: 'Cancel',
    flux_coming_soon: 'Coming soon',
    flux_continue: 'Continue',
    flux_custom_period: 'Custom period',
    flux_n_selected: '{n} selected',
    flux_ok: 'Ok',
    flux_optional: 'Optional',
    flux_preview: 'Preview',
    flux_displaying_of: '{from}–{to} of {total}',
    flux_rows_per_page: 'Rows per page',
    flux_no_items: 'There are no items (left).',
    flux_gallery_placeholder_button: 'Pick image',
    flux_gallery_placeholder_message: 'Drop an image here or click the button to upload...',
    flux_gallery_placeholder_title: 'Gallery'
} as const;

export function useTranslate(): Translator {
    const instance = getCurrentInstance()!;

    if ((instance.proxy as any).$t) {
        return (key, params) => (instance.proxy as any).$t(key, params);
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

type Translator = (key: string, params?: Record<string, string | number>) => string;
