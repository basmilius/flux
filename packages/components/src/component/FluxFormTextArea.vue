<template>
    <textarea
        v-model="modelValue"
        ref="input"
        :class="clsx(
            disabled ? $style.formTextAreaDisabled : $style.formTextAreaEnabled,
            isCondensed && $style.isCondensed,
            isSecondary && $style.isSecondary,
            error && $style.isInvalid
        )"
        :id="id"
        :name="name"
        :autocomplete="autoComplete"
        :autofocus="autoFocus"
        :disabled="disabled"
        :readonly="isReadonly"
        :maxlength="maxLength"
        :placeholder="placeholder"
        :style="{
            '--rows': rows
        }"
        :aria-disabled="disabled ? true : undefined"
        :aria-readonly="isReadonly || undefined"
        :aria-invalid="error ? true : undefined"
        @blur="emit('blur')"
        @focus="emit('focus')"/>
</template>

<script
    lang="ts"
    setup>
    import type { FluxAutoCompleteType, FluxFormInputBaseProps } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { toRef } from 'vue';
    import { useDisabled, useFormFieldInjection } from '$flux/composable';
    import $style from '$flux/css/component/Form.module.scss';

    const emit = defineEmits<{
        blur: [];
        focus: [];
    }>();

    const modelValue = defineModel<string>({
        default: ''
    });

    const {
        autoFocus = false,
        disabled: componentDisabled,
        rows = 3
    } = defineProps<FluxFormInputBaseProps & {
        readonly autoComplete?: FluxAutoCompleteType;
        readonly maxLength?: number;
        readonly rows?: number;
    }>();

    const disabled = useDisabled(toRef(() => componentDisabled));
    const {id} = useFormFieldInjection();
</script>
