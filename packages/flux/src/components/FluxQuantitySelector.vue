<template>
    <flux-button-group
        class="flux-quantity-selector"
        tabindex="0">
        <flux-secondary-button
            class="flux-quantity-selector-button"
            :disabled="internalValue <= min"
            icon-before="minus"
            tabindex="-1"
            @click="decrement"/>

        <input
            ref="inputRef"
            v-model="internalValue"
            class="flux-form-input flux-quantity-selector-input"
            tabindex="-1"
            type="number"
            :max="max"
            :min="min"
            :step="step"/>

        <flux-secondary-button
            class="flux-quantity-selector-button"
            :disabled="internalValue >= max"
            icon-before="plus"
            tabindex="-1"
            @click="increment"/>
    </flux-button-group>
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
    import { onMounted, ref, toRefs, unref, watch } from 'vue-demi';
    import { FluxButtonGroup, FluxSecondaryButton } from '.';

    export interface Emits {
        (e: 'update:modelValue', value: number): void;
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
        width.value = 0;

        requestAnimationFrame(() => {
            const input = unref(inputRef);
            width.value = Math.max(51, input!.scrollWidth + 30);
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

        emit('update:modelValue', internalValue);
        sizeToContent();
    });

    watch(modelValue, modelValue => {
        if (internalValue.value === modelValue) {
            return;
        }

        internalValue.value = modelValue;
        sizeToContent();
    }, {immediate: true});
</script>

<style lang="scss">
    @use '../scss/mixin' as flux;

    @layer component {
        .flux-quantity-selector {
            align-self: center;
            justify-self: center;
            border: 1px solid rgb(var(--gray-4) / .75);
            border-radius: var(--radius);
            box-shadow: var(--shadow-pixel);
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
                width: calc(v-bind(width) * 1px);
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
                    outline: 0;
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
    }
</style>
