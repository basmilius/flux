<template>
    <div
        ref="root"
        :class="$style.coordinatePicker"
        role="group"
        :aria-disabled="disabled ? true : undefined"
        :aria-label="ariaLabel"
        @pointerdown="onPointerDown">
        <CoordinatePickerThumb
            :aria-label="ariaLabel"
            :disabled="disabled"
            :is-dragging="isDragging"
            :position="thumbPosition"
            @decrement="onDecrement"
            @increment="onIncrement"/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { roundStep } from '@basmilius/utils';
    import { unrefTemplateElement } from '@flux-ui/internals';
    import { computed, onUnmounted, ref, toRef, unref, useTemplateRef, watch } from 'vue';
    import { useDisabled } from '~flux/components/composable';
    import CoordinatePickerThumb from './CoordinatePickerThumb.vue';
    import $style from '~flux/components/css/component/primitive/CoordinatePicker.module.scss';

    const emit = defineEmits<{
        dragging: [boolean];
    }>();

    const modelValue = defineModel<[number, number]>({
        required: true
    });

    const {
        disabled: componentDisabled,
        max: maxProp = 100,
        min: minProp = 0,
        step: stepProp = 1
    } = defineProps<{
        readonly ariaLabel?: string;
        readonly disabled?: boolean;
        readonly max?: number | [number, number];
        readonly min?: number | [number, number];
        readonly step?: number | [number, number];
    }>();

    const rootRef = useTemplateRef('root');
    const isDragging = ref(false);
    const pointerId = ref<number | null>(null);

    const disabled = useDisabled(toRef(() => componentDisabled));

    const max = computed(() => Array.isArray(maxProp) ? maxProp : [maxProp, maxProp]);
    const min = computed(() => Array.isArray(minProp) ? minProp : [minProp, minProp]);
    const step = computed(() => Array.isArray(stepProp) ? stepProp : [stepProp, stepProp]);
    const thumbPosition = computed<[number, number]>(() => [
        normalize(unref(modelValue)[0], unref(min)[0], unref(max)[0]),
        normalize(unref(modelValue)[1], unref(min)[1], unref(max)[1])
    ]);

    watch(isDragging, isDragging => emit('dragging', isDragging));

    onUnmounted(() => {
        document.removeEventListener('pointermove', onPointerMove);
        document.removeEventListener('pointercancel', onPointerUp);
        document.removeEventListener('pointerup', onPointerUp);
    });

    function normalize(value: number, axisMin: number, axisMax: number): number {
        const span = axisMax - axisMin;

        if (span <= 0) {
            return 0;
        }

        return Math.max(0, Math.min(1, (value - axisMin) / span));
    }

    function getStepDecimals(stepValue: number): number {
        const stepString = stepValue.toString();

        if (stepString.includes('e-')) {
            const [base, exponent] = stepString.split('e-');

            return (base.split('.')[1]?.length ?? 0) + Number(exponent);
        }

        return stepString.split('.')[1]?.length ?? 0;
    }

    function roundToStep(value: number, stepValue: number): number {
        if (stepValue <= 0) {
            return value;
        }

        return +roundStep(value, stepValue).toFixed(getStepDecimals(stepValue));
    }

    function onDecrement(x: boolean, y: boolean): void {
        if (unref(disabled)) {
            return;
        }

        let [valueX, valueY] = unref(modelValue);
        const [maxX, maxY] = unref(max);
        const [minX, minY] = unref(min);
        const [stepX, stepY] = unref(step);

        if (x) {
            valueX = roundToStep(Math.max(minX, Math.min(maxX, valueX - stepX)), stepX);
        }

        if (y) {
            valueY = roundToStep(Math.max(minY, Math.min(maxY, valueY - stepY)), stepY);
        }

        modelValue.value = [valueX, valueY];
    }

    function onIncrement(x: boolean, y: boolean): void {
        if (unref(disabled)) {
            return;
        }

        let [valueX, valueY] = unref(modelValue);
        const [maxX, maxY] = unref(max);
        const [minX, minY] = unref(min);
        const [stepX, stepY] = unref(step);

        if (x) {
            valueX = roundToStep(Math.max(minX, Math.min(maxX, valueX + stepX)), stepX);
        }

        if (y) {
            valueY = roundToStep(Math.max(minY, Math.min(maxY, valueY + stepY)), stepY);
        }

        modelValue.value = [valueX, valueY];
    }

    function onPointerDown(evt: PointerEvent): void {
        if (unref(disabled) || evt.button !== 0) {
            return;
        }

        const root = unrefTemplateElement(rootRef);

        isDragging.value = true;
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

        const [maxX, maxY] = unref(max);
        const [minX, minY] = unref(min);
        const [stepX, stepY] = unref(step);

        let {top, left, width, height} = root.getBoundingClientRect();
        top += 6;
        left += 6;
        width -= 12;
        height -= 12;

        if (width <= 0 || height <= 0) {
            return;
        }

        const x = Math.max(0, Math.min(1, (evt.clientX - left) / width));
        const y = Math.max(0, Math.min(1, (evt.clientY - top) / height));

        modelValue.value = [
            roundToStep(x * (maxX - minX) + minX, stepX),
            roundToStep(y * (maxY - minY) + minY, stepY)
        ];

        evt.preventDefault();
    }

    function onPointerUp(): void {
        const root = unrefTemplateElement(rootRef);

        if (pointerId.value !== null) {
            root?.releasePointerCapture?.(pointerId.value);
            pointerId.value = null;
        }

        isDragging.value = false;
        document.removeEventListener('pointermove', onPointerMove);
        document.removeEventListener('pointercancel', onPointerUp);
        document.removeEventListener('pointerup', onPointerUp);
    }
</script>
