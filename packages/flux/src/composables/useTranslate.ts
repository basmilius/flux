import { getCurrentInstance } from 'vue-demi';

export function useTranslate(): Translator {
    const instance = getCurrentInstance()!;

    if ((instance.proxy as any).$t) {
        return (key, params) => (instance.proxy as any).$t(key, params);
    }

    return key => key;
}

type Translator = (key: string, params?: object) => string;
