<template>
    <div
        :class="$style.viewport"
        data-prose-full>
        <div :class="$style.toolbar">
            <FluxSegmentedControl
                v-model="preset"
                size="small">
                <FluxSegmentedControlItem
                    v-for="option of PRESETS"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"/>
            </FluxSegmentedControl>

            <FluxSpacer/>

            <span :class="$style.readout">{{ stageWidth > 0 ? `${resolvedWidth} px` : '' }}</span>
        </div>

        <div
            ref="stage"
            :class="[$style.stage, isDragging && $style.isDragging]">
            <div
                :class="$style.frame"
                :style="{height: `${height}px`, width: frameWidth}">
                <iframe
                    :class="$style.document"
                    loading="lazy"
                    :src="src"
                    :title="title"/>

                <button
                    ref="handle"
                    :class="$style.handle"
                    type="button"
                    role="separator"
                    :aria-label="`Resize the ${title} viewport`"
                    aria-orientation="vertical"
                    :aria-valuemax="maxWidth"
                    :aria-valuemin="MIN_WIDTH"
                    :aria-valuenow="resolvedWidth"
                    :aria-valuetext="`${resolvedWidth} pixels`"
                    tabindex="0"
                    @keydown="onHandleKeyDown"/>
            </div>
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { usePointerDrag, useResizeObserver } from '@basmilius/common';
    import { FluxSegmentedControl, FluxSegmentedControlItem, FluxSpacer } from '@flux-ui/components';
    import { withBase } from 'vitepress';
    import { computed, ref, useTemplateRef } from 'vue';

    const MIN_WIDTH = 321;
    const STEP = 30;

    const PRESETS = [
        {label: '390', value: 390},
        {label: '768', value: 768},
        {label: '1024', value: 1024},
        {label: '1280', value: 1280},
        {label: 'Full', value: 'full'}
    ];

    const {path} = defineProps<{
        readonly height: number;
        readonly path: string;
        readonly title: string;
    }>();

    let dragStartWidth = 0;

    const handleRef = useTemplateRef<HTMLButtonElement>('handle');
    const stageRef = useTemplateRef<HTMLElement>('stage');

    const stageWidth = ref(0);
    const width = ref<number | null>(null);

    const maxWidth = computed(() => Math.max(MIN_WIDTH, stageWidth.value));
    const resolvedWidth = computed(() => Math.min(Math.max(width.value ?? maxWidth.value, MIN_WIDTH), maxWidth.value));

    // Before the stage is measured the frame has no honest pixel width to take, so it fills the row.
    const frameWidth = computed(() => stageWidth.value === 0 ? '100%' : `${resolvedWidth.value}px`);
    const src = computed(() => withBase(path));

    const preset = computed<string | number | undefined>({
        get: () => width.value ?? 'full',
        set: value => width.value = typeof value === 'number' ? value : null
    });

    const {isDragging} = usePointerDrag(handleRef, {
        axis: 'x',
        onStart() {
            dragStartWidth = resolvedWidth.value;
        },
        // The frame is centered, so it grows on both sides at once: the handle only
        // keeps up with the pointer when the width takes twice the travelled distance.
        onMove({dx}) {
            setWidth(dragStartWidth + dx * 2);
        }
    });

    useResizeObserver(stageRef, ([entry]) => stageWidth.value = Math.round(entry.contentRect.width));

    function setWidth(value: number): void {
        width.value = Math.min(Math.max(Math.round(value), MIN_WIDTH), maxWidth.value);
    }

    function onHandleKeyDown(evt: KeyboardEvent): void {
        const step = evt.shiftKey ? STEP * 3 : STEP;

        switch (evt.key) {
            case 'ArrowLeft':
                setWidth(resolvedWidth.value - step);
                break;

            case 'ArrowRight':
                setWidth(resolvedWidth.value + step);
                break;

            case 'Home':
                setWidth(MIN_WIDTH);
                break;

            case 'End':
                width.value = null;
                break;

            default:
                return;
        }

        evt.preventDefault();
    }
</script>

<style
    lang="scss"
    module>
    .viewport {
        display: flex;
        flex-flow: column;
        gap: 12px;
    }

    .toolbar {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .readout {
        min-width: 72px;
        color: var(--foreground-secondary);
        font-size: var(--font-size-small);
        font-variant-numeric: tabular-nums;
        text-align: end;
    }

    // The gutter holds the handle and keeps it out of the width the frame may take.
    // It sits on both sides so the frame is optically centered despite the handle
    // only hanging off the trailing edge.
    .stage {
        display: flex;
        padding-inline: 18px;
        justify-content: center;

        &.isDragging {
            cursor: col-resize;
            user-select: none;
        }
    }

    // The stroke is a shadow rather than a border, so the readout above is the width the iframe really gets.
    .frame {
        position: relative;
        max-width: 100%;
        flex: 0 0 auto;
        background: var(--surface);
        border-radius: var(--radius);
        box-shadow: 0 0 0 1px var(--surface-stroke);
    }

    .document {
        display: block;
        height: 100%;
        width: 100%;
        border: 0;
        border-radius: inherit;
    }

    .handle {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 100%;
        width: 18px;
        padding: 0;
        background: transparent;
        border: 0;
        cursor: col-resize;
        outline: 2px solid var(--focus-ring-transparent);
        outline-offset: 3px;
        touch-action: none;

        &::before {
            position: absolute;
            top: 50%;
            left: 6px;
            height: 42px;
            width: 6px;
            content: '';
            background: var(--surface-stroke-hover);
            border-radius: var(--radius-full);
            translate: 0 -50%;
            transition: var(--transition-default);
            transition-property: background;
        }

        &:hover::before,
        &:focus-visible::before {
            background: var(--primary-solid);
        }

        &:focus-visible {
            outline-color: var(--focus-ring);
        }
    }

    .isDragging .handle::before {
        background: var(--primary-solid);
    }
</style>
