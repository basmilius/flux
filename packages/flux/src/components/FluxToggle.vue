<template>
    <label
        class="flux-toggle"
        :class="{
            'flux-toggle-checked': modelValue,
            'flux-toggle-switch': isSwitch
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
                border: 1px solid rgb(var(--gray-5));
                border-radius: 99px;
                box-shadow: var(--shadow-small);
            }
        }

        &,
        &-icon,
        &-input,
        &-input::after {
            transition: 210ms var(--swift-out);
            transition-property: background, border-color, color, opacity, scale, translate, flux.focus-ring-transition-properties();
        }

        &-checked:not(&-switch) &-icon {
            color: rgb(var(--primary-0));
        }

        &-checked:not(&-switch) {
            background: rgb(var(--primary-7));
        }

        &-checked:not(&-switch) &-input::after {
            border-color: transparent;
        }

        &-checked &-input::after {
            translate: 24px 0;
        }

        &:not(&-checked) &-icon-off,
        &-checked &-icon-on {
            opacity: 0;
            scale: .5;
        }

        &-checked &-icon-on {
            translate: calc(-50% - 6px) -50%;
        }

        &:not(&-checked) &-icon-off {
            translate: calc(-50% + 6px) -50%;
        }
    }
</style>
