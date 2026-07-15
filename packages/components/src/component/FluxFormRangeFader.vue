<template>
    <div
        ref="root"
        :class="clsx(
            $style.formFader,
            direction === 'vertical' && $style.isVertical,
            (isDraggingLower || isDraggingUpper) && $style.isDragging,
            disabled && $style.isDisabled,
            isReadonly && $style.isReadonly
        )"
        role="group"
        :style="colorVars"
        :aria-disabled="disabled ? true : undefined"
        :aria-label="label ?? ariaLabel"
        @pointerdown="onPointerDown">
        <div
            :class="$style.formFaderTrack"
            :style="{transform: overdragTransform, transformOrigin: overdragOrigin}">
            <div
                :class="$style.formFaderFill"
                :style="fillStyle"/>

            <span
                :class="clsx($style.formFaderBar, lowerState && $style[lowerState])"
                :style="barStyleLower"/>

            <span
                :class="clsx($style.formFaderBar, upperState && $style[upperState])"
                :style="barStyleUpper"/>

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

        <button
            :class="$style.formFaderThumb"
            :style="thumbStyleLower"
            role="slider"
            :aria-disabled="disabled ? true : undefined"
            :aria-label="translate('flux.lowerBound')"
            :aria-orientation="direction"
            :aria-readonly="isReadonly ? true : undefined"
            :aria-valuemax="modelValue[1] - distance"
            :aria-valuemin="min"
            :aria-valuenow="modelValue[0]"
            :aria-valuetext="formatter(modelValue[0], decimals)"
            :tabindex="disabled ? -1 : 0"
            type="button"
            @blur="focusVisibleLower = false"
            @focus="onFocus('lower', $event)"
            @keydown="onKeyDown('lower', $event)"
            @pointerdown="!disabled && !isReadonly && (isDraggingLower = true)"/>

        <button
            :class="$style.formFaderThumb"
            :style="thumbStyleUpper"
            role="slider"
            :aria-disabled="disabled ? true : undefined"
            :aria-label="translate('flux.upperBound')"
            :aria-orientation="direction"
            :aria-readonly="isReadonly ? true : undefined"
            :aria-valuemax="max"
            :aria-valuemin="modelValue[0] + distance"
            :aria-valuenow="modelValue[1]"
            :aria-valuetext="formatter(modelValue[1], decimals)"
            :tabindex="disabled ? -1 : 0"
            type="button"
            @blur="focusVisibleUpper = false"
            @focus="onFocus('upper', $event)"
            @keydown="onKeyDown('upper', $event)"
            @pointerdown="!disabled && !isReadonly && (isDraggingUpper = true)"/>

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
    import { createFaderAnimator, FADER_BAR_INSET, faderBarLeft, faderBarStateClass, faderClampPark, faderRoundToDecimals, useFormFader, useTranslate } from '~flux/components/composable/private';
    import FluxIcon from './FluxIcon.vue';
    import $style from '~flux/components/css/component/FormFader.module.scss';

    const modelValue = defineModel<[number, number]>({
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
        minDistance = 0,
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
        readonly minDistance?: number;
        readonly step?: number;
    }>();

    const rootRef = useTemplateRef<HTMLElement>('root');
    const labelRef = useTemplateRef<HTMLElement>('label');
    const valueRef = useTemplateRef<HTMLElement>('value');

    const isDraggingLower = ref(false);
    const isDraggingUpper = ref(false);
    const isScrubbing = ref(false);
    const focusVisibleLower = ref(false);
    const focusVisibleUpper = ref(false);
    const pointerId = ref<number | null>(null);

    let dragStart = 0;

    // Each bound eases toward its committed value so the fill and the value
    // read glide together on a snap; a live scrub feeds them instantly.
    const animatedLower = ref(unref(modelValue)[0]);
    const animatedUpper = ref(unref(modelValue)[1]);
    const lowerAnimator = createFaderAnimator(animatedLower);
    const upperAnimator = createFaderAnimator(animatedUpper);

    const disabled = useDisabled(toRef(() => componentDisabled));
    const translate = useTranslate();

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

    const distance = computed(() => Math.max(0, minDistance, step));
    const showMarks = computed(() => isTicksVisible || unref(isSnappy));

    const percentageLower = computed(() => unref(isRangeValid) ? (unref(animatedLower) - min) / unref(span) : 0);
    const percentageUpper = computed(() => unref(isRangeValid) ? (unref(animatedUpper) - min) / unref(span) : 0);

    const displayValue = computed(() => `${formatter(faderRoundToDecimals(unref(animatedLower), unref(decimals)), unref(decimals))} - ${formatter(faderRoundToDecimals(unref(animatedUpper), unref(decimals)), unref(decimals))}`);
    const fillClip = computed(() => direction === 'vertical'
        ? `inset(calc(100% - ${unref(percentageUpper) * 100}%) 0 ${unref(percentageLower) * 100}% 0)`
        : `inset(0 calc(100% - ${unref(percentageUpper) * 100}%) 0 ${unref(percentageLower) * 100}%)`);

    const fillStyle = computed<CSSProperties>(() => direction === 'vertical'
        ? {bottom: `${unref(percentageLower) * 100}%`, height: `${(unref(percentageUpper) - unref(percentageLower)) * 100}%`}
        : {left: `${unref(percentageLower) * 100}%`, width: `${(unref(percentageUpper) - unref(percentageLower)) * 100}%`});

    const barLeftLower = computed(() => faderBarLeft(unref(percentageLower) * 100, FADER_BAR_INSET));
    const barLeftUpper = computed(() => faderBarLeft(unref(percentageUpper) * 100, -FADER_BAR_INSET));

    const barStyleLower = computed<CSSProperties>(() => direction === 'vertical' ? {bottom: unref(barLeftLower)} : {left: unref(barLeftLower)});
    const barStyleUpper = computed<CSSProperties>(() => direction === 'vertical' ? {bottom: unref(barLeftUpper)} : {left: unref(barLeftUpper)});

    const thumbStyleLower = computed<CSSProperties>(() => direction === 'vertical' ? {bottom: `${unref(percentageLower) * 100}%`} : {left: `${unref(percentageLower) * 100}%`});
    const thumbStyleUpper = computed<CSSProperties>(() => direction === 'vertical' ? {bottom: `${unref(percentageUpper) * 100}%`} : {left: `${unref(percentageUpper) * 100}%`});

    // Bar centers along the track for the dodge test, in the axis `isDodging`
    // expects (px from left when horizontal, px from top when vertical).
    const lowerBarCenter = computed(() => {
        const edge = faderClampPark(unref(percentageLower) * unref(trackLength) + FADER_BAR_INSET, unref(trackLength));

        return direction === 'vertical' ? unref(trackLength) - edge : edge;
    });
    const upperBarCenter = computed(() => {
        const edge = faderClampPark(unref(percentageUpper) * unref(trackLength) - FADER_BAR_INSET, unref(trackLength));

        return direction === 'vertical' ? unref(trackLength) - edge : edge;
    });

    const lowerState = computed(() => faderBarStateClass(isDodging(unref(lowerBarCenter)), unref(isDraggingLower), unref(focusVisibleLower)));
    const upperState = computed(() => faderBarStateClass(isDodging(unref(upperBarCenter)), unref(isDraggingUpper), unref(focusVisibleUpper)));

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
        const [lower, upper] = unref(modelValue);
        const lowerEdge = unref(percentageLower) * length;
        const upperEdge = unref(percentageUpper) * length;
        // Bar centers measured from the fill start (bottom when vertical), to
        // match markPx below; the dodge test flips to top-relative separately.
        const lowerCenter = faderClampPark(unref(percentageLower) * length + FADER_BAR_INSET, length);
        const upperCenter = faderClampPark(unref(percentageUpper) * length - FADER_BAR_INSET, length);

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
                filledOpacity = value >= lower && value <= upper ? 1 : 0;
                visibility = Math.abs(value - lower) < 1e-9 || Math.abs(value - upper) < 1e-9 ? 0 : 1;
            } else {
                const markPx = (percent / 100) * length;
                const dodgePx = vertical ? length - markPx : markPx;
                filledOpacity = Math.min(Math.min(1, Math.max(0, (markPx - lowerEdge) / 8)), Math.min(1, Math.max(0, (upperEdge - markPx) / 8)));
                const hideLower = Math.min(1, Math.max(0, (Math.abs(markPx - lowerCenter) - 10) / 6));
                const hideUpper = Math.min(1, Math.max(0, (Math.abs(markPx - upperCenter) - 10) / 6));
                // Hide marks under a bar or under the label/value text.
                visibility = isDodging(dodgePx) ? 0 : Math.min(hideLower, hideUpper);
            }

            marks.push({filledOpacity, percent, value, visibility});
        }

        return marks;
    });

    watch(modelValue, ([lower, upper]) => {
        const immediate = unref(isScrubbing) && !unref(isSnappy);

        lowerAnimator.animate(lower, immediate);
        upperAnimator.animate(upper, immediate);
    });
    watch([() => unref(modelValue)[0], () => unref(modelValue)[1], () => label], () => nextTick(measureZones));

    onBeforeUnmount(() => {
        lowerAnimator.stop();
        upperAnimator.stop();
        document.removeEventListener('pointermove', onPointerMove);
        document.removeEventListener('pointercancel', onPointerUp);
        document.removeEventListener('pointerup', onPointerUp);
    });

    function nudge(which: 'lower' | 'upper', delta: number): void {
        if (unref(disabled) || isReadonly || !unref(isRangeValid)) {
            return;
        }

        let [lower, upper] = unref(modelValue);

        if (which === 'lower') {
            lower = Math.max(min, Math.min(upper - unref(distance), lower + delta));
        } else {
            upper = Math.min(max, Math.max(lower + unref(distance), upper + delta));
        }

        modelValue.value = [snap(lower), snap(upper)];
    }

    function jump(which: 'lower' | 'upper', value: number): void {
        if (unref(disabled) || isReadonly || !unref(isRangeValid)) {
            return;
        }

        let [lower, upper] = unref(modelValue);

        if (which === 'lower') {
            lower = Math.max(min, Math.min(upper - unref(distance), value));
        } else {
            upper = Math.min(max, Math.max(lower + unref(distance), value));
        }

        modelValue.value = [snap(lower), snap(upper)];
    }

    function onFocus(which: 'lower' | 'upper', evt: FocusEvent): void {
        const isVisible = (evt.target as HTMLElement).matches(':focus-visible');

        if (which === 'lower') {
            focusVisibleLower.value = isVisible;
        } else {
            focusVisibleUpper.value = isVisible;
        }
    }

    function onKeyDown(which: 'lower' | 'upper', evt: KeyboardEvent): void {
        if (unref(disabled) || isReadonly) {
            return;
        }

        switch (evt.key) {
            case 'ArrowDown':
            case 'ArrowLeft':
                nudge(which, -step);
                break;

            case 'ArrowRight':
            case 'ArrowUp':
                nudge(which, step);
                break;

            case 'PageDown':
                nudge(which, -unref(pageStep));
                break;

            case 'PageUp':
                nudge(which, unref(pageStep));
                break;

            case 'Home':
                jump(which, min);
                break;

            case 'End':
                jump(which, max);
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

        if (!root || !unref(isRangeValid)) {
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

        updateOverdrag(coord, rect);

        // Bottom is the minimum when vertical, so invert the fraction.
        const fraction = vertical
            ? Math.max(0, Math.min(1, 1 - (coord - rect.top) / size))
            : Math.max(0, Math.min(1, (coord - rect.left) / size));
        const target = snap(fraction * unref(span) + min);

        // When the track is pressed without grabbing a thumb, start dragging
        // the thumb closest to the pointer.
        if (!isDraggingLower.value && !isDraggingUpper.value) {
            const [lower, upper] = unref(modelValue);

            if (Math.abs(target - lower) <= Math.abs(target - upper)) {
                isDraggingLower.value = true;
            } else {
                isDraggingUpper.value = true;
            }
        }

        let [lower, upper] = unref(modelValue);

        if (isDraggingLower.value) {
            lower = Math.min(target, upper - unref(distance));
        } else {
            upper = Math.max(target, lower + unref(distance));
        }

        modelValue.value = [snap(lower), snap(upper)];
        evt.preventDefault();
    }

    function onPointerUp(): void {
        const root = unrefTemplateElement(rootRef);

        if (pointerId.value !== null) {
            root?.releasePointerCapture?.(pointerId.value);
            pointerId.value = null;
        }

        isDraggingLower.value = false;
        isDraggingUpper.value = false;
        isScrubbing.value = false;
        resetOverdrag();
        document.removeEventListener('pointermove', onPointerMove);
        document.removeEventListener('pointercancel', onPointerUp);
        document.removeEventListener('pointerup', onPointerUp);
    }
</script>
