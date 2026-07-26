/**
 * Asserts the colour contract against what actually shipped.
 *
 * The tokens are read back from the built `dist/index.css` rather than from the
 * Sass source, because the thing that can regress is the emitted value, not the
 * expression that produced it. Every token is resolved twice, once per scheme,
 * by taking the matching branch of every `light-dark()` it passes through.
 *
 * Run after building @flux-ui/components:
 *   bun run --cwd packages/components build && bun scripts/check-contrast.ts
 */

import { readFileSync } from 'node:fs';

const CSS_PATH = 'packages/components/dist/index.css';

const INTENTS = ['primary', 'danger', 'info', 'success', 'warning', 'gray'] as const;
const ELEVATIONS = ['--surface-canvas', '--background', '--surface-sunken', '--surface', '--surface-raised'] as const;
const SCHEMES = ['light', 'dark'] as const;

type Scheme = (typeof SCHEMES)[number];
type Rgba = readonly [number, number, number, number];

// ---------------------------------------------------------------------------
// Parsing
// ---------------------------------------------------------------------------

/**
 * Reads the custom properties out of the first `:root` block. Declarations are
 * one per line in the unminified build, but the value itself can carry nested
 * parentheses and commas, so the split is on the first colon only.
 *
 * The end of the block is found by matching braces, not by looking for the next
 * `\n}`. Everything is nested inside `@layer flux-base`, so the first `}` in the
 * first column closes the layer, not the block: scanning for it swallowed every
 * later rule in the layer, including the deprecated `--gray-*` hexes that
 * `[light]` and `[dark]` redeclare. That is silent: the map just grows a token
 * nothing declared on `:root`, holding whichever value came last.
 */
function readTokens(css: string): Map<string, string> {
    const start = css.indexOf(':root {');

    if (start === -1) {
        throw new Error(`no :root block in ${CSS_PATH}`);
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
        throw new Error(`unterminated :root block in ${CSS_PATH}`);
    }

    for (const line of css.slice(open + 1, end).split('\n')) {
        const trimmed = line.trim().replace(/;$/, '');

        if (!trimmed.startsWith('--')) {
            continue;
        }

        const colon = trimmed.indexOf(':');
        const name = trimmed.slice(0, colon).trim();

        // A token declared twice in one block resolves to the last one, which is
        // the kind of thing a merge produces and nobody reads back.
        if (tokens.has(name)) {
            throw new Error(`${name} is declared twice in the :root block`);
        }

        tokens.set(name, trimmed.slice(colon + 1).trim());
    }

    return tokens;
}

/**
 * Splits a comma separated argument list, ignoring commas nested in parentheses.
 */
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

/**
 * Finds the outermost call to `name(` and returns its argument list plus the
 * slice boundaries, so the caller can rebuild the string around it.
 */
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

/**
 * Resolves a token to a literal colour for one scheme: every `light-dark()`
 * collapses to its own branch and every `var()` is followed, depth first.
 */
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
// Colour
// ---------------------------------------------------------------------------

function parseColor(input: string): Rgba {
    const value = input.trim();

    if (value === 'transparent') {
        return [0, 0, 0, 0];
    }

    // Every channel in this file is linear sRGB: `luminance`, `lightness` and
    // `oklchOf` all assume it. A hex is gamma encoded, so it has to be decoded on
    // the way in. Skipping that reads `#808080` as luminance .502 instead of .216,
    // which is not a rounding difference, it is a different colour.
    if (value.startsWith('#')) {
        const hex = value.slice(1);
        const size = hex.length <= 4 ? 1 : 2;
        const channel = (index: number) => {
            const part = hex.slice(index * size, index * size + size);

            return parseInt(size === 1 ? part + part : part, 16) / 255;
        };

        return [decode(channel(0)), decode(channel(1)), decode(channel(2)), hex.length === 4 || hex.length === 8 ? channel(3) : 1];
    }

    const oklch = findCall(value, 'oklch');

    if (oklch === null) {
        throw new Error(`unsupported colour "${input}"`);
    }

    return oklch.args.trimStart().startsWith('from ') ? parseRelative(oklch.args) : parseAbsolute(oklch.args);
}

function parseAbsolute(args: string): Rgba {
    const [components, alphaPart] = splitAlpha(args);
    const [lightness, chroma, hue] = components.split(/\s+/).map(Number);

    return [...oklchToLinearSrgb(lightness, chroma, hue), alphaPart === null ? 1 : parseAlpha(alphaPart)] as unknown as Rgba;
}

