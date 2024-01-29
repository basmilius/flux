<template>
    <textarea
        ref="inputRef"
        class="flux-form-input flux-form-text-area"
        :class="{
            'is-disabled': isDisabled,
            'is-readonly': isReadonly
        }"
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
    import { useFormFieldInjection } from '@/composable/private';

    export type Emits = {
        (e: 'blur'): void;
        (e: 'focus'): void;
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

<style lang="scss">
    .flux-form-text-area {
        height: unset;
        padding-top: 9px;
        padding-bottom: 9px;
        flex-shrink: 0;
        resize: vertical;

        &::placeholder {
            color: var(--foreground-secondary);
        }
    }
</style>
