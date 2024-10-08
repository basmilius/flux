<template>
    <div
        :class="clsx(
            isDisabled ? styles.formInputDisabled : styles.formInputEnabled,
            isSecondary && styles.isSecondary
        )">
        <input
            ref="input"
            :class="clsx(
                styles.formInputNative,
                (!!iconAfter || type === 'password') && styles.formInputNativeHasIconAfter,
                !!iconBefore && styles.formInputNativeHasIconBefore
            )"
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
            @blur="onBlur()"
            @focus="onFocus()"
            @input="onInput"
            @keydown="onKeyDown">

        <Icon
            v-if="iconBefore"
            :class="styles.formInputIconBefore"
            :size="18"
            :variant="iconBefore"/>

        <Icon
            v-if="type === 'password'"
            :class="styles.formInputIconPasswordToggle"
            :size="18"
            :variant="nativeType === 'password' ? 'eye' : 'eye-slash'"
            @click="passwordTypeToggle()"/>

        <Icon
            v-else-if="iconAfter"
            :class="styles.formInputIconAfter"
            :size="18"
            :variant="iconAfter"/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { clsx } from 'clsx';
    import { DateTime } from 'luxon';
    import { ref, unref, useTemplateRef, watch } from 'vue';
    import { useFormFieldInjection } from '@/composable';
    import { inputMask } from '@/data';
    import type { IconName, InputMask, InputType } from '@/types';
    import { unrefTemplateElement } from '@/util';
    import Icon from './FluxIcon.vue';
    import styles from '@/css/component/Form.module.scss';

    const emit = defineEmits<{
        blur: [];
        focus: [];
        showPicker: [];
    }>();

    const modelValue = defineModel<object | string | number | null>({
        default: ''
    });

    const {
        autoFocus = false,
        pattern,
        type = 'text'
    } = defineProps<{
        readonly autoComplete?: string;
        readonly autoFocus?: boolean;
        readonly iconAfter?: IconName;
        readonly iconBefore?: IconName;
        readonly isDisabled?: boolean;
        readonly isReadonly?: boolean;
        readonly isSecondary?: boolean;
        readonly max?: string | number;
        readonly maxLength?: number;
        readonly min?: string | number;
        readonly pattern?: InputMask;
        readonly placeholder?: string;
        readonly step?: number;
        readonly type?: InputType;
    }>();

    const inputRef = useTemplateRef('input');
    const {id} = useFormFieldInjection();

    const localValue = ref<string | null>(null);
    const nativeType = ref(type);

    function blur(): void {
        unrefTemplateElement(inputRef)?.blur();
    }

    function focus(): void {
        unrefTemplateElement(inputRef)?.focus();
    }

    function passwordTypeToggle(): void {
        if (type !== 'password') {
            return;
        }

        nativeType.value = unref(nativeType) === 'password' ? 'text' : 'password';
    }

    function onBlur(): void {
        emit('blur');
    }

    function onFocus(): void {
        emit('focus');
    }

    function onInput(evt: Event): void {
        const value = (evt.target as HTMLInputElement).value;

        switch (type) {
            case 'date':
            case 'datetime-local':
            case 'month':
            case 'time':
            case 'week':
                const dateTime = DateTime.fromISO(value);

                if (!dateTime.isValid) {
                    return;
                }

                modelValue.value = dateTime;
                break;

            case 'number':
                modelValue.value = Number(value);
                break;

            default:
                modelValue.value = value;
                break;
        }
    }

    function onKeyDown(evt: KeyboardEvent): void {
        if (!['date', 'datetime-local', 'month', 'week'].includes(type)) {
            return;
        }

        if (evt.key === ' ') {
            emit('showPicker');
            evt.preventDefault();
        }
    }

    watch([modelValue, () => type], ([modelValue, type]) => {
        if (!modelValue && modelValue !== 0) {
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

    watch([inputRef, () => pattern, localValue], ([input, pattern, value], __, onCleanup) => {
        if (!input || !pattern) {
            return;
        }

        const mask = inputMask[pattern](input);

        if (value) {
            mask.value = value;
            localValue.value = mask.value;
        }

        onCleanup(() => mask.destroy());
    }, {immediate: true});

    watch(() => type, type => nativeType.value = type);

    defineExpose({
        blur,
        focus
    });
</script>
