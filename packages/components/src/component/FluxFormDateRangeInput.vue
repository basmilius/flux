<template>
    <FluxFlyout
        ref="flyout"
        :width="300">
        <template #opener="{open}">
            <FluxFormInputGroup
                :aria-disabled="disabled ? true : undefined"
                :aria-readonly="isReadonly ? true : undefined"
                :aria-invalid="error ? true : undefined">
                <div
                    :class="clsx(
                        $style.formDateRangeInput,
                        disabled && $style.isDisabled,
                        isCondensed && $style.isCondensed,
                        isSecondary && $style.isSecondary,
                        error && $style.isInvalid
                    )"
                    role="presentation">
                    <span v-if="label">{{ label }}</span>
                    <span
                        v-else-if="placeholder"
                        :class="$style.formSelectPlaceholder">
                        {{ placeholder }}
                    </span>
                </div>

                <FluxSecondaryButton
                    :disabled="disabled || isReadonly"
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
    import type { FluxFormInputBaseProps } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import type { DateTime } from 'luxon';
    import { computed, toRef, unref, useTemplateRef } from 'vue';
    import { useDisabled } from '$flux/composable';
    import { useDateFlyout } from '$flux/composable/private';
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
    } = defineProps<FluxFormInputBaseProps & {
        readonly max?: DateTime;
        readonly min?: DateTime;
        readonly rangeMode?: 'range' | 'week' | 'month';
    }>();

    const disabled = useDisabled(toRef(() => componentDisabled));
    const flyoutRef = useTemplateRef('flyout');

    const localValue = useDateFlyout(modelValue, flyoutRef);

    const label = computed(() => {
        const value = unref(localValue);

        if (!value) {
            return '';
        }

        const [start, end] = value;

        return createLabelForDateRange(start, end, true);
    });
</script>
