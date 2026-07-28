<template>
    <div
        ref="wrapper"
        :class="$style.swipeActions"
        :style="style">
        <div
            ref="row"
            :class="clsx($style.swipeActionsRow, isDragging && $style.isDragging)"
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

    type FluxSwipeActionsSide = 'start' | 'end';

    const DRAG_THRESHOLD = 9;
    const FLICK_VELOCITY = .5;
    const MAX_ACTIONS = 3;

    // Travel over which the moving edge of the row rounds off completely.
    const ROUNDING_TRAVEL = 12;

    // Half the smallest action, so an overdragged row can never be mistaken for one that
    // opened. A side without actions has both of its bounds at 0 and gives the same nudge.
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
    let startOffset = 0;
    let suppressClick = false;

    const disabled = useDisabled(toRef(() => componentDisabled));
    const translate = useTranslate();

    const {isDragging} = usePointerDrag(rowRef, {
        axis: 'x',
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

    const style = computed(() => ({
        '--swipe-offset': `${unref(offset.value)}px`,
        '--swipe-dir': unref(directionFactor),
        '--swipe-open': Math.min(1, Math.abs(unref(offset.value)) / ROUNDING_TRAVEL)
    }));

    // The side that fires its primary action when the drag is released here, which is also
    // the side that folds its other actions away to make room.
    const armedSide = computed<FluxSwipeActionsSide | null>(() => {
        const value = unref(offset.value);
        const side = sideOf(value);

        if (!unref(isArmable) || side === null || !unref(hasPrimary)[side]) {
            return null;
        }

        return Math.abs(value) >= fullSwipeDistance(side) ? side : null;
    });

    provide(FluxDisabledInjectionKey, disabled);

    useResizeObserver(rowRef, () => {
        if (unref(isDragging) || unref(isWheeling) || pendingFullSwipe) {
            return;
        }

        measure();
        settle(unref(openSide));
    });

    watch(openSide, side => settle(side));
    watch(disabled, value => {
        if (value) {
            cancelWheel();
            close();
        }
    });

    onMounted(() => {
        measure();
        offset.snap(targetFor(unref(openSide)));
    });

    onScopeDispose(cancelFullSwipe);

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
        startOffset = unref(offset.value);

        // A gesture that starts on an open row can only work that side, so swiping it shut
        // stops at the closed position instead of running on into the other side. Opening
        // that one takes a new gesture, once the row has come to rest.
        const from = sideOf(startOffset);

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

    // A group is exactly as wide as the row has travelled, so its natural width can only be
    // read while the row is closed. Anywhere else the last reading stands.
    function measure(): void {
        refreshDirection();

        rowSize.value = unrefTemplateElement(rowRef)?.offsetWidth ?? 0;

        if (unref(offset.value) !== 0) {
            return;
        }

        const sizes = {start: 0, end: 0};
        const primaries = {start: false, end: false};

        for (const side of ['start', 'end'] as const) {
            const element = groupOf(side);

            if (!element) {
                continue;
            }

            sizes[side] = element.offsetWidth;
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

    function cancelFullSwipe(): void {
        pendingFullSwipe = null;
        stopSettleWatch?.();
        stopSettleWatch = null;
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

            stopSettleWatch = watch(offset.value, value => {
                if (Math.abs(value - target) >= 1) {
                    return;
                }

                stopSettleWatch?.();
                stopSettleWatch = null;

                resolve();
            }, {immediate: true});
        });
    }

    function onDragCancel(): void {
        suppressClick = true;
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

        if (unref(armedSide) === side) {
            fullSwipe(side, velocity);
            return;
        }

        if (towardsOpen > FLICK_VELOCITY) {
            openSide.value = side;
            settle(side, velocity);
            return;
        }

        if (towardsOpen < -FLICK_VELOCITY) {
            openSide.value = null;
            settle(null, velocity);
            return;
        }

        if (Math.abs(value) >= size / 2) {
            openTo(side);
            return;
        }

        close();
    }

    function onDragMove({dx}: DragContext): void {
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

    // An action that has run leaves nothing to choose from, so the row closes behind it.
    function onGroupClick(evt: MouseEvent): void {
        if (!(evt.target as Element).closest('[data-flux-swipe-action]')) {
            return;
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
