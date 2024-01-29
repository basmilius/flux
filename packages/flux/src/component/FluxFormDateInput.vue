<template>
    <FluxFlyout
        ref="flyoutRef"
        :width="300">
        <template #opener="{open}">
            <FluxFormInputGroup>
                <FluxFormInput
                    :="{autoComplete, autoFocus, isDisabled, isReadonly, modelValue, placeholder}"
                    v-model="localValue"
                    class="flux-form-date-input"
                    type="date"
                    :max="max?.toISO()?.substring(0, 10)"
                    :min="min?.toISO()?.substring(0, 10)"
                    @blur="$emit('blur')"
                    @focus="$emit('focus')"
                    @show-picker="open"/>

                <FluxSecondaryButton
                    :disabled="isDisabled"
                    icon-before="calendar"
                    @click.prevent="open"/>
            </FluxFormInputGroup>
        </template>

        <FluxDatePicker
            v-model="localValue"
            :max="max"
            :min="min"/>
    </FluxFlyout>
</template>

<script
    lang="ts"
    setup>
    import { DateTime } from 'luxon';
    import { ComponentPublicInstance, Ref, ref, unref, watch } from 'vue';
    import FluxDatePicker from './FluxDatePicker.vue';
    import FluxFlyout from './FluxFlyout.vue';
    import FluxFormInput from './FluxFormInput.vue';
    import FluxFormInputGroup from './FluxFormInputGroup.vue';
    import FluxSecondaryButton from './FluxSecondaryButton.vue';

    export type Emits = {
        (e: 'blur'): void;
        (e: 'focus'): void;
    };

    export type Props = {
        readonly autoComplete?: string;
        readonly autoFocus?: boolean;
        readonly isDisabled?: boolean;
        readonly isReadonly?: boolean;
        readonly max?: DateTime;
        readonly min?: DateTime;
        readonly placeholder?: string;
    };

    const emit = defineEmits<Emits>();
    const modelValue = defineModel<DateTime | null>({required: true}) as Ref<DateTime | null>;
    defineProps<Props>();

    const flyoutRef = ref<ComponentPublicInstance<{}, {}, {}, {}, { close: Function; }>>();
    const localValue = ref<DateTime | null>(null);

    watch(localValue, localValue => {
        unref(flyoutRef)?.close();
        modelValue.value = localValue;
    });

    watch(modelValue, modelValue => localValue.value = modelValue, {immediate: true});
</script>

<style lang="scss">
    .flux-form-date-input {
        cursor: default;

        input {
            text-align: left;
        }

        input::-webkit-input-placeholder {
            visibility: hidden;
        }

        input::-webkit-calendar-picker-indicator {
            display: none;
            -webkit-appearance: none;
        }
    }
</style>
