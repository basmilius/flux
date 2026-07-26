import { animationFrameDebounce } from '@flux-ui/internals';
import { onScopeDispose, ref, type Ref } from 'vue';

// CSS function names are case-insensitive and a custom property keeps the token
// stream exactly as it was authored, so `getComputedStyle` can hand back
// `LIGHT-DARK(a, b)` and these cannot be an `indexOf`.
const LIGHT_DARK_PATTERN = /light-dark\(/gi;
const VAR_PATTERN = /var\(/gi;
const RESOLVABLE_PATTERN = /(?:var|light-dark)\(/i;

const LIGHT_DARK_LENGTH = 'light-dark('.length;
const VAR_LENGTH = 'var('.length;

const themeVersion = ref(0);

let subscribers = 0;
let teardown: (() => void) | null = null;

function subscribe(): void {
    subscribers++;

    if (teardown !== null || typeof document === 'undefined') {
        return;
    }

    // Every chart on the page re-runs its options on a bump, and a theme switch
    // touches more than one element, so the bumps are coalesced into one frame.
    const bump = animationFrameDebounce(() => {
        themeVersion.value++;
    });

    // The theme is an attribute on any element, not only on the root: a pane can
    // carry `[dark]` inside a light page. Without `subtree` a chart in such a pane
    // never learned that its colours had changed. The filter keeps the cost down;
    // `class` and `data-theme` are gone because nothing in the library keys on them.
    const observer = new MutationObserver(bump);
    observer.observe(document.documentElement, {attributes: true, attributeFilter: ['dark', 'light'], subtree: true});

    // An app that sets `color-scheme: light dark` follows the OS, and that flip
    // changes no attribute at all.
    const query = typeof window !== 'undefined'
        ? window.matchMedia('(prefers-color-scheme: dark)')
        : null;

    query?.addEventListener('change', bump);

    teardown = () => {
        observer.disconnect();
        query?.removeEventListener('change', bump);
    };
}

function unsubscribe(): void {
    subscribers--;

    if (subscribers > 0 || teardown === null) {
        return;
    }

    teardown();
    teardown = null;
}

// The observers belong to the charts that read this ref, not to the module: a hot
// reload replaces the module and the old instance would keep observing on behalf of
// components that have moved to the new one. Counting subscribers also keeps a page
// without charts from watching the document at all.
export function useCssVarVersion(): Ref<number> {
    subscribe();
    onScopeDispose(unsubscribe, true);

    return themeVersion;
}

function findFunction(pattern: RegExp, input: string, from: number): number {
    pattern.lastIndex = from;

    return pattern.exec(input)?.index ?? -1;
}

// Splits the arguments of the call whose `(` sits at `open`, leaving nested calls
// alone: a comma inside `oklch(...)` does not separate arguments and the `)` that
// closes it does not end the call. Null when the call is never closed. The slices
// are raw, so joining them back with a comma reproduces the original text.
function readArguments(input: string, open: number): { args: string[]; end: number } | null {
    const args: string[] = [];
    let depth = 0;
    let from = open + 1;

    for (let i = open; i < input.length; i++) {
        const character = input[i];

        if (character === '(') {
            depth++;
        } else if (character === ')') {
            depth--;

            if (depth === 0) {
                args.push(input.slice(from, i));

                return {args, end: i};
            }
        } else if (character === ',' && depth === 1) {
            args.push(input.slice(from, i));
            from = i + 1;
        }
    }

    return null;
}

// A fallback holds whatever the author put there, including a call with its own
// parentheses and commas, so this walks the string rather than matching a pattern:
// `var(--x, oklch(.5 .1 200))` has to come back as the whole `oklch()`.
function resolveVars(input: string, style: CSSStyleDeclaration): string {
    let output = '';
    let cursor = 0;
    let start = findFunction(VAR_PATTERN, input, cursor);

    while (start !== -1) {
        const call = readArguments(input, start + VAR_LENGTH - 1);

        if (call === null) {
            break;
        }

        const name = call.args[0].trim();
        const fallback = call.args.slice(1).join(',').trim();
        const value = name.startsWith('--') ? style.getPropertyValue(name).trim() : '';
        let replacement = input.slice(start, call.end + 1);

        if (value) {
            replacement = value;
        } else if (fallback) {
            replacement = resolveVars(fallback, style);
        }

        output += input.slice(cursor, start) + replacement;
        cursor = call.end + 1;
        start = findFunction(VAR_PATTERN, input, cursor);
    }

    return output + input.slice(cursor);
}

// A colour token is an unregistered custom property, so its computed value is the
// token stream with `var()` substituted and nothing else: `light-dark()` comes out
// verbatim and a canvas cannot parse it. Registering the properties would resolve
// it, but eagerly on `:root`, which freezes the whole page to one theme. So the
// pair is picked here instead, from the `color-scheme` in force at the chart.
function resolveLightDark(input: string, isDark: boolean): string {
    let output = '';
    let cursor = 0;
    let start = findFunction(LIGHT_DARK_PATTERN, input, cursor);

    while (start !== -1) {
        const call = readArguments(input, start + LIGHT_DARK_LENGTH - 1);

        if (call === null || call.args.length < 2) {
            break;
        }

        // The side that wins can hold a `light-dark()` of its own, once a token that
        // has one was substituted into it.
        const chosen = resolveLightDark(call.args[isDark ? 1 : 0].trim(), isDark);

        output += input.slice(cursor, start) + chosen;
        cursor = call.end + 1;
        start = findFunction(LIGHT_DARK_PATTERN, input, cursor);
    }

    return output + input.slice(cursor);
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
    return resolveLightDark(resolveVars(input, style), isDark);
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
        // A token that only holds a `light-dark()` never goes through `var()`, so the
        // test cannot be for that alone.
        return (RESOLVABLE_PATTERN.test(value) ? resolveWithStyle(value, style, isDark) : value) as T;
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
