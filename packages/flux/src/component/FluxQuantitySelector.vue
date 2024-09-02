<template>
    <FluxButtonGroup :class="styles.quantitySelector">
        <FluxSecondaryButton
            :class="styles.quantitySelectorButton"
            :disabled="modelValue <= min"
            icon-before="minus"
            tabindex="-1"
            @click="decrement"/>

        <input
            ref="inputRef"
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
    import { ref, toRefs, unref, watchEffect } from 'vue';
    import FluxButtonGroup from './FluxButtonGroup.vue';
    import FluxSecondaryButton from './FluxSecondaryButton.vue';
    import styles from '@/css/component/Form.module.scss';

    export type Props = {
        readonly max?: number;
        readonly min?: number;
        readonly step?: number;
    };

    const modelValue = defineModel<number>({default: 0});
    const props = withDefaults(defineProps<Props>(), {
        max: 100,
        min: 0,
        step: 1
    });
    const {max, min, step} = toRefs(props);

    const inputRef = ref<HTMLInputElement>();
    const width = ref(0);

    function decrement(): void {
        modelValue.value = Math.max(unref(min), unref(modelValue) - unref(step));
    }

    function increment(): void {
        modelValue.value = Math.min(unref(max), unref(modelValue) + unref(step));
    }

    function sizeToContent(): void {
        const input = unref(inputRef);

        if (!input || isNaN(input.valueAsNumber)) {
            return;
        }

        width.value = 0;

        requestAnimationFrame(() => {
            width.value = Math.max(51, input.scrollWidth + 30);
        });
    }

    watchEffect(() => {
        if (unref(modelValue) > unref(max)) {
            increment();
            return;
        }

        if (unref(modelValue) < unref(min)) {
            decrement();
            return;
        }

        sizeToContent();
    });
</script>
