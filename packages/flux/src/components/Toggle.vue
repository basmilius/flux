<template>
    <input
        class="flux-toggle"
        type="checkbox"
        :checked="value"
        @input="toggle"/>
</template>

<script
    lang="ts"
    setup>
    import { toRefs } from 'vue-demi';

    interface Emits {
        (e: 'input', on: boolean): void;
    }

    interface Props {
        readonly value?: boolean; // note: name has to be 'value' for v-model.
    }

    const emit = defineEmits<Emits>();
    const props = defineProps<Props>();

    const {value} = toRefs(props);

    function toggle(evt: Event): void {
        emit('input', (evt.target as HTMLInputElement).checked);
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
