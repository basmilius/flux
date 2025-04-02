<template>
    <fieldset
        :class="disabled ? $style.pinInputDisabled : $style.pinInputEnabled"
        :id="id"
        :style="{
            '--max-length': maxLength
        }"
        :autofocus="autoFocus"
        :aria-disabled="disabled ? true : undefined">
        <input
            v-for="field of maxLength"
            :key="field"
            ref="fields"
            :class="$style.pinInputField"
            maxlength="1"
            :autocomplete="field === 1 ? autoComplete : undefined"
            :autofocus="field === 1 && autoFocus"
            :disabled="disabled"
            :tabindex="(field - 1) === modelValue?.length ? 0 : -1"
            :type="isPrivate ? 'password' : 'text'"
            :value="modelValue[field - 1]"
            @focus="onFocus"
            @input="onInput"
            @keydown="onKeyDown"
            @paste="onPaste"/>
    </fieldset>
</template>

<script
    lang="ts"
    setup>
    import { toRef, unref, useTemplateRef } from 'vue';
    import { useDisabled, useFormFieldInjection } from '$flux/composable';
    import type { FluxAutoCompleteType } from '$flux/types';
    import $style from '$flux/css/component/Form.module.scss';

    const modelValue = defineModel<string>({
        default: ''
    });

    const {
        autoComplete = 'one-time-code',
        autoFocus = false,
        disabled: componentDisabled,
        maxLength = 6
    } = defineProps<{
        readonly autoComplete?: FluxAutoCompleteType;
        readonly autoFocus?: boolean;
        readonly disabled?: boolean;
        readonly isPrivate?: boolean;
        readonly maxLength?: number;
    }>();

    const disabled = useDisabled(toRef(() => componentDisabled));
    const {id} = useFormFieldInjection();

    const fieldRefs = useTemplateRef<HTMLInputElement[]>('fields');

    function onFocus(evt: FocusEvent): void {
        const input = evt.target as HTMLInputElement;
        requestAnimationFrame(() => input.select());
    }

    function onInput(): void {
        const fields = unref(fieldRefs) ?? [];
        const values = fields
            .map(f => f.value.trim() === '' ? NaN : Number(f.value))
            .filter(v => !isNaN(v));

        modelValue.value = values.join('');
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

            case 'v':
                if (evt.ctrlKey || evt.metaKey) {
                    break;
                }

                evt.preventDefault();
                break;

            default:
                if (isNaN(Number(evt.key))) {
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

        const value = evt.clipboardData.getData('text').replace(/\D/g, '');

        if (value.length !== maxLength) {
            return;
        }

        modelValue.value = value;

        requestAnimationFrame(() => {
            const fields = unref(fieldRefs) ?? [];
            fields[maxLength - 1].focus();
        });
    }
</script>
