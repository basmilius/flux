<template>
    <span
        ref="label"
        :aria-label="text">{{ initialText }}</span>
</template>

<script
    lang="ts"
    setup>
    import { prefersReducedMotion } from '@flux-ui/internals';
    import { onBeforeUnmount, onMounted, useTemplateRef, watch } from 'vue';
    import $style from '~flux/visuals/css/component/SlotText.module.scss';

    type SlotTextColor = string | ((index: number, total: number) => string);
    type SlotTextDirection = 'up' | 'down';

    type AnimateOptions = {
        direction?: SlotTextDirection;
        stagger?: number;
        duration?: number;
        exitOffset?: number;
        easing?: string;
        bounce?: number;
        color?: SlotTextColor;
        colorFade?: number;
        skipUnchanged?: boolean;
        interrupt?: boolean;
    };

    type FlashOptions = {
        revertAfter?: number;
        enter?: AnimateOptions;
        exit?: AnimateOptions;
    };

    type SlotState = {
        timers: number[];
        target: string;
        pending?: { text: string; options: AnimateOptions; };
    };

    const {
        text,
        bounce = .6,
        chromatic = false,
        color,
        colorFade = 280,
        direction = 'down',
        duration = 300,
        easing = 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        exitOffset = 50,
        interrupt = true,
        skipUnchanged = true,
        stagger = 45
    } = defineProps<{
        readonly text: string;
        readonly bounce?: number;
        readonly chromatic?: boolean;
        readonly color?: string;
        readonly colorFade?: number;
        readonly direction?: SlotTextDirection;
        readonly duration?: number;
        readonly easing?: string;
        readonly exitOffset?: number;
        readonly interrupt?: boolean;
        readonly skipUnchanged?: boolean;
        readonly stagger?: number;
    }>();

    const NBSP = '\u00A0';

    // Rendered once for SSR / first paint only. The engine owns the span's DOM
    // after mount, so this must NOT be reactive - a reactive {{ text }} would make
    // Vue re-run setElementText on every change and wipe the animated glyph cells.
    // The accessible name stays current through the reactive :aria-label binding.
    const initialText = text;

    const labelRef = useTemplateRef('label');

    // Per-instance record of the in-flight roll, so a new roll can interrupt it.
    let state: SlotState | null = null;
    let revertTimeout: number | undefined;
    let restingText: string | undefined;

    watch(() => text, value => set(value));

    onMounted(() => {
        const element = labelRef.value;

        if (element) {
            buildSlotText(element, text);
        }
    });

    onBeforeUnmount(() => {
        window.clearTimeout(revertTimeout);

        const element = labelRef.value;

        if (element) {
            clearSlotText(element, text);
        }
    });

    function glyph(char: string): string {
        return char === ' ' ? NBSP : char;
    }

    // Sweep the hue across the line so the roll lands as a chromatic spectrum.
    function chromaticColor(index: number, total: number): string {
        const t = total <= 1 ? 0 : index / (total - 1);
        return `hsl(${(t * 320) % 360} 92% 60%)`;
    }

    function baseOptions(): AnimateOptions {
        return {
            direction,
            stagger,
            duration,
            exitOffset,
            easing,
            bounce,
            color: chromatic ? chromaticColor : color,
            colorFade,
            skipUnchanged,
            interrupt
        };
    }

    function makeFace(char: string): HTMLSpanElement {
        const face = document.createElement('span');
        face.className = $style.charFace;
        face.textContent = glyph(char);
        return face;
    }

    function buildSlot(char: string): HTMLSpanElement {
        const slot = document.createElement('span');
        slot.className = $style.charSlot;
        slot.dataset.char = char;

        // Invisible sizer keeps the cell exactly the width/height of its glyph,
        // so the absolutely-positioned animating faces never reflow the line.
        const sizer = document.createElement('span');
        sizer.className = $style.charSizer;
        sizer.textContent = glyph(char);

        slot.append(sizer, makeFace(char));
        return slot;
    }

    function buildSlotText(container: HTMLElement, value: string): void {
        container.classList.add($style.slotText);
        container.replaceChildren(...Array.from(value, buildSlot));
    }

    // Cancel any running roll on the container and snap it to its target text.
    function settle(container: HTMLElement): void {
        if (!state) {
            return;
        }

        state.timers.forEach(timer => window.clearTimeout(timer));

        // Rebuild a pristine DOM at the text the interrupted roll was heading
        // toward, so the next animation starts from a clean baseline.
        const target = state.target;
        state = null;
        buildSlotText(container, target);
    }

    function animateSlotText(container: HTMLElement, toText: string, options: AnimateOptions = {}): void {
        const {
            direction = 'down',
            stagger = 45,
            duration = 300,
            exitOffset = 50,
            easing = 'cubic-bezier(0.34, 1.56, 0.64, 1)',
            bounce = .6,
            color,
            colorFade = 280,
            skipUnchanged = true,
            interrupt = true
        } = options;

        // Reduced motion: swap to the new text without rolling.
        if (prefersReducedMotion()) {
            buildSlotText(container, toText);
            return;
        }

        // Non-interrupting mode: if a roll is already in flight, let it finish
        // and remember this request instead. Only the latest request survives,
        // so spam taps coalesce into a single follow-up roll once it lands.
        if (state && !interrupt) {
            if (toText !== state.target) {
                state.pending = {text: toText, options};
            }
            return;
        }

        // Interrupt: fast-forward any previous roll to its target and tear down
        // its timers before we start fresh.
        settle(container);

        // First run / empty container → just build it.
        if (!container.querySelector(`.${$style.charSlot}`)) {
            buildSlotText(container, toText);
            return;
        }

        const slots = Array.from(container.querySelectorAll<HTMLElement>(`.${$style.charSlot}`));
        const fromText = slots.map(slot => slot.dataset.char ?? '').join('');

        // Non-interrupting mode drops rolls to the text already on screen, so
        // repeated triggers do not visibly re-roll an unchanged label.
        if (!interrupt && fromText === toText) {
            return;
        }

        const maxLen = Math.max(fromText.length, toText.length);

        // Whole-pixel slide distance = one cell height, so glyphs clip cleanly.
        // Ceil, not round: half a pixel short leaves a sliver of the outgoing
        // glyph visible at the clip edge.
        const sample = slots.find(slot => (slot.dataset.char ?? '') !== '') ?? slots[0];
        const cs = getComputedStyle(container);
        const H = Math.ceil(
            sample?.getBoundingClientRect().height
            || sample?.offsetHeight
            || container.getBoundingClientRect().height
            || parseFloat(cs.lineHeight)
            || 0
        ) || Math.ceil(parseFloat(cs.fontSize) * 1.3) || 18;

        // Resting color to settle the chromatic flash back to.
        const restColor = color ? cs.color : '';

        // Pre-create any extra cells up front so the row never reflows mid-roll.
        for (let i = slots.length; i < maxLen; i++) {
            const slot = buildSlot('');
            container.appendChild(slot);
            slots.push(slot);
        }

        const timers: number[] = [];
        state = {timers, target: toText};

        // down: new enters from above (-H to 0), old exits below (0 to +H)
        // up:   new enters from below (+H to 0), old exits above (0 to -H)
        const outY = direction === 'down' ? H : -H;
        const inStart = direction === 'down' ? -H : H;

        // A tiny deterministic jitter in [-1, 1] per character. Scaled by
        // `bounce` it gives each glyph its own speed and a little tilt-wobble,
        // so the line does not land as one rigid block.
        const wobble = (index: number, salt: number): number => {
            const n = Math.sin((index + 1) * 12.9898 + salt * 78.233) * 43758.5453;
            return (n - Math.floor(n)) * 2 - 1;
        };

        // Track the slowest letter so the safety-net snap waits for everyone.
        let maxEnd = 0;

        for (let i = 0; i < maxLen; i++) {
            const fromChar = fromText[i] || '';
            const toChar = toText[i] || '';

            if (fromChar === toChar && (skipUnchanged || fromChar === '')) {
                continue;
            }

            const slot = slots[i];
            const sizer = slot.querySelector<HTMLElement>(`.${$style.charSizer}`)!;
            const oldFace = slot.querySelector<HTMLElement>(`.${$style.charFace}`);

            // Resize the cell to the new glyph — but ease the width instead of
            // snapping it, so a wide outgoing glyph is never cropped by a
            // suddenly-narrow cell and neighbours glide rather than jump.
            const oldW = slot.getBoundingClientRect().width;
            sizer.textContent = glyph(toChar);
            const newW = sizer.getBoundingClientRect().width;
            const widthChanges = Math.abs(newW - oldW) > .5;

            if (widthChanges) {
                slot.style.width = `${oldW}px`;
            }

            // A cell growing from or collapsing to empty changes width
            // drastically — clip it horizontally while it resizes so its glyph
            // wipes in/out with the cell instead of stacking onto the neighbours.
            if (fromChar === '' || toChar === '') {
                slot.classList.add($style.isResizing);
            }

            const tint = typeof color === 'function' ? color(i, maxLen) : color;

            // Per-letter personality: vary the speed, the stagger and a starting
            // tilt that springs back to upright as the glyph settles. Tail cells
            // (rolling out to nothing) join the same wave instead of queuing
            // behind it, so nothing trails.
            const isTail = toChar === '';
            const d = Math.round(duration * (isTail ? .75 : 1) * (1 + bounce * .45 * wobble(i, 1)));
            const staggerIndex = isTail ? toText.length * .5 + (i - toText.length) * .25 : i;
            const base = Math.round(staggerIndex * stagger * (1 + bounce * .25 * wobble(i, 2)));
            const tilt = (bounce * 5 * wobble(i, 3)).toFixed(2);

            const rollTrans = `transform ${d}ms ${easing}`;
            const trans = color ? `${rollTrans}, color ${colorFade}ms linear ${d}ms` : rollTrans;

            const newFace = makeFace(toChar);
            newFace.style.transformOrigin = '50% 50%';
            newFace.style.transform = `translateY(${inStart}px) rotate(${tilt}deg)`;

            if (tint) {
                newFace.style.color = tint;
            }

            slot.appendChild(newFace);

            void slot.offsetWidth; // commit start transforms

            // Glide the cell to its new width with a clean ease-out (no
            // overshoot) so it never pinches narrower than either glyph. Timing
            // depends on the kind of change:
            //  - glyph → glyph: resize alongside the roll.
            //  - glyph → empty: roll out at full width first, then snap closed.
            //  - empty → glyph: open the cell quickly before the glyph rolls in.
            if (widthChanges) {
                let wDelay = base;
                let wDur = d;

                if (isTail) {
                    wDelay = base + Math.round(d * .55);
                    wDur = Math.max(140, Math.round(d * .6));
                } else if (fromChar === '') {
                    wDur = Math.max(140, Math.round(d * .45));
                }

                timers.push(window.setTimeout(() => {
                    slot.style.transition = `width ${wDur}ms cubic-bezier(0.2, 0, 0, 1)`;
                    slot.style.width = `${newW}px`;
                }, wDelay));

                maxEnd = Math.max(maxEnd, wDelay + wDur);
            }

            maxEnd = Math.max(maxEnd, base + exitOffset + d + (color ? colorFade : 0));

            // Outgoing glyph slides away first (with its own little counter-tilt).
            if (oldFace) {
                timers.push(window.setTimeout(() => {
                    oldFace.style.transition = rollTrans;
                    oldFace.style.transform = `translateY(${outY}px) rotate(${-Number(tilt)}deg)`;
                }, base));
            }

            // Incoming glyph chases it in (and, if tinted, fades to rest after).
            timers.push(window.setTimeout(() => {
                newFace.style.transition = trans;
                newFace.style.transform = 'translateY(0) rotate(0deg)';

                if (color) {
                    newFace.style.color = restColor;
                }

                const done = (event: TransitionEvent): void => {
                    if (event.propertyName !== 'transform') {
                        return; // ignore the colour fade
                    }

                    newFace.removeEventListener('transitionend', done);
                    slot.dataset.char = toChar;
                    // Hand sizing back to the sizer (same px, nothing moves).
                    slot.style.removeProperty('transition');
                    slot.style.removeProperty('width');
                    slot.classList.remove($style.isResizing);
                    slot.querySelectorAll(`.${$style.charFace}`).forEach(face => {
                        if (face !== newFace) {
                            face.remove();
                        }
                    });
                };

                newFace.addEventListener('transitionend', done);
            }, base + exitOffset));
        }

        // Safety net: snap to a pristine DOM once the slowest letter settles. If
        // a non-interrupting call was deferred mid-roll, replay it now as a fresh
        // roll from this clean baseline.
        const total = maxEnd + 80;
        timers.push(window.setTimeout(() => {
            const pending = state?.pending;
            state = null;
            buildSlotText(container, toText);

            if (pending) {
                animateSlotText(container, pending.text, pending.options);
            }
        }, total));
    }

    function clearSlotText(container: HTMLElement, value = ''): void {
        settle(container);
        container.classList.remove($style.slotText);
        container.textContent = value;
    }

    // Roll to new text. Cancels any pending flash revert.
    function set(toText: string, options: AnimateOptions = {}): void {
        const element = labelRef.value;

        if (!element) {
            return;
        }

        window.clearTimeout(revertTimeout);
        restingText = undefined;
        animateSlotText(element, toText, {...baseOptions(), ...options});
    }

    // Roll to temporary text, then roll back automatically — the classic
    // Copy → Copied → Copy in one call. Spam-safe: repeat flashes restart the
    // revert timer instead of queuing extra rolls.
    function flash(toText: string, {revertAfter = 1400, enter, exit}: FlashOptions = {}): void {
        const element = labelRef.value;

        if (!element) {
            return;
        }

        // Capture the resting text only on the first flash of a burst, so a
        // flash-during-flash still reverts to the original label.
        if (restingText === undefined) {
            restingText = text;
        }

        animateSlotText(element, toText, {...baseOptions(), interrupt: false, ...enter});

        window.clearTimeout(revertTimeout);
        revertTimeout = window.setTimeout(() => {
            const back = restingText!;
            restingText = undefined;
            revertTimeout = undefined;

            const current = labelRef.value;

            if (current) {
                animateSlotText(current, back, {...baseOptions(), interrupt: false, ...exit});
            }
        }, revertAfter);
    }

    defineExpose({
        flash,
        set
    });
</script>
