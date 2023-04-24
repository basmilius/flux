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
    };
</script>

<script
    lang="ts"
    setup>
    import { computed, onMounted, ref, toRefs, unref, watch } from 'vue-demi';
    import { useFormFieldInjection } from '../composables';

    export interface Emits {
        (e: 'blur'): void;

        (e: 'focus'): void;

        (e: 'update:modelValue', value: object | string | number): void;
    }

    export interface Props {
        readonly autoComplete?: string;
        readonly autoFocus?: boolean;
        readonly isDisabled?: boolean;
        readonly isReadonly?: boolean;
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

    const {id} = useFormFieldInjection();

    const inputRef = ref<HTMLTextAreaElement>();

    const parsedValue = computed(() => unref(modelValue) ?? '');

    onMounted(() => requestAnimationFrame(sizeToContent));

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

    watch([modelValue], () => requestAnimationFrame(sizeToContent));
</script>

<style lang="scss">
    .flux-form-text-area {
        height: unset;
        padding-top: 9px;
        padding-bottom: 9px;
        flex-shrink: 0;
    }
</style>
