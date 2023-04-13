<template>
    <flux-flyout
        ref="flyoutRef"
        :width="300">
        <template #opener="{open}">
            <flux-form-input-group>
                <div
                    class="flux-form-input flux-form-date-range-input"
                    :class="{
                        'is-disabled': isDisabled,
                        'is-readonly': isReadonly
                    }">
                    <span>{{ label }}</span>
                </div>

                <flux-secondary-button
                    :disabled="isDisabled"
                    icon-before="calendar"
                    @click="open"/>
            </flux-form-input-group>
        </template>

        <flux-date-picker
            v-model="localValue"
            :range-mode="rangeMode"/>
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
    import { ComponentPublicInstance, computed, ref, toRefs, unref, watch } from 'vue-demi';
    import { useTranslate } from '../composables';
    import { createLabelForDateRange } from '../utils';
    import { FluxDatePicker, FluxFlyout, FluxFormInputGroup, FluxSecondaryButton } from '.';

    export interface Emits {
        (e: 'update:modelValue', value: [DateTime, DateTime] | null): void;
    }

    export interface Props {
        readonly autoComplete?: string;
        readonly autoFocus?: boolean;
        readonly isDisabled?: boolean;
        readonly isReadonly?: boolean;
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
        emit('update:modelValue', localValue);
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
