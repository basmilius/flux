import { createDrumRollReel, drumRoll } from '@flux-ui/internals';
import { installDateScrubberAudio, playDateScrubberSound as play, unlockDateScrubberAudio } from './dateScrubberSound';

// Constants are tuned by feel; the layout assumes a fixed-height zone with the tick line at CENTER_Y.

export type DateScrubberClasses = {
    readonly cap: string;
    readonly current: string;
    readonly date: string;
    readonly fineLabel: string;
    readonly held: string;
    readonly month: string;
    readonly reel: string;
    readonly separator: string;
    readonly tick: string;
};

export type DateScrubberOptions = {
    readonly classes: DateScrubberClasses;
    readonly dates: number[];
    readonly initialIndex?: number;
    readonly locale?: string;
    onChange(index: number): void;
};

export type DateScrubber = {
    destroy(): void;
    select(index: number): void;
};

type Entry = {
    readonly ms: number;
    readonly month: string;
    prefix: string;
    day: string;
    suffix: string;
};

type Glide = {
    readonly from: number;
    readonly to: number;
    readonly v0: number;
    readonly t0: number;
    readonly dur: number;
    readonly mode: GlideMode;
};

type GlideMode = 'jump' | 'scrub' | 'step';

type Group = {
    readonly day: boolean;
    readonly a: number;
    b: number;
    readonly m: number;
};

type Curve = {
    readonly p: number;
    readonly a: number;
    readonly c: number;
};

type Press = {
    readonly x: number;
    readonly touch: boolean;
    moved: boolean;
};

const CENTER_Y = 58;

// The original follows a horizontally scrolling strip of cards; this port scrolls a virtual strip instead.
const CARD = 240;

const PULL_SHIFT = 4.5;
const TOUCH_RUBBER_BASE = 0.2;
const RUBBER_OMEGA = 2 * Math.PI * 3.2;
const MONTH_HYSTERESIS = 0.75;
const SCRUB_DEADZONE = 0.3;
const STEP_THRESHOLD = 0.72;
const RING_OPACITY = [1, 0.78, 0.42, 0.3, 0.22];
const RING_SCALE = [1.1, 1, 0.93, 0.88, 0.84];
const FADED_FLOOR = 0.4;
const RING_DELAY = 0.25;
const DIGIT_STAGGER = 40;
const TOUCH_HOLD = 1000;

const clamp = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, value));
const lerp = (from: number, to: number, amount: number): number => from + (to - from) * amount;
const approach = (current: number, target: number, tau: number, dt: number): number => current + (target - current) * (1 - Math.exp(-dt / tau));
const gauss = (distance: number, width: number): number => Math.exp(-(distance * distance) / (width * width));
const falloff = (distance: number): number => Math.max(0, 1 - distance) ** 1.5;
const smoothstep = (value: number): number => value * value * (3 - 2 * value);

function rubberBand(distance: number, limit: number): number {
    const magnitude = Math.abs(distance);

    if (magnitude === 0 || limit <= 0) {
        return 0;
    }

    return (Math.sign(distance) * (0.55 * magnitude * limit)) / (limit + 0.55 * magnitude);
}

function erf(value: number): number {
    const t = 1 / (1 + 0.3275911 * Math.abs(value));
    const result = 1 - ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-value * value);

    return value < 0 ? -result : result;
}

function element<K extends keyof HTMLElementTagNameMap = 'div'>(parent: HTMLElement, className: string, tag: K = 'div' as K): HTMLElementTagNameMap[K] {
    const node = document.createElement(tag);
    node.className = className;
    parent.append(node);

    return node;
}

