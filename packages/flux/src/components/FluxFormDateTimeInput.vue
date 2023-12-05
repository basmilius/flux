<template>
    <FluxStack
        class="flux-form-date-time-input"
        axis="horizontal"
        :gap="15">
        <FluxFlyout
            ref="flyoutRef"
            :width="300">
            <template #opener="{open}">
                <FluxFormInputGroup>
                    <FluxFormInput
                        v-bind="{autoFocus, isDisabled, isReadonly, modelValue, placeholder}"
                        class="flux-form-date-input"
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
            v-bind="{isDisabled, isReadonly, modelValue, placeholder}"
            class="flux-form-date-input flux-form-time-input"
            type="time"
            :model-value="localValue"
            @update:model-value="setTime"/>
    </FluxStack>
</template>

<script lang="ts">
    export default {
        model: {
            prop: 'model-value',
            event: 'update:model-value'
        }
    };
</script>

<script
    lang="ts"
    setup>
    import { DateTime } from 'luxon';
    import { ComponentPublicInstance, ref, toRefs, unref, watch } from 'vue';
    import FluxDatePicker from './FluxDatePicker.vue';
    import FluxFlyout from './FluxFlyout.vue';
    import FluxFormInput from './FluxFormInput.vue';
    import FluxFormInputGroup from './FluxFormInputGroup.vue';
    import FluxSecondaryButton from './FluxSecondaryButton.vue';
    import FluxStack from './FluxStack.vue';

    export interface Emits {
        (e: 'update:model-value', value: DateTime | null): void;
    }

    export interface Props {
        readonly autoComplete?: string;
        readonly autoFocus?: boolean;
        readonly isDisabled?: boolean;
        readonly isHourOnly?: boolean;
        readonly isReadonly?: boolean;
        readonly max?: DateTime;
        readonly min?: DateTime;
        readonly modelValue: DateTime | null;
        readonly placeholder?: string;
    }

    const emit = defineEmits<Emits>();
    const props = defineProps<Props>();
    const {isHourOnly, modelValue} = toRefs(props);

    const flyoutRef = ref<ComponentPublicInstance<{}, {}, {}, {}, { close: Function; }>>();
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

    watch([isHourOnly, modelValue], ([isHourOnly, modelValue]) => localValue.value = isHourOnly ? modelValue?.startOf('hour') ?? null : modelValue, {immediate: true});

    watch(localValue, localValue => {
        unref(flyoutRef)?.close();
        emit('update:model-value', localValue);
    });
</script>

<style lang="scss">
    .flux-form-date-time-input {
        .flux-form-input::-webkit-calendar-picker-indicator {
            display: none;
        }

        .flux-form-input-group {
            flex-grow: 1;
        }

        .flux-form-input:last-child {
            max-width: 99px;
        }
    }
</style>
