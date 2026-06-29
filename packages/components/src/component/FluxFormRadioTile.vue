<template>
    <label
        :class="clsx(
            $style.formRadioTile,
            disabled && $style.isDisabled,
            isReadonly && $style.isReadonly,
            error && $style.isInvalid
        )"
        :for="id">
        <input
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

        <FluxIcon
            v-if="icon"
            :class="$style.formRadioIcon"
            :name="icon"
            :size="20"/>

        <span :class="$style.formRadioText">
            <span :class="$style.formRadioLabel">
                <slot>{{ label }}</slot>
            </span>

            <span
                v-if="subLabel"
                :class="$style.formRadioSubLabel">
                {{ subLabel }}
            </span>
        </span>
    </label>
</template>

<script
    lang="ts"
    setup>
    import type { FluxIconName } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { computed, toRef, unref } from 'vue';
    import { useDisabled, useFormFieldInjection, useFormRadioGroupInjection } from '~flux/components/composable';
    import type { FluxFormRadioGroupValue } from '~flux/components/data';
    import FluxIcon from './FluxIcon.vue';
    import $style from '~flux/components/css/component/Form.module.scss';

    const {
        disabled: componentDisabled,
        value
    } = defineProps<{
        readonly value: FluxFormRadioGroupValue;
        readonly disabled?: boolean;
        readonly icon?: FluxIconName;
        readonly label?: string;
        readonly subLabel?: string;
    }>();

    defineSlots<{
        default(): any;
    }>();

    const group = useFormRadioGroupInjection();
    const {id} = useFormFieldInjection();
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
