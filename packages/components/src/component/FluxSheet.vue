<script lang="ts">
    import { flattenVNodeTree, type PointerDragContext, usePointerDrag } from '@flux-ui/internals';
    import { clsx } from 'clsx';
    import { Comment, computed, defineComponent, h, type PropType, ref, shallowRef, unref, type VNode, watch } from 'vue';
    import { elasticResistance, useTranslate } from '~flux/components/composable/private';
    import { FluxBottomSheetTransition } from '~flux/components/transition';
    import { createDialogRenderer } from '~flux/components/util';
    import $style from '~flux/components/css/component/BottomSheet.module.scss';

    const DISMISS_RATIO = .35;
    const FLICK_VELOCITY = .5;
    const FLICK_WINDOW = 90;
    const GRABBER_SELECTOR = '[data-flux-bottom-sheet-grabber]';
    const INTERACTIVE_SELECTOR = 'a, button, input, label, select, summary, textarea, [contenteditable], [role="button"], [role="slider"]';
    const THRESHOLD = 6;

    // `max` mirrors the solid strip below the sheet in BottomSheet.module.scss; lifting the
    // sheet further than that strip is long would open a gap under it.
    const OVERDRAG = {max: 48, range: 120} as const;

    function nearestSnap(points: readonly number[], fraction: number): number {
        let nearest = 0;

        for (let index = 1; index < points.length; ++index) {
            if (Math.abs(points[index] - fraction) < Math.abs(points[nearest] - fraction)) {
                nearest = index;
            }
        }

        return nearest;
    }

    export default defineComponent({
        emits: ['close'],
        inheritAttrs: false,
        props: {
            isCloseable: {default: false, type: Boolean},
            isDraggable: {default: true, type: Boolean},
            snapPoints: {default: null, type: Array as PropType<readonly number[] | null>},
            viewKey: {default: null, type: String}
        },
        setup(props, {attrs, emit, slots}) {
            const translate = useTranslate();

            const surfaceRef = shallowRef<HTMLElement | null>(null);
            const dragOffset = ref<number | null>(null);
            const snapIndex = ref(0);

            let sessionHeight = 0;
            let lastTime = 0;
            let lastY = 0;
            let velocity = 0;

            const snaps = computed(() => (props.snapPoints ?? []).filter(point => point > 0 && point <= 1).toSorted((first, second) => first - second));
            const activeIndex = computed(() => Math.min(unref(snapIndex), Math.max(0, unref(snaps).length - 1)));

            const surfaceStyle = computed(() => {
                const tallest = unref(snaps).at(-1);
                const offset = unref(dragOffset);

                return {
                    '--sheet-offset': offset !== null ? `${offset}px` : `${restOffset(100)}%`,
                    height: tallest ? `${tallest * 100}%` : undefined
                };
            });

            const {isDragging} = usePointerDrag(surfaceRef, {
                axis: 'y',
                threshold: THRESHOLD,
                onCancel: () => dragOffset.value = null,
                onEnd: release,
                onMove: move,
                onStart: canDrag
            });

            watch(surfaceRef, surface => {
                if (surface) {
                    return;
                }

                dragOffset.value = null;
                snapIndex.value = 0;
            });

            function canDrag(evt: PointerEvent): boolean {
                const surface = unref(surfaceRef);
                const target = evt.target;

                if (!props.isDraggable || !surface || !(target instanceof Element)) {
                    return false;
                }

                if (!target.closest(GRABBER_SELECTOR)) {
                    if (target.closest(INTERACTIVE_SELECTOR)) {
                        return false;
                    }

                    // A downward drag from the content would fight the scroller it started in.
                    for (let element: Element | null = target; element && element !== surface; element = element.parentElement) {
                        if (element.scrollTop > 0) {
                            return false;
                        }
                    }
                }

                sessionHeight = surface.offsetHeight;
                lastTime = evt.timeStamp;
                lastY = evt.clientY;
                velocity = 0;

                return true;
            }

            function move({dy, event}: PointerDragContext): void {
                const elapsed = event.timeStamp - lastTime;

                if (elapsed > 0) {
                    velocity = (event.clientY - lastY) / elapsed;
                    lastTime = event.timeStamp;
                    lastY = event.clientY;
                }

                const wanted = restOffset(sessionHeight) + dy - Math.sign(dy) * THRESHOLD;

                // Above the tallest snap point there is nowhere left to rest, so the sheet
                // keeps following the pointer with resistance and springs back on release.
                dragOffset.value = wanted < 0 ? elasticResistance(wanted, OVERDRAG) : wanted;
            }

            function release({event}: PointerDragContext): void {
                const points = unref(snaps);
                const tallest = points.at(-1);
                const offset = unref(dragOffset) ?? 0;

                dragOffset.value = null;

                if (event.timeStamp - lastTime > FLICK_WINDOW) {
                    velocity = 0;
                }

                if (tallest === undefined) {
                    if (velocity > FLICK_VELOCITY || offset > sessionHeight * DISMISS_RATIO) {
                        dismiss();
                    }

                    return;
                }

                const fraction = tallest * (1 - offset / sessionHeight);

                if (velocity > FLICK_VELOCITY) {
                    const below = points.findLastIndex(point => point < fraction);

                    if (below < 0) {
                        dismiss();
                    } else {
                        snapIndex.value = below;
                    }

                    return;
                }

                if (velocity < -FLICK_VELOCITY) {
                    const above = points.findIndex(point => point > fraction);

                    snapIndex.value = above < 0 ? points.length - 1 : above;

                    return;
                }

                if (fraction < points[0] * (1 - DISMISS_RATIO)) {
                    dismiss();

                    return;
                }

                snapIndex.value = nearestSnap(points, fraction);
            }

            function dismiss(): void {
                if (!props.isCloseable) {
                    snapIndex.value = 0;

                    return;
                }

                emit('close');
            }

            function restOffset(height: number): number {
                const points = unref(snaps);
                const tallest = points.at(-1);

                if (tallest === undefined) {
                    return 0;
                }

                return (tallest - points[unref(activeIndex)]) / tallest * height;
            }

            function step(direction: 1 | -1): void {
                const next = unref(activeIndex) + direction;

                if (next < 0) {
                    dismiss();

                    return;
                }

                if (next >= unref(snaps).length) {
                    return;
                }

                snapIndex.value = next;
            }

            function onGrabberKeyDown(evt: KeyboardEvent): void {
                if (evt.key !== 'ArrowDown' && evt.key !== 'ArrowUp') {
                    return;
                }

                evt.preventDefault();
                step(evt.key === 'ArrowUp' ? 1 : -1);
            }

            function renderGrabber(): VNode {
                return h('button', {
                    'aria-label': translate('flux.bottomSheetGrabber'),
                    class: $style.bottomSheetGrabber,
                    'data-flux-bottom-sheet-grabber': '',
                    type: 'button',
                    onClick: () => step(-1),
                    onKeydown: onGrabberKeyDown
                });
            }

            return createDialogRenderer(
                attrs,
                props,
                emit,
                {
                    default: () => {
                        const children = flattenVNodeTree(slots.default?.() ?? []);

                        if (!children.some(child => child.type !== Comment)) {
                            return children;
                        }

                        return [
                            h('div', {
                                ref: surfaceRef,
                                class: clsx($style.bottomSheetSurface, unref(isDragging) && $style.isDragging),
                                style: unref(surfaceStyle)
                            }, [
                                props.isDraggable ? renderGrabber() : null,
                                ...children
                            ])
                        ];
                    }
                },
                $style.bottomSheet,
                FluxBottomSheetTransition
            );
        }
    });
</script>
