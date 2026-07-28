<template>
    <div :class="$style.swipeActions">
        <div
            ref="row"
            :class="clsx($style.swipeActionsRow, isDragging && $style.isDragging)"
            :style="{'--swipe-offset': `${translateX}px`}"
            @click.capture="onRowClickCapture">
            <slot/>
        </div>

        <div
            v-if="$slots.start"
            ref="start"
            :class="clsx($style.swipeActionsGroup, $style.isStart)"
            role="group"
            :aria-label="translate('flux.swipeActionsLeading')"
            @focusin="openTo('start')"
            @focusout="onGroupFocusOut">
            <slot name="start"/>
        </div>

        <div
            v-if="$slots.end"
            ref="end"
            :class="clsx($style.swipeActionsGroup, $style.isEnd)"
            role="group"
            :aria-label="translate('flux.swipeActionsTrailing')"
            @focusin="openTo('end')"
            @focusout="onGroupFocusOut">
            <slot name="end"/>
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { useResizeObserver } from '@basmilius/common';
    import { type PointerDragContext, prefersReducedMotion, unrefTemplateElement, usePointerDrag } from '@flux-ui/internals';
    import { clsx } from 'clsx';
    import { computed, onMounted, onScopeDispose, provide, ref, toRef, unref, useTemplateRef, type VNode, watch } from 'vue';
    import { useDisabled } from '~flux/components/composable';
    import { elasticResistance, useTranslate } from '~flux/components/composable/private';
    import { FluxDisabledInjectionKey } from '~flux/components/data';
    import $style from '~flux/components/css/component/SwipeActions.module.scss';

    type FluxSwipeActionsSide = 'start' | 'end';

    // Mirrors `--swipe-duration` in SwipeActions.module.scss.
    const SETTLE_DURATION = 360;
    const DRAG_THRESHOLD = 9;

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

    const directionFactor = ref(1);
    const offset = ref(0);

    let pendingFullSwipe: symbol | null = null;
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
        onEnd: onDragEnd,
        onMove: onDragMove,
        onStart: onDragStart
    });

    const translateX = computed(() => unref(offset) * unref(directionFactor));

    provide(FluxDisabledInjectionKey, disabled);

    useResizeObserver(rowRef, () => {
        if (unref(isDragging) || pendingFullSwipe) {
            return;
        }

        settle(unref(openSide));
    });

    watch(openSide, settle);
    watch(disabled, value => {
        if (value) {
            close();
        }
    });

    onMounted(() => settle(unref(openSide)));
    onScopeDispose(cancelFullSwipe);

    function actionArea(side: FluxSwipeActionsSide): number {
        return unrefTemplateElement(side === 'start' ? startRef : endRef)?.offsetWidth ?? 0;
    }

    function close(): void {
        openSide.value = null;
        settle(null);
    }

    function openTo(side: FluxSwipeActionsSide): void {
        openSide.value = side;
        settle(side);
    }

    function outermostAction(side: FluxSwipeActionsSide): HTMLElement | null {
        const group = unrefTemplateElement(side === 'start' ? startRef : endRef);
        const actions = group?.querySelectorAll<HTMLElement>('[data-flux-swipe-action]');

        if (!actions?.length) {
            return null;
        }

        return side === 'start' ? actions[0] : actions[actions.length - 1];
    }

    function refreshDirection(): void {
        const element = unrefTemplateElement(rowRef);

        directionFactor.value = element && getComputedStyle(element).direction === 'rtl' ? -1 : 1;
    }

    function rowWidth(): number {
        return unrefTemplateElement(rowRef)?.offsetWidth ?? 0;
    }

    function settle(side: FluxSwipeActionsSide | null): void {
        refreshDirection();

        if (side === null) {
            offset.value = 0;
            return;
        }

        offset.value = side === 'start' ? actionArea('start') : -actionArea('end');
    }

    function cancelFullSwipe(): void {
        pendingFullSwipe = null;
    }

    async function fullSwipe(side: FluxSwipeActionsSide): Promise<void> {
        const action = outermostAction(side);

        if (!action) {
            openTo(side);
            return;
        }

        refreshDirection();
        offset.value = side === 'start' ? rowWidth() : -rowWidth();

        const token = pendingFullSwipe = Symbol();

        if (!prefersReducedMotion()) {
            await new Promise(resolve => setTimeout(resolve, SETTLE_DURATION));
        }

        // A new drag or an unmount within the wait invalidates the token.
        if (pendingFullSwipe !== token) {
            return;
        }

        pendingFullSwipe = null;

        action.click();
        close();
    }

    function onDragCancel(): void {
        suppressClick = true;
        settle(unref(openSide));
    }

    function onDragEnd(): void {
        suppressClick = true;

        const value = unref(offset);
        const side = value > 0 ? 'start' : value < 0 ? 'end' : null;

        if (side === null) {
            close();
            return;
        }

        const area = actionArea(side);
        const distance = Math.abs(value);

        if (area === 0) {
            close();
            return;
        }

        if (distance >= area + Math.max(0, rowWidth() - area) * threshold) {
            fullSwipe(side);
            return;
        }

        if (distance >= area / 2) {
            openTo(side);
            return;
        }

        close();
    }

    function onDragMove({dx}: PointerDragContext): void {
        const wanted = startOffset + dx * unref(directionFactor);
        const bounded = Math.min(maxOffset, Math.max(minOffset, wanted));

        offset.value = bounded + elasticResistance(wanted - bounded, OVERDRAG);
    }

    function onDragStart(): boolean {
        if (unref(disabled)) {
            return false;
        }

        cancelFullSwipe();
        refreshDirection();

        const width = rowWidth();

        maxOffset = actionArea('start') > 0 ? width : 0;
        minOffset = actionArea('end') > 0 ? -width : 0;
        startOffset = unref(offset);
        suppressClick = false;

        return true;
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

    function onGroupFocusOut(evt: FocusEvent): void {
        const group = evt.currentTarget as HTMLElement;

        if (group.contains(evt.relatedTarget as Node | null)) {
            return;
        }

        close();
    }
</script>
