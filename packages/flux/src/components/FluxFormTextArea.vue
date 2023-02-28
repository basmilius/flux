<template>
    <textarea
        ref="inputRef"
        class="flux-form-input flux-form-text-area"
        :id="id"
        :autocomplete="autoComplete"
        :autofocus="autoFocus"
        :maxlength="maxLength"
        :placeholder="placeholder"
        :rows="rows"
        :value="parsedValue"
        @blur="$emit('blur')"
        @focus="$emit('focus')"
        @input="onInput"/>
</template>

<script lang="ts">
    export default {
        model: {
            prop: 'modelValue',
            event: 'update:modelValue'
        }
    }
</script>

<script
    lang="ts"
    setup>
    import { computed, inject, onMounted, ref, toRefs, unref } from 'vue-demi';

    export interface Emits {
        (e: 'blur'): void;

        (e: 'focus'): void;

        (e: 'update:modelValue', value: object | string | number): void;
    }

    export interface Props {
        readonly autoComplete?: string;
        readonly autoFocus?: boolean;
        readonly maxLength?: number;
        readonly modelValue?: string;
        readonly placeholder?: string;
        readonly rows?: number;
    }

    const emit = defineEmits<Emits>();
    const props = withDefaults(defineProps<Props>(), {
        autoFocus: false,
        rows: 3
    });

    const {modelValue, rows} = toRefs(props);

    const id = inject<string>('flux-form-field-id') ?? '';

    const inputRef = ref<HTMLTextAreaElement>();

    const parsedValue = computed(() => unref(modelValue) ?? '');

    onMounted(() => {
        sizeToContent();
    });

    function onInput(evt: InputEvent): void {
        emit('update:modelValue', (evt.target as HTMLTextAreaElement).value);
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
</script>

<style lang="scss">
    .flux-form-text-area {
        height: unset;
        padding-top: 9px;
        padding-bottom: 9px;
    }
</style>
