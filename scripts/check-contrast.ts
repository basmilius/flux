/**
 * Asserts the color contract against the built `dist/index.css` rather than the Sass
 * source, because what regresses is the emitted value. Every token is resolved twice, once
 * per scheme, by taking the matching branch of every `light-dark()` it passes through.
 *
 * Run after building both packages, or it measures the previous values without saying so:
 *   bun run --cwd packages/components build
 *   bun run --cwd packages/statistics build
 *   bun scripts/check-contrast.ts
 */

import { readFileSync } from 'node:fs';

// Two bundles: the chart tokens ship from their own package while the grounds they read
// sit in the components one. Reading only the first is how `chart.scss` escaped the gate.
const CSS_PATHS = ['packages/components/dist/index.css', 'packages/statistics/dist/index.css'] as const;

const COLORED = ['primary', 'danger', 'info', 'success', 'warning'] as const;
const INTENTS = [...COLORED, 'gray'] as const;
const ELEVATIONS = ['--surface-canvas', '--background', '--surface-sunken', '--surface', '--surface-raised'] as const;
const SCHEMES = ['light', 'dark'] as const;

type Scheme = (typeof SCHEMES)[number];
type Rgba = readonly [number, number, number, number];

// ---------------------------------------------------------------------------
// Parsing
// ---------------------------------------------------------------------------

/**
 * Reads the custom properties out of the first `:root` block. Splits on the first colon
 * only, because a value carries nested parentheses and commas, and finds the end by
 * matching braces, because `@layer flux-base` wraps everything.
 */
function readTokens(css: string, path: string): Map<string, string> {
    const start = css.indexOf(':root {');

    if (start === -1) {
        throw new Error(`no :root block in ${path}`);
    }

    const open = css.indexOf('{', start);
    const tokens = new Map<string, string>();
    let depth = 0;
    let end = -1;

    for (let index = open; index < css.length; index++) {
        if (css[index] === '{') {
            depth++;
        } else if (css[index] === '}' && --depth === 0) {
            end = index;
            break;
        }
    }

    if (end === -1) {
        throw new Error(`unterminated :root block in ${path}`);
    }

    for (const line of css.slice(open + 1, end).split('\n')) {
        const trimmed = line.trim().replace(/;$/, '');

        if (!trimmed.startsWith('--')) {
            continue;
        }

        const colon = trimmed.indexOf(':');
        const name = trimmed.slice(0, colon).trim();

        // CSS silently resolves a token declared twice to the last one.
        if (tokens.has(name)) {
            throw new Error(`${name} is declared twice in the :root block`);
        }

        tokens.set(name, trimmed.slice(colon + 1).trim());
    }

    return tokens;
}

/**
 * Every bundle's tokens in one map. A name arriving twice is refused rather than merged:
 * whichever bundle a page loads last would win, and nothing here knows that order.
 */
function readAllTokens(): Map<string, string> {
    const tokens = new Map<string, string>();

    for (const path of CSS_PATHS) {
        for (const [name, value] of readTokens(readFileSync(path, 'utf8'), path)) {
            if (tokens.has(name)) {
                throw new Error(`${name} is declared in more than one bundle, last in ${path}`);
            }

            tokens.set(name, value);
        }
    }

    return tokens;
}

function splitArguments(input: string): string[] {
    const parts: string[] = [];
    let depth = 0;
    let current = '';

    for (const char of input) {
        if (char === '(') {
            depth++;
        } else if (char === ')') {
            depth--;
        }

        if (char === ',' && depth === 0) {
            parts.push(current.trim());
            current = '';
            continue;
        }

        current += char;
    }

    parts.push(current.trim());

    return parts;
}

function findCall(value: string, name: string): {args: string; start: number; end: number} | null {
    const needle = `${name}(`;
    const start = value.indexOf(needle);

    if (start === -1) {
        return null;
    }

    let depth = 0;

    for (let index = start + needle.length - 1; index < value.length; index++) {
        if (value[index] === '(') {
            depth++;
        } else if (value[index] === ')') {
            depth--;

            if (depth === 0) {
                return {
                    args: value.slice(start + needle.length, index),
                    start,
                    end: index + 1
                };
            }
        }
    }

    throw new Error(`unbalanced ${name}() in "${value}"`);
}

function resolve(value: string, scheme: Scheme, tokens: Map<string, string>, seen: string[] = []): string {
    let result = value;

    for (let guard = 0; guard < 32; guard++) {
        const themed = findCall(result, 'light-dark');

        if (themed !== null) {
            const branches = splitArguments(themed.args);
            result = result.slice(0, themed.start) + branches[scheme === 'light' ? 0 : 1] + result.slice(themed.end);
            continue;
        }

        const reference = findCall(result, 'var');

        if (reference === null) {
            return result.trim();
        }

        const [name, fallback] = splitArguments(reference.args);

        if (seen.includes(name)) {
            throw new Error(`circular token reference: ${[...seen, name].join(' -> ')}`);
        }

        const referenced = tokens.get(name) ?? fallback;

        if (referenced === undefined) {
            throw new Error(`unknown token ${name}`);
        }

        result = result.slice(0, reference.start) + resolve(referenced, scheme, tokens, [...seen, name]) + result.slice(reference.end);
    }

    throw new Error(`could not resolve "${value}"`);
}

