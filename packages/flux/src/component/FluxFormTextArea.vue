<template>
    <textarea
        ref="input"
        :class="isDisabled ? styles.formTextAreaDisabled : styles.formTextAreaEnabled"
        :id="id"
        :autocomplete="autoComplete"
        :autofocus="autoFocus"
        :maxlength="maxLength"
        :placeholder="placeholder"
        :rows="rows"
        :value="parsedValue"
        @blur="emit('blur')"
        @focus="emit('focus')"
        @input="onInput"/>
</template>

<script
    lang="ts"
    setup>
    import { computed, onMounted, unref, useTemplateRef, watch } from 'vue';
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

    const inputRef = useTemplateRef('input');
    const {id} = useFormFieldInjection();

    const parsedValue = computed(() => unref(modelValue) ?? '');

    onMounted(() => requestAnimationFrame(sizeToContent));

    function onInput(evt: Event): void {
        modelValue.value = (evt.target as HTMLTextAreaElement).value;
        sizeToContent();
    }

    function sizeToContent(): void {
        const input = unref(inputRef);

        if (!input) {
            return;
        }

        input.style.height = 'auto';
        input.style.height = `${input.scrollHeight}px`;
    }

    watch([modelValue], () => requestAnimationFrame(sizeToContent));
</script>
