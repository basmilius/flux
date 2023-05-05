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

<script lang="ts">
    export default {
        model: {
            prop: 'modelValue',
            event: 'update:modelValue'
        }
    };
</script>

<script
    lang="ts"
    setup>
    import type { ComponentPublicInstance } from 'vue-demi';
    import { computed, ref, toRefs, unref, watch } from 'vue-demi';
    import { useFluxStore } from '../data';
    import { unrefElement } from '../helpers';
    import { clampWithStepPrecision, countDecimals, formatNumber } from '../utils';
    import { SliderBase, SliderThumb, SliderTrack } from './primitive';

    export interface Emits {
        (e: 'update:modelValue', value: number): void;
    }

    export interface Props {
        readonly formatter?: (value: number, decimals?: number) => string;
        readonly isDisabled?: boolean;
        readonly isTicksVisible?: boolean;
        readonly max?: number;
        readonly min?: number;
        readonly modelValue: number;
        readonly step?: number;
    }

    const emit = defineEmits<Emits>();
    const props = withDefaults(defineProps<Props>(), {
        formatter: formatNumber,
        isDisabled: false,
        max: 100,
        min: 0,
        step: 1
    });
    const {formatter, isDisabled, max, min, modelValue, step} = toRefs(props);

    const {addTooltip, removeTooltip, updateTooltip} = useFluxStore();

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

        if (tooltipId.value) {
            updateTooltip(tooltipId.value, {
                content: unref(tooltipContent),
                origin: unrefElement(thumbRef) as HTMLElement
            });
        }
    }

    function onDecrement(): void {
        if (unref(isDisabled)) {
            return;
        }

        const value = clampWithStepPrecision(localValue.value, min.value, max.value, step.value);
        emit('update:modelValue', Math.max(min.value, value - step.value));
    }

    function onIncrement(): void {
        if (unref(isDisabled)) {
            return;
        }

        const value = clampWithStepPrecision(localValue.value, min.value, max.value, step.value);
        emit('update:modelValue', Math.min(max.value, value + step.value));
    }

    watch(modelValue, modelValue => {
        localValue.value = (modelValue - min.value) / (max.value - min.value);
    }, {immediate: true});

    watch(([max, min, localValue, step]), ([max, min, localValue, step]) => {
        const value = clampWithStepPrecision(localValue, min, max, step);
        percentage.value = (value - min) / (max - min);

        emit('update:modelValue', value);
    }, {immediate: true});
</script>
