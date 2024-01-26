<template>
    <SliderBase
        :is-disabled="isDisabled"
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
                ref="thumbRef"
                :is-disabled="isDisabled"
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
    import { ComponentPublicInstance, computed, ref, toRefs, unref, watch, watchEffect } from 'vue';
    import { addTooltip, removeTooltip, updateTooltip } from '@/data';
    import { clampWithStepPrecision, countDecimals, formatNumber, unrefElement } from '@/util';
    import { SliderBase, SliderThumb, SliderTrack } from './primitive';

    export type Props = {
        readonly formatter?: (value: number, decimals?: number) => string;
        readonly isDisabled?: boolean;
        readonly isTicksVisible?: boolean;
        readonly max?: number;
        readonly min?: number;
        readonly step?: number;
    };

    const modelValue = defineModel<number>({required: true});
    const props = withDefaults(defineProps<Props>(), {
        formatter: formatNumber,
        isDisabled: false,
        max: 100,
        min: 0,
        step: 1
    });
    const {formatter, isDisabled, max, min, step} = toRefs(props);

    const thumbRef = ref<ComponentPublicInstance>();
    const isDragging = ref(false);
    const localValue = ref(0);
    const percentage = ref(0);
    const tooltipId = ref<number | null>(null);

    const tooltipContent = computed(() => formatter.value(modelValue.value, countDecimals(step.value)));

    function onDragging(is: boolean): void {
        isDragging.value = is;

        if (is && !tooltipId.value) {
            tooltipId.value = addTooltip({
                axis: 'vertical',
                content: unref(tooltipContent),
                origin: unrefElement(thumbRef) as HTMLElement
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
                content: formatter.value(modelValue.value, countDecimals(step.value)),
                origin: unrefElement(thumbRef) as HTMLElement
            });
        });
    }

    function onDecrement(): void {
        if (unref(isDisabled)) {
            return;
        }

        const value = clampWithStepPrecision(localValue.value, min.value, max.value, step.value);
        modelValue.value = Math.max(min.value, value - step.value);
    }

    function onIncrement(): void {
        if (unref(isDisabled)) {
            return;
        }

        const value = clampWithStepPrecision(localValue.value, min.value, max.value, step.value);
        modelValue.value = Math.min(max.value, value + step.value);
    }

    watchEffect(() => {
        localValue.value = (unref(modelValue) - unref(min)) / (unref(max) - unref(min));
    });

    watch(([max, min, localValue, step]), ([max, min, localValue, step]) => {
        const value = clampWithStepPrecision(localValue, min, max, step);
        modelValue.value = value;
        percentage.value = (value - min) / (max - min);
    }, {immediate: true});
</script>
