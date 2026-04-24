<template>
    <FilterOptionBase
        v-model:search-query="modelSearch"
        :is-loading="isLoading"
        is-searchable
        :options="options"
        :selected="currentValue"
        :search-placeholder="searchPlaceholder"
        @select="onSelect"/>
</template>

<script
    lang="ts"
    setup>
    import type { FluxFilterOptionRow, FluxFilterValue, FluxIconName } from '@flux-ui/types';
    import { useAsyncFilterOptions, useFilterOptionMulti } from '$flux/composable/private';
    import { FilterOptionBase } from './primitive';

    const modelSearch = defineModel<string>('searchQuery', {
        default: ''
    });

    const {
        fetchOptions: fetchOptionsProp,
        fetchRelevant: fetchRelevantProp,
        fetchSearch: fetchSearchProp,
        name
    } = defineProps<{
        fetchOptions(ids: FluxFilterValue[]): Promise<FluxFilterOptionRow[]>;
        fetchRelevant(): Promise<FluxFilterOptionRow[]>;
        fetchSearch(searchQuery: string): Promise<FluxFilterOptionRow[]>;

        readonly icon?: FluxIconName;
        readonly label: string;
        readonly name: string;
        readonly searchPlaceholder?: string;
    }>();

    const {currentValue, onSelect} = useFilterOptionMulti(name);

    const {isLoading, options} = useAsyncFilterOptions({
        currentValueIds: currentValue,
        modelSearch,
        fetchOptions: (ids: FluxFilterValue[]) => fetchOptionsProp(ids),
        fetchRelevant: () => fetchRelevantProp(),
        fetchSearch: (searchQuery: string) => fetchSearchProp(searchQuery)
    });
</script>
