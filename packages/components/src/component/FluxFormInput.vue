<template>
    <div
        :class="clsx(
            disabled ? $style.formInputDisabled : $style.formInputEnabled,
            isCondensed && $style.isCondensed,
            isSecondary && $style.isSecondary,
            error && $style.isInvalid
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
            :name="name"
            :autocomplete="autoComplete"
            :autofocus="autoFocus"
            :aria-describedby="describedBy"
            :aria-disabled="disabled ? true : undefined"
            :aria-invalid="error ? true : undefined"
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

        <button
            v-if="type === 'password'"
            type="button"
            :class="$style.formInputIconPasswordToggle"
            :aria-label="translate('flux.togglePasswordVisibility')"
            :aria-pressed="nativeType !== 'password'"
            :disabled="disabled"
            @click="passwordTypeToggle()">
            <FluxIcon
                :name="nativeType === 'password' ? 'eye' : 'eye-slash'"
                :size="18"/>
        </button>

        <FluxIcon
            v-else-if="iconTrailing"
            :class="$style.formInputIconTrailing"
            :name="iconTrailing"
            :size="18"/>

        <FluxSpinner
            v-if="isLoading"
            :class="$style.formInputIconTrailing"
            :size="18"/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { unrefTemplateElement } from '@flux-ui/internals';
    import type { FluxAutoCompleteType, FluxFormInputBaseProps, FluxIconName, FluxInputMask, FluxInputType } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import type { InputMask } from 'imask';
    import { DateTime } from 'luxon';
    import { getCurrentInstance, ref, toRef, unref, useTemplateRef, watch } from 'vue';
    import { useDisabled, useFormFieldInjection } from '~flux/components/composable';
    import { useTranslate } from '~flux/components/composable/private';
    import { inputMask } from '~flux/components/data';
    import FluxIcon from './FluxIcon.vue';
    import FluxSpinner from './FluxSpinner.vue';
    import $style from '~flux/components/css/component/Form.module.scss';

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
        isReadonly,
        pattern,
        type = 'text'
    } = defineProps<FluxFormInputBaseProps & {
        readonly autoComplete?: FluxAutoCompleteType;
        readonly iconLeading?: FluxIconName;
        readonly iconTrailing?: FluxIconName;
        readonly max?: string | number;
        readonly maxLength?: number;
        readonly min?: string | number;
        readonly pattern?: FluxInputMask;
        readonly step?: number;
        readonly type?: FluxInputType;
    }>();

    const inputRef = useTemplateRef<HTMLInputElement>('input');
    const localValue = ref<string | null>(null);
    const nativeType = ref(type);

    let activeMask: InputMask<{}> | null = null;

    const disabled = useDisabled(toRef(() => componentDisabled));
    const instance = getCurrentInstance();
    const translate = useTranslate();
    const {id, describedBy} = useFormFieldInjection();

    watch([modelValue, () => type], ([modelValue, type]) => {
        if (!modelValue && modelValue !== 0) {
            localValue.value = null;
            return;
        }

        if (DateTime.isDateTime(modelValue)) {
            const iso = modelValue.toISO();

            if (!iso) {
                localValue.value = null;
                return;
            }

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

    watch([inputRef, () => pattern], ([input, pattern], __, onCleanup) => {
        if (!input || !pattern) {
            return;
        }

        const mask = inputMask[pattern](input);
        activeMask = mask;

        const value = unref(localValue);

        if (value) {
            mask.value = value;
            localValue.value = mask.value;
            modelValue.value = mask.value;
        }

        mask.on('accept', () => {
            localValue.value = mask.value;
            modelValue.value = mask.value;
        });

        onCleanup(() => {
            mask.destroy();

            if (activeMask === mask) {
                activeMask = null;
            }
        });
    }, {immediate: true});

    watch(localValue, value => {
        if (activeMask && activeMask.value !== (value ?? '')) {
            activeMask.value = value ?? '';
        }
    });

    watch(() => type, type => nativeType.value = type);

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
            case 'week': {
                if (value === '') {
                    modelValue.value = null;
                    break;
                }

                const dateTime = DateTime.fromISO(value);

                if (!dateTime.isValid) {
                    return;
                }

                modelValue.value = dateTime;
                break;
            }

            case 'number': {
                if (value === '') {
                    modelValue.value = null;
                    break;
                }

                const numericValue = Number(value);

                if (Number.isNaN(numericValue)) {
                    return;
                }

                modelValue.value = numericValue;
                break;
            }

            default:
                if (activeMask) {
                    return;
                }

                modelValue.value = value;
                break;
        }
    }

    function onKeyDown(evt: KeyboardEvent): void {
        if (isReadonly) {
            return;
        }

        if (!['date', 'datetime-local', 'month', 'week'].includes(type)) {
            return;
        }

        if (evt.key === ' ') {
            evt.preventDefault();

            const input = unrefTemplateElement(inputRef);

            if (instance?.vnode.props?.onShowPicker) {
                emit('showPicker');
            } else if (input && input instanceof HTMLInputElement) {
                input.showPicker();
            }
        }
    }

    defineExpose({
        blur,
        focus
    });
</script>
