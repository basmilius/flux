export type TranslateParams = Record<string, string | number>;

export type TranslateFunction<K extends string = string> = (
    key: K | (string & {}),
    params?: TranslateParams
) => string;
