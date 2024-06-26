<template>
    <label
        class="flux-toggle"
        :class="{
            'is-checked': modelValue,
            'is-disabled': isDisabled,
            'is-switch': isSwitch
        }"
        :for="id">
        <FluxIcon
            v-if="iconOff"
            class="flux-toggle-icon is-off"
            :size="14"
            :variant="iconOff"/>

        <FluxIcon
            v-if="iconOn"
            class="flux-toggle-icon is-on"
            :size="14"
            :variant="iconOn"/>

        <input
            class="flux-toggle-input"
            :id="id"
            :disabled="isDisabled"
            type="checkbox"
            :checked="modelValue"
            role="switch"
            :aria-checked="modelValue"
            @input="toggle"/>
    </label>
</template>

<script
    lang="ts"
    setup>
    import { useFormFieldInjection } from '@/composable';
    import type { IconNames } from '@/data';
    import FluxIcon from './FluxIcon.vue';

    export type Props = {
        readonly iconOff?: IconNames;
        readonly iconOn?: IconNames;
        readonly isDisabled?: boolean;
        readonly isSwitch?: boolean;
    };

    const modelValue = defineModel<boolean>({default: false});
    defineProps<Props>();

    const {id} = useFormFieldInjection();

    function toggle(evt: Event): void {
        modelValue.value = (evt.target as HTMLInputElement).checked;
    }
</script>

<style lang="scss">
    @use '../css/mixin' as flux;

    .flux-toggle {
        position: relative;
        display: block;
        width: 54px;
        height: 30px;
        flex: 0 0 auto;
        background: rgb(var(--gray-3));
        border-radius: 99px;
        contain: paint;

        &-icon {
            position: absolute;
            top: 50%;
            color: var(--foreground-secondary);
            pointer-events: none;
            translate: -50% -50%;

            &.is-off {
                left: 15px;
            }

            &.is-on {
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
                background-clip: padding-box;
                border: 1px solid rgb(var(--gray-4) / .75);
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

        &.is-checked &-icon.is-on {
            translate: calc(-50% + 24px) -50%;
        }

        &:not(&.is-checked) &-icon.is-off {
            translate: calc(-50% - 24px) -50%;
        }

        &.is-disabled {
            cursor: not-allowed;
            opacity: .6;
        }
    }
</style>
