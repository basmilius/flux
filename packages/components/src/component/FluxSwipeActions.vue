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
    import { type DragContext, unwrapElement, usePointerDrag, useResizeObserver, useSpring, useWheelDrag } from '@basmilius/common';
    import { animationFrameDebounce, clamp } from '@basmilius/utils';
    import { warn } from '@flux-ui/internals';
    import { clsx } from 'clsx';
    import { computed, onMounted, onScopeDispose, provide, ref, toRef, unref, useTemplateRef, type VNode, watch } from 'vue';
    import { useDisabled } from '~flux/components/composable';
    import { elasticResistance, useTranslate } from '~flux/components/composable/private';
    import { FluxDisabledInjectionKey } from '~flux/components/data';
    import $style from '~flux/components/css/component/SwipeActions.module.scss';

    export type FluxSwipeActionsSide = 'start' | 'end';

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

    const ARM_HYSTERESIS = 6;
    const DRAG_THRESHOLD = 9;
    const FLICK_VELOCITY = .5;
    const MAX_ACTIONS = 3;
    const ROUNDING_TRAVEL = 12;
    const OVERDRAG = {max: 36, range: 120} as const;

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
    const armedSide = ref<FluxSwipeActionsSide | null>(null);

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

    const {cancel: cancelWheel, isWheeling} = useWheelDrag(wrapperRef, {
        axis: 'x',
        onEnd: onDragEnd,
        onMove: onDragMove,
        onStart: onWheelStart
    });

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

    provide(FluxDisabledInjectionKey, disabled);

    const onContentResize = animationFrameDebounce(() => {
        if (unref(isDragging) || unref(isWheeling) || pendingFullSwipe || unref(offset.value) !== targetFor(unref(openSide))) {
            return;
        }

        measure();
        settle(unref(openSide));
    });

    useResizeObserver(rowRef, onContentResize);
    useResizeObserver(startRef, onContentResize);
    useResizeObserver(endRef, onContentResize);

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

    onScopeDispose(() => cancelFullSwipe(false));

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

        maxOffset = sizes.start === 0 ? 0 : allowFullSwipe && primaries.start ? size : sizes.start;
        minOffset = sizes.end === 0 ? 0 : -(allowFullSwipe && primaries.end ? size : sizes.end);

        startOffset = null;

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
        return unwrapElement(side === 'start' ? startRef : endRef);
    }

    function naturalWidth(element: HTMLElement): number {
        if (unref(offset.value) === 0) {
            return element.offsetWidth;
        }

        const previous = element.style.width;

        element.style.width = '0';

        const width = element.offsetWidth;

        element.style.width = previous;

        return width;
    }

    function measure(): void {
        refreshDirection();

        rowSize.value = unwrapElement(rowRef)?.offsetWidth ?? 0;

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
        const element = unwrapElement(rowRef);

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

            if (isSettled) {
                stop();
            } else {
                stopSettleWatch = stop;
            }
        });
    }

    function onDragCancel(): void {
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

        const velocity = vx * unref(directionFactor);
        const towardsOpen = side === 'start' ? velocity : -velocity;

        if (towardsOpen < -FLICK_VELOCITY) {
            openSide.value = null;
            settle(null, velocity);
            return;
        }

        if (unref(armedSide) === side) {
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
        startOffset ??= unref(offset.value);

        const wanted = startOffset + dx * unref(directionFactor);
        const bounded = clamp(wanted, minOffset, maxOffset);

        offset.snap(bounded + elasticResistance(wanted - bounded, OVERDRAG));
    }

    function onDragStart(): boolean {
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

    function onWheelStart(): boolean {
        return !unref(isDragging) && beginGesture(unref(offset.value) !== 0);
    }

    function onRowClickCapture(evt: MouseEvent): void {
        if (!suppressClick) {
            return;
        }

        suppressClick = false;

        evt.preventDefault();
        evt.stopPropagation();
    }

    function onGroupClick(evt: MouseEvent): void {
        const action = (evt.target as Element).closest('[data-flux-swipe-action]');

        if (!action) {
            return;
        }

        if (action.contains(document.activeElement)) {
            unwrapElement(rowRef)?.focus();
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
