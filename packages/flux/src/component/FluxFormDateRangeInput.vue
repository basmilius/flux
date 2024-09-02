<template>
    <FluxFlyout
        ref="flyoutRef"
        :width="300">
        <template #opener="{open}">
            <FluxFormInputGroup>
                <div
                    :class="clsx(
                        styles.formDateRangeInput,
                        isDisabled && styles.isDisabled
                    )"
                    role="presentation">
                    <span>{{ label }}</span>
                </div>

                <FluxSecondaryButton
                    :disabled="isDisabled"
                    icon-before="calendar"
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
    import { DateTime } from 'luxon';
    import { ComponentPublicInstance, computed, Ref, ref, unref, watch } from 'vue';
    import { useTranslate } from '@/composable/private';
    import { createLabelForDateRange } from '@/util';
    import FluxDatePicker from './FluxDatePicker.vue';
    import FluxFlyout from './FluxFlyout.vue';
    import FluxFormInputGroup from './FluxFormInputGroup.vue';
    import FluxSecondaryButton from './FluxSecondaryButton.vue';
    import styles from '@/css/component/Form.module.scss';

    export type Props = {
        readonly autoComplete?: string;
        readonly autoFocus?: boolean;
        readonly isDisabled?: boolean;
        readonly isReadonly?: boolean;
        readonly max?: DateTime;
        readonly min?: DateTime;
        readonly placeholder?: string;
        readonly rangeMode?: 'range' | 'week' | 'month';
    };

    const modelValue = defineModel<[DateTime, DateTime] | null>({required: true}) as Ref<[DateTime, DateTime] | null>;
    withDefaults(defineProps<Props>(), {
        rangeMode: 'range'
    });

    const translate = useTranslate();

    const flyoutRef = ref<ComponentPublicInstance<{}, {}, {}, {}, { close: Function; }>>();
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
