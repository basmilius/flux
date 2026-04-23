<template>
    <label
        :class="clsx(
            $style.toggle,
            modelValue && $style.isChecked,
            disabled && $style.isDisabled,
            isReadonly && $style.isReadonly,
            error && $style.isInvalid,
            isSwitch && $style.isSwitch
        )"
        :for="id"
        :aria-disabled="disabled ? true : undefined"
        :aria-readonly="isReadonly ? true : undefined"
        :aria-invalid="error ? true : undefined">
        <FluxIcon
            v-if="iconOff"
            :class="$style.toggleIconOff"
            :name="iconOff"
            :size="14"/>

        <FluxIcon
            v-if="iconOn"
            :class="$style.toggleIconOn"
            :name="iconOn"
            :size="14"/>

        <input
            :class="$style.toggleInput"
            :id="id"
            :disabled="disabled"
            type="checkbox"
            :checked="modelValue"
            role="switch"
            :aria-checked="modelValue"
            @click="onClick"
            @input="toggle"/>
    </label>
</template>

<script
    lang="ts"
    setup>
    import type { FluxFormInputBaseProps, FluxIconName } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { toRef } from 'vue';
    import { useDisabled, useFormFieldInjection } from '$flux/composable';
    import FluxIcon from './FluxIcon.vue';
    import $style from '$flux/css/component/Form.module.scss';

    const modelValue = defineModel<boolean>({
        default: false
    });

    const {
        disabled: componentDisabled,
        isReadonly
    } = defineProps<Pick<FluxFormInputBaseProps, 'disabled' | 'error' | 'isReadonly'> & {
        readonly iconOff?: FluxIconName;
        readonly iconOn?: FluxIconName;
        readonly isSwitch?: boolean;
    }>();

    const disabled = useDisabled(toRef(() => componentDisabled));
    const {id} = useFormFieldInjection();

    function onClick(evt: MouseEvent): void {
        if (isReadonly) {
            evt.preventDefault();
        }
    }

    function toggle(evt: Event): void {
        if (isReadonly) {
            return;
        }

        modelValue.value = (evt.target as HTMLInputElement).checked;
    }
</script>
