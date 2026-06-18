<template>
    <component
        :is="isBareControl ? 'span' : 'label'"
        :class="clsx(
            $style.formRadio,
            disabled && $style.isDisabled,
            isReadonly && $style.isReadonly,
            error && $style.isInvalid
        )"
        :for="isBareControl ? undefined : id">
        <input
            ref="input"
            type="radio"
            :class="$style.formRadioNative"
            :id="id"
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
    </component>
</template>

<script
    lang="ts"
    setup>
    import { clsx } from 'clsx';
    import { computed, inject, toRef, unref } from 'vue';
    import { useDisabled, useFormFieldInjection, useFormRadioGroupInjection } from '~flux/components/composable';
    import { FluxItemControlInjectionKey, type FluxFormRadioGroupValue } from '~flux/components/data';
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
    const itemControl = inject(FluxItemControlInjectionKey, null);
    const {id} = useFormFieldInjection();
    const disabled = useDisabled(toRef(() => componentDisabled || unref(group.disabled)));

    const isBareControl = computed(() => itemControl?.isControl.value ?? false);

    itemControl?.register(id);

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