/**
 * `oklch(from <colour> <l> <c> <h> [/ <a>])`. The token layer emits this so that
 * a dark neutral keeps its solved lightness while taking hue and chroma off the
 * palette stop it is anchored to, which is what lets a palette override reshade
 * a theme that has no stops to land on.
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

    return [...oklchToLinearSrgb(lightness, chroma, hue), alphaPart === null ? 1 : parseAlpha(alphaPart)] as unknown as Rgba;
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

        return origin[index] * Number(right);
    }

    if (Number.isNaN(Number(trimmed))) {
        throw new Error(`unsupported channel "${trimmed}"`);
    }

    return Number(trimmed);
}

/** Splits off a trailing `/ <alpha>`, ignoring slashes nested in parentheses. */
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

/** Where the origin colour ends: after its closing parenthesis, or at whitespace. */
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

    throw new Error(`unbalanced origin colour in "${input}"`);
}

function parseAlpha(input: string): number {
    return input.endsWith('%') ? Number(input.slice(0, -1)) / 100 : Number(input);
}

/**
 * OKLCH -> OKLab -> LMS -> linear sRGB, then clipped into gamut. Browsers gamut
 * map by reducing chroma rather than clipping, but every value here originates
 * from an in-gamut hex or sits well inside it, so the two agree.
 */
function oklchToLinearSrgb(lightness: number, chroma: number, hue: number): [number, number, number] {
    const radians = (hue * Math.PI) / 180;
    const labA = chroma * Math.cos(radians);
    const labB = chroma * Math.sin(radians);

    const long = (lightness + 0.3963377774 * labA + 0.2158037573 * labB) ** 3;
    const medium = (lightness - 0.1055613458 * labA - 0.0638541728 * labB) ** 3;
    const short = (lightness - 0.0894841775 * labA - 1.291485548 * labB) ** 3;

    return [
        clip(4.0767416621 * long - 3.3077115913 * medium + 0.2309699292 * short),
        clip(-1.2684380046 * long + 2.6097574011 * medium - 0.3413193965 * short),
        clip(-0.0041960863 * long - 0.7034186147 * medium + 1.707614701 * short)
    ];
}

function clip(value: number): number {
    return Math.min(1, Math.max(0, value));
}

/** The inverse, so a relative colour can read the channels of its origin. */
function oklchOf([red, green, blue]: Rgba): readonly [number, number, number] {
    const long = Math.cbrt(0.4122214708 * red + 0.5363325363 * green + 0.0514459929 * blue);
    const medium = Math.cbrt(0.2119034982 * red + 0.6806995451 * green + 0.1073969566 * blue);
    const short = Math.cbrt(0.0883024619 * red + 0.2817188376 * green + 0.6299787005 * blue);

    const lightness = 0.2104542553 * long + 0.793617785 * medium - 0.0040720468 * short;
    const labA = 1.9779984951 * long - 2.428592205 * medium + 0.4505937099 * short;
    const labB = 0.0259040371 * long + 0.7827717662 * medium - 0.808675766 * short;

    return [lightness, Math.hypot(labA, labB), ((Math.atan2(labB, labA) * 180) / Math.PI + 360) % 360];
}

function encode(value: number): number {
    return value <= 0.0031308 ? 12.92 * value : 1.055 * Math.pow(value, 1 / 2.4) - 0.055;
}

function decode(value: number): number {
    return value <= 0.04045 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
}

/**
 * Composites a possibly translucent colour over an opaque backdrop. A token like
 * `--ink-hover` or `--foreground-disabled` only has a contrast at all once it
 * sits on something.
 *
 * The blend happens on the gamma encoded values, because that is where a browser
 * does it: `rgba(0 0 0 / .5)` over white renders `#808080`, not the `#bcbcbc`
 * that blending in linear light would give. Getting this wrong does not shift a
 * number slightly, it shifts it by a factor of five on a dark ground, which is
 * exactly where the translucent tokens live.
 */
