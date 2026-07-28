import { useI18n } from 'vue-i18n';

export type TranslateParams = Record<string, string | number>;

export type TranslateFunction<K extends string> = (key: K | (string & {}), params?: TranslateParams) => string;

/**
 * Builds the composable a package uses to translate its own strings. Keys are
 * looked up in the app's vue-i18n messages first and fall back to the English
 * dictionary that ships with the package, so an app that translated nothing
 * still reads English instead of key paths.
 */
export function createTranslate<T extends Record<string, string>>(english: T = {} as T): () => TranslateFunction<keyof T & string> {
    return () => {
        const {t, te} = useI18n({useScope: 'global'});

        return (key, params) => {
            if (te(key)) {
                return t(key, params ?? {});
            }

            return interpolate(english[key as keyof T] ?? key, params);
        };
    };
}

function interpolate(translation: string, params?: TranslateParams): string {
    for (const name in params) {
        translation = translation.replaceAll(`{${name}}`, params[name].toString());
    }

    return translation;
}
