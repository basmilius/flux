<template>
    <div
        :class="clsx(
            disabled ? $style.formInputDisabled : $style.formInputEnabled,
            isCondensed && $style.isCondensed,
            isSecondary && $style.isSecondary,
            error && $style.isInvalid
        )"
        :aria-disabled="disabled ? true : undefined">
        <input
            ref="input"
            :class="clsx($style.formInputNative, $style.formNumberInputNative)"
            :id="id"
            :name="name"
            :autofocus="autoFocus"
            inputmode="decimal"
            type="number"
            :aria-describedby="describedBy"
            :aria-disabled="disabled ? true : undefined"
            :aria-invalid="error ? true : undefined"
            :disabled="disabled"
            :max="max"
            :min="min"
            :placeholder="placeholder"
            :readonly="isReadonly"
            :step="step"
            :value="modelValue ?? ''"
            @blur="onBlur"
            @focus="onFocus"
            @input="onInput"
            @keydown="onKeyDown">

        <span
            aria-hidden="true"
            :class="$style.formNumberInputButtons">
            <button
                type="button"
                tabindex="-1"
                :class="$style.formNumberInputButton"
                :disabled="disabled || isReadonly || atMax"
                @click="stepValue(1)">
                <FluxIcon
                    name="angle-up"
                    :size="12"/>
            </button>

            <button
                type="button"
                tabindex="-1"
                :class="$style.formNumberInputButton"
                :disabled="disabled || isReadonly || atMin"
                @click="stepValue(-1)">
                <FluxIcon
                    name="angle-down"
                    :size="12"/>
            </button>
        </span>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { unrefTemplateElement } from '@flux-ui/internals';
    import type { FluxFormInputBaseProps } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { computed, toRef, unref, useTemplateRef } from 'vue';
    import { useDisabled, useFormFieldInjection } from '~flux/components/composable';
    import FluxIcon from './FluxIcon.vue';
    import $style from '~flux/components/css/component/Form.module.scss';

    const emit = defineEmits<{
        blur: [];
        focus: [];
    }>();

    const modelValue = defineModel<number | null>({
        default: null
    });

    const {
        disabled: componentDisabled,
        isReadonly,
        max,
        min,
        step = 1
    } = defineProps<FluxFormInputBaseProps & {
        readonly max?: number;
        readonly min?: number;
        readonly step?: number;
    }>();

    const inputRef = useTemplateRef<HTMLInputElement>('input');
    const disabled = useDisabled(toRef(() => componentDisabled));
    const {id, describedBy} = useFormFieldInjection();

    const atMax = computed(() => max !== undefined && modelValue.value !== null && modelValue.value >= max);
    const atMin = computed(() => min !== undefined && modelValue.value !== null && modelValue.value <= min);

    function blur(): void {
        unrefTemplateElement(inputRef)?.blur();
    }

    function focus(): void {
        unrefTemplateElement(inputRef)?.focus();
    }

    function clamp(value: number): number {
        let result = value;

        if (min !== undefined) {
            result = Math.max(min, result);
        }

        if (max !== undefined) {
            result = Math.min(max, result);
        }

        return result;
    }

    function round(value: number): number {
        const decimals = (step.toString().split('.')[1] ?? '').length;

        return decimals > 0 ? Number(value.toFixed(decimals)) : value;
    }

    function snap(value: number): number {
        if (step <= 0) {
            return value;
        }

        const base = min ?? 0;

        return round(base + Math.round((value - base) / step) * step);
    }

    function stepValue(direction: 1 | -1): void {
        if (unref(disabled) || isReadonly) {
            return;
        }

        const base = modelValue.value ?? min ?? 0;

        modelValue.value = clamp(round(base + direction * step));
    }

    function onBlur(): void {
        if (modelValue.value !== null) {
            modelValue.value = clamp(snap(modelValue.value));
        }

        emit('blur');
    }

    function onFocus(): void {
        emit('focus');
    }

    function onInput(evt: Event): void {
        const value = (evt.target as HTMLInputElement).value;

        if (value === '') {
            modelValue.value = null;
            return;
        }

        const numeric = Number(value);

        if (Number.isNaN(numeric)) {
            return;
        }

        modelValue.value = numeric;
    }

    function onKeyDown(evt: KeyboardEvent): void {
        if (evt.key === 'ArrowUp') {
            stepValue(1);
            evt.preventDefault();
        } else if (evt.key === 'ArrowDown') {
            stepValue(-1);
            evt.preventDefault();
        }
    }

    defineExpose({
        blur,
        focus
    });
</script>
