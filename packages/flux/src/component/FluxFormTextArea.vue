<template>
    <textarea
        v-model="modelValue"
        ref="input"
        :class="isDisabled ? styles.formTextAreaDisabled : styles.formTextAreaEnabled"
        :id="id"
        :autocomplete="autoComplete"
        :autofocus="autoFocus"
        :maxlength="maxLength"
        :placeholder="placeholder"
        :style="{
            '--rows': rows
        }"
        @blur="emit('blur')"
        @focus="emit('focus')"/>
</template>

<script
    lang="ts"
    setup>
    import { useFormFieldInjection } from '@/composable';
    import styles from '@/css/component/Form.module.scss';

    const emit = defineEmits<{
        blur: [];
        focus: [];
    }>();

    const modelValue = defineModel<string>({
        default: ''
    });

    const {
        autoFocus = false,
        rows = 3
    } = defineProps<{
        readonly autoComplete?: string;
        readonly autoFocus?: boolean;
        readonly isDisabled?: boolean;
        readonly isReadonly?: boolean;
        readonly maxLength?: number;
        readonly placeholder?: string;
        readonly rows?: number;
    }>();

    const {id} = useFormFieldInjection();
</script>
