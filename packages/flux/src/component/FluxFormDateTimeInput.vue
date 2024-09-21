<template>
    <FluxStack
        :class="styles.formDateTimeInput"
        axis="horizontal"
        :gap="15">
        <FluxFlyout
            ref="flyout"
            :width="300">
            <template #opener="{open}">
                <FluxFormInputGroup>
                    <FluxFormInput
                        :="{autoFocus, isDisabled, isReadonly, modelValue, placeholder}"
                        :class="styles.formDateInput"
                        type="date"
                        :model-value="localValue"
                        @update:model-value="setDate"
                        @show-picker="open"/>

                    <FluxSecondaryButton
                        :disabled="isDisabled"
                        icon-before="calendar"
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
            :="{isDisabled, isReadonly, modelValue, placeholder}"
            :class="styles.formTimeInput"
            type="time"
            :model-value="localValue"
            @update:model-value="setTime"/>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { DateTime } from 'luxon';
    import { ref, unref, useTemplateRef, watch } from 'vue';
    import FluxDatePicker from './FluxDatePicker.vue';
    import FluxFlyout from './FluxFlyout.vue';
    import FluxFormInput from './FluxFormInput.vue';
    import FluxFormInputGroup from './FluxFormInputGroup.vue';
    import FluxSecondaryButton from './FluxSecondaryButton.vue';
    import FluxStack from './FluxStack.vue';
    import styles from '@/css/component/Form.module.scss';

    const modelValue = defineModel<DateTime | null>({
        required: true
    });

    const {
        isHourOnly
    } = defineProps<{
        readonly autoComplete?: string;
        readonly autoFocus?: boolean;
        readonly isDisabled?: boolean;
        readonly isHourOnly?: boolean;
        readonly isReadonly?: boolean;
        readonly max?: DateTime;
        readonly min?: DateTime;
        readonly placeholder?: string;
    }>();

    const flyoutRef = useTemplateRef('flyout');

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
