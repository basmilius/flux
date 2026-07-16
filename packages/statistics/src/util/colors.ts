import { ref } from 'vue';

const CSS_VAR_PATTERN = /var\((--[^,)]+)(?:,\s*([^)]+))?\)/g;

const themeVersion = ref(0);

if (typeof document !== 'undefined') {
    new MutationObserver(() => themeVersion.value++).observe(
        document.documentElement,
        {attributes: true, attributeFilter: ['class', 'data-theme']}
    );
}

export function useCssVarVersion() {
    return themeVersion;
}

function resolveWithStyle(input: string, style: CSSStyleDeclaration): string {
    return input.replace(CSS_VAR_PATTERN, (match, name: string, fallback?: string) => {
        const value = style.getPropertyValue(name).trim();

        if (value) {
            return value;
        }

        return fallback ? resolveWithStyle(fallback.trim(), style) : match;
    });
}

export function resolveCssVar(input: string, root?: HTMLElement): string {
    if (typeof document === 'undefined' || !input.includes('var(')) {
        return input;
    }

    const target = root ?? document.documentElement;

    return resolveWithStyle(input, getComputedStyle(target));
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
    if (value === null || typeof value !== 'object') {
        return false;
    }

    const proto = Object.getPrototypeOf(value);
    return proto === Object.prototype || proto === null;
}

function deepResolveWithStyle<T>(value: T, style: CSSStyleDeclaration): T {
    if (typeof value === 'string') {
        return (value.includes('var(') ? resolveWithStyle(value, style) : value) as T;
    }

    if (Array.isArray(value)) {
        let changed = false;
        const out: unknown[] = new Array(value.length);

        for (let i = 0; i < value.length; i++) {
            const resolved = deepResolveWithStyle(value[i], style);

            if (resolved !== value[i]) {
                changed = true;
            }

            out[i] = resolved;
        }

        return (changed ? out : value) as T;
    }

    if (!isPlainObject(value)) {
        return value;
    }

    let changed = false;
    const out: Record<string, unknown> = {};

    for (const key of Object.keys(value)) {
        const original = value[key];
        const resolved = deepResolveWithStyle(original, style);

        if (resolved !== original) {
            changed = true;
        }

        out[key] = resolved;
    }

    return (changed ? out : value) as T;
}

export function deepResolveCssVars<T>(value: T, root?: HTMLElement): T {
    if (typeof document === 'undefined') {
        return value;
    }

    const target = root ?? document.documentElement;

    return deepResolveWithStyle(value, getComputedStyle(target));
}
