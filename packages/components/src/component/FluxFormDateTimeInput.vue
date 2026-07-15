<template>
    <FluxFlex
        :class="$style.formDateTimeInput"
        :gap="15"
        :aria-disabled="disabled ? true : undefined">
        <FluxFlyout
            ref="flyout"
            :width="300">
            <template #opener="{open}">
                <FluxFormInputGroup>
                    <FluxFormInput
                        :="{autoComplete, autoFocus, error, isCondensed, isLoading, isReadonly, isSecondary, name, placeholder}"
                        :class="$style.formDateInput"
                        :disabled="disabled"
                        :model-value="localValue"
                        type="date"
                        @update:model-value="setDate"
                        @show-picker="open"/>

                    <FluxSecondaryButton
                        :disabled="disabled || isReadonly"
                        icon-leading="calendar"
                        @click.prevent="open"/>
                </FluxFormInputGroup>
            </template>

            <FluxDatePicker
                :max="max"
                :min="min"
                :model-value="localValue"
                @update:model-value="setDate"/>
        </FluxFlyout>

        <FluxFormInput
            :="{error, isCondensed, isLoading, isReadonly, isSecondary, placeholder}"
            :class="$style.formTimeInput"
            :disabled="disabled"
            :name="name ? `${name}-time` : undefined"
            type="time"
            :model-value="localValue"
            @update:model-value="setTime"/>
    </FluxFlex>
</template>

<script
    lang="ts"
    setup>
    import type { FluxAutoCompleteType, FluxFormInputBaseProps } from '@flux-ui/types';
    import { DateTime } from 'luxon';
    import { toRef, unref, useTemplateRef, watch } from 'vue';
    import { useDisabled } from '~flux/components/composable';
    import { useDateFlyout } from '~flux/components/composable/private';
    import FluxDatePicker from './FluxDatePicker.vue';
    import FluxFlex from './FluxFlex.vue';
    import FluxFlyout from './FluxFlyout.vue';
    import FluxFormInput from './FluxFormInput.vue';
    import FluxFormInputGroup from './FluxFormInputGroup.vue';
    import FluxSecondaryButton from './FluxSecondaryButton.vue';
    import $style from '~flux/components/css/component/Form.module.scss';

    const modelValue = defineModel<DateTime | null>({
        required: true
    });

    const {
        disabled: componentDisabled,
        isHourOnly
    } = defineProps<FluxFormInputBaseProps & {
        readonly autoComplete?: FluxAutoCompleteType;
        readonly isHourOnly?: boolean;
        readonly max?: DateTime;
        readonly min?: DateTime;
    }>();

    const flyoutRef = useTemplateRef<{ close(): void; }>('flyout');
    const disabled = useDisabled(toRef(() => componentDisabled));

    const localValue = useDateFlyout(modelValue, flyoutRef, {
        compareKey: value => value?.toISO(),
        transformIn: value => isHourOnly ? value?.startOf('hour') ?? null : value
    });

    watch(() => isHourOnly, () => {
        if (!isHourOnly) {
            return;
        }

        localValue.value = unref(localValue)?.startOf('hour') ?? null;
    }, {immediate: true});

    function setDate(dateTime: DateTime | object | string | number | null): void {
        if (!DateTime.isDateTime(dateTime)) {
            return;
        }

        const value: DateTime = (localValue.value ?? DateTime.now().startOf('day'));
        localValue.value = value.set({
            day: dateTime.day,
            month: dateTime.month,
            year: dateTime.year
        });
    }

    function setTime(dateTime: DateTime | string | number | object | null): void {
        if (!DateTime.isDateTime(dateTime)) {
            return;
        }

        const value: DateTime = (localValue.value ?? DateTime.now().startOf('day'));
        localValue.value = value.set({
            hour: dateTime.hour,
            minute: isHourOnly ? 0 : dateTime.minute,
            second: isHourOnly ? 0 : dateTime.second
        });
    }
</script>