// ---------------------------------------------------------------------------
// Color
// ---------------------------------------------------------------------------

/**
 * Refuses what `Number` cannot read instead of handing NaN on: every comparison here is
 * `false` for NaN, so an unreadable value would pass every check by being unreadable.
 * `oklch(99% 0 0)` and `oklch(.99 none 0)` are legal CSS and used to slip through.
 */
function readNumber(input: string, label: string): number {
    const value = input.trim() === '' ? Number.NaN : Number(input);

    if (Number.isNaN(value)) {
        throw new Error(`unsupported ${label} "${input}"`);
    }

    return value;
}

function parseColor(input: string): Rgba {
    const value = input.trim();

    if (value === 'transparent') {
        return [0, 0, 0, 0];
    }

    // Everything below works in linear sRGB and a hex is gamma encoded, so it has to be
    // decoded on the way in.
    if (value.startsWith('#')) {
        const hex = value.slice(1);

        if (!/^(?:[\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/i.test(hex)) {
            throw new Error(`unsupported color "${input}"`);
        }

        const size = hex.length <= 4 ? 1 : 2;
        const channel = (index: number) => {
            const part = hex.slice(index * size, index * size + size);

            return parseInt(size === 1 ? part + part : part, 16) / 255;
        };

        return [decode(channel(0)), decode(channel(1)), decode(channel(2)), hex.length === 4 || hex.length === 8 ? channel(3) : 1];
    }

    const oklch = findCall(value, 'oklch');

    // The call has to be the whole value: `color-mix(in srgb, oklch(...) 15%, transparent)`
    // would otherwise read back as the opaque color it mixes from.
    if (oklch === null || oklch.start !== 0 || oklch.end !== value.length) {
        throw new Error(`unsupported color "${input}"`);
    }

    return oklch.args.trimStart().startsWith('from ') ? parseRelative(oklch.args) : parseAbsolute(oklch.args);
}

function toRgba(lightness: number, chroma: number, hue: number, alphaPart: string | null): Rgba {
    return [...oklchToLinearSrgb(lightness, chroma, hue), alphaPart === null ? 1 : parseAlpha(alphaPart)];
}

function parseAbsolute(args: string): Rgba {
    const [components, alphaPart] = splitAlpha(args);
    const channels = components.trim().split(/\s+/);

    if (channels.length !== 3) {
        throw new Error(`expected three channels in "oklch(${args})"`);
    }

    const [lightness, chroma, hue] = channels.map(channel => readNumber(channel, 'channel'));

    return toRgba(lightness, chroma, hue, alphaPart);
}

/**
 * `oklch(from <color> <l> <c> <h> [/ <a>])`. A dark neutral keeps its solved lightness
 * while taking hue and chroma off the stop it is anchored to, which is what lets a palette
 * override reshade a theme with no stops to land on.
 */
function parseRelative(args: string): Rgba {
    const rest = args.trimStart().slice('from '.length);
    const originEnd = findColorEnd(rest);
    const origin = oklchOf(parseColor(rest.slice(0, originEnd)));
    const [components, alphaPart] = splitAlpha(rest.slice(originEnd));
    const channels = components.trim().split(/\s+(?![^(]*\))/);

    if (channels.length !== 3) {
        throw new Error(`expected three channels in "oklch(${args})"`);
    }

    const [lightness, chroma, hue] = channels.map((channel, index) => evaluateChannel(channel, origin, index));

    return toRgba(lightness, chroma, hue, alphaPart);
}

/**
 * Channels are one of: a literal, the passthrough keyword `l` / `c` / `h`, or
 * `calc(<keyword> * <factor>)`. That is the entire grammar the token layer emits.
 */
function evaluateChannel(channel: string, origin: readonly [number, number, number], index: number): number {
    const keyword = ['l', 'c', 'h'][index];
    const trimmed = channel.trim();

    if (trimmed === keyword) {
        return origin[index];
    }

    const calc = findCall(trimmed, 'calc');

    if (calc !== null) {
        const [left, right] = calc.args.split('*').map(part => part.trim());

        if (left !== keyword) {
            throw new Error(`unsupported calc channel "${trimmed}"`);
        }

        return origin[index] * readNumber(right, 'factor');
    }

    return readNumber(trimmed, 'channel');
}

function splitAlpha(input: string): [string, string | null] {
    let depth = 0;

    for (let index = input.length - 1; index >= 0; index--) {
        const character = input[index];

        if (character === ')') {
            depth++;
        } else if (character === '(') {
            depth--;
        } else if (character === '/' && depth === 0) {
            return [input.slice(0, index).trim(), input.slice(index + 1).trim()];
        }
    }

    return [input.trim(), null];
}

function findColorEnd(input: string): number {
    const open = input.indexOf('(');

    if (open === -1) {
        return input.indexOf(' ');
    }

    let depth = 0;

    for (let index = open; index < input.length; index++) {
        if (input[index] === '(') {
            depth++;
        } else if (input[index] === ')' && --depth === 0) {
            return index + 1;
        }
    }

    throw new Error(`unbalanced origin color in "${input}"`);
}

function parseAlpha(input: string): number {
    return input.endsWith('%') ? readNumber(input.slice(0, -1), 'alpha') / 100 : readNumber(input, 'alpha');
}

/**
 * OKLCH -> OKLab -> LMS -> linear sRGB, then clipped per channel. Not what CSS Color 4
 * specifies, which reduces chroma instead, but what all three engines actually paint.
 */
function oklchToLinearSrgb(lightness: number, chroma: number, hue: number): [number, number, number] {
    return clipAll(oklchToUnbounded(lightness, chroma, hue));
}

function oklchToUnbounded(lightness: number, chroma: number, hue: number): [number, number, number] {
    const radians = (hue * Math.PI) / 180;
    const labA = chroma * Math.cos(radians);
    const labB = chroma * Math.sin(radians);

    const long = (lightness + 0.3963377774 * labA + 0.2158037573 * labB) ** 3;
    const medium = (lightness - 0.1055613458 * labA - 0.0638541728 * labB) ** 3;
    const short = (lightness - 0.0894841775 * labA - 1.291485548 * labB) ** 3;

    return [
        4.0767416621 * long - 3.3077115913 * medium + 0.2309699292 * short,
        -1.2684380046 * long + 2.6097574011 * medium - 0.3413193965 * short,
        -0.0041960863 * long - 0.7034186147 * medium + 1.707614701 * short
    ];
}

function clip(value: number): number {
    return Math.min(1, Math.max(0, value));
}

function clipAll([red, green, blue]: [number, number, number]): [number, number, number] {
    return [clip(red), clip(green), clip(blue)];
}

function encode(value: number): number {
    return value <= 0.0031308 ? 12.92 * value : 1.055 * Math.pow(value, 1 / 2.4) - 0.055;
}

function decode(value: number): number {
    return value <= 0.04045 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
}

function oklab([red, green, blue]: Rgba): readonly [number, number, number] {
    const long = Math.cbrt(0.4122214708 * red + 0.5363325363 * green + 0.0514459929 * blue);
    const medium = Math.cbrt(0.2119034982 * red + 0.6806995451 * green + 0.1073969566 * blue);
    const short = Math.cbrt(0.0883024619 * red + 0.2817188376 * green + 0.6299787005 * blue);

    return [
        0.2104542553 * long + 0.793617785 * medium - 0.0040720468 * short,
        1.9779984951 * long - 2.428592205 * medium + 0.4505937099 * short,
        0.0259040371 * long + 0.7827717662 * medium - 0.808675766 * short
    ];
}

function oklchOf(color: Rgba): readonly [number, number, number] {
    const [lightness, labA, labB] = oklab(color);

    return [lightness, Math.hypot(labA, labB), ((Math.atan2(labB, labA) * 180) / Math.PI + 360) % 360];
}

/**
 * Composites a possibly translucent color over an opaque backdrop: a token like
 * `--ink-hover` has no contrast until it sits on something. The blend happens on the gamma
 * encoded values, because that is where a browser does it.
 */
function over(foreground: Rgba, background: Rgba): Rgba {
    // A translucent backdrop has to be painted onto something opaque first.
    if (background[3] !== 1) {
        throw new Error(`cannot measure against a translucent backdrop (alpha ${background[3]})`);
    }

    const alpha = foreground[3];

    if (alpha === 1) {
        return [foreground[0], foreground[1], foreground[2], 1];
    }

    return [
        decode(encode(foreground[0]) * alpha + encode(background[0]) * (1 - alpha)),
        decode(encode(foreground[1]) * alpha + encode(background[1]) * (1 - alpha)),
        decode(encode(foreground[2]) * alpha + encode(background[2]) * (1 - alpha)),
        1
    ];
}

function luminance([red, green, blue]: Rgba): number {
    return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

/**
 * OKLab lightness. A contrast ratio answers "can this be read"; an interaction state is
 * noticed rather than read, and at the dark end a ratio exaggerates what the eye barely
 * registers.
 */
function lightness(color: Rgba): number {
    return oklab(color)[0];
}

/**
 * How far apart two colors are, as a distance in OKLab rather than along one axis. The
 * measure for a fill against its ground: those separate on hue as much as on brightness,
 * and a luminance ratio is blind to hue.
 */
function distance(first: Rgba, second: Rgba): number {
    const [firstL, firstA, firstB] = oklab(first);
    const [secondL, secondA, secondB] = oklab(second);

    return Math.hypot(firstL - secondL, firstA - secondA, firstB - secondB);
}

function contrast(foreground: Rgba, background: Rgba): number {
    const composited = luminance(over(foreground, background));
    const base = luminance(background);

    return (Math.max(composited, base) + 0.05) / (Math.min(composited, base) + 0.05);
}

// ---------------------------------------------------------------------------
// Reading the tokens
// ---------------------------------------------------------------------------

/**
 * The layers under a color, painted bottom up; an opaque token is a stack of one. This is
 * what keeps a translucent token like `--surface-inverse` honest: reading it as opaque
 * flatters whatever sits on top of it.
 */
type Stack = readonly string[];

function loadColors(): (token: string, scheme: Scheme) => Rgba {
    const tokens = readAllTokens();
    const colors = new Map<string, Rgba>();

    return (token: string, scheme: Scheme): Rgba => {
        const key = `${scheme}:${token}`;

        if (!colors.has(key)) {
            colors.set(key, parseColor(resolve(`var(${token})`, scheme, tokens)));
        }

        return colors.get(key)!;
    };
}

function paintStack(colorOf: (token: string, scheme: Scheme) => Rgba, stack: Stack, scheme: Scheme): Rgba {
    const painted = stack.map(token => colorOf(token, scheme)).reduce((ground, layer) => over(layer, ground));

    if (painted[3] !== 1) {
        throw new Error(`${stack.join(' over ')} never lands on anything opaque`);
    }

    return painted;
}

type Apart = {
    readonly label: string;
    readonly from: Stack;
    readonly to: Stack;
    readonly floor: number;
};

type Gate = {
    readonly colorOf: (token: string, scheme: Scheme) => Rgba;
    readonly paint: (stack: Stack, scheme: Scheme) => Rgba;
    readonly once: (key: string) => boolean;
    readonly fail: (scheme: Scheme, message: string) => void;
};

// --- Contrast: what has to be readable --------------------------------------

type Check = {
    readonly label: string;
    readonly foreground: string;
    readonly ground: Stack;
    readonly target: number;
};

function buildChecks(): Check[] {
    const checks: Check[] = [];
    const add = (label: string, foreground: string, ground: Stack, target: number) => checks.push({label, foreground, ground, target});

    for (const intent of INTENTS) {
        for (const fill of ['solid', 'solid-hover', 'solid-active']) {
            add(`${intent}: on-solid over ${fill}`, `--${intent}-on-solid`, [`--${intent}-${fill}`], 4.5);
        }

        add(`${intent}: text on surface`, `--${intent}-text`, ['--surface'], 4.5);
        add(`${intent}: text on soft`, `--${intent}-text`, [`--${intent}-soft`], 4.5);
        add(`${intent}: text on soft-hover`, `--${intent}-text`, [`--${intent}-soft-hover`], 4.5);
        add(`${intent}: foreground on soft`, '--foreground', [`--${intent}-soft`], 4.5);
    }

    for (const elevation of ELEVATIONS) {
        add(`foreground-prominent on ${elevation}`, '--foreground-prominent', [elevation], 4.5);
        add(`foreground on ${elevation}`, '--foreground', [elevation], 4.5);
        add(`foreground-secondary on ${elevation}`, '--foreground-secondary', [elevation], 4.5);
        add(`foreground-subtle on ${elevation}`, '--foreground-subtle', [elevation], 2.8);
        add(`focus-ring on ${elevation}`, '--focus-ring', [elevation], 3);
        add(`surface-stroke on ${elevation}`, '--surface-stroke', [elevation], 1.1);
        add(`surface-stroke-hover on ${elevation}`, '--surface-stroke-hover', [elevation], 1.1);

        // The inverse surface is translucent and floats over anything, so its text is
        // measured over every level rather than over the token alone.
        for (const foreground of ['--foreground-inverse-prominent', '--foreground-inverse', '--foreground-inverse-secondary']) {
            add(`${foreground.slice(2)} on surface-inverse over ${elevation}`, foreground, [elevation, '--surface-inverse'], 4.5);
        }

        // Selected text is still text.
        add(`foreground on selection over ${elevation}`, '--foreground', [elevation, '--selection'], 4.5);
    }

    // The translucent hairline the elevation mixin draws. A border paints over the
    // element's own background, so the ground is the level itself.
    for (const level of ['--surface-sunken', '--surface', '--surface-raised']) {
        add(`surface-stroke-out around ${level}`, '--surface-stroke-out', [level], 1.1);
        add(`surface-stroke-out-hover around ${level}`, '--surface-stroke-out-hover', [level], 1.1);
    }

    return checks;
}

function checkContrast(gate: Gate): void {
    const checks = buildChecks();

    for (const scheme of SCHEMES) {
        for (const check of checks) {
            const foreground = gate.colorOf(check.foreground, scheme);
            const ground = gate.paint(check.ground, scheme);

            if (!gate.once(`contrast|${scheme}|${foreground}|${ground}|${check.target}`)) {
                continue;
            }

            const ratio = contrast(foreground, ground);

            if (ratio + 0.005 < check.target) {
                gate.fail(scheme, `${check.label} — ${ratio.toFixed(2)}, needs ${check.target}`);
            }
        }
    }
}

// --- Separation: what must not read as one surface --------------------------

// The pairs say "these are apart", not "this one is darker": `--surface-sunken` moves
// down from the card in light and up from it in dark, and a ratio has no direction.
//
// It is checked against `--surface-raised` as well because in dark it sits between the
// two: a table head and a menu floating over it must not land on the same color.
const SEPARATION: readonly (readonly [string, string])[] = [
    ['--surface-sunken', '--surface'],
    ['--surface-sunken', '--surface-raised'],
    ['--surface', '--background'],
    ['--surface-canvas', '--background'],
    ['--surface-canvas', '--surface']
];

// Dark carries elevation in the lightness of the layer, so a raised layer has to be apart
// from the one under it. Light keeps them white and lets the shadow work, so both pairs
// only hold in dark.
const DARK_SEPARATION: readonly (readonly [string, string])[] = [
    ['--surface-sunken', '--background'],
    ['--surface-raised', '--surface']
];

const SEPARATION_FLOOR = 1.05;

function checkSeparation(gate: Gate): void {
    const separates = (layer: string, other: string, scheme: Scheme) => {
        const first = gate.colorOf(layer, scheme);
        const second = gate.colorOf(other, scheme);

        if (!gate.once(`separation|${scheme}|${first}|${second}`)) {
            return;
        }

        const ratio = contrast(first, second);

        if (ratio + 0.005 < SEPARATION_FLOOR) {
            gate.fail(scheme, `${layer} does not separate from ${other} — ${ratio.toFixed(3)}, needs ${SEPARATION_FLOOR}`);
        }
    };

    for (const scheme of SCHEMES) {
        for (const [layer, other] of SEPARATION) {
            separates(layer, other, scheme);
        }
    }

    for (const [layer, other] of DARK_SEPARATION) {
        separates(layer, other, 'dark');
    }
}

// --- Steps: what has to be noticed ------------------------------------------

/**
 * A step in OKLab lightness. `direction` is for the tokens whose contract is which way
 * they move, not how far: a shimmer is lighter than what it sweeps across, a scrim is
 * darker.
 */
type Step = Apart & {
    readonly direction?: 'lighter' | 'darker';
};

// The step at which a change of state reads at all, set just under the tightest pair the
// library ships: `--surface-stroke-muted` against `--surface-hover` in dark.
const STATE_FLOOR = 0.018;

function buildSteps(): Step[] {
    const steps: Step[] = [];
    const add = (label: string, from: Stack, to: Stack, floor: number, direction?: 'lighter' | 'darker') => steps.push({label, from, to, floor, direction});

    // The opaque pair only claims to work against `--surface`, which is why the ink pair
    // exists. That one has to hold everywhere, so it is measured on all three.
    for (const state of ['--surface-hover', '--surface-active', '--surface-disabled']) {
        add(`${state} on --surface`, ['--surface'], ['--surface', state], STATE_FLOOR);
    }

    for (const state of ['--ink-hover', '--ink-active']) {
        for (const ground of ['--surface', '--surface-raised', '--surface-sunken']) {
            add(`${state} on ${ground}`, [ground], [ground, state], STATE_FLOOR);
        }
    }

    // The muted stroke has to survive the row under it changing state. `--surface-active`
    // is left out on purpose: no component draws a muted stroke on a pressed fill.
    for (const ground of ['--surface', '--surface-raised', '--surface-sunken', '--surface-hover']) {
        add(`surface-stroke-muted against ${ground}`, [ground], ['--surface-stroke-muted'], STATE_FLOOR);
    }

    add('surface-stroke to its hover', ['--surface-stroke'], ['--surface-stroke-hover'], STATE_FLOOR);
    add('surface-stroke-out to its hover', ['--surface-raised', '--surface-stroke-out'], ['--surface-raised', '--surface-stroke-out-hover'], STATE_FLOOR);

    for (const intent of INTENTS) {
        add(`${intent}: soft to soft-hover`, [`--${intent}-soft`], [`--${intent}-soft-hover`], STATE_FLOOR);

        // Pressing happens while hovering, so the step that has to read is hover to active.
        add(`${intent}: solid to solid-hover`, [`--${intent}-solid`], [`--${intent}-solid-hover`], STATE_FLOOR);
        add(`${intent}: solid-hover to solid-active`, [`--${intent}-solid-hover`], [`--${intent}-solid-active`], STATE_FLOOR);
    }

    add('selection against surface', ['--surface'], ['--surface', '--selection'], STATE_FLOOR);

    // A scrim darkens what is behind it, and the two of them are a ladder.
    for (const ground of ['--surface', '--surface-canvas']) {
        for (const overlay of ['--overlay-secondary', '--overlay']) {
            add(`${overlay} over ${ground}`, [ground], [ground, overlay], STATE_FLOOR, 'darker');
        }
    }

    add('overlay is deeper than overlay-secondary', ['--surface', '--overlay-secondary'], ['--surface', '--overlay'], 0, 'darker');

    // The skeleton sweep, over the one ground it has: `FluxSkeleton` fills itself with
    // `--surface-sunken` and moves the shimmer across that. Its contract is a direction
    // rather than a distance, and it is animated, so a small step still reads.
    add('shimmer over --surface-sunken', ['--surface-sunken'], ['--surface-sunken', '--shimmer'], 0, 'lighter');

    return steps;
}

function checkSteps(gate: Gate): void {
    const steps = buildSteps();

    for (const scheme of SCHEMES) {
        for (const measure of steps) {
            const from = gate.paint(measure.from, scheme);
            const to = gate.paint(measure.to, scheme);

            if (!gate.once(`step|${scheme}|${from}|${to}|${measure.floor}|${measure.direction ?? ''}`)) {
                continue;
            }

            const moved = lightness(to) - lightness(from);

            if (measure.direction !== undefined && (measure.direction === 'lighter') !== (moved > 0)) {
                gate.fail(scheme, `${measure.label} — moves ${moved.toFixed(3)} L, has to be ${measure.direction}`);
            } else if (Math.abs(moved) + 0.0005 < measure.floor) {
                gate.fail(scheme, `${measure.label} — moves ${Math.abs(moved).toFixed(3)} L, needs ${measure.floor}`);
            }
        }
    }
}

// --- Distances: what has to separate, whichever axis carries it -------------

// What "apart" means for a fill against the surface it lies on. Deliberately the same
// number as the step above: both answer whether the eye registers a difference at all,
// only along a different axis, so there is no reason for them to disagree.
const TINT_FLOOR = STATE_FLOOR;

function buildDistances(): Apart[] {
    const distances: Apart[] = [];

    for (const intent of INTENTS) {
        // A badge or chip turns up inside a menu or modal as readily as on a card, so
        // `--surface-raised` is a ground its fill has to separate from too.
        for (const ground of ['--surface', '--surface-raised']) {
            distances.push({label: `${intent}: soft against ${ground}`, from: [ground], to: [`--${intent}-soft`], floor: TINT_FLOOR});
        }

        // Measured as a distance like the tint itself: a colored border mostly separates
        // from its fill on hue.
        distances.push({label: `${intent}: border against soft`, from: [`--${intent}-soft`], to: [`--${intent}-border`], floor: TINT_FLOOR});
    }

    return distances;
}

function checkDistances(gate: Gate): void {
    const distances = buildDistances();

    for (const scheme of SCHEMES) {
        for (const measure of distances) {
            const from = gate.paint(measure.from, scheme);
            const to = gate.paint(measure.to, scheme);

            if (!gate.once(`distance|${scheme}|${from}|${to}|${measure.floor}`)) {
                continue;
            }

            const apart = distance(from, to);

            if (apart + 0.0005 < measure.floor) {
                gate.fail(scheme, `${measure.label} — ${apart.toFixed(4)} apart, needs ${measure.floor}`);
            }
        }
    }
}

// --- Muted: one weight shared by six intents --------------------------------

// The weight is read off the colored solids at run time rather than written down here,
// so reshading the palette moves the target with it.
//
// Half a step of the lightness ramp: inside it a neighboring stop is a matter of taste,
// outside it the role has been pointed at the wrong idea.
const MUTED_BAND = 0.06;

/**
 * The weight the muted role has to carry: how far the colored solids sit from `--surface`.
 * The median, because warning's ramp runs above the rest and drags a mean along with it.
 * Averaged over the middle pair on an even count, or a half index would read back
 * `undefined` and take every muted check with it, since `NaN > MUTED_BAND` is false.
 */
function mutedWeight(gate: Gate, scheme: Scheme): number {
    const surface = lightness(gate.paint(['--surface'], scheme));
    const weights = COLORED.map(intent => Math.abs(lightness(gate.colorOf(`--${intent}-solid`, scheme)) - surface)).sort((first, second) => first - second);
    const middle = weights.length / 2;

    return weights.length % 2 === 1 ? weights[Math.floor(middle)] : (weights[middle - 1] + weights[middle]) / 2;
}

function checkMuted(gate: Gate): void {
    for (const scheme of SCHEMES) {
        const target = mutedWeight(gate, scheme);
        const surface = lightness(gate.paint(['--surface'], scheme));

        for (const intent of INTENTS) {
            if (!gate.once(`muted|${scheme}|${intent}`)) {
                continue;
            }

            const weight = Math.abs(lightness(gate.colorOf(`--${intent}-muted`, scheme)) - surface);

            if (Math.abs(weight - target) - 0.0005 > MUTED_BAND) {
                gate.fail(scheme, `${intent}: muted does not carry the weight of the contract — ${weight.toFixed(3)} L from --surface, the colored solids carry ${target.toFixed(3)}`);
            }
        }
    }
}

// --- Ramps: what has to keep its order --------------------------------------

/** Tokens that have to keep their order on one ground, strongest first. */
type Ramp = {
    readonly label: string;
    readonly ground: Stack;
    readonly tokens: readonly string[];
};

// Three ladders that carry meaning through their order. No threshold: the failure they
// catch is two values swapped, or one edited until it overtakes its neighbor.
const RAMPS: readonly Ramp[] = [
    {
        label: 'text ramp',
        ground: ['--surface'],
        tokens: ['--foreground-prominent', '--foreground', '--foreground-secondary', '--foreground-subtle', '--foreground-disabled']
    },
    {
        label: 'inverse text ramp',
        ground: ['--surface', '--surface-inverse'],
        tokens: ['--foreground-inverse-prominent', '--foreground-inverse', '--foreground-inverse-secondary']
    },
    {
        label: 'stroke ramp',
        ground: ['--surface'],
        tokens: ['--surface-stroke-hover', '--surface-stroke', '--surface-stroke-muted']
    }
];

function checkRamps(gate: Gate): void {
    for (const scheme of SCHEMES) {
        for (const ramp of RAMPS) {
            const ground = gate.paint(ramp.ground, scheme);

            for (let index = 1; index < ramp.tokens.length; index++) {
                const stronger = gate.colorOf(ramp.tokens[index - 1], scheme);
                const weaker = gate.colorOf(ramp.tokens[index], scheme);

                if (!gate.once(`ramp|${scheme}|${ground}|${stronger}|${weaker}`)) {
                    continue;
                }

                const above = contrast(stronger, ground);
                const below = contrast(weaker, ground);

                if (below >= above) {
                    gate.fail(scheme, `${ramp.label}: ${ramp.tokens[index]} is not below ${ramp.tokens[index - 1]} — ${below.toFixed(2)} against ${above.toFixed(2)}`);
                }
            }
        }
    }
}

// --- Transparent pairs: what has to fade out on its own hue -----------------

// A ring that fades in has to start on its own hue: `transparent` is black at zero alpha
// and fades through gray, and deriving the pair with relative color syntax freezes the
// theme.
const TRANSPARENT_PAIRS: readonly (readonly [string, string])[] = [
    ['--focus-ring-transparent', '--focus-ring']
];

function checkTransparent(gate: Gate): void {
    for (const scheme of SCHEMES) {
        for (const [transparent, source] of TRANSPARENT_PAIRS) {
            const faded = gate.colorOf(transparent, scheme);
            const solid = gate.colorOf(source, scheme);

            if (!gate.once(`transparent|${scheme}|${faded}|${solid}`)) {
                continue;
            }

            const drifted = faded.slice(0, 3).some((channel, index) => Math.abs(channel - solid[index]) > 1e-6);

            if (faded[3] !== 0 || drifted) {
                gate.fail(scheme, `${transparent} is not ${source} at zero alpha`);
            }
        }
    }
}

// --- Charts: the one set that hands its colors to a canvas ------------------

// A chart draws inside a `FluxPane`, so the ground is `--surface` in both themes.
const CHART_CATEGORICAL = Array.from({length: 8}, (_, index) => `--chart-${index + 1}`);
const CHART_RAMP = Array.from({length: 4}, (_, index) => `--chart-ramp-${index + 1}`);
const CHART_WIDE = Array.from({length: 17}, (_, index) => `--chart-colorful-${index + 1}`);

// The graphical-object floor rather than the text one, because that is what these are.
const CHART_FLOOR = 3;

// What an area series paints under its line. The floor sits above the tint one so the
// check can fail on its own.
const CHART_AREA_ALPHA = 0.25;
const CHART_AREA_FLOOR = 0.08;

// A distance rather than a ratio, because the wide set separates on hue alone. Per set,
// because that set trades distance for count by design.
const CHART_APART = {categorical: 0.08, wide: 0.04} as const;

function checkCharts(gate: Gate): void {
    for (const scheme of SCHEMES) {
        const surface = gate.paint(['--surface'], scheme);

        // Painted rather than read raw: a token carrying its own alpha measures further
        // from the ground the fainter it gets.
        const onSurface = (token: string) => gate.paint(['--surface', token], scheme);

        // Keyed by name, not by color. Two chart tokens resolving to one color is the
        // regression this set exists to catch, and a color keyed dedup would drop it.
        const against = (label: string, token: string, target: number) => {
            if (!gate.once(`chart|${scheme}|${token}|${target}`)) {
                return;
            }

            const ratio = contrast(gate.colorOf(token, scheme), surface);

            if (ratio + 0.005 < target) {
                gate.fail(scheme, `${label} — ${ratio.toFixed(2)}, needs ${target}`);
            }
        };

        const apart = (label: string, first: string, second: string, floor: number) => {
            const measured = distance(onSurface(first), onSurface(second));

            if (measured + 0.0005 < floor) {
                gate.fail(scheme, `${label} — ${measured.toFixed(4)} apart, needs ${floor}`);
            }
        };

        for (const token of [...CHART_CATEGORICAL, ...CHART_WIDE, '--chart-positive', '--chart-negative']) {
            against(`${token.slice(2)} on surface`, token, CHART_FLOOR);
        }

        against('chart-label on surface', '--chart-label', 4.5);

        if (gate.once(`chart-grid|${scheme}`)) {
            apart('chart-grid on surface', '--chart-grid', '--surface', TINT_FLOOR);
        }

        // Nothing else measures these two against each other, and a candlestick that
        // paints both the same reads as neither.
        if (gate.once(`chart-direction|${scheme}`)) {
            apart('chart-positive against chart-negative', '--chart-positive', '--chart-negative', CHART_APART.categorical);
        }

        // A scale rather than a set: only the top has to carry, but every step has to
        // move the same direction or a heatmap stops reading as an order.
        if (gate.once(`chart-ramp|${scheme}`)) {
            const ratios = CHART_RAMP.map(token => contrast(gate.colorOf(token, scheme), surface));

            for (let index = 1; index < ratios.length; index++) {
                if (ratios[index] <= ratios[index - 1]) {
                    gate.fail(scheme, `chart-ramp-${index + 1} — ${ratios[index].toFixed(2)}, not above chart-ramp-${index} at ${ratios[index - 1].toFixed(2)}`);
                }
            }

            const top = ratios[ratios.length - 1];

            if (top + 0.005 < CHART_FLOOR) {
                gate.fail(scheme, `chart-ramp top — ${top.toFixed(2)}, needs ${CHART_FLOOR}`);
            }

            // Deliberately faint, but a cell holding a value still has to differ from
            // one holding none.
            apart('chart-ramp-1 on surface', CHART_RAMP[0], '--surface', TINT_FLOOR);
        }

        // The largest thing a line chart paints, and the only part a ratio never sees.
        // A translucent series fades twice, so its own alpha carries through.
        for (const token of CHART_CATEGORICAL) {
            if (!gate.once(`chart-area|${scheme}|${token}`)) {
                continue;
            }

            const [red, green, blue, alpha] = gate.colorOf(token, scheme);
            const filled = over([red, green, blue, alpha * CHART_AREA_ALPHA], surface);
            const measured = distance(filled, surface);

            if (measured + 0.0005 < CHART_AREA_FLOOR) {
                gate.fail(scheme, `${token.slice(2)} area fill — ${measured.toFixed(4)} apart, needs ${CHART_AREA_FLOOR}`);
            }
        }

        // Only the closest pair: every other one is further apart by definition.
        for (const [set, tokens, floor] of [['categorical', CHART_CATEGORICAL, CHART_APART.categorical], ['wide', CHART_WIDE, CHART_APART.wide]] as const) {
            if (!gate.once(`chart-apart|${scheme}|${set}`)) {
                continue;
            }

            let closest = {first: tokens[0], second: tokens[1], measured: Infinity};

            for (let first = 0; first < tokens.length; first++) {
                for (let second = first + 1; second < tokens.length; second++) {
                    const measured = distance(onSurface(tokens[first]), onSurface(tokens[second]));

                    if (measured < closest.measured) {
                        closest = {first: tokens[first], second: tokens[second], measured};
                    }
                }
            }

            apart(`${set} ${closest.first.slice(2)} against ${closest.second.slice(2)}`, closest.first, closest.second, floor);
        }
    }
}

// --- Anchors: what says the script itself is right --------------------------

// The three numbers the proof of concept published. If the script cannot reproduce
// these, the script is wrong, not the tokens.
const ANCHORS: readonly (readonly [string, Scheme, string, string, number])[] = [
    ['primary button label, dark', 'dark', '--primary-on-solid', '--primary-solid', 5.61],
    ['focus ring, dark', 'dark', '--focus-ring', '--surface', 6.75],
    ['surface against page, dark', 'dark', '--surface', '--background', 1.08]
];

function checkAnchors(colorOf: (token: string, scheme: Scheme) => Rgba): string[] {
    const drift: string[] = [];

    for (const [label, scheme, foreground, background, expected] of ANCHORS) {
        const ratio = contrast(colorOf(foreground, scheme), colorOf(background, scheme));

        if (Math.abs(ratio - expected) > 0.02) {
            drift.push(`${label} — ${ratio.toFixed(2)}, published ${expected.toFixed(2)}`);
        }
    }

    return drift;
}

// `--surface-loader` is absent from everything above: it is `--surface` at .75 alpha over
// `--surface`, so every measurement of it is zero by construction. What hides the content
// under it is the `backdrop-filter` blur, which no color check can see.

// ---------------------------------------------------------------------------

function main(): number {
    const colorOf = loadColors();
    const failures: string[] = [];
    const seen = new Set<string>();
    let total = 0;

    const gate: Gate = {
        colorOf,
        paint: (stack, scheme) => paintStack(colorOf, stack, scheme),

        // In light several elevation tokens hold the same value, so a good part of the
        // grid collapses onto identical pairs. Counted once per distinct pair and target,
        // or the total would claim more than it measures.
        once: key => {
            if (seen.has(key)) {
                return false;
            }

            seen.add(key);
            total++;

            return true;
        },
        fail: (scheme, message) => failures.push(`${scheme.padEnd(5)} ${message}`)
    };

    checkContrast(gate);
    checkSeparation(gate);
    checkSteps(gate);
    checkDistances(gate);
    checkMuted(gate);
    checkRamps(gate);
    checkTransparent(gate);
    checkCharts(gate);

    const drift = checkAnchors(colorOf);

    if (drift.length > 0) {
        console.error('Published anchors do not match:');
        drift.forEach(line => console.error(`  ${line}`));
        console.error('');
    }

    if (failures.length > 0) {
        console.error(`${total} checks, ${failures.length} failures:`);
        failures.forEach(line => console.error(`  ${line}`));

        return 1;
    }

    console.log(`${total} checks, 0 failures`);

    return drift.length > 0 ? 1 : 0;
}

if (import.meta.main) {
    process.exit(main());
}
