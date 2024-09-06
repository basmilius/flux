<template>
    <div
        :class="isDisabled ? styles.pinInputDisabled : styles.pinInputEnabled"
        :style="{
            '--max-length': maxLength
        }">
        <input
            v-for="field of maxLength"
            :key="field"
            ref="fields"
            :class="styles.pinInputField"
            autocomplete="new-password"
            maxlength="1"
            :id="id"
            :autofocus="autoFocus"
            :disabled="isDisabled"
            :tabindex="(field - 1) === modelValue?.length ? 0 : -1"
            :type="isPrivate ? 'password' : 'text'"
            :value="modelValue[field - 1]"
            @focus="onFocus"
            @input="onInput"
            @keydown="onKeyDown"/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { unref, useTemplateRef } from 'vue';
    import { useFormFieldInjection } from '@/composable';
    import styles from '@/css/component/Form.module.scss';

    const modelValue = defineModel<string>({
        default: ''
    });

    const {
        autoFocus = false,
        maxLength = 6
    } = defineProps<{
        readonly autoFocus?: boolean;
        readonly isDisabled?: boolean;
        readonly isPrivate?: boolean;
        readonly maxLength?: number;
    }>();

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

            default:
                if (isNaN(Number(evt.key))) {
                    evt.preventDefault();
                    break;
                }

                requestAnimationFrame(() => next?.focus());
                break;
        }
    }
</script>
