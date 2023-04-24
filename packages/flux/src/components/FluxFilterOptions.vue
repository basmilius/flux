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
    import type { FluxFilterOptionItem, FluxFilterValue, IconNames } from '../data';
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

    const {state, setValue} = useFilterInjection();

    const currentValue = computed(() => {
        const value = unref(state)[props.name];

        if (Array.isArray(value)) {
            return value;
        }

        return [];
    });

    function isSelected(option: FluxFilterOptionItem): boolean {
        return unref(currentValue)?.includes(option.value);
    }

    function select(option: FluxFilterOptionItem): void {
        let value: FluxFilterValue[] = unref(currentValue);

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
