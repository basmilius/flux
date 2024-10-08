<template>
    <SliderBase
        :is-disabled="isDisabled"
        :is-dragging="isDraggingLower || isDraggingUpper"
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
                :is-disabled="isDisabled"
                :is-dragging="isDraggingLower"
                :position="percentageLower"
                @grab="!isDisabled && (isDraggingLower = true)"
                @decrement="onDecrement('lower')"
                @increment="onIncrement('lower')"/>

            <SliderThumb
                ref="upperThumb"
                :is-disabled="isDisabled"
                :is-dragging="isDraggingUpper"
                :position="percentageUpper"
                @grab="!isDisabled && (isDraggingUpper = true)"
                @decrement="onDecrement('upper')"
                @increment="onIncrement('upper')"/>
        </SliderTrack>
    </SliderBase>
</template>

<script
    lang="ts"
    setup>
    import { computed, ref, unref, useTemplateRef, watch } from 'vue';
    import { addTooltip, removeTooltip, updateTooltip } from '@/data';
    import { clampWithStepPrecision, countDecimals, formatNumber } from '@/util';
    import { SliderBase, SliderThumb, SliderTrack } from './primitive';

    const modelValue = defineModel<[number, number]>({
        required: true
    });

    const {
        formatter = formatNumber,
        isDisabled,
        isTooltipDisabled,
        max = 100,
        min = 0,
        step = 1
    } = defineProps<{
        formatter?(value: number, decimals?: number): string;

        readonly isDisabled?: boolean;
        readonly isTicksVisible?: boolean;
        readonly isTooltipDisabled?: boolean;
        readonly max?: number;
        readonly min?: number;
        readonly step?: number;
    }>();

    const lowerThumbRef = useTemplateRef('lowerThumb');
    const upperThumbRef = useTemplateRef('upperThumb');

    const isDraggingLower = ref(false);
    const isDraggingUpper = ref(false);
    const percentageLower = ref(0);
    const percentageUpper = ref(0);
    const lowerValue = ref(0);
    const upperValue = ref(0);
    const tooltipId = ref<number | null>(null);

    const tooltipContent = computed(() => formatter(modelValue.value[isDraggingLower.value ? 0 : 1], countDecimals(step)));

    function onDragging(is: boolean): void {
        if (is) {
            return;
        }

        isDraggingLower.value = is;
        isDraggingUpper.value = is;
    }

    function onUpdate(value: number): void {
        let lower = clampWithStepPrecision(lowerValue.value, min, max, step);
        let upper = clampWithStepPrecision(upperValue.value, min, max, step);

        if (isDraggingLower.value) {
            lower = clampWithStepPrecision(value, min, max, step);
        }

        if (isDraggingUpper.value) {
            upper = clampWithStepPrecision(value, min, max, step);
        }

        if (lower >= upper) {
            return;
        }

        if (tooltipId.value) {
            updateTooltip(tooltipId.value, {
                content: unref(tooltipContent),
                origin: unref(isDraggingLower.value ? lowerThumbRef : upperThumbRef)?.$el
            });
        }

        lowerValue.value = (lower - min) / (max - min);
        upperValue.value = (upper - min) / (max - min);
    }

    function onDecrement(which: 'lower' | 'upper'): void {
        let lower = clampWithStepPrecision(lowerValue.value, min, max, step);
        let upper = clampWithStepPrecision(upperValue.value, min, max, step);

        if (which === 'lower') {
            lower = Math.max(min, lower - step);
        } else {
            upper = Math.max(min, upper - step);
        }

        if (lower >= upper) {
            return;
        }

        modelValue.value = [lower, upper];
    }

    function onIncrement(which: 'lower' | 'upper'): void {
        let lower = clampWithStepPrecision(lowerValue.value, min, max, step);
        let upper = clampWithStepPrecision(upperValue.value, min, max, step);

        if (which === 'lower') {
            lower = Math.min(max, lower + step);
        } else {
            upper = Math.min(max, upper + step);
        }

        if (lower >= upper) {
            return;
        }

        modelValue.value = [lower, upper];
    }

    watch(modelValue, modelValue => {
        lowerValue.value = (modelValue[0] - min) / (max - min);
        upperValue.value = (modelValue[1] - min) / (max - min);
    }, {immediate: true});

    watch(([() => max, () => min, () => step, lowerValue, upperValue]), () => {
        const lower = clampWithStepPrecision(unref(lowerValue), min, max, step);
        const upper = clampWithStepPrecision(unref(upperValue), min, max, step);

        percentageLower.value = (lower - min) / (max - min);
        percentageUpper.value = (upper - min) / (max - min);

        modelValue.value = [lower, upper];
    }, {immediate: true});

    watch(([isDraggingLower, isDraggingUpper]), ([isDraggingLower, isDraggingUpper]) => {
        const is = isDraggingLower || isDraggingUpper;

        if (is && !tooltipId.value && !isTooltipDisabled) {
            tooltipId.value = addTooltip({
                axis: 'vertical',
                content: unref(tooltipContent),
                origin: unref(isDraggingLower ? lowerThumbRef : upperThumbRef)?.$el
            });
        } else if (!is && tooltipId.value) {
            removeTooltip(tooltipId.value);
            tooltipId.value = null;
        }
    });
</script>
