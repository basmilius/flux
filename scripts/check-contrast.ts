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

const CSS_PATH = 'packages/components/dist/index.css';

const INTENTS = ['primary', 'danger', 'info', 'success', 'warning', 'gray'] as const;
const ELEVATIONS = ['--background', '--surface-sunken', '--surface', '--surface-raised'] as const;
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
 */
function readTokens(css: string): Map<string, string> {
    const start = css.indexOf(':root {');

    if (start === -1) {
        throw new Error(`no :root block in ${CSS_PATH}`);
    }

    const end = css.indexOf('\n}', start);
    const body = css.slice(css.indexOf('{', start) + 1, end);
    const tokens = new Map<string, string>();

    for (const line of body.split('\n')) {
        const trimmed = line.trim().replace(/;$/, '');

        if (!trimmed.startsWith('--')) {
            continue;
        }

        const colon = trimmed.indexOf(':');
        tokens.set(trimmed.slice(0, colon).trim(), trimmed.slice(colon + 1).trim());
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

    if (value.startsWith('#')) {
        const hex = value.slice(1);
        const step = hex.length <= 4 ? 1 : 2;
        const channel = (index: number) => {
            const part = hex.substr(index * step, step);

            return parseInt(step === 1 ? part + part : part, 16) / 255;
        };

        return [channel(0), channel(1), channel(2), hex.length === 4 || hex.length === 8 ? channel(3) : 1];
    }

    const oklch = findCall(value, 'oklch');

    if (oklch === null) {
        throw new Error(`unsupported colour "${input}"`);
    }

    const [components, alphaPart] = oklch.args.split('/');
    const [lightness, chroma, hue] = components.trim().split(/\s+/).map(Number);
    const alpha = alphaPart === undefined ? 1 : parseAlpha(alphaPart.trim());

    return [...oklchToLinearSrgb(lightness, chroma, hue), alpha] as unknown as Rgba;
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

/**
 * Composites a possibly translucent colour over an opaque backdrop. A token
 * like `--ink-hover` or `--foreground-disabled` only has a contrast at all once
 * it sits on something.
 */
function over(foreground: Rgba, background: Rgba): Rgba {
    const alpha = foreground[3];

    return [
        foreground[0] * alpha + background[0] * (1 - alpha),
        foreground[1] * alpha + background[1] * (1 - alpha),
        foreground[2] * alpha + background[2] * (1 - alpha),
        1
    ];
}

function luminance([red, green, blue]: Rgba): number {
    return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

/**
 * OKLab lightness. A contrast ratio answers "can this be read"; an interaction
 * state is not read, it is noticed, and at the dark end a ratio exaggerates what
 * the eye barely registers. Perceptual lightness is the honest measure there.
 */
function lightness([red, green, blue]: Rgba): number {
    const long = Math.cbrt(0.4122214708 * red + 0.5363325363 * green + 0.0514459929 * blue);
    const medium = Math.cbrt(0.2119034982 * red + 0.6806995451 * green + 0.1073969566 * blue);
    const short = Math.cbrt(0.0883024619 * red + 0.2817188376 * green + 0.6299787005 * blue);

    return 0.2104542553 * long + 0.793617785 * medium - 0.0040720468 * short;
}

function step(state: Rgba, background: Rgba): number {
    return Math.abs(lightness(over(state, background)) - lightness(background));
}

function contrast(foreground: Rgba, background: Rgba): number {
    const composited = luminance(over(foreground, background));
    const base = luminance(background);

    return (Math.max(composited, base) + 0.05) / (Math.min(composited, base) + 0.05);
}

// ---------------------------------------------------------------------------
// The contract
// ---------------------------------------------------------------------------

type Check = {
    readonly label: string;
    readonly foreground: string;
    readonly background: string;
    readonly target: number;
};

function buildChecks(): Check[] {
    const checks: Check[] = [];
    const add = (label: string, foreground: string, background: string, target: number) => checks.push({label, foreground, background, target});

    for (const intent of INTENTS) {
        for (const step of ['solid', 'solid-hover', 'solid-active']) {
            add(`${intent}: on-solid over ${step}`, `--${intent}-on-solid`, `--${intent}-${step}`, 4.5);
        }

        add(`${intent}: text on surface`, `--${intent}-text`, '--surface', 4.5);
        add(`${intent}: text on soft`, `--${intent}-text`, `--${intent}-soft`, 4.5);
        add(`${intent}: text on soft-hover`, `--${intent}-text`, `--${intent}-soft-hover`, 4.5);
        add(`${intent}: foreground on soft`, '--foreground', `--${intent}-soft`, 4.5);
        add(`${intent}: border against soft`, `--${intent}-border`, `--${intent}-soft`, 1.05);
        add(`${intent}: soft against surface`, `--${intent}-soft`, '--surface', 1.02);
    }

    for (const elevation of ELEVATIONS) {
        add(`foreground-prominent on ${elevation}`, '--foreground-prominent', elevation, 4.5);
        add(`foreground on ${elevation}`, '--foreground', elevation, 4.5);
        add(`foreground-secondary on ${elevation}`, '--foreground-secondary', elevation, 4.5);
        add(`foreground-subtle on ${elevation}`, '--foreground-subtle', elevation, 2.8);
        add(`focus-ring on ${elevation}`, '--focus-ring', elevation, 3);
        add(`surface-stroke on ${elevation}`, '--surface-stroke', elevation, 1.1);
    }

    add('foreground-inverse-prominent on surface-inverse', '--foreground-inverse-prominent', '--surface-inverse', 4.5);
    add('foreground-inverse on surface-inverse', '--foreground-inverse', '--surface-inverse', 4.5);
    add('foreground-inverse-secondary on surface-inverse', '--foreground-inverse-secondary', '--surface-inverse', 4.5);

    return checks;
}

// Dark carries elevation in the lightness of the layer, so each level has to be
// measurably lighter than the one below it. Light keeps every raised layer white
// and lets the shadow do the work, which is why this is dark only.
const DARK_ELEVATION: readonly (readonly [string, string])[] = [
    ['--surface-sunken', '--background'],
    ['--surface', '--background'],
    ['--surface-raised', '--surface']
];

// An interaction state has to be noticeable on every ground it can land on, and
// the opaque pair is calibrated against `--surface` alone. Menus, flyouts and the
// command palette sit on `--surface-raised`, where `--surface-hover` used to move
// .007 in dark: no hover at all. .018 is the floor at which the step reads.
const STATES: readonly (readonly [string, readonly string[]])[] = [
    ['--surface-hover', ['--surface']],
    ['--surface-active', ['--surface']],
    ['--ink-hover', ['--surface', '--surface-raised', '--surface-sunken']],
    ['--ink-active', ['--surface', '--surface-raised', '--surface-sunken']]
];

const STATE_FLOOR = 0.018;

// The three numbers the proof of concept published. If the script cannot
// reproduce these, the script is wrong, not the tokens.
const ANCHORS: readonly (readonly [string, Scheme, string, string, number])[] = [
    ['primary button label, dark', 'dark', '--primary-on-solid', '--primary-solid', 5.61],
    ['focus ring, dark', 'dark', '--focus-ring', '--surface', 6.75],
    ['surface against page, dark', 'dark', '--surface', '--background', 1.08]
];

// ---------------------------------------------------------------------------

function main(): number {
    const css = Bun.file(CSS_PATH);
    const tokens = readTokens(require('node:fs').readFileSync(CSS_PATH, 'utf8'));
    const colors = new Map<string, Rgba>();

    const colorOf = (token: string, scheme: Scheme): Rgba => {
        const key = `${scheme}:${token}`;

        if (!colors.has(key)) {
            colors.set(key, parseColor(resolve(`var(${token})`, scheme, tokens)));
        }

        return colors.get(key)!;
    };

    const failures: string[] = [];
    let total = 0;

    for (const scheme of SCHEMES) {
        for (const check of buildChecks()) {
            total++;
            const ratio = contrast(colorOf(check.foreground, scheme), colorOf(check.background, scheme));

            if (ratio + 0.005 < check.target) {
                failures.push(`${scheme.padEnd(5)} ${check.label} — ${ratio.toFixed(2)}, needs ${check.target}`);
            }
        }
    }

    for (const [layer, beneath] of DARK_ELEVATION) {
        total++;
        const ratio = contrast(colorOf(layer, 'dark'), colorOf(beneath, 'dark'));

        if (ratio + 0.005 < 1.05) {
            failures.push(`dark  ${layer} against ${beneath} — ${ratio.toFixed(2)}, needs 1.05`);
        }
    }

    for (const scheme of SCHEMES) {
        for (const [state, grounds] of STATES) {
            for (const ground of grounds) {
                total++;
                const moved = step(colorOf(state, scheme), colorOf(ground, scheme));

                if (moved + 0.0005 < STATE_FLOOR) {
                    failures.push(`${scheme.padEnd(5)} ${state} on ${ground} — moves ${moved.toFixed(3)} L, needs ${STATE_FLOOR}`);
                }
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

process.exit(main());
