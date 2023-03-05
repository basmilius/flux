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
        background: rgb(var(--gray-3));
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
            background: rgb(var(--gray-0));
            border: 1px solid rgb(var(--gray-5));
            border-radius: 9px;
            box-shadow: var(--shadow-small);
            transition: inherit;
            transition-property: border-color, translate;
        }

        &:checked {
            background: rgb(var(--primary-7));

            &::after {
                border-color: transparent;
                translate: 17px 0;
            }
        }
    }
</style>
