<template>
    <SliderBase
        :disabled="disabled"
        :is-ticks-visible="isTicksVisible"
        :max="max"
        :min="min"
        :step="step"
        @dragging="onDragging"
        @update="onUpdate">
        <SliderTrack
            :percentage-lower="percentageLower"
            :percentage-upper="percentageUpper">
            <SliderThumb
                ref="lowerThumb"
                :aria-label="translate('flux.lowerBound')"
                :aria-valuemax="max"
                :aria-valuemin="min"
                :aria-valuenow="modelValue[0]"
                :disabled="disabled"
                :is-dragging="isDraggingLower"
                :position="percentageLower"
                @grab="!disabled && (isDraggingLower = true)"
                @decrement="onDecrement('lower')"
                @increment="onIncrement('lower')"/>

            <SliderThumb
                ref="upperThumb"
                :aria-label="translate('flux.upperBound')"
                :aria-valuemax="max"
                :aria-valuemin="min"
                :aria-valuenow="modelValue[1]"
                :disabled="disabled"
                :is-dragging="isDraggingUpper"
                :position="percentageUpper"
                @grab="!disabled && (isDraggingUpper = true)"
                @decrement="onDecrement('upper')"
                @increment="onIncrement('upper')"/>
        </SliderTrack>
    </SliderBase>
</template>

<script
    lang="ts"
    setup>
    import { countDecimals, formatNumber, roundStep } from '@basmilius/utils';
    import type { FluxFormInputBaseProps } from '@flux-ui/types';
    import { computed, onUnmounted, ref, toRef, unref, useTemplateRef, watch } from 'vue';
    import { useDisabled } from '~flux/components/composable';
    import { useTranslate } from '~flux/components/composable/private';
    import { addTooltip, removeTooltip, updateTooltip } from '~flux/components/data';
    import { SliderBase, SliderThumb, SliderTrack } from './primitive';

    const modelValue = defineModel<[number, number]>({
        required: true
    });

    const {
        formatter = formatNumber,
        disabled: componentDisabled,
        isReadonly,
        isTooltipDisabled,
        max = 100,
        min = 0,
        minDistance = 0,
        step = 1
    } = defineProps<Pick<FluxFormInputBaseProps, 'disabled' | 'error' | 'isLoading' | 'isReadonly' | 'name'> & {
        readonly formatter?: (value: number, decimals?: number) => string;

        readonly isTicksVisible?: boolean;
        readonly isTooltipDisabled?: boolean;
        readonly max?: number;
        readonly min?: number;
        readonly minDistance?: number;
        readonly step?: number;
    }>();

    const lowerThumbRef = useTemplateRef('lowerThumb');
    const upperThumbRef = useTemplateRef('upperThumb');

    const isDraggingLower = ref(false);
    const isDraggingUpper = ref(false);
    const tooltipId = ref<number | null>(null);

    const disabled = useDisabled(toRef(() => componentDisabled));
    const translate = useTranslate();

    const span = computed(() => max - min);
    const isRangeValid = computed(() => unref(span) > 0);
    const distance = computed(() => Math.max(0, minDistance, step));
    const decimals = computed(() => countDecimals(step));

    const percentageLower = computed(() => unref(isRangeValid) ? (unref(modelValue)[0] - min) / unref(span) : 0);
    const percentageUpper = computed(() => unref(isRangeValid) ? (unref(modelValue)[1] - min) / unref(span) : 0);

    const tooltipContent = computed(() => formatter(modelValue.value[isDraggingLower.value ? 0 : 1], unref(decimals)));

    watch([isDraggingLower, isDraggingUpper], ([lower, upper]) => {
        const is = lower || upper;

        if (is && !tooltipId.value && !isTooltipDisabled) {
            tooltipId.value = addTooltip({
                content: unref(tooltipContent),
                direction: 'vertical',
                origin: unref(lower ? lowerThumbRef : upperThumbRef)?.$el
            });
        } else if (!is && tooltipId.value) {
            removeTooltip(tooltipId.value);
            tooltipId.value = null;
        }
    });

    onUnmounted(() => {
        if (tooltipId.value) {
            removeTooltip(tooltipId.value);
            tooltipId.value = null;
        }
    });

    function snap(value: number): number {
        const stepped = step > 0 ? roundStep(value, step) : value;

        return +Math.max(min, Math.min(max, stepped)).toFixed(unref(decimals));
    }

    function onDragging(is: boolean): void {
        if (is) {
            return;
        }

        isDraggingLower.value = false;
        isDraggingUpper.value = false;
    }

    function onUpdate(value: number): void {
        if (unref(disabled) || isReadonly || !unref(isRangeValid)) {
            return;
        }

        const target = snap(value * unref(span) + min);

        // When the track is clicked (no thumb is being dragged yet) start
        // dragging the thumb closest to the pointer.
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

        if (tooltipId.value) {
            updateTooltip(tooltipId.value, {
                content: unref(tooltipContent),
                origin: unref(isDraggingLower.value ? lowerThumbRef : upperThumbRef)?.$el
            });
        }
    }

    function onDecrement(which: 'lower' | 'upper'): void {
        if (unref(disabled) || isReadonly || !unref(isRangeValid)) {
            return;
        }

        let [lower, upper] = unref(modelValue);

        if (which === 'lower') {
            lower = Math.max(min, Math.min(upper - unref(distance), lower - step));
        } else {
            upper = Math.max(lower + unref(distance), upper - step);
        }

        modelValue.value = [snap(lower), snap(upper)];
    }

    function onIncrement(which: 'lower' | 'upper'): void {
        if (unref(disabled) || isReadonly || !unref(isRangeValid)) {
            return;
        }

        let [lower, upper] = unref(modelValue);

        if (which === 'lower') {
            lower = Math.min(upper - unref(distance), lower + step);
        } else {
            upper = Math.min(max, Math.max(lower + unref(distance), upper + step));
        }

        modelValue.value = [snap(lower), snap(upper)];
    }
</script>
