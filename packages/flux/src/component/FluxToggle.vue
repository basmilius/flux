<template>
    <label
        :class="clsx(
            $style.toggle,
            modelValue && $style.isChecked,
            isDisabled && $style.isDisabled,
            isSwitch && $style.isSwitch
        )"
        :for="id">
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
            :disabled="isDisabled"
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
    import { useFormFieldInjection } from '@/composable';
    import type { IconName } from '@/types';
    import FluxIcon from './FluxIcon.vue';
    import $style from '@/css/component/Form.module.scss';

    const modelValue = defineModel<boolean>({
        default: false
    });

    defineProps<{
        readonly iconOff?: IconName;
        readonly iconOn?: IconName;
        readonly isDisabled?: boolean;
        readonly isSwitch?: boolean;
    }>();

    const {id} = useFormFieldInjection();

    function toggle(evt: Event): void {
        modelValue.value = (evt.target as HTMLInputElement).checked;
    }
</script>
