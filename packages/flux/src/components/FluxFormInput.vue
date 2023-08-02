<template>
    <div
        class="flux-form-input"
        :class="{
            'is-disabled': isDisabled,
            'is-readonly': isReadonly,
            'is-secondary': isSecondary
        }">
        <input
            class="flux-form-input-native"
            :class="{
                'has-icon-after': !!iconAfter,
                'has-icon-before': !!iconBefore
            }"
            :id="id"
            :autocomplete="autoComplete"
            :autofocus="autoFocus"
            :disabled="isDisabled"
            :max="max"
            :maxlength="maxLength"
            :min="min"
            :pattern="pattern"
            :placeholder="placeholder"
            :readonly="isReadonly"
            :step="step"
            :type="type"
            :value="parsedValue"
            @blur="$emit('blur')"
            @focus="$emit('focus')"
            @input="onInput"
            @keydown="onKeyDown"/>

        <FluxIcon
            v-if="iconBefore"
            class="flux-form-input-icon is-before"
            :size="16"
            :variant="iconBefore"/>

        <FluxIcon
            v-if="iconAfter"
            class="flux-form-input-icon is-after"
            :size="16"
            :variant="iconAfter"/>
    </div>
</template>

<script lang="ts">
    export default {
        model: {
            prop: 'model-value',
            event: 'update:model-value'
        }
    };
</script>

<script
    lang="ts"
    setup>
    import type { IconNames } from '@/data';
    import { DateTime } from 'luxon';
    import { computed, toRefs, unref } from 'vue-demi';
    import { useFormFieldInjection } from '@/composables';
    import FluxIcon from './FluxIcon.vue';

    export interface Emits {
        (e: 'blur'): void;

        (e: 'focus'): void;

        (e: 'show-picker'): void;

        (e: 'update:model-value', value: object | string | number): void;
    }

    export interface Props {
        readonly autoComplete?: string;
        readonly autoFocus?: boolean;
        readonly iconAfter?: IconNames;
        readonly iconBefore?: IconNames;
        readonly isDisabled?: boolean;
        readonly isReadonly?: boolean;
        readonly isSecondary?: boolean;
        readonly max?: number;
        readonly maxLength?: number;
        readonly min?: number;
        readonly modelValue?: object | string | number | null;
        readonly pattern?: string;
        readonly placeholder?: string;
        readonly step?: number;
        readonly type?: 'color' | 'date' | 'datetime-local' | 'email' | 'file' | 'month' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'time' | 'url' | 'week';
    }

    const emit = defineEmits<Emits>();
    const props = withDefaults(defineProps<Props>(), {
        autoFocus: false,
        type: 'text'
    });

    const {modelValue, type} = toRefs(props);

    const {id} = useFormFieldInjection();

    const parsedValue = computed(() => {
        if (!modelValue) {
            return null;
        }

        const v = unref(modelValue);

        if (!v) {
            return null;
        }

        if (DateTime.isDateTime(v)) {
            const iso = v.toISO()!;

            switch (type.value) {
                case 'date':
                    return iso.substring(0, 10);

                case 'datetime-local':
                    return iso.substring(0, 16);

                case 'time':
                    return iso.substring(11, 16);

                default:
                    return iso;
            }
        }

        return v.toString();
    });

    function onInput(evt: Event): void {
        const value = (evt.target as HTMLInputElement).value;

        switch (type.value) {
            case 'date':
            case 'datetime-local':
            case 'month':
            case 'time':
            case 'week':
                const dateTime = DateTime.fromISO(value);

                if (!dateTime.isValid) {
                    return;
                }

                emit('update:model-value', dateTime);
                break;

            case 'number':
                emit('update:model-value', Number(value));
                break;

            default:
                emit('update:model-value', value);
                break;
        }
    }

    function onKeyDown(evt: KeyboardEvent): void {
        if (!['date', 'datetime-local', 'month', 'week'].includes(type.value)) {
            return;
        }

        if (evt.key === ' ') {
            emit('show-picker');
            evt.preventDefault();
        }
    }
</script>

<style lang="scss">
    @use '../scss/mixin' as flux;

    .flux-form-input {
        position: relative;
        display: block;
        height: 42px;
        width: 100%;
        padding: 0 12px;
        align-self: start;
        background: rgb(var(--gray-0));
        background-clip: padding-box;
        border: 1px solid rgb(var(--gray-4) / .75);
        border-radius: var(--radius);
        box-shadow: var(--shadow-px);
        color: var(--foreground);
        transition: 180ms var(--swift-out);
        transition-property: border-color, flux.focus-ring-transition-properties();

        &-icon {
            position: absolute;
            margin: 12px;
            color: var(--foreground-secondary);
            pointer-events: none;

            &.is-before {
                left: 0;
            }

            &.is-after {
                right: 0;
            }
        }

        &-native {
            position: absolute;
            inset: 0;
            height: 100%;
            width: 100%;
            padding: 0 12px;
            background: unset;
            border: 0;
            border-radius: inherit;
            color: inherit;
            font: inherit;
            outline: 0;

            &.has-icon-after {
                padding-right: 42px;
            }

            &.has-icon-before {
                padding-left: 42px;
            }

            &::placeholder {
                color: var(--foreground-secondary);
            }

            &::-webkit-search-decoration,
            &::-webkit-search-cancel-button,
            &::-webkit-search-results-button,
            &::-webkit-search-results-decoration {
                -webkit-appearance: none;
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
        }

        &.is-disabled {
            background: rgb(var(--gray-2));
            cursor: not-allowed;
        }

        &:not(.is-disabled) {
            @include flux.focus-ring(-1px, true);
        }

        &:hover {
            border-color: rgb(var(--gray-5));
        }

        &.is-secondary {
            background: rgb(var(--gray-3) / .8);
            border-color: transparent;

            &:hover {
                background: rgb(var(--gray-3));
            }
        }
    }

    @include flux.dark-mode {
        .flux-form-input-native::-webkit-calendar-picker-indicator {
            filter: invert(1);
        }
    }
</style>
