<template>
    <div
        ref="root"
        :class="$style.coordinatePicker"
        role="slider"
        :aria-disabled="disabled ? true : undefined"
        @pointerdown="onPointerDown">
        <CoordinatePickerThumb
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
    import { unrefTemplateElement } from '@basmilius/flux-internals';
    import { roundStep } from '@basmilius/utils';
    import { computed, onMounted, onUnmounted, ref, toRef, unref, useTemplateRef, watch } from 'vue';
    import { useDisabled } from '$flux/composable';
    import CoordinatePickerThumb from './CoordinatePickerThumb.vue';
    import $style from '$flux/css/component/primitive/CoordinatePicker.module.scss';

    const emit = defineEmits<{
        dragging: [boolean];
    }>();

    const modelValue = defineModel<[number, number]>({
        default: [0, 0]
    });

    const {
        disabled: componentDisabled,
        max: maxProp = 100,
        min: minProp = 0,
        step: stepProp = 1
    } = defineProps<{
        readonly disabled?: boolean;
        readonly max?: number | [number, number];
        readonly min?: number | [number, number];
        readonly step?: number | [number, number];
    }>();

    const disabled = useDisabled(toRef(() => componentDisabled));
    const rootRef = useTemplateRef('root');

    const isDragging = ref(false);

    const max = computed(() => Array.isArray(maxProp) ? maxProp : [maxProp, maxProp]);
    const min = computed(() => Array.isArray(minProp) ? minProp : [minProp, minProp]);
    const step = computed(() => Array.isArray(stepProp) ? stepProp : [stepProp, stepProp]);

    const thumbPosition = computed<[number, number]>(() => [
        (unref(modelValue)[0] - unref(min)[0]) / (unref(max)[0] - unref(min)[0]),
        (unref(modelValue)[1] - unref(min)[1]) / (unref(max)[1] - unref(min)[1])
    ]);

    onMounted(() => {
        document.addEventListener('pointermove', onPointerMove);
        document.addEventListener('pointerup', onPointerUp, {passive: true});
    });

    onUnmounted(() => {
        document.removeEventListener('pointermove', onPointerMove);
        document.removeEventListener('pointerup', onPointerUp);
    });

    function onDecrement(x: boolean, y: boolean): void {
        if (unref(disabled)) {
            return;
        }

        let [valueX, valueY] = unref(modelValue);
        const [maxX, maxY] = unref(max);
        const [minX, minY] = unref(min);
        const [stepX, stepY] = unref(step);

        if (x) {
            valueX = +roundStep(Math.max(minX, Math.min(maxX, valueX - stepX)), stepX).toPrecision(4);
        }

        if (y) {
            valueY = +roundStep(Math.max(minY, Math.min(maxY, valueY - stepY)), stepY).toPrecision(4);
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
            valueX = +roundStep(Math.max(minX, Math.min(maxX, valueX + stepX)), stepX).toPrecision(4);
        }

        if (y) {
            valueY = +roundStep(Math.max(minY, Math.min(maxY, valueY + stepY)), stepY).toPrecision(4);
        }

        modelValue.value = [valueX, valueY];
    }

    function onPointerDown(evt: PointerEvent): void {
        if (unref(disabled)) {
            return;
        }

        isDragging.value = true;
        requestAnimationFrame(() => onPointerMove(evt));
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

        const x = Math.max(0, Math.min(1, (evt.clientX - left) / width));
        const y = Math.max(0, Math.min(1, (evt.clientY - top) / height));

        modelValue.value = [
            +roundStep(x * (maxX - minX) + minX, stepX).toPrecision(4),
            +roundStep(y * (maxY - minY) + minY, stepY).toPrecision(4)
        ];

        evt.preventDefault();
    }

    function onPointerUp(): void {
        isDragging.value = false;
    }

    watch(isDragging, isDragging => emit('dragging', isDragging));
</script>
