import { ref } from 'vue';

const CSS_VAR_PATTERN = /var\((--[^,)]+)(?:,\s*([^)]+))?\)/g;

const themeVersion = ref(0);

if (typeof document !== 'undefined') {
    new MutationObserver(() => themeVersion.value++).observe(
        document.documentElement,
        { attributes: true, attributeFilter: ['class', 'data-theme'] }
    );
}

export function useCssVarVersion() {
    return themeVersion;
}

export function resolveCssVar(input: string, root?: HTMLElement): string {
    if (typeof document === 'undefined' || !input.includes('var(')) {
        return input;
    }

    const target = root ?? document.documentElement;

    return input.replace(CSS_VAR_PATTERN, (match, name: string, fallback?: string) => {
        const value = getComputedStyle(target).getPropertyValue(name).trim();

        if (value) {
            return value;
        }

        return fallback ? resolveCssVar(fallback.trim(), target) : match;
    });
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
    if (value === null || typeof value !== 'object') {
        return false;
    }

    const proto = Object.getPrototypeOf(value);
    return proto === Object.prototype || proto === null;
}

export function deepResolveCssVars<T>(value: T, root?: HTMLElement): T {
    if (typeof value === 'string') {
        return (value.includes('var(') ? resolveCssVar(value, root) : value) as T;
    }

    if (Array.isArray(value)) {
        let changed = false;
        const out: unknown[] = new Array(value.length);

        for (let i = 0; i < value.length; i++) {
            const resolved = deepResolveCssVars(value[i], root);

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
        const resolved = deepResolveCssVars(original, root);

        if (resolved !== original) {
            changed = true;
        }

        out[key] = resolved;
    }

    return (changed ? out : value) as T;
}
