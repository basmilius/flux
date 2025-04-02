<template>
    <FluxStack
        :class="$style.formDateTimeInput"
        direction="horizontal"
        :gap="15"
        :aria-disabled="disabled ? true : undefined">
        <FluxFlyout
            ref="flyout"
            :width="300">
            <template #opener="{open}">
                <FluxFormInputGroup>
                    <FluxFormInput
                        :="{autoFocus, disabled, isReadonly, modelValue, placeholder}"
                        :class="$style.formDateInput"
                        :disabled="disabled"
                        :model-value="localValue"
                        type="date"
                        @update:model-value="setDate"
                        @show-picker="open"/>

                    <FluxSecondaryButton
                        :disabled="disabled"
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
            :="{disabled, isReadonly, modelValue, placeholder}"
            :class="$style.formTimeInput"
            type="time"
            :model-value="localValue"
            @update:model-value="setTime"/>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { DateTime } from 'luxon';
    import { ref, toRef, unref, useTemplateRef, watch } from 'vue';
    import { useDisabled } from '$flux/composable';
    import type { FluxAutoCompleteType } from '$flux/types';
    import FluxDatePicker from './FluxDatePicker.vue';
    import FluxFlyout from './FluxFlyout.vue';
    import FluxFormInput from './FluxFormInput.vue';
    import FluxFormInputGroup from './FluxFormInputGroup.vue';
    import FluxSecondaryButton from './FluxSecondaryButton.vue';
    import FluxStack from './FluxStack.vue';
    import $style from '$flux/css/component/Form.module.scss';

    const modelValue = defineModel<DateTime | null>({
        required: true
    });

    const {
        disabled: componentDisabled,
        isHourOnly
    } = defineProps<{
        readonly autoComplete?: FluxAutoCompleteType;
        readonly autoFocus?: boolean;
        readonly disabled?: boolean;
        readonly isHourOnly?: boolean;
        readonly isReadonly?: boolean;
        readonly max?: DateTime;
        readonly min?: DateTime;
        readonly placeholder?: string;
    }>();

    const disabled = useDisabled(toRef(() => componentDisabled));
    const flyoutRef = useTemplateRef<{ close(): void; }>('flyout');

    const localValue = ref<DateTime | null>(null);

    function setDate(dateTime: DateTime | object | string | number | null): void {
        if (!DateTime.isDateTime(dateTime)) {
            return;
        }

        const value: DateTime = (localValue.value ?? DateTime.now());
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

        const value: DateTime = (localValue.value ?? DateTime.now());
        localValue.value = value.set({
            hour: dateTime.hour,
            minute: unref(isHourOnly) ? 0 : dateTime.minute,
            second: unref(isHourOnly) ? 0 : dateTime.second
        });
    }

    watch(() => isHourOnly, () => isHourOnly && (localValue.value = unref(localValue)?.startOf('hour') ?? null), {immediate: true});
    watch(modelValue, modelValue => localValue.value = isHourOnly ? modelValue?.startOf('hour') ?? null : modelValue, {immediate: true});

    watch(localValue, localValue => {
        unref(flyoutRef)?.close();

        if (modelValue.value?.toISO() === localValue?.toISO()) {
            return;
        }

        modelValue.value = localValue;
    });
</script>
