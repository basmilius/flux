<template>
    <div
        ref="root"
        :class="clsx(
            $style.formFader,
            $style.formFaderFocusable,
            direction === 'vertical' && $style.isVertical,
            isDragging && $style.isDragging,
            disabled && $style.isDisabled,
            isReadonly && $style.isReadonly
        )"
        role="slider"
        :style="colorVars"
        :aria-disabled="disabled ? true : undefined"
        :aria-label="label ?? ariaLabel"
        :aria-orientation="direction"
        :aria-readonly="isReadonly ? true : undefined"
        :aria-valuemax="max"
        :aria-valuemin="min"
        :aria-valuenow="modelValue"
        :aria-valuetext="ariaValueText"
        :tabindex="disabled ? -1 : 0"
        @blur="focusVisible = false"
        @focus="onFocus"
        @keydown="onKeyDown"
        @pointerdown="onPointerDown">
        <div
            :class="$style.formFaderTrack"
            :style="{transform: overdragTransform, transformOrigin: overdragOrigin}">
            <div
                v-show="percentage > 0"
                :class="$style.formFaderFill"
                :style="fillStyle"/>

            <span
                :class="clsx($style.formFaderBar, barState && $style[barState])"
                :style="barStyle"/>

            <span
                v-for="tick of ticks"
                :key="tick.value"
                :class="$style.formFaderTick"
                :style="tickStyle(tick)">
                <span :class="$style.formFaderTickBase"/>
                <span
                    :class="$style.formFaderTickFill"
                    :style="{opacity: tick.filledOpacity}"/>
            </span>
        </div>

        <div :class="$style.formFaderOverlay">
            <FluxIcon
                v-if="iconLeading"
                :class="$style.formFaderIconLeading"
                :name="iconLeading"
                :size="16"/>

            <span
                v-if="label"
                ref="label"
                :class="$style.formFaderLabel">{{ label }}</span>

            <span
                v-if="!isValueHidden"
                ref="value"
                :class="$style.formFaderValue">{{ displayValue }}</span>

            <FluxIcon
                v-if="iconTrailing"
                :class="$style.formFaderIconTrailing"
                :name="iconTrailing"
                :size="16"/>
        </div>

        <div
            :class="$style.formFaderOverlayFill"
            :style="{clipPath: fillClip}"
            aria-hidden="true">
            <FluxIcon
                v-if="iconLeading"
                :class="$style.formFaderIconLeading"
                :name="iconLeading"
                :size="16"/>

            <span
                v-if="label"
                :class="$style.formFaderLabel">{{ label }}</span>

            <span
                v-if="!isValueHidden"
                :class="$style.formFaderValue">{{ displayValue }}</span>

            <FluxIcon
                v-if="iconTrailing"
                :class="$style.formFaderIconTrailing"
                :name="iconTrailing"
                :size="16"/>
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { formatNumber } from '@basmilius/utils';
    import { unrefTemplateElement } from '@flux-ui/internals';
    import type { FluxColor, FluxDirection, FluxFormInputBaseProps, FluxIconName } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { computed, type CSSProperties, nextTick, onBeforeUnmount, ref, toRef, unref, useTemplateRef, watch } from 'vue';
    import { useDisabled } from '~flux/components/composable';
    import { createFaderAnimator, FADER_BAR_INSET, faderBarLeft, faderBarStateClass, faderClampPark, faderFillEdgePx, faderRoundToDecimals, useFormFader } from '~flux/components/composable/private';
    import FluxIcon from './FluxIcon.vue';
    import $style from '~flux/components/css/component/FormFader.module.scss';

    const modelValue = defineModel<number>({
        required: true
    });

    const {
        color = 'primary',
        direction = 'horizontal',
        formatter = formatNumber,
        disabled: componentDisabled = false,
        isReadonly,
        isTicksVisible,
        isValueHidden,
        label,
        max = 100,
        min = 0,
        step = 1
    } = defineProps<Pick<FluxFormInputBaseProps, 'disabled' | 'error' | 'isLoading' | 'isReadonly' | 'name'> & {
        readonly formatter?: (value: number, decimals?: number) => string;

        readonly ariaLabel?: string;
        readonly color?: FluxColor;
        readonly direction?: FluxDirection;
        readonly iconLeading?: FluxIconName;
        readonly iconTrailing?: FluxIconName;
        readonly isTicksVisible?: boolean;
        readonly isValueHidden?: boolean;
        readonly label?: string;
        readonly max?: number;
        readonly min?: number;
        readonly step?: number;
    }>();

    const rootRef = useTemplateRef<HTMLElement>('root');
    const labelRef = useTemplateRef<HTMLElement>('label');
    const valueRef = useTemplateRef<HTMLElement>('value');

    const isDragging = ref(false);
    const isScrubbing = ref(false);
    const focusVisible = ref(false);
    const pointerId = ref<number | null>(null);

    let dragStart = 0;

    // `animated` eases toward the committed value so the fill and the value
    // read glide together on a snap; a live scrub feeds it instantly.
    const animated = ref(unref(modelValue));
    const animator = createFaderAnimator(animated);

    const disabled = useDisabled(toRef(() => componentDisabled));

    const {
        overdrag,
        trackLength,
        span,
        isRangeValid,
        decimals,
        pageStep,
        isSnappy,
        colorVars,
        snap,
        isDodging,
        measureZones
    } = useFormFader({
        rootRef,
        labelRef,
        valueRef,
        min: () => min,
        max: () => max,
        step: () => step,
        color: () => color,
        direction: () => direction
    });

    const {
        transform: overdragTransform,
        transformOrigin: overdragOrigin,
        update: updateOverdrag,
        reset: resetOverdrag
    } = overdrag;

    const showMarks = computed(() => isTicksVisible || unref(isSnappy));

    const percentage = computed(() => unref(isRangeValid) ? (unref(animated) - min) / unref(span) : 0);
    const displayValue = computed(() => formatter(faderRoundToDecimals(unref(animated), unref(decimals)), unref(decimals)));
    const ariaValueText = computed(() => formatter(unref(modelValue), unref(decimals)));
    const fillClip = computed(() => direction === 'vertical'
        ? `inset(calc(100% - ${unref(percentage) * 100}%) 0 0 0)`
        : `inset(0 calc(100% - ${unref(percentage) * 100}%) 0 0)`);

    const fillStyle = computed<CSSProperties>(() => direction === 'vertical'
        ? {height: `${unref(percentage) * 100}%`}
        : {width: `${unref(percentage) * 100}%`});

    const barLeft = computed(() => faderBarLeft(unref(percentage) * 100, -FADER_BAR_INSET));
    const barStyle = computed<CSSProperties>(() => direction === 'vertical'
        ? {bottom: unref(barLeft)}
        : {left: unref(barLeft)});

    // Bar center along the track for the dodge test, in the axis `isDodging`
    // expects (px from left when horizontal, px from top when vertical).
    const barCenter = computed(() => {
        const edge = faderClampPark(faderFillEdgePx(unref(percentage) * 100, unref(trackLength)) - FADER_BAR_INSET, unref(trackLength));

        return direction === 'vertical' ? unref(trackLength) - edge : edge;
    });
    const barState = computed(() => faderBarStateClass(isDodging(unref(barCenter)), unref(isDragging), unref(focusVisible)));

    function tickStyle(tick: {readonly percent: number; readonly visibility: number}): CSSProperties {
        return direction === 'vertical'
            ? {bottom: `${tick.percent}%`, opacity: tick.visibility}
            : {left: `${tick.percent}%`, opacity: tick.visibility};
    }

    const ticks = computed(() => {
        if (!unref(showMarks) || step <= 0 || !unref(isRangeValid)) {
            return [];
        }

        if (unref(span) / step > 100) {
            return [];
        }

        const vertical = direction === 'vertical';
        const length = unref(trackLength);
        const fillEdge = faderFillEdgePx(unref(percentage) * 100, length);
        const center = faderClampPark(fillEdge - FADER_BAR_INSET, length);

        const marks = [];

        // Walk the real step values between min and max, so a non-divisible
        // range still places its detents at their true positions.
        for (let index = 1; ; ++index) {
            const value = min + index * step;

            if (value >= max - 1e-9) {
                break;
            }

            const percent = ((value - min) / unref(span)) * 100;

            let filledOpacity: number;
            let visibility: number;

            if (length <= 0) {
                filledOpacity = value <= unref(modelValue) ? 1 : 0;
                visibility = Math.abs(percent - unref(percentage) * 100) < 0.001 ? 0 : 1;
            } else {
                const markPx = (percent / 100) * length;
                // The mark's px is measured from the fill's start (bottom when
                // vertical); `isDodging` reads from the top there, so flip it.
                const dodgePx = vertical ? length - markPx : markPx;
                filledOpacity = Math.min(1, Math.max(0, (fillEdge - markPx) / 8));
                // Hide marks that sit under the bar or under the label/value text.
                visibility = isDodging(dodgePx) ? 0 : Math.min(1, Math.max(0, (Math.abs(markPx - center) - 10) / 6));
            }

            marks.push({filledOpacity, percent, value, visibility});
        }

        return marks;
    });

    watch(modelValue, value => animator.animate(value, unref(isScrubbing) && !unref(isSnappy)));
    watch([ariaValueText, () => label], () => nextTick(measureZones));

    onBeforeUnmount(() => {
        animator.stop();
        document.removeEventListener('pointermove', onPointerMove);
        document.removeEventListener('pointercancel', onPointerUp);
        document.removeEventListener('pointerup', onPointerUp);
    });

    function setFromFraction(fraction: number): void {
        if (unref(disabled) || isReadonly || !unref(isRangeValid)) {
            return;
        }

        modelValue.value = snap(fraction * unref(span) + min);
    }

    function stepBy(delta: number): void {
        if (unref(disabled) || isReadonly || !unref(isRangeValid)) {
            return;
        }

        modelValue.value = snap(unref(modelValue) + delta);
    }

    function setTo(value: number): void {
        if (unref(disabled) || isReadonly || !unref(isRangeValid)) {
            return;
        }

        modelValue.value = snap(value);
    }

    function onFocus(evt: FocusEvent): void {
        focusVisible.value = (evt.target as HTMLElement).matches(':focus-visible');
    }

    function onKeyDown(evt: KeyboardEvent): void {
        if (unref(disabled) || isReadonly) {
            return;
        }

        switch (evt.key) {
            case 'ArrowDown':
            case 'ArrowLeft':
                stepBy(-step);
                break;

            case 'ArrowRight':
            case 'ArrowUp':
                stepBy(step);
                break;

            case 'PageDown':
                stepBy(-unref(pageStep));
                break;

            case 'PageUp':
                stepBy(unref(pageStep));
                break;

            case 'Home':
                setTo(min);
                break;

            case 'End':
                setTo(max);
                break;

            default:
                return;
        }

        evt.preventDefault();
    }

    function onPointerDown(evt: PointerEvent): void {
        if (unref(disabled) || isReadonly || evt.button !== 0) {
            return;
        }

        const root = unrefTemplateElement(rootRef);

        isDragging.value = true;
        isScrubbing.value = false;
        dragStart = direction === 'vertical' ? evt.clientY : evt.clientX;
        pointerId.value = evt.pointerId;
        root?.setPointerCapture?.(evt.pointerId);
        document.addEventListener('pointermove', onPointerMove);
        document.addEventListener('pointercancel', onPointerUp, {passive: true});
        document.addEventListener('pointerup', onPointerUp, {passive: true});
        onPointerMove(evt);
    }

    function onPointerMove(evt: PointerEvent): void {
        const root = unrefTemplateElement(rootRef);

        if (!unref(isDragging) || !root) {
            return;
        }

        const rect = root.getBoundingClientRect();
        const vertical = direction === 'vertical';
        const size = vertical ? rect.height : rect.width;

        if (size <= 0) {
            return;
        }

        const coord = vertical ? evt.clientY : evt.clientX;

        if (Math.abs(coord - dragStart) > 3) {
            isScrubbing.value = true;
        }

        // Bottom is the minimum when vertical, so invert the fraction.
        const fraction = vertical
            ? 1 - (coord - rect.top) / size
            : (coord - rect.left) / size;

        setFromFraction(Math.max(0, Math.min(1, fraction)));
        updateOverdrag(coord, rect);
        evt.preventDefault();
    }

    function onPointerUp(): void {
        const root = unrefTemplateElement(rootRef);

        if (pointerId.value !== null) {
            root?.releasePointerCapture?.(pointerId.value);
            pointerId.value = null;
        }

        isDragging.value = false;
        isScrubbing.value = false;
        resetOverdrag();
        document.removeEventListener('pointermove', onPointerMove);
        document.removeEventListener('pointercancel', onPointerUp);
        document.removeEventListener('pointerup', onPointerUp);
    }
</script>
