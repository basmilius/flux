import { getCurrentInstance } from 'vue';
import type { FluxTranslate, FluxTranslation } from '$flux/data';
import { english } from '$flux/data';

const fallback: FluxTranslate = (key, params) => {
    if (!(key in english)) {
        return key;
    }

    let translation: string = english[key as FluxTranslation];

    for (let paramName in params) {
        translation = translation.replaceAll(`{${paramName}}`, params[paramName].toString());
    }

    return translation;
};

export default () => {
    const instance = getCurrentInstance()?.proxy;

    if (!instance || !isVueI18n(instance)) {
        return fallback;
    }

    return instance.$t;
};

type VueI18n = {
    $t: FluxTranslate;
}

function isVueI18n(obj: object | null): obj is VueI18n {
    return !!obj && '$t' in obj;
}
