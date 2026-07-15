<template>
    <span
        ref="label"
        :aria-label="text"
        :class="$style.textScramble">{{ initialText }}</span>
</template>

<script
    lang="ts"
    setup>
    import { prefersReducedMotion } from '@flux-ui/internals';
    import { onBeforeUnmount, useTemplateRef, watch } from 'vue';
    import $style from '~flux/visuals/css/component/TextScramble.module.scss';

    type ScrambleCell = {
        from: string;
        to: string;
        start: number;
        end: number;
        char: string;
        lastSwap: number;
        fixed: boolean;
    };

    const emit = defineEmits<{
        finished: [];
    }>();

    const {
        text,
        characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
        duration = 900,
        skipUnchanged = true,
        speed = 45,
        stagger = 0.5
    } = defineProps<{
        readonly text: string;
        readonly characters?: string;
        readonly duration?: number;
        readonly skipUnchanged?: boolean;
        readonly speed?: number;
        readonly stagger?: number;
    }>();

    // Rendered once for SSR / first paint only. The engine owns the span's text
    // after mount, so this must NOT be reactive - a reactive {{ text }} would make
    // Vue re-patch the text node every frame and wipe the scramble. The accessible
    // name stays current through the reactive :aria-label binding.
    const initialText = text;

    const labelRef = useTemplateRef('label');

    let frame = 0;
    let currentText = text;

    watch(() => text, value => set(value));

    onBeforeUnmount(cancel);

    function cancel(): void {
        if (frame) {
            cancelAnimationFrame(frame);
            frame = 0;
        }
    }

    function randomChar(): string {
        return characters.charAt(Math.floor(Math.random() * characters.length));
    }

    // Decode `toText` character by character. Each cell holds its old glyph until
    // its staggered start, cycles through random glyphs, then settles on its
    // final glyph. `force` re-scrambles even unchanged cells, for replay().
    function scramble(element: HTMLElement, fromText: string, toText: string, force = false): void {
        cancel();

        // Reduced motion or no duration: swap straight to the final text.
        if (duration <= 0 || prefersReducedMotion()) {
            element.textContent = toText;
            emit('finished');
            return;
        }

        const maxLen = Math.max(fromText.length, toText.length);
        const spread = Math.min(Math.max(stagger, 0), 1);
        const revealWindow = duration * spread;
        const scrambleFor = duration - revealWindow;
        const cells: ScrambleCell[] = [];

        for (let i = 0; i < maxLen; ++i) {
            const from = fromText.charAt(i);
            const to = toText.charAt(i);

            if (!force && skipUnchanged && from !== '' && from === to) {
                cells.push({from, to, start: 0, end: 0, char: to, lastSwap: 0, fixed: true});
                continue;
            }

            const start = maxLen <= 1 ? 0 : (i / (maxLen - 1)) * revealWindow;
            cells.push({from, to, start, end: start + scrambleFor, char: '', lastSwap: -Infinity, fixed: false});
        }

        const startTime = performance.now();

        const step = (now: number): void => {
            const elapsed = now - startTime;
            let output = '';
            let done = 0;

            for (const cell of cells) {
                if (cell.fixed || elapsed >= cell.end) {
                    output += cell.to;
                    ++done;
                } else if (elapsed >= cell.start) {
                    if (now - cell.lastSwap >= speed) {
                        cell.char = randomChar();
                        cell.lastSwap = now;
                    }

                    output += cell.char;
                } else {
                    output += cell.from;
                }
            }

            element.textContent = output;

            if (done === cells.length) {
                frame = 0;
                emit('finished');
                return;
            }

            frame = requestAnimationFrame(step);
        };

        frame = requestAnimationFrame(step);
    }

    // Decode toward new text permanently, scrambling from the text on screen.
    function set(toText: string): void {
        const element = labelRef.value;

        if (!element) {
            return;
        }

        const fromText = currentText;
        currentText = toText;
        scramble(element, fromText, toText);
    }

    // Re-run the decode on the current text without changing it.
    function replay(): void {
        const element = labelRef.value;

        if (!element) {
            return;
        }

        scramble(element, currentText, currentText, true);
    }

    defineExpose({
        replay,
        set
    });
</script>
