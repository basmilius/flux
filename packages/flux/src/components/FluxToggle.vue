<template>
    <input
        class="flux-toggle"
        type="checkbox"
        :checked="modelValue"
        @input="toggle"/>
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
    import { toRefs } from 'vue-demi';

    export interface Emits {
        (e: 'update:modelValue', on: boolean): void;
    }

    export interface Props {
        readonly modelValue?: boolean;
    }

    const emit = defineEmits<Emits>();
    const props = defineProps<Props>();

    const {modelValue} = toRefs(props);

    function toggle(evt: Event): void {
        emit('update:modelValue', (evt.target as HTMLInputElement).checked);
    }
</script>

<style lang="scss">
    .flux-toggle {
        -webkit-appearance: none;
        appearance: none;

        position: relative;
        width: 38px;
        height: 21px;
        background: var(--toggle-background);
        border-radius: 12px;
        cursor: pointer;
        transition: 210ms var(--swift-out);
        transition-property: background;

        &::after {
            position: absolute;
            display: block;
            top: 3px;
            left: 3px;
            height: 15px;
            width: 15px;
            content: '';
            background: var(--toggle-thumb);
            border: 1px solid var(--toggle-thumb-stroke);
            border-radius: 9px;
            box-shadow: 0 1px 2px rgb(0 0 0 / .09);
            transition: inherit;
            transition-property: border-color, translate;
        }

        &:checked {
            background: var(--toggle-background-on);

            &::after {
                border-color: transparent;
                translate: 17px 0;
            }
        }
    }
</style>