export function createDateScrubber(zone: HTMLElement, options: DateScrubberOptions): DateScrubber {
    const {classes} = options;
    let alive = true;
    const abort = new AbortController();
    const listen = (target: EventTarget, type: string, handler: (evt: any) => void, listenerOptions?: AddEventListenerOptions): void => {
        target.addEventListener(type, handler, {...listenerOptions, signal: abort.signal});
    };

    installDateScrubberAudio();

    const count = options.dates.length;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const entries: Entry[] = options.dates.map(ms => {
        const date = new Date(ms);

        return {ms, month: `${date.getFullYear()}-${date.getMonth()}`, prefix: '', day: '', suffix: ''};
    });

    const dayFormat = new Intl.DateTimeFormat(options.locale, {month: 'short', day: 'numeric'});
    const monthFormat = new Intl.DateTimeFormat(options.locale, {month: 'short'});
    const fullFormat = new Intl.DateTimeFormat(options.locale, {dateStyle: 'medium'});

    for (const entry of entries) {
        const parts = dayFormat.formatToParts(new Date(entry.ms));
        const dayIndex = parts.findIndex(part => part.type === 'day');
        const join = (slice: Intl.DateTimeFormatPart[]): string => slice.map(part => part.value).join('');

        entry.prefix = join(parts.slice(0, dayIndex));
        entry.day = parts[dayIndex]?.value ?? '';
        entry.suffix = join(parts.slice(dayIndex + 1));
    }

    // Virtual strip: one card per item, a viewport exactly one card wide.
    const maxScroll = Math.max(0, (count - 1) * CARD);
    const cardVisibility = new Float32Array(count);
    let scrollLeft = 0;
    let overscroll = 0;

    const setOverscroll = (value: number): void => {
        if (Math.abs(value) < 0.05) {
            value = 0;
        }

        if (value !== overscroll) {
            overscroll = value;
            requestFrame();
        }
    };

    const scrollTo = (value: number): void => {
        const clamped = clamp(value, 0, maxScroll);
        scrollLeft = clamped;
        setOverscroll(value - clamped);
    };

    const scrollPosition = (): number => scrollLeft + overscroll;
    const scrollOfIndex = (index: number): number => count < 2 ? 0 : clamp(index, 0, count - 1) * CARD;
    const indexOfScroll = (position: number): number => count < 2 ? 0 : clamp(position / CARD, 0, count - 1);

    const measureVisibility = (position: number, out: Float32Array): void => {
        for (let i = 0; i < count; i++) {
            const left = i * CARD - position;
            out[i] = clamp((Math.min(left + CARD, CARD) - Math.max(left, 0)) / CARD, 0, 1);
        }
    };

    const markerFromScroll = (): number => {
        const position = scrollPosition();
        measureVisibility(position, cardVisibility);

        return maxScroll > 0 ? indexOfScroll(position) : count - 1;
    };

    let glide: Glide | null = null;
    let targetIndex = count - 1;

    const commitTarget = (index: number): void => {
        if (index === targetIndex) {
            return;
        }

        targetIndex = index;
        options.onChange(index);
    };

    // Cubic Hermite from the current position and velocity to the target.
    const evaluateGlide = (current: Glide, now: number): { p: number; x: number; v: number } => {
        const p = clamp((now - current.t0) / current.dur, 0, 1);
        const p2 = p * p;
        const p3 = p2 * p;
        const tangent = current.v0 * current.dur;

        return {
            p,
            x: (2 * p3 - 3 * p2 + 1) * current.from + (p3 - 2 * p2 + p) * tangent + (3 * p2 - 2 * p3) * current.to,
            v: ((6 * p2 - 6 * p) * current.from + (3 * p2 - 4 * p + 1) * tangent + (6 * p - 6 * p2) * current.to) / current.dur
        };
    };

    const scrub = {on: false, x: 0, v: 0, to: 0};
    let hoverSpeed = 0;
    let lastHoverRaw = 0;

    const glideTo = (index: number, mode: GlideMode): void => {
        const target = clamp(Math.round(index), 0, count - 1);
        commitTarget(target);
        scrub.on = false;

        const to = scrollOfIndex(target);

        if (reducedMotion) {
            glide = null;
            scrollTo(to);
            requestFrame();
            return;
        }

        const now = performance.now();
        const current = glide ? evaluateGlide(glide, now) : null;
        const from = current ? current.x : scrollPosition();
        const distance = Math.abs(to - from);
        const dur = mode === 'scrub' ? 280 : mode === 'step' ? 380 : clamp(460 + distance * 0.08, 520, 950);

        glide = {from, to, v0: current && current.p < 1 ? current.v : 0, t0: now, dur, mode};
        requestFrame();
    };

    const scrubTo = (target: number): void => {
        if (!scrub.on) {
            const current = glide ? evaluateGlide(glide, performance.now()) : null;
            scrub.x = current ? current.x : scrollPosition();
            scrub.v = current && current.p < 1 ? current.v : 0;
            glide = null;
            scrub.on = true;
        }

        scrub.to = target;
        requestFrame(400);
    };

    // Slow scrubbing snaps between items, fast scrubbing tracks the pointer directly.
    const smoothScrub = (fractional: number): number => {
        const base = clamp(Math.floor(fractional), 0, count - 2);
        const fraction = clamp(fractional - base, 0, 1);
        const stepped = clamp((fraction - SCRUB_DEADZONE) / (1 - 2 * SCRUB_DEADZONE), 0, 1);
        const eased = stepped * stepped * stepped * (stepped * (stepped * 6 - 15) + 10);
        const snap = 1 - clamp((hoverSpeed - 0.3) / 1, 0, 1);

        return scrollOfIndex(base + fraction + (eased - fraction) * snap);
    };

    const state = {
        W: 0,
        H: 0,
        hover: {
            raw: 0,
            rawY: 0,
            x: 0,
            amt: 0,
            pop: 0,
            popV: 0,
            popT: 0,
            lean: 0,
            pullX: 0,
            pullY: 0,
            pre: 0,
            month: 0,
            held: 0,
            strain: 0,
            snap: 0,
            align: 0,
            over: false,
            inside: false
        },
        glide: {amt: 0, dir: 1},
        key: {focused: false, active: false},
        marker: count - 1,
        markerTarget: count - 1,
        xs: new Float64Array(count)
    };

    const markerX = (): number => {
        const base = Math.floor(state.marker);

        return lerp(state.xs[base], state.xs[Math.min(base + 1, count - 1)], state.marker - base);
    };

    const createDateText = (parent: HTMLElement) => {
        const wrapper = element(parent, '', 'span');
        const reels = [createDrumRollReel(wrapper, classes.reel), createDrumRollReel(wrapper, classes.reel), createDrumRollReel(wrapper, classes.reel), createDrumRollReel(wrapper, classes.reel)];

        return {
            el: wrapper,
            fill(entry: Entry, direction: number): void {
                const texts = [entry.prefix, entry.day.length > 1 ? entry.day.slice(0, -1) : '', entry.day.slice(-1), entry.suffix];
                let rolled = 0;

                texts.forEach((text, i) => {
                    if (reels[i](text, direction, rolled * DIGIT_STAGGER)) {
                        rolled++;
                    }
                });
            },
            width: (): number => reels.reduce((sum, _, i) => sum + (parseFloat((wrapper.children[i] as HTMLElement).style.width) || 0), 0)
        };
    };

    const createDateLabel = (parent: HTMLElement) => {
        const label = element(parent, classes.date);
        const reel = element(label, classes.reel, 'span');
        let text = createDateText(reel);
        let shown = -1;
        let x = 0;
        let monthRollUntil = 0;

        const sizeReel = (animated: boolean): void => {
            if (!animated) {
                reel.style.transition = 'none';
            }

            reel.style.width = `${text.width()}px`;

            if (!animated) {
                void reel.offsetWidth;
                reel.style.transition = '';
            }
        };

        return {
            set(index: number, instant: boolean): void {
                if (index === shown) {
                    return;
                }

                const entry = entries[index];
                const direction = instant || shown < 0 ? 0 : Math.sign(index - shown);
                const now = performance.now();
                const monthChanged = direction !== 0 && entry.month !== entries[shown].month;

                // Within the same month, wait for a running month roll to finish first.
                if (direction && !monthChanged && now < monthRollUntil) {
                    return;
                }

                if (monthChanged) {
                    const old = entries[shown];
                    const outgoing = text.el;
                    outgoing.textContent = old.prefix + old.day + old.suffix;
                    text = createDateText(reel);
                    text.fill(entry, 0);
                    drumRoll(outgoing, text.el, direction);
                    monthRollUntil = now + 520;
                    requestFrame(620);
                    Promise.all(outgoing.getAnimations().map(animation => animation.finished)).then(() => outgoing.remove(), () => {
                    });
                } else {
                    text.fill(entry, direction);
                }

                sizeReel(direction !== 0);
                shown = index;
            },
            at(targetX: number, y: number, opacity: number, dt: number, snap: boolean): void {
                x = snap ? targetX : approach(x, targetX, 70, dt);
                label.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -100%)`;
                label.style.opacity = `${clamp(opacity, 0, 1)}`;
            }
        };
    };

    zone.style.setProperty('--tl-reach', '32px');

    // Months, ticks and separators.
    const monthOf = new Int16Array(count);

    for (let i = 1; i < count; i++) {
        monthOf[i] = monthOf[i - 1] + (entries[i].month === entries[i - 1].month ? 0 : 1);
    }

    const monthCount = monthOf[count - 1] + 1;
    const monthStarts = Array.from({length: monthCount - 1}, (_, i) => monthOf.indexOf(i + 1));
    const monthBounds = [0, ...monthStarts, count];
    const itemX = new Float64Array(count);
    let tickCount = count;
    const tickX = new Float64Array(count);
    const tickOfItem = new Int16Array(count);
    const itemsPerTick = new Int16Array(count);
    const separatorX = new Float64Array(Math.max(0, monthCount - 1));
    const monthPitch = new Float64Array(monthCount);
    let lensScale = 1;
    let lensCenter = 0;
    const unlens = (x: number): number => lensCenter + (x - lensCenter) / lensScale;

    const nearestItem = (x: number): number => {
        let nearest = 0;

        for (let i = 1; i < count; i++) {
            if (Math.abs(itemX[i] - x) < Math.abs(itemX[nearest] - x)) {
                nearest = i;
            }
        }

        return nearest;
    };

    const itemReveal = new Float32Array(count);
    const tickColorCache = new Int16Array(count);
    const tickReveal = new Float32Array(count);
    const tickTrail = new Float32Array(count);
    const tickGrowth = new Float32Array(count);
    const tickScreenX = new Float64Array(count);
    const tickElements = Array.from({length: count}, () => element(zone, classes.tick, 'i'));
    tickElements.forEach(tick => tick.style.width = '3px');

    const separatorElements = monthStarts.map(() => element(zone, classes.separator));
    separatorElements.forEach(separator => separator.style.width = '3px');

    // Fine mode: a label per day and per month boundary.
    const dayLabels = Array.from({length: count}, () => element(zone, classes.fineLabel));
    const times = entries.map(entry => entry.ms);
    const isNewDay = times.map((ms, i) => i === 0 || new Date(ms).getDate() !== new Date(times[i - 1]).getDate() || new Date(ms).getMonth() !== new Date(times[i - 1]).getMonth());
    const isNewMonth = times.map((ms, i) => i === 0 || new Date(ms).getMonth() !== new Date(times[i - 1]).getMonth());
    const groupText = (index: number): string => isNewMonth[index] ? monthFormat.format(new Date(times[index])).toUpperCase() : String(new Date(times[index]).getDate());

    const tickHidden = new Float32Array(count);
    const separatorHidden = new Float32Array(monthStarts.length);
    let fineChrome = 0;
    let labelsDirty = false;
    let fadesDirty = false;
    let currentTickTop = 0;
    let currentTickHeight = 0;
    let currentTickWidth = 0;
    let fineReveal = 0;
    const capReveal = (): number => smoothstep(clamp(fineReveal / 0.4, 0, 1));
    const revealedRings = (): number => fineReveal < RING_DELAY ? -1 : Math.floor((fineReveal - RING_DELAY) / 0.16);
    const capTop = element(zone, classes.cap);
    let capX = 0;
    let capSnap = true;
    let capAnchor = 0;
    const capBottom = element(zone, classes.cap);

    const groups: Group[] = [];
    const groupOfItem = new Int32Array(count);

    for (let i = 0; i < count; i++) {
        if (i > 0 && isNewMonth[i]) {
            groups.push({day: false, a: i, b: i, m: monthOf[i] - 1});
        }

        if (isNewDay[i]) {
            groups.push({day: true, a: i, b: i, m: -1});
        } else {
            groups[groups.length - 1].b = i;
        }

        groupOfItem[i] = groups.length - 1;
    }

    const groupTotal = groups.length;
    const monthLabels = Array.from({length: monthStarts.length}, () => element(zone, `${classes.fineLabel} ${classes.month}`));
    const groupCenter = new Float64Array(groupTotal);
    const groupWidth = new Float64Array(groupTotal);
    const groupScale = new Float64Array(groupTotal).fill(1);
    let digitWidth = 28;
    let windowAnchor = 0;
    let windowCenter = 0;
    let windowStart = 0;
    let windowEnd = -1;
    let windowLeftBound = 0;
    let windowRightBound = 0;
    let leftSlack = 0;
    let rightSlack = 0;
    const groupPresence = new Float64Array(groupTotal);
    let layoutReset = true;
    const dayGroups: number[] = [];
    const dayOrdinal = new Int32Array(groupTotal);

    groups.forEach((group, i) => {
        if (group.day) {
            dayOrdinal[i] = dayGroups.length;
            dayGroups.push(i);
        }
    });

    const monthGroup = new Int32Array(monthStarts.length);

    groups.forEach((group, i) => {
        if (!group.day) {
            monthGroup[group.m] = i;
        }
    });

    let currentGroup = 0;
    let windowShift = 0;
    let windowOrigin = 0;
    let windowOriginTarget = 0;
    let scrubOrigin = NaN;
    let scrubBase = 0;
    let scrubStep = 0;
    let scrubPivot = NaN;
    let scrubStill = 0;
    let scrubDirection = 0;
    let leftCurve: Curve = {p: 1, a: Infinity, c: 0};
    let rightCurve: Curve = {p: 1, a: Infinity, c: 0};

    // Steps grow quadratically past a linear stretch, so every day stays reachable within the available distance.
    const createCurve = (distance: number, steps: number, pitch: number): Curve => {
        const needed = steps + STEP_THRESHOLD;

        if (distance <= 0 || needed * pitch <= distance) {
            return {p: pitch, a: Infinity, c: 0};
        }

        const linear = Math.min(3 * pitch, distance / 2);

        return {p: pitch, a: linear, c: (needed - distance / pitch) / (distance - linear) ** 2};
    };

    const curveSteps = (curve: Curve, distance: number): number => distance <= curve.a ? distance / curve.p : curve.a / curve.p + (distance - curve.a) / curve.p + curve.c * (distance - curve.a) ** 2;

    const curveDistance = (curve: Curve, steps: number): number => {
        const rest = steps - curve.a / curve.p;

        if (rest <= 0) {
            return steps * curve.p;
        }

        return curve.a + (curve.c > 1e-12 ? (-1 / curve.p + Math.sqrt(1 / curve.p ** 2 + 4 * curve.c * rest)) / (2 * curve.c) : rest * curve.p);
    };

    let needsWindowLayout = false;
    let stickyIndex = -1;
    let stickyX = 0;
    const labelX = new Float64Array(groupTotal);
    const labelOpacity = new Float64Array(groupTotal);
    const tickFade = new Float64Array(count).fill(1);
    const separatorFade = new Float64Array(monthStarts.length).fill(1);
    const labelScale = new Float64Array(groupTotal).fill(1);
    const labelReveal = new Float64Array(groupTotal);
    const labelOpacityTarget = new Float64Array(groupTotal);
    const labelScaleTarget = new Float64Array(groupTotal).fill(1);
    const labelShown = new Uint8Array(groupTotal);
    let windowMoving = false;

    function layoutGroups(): void {
        let offset = 0;

        for (let i = 0; i < groupTotal; i++) {
            groupScale[i] = labelReveal[i] > 0.003 ? labelScaleTarget[i] : RING_SCALE[Math.min(Math.abs(i - currentGroup), RING_SCALE.length - 1)];

            const width = (groupWidth[i] - 12) * groupScale[i] + 12;
            groupCenter[i] = offset + width / 2;
            offset += width;
        }
    }

    const measureLabels = (): void => {
        const probes = new Map<string, HTMLElement>();
        const probe = (text: string, month: boolean): string => {
            const key = (month ? 'm' : 'd') + text;

            if (!probes.has(key)) {
                const node = element(zone, month ? `${classes.fineLabel} ${classes.month}` : classes.fineLabel);
                node.textContent = text;
                node.style.visibility = 'hidden';
                probes.set(key, node);
            }

            return key;
        };

        const digitsKey = probe('00', false);
        const keys = groups.map(group => group.day ? probe(String(new Date(times[group.a]).getDate()), false) : probe(groupText(group.a), true));
        const zoom = zone.getBoundingClientRect().width / zone.offsetWidth || 1;
        const widths = new Map<string, number>();

        probes.forEach((node, key) => {
            const style = getComputedStyle(node);
            const padding = parseFloat(style.paddingLeft) || 0;
            const spacing = parseFloat(style.letterSpacing) || 0;
            widths.set(key, node.getBoundingClientRect().width / zoom - padding - spacing);
        });

        probes.forEach(node => node.remove());
        digitWidth = Math.ceil(widths.get(digitsKey) ?? 0) + 12;
        groups.forEach((_, i) => groupWidth[i] = (widths.get(keys[i]) ?? 0) + 12);
        layoutGroups();
        layoutReset = true;
    };

    document.fonts?.ready.then(() => {
        if (alive && fineOpen) {
            measureLabels();
        }
    });

    const groupStart = (i: number): number => groups[i].day ? itemX[groups[i].a] : separatorX[groups[i].m];
    const groupEnd = (i: number): number => groups[i].day ? itemX[groups[i].b] : separatorX[groups[i].m];
    const warpFrom = new Float64Array(groupTotal * 2 + 4);
    const warpTo = new Float64Array(groupTotal * 2 + 4);
    let warpCount = 0;
    const labelAt = (i: number, scale: number): number => windowOrigin + (groupCenter[i] - windowAnchor) / scale;
    const labelTargetAt = (i: number, scale: number): number => windowOriginTarget + (groupCenter[i] - groupCenter[windowCenter]) / scale;
    const halfLabel = (i: number, scale: number): number => ((groupWidth[i] - 12) * groupScale[i]) / 2 / scale;
    const windowFirst = (shift: number = windowShift): number => clamp(currentGroup - 2 - shift, 0, Math.max(0, groupTotal - 4 - 1));

    // Places the five-label window around the current group, shifted inward when it would leave the strip.
    const placeWindow = (scale: number, anchor: number): void => {
        const left = Math.min(tickX[0], itemX[0]) - 4 / scale;
        const right = Math.max(tickX[tickCount - 1], itemX[count - 1]) + 4 / scale;
        const last = groupTotal - 1;
        let windowLeft = 0;
        let windowRight = 0;

        const measure = (): void => {
            const first = windowFirst();
            const middle = Math.min(first + 2, last);
            const end = Math.min(first + 4, last);

            windowOrigin = anchor + (groupCenter[middle] - groupCenter[currentGroup]) / scale;
            windowLeft = windowOrigin + (groupCenter[first] - groupCenter[middle]) / scale - halfLabel(first, scale);
            windowRight = windowOrigin + (groupCenter[end] - groupCenter[middle]) / scale + halfLabel(end, scale);
        };

        windowShift = 0;
        measure();

        for (let i = 0; i < 4; i++) {
            const shift = windowLeft < left ? windowShift - 1 : windowRight > right ? windowShift + 1 : windowShift;

            if (shift === windowShift || Math.abs(shift) > 2 || windowFirst(shift) === windowFirst()) {
                break;
            }

            windowShift = shift;
            measure();
        }

        if (windowLeft < left) {
            windowOrigin += left - windowLeft;
        } else if (windowRight > right) {
            windowOrigin -= windowRight - right;
        }

        windowOriginTarget = windowOrigin;
        layoutReset = true;
    };

    const relaxWindowShift = (previous: number): void => {
        if (windowShift === 0 || currentGroup === previous) {
            return;
        }

        const first = clamp(previous - 2 - windowShift, 0, Math.max(0, groupTotal - 4 - 1));

        if (windowShift < 0 && currentGroup > previous) {
            windowShift = Math.min(0, currentGroup - 2 - first);
        } else if (windowShift > 0 && currentGroup < previous) {
            windowShift = Math.max(0, currentGroup - 2 - first);
        }
    };

    // Builds a piecewise-linear warp from strip x to label x, so ticks spread out under the fine labels.
    const buildWarp = (scale: number, dt: number): void => {
        layoutGroups();

        const left = Math.min(tickX[0], itemX[0]);
        const right = Math.max(tickX[tickCount - 1], itemX[count - 1]);
        const first = windowFirst();
        const last = Math.min(groupTotal - 1, first + 4);

        windowCenter = Math.min(first + 2, groupTotal - 1);
        windowAnchor = layoutReset || reducedMotion ? groupCenter[windowCenter] : approach(windowAnchor, groupCenter[windowCenter], 45, dt);
        windowStart = first;
        windowEnd = last;
        warpCount = 0;

        const gap = 12 / scale;
        const leftEdge = first > 0 ? (groupEnd(first - 1) + groupStart(first)) / 2 : left - 1;
        const rightEdge = last < groupTotal - 1 ? (groupEnd(last) + groupStart(last + 1)) / 2 : right + 1;
        const leftOverlap = Math.max(0, labelTargetAt(first, scale) - halfLabel(first, scale) - gap - leftEdge);
        const rightOverlap = Math.max(0, rightEdge - (labelTargetAt(last, scale) + halfLabel(last, scale) + gap));

        windowOriginTarget += leftOverlap && rightOverlap ? (rightOverlap - leftOverlap) / 2 : rightOverlap - leftOverlap;

        const leftOverflow = left - 4 / scale - (labelTargetAt(first, scale) - halfLabel(first, scale));
        const rightOverflow = labelTargetAt(last, scale) + halfLabel(last, scale) - (right + 4 / scale);

        if (leftOverflow > 0) {
            windowOriginTarget += leftOverflow;
        } else if (rightOverflow > 0) {
            windowOriginTarget -= rightOverflow;
        }

        windowOrigin = layoutReset || reducedMotion ? windowOriginTarget : approach(windowOrigin, windowOriginTarget, 45, dt);
        windowLeftBound = leftEdge;
        windowRightBound = rightEdge;

        const snap = layoutReset || reducedMotion;
        const ease = (current: number, target: number): number => snap ? target : approach(current, target, 45, dt);

        leftSlack = ease(leftSlack, labelTargetAt(first, scale) - halfLabel(first, scale) - gap - leftEdge);
        rightSlack = ease(rightSlack, labelTargetAt(last, scale) + halfLabel(last, scale) + gap - rightEdge);
        layoutReset = false;
        windowMoving = Math.abs(leftSlack - (labelTargetAt(first, scale) - halfLabel(first, scale) - gap - leftEdge)) * scale > 0.05
            || Math.abs(rightSlack - (labelTargetAt(last, scale) + halfLabel(last, scale) + gap - rightEdge)) * scale > 0.05;

        let presentFirst = -1;
        let presentLast = -1;

        for (let i = 0; i < groupTotal; i++) {
            const inside = +(i >= first && i <= last);
            groupPresence[i] = ease(groupPresence[i], inside);

            if (!inside && groupPresence[i] < 0.001) {
                groupPresence[i] = 0;
            }

            if (Math.abs(groupPresence[i] - inside) > 0.001) {
                windowMoving = true;
            }

            if (groupPresence[i] > 0) {
                if (presentFirst < 0) {
                    presentFirst = i;
                }

                presentLast = i;
            }
        }

        const push = (from: number, to: number): void => {
            warpFrom[warpCount] = from;
            warpTo[warpCount] = to;
            warpCount++;
        };

        const mapped = (x: number, i: number): number => lerp(x + (i < windowCenter ? leftSlack : rightSlack), labelAt(i, scale), groupPresence[i]);
        const before = presentFirst > 0 ? (groupEnd(presentFirst - 1) + groupStart(presentFirst)) / 2 : left - 1;
        const after = presentLast < groupTotal - 1 ? (groupEnd(presentLast) + groupStart(presentLast + 1)) / 2 : right + 1;

        push(before, Math.min(before + leftSlack, mapped(groupStart(presentFirst), presentFirst)));

        for (let i = presentFirst; i <= presentLast; i++) {
            push(groupStart(i), mapped(groupStart(i), i));

            if (groupEnd(i) > groupStart(i)) {
                push(groupEnd(i), mapped(groupEnd(i), i));
            }
        }

        push(after, Math.max(after + rightSlack, mapped(groupEnd(presentLast), presentLast)));
    };

    const warp = (x: number): number => {
        if (x <= warpFrom[0]) {
            return warpTo[0] - (warpFrom[0] - x);
        }

        for (let i = 1; i < warpCount; i++) {
            if (x <= warpFrom[i]) {
                const span = warpFrom[i] - warpFrom[i - 1];

                return span < 1e-9 ? warpTo[i] : lerp(warpTo[i - 1], warpTo[i], (x - warpFrom[i - 1]) / span);
            }
        }

        return warpTo[warpCount - 1] + (x - warpFrom[warpCount - 1]);
    };

    const dateLabel = createDateLabel(zone);
    let hoveredIndex = -1;
    let lastHoverX = 0;
    let armed = false;
    const layout = {spacing: 9};
    const holdDuration = (touch: boolean): number => touch ? TOUCH_HOLD : 500;
    const holdTotal = (touch: boolean): number => touch ? TOUCH_HOLD : 700;
    const touchTimes: number[] = [];
    const touchXs: number[] = [];
    let fineAmount = 0;
    let fineTarget = 0;
    let fineOpen = false;
    let fineCenter = 0;
    let holdProgress = 0;
    let lastRaw = 0;
    let squeeze = 0;
    let squeezeVelocity = 0;
    let squeezing = false;
    let preZoom = 0;
    let pressIndex = -1;
    let pressPull = 0;
    let currentTickX = 0;
    let rubber = 0;
    let rubberVelocity = 0;
    let rubberDirection = 1;
    let edgeOverflow = 0;
    let fineOpenedAt = -1e9;

    const wobble = (now: number): number => {
        const elapsed = now - fineOpenedAt;

        return elapsed < 0 || elapsed > 260 ? 0 : Math.exp(-elapsed / 60) * Math.cos((2 * Math.PI * elapsed) / 200);
    };

    // Integral of a gaussian bump around the hold point: a fisheye that spreads items near it.
    const fisheyeIntegral = (x: number): number => {
        const offset = x - fineCenter;

        return offset + (Math.sqrt(Math.PI) / 2) * 92 * erf(offset / 46);
    };

    let fisheyeAmount = 0;

    const fisheye = (x: number): number => {
        const start = itemX[0];
        const end = itemX[count - 1];

        if (end - start < 1) {
            return x;
        }

        const base = fisheyeIntegral(start);
        const ratio = (end - start) / (fisheyeIntegral(end) - base);
        const map = (value: number): number => start + ratio * (fisheyeIntegral(value) - base);
        const drift = map(fineCenter) - fineCenter;
        const anchor = x <= fineCenter ? (fineCenter - start > 0 ? (x - start) / (fineCenter - start) : 0) : (end - fineCenter > 0 ? (end - x) / (end - fineCenter) : 0);

        return x + (map(x) - drift * clamp(anchor, 0, 1) - x) * preZoom;
    };

    const distort = (x: number): number => {
        if (fisheyeAmount <= 0.001) {
            return x;
        }

        const zoomed = preZoom > 0.001 ? fisheye(x) : x;

        return fineAmount > 0.001 && warpCount >= 2 ? lerp(zoomed, warp(x), fineAmount) : zoomed;
    };

    const layoutTicks = (): void => {
        const perMonth = monthBounds.slice(1).map((bound, i) => bound - monthBounds[i]);
        const budget = (total: number) => {
            const ks = perMonth.map(items => clamp(Math.round((items * total) / count), 1, items));
            const slots = ks.reduce((sum, k) => sum + k, 0) - 1 + (monthCount - 1);

            return {ks, slots, s: (state.W - 48) / slots};
        };

        // Merge items into shared ticks until every slot is at least 7px wide.
        let fit = budget(count);

        for (let total = count - 1; fit.s < 7 && total >= monthCount; total--) {
            fit = budget(total);
        }

        const spacing = Math.min(9, fit.s);
        const margin = (state.W - spacing * fit.slots) / 2;
        let cursor = margin - spacing / 2;
        tickCount = 0;

        for (let month = 0; month < monthCount; month++) {
            if (month > 0) {
                separatorX[month - 1] = cursor + spacing / 2;
                cursor += spacing;
            }

            const items = perMonth[month];
            const ticks = fit.ks[month];
            monthPitch[month] = (ticks * spacing) / items;

            for (let k = 0; k < items; k++) {
                const index = monthBounds[month] + k;
                itemX[index] = cursor + ((k + 0.5) * ticks * spacing) / items;
                tickOfItem[index] = tickCount + Math.min(ticks - 1, Math.floor(((k + 0.5) * ticks) / items));
            }

            for (let k = 0; k < ticks; k++) {
                tickX[tickCount + k] = cursor + (k + 0.5) * spacing;
            }

            tickCount += ticks;
            cursor += ticks * spacing;
        }

        itemsPerTick.fill(0);

        for (let i = 0; i < count; i++) {
            itemsPerTick[tickOfItem[i]]++;
        }

        tickElements.forEach((tick, i) => tick.style.display = i < tickCount ? '' : 'none');
        layout.spacing = spacing;
        zone.style.setProperty('--tl-field-x', `${Math.max(0, 46 - margin)}px`);
    };

    const distanceToStrip = (x: number, y: number): { dx: number; dy: number; d: number } => {
        const unlensed = unlens(x);
        const dx = (unlensed - clamp(unlensed, tickX[0], tickX[tickCount - 1])) * lensScale;
        const dy = y - CENTER_Y;

        return {dx, dy, d: Math.hypot(dx, dy)};
    };

    function render(dt: number): void {
        const hover = state.hover;
        const amt = hover.amt;
        const pop = hover.pop;
        const lift = hover.pre + (1 - hover.pre) * pop;
        const vertical = 1 + 0.05 * lift;
        const reach = Math.max(state.W / 2 - tickX[0], tickX[tickCount - 1] - state.W / 2);
        const room = reach > 0 ? (state.W / 2 - 8) / reach : Infinity;
        const scale = 1 + Math.min(0.12, Math.max(0, room - 1)) * lift;
        const center = lerp(clamp(hover.raw, tickX[0], tickX[tickCount - 1]), state.W / 2, pop);

        lensScale = scale;
        lensCenter = center;

        const lens = (x: number): number => center + (x - center) * scale;
        const lensY = (y: number): number => CENTER_Y + (y - CENTER_Y) * vertical;
        const spacing = layout.spacing;
        const pointer = center + (hover.x - center) / scale;
        let held = pointer;
        let strainTarget = 0;

        if (tapHold) {
            if (hover.inside || (performance.now() >= tapHoldUntil && amt <= 0.02)) {
                tapHold = false;
            } else {
                held = itemX[tappedIndex];
            }
        }

        if (stickyIndex >= 0) {
            if (Math.abs(hover.x - stickyX) > 6 || amt <= 0.02 || press) {
                stickyIndex = -1;
            } else {
                held = itemX[stickyIndex];
            }
        }

        if (stickyIndex < 0 && hover.inside && !state.key.active && amt > 0.02) {
            // The pointer stays in its month until it passes the separator by a margin, then strains against the edge.
            let month = hover.month;
            const monthFirst = (): number => itemX[monthBounds[month]];
            const monthLast = (): number => itemX[monthBounds[month + 1] - 1];

            if ((month < monthCount - 1 && pointer > Math.min(separatorX[month] + MONTH_HYSTERESIS * spacing, itemX[monthBounds[month + 1]] - 0.25 * monthPitch[month + 1]))
                || (month > 0 && pointer < Math.max(separatorX[month - 1] - MONTH_HYSTERESIS * spacing, itemX[monthBounds[month] - 1] + 0.25 * monthPitch[month - 1]))) {
                month = monthOf[nearestItem(pointer)];
            }

            const give = 0.5 * spacing;

            if (pointer > monthLast()) {
                held = monthLast();
                strainTarget = give * (1 - Math.exp(-(pointer - held) / give));
            } else if (pointer < monthFirst()) {
                held = monthFirst();
                strainTarget = -give * (1 - Math.exp(-(held - pointer) / give));
            }

            if (month !== hover.month) {
                hover.snap += hover.held - held;
            }

            hover.month = month;
        } else {
            hover.month = monthOf[nearestItem(pointer)];
        }

        hover.held = held;
        hover.snap = approach(hover.snap, 0, 40, dt);
        hover.strain = approach(hover.strain, strainTarget, 40, dt);
        edgeOverflow = 0;

        if (hover.inside && stickyIndex < 0 && fineAmount < 0.05) {
            if (hover.month === monthCount - 1 && pointer > itemX[count - 1]) {
                edgeOverflow = pointer - itemX[count - 1];
            } else if (hover.month === 0 && pointer < itemX[0]) {
                edgeOverflow = pointer - itemX[0];
            }
        }

        // Pulling past either end stretches the strip like a rubber band.
        const rubberLimit = press?.touch ? 22 : 14;
        const rubberBase = press?.touch ? TOUCH_RUBBER_BASE : 0.45;
        const rubberTarget = rubberBand(edgeOverflow, rubberLimit);

        if (rubberTarget !== 0) {
            rubberDirection = Math.sign(rubberTarget);
        }

        if (reducedMotion || rubberTarget === 0) {
            rubberVelocity = 0;
            rubber = reducedMotion ? rubberTarget : approach(rubber, rubberTarget, 110, dt);

            if (Math.abs(rubber) < 0.02) {
                rubber = 0;
            }
        } else {
            const step = Math.min(dt, 50) / 1000 / 4;

            for (let i = 0; i < 4; i++) {
                rubberVelocity += (RUBBER_OMEGA * RUBBER_OMEGA * (rubberTarget - rubber) - 1.8 * RUBBER_OMEGA * rubberVelocity) * step;
                rubber += rubberVelocity * step;
            }
        }

        const towardPull = (x: number): number => {
            const pulled = rubberDirection > 0 ? tickX[tickCount - 1] : tickX[0];
            const fixed = rubberDirection > 0 ? tickX[0] : tickX[tickCount - 1];

            return pulled === fixed ? 1 : clamp((x - fixed) / (pulled - fixed), 0, 1);
        };

        const rubberOffset = (x: number): number => Math.abs(rubber) < 0.01 ? 0 : rubber * (rubberBase + (1 - rubberBase) * towardPull(x) ** 1.8);
        const rubberGrowth = (x: number): number => Math.abs(rubber) < 0.01 ? 0 : (Math.abs(rubber) / rubberLimit) * towardPull(x) ** 3;
        let focusX = held + hover.snap;

        if (pressPull > 0.001 && pressIndex >= 0) {
            focusX = lerp(focusX, itemX[pressIndex], pressPull);
        }

        let groupChanged = false;

        if (fineAmount > 0.001) {
            if (needsWindowLayout) {
                capAnchor = currentTickX;
                placeWindow(scale, Number.isFinite(currentTickX) && currentTickX > 0 ? center + (currentTickX - center) / scale : fineCenter);
                needsWindowLayout = false;
            }

            if ((hover.inside || press) && fineTarget > 0) {
                let origin = pointer;

                if (Number.isNaN(scrubPivot)) {
                    scrubPivot = pointer;
                    scrubDirection = 0;
                } else if (Math.abs(pointer - scrubPivot) * scale > 2) {
                    const direction = Math.sign(pointer - scrubPivot);

                    // Reversing direction rebases the curve where the pointer turned.
                    if (scrubDirection !== 0 && direction !== scrubDirection) {
                        origin = scrubPivot;
                        scrubBase += scrubStep;
                        scrubStep = 0;
                        scrubOrigin = NaN;
                    }

                    scrubDirection = direction;
                    scrubPivot = pointer;
                    scrubStill = 0;
                } else {
                    scrubStill += dt;

                    if (scrubStill >= 220 && scrubStep !== 0) {
                        scrubBase += scrubStep;
                        scrubStep = 0;
                        scrubOrigin = NaN;
                    }
                }

                if (Number.isNaN(scrubOrigin)) {
                    scrubOrigin = origin;

                    const pitch = (1.2 * digitWidth) / scale;
                    leftCurve = createCurve(origin - itemX[0] + 40 / scale, scrubBase, pitch);
                    rightCurve = createCurve(itemX[count - 1] - origin + 40 / scale, dayGroups.length - 1 - scrubBase, pitch);
                }

                const travel = pointer - scrubOrigin;
                const steps = travel < 0 ? -curveSteps(leftCurve, -travel) : curveSteps(rightCurve, travel);

                if (scrubStep >= 0) {
                    while (steps > scrubStep + STEP_THRESHOLD) {
                        scrubStep++;
                    }
                }

                if (scrubStep <= 0) {
                    while (steps < scrubStep - STEP_THRESHOLD) {
                        scrubStep--;
                    }
                }

                const lowest = -scrubBase;
                const highest = dayGroups.length - 1 - scrubBase;

                if (scrubStep > highest) {
                    scrubStep = highest;
                    scrubOrigin = pointer - curveDistance(rightCurve, scrubStep + STEP_THRESHOLD);
                } else if (scrubStep < lowest) {
                    scrubStep = lowest;
                    scrubOrigin = pointer + curveDistance(leftCurve, STEP_THRESHOLD - scrubStep);
                }

                const previous = currentGroup;
                currentGroup = dayGroups[scrubBase + scrubStep];
                relaxWindowShift(previous);
                groupChanged = true;

                const moved = Math.abs(dayOrdinal[currentGroup] - dayOrdinal[previous]);

                if (moved) {
                    play('fine', moved > 1 ? 0.75 : 1);
                }
            }

            buildWarp(scale, dt);
        } else {
            warpCount = 0;
        }

        if (fineAmount > 0.01 && (hover.inside || press) && warpCount >= 2) {
            const group = groups[currentGroup];
            const anchor = pressIndex >= group.a && pressIndex <= group.b ? pressIndex : group.a;
            focusX = lerp(focusX, itemX[anchor], fineAmount);
        }

        const current = nearestItem(focusX);
        hover.align = approach(hover.align, tickX[tickOfItem[current]] - itemX[current], 40, dt);

        const lensFocus = focusX + hover.align;
        const wobbleAmount = fineAmount > 0.01 ? wobble(performance.now()) : 0;

        const place = (x: number): number => {
            const placed = lerp(x + pop * 4 * Math.tanh((x - lensFocus) / 20), distort(x), fisheyeAmount);

            if (!wobbleAmount) {
                return placed;
            }

            const offset = x - fineCenter;

            return placed + Math.tanh(offset / 4) * 8 * wobbleAmount * Math.exp(-((offset / (1.3 * 46)) ** 2));
        };

        if (amt < 0.02) {
            armed = false;
        } else if (pop >= 0.95 && Math.abs(state.hover.x - state.hover.raw) < 2) {
            armed = true;
        }

        const hoverMoved = Math.abs(state.hover.x - lastHoverX) > 0.05 || Math.abs(hover.snap) > 0.05;
        lastHoverX = state.hover.x;

        if (current !== hoveredIndex) {
            if (armed && hoverMoved && (state.hover.inside || state.key.focused)) {
                if (fineAmount > 0.5) {
                    const moved = groupChanged || !fineOpen ? 0 : Math.abs(dayOrdinal[groupOfItem[current]] - dayOrdinal[groupOfItem[hoveredIndex]]);

                    if (moved) {
                        play('fine', moved > 1 ? 0.75 : 1);
                    }
                } else {
                    const moved = Math.abs(tickOfItem[current] - tickOfItem[hoveredIndex]);

                    if (moved) {
                        play(monthOf[current] === monthOf[hoveredIndex] ? 'line' : 'month', moved > 1 ? 0.75 : 1);
                    }
                }
            }

            hoveredIndex = current;

            if ((press?.moved || (press && fineOpen)) && reducedMotion) {
                glideTo(current, 'scrub');

                if (fineOpen) {
                    scrollTo(scrollOfIndex(current));
                }
            }

            requestFrame(400);
        }

        let fractional = current;
        const before = focusX < itemX[current] ? current - 1 : current;

        if (before >= 0 && before < count - 1) {
            fractional = before + clamp((focusX - itemX[before]) / (itemX[before + 1] - itemX[before]), 0, 1);
        }

        measureVisibility(scrollOfIndex(fractional), itemReveal);

        if (dt > 0) {
            const velocity = Math.min(6, Math.abs(state.hover.raw - lastHoverRaw) / dt);
            lastHoverRaw = state.hover.raw;
            hoverSpeed += (velocity - hoverSpeed) * (1 - Math.exp(-dt / (velocity > hoverSpeed ? 40 : 200)));
        }

        if ((press?.moved || (press && fineOpen)) && !reducedMotion && maxScroll > 0) {
            scrubTo(smoothScrub(fractional));
            commitTarget(current);
        }

        const leanY = 16 * state.hover.lean;
        const touchLean = press?.touch ? leanY * 0.22 : 0;
        const pullCenter = clamp(focusX, tickX[0], tickX[tickCount - 1]);
        const {amt: glideAmount, dir: glideDirection} = state.glide;
        let trailFirst = -1;
        let trailLast = -1;

        if (glideAmount > 0.001) {
            for (let i = 0; i < count; i++) {
                if (cardVisibility[i] > 0.01) {
                    if (trailFirst < 0) {
                        trailFirst = i;
                    }

                    trailLast = i;
                }
            }
        }

        // While gliding the visible range brightens toward the leading edge.
        const trailSpan = trailLast - trailFirst;
        const markerItem = clamp(Math.round(state.markerTarget), 0, count - 1);
        let markerTrail = 0;

        tickReveal.fill(0);
        tickTrail.fill(0);

        for (let i = 0; i < count; i++) {
            const along = trailSpan > 0 ? (glideDirection > 0 ? i - trailFirst : trailLast - i) / trailSpan : 1;
            const trail = cardVisibility[i] * (1 - glideAmount * 0.75 * (1 - along));

            if (i === markerItem) {
                markerTrail = trail;
            }

            tickTrail[tickOfItem[i]] += trail;
            tickReveal[tickOfItem[i]] += itemReveal[i];
        }

        const caps = capReveal();
        let lastPlaced = -1e9;
        const placedSeparators = fineAmount > 0.01 ? Array.from(separatorX, x => place(x)) : [];
        const ringsActive = fineTarget > 0 && fineReveal >= RING_DELAY && warpCount >= 2;
        const rings = ringsActive ? revealedRings() : -1;
        const ease = (from: number, to: number): number => reducedMotion ? to : approach(from, to, 40, dt);
        let ringsMoving = false;
        const visibleGroups: number[] = [];

        for (let i = 0; i < groupTotal; i++) {
            const ring = Math.abs(i - currentGroup);
            const shown = ringsActive && i >= windowStart && i <= windowEnd && ring <= rings;
            labelShown[i] = +shown;

            if (!shown && labelReveal[i] <= 0.003) {
                labelReveal[i] = 0;
                labelOpacity[i] = 0;
                continue;
            }

            const opacity = RING_OPACITY[Math.min(ring, RING_OPACITY.length - 1)];
            const ringScale = RING_SCALE[Math.min(ring, RING_SCALE.length - 1)];
            const hidden = labelReveal[i] <= 0.003;

            if (shown) {
                labelOpacityTarget[i] = hidden || i === currentGroup ? opacity : ease(labelOpacityTarget[i], opacity);
                labelScaleTarget[i] = hidden ? ringScale : ease(labelScaleTarget[i], ringScale);

                if (Math.abs(labelOpacityTarget[i] - opacity) > 0.003 || Math.abs(labelScaleTarget[i] - ringScale) > 0.003) {
                    ringsMoving = true;
                }
            }

            labelReveal[i] = shown && i === currentGroup ? 1 : ease(labelReveal[i], +shown);

            if (Math.abs(labelReveal[i] - +shown) > 0.003) {
                ringsMoving = true;
            }

            labelOpacity[i] = labelReveal[i] * labelOpacityTarget[i];
            labelScale[i] = labelScaleTarget[i] * lerp(0.35, 1, labelReveal[i]);

            if (warpCount >= 2) {
                labelX[i] = lens(warp((groupStart(i) + groupEnd(i)) / 2));
            }

            visibleGroups.push(i);
        }

        // Ticks and separators fade where they would collide with a fine label.
        let clearance = 1;

        const labelClearance = (x: number, halfWidth: number): number => {
            let visibility = 1;
            clearance = 1;

            for (const i of visibleGroups) {
                const halfLabelWidth = ((groupWidth[i] - 12) / 2) * labelScale[i];
                const distance = Math.abs(x - labelX[i]) - halfLabelWidth - halfWidth;
                const weight = Math.min(1, labelOpacity[i] / 0.05);
                const overlap = 1 - smoothstep(clamp((distance - 6 * labelReveal[i]) / 12, 0, 1));

                visibility = Math.min(visibility, 1 - overlap * weight);
                clearance = Math.min(clearance, 1 - (1 - clamp(distance / 2, 0, 1)) * clamp(labelOpacity[i], 0, 1));
            }

            return visibility;
        };

        const fade = (values: Float64Array, i: number, target: number, floor: number): number => {
            values[i] = reducedMotion ? target : approach(values[i], target, 55, dt);

            if (Math.abs(values[i] - target) > 0.003) {
                fadesDirty = true;
            }

            return Math.min(values[i], floor);
        };

        fadesDirty = false;

        const edgeFade = (x: number): number => lerp(1, clamp((Math.min(x, state.W - x) - 2) / 18, 0, 1), fineAmount);

        for (let tick = 0; tick < tickCount; tick++) {
            const distance = Math.abs(tickX[tick] - lensFocus) / spacing;
            const reveal = tickReveal[tick] / itemsPerTick[tick];
            const trailAverage = tickTrail[tick] / itemsPerTick[tick];
            const trail = tick === tickOfItem[markerItem] ? Math.max(trailAverage, markerTrail) : trailAverage;
            const suppress = tick === tickOfItem[current] ? 0 : fineAmount;
            const height = lerp(8 + pop * (reveal * (1.5 + 4.5 * gauss(distance, 2.2)) + 18 * falloff(distance)), 8, suppress) + 6.3 * rubberGrowth(tickX[tick]);
            const pullWeight = gauss(Math.abs(tickX[tick] - pullCenter) / spacing, 2.2);
            const pullX = hover.pullX * pullWeight;
            const pullY = hover.pullY * pullWeight;
            const brightness = lerp(0.14 + 0.86 * trail + amt * (reveal * (0.12 + 0.3 * gauss(distance, 2.2)) + 0.5 * falloff(distance)) + 0.2 * Math.hypot(pullX, pullY), 0.14, suppress);
            const growth = (height - 8) / 24;
            tickGrowth[tick] = growth;

            const x = place(tickX[tick]) + hover.strain * growth + 7.5 * pullX + rubberOffset(tickX[tick]);
            const width = lerp(3 + pop * 1 * falloff(distance), 3, suppress);
            const stretch = 3 * Math.abs(pullY);
            const fullHeight = height + stretch;
            const hiddenAmount = tickHidden[tick];
            const isCurrent = tick === tickOfItem[current];
            let spread = 1;

            // In fine mode ticks that bunch up thin out, and ticks next to a separator step aside.
            if (fineAmount > 0.01 && hiddenAmount < 0.5) {
                let gap = (lens(x) - lastPlaced) / scale;

                for (const separator of placedSeparators) {
                    gap = Math.min(gap, Math.abs(x - separator));
                }

                spread = lerp(1, clamp(gap / (0.6 * spacing), 0, 1), fineAmount);
            }

            if (spread > 0.5) {
                lastPlaced = lens(x);
            }

            let visibility = spread;

            if (!isCurrent) {
                const cleared = visibleGroups.length ? labelClearance(lens(x), (width * vertical) / 2) * edgeFade(lens(x)) : 1;
                visibility = fade(tickFade, tick, spread * cleared, visibleGroups.length ? clearance : 1);
            }

            const finalHeight = lerp(fullHeight, Math.min(fullHeight, 3), hiddenAmount) * (isCurrent ? 1 : lerp(FADED_FLOOR, 1, visibility));
            const top = CENTER_Y - height / 2 + leanY * growth + touchLean * gauss(distance, 2.2) * (1 - growth) + PULL_SHIFT * pullY - (pullY < 0 ? stretch : 0) - (finalHeight - fullHeight) / 2;

            if (isCurrent) {
                currentTickTop = top + (finalHeight - fullHeight) / 2;
                currentTickHeight = fullHeight;
                currentTickWidth = width;
            }

            const style = tickElements[tick].style;
            style.transform = `translate3d(${lens(x) - (width * vertical) / 2}px, ${lensY(top)}px, 0)`;
            style.width = `${width * vertical}px`;
            style.height = `${finalHeight * vertical}px`;

            const capped = isCurrent && caps > 0.001 ? 0 : 1;
            style.opacity = `${clamp(brightness * (1 - hiddenAmount) ** 1.5 * capped * visibility, 0, 1)}`;
            style.zIndex = isCurrent ? '2' : '';

            const heat = clamp((falloff(distance) - 0.12) / 0.24, 0, 1);
            const hot = Math.round((1 - suppress) * amt * heat * heat * (3 - 2 * heat) * 100);
            const glow = Math.round(((1 - suppress) * amt * 0.3 * 100) / (1 + (distance / 1.2) ** 2));

            if (hot * 101 + glow !== tickColorCache[tick]) {
                tickColorCache[tick] = hot * 101 + glow;

                const base = glow ? `color-mix(in oklch, var(--tl-glow) ${glow}%, var(--tl-text))` : 'var(--tl-text)';
                style.background = hot || glow ? `color-mix(in oklch, var(--tl-hot) ${hot}%, ${base})` : '';
            }

            tickScreenX[tick] = lens(x);
        }

        currentTickX = tickScreenX[tickOfItem[current]];

        for (let i = 0; i < count; i++) {
            const pullWeight = gauss(Math.abs(itemX[i] - pullCenter) / spacing, 2.2);
            state.xs[i] = lens(place(itemX[i]) + hover.strain * tickGrowth[tickOfItem[i]] + 7.5 * hover.pullX * pullWeight + rubberOffset(itemX[i]));
        }

        const currentGrowth = tickGrowth[tickOfItem[current]];

        separatorElements.forEach((separator, i) => {
            const x = separatorX[i];
            const pullWeight = gauss(Math.abs(x - pullCenter) / spacing, 2.2);
            const placed = place(x) + 7.5 * hover.pullX * pullWeight + rubberOffset(x);
            const cleared = visibleGroups.length ? labelClearance(lens(placed), (3 * vertical) / 2) * edgeFade(lens(placed)) : 1;
            const visibility = fade(separatorFade, i, cleared, visibleGroups.length ? clearance : 1);
            const height = 14 * lerp(FADED_FLOOR, 1, visibility);
            const style = separator.style;

            style.transform = `translate3d(${lens(placed) - (3 * vertical) / 2}px, ${lensY(CENTER_Y - height / 2 + PULL_SHIFT * hover.pullY * pullWeight)}px, 0)`;
            style.width = `${3 * vertical}px`;
            style.height = `${height * vertical}px`;

            const opacity = (1 - separatorHidden[i]) ** 1.5 * visibility;
            style.filter = opacity < 0.999 ? `opacity(${opacity})` : '';
        });

        dateLabel.set(current, amt < 0.15 || tapHold || performance.now() - touchEnteredAt < 150);

        const labelAnchor = tickScreenX[tickOfItem[current]] - (rubberOffset(tickX[tickOfItem[current]]) - rubber * TOUCH_RUBBER_BASE) * scale;
        dateLabel.at(labelAnchor, lensY(42 + leanY * currentGrowth) - 8, (amt * 1.4 - 0.2) * (1 - capReveal()), dt, amt < 0.15);

        const baseline = lensY(CENTER_Y);
        let currentLabelX = currentTickX;

        for (let i = 0; i < groupTotal; i++) {
            const group = groups[i];
            const label = group.day ? dayLabels[group.a] : monthLabels[group.m];

            if (labelReveal[i] <= 0) {
                if (label.style.opacity !== '0') {
                    label.style.opacity = '0';
                }

                continue;
            }

            const x = labelX[i];

            if (labelShown[i]) {
                const text = group.day ? String(new Date(times[group.a]).getDate()) : groupText(group.a);

                if (label.textContent !== text) {
                    label.textContent = text;
                }

                label.classList.toggle(classes.current, i === currentGroup);

                if (i === currentGroup) {
                    currentLabelX = x;
                }
            }

            label.style.opacity = labelOpacity[i].toFixed(3);
            label.style.transform = `translate3d(${x}px, ${baseline}px, 0) scale(${labelScale[i].toFixed(4)})`;
        }

        let hidingMoved = false;
        const easeHide = (from: number, to: number): number => reducedMotion ? to : approach(from, to, 50, dt);

        const ringOf = (x: number): number => {
            let ring = Infinity;
            let nearest = Infinity;

            for (let i = windowStart; i <= windowEnd; i++) {
                const distance = Math.abs(x - (groupStart(i) + groupEnd(i)) / 2);

                if (distance < nearest) {
                    nearest = distance;
                    ring = Math.abs(i - currentGroup);
                }
            }

            return ring;
        };

        for (let tick = 0; tick < tickCount; tick++) {
            const target = ringsActive && tickX[tick] >= windowLeftBound && tickX[tick] <= windowRightBound && ringOf(tickX[tick]) <= rings ? 1 : 0;
            tickHidden[tick] = easeHide(tickHidden[tick], target);

            if (Math.abs(tickHidden[tick] - target) > 0.002) {
                hidingMoved = true;
            }
        }

        for (let i = 0; i < separatorHidden.length; i++) {
            const group = monthGroup[i];
            const target = ringsActive && group >= windowStart && group <= windowEnd && Math.abs(group - currentGroup) <= rings ? 1 : 0;
            separatorHidden[i] = easeHide(separatorHidden[i], target);

            if (Math.abs(separatorHidden[i] - target) > 0.002) {
                hidingMoved = true;
            }
        }

        fineChrome = easeHide(fineChrome, +ringsActive);
        labelsDirty = hidingMoved || ringsMoving || Math.abs(fineChrome - +ringsActive) > 0.002 || (warpCount >= 2 && (windowMoving || Math.abs(windowAnchor - groupCenter[windowCenter]) > 0.05));

        // Two caps grow out of the current tick and settle above and below the current fine label.
        const capProgress = capReveal();
        const capStyles = [capTop.style, capBottom.style];

        if (capProgress > 0.001) {
            const target = lerp(fineTarget > 0 ? capAnchor : currentTickX, currentLabelX, capProgress);
            capX = capSnap || reducedMotion ? target : approach(capX, target, 35, dt);
            capSnap = false;

            if (Math.abs(capX - target) > 0.05) {
                labelsDirty = true;
            }

            const capWidth = currentTickWidth * vertical;
            const halfTick = (currentTickHeight * vertical) / 2;
            const capHeight = Math.max(0, halfTick * lerp(1, 0.82, capProgress) - 3 * capProgress);
            const tickTop = lensY(currentTickTop);
            const labelHalf = 8 * labelScale[currentGroup];
            const restTop = lensY(CENTER_Y) - labelHalf - 6 - 3 - capHeight;
            const tickMiddle = tickTop + halfTick;
            const restBottom = lensY(CENTER_Y) + labelHalf + 6 + 3;

            [lerp(tickTop, restTop, capProgress), lerp(tickMiddle, restBottom, capProgress)].forEach((y, i) => {
                const style = capStyles[i];
                style.width = `${capWidth}px`;
                style.height = `${capHeight}px`;
                style.transform = `translate3d(${capX - capWidth / 2}px, ${y}px, 0)`;
                style.opacity = '1';
            });
        } else {
            capSnap = true;

            if (capStyles[0].opacity !== '0') {
                capStyles.forEach(style => style.opacity = '0');
            }
        }
    }

    let running = false;
    let lastMarker = -1;
    let keepAliveUntil = 0;
    let lastFrame = 0;
    let zoneLeft = 0;
    let zoneTop = 0;

    const frame = (now: number): void => {
        if (!alive) {
            running = false;
            return;
        }

        const dt = clamp(now - lastFrame, 0, 64);
        lastFrame = now;

        const glideState = state.glide;
        const mode = glide?.mode;

        if (glide) {
            glideState.dir = Math.sign(glide.to - glide.from) || glideState.dir;

            const current = evaluateGlide(glide, now);
            scrollTo(current.x);

            if (current.p === 1) {
                glide = null;
            }
        }

        if (scrub.on) {
            const stiffness = 0.026;
            let remaining = dt;

            while (remaining > 0) {
                const step = Math.min(8, remaining);
                remaining -= step;
                scrub.v += (stiffness * stiffness * (scrub.to - scrub.x) - 1.4 * stiffness * scrub.v) * step;
                scrub.x += scrub.v * step;
            }

            if (Math.abs(scrub.v) > 0.001) {
                glideState.dir = Math.sign(scrub.v) || glideState.dir;
            }

            scrollTo(scrub.x);

            if (!press?.moved && Math.abs(scrub.x - scrub.to) < 0.5 && Math.abs(scrub.v) < 0.005) {
                scrub.on = false;
                scrollTo(scrub.to);
            }
        }

        if (overscroll && !glide && !scrub.on && !fineOpen) {
            setOverscroll(reducedMotion ? 0 : approach(overscroll, 0, 90, dt));
        }

        glideState.amt = approach(glideState.amt, glide || scrub.on ? 1 : 0, glide || scrub.on ? 60 : 120, dt);
        state.markerTarget = markerFromScroll();
        state.marker = approach(state.marker, state.markerTarget, 70, dt);

        const hover = state.hover;
        const keyboard = state.key.focused && (state.key.active || !hover.inside);

        if (keyboard) {
            hover.raw = markerX();
        }

        const marker = Math.round(state.markerTarget);

        if (marker !== lastMarker) {
            if (!keyboard && state.W > 0 && (mode === 'jump' || (scrub.on && !press))) {
                const moved = Math.abs(tickOfItem[marker] - tickOfItem[lastMarker]);

                if (moved) {
                    play('travel', moved > 1 ? 0.8 : 1);
                }
            }

            lastMarker = marker;
        }

        const active = hover.inside || keyboard || now < tapHoldUntil;
        hover.amt = approach(hover.amt, +active, 110, dt);

        if (active) {
            hover.popT = approach(hover.popT, 1, 45, dt);

            const step = dt / 1000 / 4;

            for (let i = 0; i < 4; i++) {
                const damping = hover.popV < 0 ? 1 : 0.5;
                hover.popV += (484 * (hover.popT - hover.pop) - 2 * damping * 22 * hover.popV) * step;
                hover.pop += hover.popV * step;
            }
        } else {
            hover.pop = Math.min(hover.pop, hover.amt);
            hover.popV = 0;
            hover.popT = hover.pop;
        }

        hover.x = hover.amt < 0.02 ? hover.raw : approach(hover.x, hover.raw, 45, dt);

        const offsetY = hover.rawY - CENTER_Y;
        const leanRange = (offsetY < 0 ? CENTER_Y : state.H - CENTER_Y) + 32;
        const leanTarget = hover.inside && !keyboard ? (press?.touch ? Math.tanh(offsetY / leanRange) : clamp(offsetY / leanRange, -1, 1)) : 0;
        hover.lean = approach(hover.lean, leanTarget, 60, dt);

        // Near the strip but not on it, ticks lean toward the pointer like iron filings to a magnet.
        const distance = distanceToStrip(hover.raw, hover.rawY);

        if (hover.over && !hover.inside && !keyboard && state.W > 0 && distance.d <= 20) {
            enter();
        }

        const proximity = 1 - clamp((distance.d - 20) / 26, 0, 1);
        const attraction = hover.over && !hover.inside && !keyboard && distance.d > 0 ? (proximity * proximity) / distance.d : 0;
        const pullXTarget = distance.dx * attraction;
        const pullYTarget = distance.dy * attraction;
        hover.pullX = approach(hover.pullX, pullXTarget, 60, dt);
        hover.pullY = approach(hover.pullY, pullYTarget, 60, dt);

        const preTarget = hover.over && !keyboard ? 0.45 * proximity : 0;

        if (!active) {
            hover.pre = approach(hover.pre, preTarget, 90, dt);
        }

        {
            const pointerSpeed = Math.abs(hover.raw - lastRaw) / dt;
            lastRaw = hover.raw;
            let holding = false;

            // A still press opens fine mode once the hold completes.
            if (press && !fineOpen && hover.inside) {
                if (press.touch && edgeOverflow !== 0) {
                    holdStart = -1;
                    holdProgress = 0;
                    pressIndex = -1;
                    stillX = hover.raw;
                    stillY = hover.rawY;
                    stillSince = now;
                } else if (isStill(holdX, holdY) && holdStart >= 0) {
                    holding = true;
                    holdProgress = clamp((now - holdStart) / holdLength, 0, 1);

                    if (pressIndex < 0 && hoveredIndex >= 0) {
                        pressIndex = hoveredIndex;
                        fineCenter = itemX[pressIndex];
                    }

                    if (holdProgress >= 1) {
                        measureLabels();
                        currentGroup = groupOfItem[pressIndex >= 0 ? pressIndex : Math.max(0, hoveredIndex)];
                        windowShift = 0;
                        scrubBase = dayOrdinal[currentGroup];
                        scrubStep = 0;
                        scrubOrigin = NaN;
                        scrubPivot = NaN;
                        needsWindowLayout = true;
                        fineOpen = true;
                        fineTarget = 1;
                        holdProgress = 0;
                        holding = false;
                        squeezing = true;
                        fineOpenedAt = reducedMotion ? -1e9 : now;
                        play('fine');
                    }
                } else {
                    holdStart = -1;
                    holdProgress = 0;

                    if (isStill(stillX, stillY)) {
                        if (now - stillSince >= 150) {
                            holdX = stillX;
                            holdY = stillY;
                            holdStart = now;
                            holdLength = holdTotal(press.touch) - 150;
                            pressIndex = -1;
                        }
                    } else {
                        stillX = hover.raw;
                        stillY = hover.rawY;
                        stillSince = now;
                    }
                }
            }

            if (press?.touch) {
                touchTimes.push(now);
                touchXs.push(hover.raw);

                while (touchTimes.length > 2 && touchTimes[1] <= now - 180) {
                    touchTimes.shift();
                    touchXs.shift();
                }
            }

            // Fine mode closes on a quick flick (touch) or a fast pointer move.
            let flicked = false;

            if (fineOpen && press?.touch) {
                const windowIndex = touchTimes.findIndex(time => time >= now - 180);
                const recentIndex = touchTimes.findIndex(time => time >= now - 50);
                const travel = hover.raw - touchXs[windowIndex];
                const elapsed = now - touchTimes[recentIndex];
                const velocity = elapsed > 0 ? (hover.raw - touchXs[recentIndex]) / elapsed : 0;

                flicked = Math.abs(travel) >= 80 && Math.abs(velocity) >= 0.5 && Math.sign(velocity) === Math.sign(travel);
            }

            if (fineOpen && (press?.touch ? flicked : pointerSpeed > 0.9)) {
                fineOpen = false;
                fineTarget = 0;
                play('close');
                pressPull = 0;
                pressIndex = -1;
                holdStart = -1;
                stillX = hover.raw;
                stillY = hover.rawY;
                stillSince = now;
            }

            fineAmount = reducedMotion ? fineTarget : approach(fineAmount, fineTarget, fineTarget > fineAmount ? 70 : 110, dt);

            const revealTarget = +(fineTarget > 0);

            if (reducedMotion) {
                fineReveal = revealTarget;
            } else if (revealTarget > fineReveal) {
                fineReveal = Math.min(revealTarget, fineReveal + dt / 240);
            } else if (revealTarget < fineReveal) {
                fineReveal = Math.max(revealTarget, fineReveal - dt / 144);
            }

            // The strip squeezes while the hold charges and springs back once it opens.
            if (reducedMotion) {
                squeeze = 0;
                squeezeVelocity = 0;
                squeezing = false;
            } else if (holding) {
                squeeze = holdProgress;
                squeezeVelocity = 0;
                squeezing = false;
            } else if (squeezing || Math.abs(squeeze) > 0.001) {
                squeezing = true;
                let remaining = dt;

                while (remaining > 0) {
                    const step = Math.min(8, remaining);
                    remaining -= step;

                    const seconds = step / 1000;
                    squeezeVelocity += (-1156 * squeeze - 34 * squeezeVelocity) * seconds;
                    squeeze += squeezeVelocity * seconds;
                }

                if (Math.abs(squeeze) < 0.002 && Math.abs(squeezeVelocity) < 0.01) {
                    squeeze = 0;
                    squeezeVelocity = 0;
                    squeezing = false;
                }
            }

            preZoom = holding && !reducedMotion ? holdProgress * 0.15 : reducedMotion ? 0 : approach(preZoom, 0, 90, dt);
            fisheyeAmount = Math.max(fineAmount, preZoom);

            if (reducedMotion) {
                pressPull = 0;
            } else if (holding) {
                const pull = clamp((holdProgress * holdLength) / 166.66666666666666, 0, 1);
                pressPull = Math.max(pressPull, pull * pull * (3 - 2 * pull));
            } else if (!fineOpen) {
                pressPull = approach(pressPull, 0, 90, dt);
            }

            if (!holding && !fineOpen && pressPull <= 0.001) {
                pressIndex = -1;
            }

            if (state.W > 0) {
                if (Math.abs(squeeze) > 0.001) {
                    zone.style.transformOrigin = `${currentTickX - state.W / 2}px ${CENTER_Y}px`;
                    zone.style.scale = `${1 - 0.04 * squeeze}`;
                    zone.style.filter = `opacity(${Math.min(1, 1 - 0.12 * squeeze)})`;
                } else if (zone.style.scale) {
                    zone.style.scale = '';
                    zone.style.filter = '';
                    zone.style.transformOrigin = '';
                }
            }
        }

        if (state.W > 0) {
            render(dt);
        }

        const selected = clamp(Math.round(state.markerTarget), 0, count - 1);
        zone.setAttribute('aria-valuenow', `${selected + 1}`);
        zone.setAttribute('aria-valuetext', fullFormat.format(new Date(times[selected])));

        const moving = Math.abs(hover.amt - +active) > 0.002
            || Math.abs(hover.pop - +active) > 0.002
            || Math.abs(hover.popV) > 0.01
            || Math.abs(state.marker - state.markerTarget) > 0.002
            || overscroll !== 0
            || Math.abs(hover.x - hover.raw) > 0.05
            || Math.abs(hover.lean - leanTarget) > 0.002
            || Math.abs(hover.pullX - pullXTarget) > 0.002
            || Math.abs(hover.pullY - pullYTarget) > 0.002
            || (!active && Math.abs(hover.pre - preTarget) > 0.002)
            || glideState.amt > 0.002
            || fineAmount > 0.002
            || holdProgress > 0.002
            || Math.abs(squeeze) > 0.002
            || squeezing
            || preZoom > 0.002
            || pressPull > 0.002
            || Math.abs(rubber) > 0.02
            || Math.abs(rubberVelocity) > 0.05
            || labelsDirty
            || fadesDirty
            || (fineReveal > 0 && fineReveal < 1)
            || fineTarget > 0;

        if (now < keepAliveUntil || glide || scrub.on || hover.inside || moving) {
            requestAnimationFrame(frame);
        } else {
            running = false;
        }
    };

    function requestFrame(duration: number = 700): void {
        if (!alive) {
            return;
        }

        keepAliveUntil = Math.max(keepAliveUntil, performance.now() + duration);

        if (!running) {
            running = true;
            lastFrame = performance.now();
            requestAnimationFrame(frame);
        }
    }

    const resize = (): void => {
        state.W = zone.clientWidth;
        state.H = zone.clientHeight;
        ({left: zoneLeft, top: zoneTop} = zone.getBoundingClientRect());

        if (state.W > 0) {
            layoutTicks();
        }

        lastMarker = Math.round(markerFromScroll());
        requestFrame();
    };

    let press: Press | null = null;
    let holdX = 0;
    let holdY = 0;
    let holdStart = -1;
    let holdLength = 500;
    let stillX = 0;
    let stillY = 0;
    const isStill = (x: number, y: number): boolean => Math.abs(state.hover.raw - x) <= 6 && (!press?.touch || Math.abs(state.hover.rawY - y) <= 6);
    let stillSince = 0;
    let tapHoldUntil = 0;
    let tappedIndex = 0;
    let tapHold = false;
    let touchEnteredAt = -1e9;

    const setInside = (inside: boolean): void => {
        state.hover.inside = inside;
        zone.classList.toggle(classes.held, inside);
    };

    function enter(): void {
        setInside(true);
        play('line');
    }

    const track = (evt: PointerEvent): void => {
        state.hover.raw = evt.clientX - zoneLeft;
        state.hover.rawY = evt.clientY - zoneTop;

        const touch = evt.pointerType === 'touch';

        if (!state.hover.inside && state.W > 0 && (touch || distanceToStrip(state.hover.raw, state.hover.rawY).d <= 20)) {
            if (touch) {
                state.hover.x = state.hover.raw;
                state.hover.month = monthOf[nearestItem(unlens(state.hover.raw))];
                state.hover.snap = 0;
                state.hover.strain = 0;
                touchEnteredAt = performance.now();
                armed = true;
            }

            enter();
        }
    };

    listen(zone, 'pointerenter', (evt: PointerEvent) => {
        ({left: zoneLeft, top: zoneTop} = zone.getBoundingClientRect());
        state.hover.over = true;
        track(evt);
        requestFrame();
    });

    const move = (evt: PointerEvent): void => {
        state.key.active = false;
        track(evt);

        if (press && !press.moved && Math.abs(evt.clientX - press.x) > 3) {
            press.moved = true;

            if (reducedMotion) {
                glideTo(hoveredIndex, 'scrub');
            } else if (maxScroll > 0) {
                scrubTo(scrollOfIndex(hoveredIndex));
            }
        }

        requestFrame();
    };

    listen(zone, 'pointermove', move);

    listen(zone, 'pointerleave', () => {
        state.hover.over = false;

        if (!press) {
            setInside(false);
        }

        requestFrame();
    });

    listen(zone, 'pointerdown', (evt: PointerEvent) => {
        if (evt.button !== 0 || !state.hover.inside) {
            return;
        }

        unlockDateScrubberAudio();
        zone.setPointerCapture(evt.pointerId);

        const touch = evt.pointerType === 'touch';
        press = {x: evt.clientX, moved: false, touch};

        if (touch && !fineOpen) {
            state.hover.raw = evt.clientX - zoneLeft;
            state.hover.x = state.hover.raw;
            hoveredIndex = nearestItem(unlens(state.hover.raw));
        }

        holdX = state.hover.raw;
        holdY = evt.clientY - zoneTop;
        holdStart = performance.now();
        holdLength = holdDuration(touch);
        stillX = holdX;
        stillY = holdY;
        stillSince = holdStart;
        touchTimes.length = 0;
        touchXs.length = 0;
        holdProgress = 0;

        if (!fineOpen) {
            pressIndex = -1;
        }
    });

    const release = (evt: PointerEvent): void => {
        if (!press) {
            return;
        }

        const touch = evt.pointerType === 'touch';

        // Throw: project the scrub velocity forward and settle on the nearest item.
        if (press.moved && scrub.on && maxScroll > 0) {
            const projected = clamp(scrub.x + scrub.v * 150, 0, maxScroll);
            const index = fineOpen && hoveredIndex >= 0 ? hoveredIndex : clamp(Math.round(indexOfScroll(projected)), 0, count - 1);
            scrub.to = scrollOfIndex(index);
            commitTarget(index);
            requestFrame(900);
        }

        if (!press.moved) {
            const index = hoveredIndex;
            glideTo(index, 'jump');

            if (touch) {
                state.hover.raw = evt.clientX - zoneLeft;
                tappedIndex = index;
                tapHold = true;
                tapHoldUntil = performance.now() + 280;
                requestFrame(680);
            }
        }

        press = null;

        if (fineOpen && hoveredIndex >= 0) {
            stickyIndex = hoveredIndex;
            stickyX = state.hover.x;
        }

        if (fineOpen) {
            play('close');
            pressPull = 0;
        }

        fineTarget = 0;
        fineOpen = false;
        holdStart = -1;
        holdProgress = 0;

        const rect = zone.getBoundingClientRect();
        setInside(!touch && evt.clientX >= rect.left && evt.clientX <= rect.right && evt.clientY >= rect.top - 32 && evt.clientY <= rect.bottom + 32);
        requestFrame();
    };

    listen(zone, 'pointerup', release);
    listen(zone, 'pointercancel', release);

    const outside = (evt: Event): boolean => !zone.contains(evt.target as Node);

    listen(window, 'pointermove', (evt: PointerEvent) => {
        if (press && outside(evt)) {
            move(evt);
        }
    });

    listen(window, 'pointerup', (evt: PointerEvent) => {
        if (outside(evt)) {
            release(evt);
        }
    });

    listen(window, 'pointercancel', (evt: PointerEvent) => {
        if (outside(evt)) {
            release(evt);
        }
    });

    const monthStart = (index: number): number => {
        while (index > 0 && entries[index - 1].month === entries[index].month) {
            index--;
        }

        return index;
    };

    const monthEnd = (index: number): number => {
        const month = entries[index].month;

        while (index < count - 1 && entries[index].month === month) {
            index++;
        }

        return index;
    };

    listen(zone, 'focus', () => {
        state.key.focused = zone.matches(':focus-visible');
        state.key.active = state.key.focused;
        requestFrame();
    });

    listen(zone, 'blur', () => {
        state.key.focused = false;
        state.key.active = false;
        requestFrame();
    });

    listen(zone, 'keydown', (evt: KeyboardEvent) => {
        if (evt.metaKey || evt.ctrlKey || evt.altKey) {
            return;
        }

        const from = glide ? targetIndex : Math.round(state.markerTarget);

        if (evt.key === 'ArrowLeft' || evt.key === 'ArrowDown') {
            glideTo(from - 1, 'step');
        } else if (evt.key === 'ArrowRight' || evt.key === 'ArrowUp') {
            glideTo(from + 1, 'step');
        } else if (evt.key === 'PageDown') {
            glideTo(monthStart(from) < from ? monthStart(from) : monthStart(Math.max(0, from - 1)), 'jump');
        } else if (evt.key === 'PageUp') {
            glideTo(monthEnd(from), 'jump');
        } else if (evt.key === 'Home') {
            glideTo(0, 'jump');
        } else if (evt.key === 'End') {
            glideTo(count - 1, 'jump');
        } else {
            return;
        }

        evt.preventDefault();
        state.key.focused = true;
        state.key.active = true;
        requestFrame();
    });

    zone.setAttribute('aria-valuemin', '1');
    zone.setAttribute('aria-valuemax', `${count}`);

    const initial = clamp(Math.round(options.initialIndex ?? count - 1), 0, count - 1);
    targetIndex = initial;
    scrollLeft = scrollOfIndex(initial);
    state.marker = initial;
    state.markerTarget = initial;

    const observer = new ResizeObserver(resize);
    observer.observe(zone);
    resize();

    return {
        select(index: number): void {
            if (index !== targetIndex) {
                glideTo(index, 'jump');
            }
        },
        destroy(): void {
            alive = false;
            running = false;
            abort.abort();
            observer.disconnect();
            zone.replaceChildren();
            zone.style.scale = '';
            zone.style.filter = '';
            zone.style.transformOrigin = '';
        }
    };
}
