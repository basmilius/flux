<template>
    <component
        :is="isBareControl ? 'span' : 'label'"
        :class="clsx(
            $style.formToggle,
            modelValue && $style.isChecked,
            disabled && $style.isDisabled,
            isReadonly && $style.isReadonly,
            error && $style.isInvalid,
            isSwitch && $style.isSwitch
        )"
        :for="isBareControl ? undefined : id"
        :aria-disabled="disabled ? true : undefined"
        :aria-readonly="isReadonly ? true : undefined"
        :aria-invalid="error ? true : undefined">
        <FluxIcon
            v-if="iconOff"
            :class="$style.formToggleIconOff"
            :name="iconOff"
            :size="14"/>

        <FluxIcon
            v-if="iconOn"
            :class="$style.formToggleIconOn"
            :name="iconOn"
            :size="14"/>

        <input
            :class="$style.formToggleInput"
            :id="id"
            :disabled="disabled"
            type="checkbox"
            :checked="modelValue"
            role="switch"
            :aria-checked="modelValue"
            @click="onClick"
            @input="toggle"/>
    </component>
</template>

<script
    lang="ts"
    setup>
    import type { FluxFormInputBaseProps, FluxIconName } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { computed, inject, toRef } from 'vue';
    import { useDisabled, useFormFieldInjection } from '~flux/components/composable';
    import { FluxItemControlInjectionKey } from '~flux/components/data';
    import FluxIcon from './FluxIcon.vue';
    import $style from '~flux/components/css/component/Form.module.scss';

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

    const itemControl = inject(FluxItemControlInjectionKey, null);
    const disabled = useDisabled(toRef(() => componentDisabled));
    const {id} = useFormFieldInjection();

    const isBareControl = computed(() => itemControl?.isControl.value ?? false);

    itemControl?.register(id);

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
