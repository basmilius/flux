<template>
    <FluxFlyout
        ref="flyout"
        :width="300">
        <template #opener="{open}">
            <FluxFormInputGroup>
                <FluxFormInput
                    :="{autoComplete, autoFocus, isDisabled, isReadonly, modelValue, placeholder}"
                    v-model="localValue"
                    :class="$style.formDateInput"
                    type="date"
                    :max="max?.toISO()?.substring(0, 10)"
                    :min="min?.toISO()?.substring(0, 10)"
                    @blur="onBlur()"
                    @focus="onFocus()"
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
    import type { DateTime } from 'luxon';
    import { ref, unref, useTemplateRef, watch } from 'vue';
    import FluxDatePicker from './FluxDatePicker.vue';
    import FluxFlyout from './FluxFlyout.vue';
    import FluxFormInput from './FluxFormInput.vue';
    import FluxFormInputGroup from './FluxFormInputGroup.vue';
    import FluxSecondaryButton from './FluxSecondaryButton.vue';
    import $style from '@/css/component/Form.module.scss';

    const emit = defineEmits<{
        blur: [];
        focus: [];
    }>();

    const modelValue = defineModel<DateTime | null>({
        required: true
    });

    defineProps<{
        readonly autoComplete?: string;
        readonly autoFocus?: boolean;
        readonly isDisabled?: boolean;
        readonly isReadonly?: boolean;
        readonly max?: DateTime;
        readonly min?: DateTime;
        readonly placeholder?: string;
    }>();

    const flyoutRef = useTemplateRef('flyout');

    const localValue = ref<DateTime | null>(null);

    function onBlur(): void {
        emit('blur');
    }

    function onFocus(): void {
        emit('focus');
    }

    watch(modelValue, modelValue => localValue.value = modelValue, {immediate: true});

    watch(localValue, localValue => {
        unref(flyoutRef)?.close();

        if (modelValue.value?.toISODate() === localValue?.toISODate()) {
            return;
        }

        modelValue.value = localValue;
    });
</script>
