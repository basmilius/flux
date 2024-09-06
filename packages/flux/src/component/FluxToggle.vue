<template>
    <label
        :class="clsx(
            styles.toggle,
            modelValue && styles.isChecked,
            isDisabled && styles.isDisabled,
            isSwitch && styles.isSwitch
        )"
        :for="id">
        <FluxIcon
            v-if="iconOff"
            :class="styles.toggleIconOff"
            :size="14"
            :variant="iconOff"/>

        <FluxIcon
            v-if="iconOn"
            :class="styles.toggleIconOn"
            :size="14"
            :variant="iconOn"/>

        <input
            :class="styles.toggleInput"
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
    import styles from '@/css/component/Form.module.scss';

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
