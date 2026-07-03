<template>
    <FluxButtonGroup
        :class="$style.formQuantitySelector"
        role="group"
        :aria-label="ariaLabel"
        :aria-disabled="disabled ? true : undefined">
        <FluxSecondaryButton
            :class="$style.formQuantitySelectorButton"
            :aria-label="translate('flux.decrease')"
            :disabled="disabled || modelValue <= min"
            icon-leading="minus"
            tabindex="-1"
            @click="decrement"/>

        <input
            ref="input"
            :class="$style.formQuantitySelectorInput"
            :style="{
                width: `${width}px`
            }"
            :disabled="disabled"
            tabindex="0"
            type="number"
            :aria-label="ariaLabel"
            :max="max"
            :min="min"
            :step="step"
            :value="modelValue"
            @change="onChange"
            @input="onInput"/>

        <FluxSecondaryButton
            :class="$style.formQuantitySelectorButton"
            :aria-label="translate('flux.increase')"
            :disabled="disabled || modelValue >= max"
            icon-leading="plus"
            tabindex="-1"
            @click="increment"/>
    </FluxButtonGroup>
</template>

<script
    lang="ts"
    setup>
    import { unrefTemplateElement } from '@flux-ui/internals';
    import { onMounted, ref, toRef, unref, useTemplateRef, watch } from 'vue';
    import { useDisabled } from '~flux/components/composable';
    import { useTranslate } from '~flux/components/composable/private';
    import FluxButtonGroup from './FluxButtonGroup.vue';
    import FluxSecondaryButton from './FluxSecondaryButton.vue';
    import $style from '~flux/components/css/component/Form.module.scss';

    const modelValue = defineModel<number>({
        default: 0
    });

    const {
        disabled: componentDisabled,
        max = 100,
        min = 0,
        step = 1
    } = defineProps<{
        readonly ariaLabel?: string;
        readonly disabled?: boolean;
        readonly max?: number;
        readonly min?: number;
        readonly step?: number;
    }>();

    const disabled = useDisabled(toRef(() => componentDisabled));
    const inputRef = useTemplateRef('input');
    const translate = useTranslate();

    const width = ref(0);

    function clamp(value: number): number {
        return Math.min(max, Math.max(min, value));
    }

    function snap(value: number): number {
        if (step <= 0) {
            return value;
        }

        const decimals = (step.toString().split('.')[1] ?? '').length;
        const snapped = min + Math.round((value - min) / step) * step;

        return decimals > 0 ? Number(snapped.toFixed(decimals)) : snapped;
    }

    function decrement(): void {
        if (unref(disabled)) {
            return;
        }

        modelValue.value = clamp(unref(modelValue) - step);
    }

    function increment(): void {
        if (unref(disabled)) {
            return;
        }

        modelValue.value = clamp(unref(modelValue) + step);
    }

    function onInput(): void {
        sizeToContent();
    }

    function onChange(evt: Event): void {
        const value = (evt.target as HTMLInputElement).valueAsNumber;

        modelValue.value = Number.isNaN(value) ? min : clamp(snap(value));
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

    watch(modelValue, value => {
        if (typeof value !== 'number' || isNaN(value)) {
            modelValue.value = min;
            return;
        }

        const clamped = clamp(value);

        if (clamped !== value) {
            modelValue.value = clamped;
            return;
        }

        sizeToContent();
    }, {immediate: true});

    // The immediate watch above runs during setup, before the <input> is mounted, so its sizeToContent()
    // call bails on a null ref. Size once more after mount so the input has the correct width on pageload.
    onMounted(() => {
        sizeToContent();
    });
</script>
