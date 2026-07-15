<template>
    <div
        ref="root"
        :class="clsx(
            $style.formFader,
            $style.formFaderFocusable,
            isDragging && $style.isDragging,
            disabled && $style.isDisabled,
            isReadonly && $style.isReadonly
        )"
        role="slider"
        :style="colorVars"
        :aria-disabled="disabled ? true : undefined"
        :aria-label="label ?? ariaLabel"
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
            :style="{transform: `scaleX(${overdragScaleX})`, transformOrigin: overdragOrigin}">
            <div
                :class="$style.formFaderFill"
                :style="{width: `${percentage * 100}%`}"/>

            <span
                :class="clsx($style.formFaderBar, barState && $style[barState])"
                :style="{left: barLeft}"/>

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
    import { createFaderAnimator, FADER_BAR_INSET, faderBarLeft, faderBarStateClass, faderClampPark, faderFillEdgePx, faderRoundToDecimals, useFormFader } from '~flux/components/composable/private';
    import FluxIcon from './FluxIcon.vue';
    import $style from '~flux/components/css/component/FormFader.module.scss';

    const modelValue = defineModel<number>({
        required: true
    });

    const {
        ariaLabel,
        color = 'primary',
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
        formatter?(value: number, decimals?: number): string;

        readonly ariaLabel?: string;
        readonly color?: FluxColor;
        readonly iconLeading?: FluxIconName;
        readonly iconTrailing?: FluxIconName;
        readonly isTicksVisible?: boolean;
        readonly isValueHidden?: boolean;
        readonly label?: string;
        readonly max?: number;
        readonly min?: number;
        readonly step?: number;
    }>();

    const disabled = useDisabled(toRef(() => componentDisabled));
    const rootRef = useTemplateRef<HTMLElement>('root');
    const labelRef = useTemplateRef<HTMLElement>('label');
    const valueRef = useTemplateRef<HTMLElement>('value');

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

    const isDragging = ref(false);
    const isScrubbing = ref(false);
    const focusVisible = ref(false);
    const pointerId = ref<number | null>(null);

    // `animated` eases toward the committed value so the fill and the value
    // read glide together on a snap; a live scrub feeds it instantly.
    const animated = ref(unref(modelValue));
    const animator = createFaderAnimator(animated);

    const showMarks = computed(() => isTicksVisible || unref(isSnappy));

    const percentage = computed(() => unref(isRangeValid) ? (unref(animated) - min) / unref(span) : 0);
    const displayValue = computed(() => formatter(faderRoundToDecimals(unref(animated), unref(decimals)), unref(decimals)));
    const ariaValueText = computed(() => formatter(unref(modelValue), unref(decimals)));
    const fillClip = computed(() => `inset(0 calc(100% - ${unref(percentage) * 100}%) 0 0)`);

    const barCenter = computed(() => faderClampPark(faderFillEdgePx(unref(percentage) * 100, unref(trackWidth)) - FADER_BAR_INSET, unref(trackWidth)));
    const barLeft = computed(() => faderBarLeft(unref(percentage) * 100, -FADER_BAR_INSET));
    const barState = computed(() => faderBarStateClass(isDodging(unref(barCenter)), unref(isDragging), unref(focusVisible)));

    const ticks = computed(() => {
        if (!unref(showMarks) || step <= 0 || !unref(isRangeValid)) {
            return [];
        }

        const count = Math.round(unref(span) / step);

        if (count <= 0 || count > 100) {
            return [];
        }

        const width = unref(trackWidth);
        const fillEdge = faderFillEdgePx(unref(percentage) * 100, width);
        const center = faderClampPark(fillEdge - FADER_BAR_INSET, width);

        const marks = [];

        for (let index = 1; index < count; ++index) {
            const value = min + index * step;
            const percent = (index / count) * 100;

            let filledOpacity: number;
            let visibility: number;

            if (width <= 0) {
                filledOpacity = value <= unref(modelValue) ? 1 : 0;
                visibility = Math.abs(percent - unref(percentage) * 100) < 0.001 ? 0 : 1;
            } else {
                const markPx = (percent / 100) * width;
                filledOpacity = Math.min(1, Math.max(0, (fillEdge - markPx) / 8));
                visibility = Math.min(1, Math.max(0, (Math.abs(markPx - center) - 10) / 6));
            }

            marks.push({filledOpacity, percent, value, visibility});
        }

        return marks;
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

        if (!unref(isDragging) || !root) {
            return;
        }

        const rect = root.getBoundingClientRect();

        if (rect.width <= 0) {
            return;
        }

        if (Math.abs(evt.clientX - dragStartX) > 3) {
            isScrubbing.value = true;
        }

        setFromFraction(Math.max(0, Math.min(1, (evt.clientX - rect.left) / rect.width)));
        updateOverdrag(evt.clientX, rect);
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

    let dragStartX = 0;

    onBeforeUnmount(() => {
        animator.stop();
        document.removeEventListener('pointermove', onPointerMove);
        document.removeEventListener('pointercancel', onPointerUp);
        document.removeEventListener('pointerup', onPointerUp);
    });

    watch(modelValue, value => animator.animate(value, unref(isScrubbing) && !unref(isSnappy)));
    watch([ariaValueText, () => label], () => nextTick(measureZones));
</script>
