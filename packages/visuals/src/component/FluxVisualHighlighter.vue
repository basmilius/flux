<template>
    <span
        ref="target"
        :class="$style.highlighter">
        <slot/>
    </span>
</template>

<script
    lang="ts"
    setup>
    import { prefersReducedMotion, useInView } from '@flux-ui/internals';
    import type { HighlighterVariant } from '@flux-ui/types';
    import { annotate } from 'rough-notation';
    import { computed, onBeforeUnmount, onMounted, shallowRef, useTemplateRef, watch } from 'vue';
    import { type HighlighterGroupEntry, useHighlighterGroupInjection } from '~flux/visuals/composable/private';
    import $style from '~flux/visuals/css/component/Highlighter.module.scss';

    const emit = defineEmits<{
        hidden: [];
        shown: [];
    }>();

    // The annotation props deliberately have no destructure defaults: an unset
    // prop must stay distinguishable from an explicit one, so an enclosing group
    // can supply the value instead. The effective* computeds resolve the chain.
    const {
        variant,
        color,
        strokeWidth,
        animationDuration,
        iterations,
        padding,
        multiline,
        whenInView = false
    } = defineProps<{
        readonly variant?: HighlighterVariant;
        readonly color?: string;
        readonly strokeWidth?: number;
        readonly animationDuration?: number;
        readonly iterations?: number;
        readonly padding?: number;
        readonly multiline?: boolean;
        readonly whenInView?: boolean;
    }>();

    defineSlots<{
        default(): any;
    }>();

    const targetRef = useTemplateRef('target');

    const group = useHighlighterGroupInjection();

    // Standalone in-view tracking. In a group the parent owns the reveal timing,
    // so no observer is set up at all.
    const inView = group ? shallowRef(true) : useInView(targetRef, {initial: !whenInView});

    const effectiveVariant = computed(() => variant ?? group?.defaults.variant ?? 'highlight');
    const effectiveColor = computed(() => color ?? group?.defaults.color ?? 'var(--warning-200)');
    const effectiveStrokeWidth = computed(() => strokeWidth ?? group?.defaults.strokeWidth ?? 1.5);
    const effectiveAnimationDuration = computed(() => animationDuration ?? group?.defaults.animationDuration ?? 500);
    const effectiveIterations = computed(() => iterations ?? group?.defaults.iterations ?? 2);
    const effectivePadding = computed(() => padding ?? group?.defaults.padding ?? 2);
    const effectiveMultiline = computed(() => multiline ?? group?.defaults.multiline ?? true);

    let annotation: ReturnType<typeof annotate> | null = null;
    let entry: HighlighterGroupEntry | null = null;
    let observer: ResizeObserver | null = null;
    let settleTimer: number | undefined;
    let shownTimer: number | undefined;
    let revealed = false;

    // The annotation type is immutable, so any prop change rebuilds it from scratch.
    watch([effectiveVariant, effectiveColor, effectiveStrokeWidth, effectiveAnimationDuration, effectiveIterations, effectivePadding, effectiveMultiline], () => build());

    // Standalone reveal once the element scrolls into view (whenInView).
    watch(inView, () => {
        if (!group) {
            reveal();
        }
    });

    onMounted(() => {
        const element = targetRef.value;

        if (group && element) {
            entry = {element, getAnnotation: () => annotation};
            group.add(entry);
        }

        build();
    });

    onBeforeUnmount(() => {
        if (group && entry) {
            group.remove(entry);
            entry = null;
        }

        window.clearTimeout(shownTimer);
        stopSettleWatch();
        annotation?.remove();
        annotation = null;
    });

    // rough-notation has no completion callback, so shown is emitted after the
    // draw animation's duration, or immediately when it draws without animation.
    function emitShown(): void {
        window.clearTimeout(shownTimer);

        if (prefersReducedMotion()) {
            emit('shown');
            return;
        }

        shownTimer = window.setTimeout(() => emit('shown'), effectiveAnimationDuration.value);
    }

    function show(): void {
        if (!annotation) {
            return;
        }

        revealed = true;
        stopSettleWatch();
        annotation.show();
        emitShown();
    }

    function hide(): void {
        if (!annotation) {
            return;
        }

        window.clearTimeout(shownTimer);
        annotation.hide();
        emit('hidden');
    }

    function replay(): void {
        if (!annotation) {
            return;
        }

        annotation.hide();
        annotation.show();
        emitShown();
    }

    // Standalone: draw once, with the intro animation, on the final geometry.
    // rough-notation keeps the drawn annotation aligned on later resizes itself.
    function reveal(): void {
        if (revealed || !annotation || !inView.value) {
            return;
        }

        show();
    }

    function stopSettleWatch(): void {
        window.clearTimeout(settleTimer);
        observer?.disconnect();
        observer = null;
    }

    function build(): void {
        annotation?.remove();
        annotation = null;
        stopSettleWatch();
        revealed = false;

        const element = targetRef.value;

        if (!element) {
            return;
        }

        annotation = annotate(element, {
            type: effectiveVariant.value,
            color: effectiveColor.value,
            strokeWidth: effectiveStrokeWidth.value,
            animationDuration: effectiveAnimationDuration.value,
            iterations: effectiveIterations.value,
            padding: effectivePadding.value,
            multiline: effectiveMultiline.value,
            animate: !prefersReducedMotion()
        });

        // In a group the parent collects the annotations and drives the cascade.
        if (group) {
            group.notify();
            return;
        }

        if (typeof ResizeObserver === 'undefined') {
            reveal();
            return;
        }

        // The surrounding chrome (preview panels, web-font swaps) can reflow right
        // after mount, which would otherwise play the intro animation where the
        // text sat *before* it settled. Debounce until the layout is quiet, then
        // draw on the final geometry.
        observer = new ResizeObserver(() => {
            window.clearTimeout(settleTimer);
            settleTimer = window.setTimeout(() => reveal(), 80);
        });
        observer.observe(element);
        observer.observe(document.body);
    }

    defineExpose({
        hide,
        replay,
        show
    });
</script>
