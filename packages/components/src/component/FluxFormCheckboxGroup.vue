<template>
    <div
        :class="clsx(
            $style.formCheckboxGroup,
            isInline && $style.isInline
        )"
        :role="field?.isGroup ? undefined : 'group'"
        :aria-label="field?.isGroup ? undefined : ariaLabel"
        :aria-invalid="error ? true : undefined">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { FluxFormInputBaseProps } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { inject, provide, toRef, unref, type VNode } from 'vue';
    import { useDisabled } from '~flux/components/composable';
    import { FluxFormCheckboxGroupInjectionKey, FluxFormFieldInjectionKey, type FluxFormCheckboxGroupValue } from '~flux/components/data';
    import $style from '~flux/components/css/component/Form.module.scss';

    const modelValue = defineModel<FluxFormCheckboxGroupValue[]>({
        default: () => []
    });

    const {
        disabled: componentDisabled,
        error,
        isReadonly
    } = defineProps<Pick<FluxFormInputBaseProps, 'disabled' | 'error' | 'isReadonly'> & {
        readonly ariaLabel?: string;
        readonly isInline?: boolean;
    }>();

    defineSlots<{
        default(): VNode[];
    }>();

    const field = inject(FluxFormFieldInjectionKey, null);
    const disabled = useDisabled(toRef(() => componentDisabled));


    provide(FluxFormCheckboxGroupInjectionKey, {
        modelValue,
        disabled,
        isReadonly: toRef(() => isReadonly ?? false),
        error: toRef(() => error),
        has: value => unref(modelValue).includes(value),
        toggle(value) {
            const current = unref(modelValue);

            modelValue.value = current.includes(value)
                ? current.filter(item => item !== value)
                : [...current, value];
        }
    });
</script>
