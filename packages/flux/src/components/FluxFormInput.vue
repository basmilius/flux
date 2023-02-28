<template>
    <input
        class="flux-form-input"
        :class="{
            'is-disabled': isDisabled,
            'is-readonly': isReadonly
        }"
        :id="id"
        :autocomplete="autoComplete"
        :autofocus="autoFocus"
        :max="max"
        :maxlength="maxLength"
        :min="min"
        :placeholder="placeholder"
        :type="type"
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
    import { DateTime } from 'luxon';
    import { computed, inject, toRefs, unref } from 'vue-demi';

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
        readonly max?: number;
        readonly maxLength?: number;
        readonly min?: number;
        readonly modelValue?: object | string | number;
        readonly placeholder?: string;
        readonly type?: 'color' | 'date' | 'datetime-local' | 'email' | 'file' | 'month' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'time' | 'url' | 'week';
    }

    const emit = defineEmits<Emits>();
    const props = withDefaults(defineProps<Props>(), {
        autoFocus: false,
        type: 'text'
    });

    const {modelValue, type} = toRefs(props);

    const id = inject<string>('flux-form-field-id', '');

    const parsedValue = computed(() => {
        if (!modelValue) {
            return null;
        }

        const v = unref(modelValue);

        if (!v) {
            return null;
        }

        if (DateTime.isDateTime(v)) {
            return v.toISO().substring(0, 16);
        }

        return v.toString();
    });

    function onInput(evt: InputEvent): void {
        const value = (evt.target as HTMLInputElement).value;

        switch (type.value) {
            case 'date':
            case 'datetime-local':
            case 'month':
            case 'time':
            case 'week':
                emit('update:modelValue', DateTime.fromISO(value));
                break;

            case 'number':
                emit('update:modelValue', Number(value));
                break;

            default:
                emit('update:modelValue', value);
                break;
        }
    }
</script>

<style lang="scss">
    .flux-form-input {
        display: block;
        height: 42px;
        width: 100%;
        padding: 0 12px;
        background: var(--gray-0);
        border: 1px solid var(--gray-4);
        border-radius: var(--radius);
        color: var(--foreground);
        font: inherit;
        outline: 0;
        transition: 210ms var(--swift-out);
        transition-property: border-color, box-shadow;

        &::placeholder {
            color: var(--foreground-muted);
        }

        &::-webkit-color-swatch {
            border: 0;
            border-radius: calc(var(--radius) / 2);
        }

        &::-webkit-color-swatch-wrapper {
            margin: 0 -12px;
            padding: 3px;
            width: calc(100% + 24px);
        }

        &.is-disabled {
            background: var(--gray-2);
            cursor: not-allowed;
        }

        &:hover {
            border-color: var(--gray-5);
        }

        &:not(.is-disabled):focus,
        &:not(.is-disabled):focus-within {
            border-color: var(--primary-7);
            box-shadow: 0 0 0 1px var(--primary-7);
        }
    }
</style>
