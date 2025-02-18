<template>
    <FluxFlyout
        ref="flyout"
        :width="300">
        <template #opener="{open}">
            <FluxFormInputGroup>
                <FluxFormInput
                    :="{autoComplete, autoFocus, disabled, isReadonly, modelValue, placeholder}"
                    v-model="localValue"
                    :class="$style.formDateInput"
                    :disabled="disabled"
                    :max="max?.toISO()?.substring(0, 10)"
                    :min="min?.toISO()?.substring(0, 10)"
                    type="date"
                    @blur="onBlur()"
                    @focus="onFocus()"
                    @show-picker="open"/>

                <FluxSecondaryButton
                    :disabled="disabled"
                    icon-leading="calendar"
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
    import { ref, toRef, unref, useTemplateRef, watch } from 'vue';
    import { useDisabled } from '@/composable';
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

    const {
        disabled: componentDisabled
    } = defineProps<{
        readonly autoComplete?: string;
        readonly autoFocus?: boolean;
        readonly disabled?: boolean;
        readonly isReadonly?: boolean;
        readonly max?: DateTime;
        readonly min?: DateTime;
        readonly placeholder?: string;
    }>();

    const disabled = useDisabled(toRef(() => componentDisabled));
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
