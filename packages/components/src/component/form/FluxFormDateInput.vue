<template>
    <FluxFormInputGroup>
        <FluxFormInput
            :="{autoComplete, autoFocus, error, isCondensed, isLoading, isReadonly, isSecondary, name, placeholder}"
            v-model="localValue"
            :class="$style.formDateInput"
            :disabled="disabled"
            :max="max?.toISO()?.substring(0, 10)"
            :min="min?.toISO()?.substring(0, 10)"
            type="date"
            @blur="onBlur()"
            @focus="onFocus()"
            @show-picker="flyoutRef?.open()"/>

        <FluxFlyout
            ref="flyout"
            :width="300">
            <template #opener="{open}">
                <FluxSecondaryButton
                    :class="$style.formDateInputButton"
                    :disabled="disabled || isReadonly"
                    icon-leading="calendar"
                    @click.prevent="open"/>
            </template>

            <FluxDatePicker
                v-model="localValue"
                :max="max"
                :min="min"/>
        </FluxFlyout>
    </FluxFormInputGroup>
</template>

<script
    lang="ts"
    setup>
    import type { FluxAutoCompleteType, FluxFormInputBaseProps } from '@flux-ui/types';
    import type { DateTime } from 'luxon';
    import { toRef, useTemplateRef } from 'vue';
    import { useDisabled } from '~flux/components/composable';
    import { useDateFlyout } from '~flux/components/composable/private';
    import FluxDatePicker from '../FluxDatePicker.vue';
    import FluxFlyout from '../FluxFlyout.vue';
    import FluxSecondaryButton from '../FluxSecondaryButton.vue';
    import FluxFormInput from './FluxFormInput.vue';
    import FluxFormInputGroup from './FluxFormInputGroup.vue';
    import $style from '~flux/components/css/component/Form.module.scss';

    const emit = defineEmits<{
        blur: [];
        focus: [];
    }>();

    const modelValue = defineModel<DateTime | null>({
        default: null
    });

    const {
        disabled: componentDisabled
    } = defineProps<FluxFormInputBaseProps & {
        readonly autoComplete?: FluxAutoCompleteType;
        readonly max?: DateTime;
        readonly min?: DateTime;
    }>();

    const flyoutRef = useTemplateRef('flyout');

    const disabled = useDisabled(toRef(() => componentDisabled));
    const localValue = useDateFlyout(modelValue, flyoutRef, {
        compareKey: value => value?.toISODate()
    });

    function onBlur(): void {
        emit('blur');
    }

    function onFocus(): void {
        emit('focus');
    }
</script>
