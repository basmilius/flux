<template>
    <div
        class="flux-form-pin-input"
        :class="{
            'is-disabled': isDisabled
        }"
        :style="{
            '--max-length': maxLength
        }">
        <input
            v-for="field of maxLength"
            :key="field"
            ref="fieldRefs"
            class="flux-form-pin-input-field"
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
    import { ref, toRefs, unref } from 'vue';
    import { useFormFieldInjection } from '@/composable';

    export type Emits = {
        (e: 'blur'): void;
        (e: 'focus'): void;
    };

    export type Props = {
        readonly autoFocus?: boolean;
        readonly isDisabled?: boolean;
        readonly isPrivate?: boolean;
        readonly maxLength?: number;
    };

    const emit = defineEmits<Emits>();
    const modelValue = defineModel<string>({default: ''});
    const props = withDefaults(defineProps<Props>(), {
        autoFocus: false,
        maxLength: 6
    });

    const {maxLength} = toRefs(props);
    const {id} = useFormFieldInjection();

    const fieldRefs = ref<HTMLInputElement[]>();

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

<style lang="scss">
    @use '../css/mixin' as flux;

    .flux-form-pin-input {
        display: grid;
        width: min-content;
        gap: .4ch;
        grid-template-columns: repeat(var(--max-length), 1fr);
        font-size: 24px;
        font-weight: 700;

        &-field {
            padding: 0;
            width: 2.7ch;
            background: rgb(var(--gray-0));
            background-clip: padding-box;
            border: 1px solid rgb(var(--gray-4) / .75);
            border-radius: var(--radius);
            box-shadow: var(--shadow-px);
            color: var(--foreground-prominent);
            font: inherit;
            line-height: 3.3ch;
            outline: 0;
            text-align: center;
            transition: 180ms var(--swift-out);
            transition-property: border-color, flux.focus-ring-transition-properties();
        }

        &.is-disabled &-field {
            background: rgb(var(--gray-2));
            color: var(--foreground-secondary);
            cursor: not-allowed;
        }

        &:not(.is-disabled) &-field {
            @include flux.focus-ring(-1px, true);
        }
    }
</style>
