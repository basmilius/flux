<template>
    <component
        :is="isBareControl ? 'span' : 'label'"
        :class="clsx(
            $style.formCheckbox,
            disabled && $style.isDisabled,
            isReadonlyResolved && $style.isReadonly,
            errorResolved && $style.isInvalid
        )"
        :for="isBareControl ? undefined : id">
        <input
            ref="input"
            type="checkbox"
            :class="$style.formCheckboxNative"
            :id="id"
            :checked="isChecked"
            :disabled="disabled"
            :aria-disabled="disabled ? true : undefined"
            :aria-readonly="isReadonlyResolved ? true : undefined"
            :aria-invalid="errorResolved ? true : undefined"
            @change="onChange"
            @click="onClick"/>

        <button
            aria-hidden="true"
            :class="$style.formCheckboxElement"
            tabindex="-1">
            <FluxIcon
                v-if="isIndeterminate"
                name="minus"
                :size="12"/>

            <FluxIcon
                v-else
                name="check"
                :size="12"/>
        </button>

        <span
            v-if="label || subLabel"
            :class="$style.formCheckboxText">
            <span
                v-if="label"
                :class="$style.formCheckboxLabel">
                {{ label }}
            </span>

            <span
                v-if="subLabel"
                :class="$style.formCheckboxSubLabel">
                {{ subLabel }}
            </span>
        </span>
    </component>
</template>

<script
    lang="ts"
    setup>
    import type { FluxFormInputBaseProps } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { computed, inject, toRef, unref, useTemplateRef, watchEffect } from 'vue';
    import { useDisabled, useFormCheckboxGroupInjection, useFormFieldInjection } from '~flux/components/composable';
    import { FluxItemControlInjectionKey, type FluxFormCheckboxGroupValue } from '~flux/components/data';
    import FluxIcon from './FluxIcon.vue';
    import $style from '~flux/components/css/component/Form.module.scss';

    const modelValue = defineModel<boolean | null>({
        default: false
    });

    const {
        disabled: componentDisabled,
        error,
        isReadonly,
        value
    } = defineProps<Pick<FluxFormInputBaseProps, 'disabled' | 'error' | 'isReadonly'> & {
        readonly label?: string;
        readonly subLabel?: string;
        readonly value?: FluxFormCheckboxGroupValue;
    }>();

    const group = useFormCheckboxGroupInjection();
    const itemControl = inject(FluxItemControlInjectionKey, null);
    const inputRef = useTemplateRef('input');
    const {id} = useFormFieldInjection();

    const isBareControl = computed(() => itemControl?.isControl.value ?? false);

    itemControl?.register(id);

    const isGrouped = computed(() => group !== null && value !== undefined);

    const disabled = useDisabled(toRef(() => componentDisabled || (group?.disabled.value ?? false)));
    const isReadonlyResolved = computed(() => isReadonly || (group?.isReadonly.value ?? false));
    const errorResolved = computed(() => unref(isGrouped) ? group?.error.value : error);

    const isChecked = computed(() => unref(isGrouped) ? group!.has(value!) : unref(modelValue) === true);
    const isIndeterminate = computed(() => !unref(isGrouped) && unref(modelValue) === null);

    function onChange(): void {
        if (unref(isReadonlyResolved) || unref(disabled)) {
            return;
        }

        if (unref(isGrouped)) {
            group!.toggle(value!);
            return;
        }

        modelValue.value = unref(isIndeterminate) ? true : !unref(modelValue);
    }

    function onClick(evt: MouseEvent): void {
        if (unref(isReadonlyResolved)) {
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
