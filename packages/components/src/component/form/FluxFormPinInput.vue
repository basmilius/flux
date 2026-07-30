<template>
    <fieldset
        :class="clsx(
            disabled ? $style.formPinInputDisabled : $style.formPinInputEnabled,
            error && $style.isInvalid
        )"
        :id="id"
        :name="name"
        :style="{
            '--max-length': maxLength
        }"
        :autofocus="autoFocus"
        :aria-describedby="describedBy"
        :aria-disabled="disabled ? true : undefined"
        :aria-invalid="error ? true : undefined"
        :aria-label="ariaLabel">
        <input
            v-for="field of maxLength"
            :key="field"
            ref="fields"
            :class="$style.formPinInputField"
            maxlength="1"
            :aria-label="translate('flux.pinDigit', {index: field, total: maxLength})"
            :autocomplete="field === 1 ? autoComplete : undefined"
            :autofocus="field === 1 && autoFocus"
            :disabled="disabled"
            :readonly="isReadonly"
            :tabindex="(field - 1) === firstEmptyIndex ? 0 : -1"
            :type="isPrivate ? 'password' : 'text'"
            :value="digits[field - 1] ?? ''"
            @focus="onFocus"
            @input="onInput"
            @keydown="onKeyDown"
            @paste="onPaste"/>
    </fieldset>
</template>

<script
    lang="ts"
    setup>
    import type { FluxAutoCompleteType, FluxFormInputBaseProps } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { computed, ref, toRef, unref, useTemplateRef, watch } from 'vue';
    import { useDisabled, useFormFieldInjection } from '~flux/components/composable';
    import { useTranslate } from '~flux/components/composable/private';
    import $style from '~flux/components/css/component/Form.module.scss';

    const modelValue = defineModel<string>({
        default: ''
    });

    const {
        autoComplete = 'one-time-code',
        autoFocus = false,
        disabled: componentDisabled,
        maxLength = 6
    } = defineProps<Pick<FluxFormInputBaseProps, 'autoFocus' | 'disabled' | 'error' | 'isLoading' | 'isReadonly' | 'name'> & {
        readonly ariaLabel?: string;
        readonly autoComplete?: FluxAutoCompleteType;
        readonly isPrivate?: boolean;
        readonly maxLength?: number;
    }>();

    const disabled = useDisabled(toRef(() => componentDisabled));
    const {id, describedBy} = useFormFieldInjection();
    const translate = useTranslate();

    const fieldRefs = useTemplateRef<HTMLInputElement[]>('fields');

    // The fields render from this buffer instead of from the model, so a cleared middle digit
    // stays a gap instead of shifting the trailing digits to the left (which would corrupt the
    // entered code). The model itself is a gapless string and cannot represent that gap.
    const digits = ref<string[]>([]);

    const firstEmptyIndex = computed(() => {
        for (let i = 0; i < maxLength; i++) {
            if (!digits.value[i]) {
                return i;
            }
        }

        return maxLength - 1;
    });

    watch(modelValue, value => {
        if (value !== digits.value.join('')) {
            digits.value = value.split('').slice(0, maxLength);
        }
    }, {immediate: true});

    function onFocus(evt: FocusEvent): void {
        const input = evt.target as HTMLInputElement;
        requestAnimationFrame(() => input.select());
    }

    function onInput(): void {
        const fields = unref(fieldRefs) ?? [];

        digits.value = fields.map(field => {
            const value = field.value.trim();

            return /^[0-9]$/.test(value) ? value : '';
        });

        modelValue.value = digits.value.join('');
    }

    function onKeyDown(evt: KeyboardEvent): void {
        const input = evt.target as HTMLInputElement;
        const value = input.value.trim();

        const next = input.nextElementSibling as HTMLInputElement | null;
        const previous = input.previousElementSibling as HTMLInputElement | null;

        switch (evt.key) {
            case 'Backspace':
                value === '' && previous?.focus();
                break;

            case 'ArrowLeft':
            case 'ArrowUp':
                input.selectionStart === 0 && previous?.select();
                break;

            case 'ArrowDown':
            case 'ArrowRight':
                (input.selectionStart === 1 || value === '') && next?.select();
                break;

            case 'Tab':
                break;

            default:
                if (evt.ctrlKey || evt.metaKey) {
                    break;
                }

                if (!/^[0-9]$/.test(evt.key)) {
                    evt.preventDefault();
                    break;
                }

                requestAnimationFrame(() => next?.focus());
                break;
        }
    }

    function onPaste(evt: ClipboardEvent): void {
        if (!evt.clipboardData) {
            return;
        }

        const value = evt.clipboardData.getData('text').replace(/\D/g, '').substring(0, maxLength);

        if (value.length === 0) {
            return;
        }

        evt.preventDefault();
        modelValue.value = value;

        requestAnimationFrame(() => {
            const fields = unref(fieldRefs) ?? [];
            fields[Math.min(value.length, maxLength) - 1]?.focus();
        });
    }
</script>
