<template>
    <flux-menu-group>
        <template
            v-for="option of options"
            :key="option.value">
            <flux-menu-item
                is-selectable
                :is-selected="isSelected(option)"
                :label="option.label"
                @click="select(option)"/>
        </template>
    </flux-menu-group>
</template>

<script
    lang="ts"
    setup>
    import type { FluxFilterOptionItem, IconNames } from '../data';
    import { computed, unref } from 'vue-demi';
    import { useFilterInjection } from '../composables';
    import { FluxMenuGroup, FluxMenuItem } from '.';

    export interface Props {
        readonly icon?: IconNames;
        readonly label: string;
        readonly name: string;
        readonly options: FluxFilterOptionItem[];
    }

    const props = defineProps<Props>();

    const {back, state, setValue} = useFilterInjection();

    const currentValue = computed(() => unref(state)[props.name]);

    function isSelected(option: FluxFilterOptionItem): boolean {
        return unref(currentValue) === option.value;
    }

    function select(option: FluxFilterOptionItem): void {
        if (unref(currentValue) === option.value) {
            setValue(props.name, undefined);
        } else {
            setValue(props.name, option.value);
        }

        back();
    }
</script>
