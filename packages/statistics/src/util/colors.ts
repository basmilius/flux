import { animationFrameDebounce } from '@flux-ui/internals';
import { onScopeDispose, ref, type Ref } from 'vue';

// Case-insensitive: a custom property keeps the token stream exactly as it was
// authored, so `getComputedStyle` can hand back `LIGHT-DARK(a, b)`.
const LIGHT_DARK_PATTERN = /light-dark\(/gi;
const VAR_PATTERN = /var\(/gi;
const RESOLVABLE_PATTERN = /(?:var|light-dark)\(/i;

// ECharts parses a color itself and knows nothing past `hsl()`, so an `oklch()` reaches it
// as an illegal color and falls back to black. Dark adds relative color syntax on top.
const MODERN_COLOR_PATTERN = /(?:oklch|oklab|lch|lab|hwb|color-mix|color)\(/gi;
const MODERN_COLOR_TEST = /(?:oklch|oklab|lch|lab|hwb|color-mix|color)\(/i;

// Improbable enough that reading it back means `fillStyle` refused the input.
const REFUSED = '#010203';

const themeVersion = ref(0);

let subscribers = 0;
let teardown: (() => void) | null = null;

function subscribe(): void {
    subscribers++;

    if (teardown !== null || typeof document === 'undefined') {
        return;
    }

    const bump = animationFrameDebounce(() => {
        themeVersion.value++;
    });

    // A pane can carry `[dark]` inside a light page, so the whole subtree is watched
    // rather than the root alone.
    const observer = new MutationObserver(bump);
    observer.observe(document.documentElement, {attributes: true, attributeFilter: ['dark', 'light'], subtree: true});

    // An app on `color-scheme: light dark` follows the OS, and that flip changes no attribute.
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

// Refcounted rather than subscribed once per module: a hot reload replaces the module
// and the old instance would keep observing for components that have moved on.
export function useCssVarVersion(): Ref<number> {
    subscribe();
    onScopeDispose(unsubscribe, true);

    return themeVersion;
}

// Splits the arguments of the call whose `(` sits at `open`, leaving nested calls alone.
// Null when the call is never closed; the slices are raw, so a comma join is lossless.
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

// Rewrites every call the pattern matches, outermost first. `replace` hands back the
// text to put in its place, or null to stop and leave the rest of the input alone.
function replaceCalls(input: string, pattern: RegExp, replace: (args: string[], original: string) => string | null): string {
    let output = '';
    let cursor = 0;

    pattern.lastIndex = 0;

    for (let match = pattern.exec(input); match !== null; match = pattern.exec(input)) {
        const call = readArguments(input, match.index + match[0].length - 1);

        if (call === null) {
            break;
        }

        const replacement = replace(call.args, input.slice(match.index, call.end + 1));

        if (replacement === null) {
            break;
        }

        output += input.slice(cursor, match.index) + replacement;
        cursor = call.end + 1;
        pattern.lastIndex = cursor;
    }

    return output + input.slice(cursor);
}

// A fallback can hold a call of its own, so `var(--x, oklch(.5 .1 200))` has to come back
// as the whole `oklch()`. That is why this walks the string instead of matching a pattern.
function resolveVars(input: string, style: CSSStyleDeclaration): string {
    return replaceCalls(input, VAR_PATTERN, (args, original) => {
        const name = args[0].trim();
        const fallback = args.slice(1).join(',').trim();
        const value = name.startsWith('--') ? style.getPropertyValue(name).trim() : '';

        if (value) {
            return value;
        }

        return fallback ? resolveVars(fallback, style) : original;
    });
}

// A color token is an unregistered custom property, so its computed value still holds a
// verbatim `light-dark()` that a canvas cannot parse. Registering it would resolve that
// eagerly on `:root` and freeze the page to one theme, so the pair is picked here.
function resolveLightDark(input: string, isDark: boolean): string {
    return replaceCalls(input, LIGHT_DARK_PATTERN, args => {
        if (args.length < 2) {
            return null;
        }

        // The winning side can hold a `light-dark()` of its own, substituted in from a token.
        return resolveLightDark(args[isDark ? 1 : 0].trim(), isDark);
    });
}

// The canvas is both the reason and the cure: it parses every color syntax the browser
// knows. The pixel is read rather than `fillStyle`, which hands an `oklch()` straight
// back: a color keeps its own space through serialization, and only painting resolves it.
const convertedColors = new Map<string, string>();

let canvasContext: CanvasRenderingContext2D | null | undefined;

function toRgb(input: string): string {
    const cached = convertedColors.get(input);

    if (cached !== undefined) {
        return cached;
    }

    if (canvasContext === undefined) {
        const canvas = document.createElement('canvas');

        canvas.width = 1;
        canvas.height = 1;
        canvasContext = canvas.getContext('2d', {willReadFrequently: true});

        if (canvasContext !== null) {
            // So a fill replaces the pixel instead of blending onto the last one, which
            // is what keeps alpha intact.
            canvasContext.globalCompositeOperation = 'copy';
        }
    }

    let output = input;

    if (canvasContext !== null) {
        canvasContext.fillStyle = REFUSED;
        canvasContext.fillStyle = input;

        // An invalid value leaves the previous one standing rather than throwing.
        if (canvasContext.fillStyle !== REFUSED) {
            canvasContext.fillRect(0, 0, 1, 1);

            const [red, green, blue, alpha] = canvasContext.getImageData(0, 0, 1, 1).data;

            output = alpha === 255
                ? `rgb(${red}, ${green}, ${blue})`
                : `rgba(${red}, ${green}, ${blue}, ${(alpha / 255).toFixed(3)})`;
        }
    }

    convertedColors.set(input, output);

    return output;
}

// Per call rather than per string: a tooltip template carries markup around its colors.
function resolveModernColors(input: string): string {
    return replaceCalls(input, MODERN_COLOR_PATTERN, (_, original) => toRgb(original));
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
        // A token that only holds a `light-dark()` never goes through `var()`.
        const resolved = RESOLVABLE_PATTERN.test(value) ? resolveWithStyle(value, style, isDark) : value;

        return (MODERN_COLOR_TEST.test(resolved) ? resolveModernColors(resolved) : resolved) as T;
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
// resolves against that subtree. It is null until mount; the document holds until then.
export function deepResolveCssVars<T>(value: T, root?: HTMLElement | null): T {
    if (typeof document === 'undefined') {
        return value;
    }

    const style = getComputedStyle(root ?? document.documentElement);

    return deepResolveWithStyle(value, style, isDarkScheme(style));
}
