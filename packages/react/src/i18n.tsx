import {createContext, useCallback, useContext, useMemo, type ReactNode} from 'react';
import type {TranslateFunction, TranslateParams} from '@flux-ui/types/translate';
import {english} from './english';

export type FluxMessages = {[key: string]: string | FluxMessages};
export interface FluxLocaleProps {
    children?: ReactNode;
    locale?: string;
    messages?: Record<string, FluxMessages>;
    translate?: (key: string, params?: TranslateParams) => string | undefined;
}
const LocaleContext = createContext<Omit<FluxLocaleProps, 'children'>>({locale: 'en'});

export function FluxLocaleProvider({children, locale, messages, translate}: FluxLocaleProps) {
    const parent = useContext(LocaleContext);
    const value = useMemo(() => ({locale: locale ?? parent.locale, messages: messages ?? parent.messages, translate: translate ?? parent.translate}), [locale, messages, translate, parent]);
    return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function createTranslate<T extends Record<string, string>>(fallback: T = {} as T): () => TranslateFunction<keyof T & string> {
    return function useTranslate() {
        const context = useContext(LocaleContext);
        return useCallback<TranslateFunction<keyof T & string>>((key, params) => {
            const translated = context.translate?.(key, params);
            if (translated !== undefined) return translated;
            const locale = context.locale ?? 'en';
            const messages = context.messages?.[locale] ?? context.messages?.[locale.split('-')[0]];
            const value = lookup(messages, key) ?? fallback[key] ?? key;
            return Object.entries(params ?? {}).reduce((text, [name, replacement]) => text.replaceAll(`{${name}}`, String(replacement)), value);
        }, [context]);
    };
}
export const useFluxTranslate = createTranslate(english);
export function useFluxLocale() {return useContext(LocaleContext).locale ?? 'en';}

function lookup(messages: FluxMessages | undefined, key: string): string | undefined {
    if (typeof messages?.[key] === 'string') return messages[key] as string;
    let value: string | FluxMessages | undefined = messages;
    for (const part of key.split('.')) value = typeof value === 'object' ? value[part] : undefined;
    return typeof value === 'string' ? value : undefined;
}
