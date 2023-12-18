<template>
    <FluxFlyout
        ref="flyoutRef"
        :width="300">
        <template #opener="{open}">
            <FluxFormInputGroup>
                <div
                    class="flux-form-input flux-form-date-range-input"
                    :class="{
                        'is-disabled': isDisabled,
                        'is-readonly': isReadonly
                    }">
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
    import { DateTime } from 'luxon';
    import { ComponentPublicInstance, computed, ref, toRefs, unref, watch } from 'vue';
    import { useTranslate } from '@/composables';
    import { createLabelForDateRange } from '@/utils';
    import FluxDatePicker from './FluxDatePicker.vue';
    import FluxFlyout from './FluxFlyout.vue';
    import FluxFormInputGroup from './FluxFormInputGroup.vue';
    import FluxSecondaryButton from './FluxSecondaryButton.vue';

    export interface Emits {
        (e: 'update:model-value', value: [DateTime, DateTime] | null): void;
    }

    export interface Props {
        readonly autoComplete?: string;
        readonly autoFocus?: boolean;
        readonly isDisabled?: boolean;
        readonly isReadonly?: boolean;
        readonly max?: DateTime;
        readonly min?: DateTime;
        readonly modelValue: [DateTime, DateTime] | null;
        readonly placeholder?: string;
        readonly rangeMode?: 'range' | 'week' | 'month';
    }

    const emit = defineEmits<Emits>();
    const props = withDefaults(defineProps<Props>(), {
        rangeMode: 'range'
    });
    const {modelValue} = toRefs(props);

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
        emit('update:model-value', localValue);
    });

    watch(modelValue, modelValue => localValue.value = modelValue, {immediate: true});
</script>

<style lang="scss">
    .flux-form-input.flux-form-date-range-input {
        display: flex;
        align-items: center;
        cursor: default;
    }
</style>
