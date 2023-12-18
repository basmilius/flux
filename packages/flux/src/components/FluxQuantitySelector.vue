<template>
    <FluxButtonGroup class="flux-quantity-selector">
        <FluxSecondaryButton
            class="flux-quantity-selector-button"
            :disabled="internalValue <= min"
            icon-before="minus"
            tabindex="-1"
            @click="decrement"/>

        <input
            ref="inputRef"
            v-model="internalValue"
            class="flux-form-input flux-quantity-selector-input"
            :style="{
                width: `${width}px`
            }"
            tabindex="0"
            type="number"
            :max="max"
            :min="min"
            :step="step"/>

        <FluxSecondaryButton
            class="flux-quantity-selector-button"
            :disabled="internalValue >= max"
            icon-before="plus"
            tabindex="-1"
            @click="increment"/>
    </FluxButtonGroup>
</template>

<script
    lang="ts"
    setup>
    import { onMounted, ref, toRefs, unref, watch } from 'vue';
    import FluxButtonGroup from './FluxButtonGroup.vue';
    import FluxSecondaryButton from './FluxSecondaryButton.vue';

    export interface Emits {
        (e: 'update:model-value', value: number): void;
    }

    export interface Props {
        readonly max?: number;
        readonly min?: number;
        readonly modelValue: number;
        readonly step?: number;
    }

    const emit = defineEmits<Emits>();
    const props = withDefaults(defineProps<Props>(), {
        max: 100,
        min: 0,
        step: 1
    });
    const {max, min, modelValue, step} = toRefs(props);

    const inputRef = ref<HTMLInputElement>();
    const internalValue = ref(0);
    const width = ref(0);

    onMounted(() => requestAnimationFrame(sizeToContent));

    function decrement(): void {
        internalValue.value = Math.max(unref(min), unref(internalValue) - unref(step));
    }

    function increment(): void {
        internalValue.value = Math.min(unref(max), unref(internalValue) + unref(step));
    }

    function sizeToContent(): void {
        const input = unref(inputRef);

        if (!input || isNaN(input.valueAsNumber)) {
            return;
        }

        width.value = 0;

        requestAnimationFrame(() => {
            width.value = Math.max(51, input.scrollWidth + 30);
        });
    }

    watch(internalValue, internalValue => {
        if (internalValue > unref(max)) {
            increment();
            return;
        }

        if (internalValue < unref(min)) {
            decrement();
            return;
        }

        emit('update:model-value', internalValue);
        sizeToContent();
    });

    watch(modelValue, () => {
        if (internalValue.value === modelValue.value) {
            return;
        }

        internalValue.value = modelValue.value;
        sizeToContent();
    }, {immediate: true});
</script>

<style lang="scss">
    @use '../css/mixin' as flux;

    .flux-quantity-selector {
        align-self: center;
        justify-self: center;
        border: 1px solid rgb(var(--gray-4) / .75);
        border-radius: var(--radius);
        box-shadow: var(--shadow-px);
        overflow: hidden;

        @include flux.focus-ring-transition(2px, true);

        &-button {
            margin: -1px;
            border: 0;

            &:first-child {
                margin-right: 0;
            }

            &:last-child {
                margin-left: 0;
            }

            &,
            &:focus-visible,
            &:focus-within {
                outline: 0;
            }
        }

        &-input {
            margin: -1px 0;
            padding-left: 0;
            padding-right: 0;
            border-radius: 0;
            font-variant-numeric: tabular-nums;
            font-weight: 700;
            text-align: center;

            &:hover {
                border-color: rgb(var(--gray-4));
            }

            &,
            &:focus-visible,
            &:focus-within {
                outline: 0 !important;
            }

            & {
                -moz-appearance: textfield;
            }

            &::-webkit-outer-spin-button,
            &::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }
        }
    }
</style>