export function over(foreground: Rgba, background: Rgba): Rgba {
    // A backdrop that is itself translucent has no colour yet, and compositing
    // onto it silently answers for the wrong one: `--surface-inverse` carries
    // alpha .92 / .95, and reading it as opaque overstated the contrast of the
    // text on it by up to 1.4. Every translucent ground has to be composited onto
    // something opaque first, so refuse rather than guess.
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

export function luminance([red, green, blue]: Rgba): number {
    return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

/**
 * OKLab lightness. A contrast ratio answers "can this be read"; an interaction
 * state is not read, it is noticed, and at the dark end a ratio exaggerates what
 * the eye barely registers. Perceptual lightness is the honest measure there.
 */
export function lightness([red, green, blue]: Rgba): number {
    const long = Math.cbrt(0.4122214708 * red + 0.5363325363 * green + 0.0514459929 * blue);
    const medium = Math.cbrt(0.2119034982 * red + 0.6806995451 * green + 0.1073969566 * blue);
    const short = Math.cbrt(0.0883024619 * red + 0.2817188376 * green + 0.6299787005 * blue);

    return 0.2104542553 * long + 0.793617785 * medium - 0.0040720468 * short;
}

export function contrast(foreground: Rgba, background: Rgba): number {
    const composited = luminance(over(foreground, background));
    const base = luminance(background);

    return (Math.max(composited, base) + 0.05) / (Math.min(composited, base) + 0.05);
}

// ---------------------------------------------------------------------------
// The contract
// ---------------------------------------------------------------------------

/**
 * The layers under a colour, painted bottom up: the first is opaque and each next
 * one is composited onto what is below it. An opaque token is a stack of one.
 *
 * Writing the ground as a stack is what keeps a translucent token honest.
 * `--surface-inverse` carries alpha .92 in light and .95 in dark, so it has no
 * colour at all until it lands on something, and measuring against it as if it
 * were opaque flattered the text on it by up to 1.4.
 */
type Stack = readonly string[];

type Check = {
    readonly label: string;
    readonly foreground: string;
    readonly ground: Stack;
    readonly target: number;
    readonly scheme?: Scheme;
};

/**
 * Two stacks that have to be visibly apart, measured in OKLab lightness rather
 * than as a ratio: these are things the eye notices, not things it reads.
 * `direction` is for the tokens whose contract is which way they move, not how
 * far: a shimmer is lighter than what it sweeps across, a scrim is darker.
 */
type Step = {
    readonly label: string;
    readonly from: Stack;
    readonly to: Stack;
    readonly floor: number;
    readonly direction?: 'lighter' | 'darker';
    readonly scheme?: Scheme;
};

/** Tokens that have to keep their order on one ground, strongest first. */
type Ramp = {
    readonly label: string;
    readonly ground: Stack;
    readonly tokens: readonly string[];
};

function buildChecks(): Check[] {
    const checks: Check[] = [];
    const add = (label: string, foreground: string, ground: Stack, target: number, scheme?: Scheme) => checks.push({label, foreground, ground, target, scheme});

    for (const intent of INTENTS) {
        for (const fill of ['solid', 'solid-hover', 'solid-active']) {
            add(`${intent}: on-solid over ${fill}`, `--${intent}-on-solid`, [`--${intent}-${fill}`], 4.5);
        }

        add(`${intent}: text on surface`, `--${intent}-text`, ['--surface'], 4.5);
        add(`${intent}: text on soft`, `--${intent}-text`, [`--${intent}-soft`], 4.5);
        add(`${intent}: text on soft-hover`, `--${intent}-text`, [`--${intent}-soft-hover`], 4.5);
        add(`${intent}: foreground on soft`, '--foreground', [`--${intent}-soft`], 4.5);
        add(`${intent}: border against soft`, `--${intent}-border`, [`--${intent}-soft`], 1.05);

        // A soft fill is a badge, a chip, a notice or a tinted table row, and every
        // one of those turns up inside a menu, a modal or a snackbar as readily as
        // on a card. `--surface-raised` is a ground it lands on, so it is one it has
        // to separate from.
        for (const ground of ['--surface', '--surface-raised']) {
            add(`${intent}: soft against ${ground}`, `--${intent}-soft`, [ground], 1.02);
        }
    }

    for (const elevation of ELEVATIONS) {
        add(`foreground-prominent on ${elevation}`, '--foreground-prominent', [elevation], 4.5);
        add(`foreground on ${elevation}`, '--foreground', [elevation], 4.5);
        add(`foreground-secondary on ${elevation}`, '--foreground-secondary', [elevation], 4.5);
        add(`foreground-subtle on ${elevation}`, '--foreground-subtle', [elevation], 2.8);
        add(`focus-ring on ${elevation}`, '--focus-ring', [elevation], 3);
        add(`surface-stroke on ${elevation}`, '--surface-stroke', [elevation], 1.1);
        add(`surface-stroke-hover on ${elevation}`, '--surface-stroke-hover', [elevation], 1.1);

        // A tooltip, a toast or a popover lands on whatever happens to be under it,
        // and the inverse surface is translucent, so the text on it is measured over
        // every level it can float above rather than over the token alone.
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

// Two neighbouring levels must not read as one surface. The pairs say "these are
// apart", not "this one is darker": `--surface-sunken` moves down from the card in
// light and up from it in dark, and a ratio has no direction, so the same check
// holds either way.
//
// `--surface-sunken` is checked against `--surface` because that is the ground it
// actually lies on, and against `--surface-raised` because in dark it sits between
// the two: a table head and a menu floating over it must not land on the same
// colour.
const SEPARATION: readonly (readonly [string, string])[] = [
    ['--surface-sunken', '--surface'],
    ['--surface-sunken', '--surface-raised'],
    ['--surface', '--background'],
    ['--surface-canvas', '--background'],
    ['--surface-canvas', '--surface']
];

// Dark additionally carries elevation in the lightness of the layer, so a raised
// layer has to be measurably apart from the one under it. Light keeps every raised
// layer white and lets the shadow do the work, and deliberately gives
// `--surface-sunken` the value `--background` has, so both pairs only hold in dark.
const DARK_SEPARATION: readonly (readonly [string, string])[] = [
    ['--surface-sunken', '--background'],
    ['--surface-raised', '--surface']
];

const SEPARATION_FLOOR = 1.05;

// The step at which a change of state reads at all. `--surface-stroke-muted` sits
// .020 L from both `--surface-hover` and `--surface-active` in dark, which is the
// tightest thing in the contract and what this number is set against.
const STATE_FLOOR = 0.018;

function buildSteps(): Step[] {
    const steps: Step[] = [];
    const add = (label: string, from: Stack, to: Stack, floor: number, direction?: 'lighter' | 'darker', scheme?: Scheme) => steps.push({label, from, to, floor, direction, scheme});

    // The opaque pair is calibrated against `--surface` and only claims to work
    // there: semantic.scss says so, and `--ink-hover` / `--ink-active` exist
    // precisely because on any other ground the opaque pair lands somewhere between
    // too weak and invisible. Checking it on `--surface-raised` would therefore be
    // checking a promise nothing made. The translucent pair is the one that has to
    // hold on every ground, and it is measured on all three.
    for (const state of ['--surface-hover', '--surface-active', '--surface-disabled']) {
        add(`${state} on --surface`, ['--surface'], ['--surface', state], STATE_FLOOR);
    }

    for (const state of ['--ink-hover', '--ink-active']) {
        for (const ground of ['--surface', '--surface-raised', '--surface-sunken']) {
            add(`${state} on ${ground}`, [ground], [ground, state], STATE_FLOOR);
        }
    }

    // The muted stroke is the inner edge of a table, a pane footer and an action
    // bar, and it has to survive the row under it changing state. Dark packs
    // `--surface-raised`, `--surface-hover` and this token into .022 L, which is
    // what makes it the tightest thing here.
    //
    // `--surface-active` is deliberately not in this list: no component draws a
    // muted stroke on a pressed fill, and in light the two tokens are the same stop,
    // so the check would be red for a case that does not exist.
    for (const ground of ['--surface', '--surface-raised', '--surface-sunken', '--surface-hover']) {
        add(`surface-stroke-muted against ${ground}`, [ground], ['--surface-stroke-muted'], STATE_FLOOR);
    }

    add('surface-stroke to its hover', ['--surface-stroke'], ['--surface-stroke-hover'], STATE_FLOOR);
    add('surface-stroke-out to its hover', ['--surface-raised', '--surface-stroke-out'], ['--surface-raised', '--surface-stroke-out-hover'], STATE_FLOOR);

    // The inset sheen that makes a dark raised layer read as raised. Light sets it
    // to `transparent` on purpose and lets the shadow carry the height there, so
    // there is nothing to measure.
    add('surface-highlight on a raised layer', ['--surface-raised'], ['--surface-raised', '--surface-highlight'], STATE_FLOOR, undefined, 'dark');

    for (const intent of INTENTS) {
        add(`${intent}: soft to soft-hover`, [`--${intent}-soft`], [`--${intent}-soft-hover`], STATE_FLOOR);

        // Pressing happens while hovering, so the step that has to read is the one
        // from hover to active, not the one from rest.
        add(`${intent}: solid to solid-hover`, [`--${intent}-solid`], [`--${intent}-solid-hover`], STATE_FLOOR);
        add(`${intent}: solid-hover to solid-active`, [`--${intent}-solid-hover`], [`--${intent}-solid-active`], STATE_FLOOR);
    }

    add('selection against surface', ['--surface'], ['--surface', '--selection'], STATE_FLOOR);

    // A scrim darkens what is behind it, and the three of them are a ladder.
    for (const ground of ['--surface', '--surface-canvas']) {
        for (const overlay of ['--overlay-secondary', '--overlay', '--overlay-strong']) {
            add(`${overlay} over ${ground}`, [ground], [ground, overlay], STATE_FLOOR, 'darker');
        }
    }

    add('overlay is deeper than overlay-secondary', ['--surface', '--overlay-secondary'], ['--surface', '--overlay'], 0, 'darker');
    add('overlay-strong is deeper than overlay', ['--surface', '--overlay'], ['--surface', '--overlay-strong'], 0, 'darker');

    // The skeleton sweep, over the one ground it has: `FluxSkeleton` fills itself
    // with `--surface-sunken` and moves the shimmer across that. Its contract is a
    // direction, not a distance: the old mirrored palette turned it into a dark
    // smear on an already dark block, and that is the regression worth catching.
    // It is animated, so a small step still reads.
    add('shimmer over --surface-sunken', ['--surface-sunken'], ['--surface-sunken', '--shimmer'], 0, 'lighter');

    return steps;
}

// Three ladders that carry meaning through their order. Nothing here needs a
// threshold: the failure they catch is two values swapped, or one edited until it
// passes its own target and overtakes its neighbour.
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

// A ring that fades in has to start on its own hue. `transparent` is black at zero
// alpha and fades through grey, and deriving the pair with relative colour syntax
// over a token holding a `light-dark()` resolves eagerly and freezes the theme.
const TRANSPARENT_PAIRS: readonly (readonly [string, string])[] = [
    ['--focus-ring-transparent', '--focus-ring']
];

// The three numbers the proof of concept published. If the script cannot
// reproduce these, the script is wrong, not the tokens.
const ANCHORS: readonly (readonly [string, Scheme, string, string, number])[] = [
    ['primary button label, dark', 'dark', '--primary-on-solid', '--primary-solid', 5.61],
    ['focus ring, dark', 'dark', '--focus-ring', '--surface', 6.75],
    ['surface against page, dark', 'dark', '--surface', '--background', 1.08]
];

// `--surface-loader` is deliberately absent from all of the above. It is
// `--surface` at .75 alpha painted over `--surface`, so every colour measurement
// of it is zero by construction: what hides the content under it is the
// `backdrop-filter` blur next to it, which no colour check can see.

// ---------------------------------------------------------------------------

/** Resolves every token on demand, once per scheme. */
export function loadColors(): (token: string, scheme: Scheme) => Rgba {
    const tokens = readTokens(readFileSync(CSS_PATH, 'utf8'));
    const colors = new Map<string, Rgba>();

    return (token: string, scheme: Scheme): Rgba => {
        const key = `${scheme}:${token}`;

        if (!colors.has(key)) {
            colors.set(key, parseColor(resolve(`var(${token})`, scheme, tokens)));
        }

        return colors.get(key)!;
    };
}

/** Paints a stack of layers onto each other and hands back the opaque result. */
export function paintStack(colorOf: (token: string, scheme: Scheme) => Rgba, stack: Stack, scheme: Scheme): Rgba {
    const painted = stack.map(token => colorOf(token, scheme)).reduce((ground, layer) => over(layer, ground));

    if (painted[3] !== 1) {
        throw new Error(`${stack.join(' over ')} never lands on anything opaque`);
    }

    return painted;
}

function main(): number {
    const colorOf = loadColors();
    const paint = (stack: Stack, scheme: Scheme) => paintStack(colorOf, stack, scheme);
    const failures: string[] = [];
    const seen = new Set<string>();
    let total = 0;

    // In light `--surface` and `--surface-raised` hold the same value, and so do
    // `--background` and `--surface-sunken`, so a good part of the grid collapses
    // onto pairs of identical colours there. Counting those twice makes the total
    // claim more than it measures, so a check is counted once per distinct pair of
    // colours and target.
    const once = (key: string): boolean => {
        if (seen.has(key)) {
            return false;
        }

        seen.add(key);
        total++;

        return true;
    };

    const checks = buildChecks();
    const steps = buildSteps();

    for (const scheme of SCHEMES) {
        for (const check of checks) {
            if (check.scheme !== undefined && check.scheme !== scheme) {
                continue;
            }

            const foreground = colorOf(check.foreground, scheme);
            const ground = paint(check.ground, scheme);

            if (!once(`contrast|${scheme}|${foreground}|${ground}|${check.target}`)) {
                continue;
            }

            const ratio = contrast(foreground, ground);

            if (ratio + 0.005 < check.target) {
                failures.push(`${scheme.padEnd(5)} ${check.label} — ${ratio.toFixed(2)}, needs ${check.target}`);
            }
        }
    }

    const separates = (layer: string, other: string, scheme: Scheme) => {
        const first = colorOf(layer, scheme);
        const second = colorOf(other, scheme);

        if (!once(`separation|${scheme}|${first}|${second}`)) {
            return;
        }

        const ratio = contrast(first, second);

        if (ratio + 0.005 < SEPARATION_FLOOR) {
            failures.push(`${scheme.padEnd(5)} ${layer} does not separate from ${other} — ${ratio.toFixed(3)}, needs ${SEPARATION_FLOOR}`);
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

    for (const scheme of SCHEMES) {
        for (const measure of steps) {
            if (measure.scheme !== undefined && measure.scheme !== scheme) {
                continue;
            }

            const from = paint(measure.from, scheme);
            const to = paint(measure.to, scheme);

            if (!once(`step|${scheme}|${from}|${to}|${measure.floor}|${measure.direction ?? ''}`)) {
                continue;
            }

            const moved = lightness(to) - lightness(from);

            if (measure.direction !== undefined && (measure.direction === 'lighter') !== (moved > 0)) {
                failures.push(`${scheme.padEnd(5)} ${measure.label} — moves ${moved.toFixed(3)} L, has to be ${measure.direction}`);
            } else if (Math.abs(moved) + 0.0005 < measure.floor) {
                failures.push(`${scheme.padEnd(5)} ${measure.label} — moves ${Math.abs(moved).toFixed(3)} L, needs ${measure.floor}`);
            }
        }
    }

    for (const scheme of SCHEMES) {
        for (const ramp of RAMPS) {
            const ground = paint(ramp.ground, scheme);

            for (let index = 1; index < ramp.tokens.length; index++) {
                const stronger = colorOf(ramp.tokens[index - 1], scheme);
                const weaker = colorOf(ramp.tokens[index], scheme);

                if (!once(`ramp|${scheme}|${ground}|${stronger}|${weaker}`)) {
                    continue;
                }

                const above = contrast(stronger, ground);
                const below = contrast(weaker, ground);

                if (below >= above) {
                    failures.push(`${scheme.padEnd(5)} ${ramp.label}: ${ramp.tokens[index]} is not below ${ramp.tokens[index - 1]} — ${below.toFixed(2)} against ${above.toFixed(2)}`);
                }
            }
        }
    }

    for (const scheme of SCHEMES) {
        for (const [transparent, source] of TRANSPARENT_PAIRS) {
            const faded = colorOf(transparent, scheme);
            const solid = colorOf(source, scheme);

            if (!once(`transparent|${scheme}|${faded}|${solid}`)) {
                continue;
            }

            const drifted = faded.slice(0, 3).some((channel, index) => Math.abs(channel - solid[index]) > 1e-6);

            if (faded[3] !== 0 || drifted) {
                failures.push(`${scheme.padEnd(5)} ${transparent} is not ${source} at zero alpha`);
            }
        }
    }

    const drift: string[] = [];

    for (const [label, scheme, foreground, background, expected] of ANCHORS) {
        const ratio = contrast(colorOf(foreground, scheme), colorOf(background, scheme));

        if (Math.abs(ratio - expected) > 0.02) {
            drift.push(`${label} — ${ratio.toFixed(2)}, published ${expected.toFixed(2)}`);
        }
    }

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
