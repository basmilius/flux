<template>
    <slider-base
        :is-disabled="isDisabled"
        :is-dragging="isDraggingLower || isDraggingUpper"
        :is-ticks-visible="isTicksVisible"
        :max="max"
        :min="min"
        :step="step"
        @dragging="onDragging"
        @update="onUpdate">
        <slider-track
            :percentage-lower="percentageLower"
            :percentage-upper="percentageUpper">
            <slider-thumb
                ref="lowerThumbRef"
                :is-disabled="isDisabled"
                :is-dragging="isDraggingLower"
                :position="percentageLower"
                @grab="!isDisabled && (isDraggingLower = true)"
                @decrement="onDecrement('lower')"
                @increment="onIncrement('lower')"/>

            <slider-thumb
                ref="upperThumbRef"
                :is-disabled="isDisabled"
                :is-dragging="isDraggingUpper"
                :position="percentageUpper"
                @grab="!isDisabled && (isDraggingUpper = true)"
                @decrement="onDecrement('upper')"
                @increment="onIncrement('upper')"/>
        </slider-track>
    </slider-base>
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
    import { ComponentPublicInstance, computed, ref, toRefs, unref, watch } from 'vue-demi';
    import { useFluxStore } from '../data';
    import { unrefElement } from '../helpers';
    import { clampWithStepPrecision, countDecimals, formatNumber } from '../utils';
    import { SliderBase, SliderThumb, SliderTrack } from './primitive';

    export interface Emits {
        (e: 'update:modelValue', value: [number, number]): void;
    }

    export interface Props {
        readonly formatter?: (value: number, decimals?: number) => string;
        readonly isDisabled?: boolean;
        readonly isTicksVisible?: boolean;
        readonly max?: number;
        readonly min?: number;
        readonly modelValue: [number, number];
        readonly step?: number;
    }

    const emit = defineEmits<Emits>();
    const props = withDefaults(defineProps<Props>(), {
        formatter: formatNumber,
        max: 1,
        min: 0,
        step: .1
    });
    const {formatter, isDisabled, max, min, modelValue, step} = toRefs(props);

    const {addTooltip, removeTooltip, updateTooltip} = useFluxStore();

    const lowerThumbRef = ref<ComponentPublicInstance>();
    const upperThumbRef = ref<ComponentPublicInstance>();
    const isDraggingLower = ref(false);
    const isDraggingUpper = ref(false);
    const percentageLower = ref(0);
    const percentageUpper = ref(0);
    const lowerValue = ref(0);
    const upperValue = ref(0);
    const tooltipId = ref<number | null>(null);

    const tooltipContent = computed(() => formatter.value(modelValue.value[isDraggingLower.value ? 0 : 1], countDecimals(step.value)));

    function onDragging(is: boolean): void {
        if (is) {
            return;
        }

        isDraggingLower.value = is;
        isDraggingUpper.value = is;
    }

    function onUpdate(value: number): void {
        let lower = clampWithStepPrecision(lowerValue.value, min.value, max.value, step.value);
        let upper = clampWithStepPrecision(upperValue.value, min.value, max.value, step.value);

        if (isDraggingLower.value) {
            lower = clampWithStepPrecision(value, min.value, max.value, step.value);
        }

        if (isDraggingUpper.value) {
            upper = clampWithStepPrecision(value, min.value, max.value, step.value);
        }

        if (lower >= upper) {
            return;
        }

        if (tooltipId.value) {
            updateTooltip(tooltipId.value, {
                content: unref(tooltipContent),
                origin: unrefElement(isDraggingLower.value ? lowerThumbRef : upperThumbRef) as HTMLElement
            });
        }

        lowerValue.value = (lower - min.value) / (max.value - min.value);
        upperValue.value = (upper - min.value) / (max.value - min.value);
    }

    function onDecrement(which: 'lower' | 'upper'): void {
        let lower = clampWithStepPrecision(lowerValue.value, min.value, max.value, step.value);
        let upper = clampWithStepPrecision(upperValue.value, min.value, max.value, step.value);

        if (which === 'lower') {
            lower = Math.max(min.value, lower - step.value);
        } else {
            upper = Math.max(min.value, upper - step.value);
        }

        if (lower >= upper) {
            return;
        }

        emit('update:modelValue', [lower, upper]);
    }

    function onIncrement(which: 'lower' | 'upper'): void {
        let lower = clampWithStepPrecision(lowerValue.value, min.value, max.value, step.value);
        let upper = clampWithStepPrecision(upperValue.value, min.value, max.value, step.value);

        if (which === 'lower') {
            lower = Math.min(max.value, lower + step.value);
        } else {
            upper = Math.min(max.value, upper + step.value);
        }

        if (lower >= upper) {
            return;
        }

        emit('update:modelValue', [lower, upper]);
    }

    watch(modelValue, modelValue => {
        lowerValue.value = (modelValue[0] - min.value) / (max.value - min.value);
        upperValue.value = (modelValue[1] - min.value) / (max.value - min.value);
    }, {immediate: true});

    watch(([max, min, step, lowerValue, upperValue]), ([max, min, step, lowerValue, upperValue]) => {
        const lower = clampWithStepPrecision(lowerValue, min, max, step);
        const upper = clampWithStepPrecision(upperValue, min, max, step);

        percentageLower.value = (lower - min) / (max - min);
        percentageUpper.value = (upper - min) / (max - min);

        emit('update:modelValue', [lower, upper]);
    }, {immediate: true});

    watch(([isDraggingLower, isDraggingUpper]), ([isDraggingLower, isDraggingUpper]) => {
        const is = isDraggingLower || isDraggingUpper;

        if (is && !tooltipId.value) {
            tooltipId.value = addTooltip({
                axis: 'vertical',
                content: unref(tooltipContent),
                origin: unrefElement(isDraggingLower ? lowerThumbRef : upperThumbRef) as HTMLElement
            });
        } else if (!is && tooltipId.value) {
            removeTooltip(tooltipId.value);
            tooltipId.value = null;
        }
    });
</script>
