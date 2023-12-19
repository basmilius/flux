<template>
    <div
        class="flux-form-input"
        :class="{
            'is-disabled': isDisabled,
            'is-readonly': isReadonly,
            'is-secondary': isSecondary
        }">
        <input
            ref="inputRef"
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
            :placeholder="placeholder"
            :readonly="isReadonly"
            :step="step"
            :type="nativeType"
            :value="localValue"
            @blur="$emit('blur')"
            @focus="$emit('focus')"
            @input="onInput"
            @keydown="onKeyDown"/>

        <FluxIcon
            v-if="iconBefore"
            class="flux-form-input-icon is-before"
            :size="18"
            :variant="iconBefore"/>

        <FluxIcon
            v-if="type === 'password'"
            class="flux-form-input-icon is-password-toggle"
            :size="18"
            :variant="nativeType === 'password' ? 'eye' : 'eye-slash'"
            @click="passwordTypeToggle"/>

        <FluxIcon
            v-else-if="iconAfter"
            class="flux-form-input-icon is-after"
            :size="18"
            :variant="iconAfter"/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { DateTime } from 'luxon';
    import { ref, toRefs, unref, watch } from 'vue';
    import { useFormFieldInjection } from '@/composable';
    import { IconNames, Masks, masks } from '@/data';
    import { unrefElement } from '@/util';
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
        readonly max?: string | number;
        readonly maxLength?: number;
        readonly min?: string | number;
        readonly modelValue?: object | string | number | null;
        readonly pattern?: Masks;
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

    const inputRef = ref<HTMLInputElement>();
    const localValue = ref<string | null>(null);
    const nativeType = ref(unref(type));

    function blur(): void {
        unrefElement(inputRef)?.blur();
    }

    function focus(): void {
        unrefElement(inputRef)?.focus();
    }

    function passwordTypeToggle(): void {
        if (unref(type) !== 'password') {
            return;
        }

        nativeType.value = unref(nativeType) === 'password' ? 'text' : 'password';
    }

    function onInput(evt: Event): void {
        const value = (evt.target as HTMLInputElement).value;

        switch (unref(type)) {
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
        if (!['date', 'datetime-local', 'month', 'week'].includes(unref(type))) {
            return;
        }

        if (evt.key === ' ') {
            emit('show-picker');
            evt.preventDefault();
        }
    }

    watch([modelValue, type], ([modelValue, type]) => {
        if (!modelValue) {
            localValue.value = null;
            return;
        }

        if (DateTime.isDateTime(modelValue)) {
            const iso = modelValue.toISO()!;

            switch (type) {
                case 'date':
                    localValue.value = iso.substring(0, 10);
                    break;

                case 'datetime-local':
                    localValue.value = iso.substring(0, 16);
                    break;

                case 'time':
                    localValue.value = iso.substring(11, 16);
                    break;

                default:
                    localValue.value = iso;
                    break;
            }

            return;
        }

        localValue.value = modelValue.toString();
    }, {immediate: true});

    watch([inputRef, () => props.pattern, localValue], ([input, pattern, value], __, onCleanup) => {
        if (!input || !pattern) {
            return;
        }

        const mask = masks[pattern](input);

        if (value) {
            mask.value = value;
            localValue.value = mask.value;
        }

        onCleanup(() => mask.destroy());
    }, {immediate: true});

    watch(type, type => nativeType.value = type);

    defineExpose({
        blur,
        focus
    });
</script>

<style lang="scss">
    @use '../css/mixin' as flux;

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
            margin: 11px;
            color: var(--foreground-secondary);
            pointer-events: none;

            &.is-before {
                left: 0;
            }

            &.is-after {
                right: 0;
            }

            &.is-password-toggle {
                right: 0;
                pointer-events: unset;
                cursor: pointer;

                &:hover {
                    color: var(--foreground);
                }
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
            text-align: left;

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

    [dark] .flux-form-input-native::-webkit-calendar-picker-indicator {
        filter: invert(1);
    }
</style>
