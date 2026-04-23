<template>
    <label
        :class="clsx(
            $style.checkbox,
            disabled && $style.isDisabled,
            isReadonly && $style.isReadonly,
            error && $style.isInvalid
        )"
        :for="id">
        <input
            v-model="modelValue"
            ref="input"
            type="checkbox"
            :class="$style.checkboxNative"
            :id="id"
            :disabled="disabled"
            :aria-disabled="disabled ? true : undefined"
            :aria-readonly="isReadonly ? true : undefined"
            :aria-invalid="error ? true : undefined"
            @click="onClick"/>

        <button
            aria-hidden="true"
            :class="$style.checkboxElement"
            tabindex="-1">
            <FluxIcon
                v-if="isIndeterminate"
                name="minus"
                :size="16"/>

            <FluxIcon
                v-else
                name="check"
                :size="16"/>
        </button>

        <span
            v-if="label"
            :class="$style.checkboxLabel">
            {{ label }}
        </span>
    </label>
</template>

<script
    lang="ts"
    setup>
    import type { FluxFormInputBaseProps } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { computed, toRef, unref, useTemplateRef, watchEffect } from 'vue';
    import { useDisabled, useFormFieldInjection } from '$flux/composable';
    import FluxIcon from './FluxIcon.vue';
    import $style from '$flux/css/component/Form.module.scss';

    const modelValue = defineModel<boolean | null>({
        default: false
    });

    const {
        disabled: componentDisabled,
        isReadonly
    } = defineProps<Pick<FluxFormInputBaseProps, 'disabled' | 'error' | 'isReadonly'> & {
        readonly label?: string;
    }>();

    const inputRef = useTemplateRef('input');
    const {id} = useFormFieldInjection();

    const disabled = useDisabled(toRef(() => componentDisabled));
    const isIndeterminate = computed(() => unref(modelValue) === null);

    function onClick(evt: MouseEvent): void {
        if (isReadonly) {
            evt.preventDefault();
        }
    }

    watchEffect(() => {
        const input = unref(inputRef);

        if (!input) {
            return;
        }

        input.indeterminate = unref(isIndeterminate);
    });
</script>
