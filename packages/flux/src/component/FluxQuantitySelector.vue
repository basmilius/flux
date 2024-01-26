<template>
    <FluxButtonGroup class="flux-quantity-selector">
        <FluxSecondaryButton
            class="flux-quantity-selector-button"
            :disabled="modelValue <= min"
            icon-before="minus"
            tabindex="-1"
            @click="decrement"/>

        <input
            ref="inputRef"
            v-model="modelValue"
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
            :disabled="modelValue >= max"
            icon-before="plus"
            tabindex="-1"
            @click="increment"/>
    </FluxButtonGroup>
</template>

<script
    lang="ts"
    setup>
    import { ref, toRefs, unref, watchEffect } from 'vue';
    import FluxButtonGroup from './FluxButtonGroup.vue';
    import FluxSecondaryButton from './FluxSecondaryButton.vue';

    export type Props = {
        readonly max?: number;
        readonly min?: number;
        readonly step?: number;
    };

    const modelValue = defineModel<number>({default: 0});
    const props = withDefaults(defineProps<Props>(), {
        max: 100,
        min: 0,
        step: 1
    });
    const {max, min, step} = toRefs(props);

    const inputRef = ref<HTMLInputElement>();
    const width = ref(0);

    function decrement(): void {
        modelValue.value = Math.max(unref(min), unref(modelValue) - unref(step));
    }

    function increment(): void {
        modelValue.value = Math.min(unref(max), unref(modelValue) + unref(step));
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

    watchEffect(() => {
        if (unref(modelValue) > unref(max)) {
            increment();
            return;
        }

        if (unref(modelValue) < unref(min)) {
            decrement();
            return;
        }

        sizeToContent();
    });
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
