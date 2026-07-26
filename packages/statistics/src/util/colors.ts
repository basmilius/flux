import { ref } from 'vue';

const CSS_VAR_PATTERN = /var\((--[^,)]+)(?:,\s*([^)]+))?\)/g;
const LIGHT_DARK = 'light-dark(';

const themeVersion = ref(0);

if (typeof document !== 'undefined') {
    // The theme is an attribute on any element, not only on the root: a pane can
    // carry `[dark]` inside a light page. Without `subtree` a chart in such a pane
    // never learned that its colours had changed. The filter keeps the cost down;
    // `class` and `data-theme` are gone because nothing in the library keys on them.
    new MutationObserver(() => themeVersion.value++).observe(
        document.documentElement,
        {attributes: true, attributeFilter: ['dark', 'light'], subtree: true}
    );

    // An app that sets `color-scheme: light dark` follows the OS, and that flip
    // changes no attribute at all.
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => themeVersion.value++);
}

export function useCssVarVersion() {
    return themeVersion;
}

// A colour token is an unregistered custom property, so its computed value is the
// token stream with `var()` substituted and nothing else: `light-dark()` comes out
// verbatim and a canvas cannot parse it. Registering the properties would resolve
// it, but eagerly on `:root`, which freezes the whole page to one theme. So the
// pair is picked here instead, from the `color-scheme` in force at the chart.
function resolveLightDark(input: string, isDark: boolean): string {
    let result = input;
    let start = result.indexOf(LIGHT_DARK);

    while (start !== -1) {
        let depth = 0;
        let comma = -1;
        let end = -1;

        for (let i = start + LIGHT_DARK.length - 1; i < result.length; i++) {
            const character = result[i];

            if (character === '(') {
                depth++;
            } else if (character === ')') {
                depth--;

                if (depth === 0) {
                    end = i;
                    break;
                }
            } else if (character === ',' && depth === 1 && comma === -1) {
                comma = i;
            }
        }

        if (comma === -1 || end === -1) {
            return result;
        }

        const chosen = isDark
            ? result.slice(comma + 1, end).trim()
            : result.slice(start + LIGHT_DARK.length, comma).trim();

        result = result.slice(0, start) + chosen + result.slice(end + 1);
        start = result.indexOf(LIGHT_DARK);
    }

    return result;
}

function isDarkScheme(style: CSSStyleDeclaration): boolean {
    const scheme = style.getPropertyValue('color-scheme');
    const light = scheme.includes('light');
    const dark = scheme.includes('dark');

    if (light !== dark) {
        return dark;
    }

    return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function resolveWithStyle(input: string, style: CSSStyleDeclaration, isDark: boolean): string {
    const substituted = input.replace(CSS_VAR_PATTERN, (match, name: string, fallback?: string) => {
        const value = style.getPropertyValue(name).trim();

        if (value) {
            return value;
        }

        return fallback ? resolveWithStyle(fallback.trim(), style, isDark) : match;
    });

    return substituted.includes(LIGHT_DARK) ? resolveLightDark(substituted, isDark) : substituted;
}

export function resolveCssVar(input: string, root?: HTMLElement | null): string {
    if (typeof document === 'undefined' || !input.includes('var(')) {
        return input;
    }

    const style = getComputedStyle(root ?? document.documentElement);

    return resolveWithStyle(input, style, isDarkScheme(style));
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
    if (value === null || typeof value !== 'object') {
        return false;
    }

    const proto = Object.getPrototypeOf(value);
    return proto === Object.prototype || proto === null;
}

function deepResolveWithStyle<T>(value: T, style: CSSStyleDeclaration, isDark: boolean): T {
    if (typeof value === 'string') {
        return (value.includes('var(') ? resolveWithStyle(value, style, isDark) : value) as T;
    }

    if (Array.isArray(value)) {
        let changed = false;
        const out: unknown[] = new Array(value.length);

        for (let i = 0; i < value.length; i++) {
            const resolved = deepResolveWithStyle(value[i], style, isDark);

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
        const resolved = deepResolveWithStyle(original, style, isDark);

        if (resolved !== original) {
            changed = true;
        }

        out[key] = resolved;
    }

    return (changed ? out : value) as T;
}

// `root` is the element the chart renders in, so a chart inside a `[dark]` subtree
// resolves against that subtree instead of the light document. It is null until
// the component mounts, and the document is the right answer until then.
export function deepResolveCssVars<T>(value: T, root?: HTMLElement | null): T {
    if (typeof document === 'undefined') {
        return value;
    }

    const style = getComputedStyle(root ?? document.documentElement);

    return deepResolveWithStyle(value, style, isDarkScheme(style));
}
