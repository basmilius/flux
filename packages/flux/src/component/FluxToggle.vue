<template>
    <label
        :class="clsx(
            $style.toggle,
            modelValue && $style.isChecked,
            disabled && $style.isDisabled,
            isSwitch && $style.isSwitch
        )"
        :for="id"
        :aria-disabled="disabled ? true : undefined">
        <FluxIcon
            v-if="iconOff"
            :class="$style.toggleIconOff"
            :size="14"
            :variant="iconOff"/>

        <FluxIcon
            v-if="iconOn"
            :class="$style.toggleIconOn"
            :size="14"
            :variant="iconOn"/>

        <input
            :class="$style.toggleInput"
            :id="id"
            :disabled="disabled"
            type="checkbox"
            :checked="modelValue"
            role="switch"
            :aria-checked="modelValue"
            @input="toggle"/>
    </label>
</template>

<script
    lang="ts"
    setup>
    import { clsx } from 'clsx';
    import { toRef } from 'vue';
    import { useDisabled, useFormFieldInjection } from '@/composable';
    import type { FluxIconName } from '@/types';
    import FluxIcon from './FluxIcon.vue';
    import $style from '@/css/component/Form.module.scss';

    const modelValue = defineModel<boolean>({
        default: false
    });

    const {
        disabled: componentDisabled
    } = defineProps<{
        readonly iconOff?: FluxIconName;
        readonly iconOn?: FluxIconName;
        readonly disabled?: boolean;
        readonly isSwitch?: boolean;
    }>();

    const disabled = useDisabled(toRef(() => componentDisabled));
    const {id} = useFormFieldInjection();

    function toggle(evt: Event): void {
        modelValue.value = (evt.target as HTMLInputElement).checked;
    }
</script>
