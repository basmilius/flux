<template>
    <FilterOptionBase
        v-model:search-query="modelSearch"
        :is-searchable="isSearchable"
        :options="options"
        :selected="[currentValue]"
        :search-placeholder="searchPlaceholder"
        @select="onSelect"/>
</template>

<script
    lang="ts"
    setup>
    import { computed, unref } from 'vue';
    import { useFilterInjection } from '@/composable';
    import { FluxFilterOptionRow, FluxFilterValue, FluxFilterValueSingle, IconNames, isFluxFilterOptionHeader } from '@/data';
    import { FilterOptionBase } from './primitive';

    export type Props = {
        readonly icon?: IconNames;
        readonly isSearchable?: boolean;
        readonly label: string;
        readonly name: string;
        readonly options: FluxFilterOptionRow[];
        readonly searchPlaceholder?: string;
    };

    const modelSearch = defineModel<string>('searchQuery', {default: ''});
    const props = defineProps<Props>();

    const {back, state, setValue} = useFilterInjection();

    const currentValue = computed(() => unref(state)[props.name] as FluxFilterValueSingle);
    const options = computed(() => props.options
        .filter(o => isFluxFilterOptionHeader(o) || unref(modelSearch).length === 0 || o.label.toLowerCase().includes(unref(modelSearch).toLowerCase())));

    function onSelect(value: FluxFilterValue): void {
        if (unref(currentValue) === value) {
            setValue(props.name, null);
        } else {
            setValue(props.name, value);
        }

        back();
    }
</script>
