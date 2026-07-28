<template>
    <div
        ref="wrapper"
        :class="$style.swipeActions"
        :style="style">
        <div
            ref="row"
            :class="clsx($style.swipeActionsRow, isDragging && $style.isDragging)"
            tabindex="-1"
            @click.capture="onRowClickCapture">
            <slot/>
        </div>

        <div
            v-if="$slots.start"
            ref="start"
            :class="clsx($style.swipeActionsGroup, $style.isStart, armedSide === 'start' && $style.isArmed)"
            role="group"
            :aria-label="translate('flux.swipeActionsLeading')"
            @focusin="openTo('start')"
            @click="onGroupClick"
            @focusout="onGroupFocusOut">
            <slot name="start"/>
        </div>

        <div
            v-if="$slots.end"
            ref="end"
            :class="clsx($style.swipeActionsGroup, $style.isEnd, armedSide === 'end' && $style.isArmed)"
            role="group"
            :aria-label="translate('flux.swipeActionsTrailing')"
            @focusin="openTo('end')"
            @click="onGroupClick"
            @focusout="onGroupFocusOut">
            <slot name="end"/>
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { useResizeObserver } from '@basmilius/common';
    import { type DragContext, unrefTemplateElement, usePointerDrag, useSpring, useWheelDrag, warn } from '@flux-ui/internals';
    import { clsx } from 'clsx';
    import { computed, onMounted, onScopeDispose, provide, ref, toRef, unref, useTemplateRef, type VNode, watch } from 'vue';
    import { useDisabled } from '~flux/components/composable';
    import { elasticResistance, useTranslate } from '~flux/components/composable/private';
    import { FluxDisabledInjectionKey } from '~flux/components/data';
    import $style from '~flux/components/css/component/SwipeActions.module.scss';

    export type FluxSwipeActionsSide = 'start' | 'end';

    const ARM_HYSTERESIS = 6;
    const DRAG_THRESHOLD = 9;
    const FLICK_VELOCITY = .5;
    const MAX_ACTIONS = 3;

    // Travel over which the moving edge of the row rounds off completely.
    const ROUNDING_TRAVEL = 12;

    // The row gives way past its bounds, but never by as much as a single action is wide, so
    // an overdrag can never be mistaken for a row that opened. A side without actions has both
    // of its bounds at 0 and gives the same nudge.
    const OVERDRAG = {max: 36, range: 120} as const;

    const openSide = defineModel<FluxSwipeActionsSide | null>('open', {
        default: null
    });

    const {
        disabled: componentDisabled,
        threshold = 0.5
    } = defineProps<{
        readonly disabled?: boolean;
        readonly threshold?: number;
    }>();

    defineSlots<{
        default(): VNode[];
        end?(): VNode[];
        start?(): VNode[];
    }>();

    const endRef = useTemplateRef<HTMLElement>('end');
    const rowRef = useTemplateRef<HTMLElement>('row');
    const startRef = useTemplateRef<HTMLElement>('start');
    const wrapperRef = useTemplateRef<HTMLElement>('wrapper');

    const offset = useSpring(0);

    const directionFactor = ref(1);
    const isArmable = ref(true);
    const rowSize = ref(0);
    const area = ref<Record<FluxSwipeActionsSide, number>>({start: 0, end: 0});
    const hasPrimary = ref<Record<FluxSwipeActionsSide, boolean>>({start: false, end: false});

    let pendingFullSwipe: symbol | null = null;
    let stopSettleWatch: (() => void) | null = null;
    let maxOffset = 0;
    let minOffset = 0;
    let startOffset: number | null = null;
    let suppressClick = false;

    const disabled = useDisabled(toRef(() => componentDisabled));
    const translate = useTranslate();

    const {isDragging} = usePointerDrag(rowRef, {
        axis: 'x',
        rebaseOnThreshold: true,
        threshold: DRAG_THRESHOLD,
        onCancel: onDragCancel,
        onEnd: onPointerDragEnd,
        onMove: onDragMove,
        onStart: onDragStart
    });

    // A trackpad drives the same gesture from anywhere over the row, including the actions
    // that are already showing, so it listens on the wrapper instead of on the row.
    const {cancel: cancelWheel, isWheeling} = useWheelDrag(wrapperRef, {
        axis: 'x',
        onEnd: onDragEnd,
        onMove: onDragMove,
        onStart: onWheelStart
    });

    // Only the edge that the swipe reveals rounds off; the other one stays flush with the
    // corner of the surface the row sits in.
    const style = computed(() => {
        const value = unref(offset.value);
        const openness = Math.min(1, Math.abs(value) / ROUNDING_TRAVEL);
        const side = sideOf(value);

        return {
            '--swipe-offset': `${value}px`,
            '--swipe-dir': unref(directionFactor),
            '--swipe-open-start': side === 'start' ? openness : 0,
            '--swipe-open-end': side === 'end' ? openness : 0
        };
    });

    // The side that fires its primary action when the drag is released here, which is also
    // the side that folds its other actions away to make room.
    const armedSide = ref<FluxSwipeActionsSide | null>(null);

    provide(FluxDisabledInjectionKey, disabled);

    useResizeObserver(rowRef, onContentResize);
    useResizeObserver(startRef, onContentResize);
    useResizeObserver(endRef, onContentResize);

    // Arming takes the full threshold, disarming gives a little back, so a hand that trembles
    // on the threshold does not restart the fold of the other actions with every pixel.
    watch([offset.value, isArmable, hasPrimary], () => {
        const value = unref(offset.value);
        const side = sideOf(value);

        if (!unref(isArmable) || side === null || !unref(hasPrimary)[side]) {
            armedSide.value = null;
            return;
        }

        const distance = fullSwipeDistance(side) - (unref(armedSide) === side ? ARM_HYSTERESIS : 0);

        armedSide.value = Math.abs(value) >= distance ? side : null;
    }, {immediate: true});

    watch(openSide, side => {
        cancelFullSwipe(false);
        settle(side);
    });

    watch(disabled, value => {
        if (value) {
            cancelWheel();
            cancelFullSwipe(false);
            close();
        }
    });

    onMounted(() => {
        measure();
        offset.snap(targetFor(unref(openSide)));
    });

    // Nothing left to settle onto once the component is gone.
    onScopeDispose(() => cancelFullSwipe(false));

    // Everything a gesture needs before its first move, whichever device drives it.
    function beginGesture(allowFullSwipe: boolean): boolean {
        if (unref(disabled)) {
            return false;
        }

        cancelFullSwipe();
        measure();

        const size = unref(rowSize);
        const sizes = unref(area);
        const primaries = unref(hasPrimary);

        isArmable.value = allowFullSwipe;

        // Only a side that can be swiped through travels further than its actions; without a
        // primary action the elastic resistance starts right where the actions end.
        maxOffset = sizes.start === 0 ? 0 : allowFullSwipe && primaries.start ? size : sizes.start;
        minOffset = sizes.end === 0 ? 0 : -(allowFullSwipe && primaries.end ? size : sizes.end);

        // Where the row is picked up is only known once it actually moves, since the spring
        // may still be flying between here and the first move.
        startOffset = null;

        // A gesture that starts on an open row can only work that side, so swiping it shut
        // stops at the closed position instead of running on into the other side. Opening
        // that one takes a new gesture, once the row has come to rest.
        const from = sideOf(unref(offset.value));

        if (from === 'start') {
            minOffset = 0;
        } else if (from === 'end') {
            maxOffset = 0;
        }

        return true;
    }

    function close(): void {
        openSide.value = null;
        settle(null);
    }

    function fullSwipeDistance(side: FluxSwipeActionsSide): number {
        const size = unref(area)[side];

        return size + Math.max(0, unref(rowSize) - size) * threshold;
    }

    function groupOf(side: FluxSwipeActionsSide): HTMLElement | null {
        return unrefTemplateElement(side === 'start' ? startRef : endRef);
    }

    // A group is stretched to whatever the row has travelled, so its natural width is read
    // with that stretch taken off; `min-width: max-content` then holds it at its content.
    function naturalWidth(element: HTMLElement): number {
        const previous = element.style.width;

        element.style.width = '0';

        const width = element.offsetWidth;

        element.style.width = previous;

        return width;
    }

    function measure(): void {
        refreshDirection();

        rowSize.value = unrefTemplateElement(rowRef)?.offsetWidth ?? 0;

        const sizes = {start: 0, end: 0};
        const primaries = {start: false, end: false};

        for (const side of ['start', 'end'] as const) {
            const element = groupOf(side);

            if (!element) {
                continue;
            }

            sizes[side] = naturalWidth(element);
            primaries[side] = !!element.querySelector('[data-flux-swipe-primary]');

            if (import.meta.env.DEV) {
                const actions = element.querySelectorAll('[data-flux-swipe-action]');

                if (actions.length > MAX_ACTIONS) {
                    warn(`A swipe actions row shows ${actions.length} actions on its ${side} side, which is more than the ${MAX_ACTIONS} that fit.`);
                }

                if (element.querySelectorAll('[data-flux-swipe-primary]').length > 1) {
                    warn(`A swipe actions row marks more than one action on its ${side} side as primary. Only one action can grow with the swipe.`);
                }
            }
        }

        area.value = sizes;
        hasPrimary.value = primaries;
    }

    function openTo(side: FluxSwipeActionsSide): void {
        measure();

        openSide.value = side;
        settle(side);
    }

    function primaryAction(side: FluxSwipeActionsSide): HTMLElement | null {
        return groupOf(side)?.querySelector<HTMLElement>('[data-flux-swipe-primary]') ?? null;
    }

    function refreshDirection(): void {
        const element = unrefTemplateElement(rowRef);

        directionFactor.value = element && getComputedStyle(element).direction === 'rtl' ? -1 : 1;
    }

    function settle(side: FluxSwipeActionsSide | null, velocity?: number): void {
        offset.set(targetFor(side), velocity !== undefined ? {velocity} : {});
    }

    function sideOf(value: number): FluxSwipeActionsSide | null {
        return value > 0 ? 'start' : value < 0 ? 'end' : null;
    }

    function targetFor(side: FluxSwipeActionsSide | null): number {
        if (side === null) {
            return 0;
        }

        return side === 'start' ? unref(area).start : -unref(area).end;
    }

    // A full swipe is called off with the spring halfway to a position that is not an end
    // state, so the row is sent back to one. Only a caller that replaces the target itself,
    // or that tears the component down, passes false.
    function cancelFullSwipe(settleBack = true): void {
        const wasPending = pendingFullSwipe !== null;

        pendingFullSwipe = null;
        stopSettleWatch?.();
        stopSettleWatch = null;

        if (wasPending && settleBack) {
            settle(unref(openSide));
        }
    }

    async function fullSwipe(side: FluxSwipeActionsSide, velocity: number): Promise<void> {
        const action = primaryAction(side);

        if (!action) {
            openTo(side);
            return;
        }

        const size = unref(rowSize);
        const target = side === 'start' ? size : -size;
        const token = pendingFullSwipe = Symbol();

        offset.set(target, {velocity});

        await whenSettled(target);

        // A new drag or an unmount within the flight invalidates the token.
        if (pendingFullSwipe !== token) {
            return;
        }

        pendingFullSwipe = null;

        action.click();
        close();
    }

    function whenSettled(target: number): Promise<void> {
        return new Promise(resolve => {
            stopSettleWatch?.();
            stopSettleWatch = null;

            let isSettled = false;

            const stop = watch(offset.value, value => {
                if (Math.abs(value - target) >= 1) {
                    return;
                }

                isSettled = true;
                stopSettleWatch?.();
                stopSettleWatch = null;

                resolve();
            }, {immediate: true});

            // The immediate callback runs while `watch()` is still running, so a spring that
            // is already there, as it is under reduced motion, has no handle to stop yet.
            if (isSettled) {
                stop();
            } else {
                stopSettleWatch = stop;
            }
        });
    }

    // The browser took the gesture over, so no click follows it that has to be swallowed.
    function onDragCancel(): void {
        settle(unref(openSide));
    }

    // The groups grow and shrink with every pixel the row travels, so a reading only means
    // something once the row rests on the position its state asks for.
    function onContentResize(): void {
        if (unref(isDragging) || unref(isWheeling) || pendingFullSwipe || unref(offset.value) !== targetFor(unref(openSide))) {
            return;
        }

        measure();
        settle(unref(openSide));
    }

    function onDragEnd({vx}: DragContext): void {
        const value = unref(offset.value);
        const side = sideOf(value);

        if (side === null) {
            close();
            return;
        }

        const size = unref(area)[side];

        if (size === 0) {
            close();
            return;
        }

        // Towards the start is a positive offset, so a right-to-left row flips the sign of
        // the pointer's speed along with everything else.
        const velocity = vx * unref(directionFactor);
        const towardsOpen = side === 'start' ? velocity : -velocity;

        // A flick back towards the closed row takes the swipe back, armed or not, so a hand
        // that changes its mind never fires the primary action.
        if (towardsOpen < -FLICK_VELOCITY) {
            openSide.value = null;
            settle(null, velocity);
            return;
        }

        if (unref(armedSide) === side) {
            // A velocity pointing away from the target would launch the spring backwards.
            fullSwipe(side, side === 'start' ? Math.max(0, velocity) : Math.min(0, velocity));
            return;
        }

        if (towardsOpen > FLICK_VELOCITY) {
            openSide.value = side;
            settle(side, velocity);
            return;
        }

        if (Math.abs(value) >= size / 2) {
            openTo(side);
            return;
        }

        close();
    }

    function onDragMove({dx}: DragContext): void {
        // The pointer drag rebases on its threshold, so the row is taken over exactly where
        // the first move finds it, however far the spring got in the meantime.
        startOffset ??= unref(offset.value);

        const wanted = startOffset + dx * unref(directionFactor);
        const bounded = Math.min(maxOffset, Math.max(minOffset, wanted));

        offset.snap(bounded + elasticResistance(wanted - bounded, OVERDRAG));
    }

    function onDragStart(): boolean {
        // A pointer that goes down mid glide takes over from the trackpad, so both never
        // pull at the offset at once.
        cancelWheel();

        if (!beginGesture(true)) {
            return false;
        }

        suppressClick = false;

        return true;
    }

    function onPointerDragEnd(context: DragContext): void {
        suppressClick = true;
        onDragEnd(context);
    }

    // Two fingers carry no press to hold back with, so a swipe out of a closed row stops at
    // its actions. Only a row that is already open can be swiped through, which is a second
    // deliberate gesture and never a slip of the hand.
    function onWheelStart(): boolean {
        return !unref(isDragging) && beginGesture(unref(offset.value) !== 0);
    }

    // A drag ends in a click on whatever sits under the pointer. Swallowing that one click keeps
    // a swipe from also activating the row's own content.
    function onRowClickCapture(evt: MouseEvent): void {
        if (!suppressClick) {
            return;
        }

        suppressClick = false;

        evt.preventDefault();
        evt.stopPropagation();
    }

    // An action that has run leaves nothing to choose from, so the row closes behind it. The
    // button it sat on is clipped away with it, so a keyboard user is put back on the row.
    function onGroupClick(evt: MouseEvent): void {
        const action = (evt.target as Element).closest('[data-flux-swipe-action]');

        if (!action) {
            return;
        }

        if (action.contains(document.activeElement)) {
            unrefTemplateElement(rowRef)?.focus();
        }

        close();
    }

    function onGroupFocusOut(evt: FocusEvent): void {
        const group = evt.currentTarget as HTMLElement;

        if (group.contains(evt.relatedTarget as Node | null)) {
            return;
        }

        close();
    }
</script>
