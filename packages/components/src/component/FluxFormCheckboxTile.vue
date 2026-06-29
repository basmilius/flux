<template>
    <label
        :class="clsx(
            $style.formCheckboxTile,
            disabled && $style.isDisabled,
            isReadonly && $style.isReadonly,
            error && $style.isInvalid
        )"
        :for="id">
        <input
            type="checkbox"
            :class="$style.formCheckboxNative"
            :id="id"
            :checked="isChecked"
            :disabled="disabled"
            :aria-disabled="disabled ? true : undefined"
            :aria-readonly="isReadonly ? true : undefined"
            :aria-invalid="error ? true : undefined"
            @change="onChange"
            @click="onClick"/>

        <span
            aria-hidden="true"
            :class="$style.formCheckboxElement">
            <FluxIcon
                name="check"
                :size="12"/>
        </span>

        <FluxIcon
            v-if="icon"
            :class="$style.formCheckboxIcon"
            :name="icon"
            :size="20"/>

        <span :class="$style.formCheckboxText">
            <span :class="$style.formCheckboxLabel">
                <slot>{{ label }}</slot>
            </span>

            <span
                v-if="subLabel"
                :class="$style.formCheckboxSubLabel">
                {{ subLabel }}
            </span>
        </span>
    </label>
</template>

<script
    lang="ts"
    setup>
    import type { FluxIconName } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { computed, toRef, unref } from 'vue';
    import { useDisabled, useFormCheckboxGroupInjection, useFormFieldInjection } from '~flux/components/composable';
    import type { FluxFormCheckboxGroupValue } from '~flux/components/data';
    import FluxIcon from './FluxIcon.vue';
    import $style from '~flux/components/css/component/Form.module.scss';

    const {
        disabled: componentDisabled,
        value
    } = defineProps<{
        readonly value: FluxFormCheckboxGroupValue;
        readonly disabled?: boolean;
        readonly icon?: FluxIconName;
        readonly label?: string;
        readonly subLabel?: string;
    }>();

    defineSlots<{
        default(): any;
    }>();

    const group = useFormCheckboxGroupInjection();
    const {id} = useFormFieldInjection();
    const disabled = useDisabled(toRef(() => componentDisabled || (group?.disabled.value ?? false)));

    const isChecked = computed(() => group?.has(value) ?? false);
    const isReadonly = computed(() => group?.isReadonly.value ?? false);
    const error = computed(() => group?.error.value);

    function onChange(): void {
        if (unref(isReadonly) || unref(disabled)) {
            return;
        }

        group?.toggle(value);
    }

    function onClick(evt: MouseEvent): void {
        if (unref(isReadonly)) {
            evt.preventDefault();
        }
    }
</script>
