<template>
    <textarea
        ref="inputRef"
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
    import { computed, onMounted, ref, toRefs, unref, watch } from 'vue';
    import { useFormFieldInjection } from '@/composable';
    import styles from '@/css/component/Form.module.scss';

    export type Emits = {
        blur: [];
        focus: [];
    };

    export type Props = {
        readonly autoComplete?: string;
        readonly autoFocus?: boolean;
        readonly isDisabled?: boolean;
        readonly isReadonly?: boolean;
        readonly maxLength?: number;
        readonly placeholder?: string;
        readonly rows?: number;
    };

    const emit = defineEmits<Emits>();
    const modelValue = defineModel<string>({default: ''});
    const props = withDefaults(defineProps<Props>(), {
        autoFocus: false,
        rows: 3
    });
    const {rows} = toRefs(props);

    const {id} = useFormFieldInjection();

    const inputRef = ref<HTMLTextAreaElement>();

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
