<template>
    <FluxButtonGroup :class="styles.quantitySelector">
        <FluxSecondaryButton
            :class="styles.quantitySelectorButton"
            :disabled="modelValue <= min"
            icon-before="minus"
            tabindex="-1"
            @click="decrement"/>

        <input
            ref="input"
            v-model="modelValue"
            :class="styles.quantitySelectorInput"
            :style="{
                width: `${width}px`
            }"
            tabindex="0"
            type="number"
            :max="max"
            :min="min"
            :step="step"/>

        <FluxSecondaryButton
            :class="styles.quantitySelectorButton"
            :disabled="modelValue >= max"
            icon-before="plus"
            tabindex="-1"
            @click="increment"/>
    </FluxButtonGroup>
</template>

<script
    lang="ts"
    setup>
    import { ref, unref, useTemplateRef, watchEffect } from 'vue';
    import { unrefTemplateElement } from '@/util';
    import FluxButtonGroup from './FluxButtonGroup.vue';
    import FluxSecondaryButton from './FluxSecondaryButton.vue';
    import styles from '@/css/component/Form.module.scss';

    const modelValue = defineModel<number>({
        default: 0
    });

    const {
        max = 100,
        min = 0,
        step = 1
    } = defineProps<{
        readonly max?: number;
        readonly min?: number;
        readonly step?: number;
    }>();

    const inputRef = useTemplateRef('input');

    const width = ref(0);

    function decrement(): void {
        modelValue.value = Math.max(min, unref(modelValue) - step);
    }

    function increment(): void {
        modelValue.value = Math.min(max, unref(modelValue) + step);
    }

    function sizeToContent(): void {
        const input = unrefTemplateElement<HTMLInputElement>(inputRef);

        if (!input || isNaN(input.valueAsNumber)) {
            return;
        }

        width.value = 0;

        requestAnimationFrame(() => {
            width.value = Math.max(51, input.scrollWidth + 30);
        });
    }

    watchEffect(() => {
        if (unref(modelValue) > max) {
            increment();
            return;
        }

        if (unref(modelValue) < min) {
            decrement();
            return;
        }

        sizeToContent();
    });
</script>
