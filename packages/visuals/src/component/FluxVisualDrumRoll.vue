<template>
    <span
        ref="label"
        :aria-label="text"
        :class="$style.drumRoll">{{ initialText }}</span>
</template>

<script
    lang="ts"
    setup>
    import { createDrumRollReel } from '@flux-ui/internals';
    import { onMounted, useTemplateRef, watch } from 'vue';
    import $style from '~flux/visuals/css/component/DrumRoll.module.scss';

    type DrumRollCell = ReturnType<typeof createDrumRollReel>;

    const {
        text,
        direction = 'auto',
        stagger = 40
    } = defineProps<{
        readonly text: string;
        readonly direction?: 'auto' | 'up' | 'down';
        readonly stagger?: number;
    }>();

    // The cells own the DOM after mount; a reactive {{ text }} would wipe them on every change.
    const initialText = text;

    const labelRef = useTemplateRef('label');
    let cells: DrumRollCell[] = [];

    watch(() => text, (next, previous) => roll(next, previous));

    onMounted(() => {
        const label = labelRef.value;

        if (!label) {
            return;
        }

        label.replaceChildren();
        cells = Array.from(text, char => {
            const cell = createDrumRollReel(label, $style.cell);
            cell(char, 0);

            return cell;
        });
    });

    function roll(next: string, previous: string): void {
        const label = labelRef.value;

        if (!label) {
            return;
        }

        const chars = Array.from(next);

        // Cells align at the end, so units stay on units when a number gains a digit.
        while (cells.length < chars.length) {
            const cell = createDrumRollReel(label, $style.cell);
            cell('', 0);
            label.prepend(label.lastElementChild!);
            cells.unshift(cell);
        }

        const offset = cells.length - chars.length;
        const sign = resolveDirection(next, previous);
        let rolled = 0;

        cells.forEach((cell, i) => {
            if (cell(i < offset ? '' : chars[i - offset], sign, rolled * stagger)) {
                rolled++;
            }
        });
    }

    // Auto compares the digits of both strings; text without digits rolls up.
    function resolveDirection(next: string, previous: string): number {
        if (direction !== 'auto') {
            return direction === 'up' ? 1 : -1;
        }

        const digits = (value: string): number => Number(value.replace(/[^\d-]/g, ''));
        const delta = digits(next) - digits(previous);

        return Number.isFinite(delta) && delta < 0 ? -1 : 1;
    }
</script>
