<template>
    <div
        ref="root"
        :class="clsx(
            $style.formFader,
            (isDraggingLower || isDraggingUpper) && $style.isDragging,
            disabled && $style.isDisabled,
            isReadonly && $style.isReadonly
        )"
        :style="colorVars"
        :aria-disabled="disabled ? true : undefined"
        @pointerdown="onPointerDown">
        <div
            :class="$style.formFaderTrack"
            :style="{transform: `scaleX(${overdragScaleX})`, transformOrigin: overdragOrigin}">
            <div
                :class="$style.formFaderFill"
                :style="{left: `${percentageLower * 100}%`, width: `${(percentageUpper - percentageLower) * 100}%`}"/>

            <span
                :class="clsx($style.formFaderBar, lowerState && $style[lowerState])"
                :style="{left: barLeftLower}"/>

            <span
                :class="clsx($style.formFaderBar, upperState && $style[upperState])"
                :style="{left: barLeftUpper}"/>

            <span
                v-for="tick of ticks"
                :key="tick.value"
                :class="$style.formFaderTick"
                :style="{left: `${tick.percent}%`, opacity: tick.visibility}">
                <span :class="$style.formFaderTickBase"/>
                <span
                    :class="$style.formFaderTickFill"
                    :style="{opacity: tick.filledOpacity}"/>
            </span>
        </div>

        <button
            :class="$style.formFaderThumb"
            :style="{left: `${percentageLower * 100}%`}"
            role="slider"
            :aria-disabled="disabled ? true : undefined"
            :aria-label="translate('flux.lowerBound')"
            :aria-readonly="isReadonly ? true : undefined"
            :aria-valuemax="max"
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
            :style="{left: `${percentageUpper * 100}%`}"
            role="slider"
            :aria-disabled="disabled ? true : undefined"
            :aria-label="translate('flux.upperBound')"
            :aria-readonly="isReadonly ? true : undefined"
            :aria-valuemax="max"
            :aria-valuemin="min"
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
    import type { FluxColor, FluxFormInputBaseProps, FluxIconName } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { computed, nextTick, onBeforeUnmount, ref, toRef, unref, useTemplateRef, watch } from 'vue';
    import { useDisabled } from '~flux/components/composable';
    import { createFaderAnimator, FADER_BAR_INSET, faderBarLeft, faderBarStateClass, faderClampPark, faderRoundToDecimals, useFormFader, useTranslate } from '~flux/components/composable/private';
    import FluxIcon from './FluxIcon.vue';
    import $style from '~flux/components/css/component/FormFader.module.scss';

    const modelValue = defineModel<[number, number]>({
        required: true
    });

    const {
        color = 'primary',
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
        formatter?(value: number, decimals?: number): string;

        readonly color?: FluxColor;
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

    const disabled = useDisabled(toRef(() => componentDisabled));
    const rootRef = useTemplateRef<HTMLElement>('root');
    const labelRef = useTemplateRef<HTMLElement>('label');
    const valueRef = useTemplateRef<HTMLElement>('value');
    const translate = useTranslate();

    const {
        overdrag,
        trackWidth,
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
        color: () => color
    });

    const {
        scaleX: overdragScaleX,
        transformOrigin: overdragOrigin,
        update: updateOverdrag,
        reset: resetOverdrag
    } = overdrag;

    const isDraggingLower = ref(false);
    const isDraggingUpper = ref(false);
    const isScrubbing = ref(false);
    const focusVisibleLower = ref(false);
    const focusVisibleUpper = ref(false);
    const pointerId = ref<number | null>(null);

    // Each bound eases toward its committed value so the fill and the value
    // read glide together on a snap; a live scrub feeds them instantly.
    const animatedLower = ref(unref(modelValue)[0]);
    const animatedUpper = ref(unref(modelValue)[1]);
    const lowerAnimator = createFaderAnimator(animatedLower);
    const upperAnimator = createFaderAnimator(animatedUpper);

    const distance = computed(() => Math.max(0, minDistance, step));
    const showMarks = computed(() => isTicksVisible || unref(isSnappy));

    const percentageLower = computed(() => unref(isRangeValid) ? (unref(animatedLower) - min) / unref(span) : 0);
    const percentageUpper = computed(() => unref(isRangeValid) ? (unref(animatedUpper) - min) / unref(span) : 0);

    const displayValue = computed(() => `${formatter(faderRoundToDecimals(unref(animatedLower), unref(decimals)), unref(decimals))} - ${formatter(faderRoundToDecimals(unref(animatedUpper), unref(decimals)), unref(decimals))}`);
    const fillClip = computed(() => `inset(0 calc(100% - ${unref(percentageUpper) * 100}%) 0 ${unref(percentageLower) * 100}%)`);

    const lowerBarCenter = computed(() => faderClampPark(unref(percentageLower) * unref(trackWidth) + FADER_BAR_INSET, unref(trackWidth)));
    const upperBarCenter = computed(() => faderClampPark(unref(percentageUpper) * unref(trackWidth) - FADER_BAR_INSET, unref(trackWidth)));

    const barLeftLower = computed(() => faderBarLeft(unref(percentageLower) * 100, FADER_BAR_INSET));
    const barLeftUpper = computed(() => faderBarLeft(unref(percentageUpper) * 100, -FADER_BAR_INSET));

    const lowerState = computed(() => faderBarStateClass(isDodging(unref(lowerBarCenter)), unref(isDraggingLower), unref(focusVisibleLower)));
    const upperState = computed(() => faderBarStateClass(isDodging(unref(upperBarCenter)), unref(isDraggingUpper), unref(focusVisibleUpper)));

    const ticks = computed(() => {
        if (!unref(showMarks) || step <= 0 || !unref(isRangeValid)) {
            return [];
        }

        const count = Math.round(unref(span) / step);

        if (count <= 0 || count > 100) {
            return [];
        }

        const width = unref(trackWidth);
        const [lower, upper] = unref(modelValue);
        const lowerEdge = unref(percentageLower) * width;
        const upperEdge = unref(percentageUpper) * width;
        const lowerCenter = unref(lowerBarCenter);
        const upperCenter = unref(upperBarCenter);

        const marks = [];

        for (let index = 1; index < count; ++index) {
            const value = min + index * step;
            const percent = (index / count) * 100;

            let filledOpacity: number;
            let visibility: number;

            if (width <= 0) {
                filledOpacity = value >= lower && value <= upper ? 1 : 0;
                visibility = Math.abs(value - lower) < 1e-9 || Math.abs(value - upper) < 1e-9 ? 0 : 1;
            } else {
                const markPx = (percent / 100) * width;
                filledOpacity = Math.min(Math.min(1, Math.max(0, (markPx - lowerEdge) / 8)), Math.min(1, Math.max(0, (upperEdge - markPx) / 8)));
                const hideLower = Math.min(1, Math.max(0, (Math.abs(markPx - lowerCenter) - 10) / 6));
                const hideUpper = Math.min(1, Math.max(0, (Math.abs(markPx - upperCenter) - 10) / 6));
                visibility = Math.min(hideLower, hideUpper);
            }

            marks.push({filledOpacity, percent, value, visibility});
        }

        return marks;
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
        dragStartX = evt.clientX;
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

        if (rect.width <= 0) {
            return;
        }

        if (Math.abs(evt.clientX - dragStartX) > 3) {
            isScrubbing.value = true;
        }

        updateOverdrag(evt.clientX, rect);

        const fraction = Math.max(0, Math.min(1, (evt.clientX - rect.left) / rect.width));
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

    let dragStartX = 0;

    onBeforeUnmount(() => {
        lowerAnimator.stop();
        upperAnimator.stop();
        document.removeEventListener('pointermove', onPointerMove);
        document.removeEventListener('pointercancel', onPointerUp);
        document.removeEventListener('pointerup', onPointerUp);
    });

    watch(modelValue, ([lower, upper]) => {
        const immediate = unref(isScrubbing) && !unref(isSnappy);

        lowerAnimator.animate(lower, immediate);
        upperAnimator.animate(upper, immediate);
    });
    watch([() => unref(modelValue)[0], () => unref(modelValue)[1], () => label], () => nextTick(measureZones));
</script>
