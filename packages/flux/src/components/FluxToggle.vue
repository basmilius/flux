<template>
    <label
        class="flux-toggle"
        :class="{
            'is-checked': modelValue,
            'is-disabled': isDisabled,
            'is-switch': isSwitch
        }"
        :for="id">
        <flux-icon
            v-if="iconOff"
            class="flux-toggle-icon flux-toggle-icon-off"
            :size="16"
            :variant="iconOff"/>

        <flux-icon
            v-if="iconOn"
            class="flux-toggle-icon flux-toggle-icon-on"
            :size="16"
            :variant="iconOn"/>

        <input
            class="flux-toggle-input"
            :id="id"
            :disabled="isDisabled"
            type="checkbox"
            :checked="modelValue"
            @input="toggle"/>
    </label>
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
    import type { IconNames } from '../data';
    import { inject, toRefs } from 'vue-demi';
    import { useId } from '../composables';
    import { FluxIcon } from '.';

    export interface Emits {
        (e: 'update:modelValue', on: boolean): void;
    }

    export interface Props {
        readonly iconOff?: IconNames;
        readonly iconOn?: IconNames;
        readonly isDisabled?: boolean;
        readonly isSwitch?: boolean;
        readonly modelValue?: boolean;
    }

    const emit = defineEmits<Emits>();
    const props = defineProps<Props>();

    const {modelValue} = toRefs(props);

    const id = inject('flux-form-field-id', useId());

    function toggle(evt: Event): void {
        emit('update:modelValue', (evt.target as HTMLInputElement).checked);
    }
</script>

<style lang="scss">
    @use '../scss/mixin' as flux;

    .flux-toggle {
        position: relative;
        width: 54px;
        height: 30px;
        background: rgb(var(--gray-3));
        border-radius: 99px;

        &-icon {
            position: absolute;
            top: 50%;
            color: var(--foreground-secondary);
            pointer-events: none;
            translate: -50% -50%;

            &-off {
                left: 15px;
            }

            &-on {
                left: 39px;
            }
        }

        &-input {
            -webkit-appearance: none;
            appearance: none;

            position: relative;
            display: block;
            margin: 0;
            height: inherit;
            width: inherit;
            background: unset;
            border: 0;
            border-radius: inherit;
            cursor: pointer;
            outline: 0;

            @include flux.focus-ring(2px);

            &::after {
                position: absolute;
                display: block;
                top: 3px;
                left: 3px;
                height: 24px;
                width: 24px;
                content: '';
                background: rgb(var(--gray-0));
                border: 1px solid rgb(var(--gray-5) / .75);
                border-radius: 99px;
                box-shadow: var(--shadow-sm);
            }
        }

        &,
        &-icon,
        &-input,
        &-input::after {
            transition: 210ms var(--swift-out);
            transition-property: background, border-color, color, opacity, scale, translate, flux.focus-ring-transition-properties();
        }

        &.is-checked &-input::after {
            translate: 24px 0;
        }

        &.is-checked:not(.is-switch) {
            background: rgb(var(--primary-7));
        }

        &.is-checked:not(.is-switch) &-icon {
            color: rgb(var(--primary-0));
        }

        &.is-checked:not(.is-switch) &-input::after {
            border-color: transparent;
        }

        &:not(&.is-checked) &-icon-off,
        &.is-checked &-icon-on {
            opacity: 0;
            scale: .5;
        }

        &.is-checked &-icon-on {
            translate: calc(-50% - 6px) -50%;
        }

        &:not(&.is-checked) &-icon-off {
            translate: calc(-50% + 6px) -50%;
        }

        &.is-disabled {
            cursor: not-allowed;
            opacity: .6;
        }
    }
</style>
