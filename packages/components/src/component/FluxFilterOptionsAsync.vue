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
    import type { FluxFilterOptionRow, FluxFilterOptionsAsyncSpec, FluxFilterValue } from '@flux-ui/types';
    import { useAsyncFilterOptions, useFilterOptionMulti, useTranslate } from '~flux/components/composable/private';
    import { defineFilter, generateMultiOptionsLabel, isFluxFilterOptionItem, pickFilterCommon } from '~flux/components/util';
    import { FilterOptionBase } from './primitive';

    type Props = FluxFilterOptionsAsyncSpec & {
        fetchRelevant(): Promise<FluxFilterOptionRow[]>;
        fetchSearch(searchQuery: string): Promise<FluxFilterOptionRow[]>;
        readonly searchPlaceholder?: string;
    };

    defineFilter<Props>(p => {
        const translate = useTranslate();

        return {
            ...pickFilterCommon(p),
            type: 'options',
            async getValueLabel(value) {
                if (!Array.isArray(value)) {
                    return null;
                }

                const items = (await p.fetchOptions(value)).filter(isFluxFilterOptionItem);

                return generateMultiOptionsLabel(translate, items, value);
            }
        };
    });

    const modelSearch = defineModel<string>('searchQuery', {
        default: ''
    });

    const {
        fetchOptions: fetchOptionsProp,
        fetchRelevant: fetchRelevantProp,
        fetchSearch: fetchSearchProp,
        name
    } = defineProps<Props>();

    const {currentValue, onSelect} = useFilterOptionMulti(name);

    const {isLoading, options} = useAsyncFilterOptions({
        currentValueIds: currentValue,
        modelSearch,
        fetchOptions: (ids: FluxFilterValue[]) => fetchOptionsProp(ids),
        fetchRelevant: () => fetchRelevantProp(),
        fetchSearch: (searchQuery: string) => fetchSearchProp(searchQuery)
    });
</script>
