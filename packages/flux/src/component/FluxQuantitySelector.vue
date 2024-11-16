<template>
    <FluxButtonGroup
        :class="$style.quantitySelector"
        :aria-disabled="disabled ? true : undefined">
        <FluxSecondaryButton
            :class="$style.quantitySelectorButton"
            :disabled="disabled || modelValue <= min"
            icon-before="minus"
            tabindex="-1"
            @click="decrement"/>

        <input
            ref="input"
            v-model="modelValue"
            :class="$style.quantitySelectorInput"
            :style="{
                width: `${width}px`
            }"
            :disabled="disabled"
            tabindex="0"
            type="number"
            :max="max"
            :min="min"
            :step="step"/>

        <FluxSecondaryButton
            :class="$style.quantitySelectorButton"
            :disabled="disabled || modelValue >= max"
            icon-before="plus"
            tabindex="-1"
            @click="increment"/>
    </FluxButtonGroup>
</template>

<script
    lang="ts"
    setup>
    import { ref, toRef, unref, useTemplateRef, watchEffect } from 'vue';
    import { useDisabled } from '@/composable';
    import { unrefTemplateElement } from '@/util';
    import FluxButtonGroup from './FluxButtonGroup.vue';
    import FluxSecondaryButton from './FluxSecondaryButton.vue';
    import $style from '@/css/component/Form.module.scss';

    const modelValue = defineModel<number>({
        default: 0
    });

    const {
        disabled: componentDisabled,
        max = 100,
        min = 0,
        step = 1
    } = defineProps<{
        readonly disabled?: boolean;
        readonly max?: number;
        readonly min?: number;
        readonly step?: number;
    }>();

    const disabled = useDisabled(toRef(() => componentDisabled));
    const inputRef = useTemplateRef('input');

    const width = ref(0);

    function decrement(): void {
        if (unref(disabled)) {
            return;
        }

        modelValue.value = Math.max(min, unref(modelValue) - step);
    }

    function increment(): void {
        if (unref(disabled)) {
            return;
        }

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
