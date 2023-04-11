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
        :disabled="isDisabled"
        :max="max"
        :maxlength="maxLength"
        :min="min"
        :placeholder="placeholder"
        :readonly="isReadonly"
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
    };
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
            return v.toISO()!.substring(0, 16);
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
    @use '../scss/mixin' as flux;

    .flux-form-input {
        display: block;
        height: 42px;
        width: 100%;
        padding: 0 12px;
        background: rgb(var(--gray-0));
        border: 1px solid rgb(var(--gray-4) / .75);
        border-radius: var(--radius);
        box-shadow: var(--shadow-px);
        color: var(--foreground);
        font: inherit;
        outline: 0;
        transition: 180ms var(--swift-out);
        transition-property: border-color, flux.focus-ring-transition-properties();

        &::placeholder {
            color: var(--foreground-secondary);
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
            background: rgb(var(--gray-2));
            cursor: not-allowed;
        }

        &:not(.is-disabled) {
            @include flux.focus-ring(-1px);
        }

        &:hover {
            border-color: rgb(var(--gray-5));
        }
    }

    @include flux.dark-mode {
        .flux-form-input::-webkit-calendar-picker-indicator {
            filter: invert(1);
        }
    }
</style>
