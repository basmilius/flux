<script lang="ts">
    import { type PointerDragAxis, type PointerDragContext, useEventListener, usePointerDrag, useResizeObserver, useSpring } from '@basmilius/common';
    import { flattenVNodeTree } from '@flux-ui/internals';
    import { clsx } from 'clsx';
    import { Comment, computed, defineComponent, h, type PropType, ref, shallowRef, unref, type VNode, watch } from 'vue';
    import { elasticResistance, useTranslate } from '~flux/components/composable/private';
    import { FluxSheetTransition } from '~flux/components/transition';
    import { createDialogRenderer } from '~flux/components/util';
    import $style from '~flux/components/css/component/Sheet.module.scss';

    const DISMISS_RATIO = .35;
    const FLICK_VELOCITY = .5;
    const GRABBER_SELECTOR = '[data-flux-sheet-grabber]';
    const INTERACTIVE_SELECTOR = 'a, button, input, label, select, summary, textarea, [contenteditable], [role="button"], [role="slider"]';
    const MOUSE_THRESHOLD = 2;
    const TOUCH_THRESHOLD = 6;
    const WHEEL_IDLE = 120;
    const WHEEL_STEP = 40;

    const OVERDRAG = {max: 48, range: 120} as const;

    const ENTER_SPRING = {damping: 28} as const;

    export type FluxSheetPosition = 'bottom' | 'left' | 'right' | 'top';
    type DragOwner = 'undecided' | 'scroller' | 'sheet';

    const AXIS: Record<FluxSheetPosition, PointerDragAxis> = {bottom: 'y', left: 'x', right: 'x', top: 'y'};
    const SIGN: Record<FluxSheetPosition, 1 | -1> = {bottom: 1, left: -1, right: 1, top: -1};
    const GROW_KEY: Record<FluxSheetPosition, string> = {bottom: 'ArrowUp', left: 'ArrowRight', right: 'ArrowLeft', top: 'ArrowDown'};
    const SHRINK_KEY: Record<FluxSheetPosition, string> = {bottom: 'ArrowDown', left: 'ArrowLeft', right: 'ArrowRight', top: 'ArrowUp'};
    const POSITION_CLASS: Record<FluxSheetPosition, string> = {bottom: $style.isBottom, left: $style.isLeft, right: $style.isRight, top: $style.isTop};

    function nearestSnap(points: readonly number[], fraction: number): number {
        let nearest = 0;

        for (let index = 1; index < points.length; ++index) {
            if (Math.abs(points[index] - fraction) < Math.abs(points[nearest] - fraction)) {
                nearest = index;
            }
        }

        return nearest;
    }

    function scrollerWithin(target: Element, surface: HTMLElement, axis: PointerDragAxis): HTMLElement | null {
        for (let element: Element | null = target; element && element !== surface; element = element.parentElement) {
            if (!(element instanceof HTMLElement)) {
                continue;
            }

            if (axis === 'y' ? element.scrollHeight > element.clientHeight : element.scrollWidth > element.clientWidth) {
                return element;
            }
        }

        return null;
    }

    function scrollRoom(scroller: HTMLElement | null, axis: PointerDragAxis, delta: number): number {
        if (!scroller) {
            return 0;
        }

        const position = axis === 'y' ? scroller.scrollTop : scroller.scrollLeft;

        if (delta < 0) {
            return position;
        }

        return (axis === 'y' ? scroller.scrollHeight - scroller.clientHeight : scroller.scrollWidth - scroller.clientWidth) - position;
    }

    export default defineComponent({
        emits: ['close'],
        inheritAttrs: false,
        props: {
            isCloseable: {default: false, type: Boolean},
            isDraggable: {default: true, type: Boolean},
            position: {default: 'bottom', type: String as PropType<FluxSheetPosition>},
            snapPoints: {default: null, type: Array as PropType<readonly number[] | null>},
            viewKey: {default: null, type: String}
        },
        setup(props, {attrs, emit, slots}) {
            const translate = useTranslate();

            const surfaceRef = shallowRef<HTMLElement | null>(null);
            const surfaceSize = ref(0);
            const snapIndex = ref(0);
            const offset = useSpring(0);
            const isMoving = ref(false);

            let owner: DragOwner = 'undecided';
            let scroller: HTMLElement | null = null;
            let baseOffset = 0;
            let originTravel = 0;
            let previousTravel = 0;
            let pressedOnDialog = false;
            let closingAt: number | null = null;
            let wheelDelta = 0;
            let wheelIdleTimer: ReturnType<typeof setTimeout> | null = null;
            let wheelLocked = false;

            const axis = computed(() => AXIS[props.position]);
            const sign = computed(() => SIGN[props.position]);
            const snaps = computed(() => (props.snapPoints ?? []).filter(point => point > 0 && point <= 1).toSorted((first, second) => first - second));
            const activeIndex = computed(() => Math.min(unref(snapIndex), Math.max(0, unref(snaps).length - 1)));

            const surfaceStyle = computed(() => {
                const tallest = unref(snaps).at(-1);
                const size = tallest ? `${tallest * 100}%` : undefined;

                return {
                    '--sheet-offset': unref(surfaceSize) > 0 ? `${unref(offset.value)}px` : '100%',
                    height: unref(axis) === 'y' ? size : undefined,
                    width: unref(axis) === 'x' ? size : undefined
                };
            });

            usePointerDrag(surfaceRef, {
                axis: () => unref(axis),
                rebaseOnThreshold: true,
                threshold: evt => evt.pointerType === 'mouse' ? MOUSE_THRESHOLD : TOUCH_THRESHOLD,
                onCancel: release,
                onEnd: release,
                onMove: move,
                onStart: canDrag
            });

            const {dialogRef, getRegistration, render} = createDialogRenderer(
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
                                class: clsx($style.sheetSurface, $style.isSprung, POSITION_CLASS[props.position], unref(isMoving) && $style.isDragging),
                                style: unref(surfaceStyle)
                            }, [
                                props.isDraggable ? renderGrabber() : null,
                                ...children
                            ])
                        ];
                    }
                },
                () => clsx($style.sheet, POSITION_CLASS[props.position]),
                FluxSheetTransition
            );

            useEventListener(dialogRef, 'click', onDialogClick);
            useEventListener(dialogRef, 'pointerdown', evt => pressedOnDialog = evt.target === unref(dialogRef));
            useEventListener(surfaceRef, 'wheel', onWheel, {passive: false});

            useResizeObserver(surfaceRef, ([entry]) => {
                const box = entry.borderBoxSize[0];
                const size = unref(axis) === 'y' ? box?.blockSize ?? entry.contentRect.height : box?.inlineSize ?? entry.contentRect.width;
                const isFirst = unref(surfaceSize) === 0 && size > 0;

                surfaceSize.value = size;

                if (unref(isMoving) || closingAt !== null) {
                    return;
                }

                if (isFirst) {
                    offset.snap(size);
                    offset.set(restOffset(), ENTER_SPRING);

                    return;
                }

                offset.snap(restOffset());
            });

            watch(offset.value, value => {
                const lowest = restOffset(0);
                const travel = unref(surfaceSize) - lowest;

                getRegistration()?.setShadeOpacity(travel > 0 ? Math.min(1, Math.max(0, 1 - (value - lowest) / travel)) : 1);

                if (closingAt !== null && value === closingAt) {
                    closingAt = null;
                    emit('close');
                }
            });

            watch(surfaceRef, surface => {
                if (surface) {
                    return;
                }

                closingAt = null;
                snapIndex.value = 0;
                surfaceSize.value = 0;
                offset.snap(0);
            });

            const roomAway = () => scrollRoom(scroller, unref(axis), -unref(sign));
            const roomToward = () => scrollRoom(scroller, unref(axis), unref(sign));

            function scrollContent(amount: number): void {
                if (!scroller) {
                    return;
                }

                if (unref(axis) === 'y') {
                    scroller.scrollTop += amount;
                } else {
                    scroller.scrollLeft += amount;
                }
            }

            function travelOf({dx, dy}: PointerDragContext): number {
                return (unref(axis) === 'y' ? dy : dx) * unref(sign);
            }

            function canDrag(evt: PointerEvent): boolean {
                const surface = unref(surfaceRef);
                const target = evt.target;

                if (!props.isDraggable || !surface || !(target instanceof Element)) {
                    return false;
                }

                const isGrabber = !!target.closest(GRABBER_SELECTOR);

                if (!isGrabber && target.closest(INTERACTIVE_SELECTOR)) {
                    return false;
                }

                closingAt = null;
                owner = isGrabber ? 'sheet' : 'undecided';
                scroller = isGrabber ? null : scrollerWithin(target, surface, unref(axis));
                baseOffset = unref(offset.value);
                originTravel = 0;
                previousTravel = 0;

                return true;
            }

            function claim(travel: number): void {
                owner = 'sheet';
                baseOffset = unref(offset.value);
                originTravel = travel;
            }

            function move(context: PointerDragContext): void {
                const travel = travelOf(context);

                if (owner === 'undecided') {
                    if (roomAway() > 0) {
                        owner = 'scroller';
                    } else {
                        claim(travel);
                    }
                }

                if (owner === 'scroller') {
                    const isMovingAway = travel > previousTravel;

                    previousTravel = travel;

                    if (roomAway() > 0 || !isMovingAway) {
                        return;
                    }

                    claim(travel);
                }

                isMoving.value = true;

                const wanted = baseOffset + travel - originTravel;

                if (wanted >= 0) {
                    offset.set(wanted);

                    return;
                }

                if (roomToward() > 0) {
                    scrollContent(-wanted * unref(sign));
                    baseOffset = 0;
                    originTravel = travel;
                    offset.set(0);

                    return;
                }

                offset.set(elasticResistance(wanted, OVERDRAG));
            }

            function release(context?: PointerDragContext): void {
                const wasMoving = owner === 'sheet';

                owner = 'undecided';
                scroller = null;
                isMoving.value = false;

                if (!wasMoving) {
                    return;
                }

                if (!context) {
                    settle();

                    return;
                }

                const velocity = (unref(axis) === 'y' ? context.vy : context.vx) * unref(sign);
                const points = unref(snaps);
                const tallest = points.at(-1);
                const size = unref(surfaceSize);
                const value = unref(offset.value);

                if (tallest === undefined) {
                    if (velocity > FLICK_VELOCITY || value > size * DISMISS_RATIO) {
                        dismiss(velocity);
                    } else {
                        settle(velocity);
                    }

                    return;
                }

                const fraction = tallest * (1 - value / size);

                if (velocity > FLICK_VELOCITY) {
                    const below = points.findLastIndex(point => point < fraction);

                    if (below < 0) {
                        dismiss(velocity);
                    } else {
                        snapIndex.value = below;
                        settle(velocity);
                    }

                    return;
                }

                if (velocity < -FLICK_VELOCITY) {
                    const above = points.findIndex(point => point > fraction);

                    snapIndex.value = above < 0 ? points.length - 1 : above;
                    settle(velocity);

                    return;
                }

                if (fraction < points[0] * (1 - DISMISS_RATIO)) {
                    dismiss(velocity);

                    return;
                }

                snapIndex.value = nearestSnap(points, fraction);
                settle(velocity);
            }

            function dismiss(velocity?: number): void {
                if (!props.isCloseable) {
                    snapIndex.value = 0;
                    settle(velocity);

                    return;
                }

                if (velocity === undefined) {
                    emit('close');

                    return;
                }

                closingAt = unref(surfaceSize);
                offset.set(closingAt, {velocity});
            }

            function restOffset(index: number = unref(activeIndex)): number {
                const points = unref(snaps);
                const tallest = points.at(-1);

                if (tallest === undefined) {
                    return 0;
                }

                return (tallest - points[index]) / tallest * unref(surfaceSize);
            }

            function settle(velocity?: number): void {
                offset.set(restOffset(), velocity !== undefined ? {velocity} : undefined);
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
                settle();
            }

            function onDialogClick(evt: MouseEvent): void {
                if (!props.isCloseable || !pressedOnDialog || evt.target !== unref(dialogRef) || !getRegistration()?.isCurrent()) {
                    return;
                }

                emit('close');
            }

            function onGrabberKeyDown(evt: KeyboardEvent): void {
                const isGrow = evt.key === GROW_KEY[props.position];

                if (!isGrow && evt.key !== SHRINK_KEY[props.position]) {
                    return;
                }

                evt.preventDefault();
                step(isGrow ? 1 : -1);
            }

            function onWheel(evt: WheelEvent): void {
                const surface = unref(surfaceRef);
                const points = unref(snaps);

                if (!props.isDraggable || points.length < 2 || !surface || !(evt.target instanceof Element)) {
                    return;
                }

                const delta = unref(axis) === 'y' ? evt.deltaY : evt.deltaX;
                const index = unref(activeIndex);
                const room = scrollRoom(scrollerWithin(evt.target, surface, unref(axis)), unref(axis), delta);

                const direction = delta * unref(sign) < 0 ? -1 : 1;

                if (direction === 1 ? index === points.length - 1 : room > 0 || index === 0) {
                    return;
                }

                evt.preventDefault();

                if (wheelLocked) {
                    return;
                }

                wheelDelta = Math.sign(delta) === Math.sign(wheelDelta) ? wheelDelta + delta : delta;

                if (wheelIdleTimer !== null) {
                    clearTimeout(wheelIdleTimer);
                }

                wheelIdleTimer = setTimeout(() => {
                    wheelDelta = 0;
                    wheelLocked = false;
                }, WHEEL_IDLE);

                if (Math.abs(wheelDelta) < WHEEL_STEP) {
                    return;
                }

                wheelDelta = 0;
                wheelLocked = true;
                step(direction);
            }

            function renderGrabber(): VNode {
                return h('button', {
                    'aria-label': translate('flux.sheetGrabber'),
                    class: $style.sheetGrabber,
                    'data-flux-sheet-grabber': '',
                    type: 'button',
                    onClick: () => step(-1),
                    onKeydown: onGrabberKeyDown
                });
            }

            return render;
        }
    });
</script>
