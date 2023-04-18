<template>
    <slider-base
        :is-dragging="isDragging"
        :is-ticks-visible="isTicksVisible"
        :max="max"
        :min="min"
        :step="step"
        @dragging="onDragging"
        @update="onUpdate">
        <slider-track
            :percentage-lower="0"
            :percentage-upper="percentage">
            <slider-thumb
                :is-dragging="isDragging"
                :position="percentage"
                @decrement="onDecrement"
                @increment="onIncrement"/>
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
    import { ref, toRefs, watch } from 'vue-demi';
    import { clampWithStepPrecision } from '../utils';
    import { SliderBase, SliderThumb, SliderTrack } from './primitive';

    export interface Emits {
        (e: 'update:modelValue', value: number): void;
    }

    export interface Props {
        readonly isTicksVisible?: boolean;
        readonly max?: number;
        readonly min?: number;
        readonly modelValue: number;
        readonly step?: number;
    }

    const emit = defineEmits<Emits>();
    const props = withDefaults(defineProps<Props>(), {
        max: 1,
        min: 0,
        step: .1
    });
    const {max, min, modelValue, step} = toRefs(props);

    const isDragging = ref(false);
    const localValue = ref(0);
    const percentage = ref(0);

    function onDragging(is: boolean): void {
        isDragging.value = is;
    }

    function onUpdate(value: number): void {
        localValue.value = value;
    }

    function onDecrement(): void {
        const value = clampWithStepPrecision(localValue.value, min.value, max.value, step.value);
        emit('update:modelValue', Math.max(min.value, value - step.value));
    }

    function onIncrement(): void {
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
