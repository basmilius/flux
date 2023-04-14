<template>
    <flux-flyout
        ref="flyoutRef"
        :width="300">
        <template #opener="{open}">
            <flux-form-input-group>
                <flux-form-input
                    v-bind="{autoComplete, autoFocus, isDisabled, isReadonly, modelValue, placeholder}"
                    v-model="localValue"
                    class="flux-form-date-input"
                    type="date"
                    @blur="$emit('blur')"
                    @focus="$emit('focus')"/>

                <flux-secondary-button
                    :disabled="isDisabled"
                    icon-before="calendar"
                    @click="open"/>
            </flux-form-input-group>
        </template>

        <flux-date-picker
            v-model="localValue"
            :max="max"
            :min="min"/>
    </flux-flyout>
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
    import { FluxDatePicker, FluxFlyout, FluxFormInput, FluxFormInputGroup, FluxSecondaryButton } from '.';

    export interface Emits {
        (e: 'update:modelValue', value: DateTime | null): void;

        (e: 'blur'): void;

        (e: 'focus'): void;
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

    watch(localValue, localValue => {
        unref(flyoutRef)?.close();
        emit('update:modelValue', localValue);
    });

    watch(modelValue, modelValue => localValue.value = modelValue, {immediate: true});
</script>

<style lang="scss">
    .flux-form-date-input {
        cursor: default;

        &::-webkit-calendar-picker-indicator {
            display: none;
        }
    }
</style>
