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
                        @update:modelValue="setDate"/>

                    <FluxSecondaryButton
                        :disabled="isDisabled"
                        icon-before="calendar"
                        @click="open"/>
                </FluxFormInputGroup>
            </template>

            <FluxDatePicker
                v-model="localValue"
                :max="max"
                :min="min"/>
        </FluxFlyout>

        <FluxFormInput
            v-bind="{isDisabled, isReadonly, modelValue, placeholder}"
            class="flux-form-date-input flux-form-time-input"
            type="time"
            :model-value="localValue"
            @update:modelValue="setTime"/>
    </FluxStack>
</template>

<script lang="ts">
    export default {
        model: {
            prop: 'modelValue',
            event: 'update:modelValue'
        }
    };
</script>

<script
    lang="ts"
    setup>
    import { DateTime } from 'luxon';
    import { ComponentPublicInstance, ref, toRefs, unref, watch } from 'vue-demi';
    import FluxDatePicker from './FluxDatePicker.vue';
    import FluxFlyout from './FluxFlyout.vue';
    import FluxFormInput from './FluxFormInput.vue';
    import FluxFormInputGroup from './FluxFormInputGroup.vue';
    import FluxSecondaryButton from './FluxSecondaryButton.vue';
    import FluxStack from './FluxStack.vue';

    export interface Emits {
        (e: 'update:modelValue', value: DateTime | null): void;
    }

    export interface Props {
        readonly autoComplete?: string;
        readonly autoFocus?: boolean;
        readonly isDisabled?: boolean;
        readonly isReadonly?: boolean;
        readonly max?: DateTime;
        readonly min?: DateTime;
        readonly modelValue: DateTime | null;
        readonly placeholder?: string;
    }

    const emit = defineEmits<Emits>();
    const props = defineProps<Props>();
    const {modelValue} = toRefs(props);

    const flyoutRef = ref<ComponentPublicInstance<{}, {}, {}, {}, { close: Function; }>>();
    const localValue = ref<DateTime | null>(null);

    function setDate(dateTime: DateTime): void {
        localValue.value = (localValue.value ?? DateTime.now()).set({
            day: dateTime.day,
            month: dateTime.month,
            year: dateTime.year
        });
    }

    function setTime(dateTime: DateTime): void {
        localValue.value = (localValue.value ?? DateTime.now()).set({
            hour: dateTime.hour,
            minute: dateTime.minute,
            second: dateTime.second
        });
    }

    watch(localValue, localValue => {
        unref(flyoutRef)?.close();
        emit('update:modelValue', localValue);
    });

    watch(modelValue, modelValue => localValue.value = modelValue, {immediate: true});
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
