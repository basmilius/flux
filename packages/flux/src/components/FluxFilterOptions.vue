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
    import { computed, inject, unref } from 'vue-demi';
    import { FluxMenuGroup, FluxMenuItem } from '.';

    export interface Props {
        readonly icon?: IconNames;
        readonly label: string;
        readonly name: string;
        readonly options: FluxFilterOptionItem[];
    }

    const props = defineProps<Props>();

    const {state, setValue} = inject<any>('flux-filter');

    const currentValue = computed(() => unref(state)[props.name]);

    function isSelected(option: FluxFilterOptionItem): boolean {
        return unref(currentValue)?.includes(option.value);
    }

    function select(option: FluxFilterOptionItem): void {
        let value: FluxFilterOptionItem['value'][] = unref(currentValue);

        if (!Array.isArray(value)) {
            value = [];
        }

        if (value.includes(option.value)) {
            value = value.filter(v => v !== option.value);
        } else {
            value.push(option.value);
        }

        setValue(props.name, value);
    }
</script>
