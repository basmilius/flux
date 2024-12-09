<template>
    <SliderBase
        :disabled="disabled"
        :is-dragging="isDragging"
        :is-ticks-visible="isTicksVisible"
        :max="max"
        :min="min"
        :step="step"
        @dragging="onDragging"
        @update="onUpdate">
        <SliderTrack
            :percentage-lower="0"
            :percentage-upper="percentage">
            <SliderThumb
                ref="thumb"
                :disabled="disabled"
                :is-dragging="isDragging"
                :position="percentage"
                @decrement="onDecrement"
                @increment="onIncrement"/>
        </SliderTrack>
    </SliderBase>
</template>

<script
    lang="ts"
    setup>
    import { clampWithStepPrecision, countDecimals, formatNumber } from '@basmilius/utils';
    import { computed, ref, toRef, unref, useTemplateRef, watch, watchEffect } from 'vue';
    import { useDisabled } from '@/composable';
    import { addTooltip, removeTooltip, updateTooltip } from '@/data';
    import { SliderBase, SliderThumb, SliderTrack } from './primitive';

    const modelValue = defineModel<number>({
        required: true
    });

    const {
        formatter = formatNumber,
        disabled: componentDisabled = false,
        isTooltipDisabled,
        max = 100,
        min = 0,
        step = 1
    } = defineProps<{
        formatter?(value: number, decimals?: number): string;

        readonly disabled?: boolean;
        readonly isTicksVisible?: boolean;
        readonly isTooltipDisabled?: boolean;
        readonly max?: number;
        readonly min?: number;
        readonly step?: number;
    }>();

    const disabled = useDisabled(toRef(() => componentDisabled));
    const thumbRef = useTemplateRef('thumb');

    const isDragging = ref(false);
    const localValue = ref(0);
    const percentage = ref(0);
    const tooltipId = ref<number | null>(null);

    const tooltipContent = computed(() => formatter(modelValue.value, countDecimals(step)));

    function onDragging(is: boolean): void {
        isDragging.value = is;

        if (is && !tooltipId.value && !isTooltipDisabled) {
            tooltipId.value = addTooltip({
                axis: 'vertical',
                content: unref(tooltipContent),
                origin: unref(thumbRef)?.$el
            });
        } else if (!is && tooltipId.value) {
            removeTooltip(tooltipId.value);
            tooltipId.value = null;
        }
    }

    function onUpdate(value: number): void {
        localValue.value = value;

        requestAnimationFrame(() => {
            if (!tooltipId.value) {
                return;
            }

            updateTooltip(tooltipId.value, {
                content: formatter(modelValue.value, countDecimals(step)),
                origin: unref(thumbRef)?.$el
            });
        });
    }

    function onDecrement(): void {
        if (unref(disabled)) {
            return;
        }

        const value = clampWithStepPrecision(localValue.value, min, max, step);
        modelValue.value = Math.max(min, value - step);
    }

    function onIncrement(): void {
        if (unref(disabled)) {
            return;
        }

        const value = clampWithStepPrecision(localValue.value, min, max, step);
        modelValue.value = Math.min(max, value + step);
    }

    watchEffect(() => {
        localValue.value = (unref(modelValue) - min) / (max - min);
    });

    watch(([() => max, () => min, localValue, () => step]), () => {
        const value = clampWithStepPrecision(unref(localValue), min, max, step);
        modelValue.value = value;
        percentage.value = (value - min) / (max - min);
    }, {immediate: true});
</script>
