<template>
    <div
        :class="clsx(
            $style.formRadioGroup,
            isInline && $style.isInline
        )"
        role="radiogroup"
        :aria-label="ariaLabel"
        :aria-invalid="error ? true : undefined">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { FluxFormInputBaseProps } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { provide, toRef, useId, type VNode } from 'vue';
    import { useDisabled } from '~flux/components/composable';
    import { FluxFormRadioGroupInjectionKey, type FluxFormRadioGroupValue } from '~flux/components/data';
    import $style from '~flux/components/css/component/Form.module.scss';

    const modelValue = defineModel<FluxFormRadioGroupValue>();

    const {
        disabled: componentDisabled,
        error,
        isReadonly,
        name
    } = defineProps<Pick<FluxFormInputBaseProps, 'disabled' | 'error' | 'isReadonly'> & {
        readonly ariaLabel?: string;
        readonly isInline?: boolean;
        readonly name?: string;
    }>();

    defineSlots<{
        default(): VNode[];
    }>();

    const disabled = useDisabled(toRef(() => componentDisabled));
    const generatedName = useId();

    provide(FluxFormRadioGroupInjectionKey, {
        name: name ?? generatedName,
        modelValue,
        disabled,
        isReadonly: toRef(() => isReadonly ?? false),
        error: toRef(() => error),
        select(value) {
            modelValue.value = value;
        }
    });
</script>
