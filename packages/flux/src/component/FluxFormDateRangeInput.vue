<template>
    <FluxFlyout
        ref="flyout"
        :width="300">
        <template #opener="{open}">
            <FluxFormInputGroup :aria-disabled="disabled ? true : undefined">
                <div
                    :class="clsx(
                        $style.formDateRangeInput,
                        disabled && $style.isDisabled
                    )"
                    role="presentation">
                    <span>{{ label }}</span>
                </div>

                <FluxSecondaryButton
                    :disabled="disabled"
                    icon-leading="calendar"
                    @click.prevent="open"/>
            </FluxFormInputGroup>
        </template>

        <FluxDatePicker
            v-model="localValue"
            :max="max"
            :min="min"
            :range-mode="rangeMode"/>
    </FluxFlyout>
</template>

<script
    lang="ts"
    setup>
    import { clsx } from 'clsx';
    import type { DateTime } from 'luxon';
    import { computed, ref, toRef, unref, useTemplateRef, watch } from 'vue';
    import { useDisabled } from '$flux/composable';
    import { useTranslate } from '$flux/composable/private';
    import type { FluxAutoCompleteType } from '$flux/types';
    import { createLabelForDateRange } from '$flux/util';
    import FluxDatePicker from './FluxDatePicker.vue';
    import FluxFlyout from './FluxFlyout.vue';
    import FluxFormInputGroup from './FluxFormInputGroup.vue';
    import FluxSecondaryButton from './FluxSecondaryButton.vue';
    import $style from '$flux/css/component/Form.module.scss';

    const modelValue = defineModel<[DateTime, DateTime] | null>({
        required: true
    });

    const {
        disabled: componentDisabled,
        rangeMode = 'range'
    } = defineProps<{
        readonly autoComplete?: FluxAutoCompleteType;
        readonly autoFocus?: boolean;
        readonly disabled?: boolean;
        readonly isReadonly?: boolean;
        readonly max?: DateTime;
        readonly min?: DateTime;
        readonly placeholder?: string;
        readonly rangeMode?: 'range' | 'week' | 'month';
    }>();

    const disabled = useDisabled(toRef(() => componentDisabled));
    const flyoutRef = useTemplateRef('flyout');
    const translate = useTranslate();

    const localValue = ref<[DateTime, DateTime] | null>(null);

    const label = computed(() => {
        const value = unref(localValue);

        if (!value) {
            return '';
        }

        const [start, end] = value;

        return createLabelForDateRange(translate, start, end, true);
    });

    watch(localValue, localValue => {
        unref(flyoutRef)?.close();
        modelValue.value = localValue;
    });

    watch(modelValue, modelValue => localValue.value = modelValue, {immediate: true});
</script>
