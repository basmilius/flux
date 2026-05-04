<template>
    <FilterOptionBase
        v-model:search-query="modelSearch"
        :is-loading="isLoading"
        is-searchable
        :options="options"
        :selected="[currentValue]"
        :search-placeholder="searchPlaceholder"
        @select="onSelect"/>
</template>

<script
    lang="ts"
    setup>
    import type { FluxFilterOptionAsyncSpec, FluxFilterOptionRow, FluxFilterValue } from '@flux-ui/types';
    import { computed, unref } from 'vue';
    import { useAsyncFilterOptions, useFilterOptionSingle } from '~flux/components/composable/private';
    import { defineFilter, isFluxFilterOptionItem, pickFilterCommon } from '~flux/components/util';
    import { FilterOptionBase } from './primitive';

    type Props = FluxFilterOptionAsyncSpec & {
        fetchRelevant(): Promise<FluxFilterOptionRow[]>;
        fetchSearch(searchQuery: string): Promise<FluxFilterOptionRow[]>;
        readonly searchPlaceholder?: string;
    };

    defineFilter<Props>(p => ({
        ...pickFilterCommon(p),
        type: 'option',
        async getValueLabel(value) {
            const items = (await p.fetchOptions([value])).filter(isFluxFilterOptionItem);

            return items.find(o => o.value === value)?.label ?? null;
        }
    }));

    const modelSearch = defineModel<string>('searchQuery', {
        default: ''
    });

    const {
        fetchOptions: fetchOptionsProp,
        fetchRelevant: fetchRelevantProp,
        fetchSearch: fetchSearchProp,
        name
    } = defineProps<Props>();

    const {currentValue, onSelect} = useFilterOptionSingle(name);

    const currentValueIds = computed<FluxFilterValue[]>(() => {
        const value = unref(currentValue);

        if (value === null || value === undefined) {
            return [];
        }

        return [value];
    });

    const {isLoading, options} = useAsyncFilterOptions({
        currentValueIds,
        modelSearch,
        fetchOptions: (ids: FluxFilterValue[]) => fetchOptionsProp(ids),
        fetchRelevant: () => fetchRelevantProp(),
        fetchSearch: (searchQuery: string) => fetchSearchProp(searchQuery)
    });
</script>
