<template>
    <div
        :class="clsx(
            disabled ? $style.formInputDisabled : $style.formInputEnabled,
            isSecondary && $style.isSecondary
        )"
        :aria-disabled="disabled ? true : undefined">
        <input
            ref="input"
            :class="clsx(
                $style.formInputNative,
                (!!iconTrailing || type === 'password') && $style.formInputNativeHasIconTrailing,
                !!iconLeading && $style.formInputNativeHasIconLeading
            )"
            :id="id"
            :autocomplete="autoComplete"
            :autofocus="autoFocus"
            :aria-disabled="disabled ? true : undefined"
            :disabled="disabled"
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

        <FluxIcon
            v-if="iconLeading"
            :class="$style.formInputIconLeading"
            :name="iconLeading"
            :size="18"/>

        <FluxIcon
            v-if="type === 'password'"
            :class="$style.formInputIconPasswordToggle"
            :name="nativeType === 'password' ? 'eye' : 'eye-slash'"
            :size="18"
            @click="passwordTypeToggle()"/>

        <FluxIcon
            v-else-if="iconTrailing"
            :class="$style.formInputIconTrailing"
            :name="iconTrailing"
            :size="18"/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { unrefTemplateElement } from '@flux-ui/internals';
    import type { FluxAutoCompleteType, FluxIconName, FluxInputMask, FluxInputType } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { DateTime } from 'luxon';
    import { ref, toRef, unref, useTemplateRef, watch } from 'vue';
    import { useDisabled, useFormFieldInjection } from '$flux/composable';
    import { inputMask } from '$flux/data';
    import FluxIcon from './FluxIcon.vue';
    import $style from '$flux/css/component/Form.module.scss';

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
        disabled: componentDisabled,
        pattern,
        type = 'text'
    } = defineProps<{
        readonly autoComplete?: FluxAutoCompleteType;
        readonly autoFocus?: boolean;
        readonly iconLeading?: FluxIconName;
        readonly iconTrailing?: FluxIconName;
        readonly disabled?: boolean;
        readonly isReadonly?: boolean;
        readonly isSecondary?: boolean;
        readonly max?: string | number;
        readonly maxLength?: number;
        readonly min?: string | number;
        readonly pattern?: FluxInputMask;
        readonly placeholder?: string;
        readonly step?: number;
        readonly type?: FluxInputType;
    }>();

    const disabled = useDisabled(toRef(() => componentDisabled));
    const inputRef = useTemplateRef<HTMLInputElement>('input');
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
            modelValue.value = mask.value;
        }

        onCleanup(() => mask.destroy());
    }, {immediate: true});

    watch(() => type, type => nativeType.value = type);

    defineExpose({
        blur,
        focus
    });
</script>
