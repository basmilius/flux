<template>
    <FilterOptionBase
        v-model:search-query="modelSearch"
        :is-searchable="isSearchable"
        :options="options"
        :selected="currentValue"
        :search-placeholder="searchPlaceholder"
        @select="onSelect"/>
</template>

<script
    lang="ts"
    setup>
    import { computed, unref } from 'vue';
    import { useFilterInjection } from '@/composable/private';
    import { FluxFilterOptionRow, FluxFilterValueSingle, IconNames, isFluxFilterOptionHeader } from '@/data';
    import { FilterOptionBase } from './primitive';

    export interface Props {
        readonly icon?: IconNames;
        readonly isSearchable?: boolean;
        readonly label: string;
        readonly name: string;
        readonly options: FluxFilterOptionRow[];
        readonly searchPlaceholder?: string;
    }

    const modelSearch = defineModel<string>('searchQuery', {default: ''});
    const props = defineProps<Props>();

    const {state, setValue} = useFilterInjection();

    const currentValue = computed(() => {
        const value = unref(state)[props.name];

        if (Array.isArray(value)) {
            return value;
        }

        return [];
    });

    const options = computed(() => props.options
        .filter(o => isFluxFilterOptionHeader(o) || unref(modelSearch).length === 0 || o.label.toLowerCase().includes(unref(modelSearch).toLowerCase())));

    function onSelect(value: FluxFilterValueSingle): void {
        let values = Array.from(unref(currentValue));

        if (values.includes(value)) {
            values = values.filter(v => v !== value);
        } else {
            values.push(value);
        }

        setValue(props.name, values);
    }
</script>
