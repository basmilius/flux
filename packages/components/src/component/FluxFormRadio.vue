<template>
    <label
        :class="clsx(
            $style.formRadio,
            disabled && $style.isDisabled,
            isReadonly && $style.isReadonly,
            error && $style.isInvalid
        )">
        <input
            ref="input"
            type="radio"
            :class="$style.formRadioNative"
            :name="group.name"
            :checked="isChecked"
            :disabled="disabled"
            :aria-disabled="disabled ? true : undefined"
            :aria-readonly="isReadonly ? true : undefined"
            :aria-invalid="error ? true : undefined"
            @change="onChange"
            @click="onClick">

        <span
            aria-hidden="true"
            :class="$style.formRadioElement"/>

        <span
            v-if="label || $slots.default"
            :class="$style.formRadioLabel">
            <slot>{{ label }}</slot>
        </span>
    </label>
</template>

<script
    lang="ts"
    setup>
    import { clsx } from 'clsx';
    import { computed, toRef, unref } from 'vue';
    import { useDisabled, useFormRadioGroupInjection } from '~flux/components/composable';
    import type { FluxFormRadioGroupValue } from '~flux/components/data';
    import $style from '~flux/components/css/component/Form.module.scss';

    const {
        disabled: componentDisabled,
        value
    } = defineProps<{
        readonly value: FluxFormRadioGroupValue;
        readonly disabled?: boolean;
        readonly label?: string;
    }>();

    defineSlots<{
        default(): any;
    }>();

    const group = useFormRadioGroupInjection();
    const disabled = useDisabled(toRef(() => componentDisabled || unref(group.disabled)));

    const isChecked = computed(() => unref(group.modelValue) === value);
    const isReadonly = computed(() => unref(group.isReadonly));
    const error = computed(() => unref(group.error));

    function onChange(): void {
        if (unref(isReadonly) || unref(disabled)) {
            return;
        }

        group.select(value);
    }

    function onClick(evt: MouseEvent): void {
        if (unref(isReadonly)) {
            evt.preventDefault();
        }
    }
</script>
