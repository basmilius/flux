<template>
    <textarea
        v-model="modelValue"
        ref="input"
        :class="disabled ? $style.formTextAreaDisabled : $style.formTextAreaEnabled"
        :id="id"
        :autocomplete="autoComplete"
        :autofocus="autoFocus"
        :disabled="disabled"
        :maxlength="maxLength"
        :placeholder="placeholder"
        :style="{
            '--rows': rows
        }"
        :aria-disabled="disabled ? true : undefined"
        @blur="emit('blur')"
        @focus="emit('focus')"/>
</template>

<script
    lang="ts"
    setup>
    import { toRef } from 'vue';
    import { useDisabled, useFormFieldInjection } from '$flux/composable';
    import type { FluxAutoCompleteType } from '$flux/types';
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
    } = defineProps<{
        readonly autoComplete?: FluxAutoCompleteType;
        readonly autoFocus?: boolean;
        readonly disabled?: boolean;
        readonly isReadonly?: boolean;
        readonly maxLength?: number;
        readonly placeholder?: string;
        readonly rows?: number;
    }>();

    const disabled = useDisabled(toRef(() => componentDisabled));
    const {id} = useFormFieldInjection();
</script>
