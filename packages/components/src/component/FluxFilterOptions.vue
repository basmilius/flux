<template>
    <FilterOptionBase
        v-model:search-query="modelSearch"
        :is-searchable="isSearchable"
        :options="filteredOptions"
        :selected="currentValue"
        :search-placeholder="searchPlaceholder"
        @select="onSelect"/>
</template>

<script
    lang="ts"
    setup>
    import type { FluxFilterOptionsSpec } from '@flux-ui/types';
    import { computed, unref } from 'vue';
    import { useFilterOptionMulti, useTranslate } from '~flux/components/composable/private';
    import { defineFilter, generateMultiOptionsLabel, isFluxFilterOptionHeader, isFluxFilterOptionItem, pickFilterCommon } from '~flux/components/util';
    import { FilterOptionBase } from './primitive';

    type Props = FluxFilterOptionsSpec & {
        readonly isSearchable?: boolean;
        readonly searchPlaceholder?: string;
    };

    defineFilter<Props>(p => {
        const items = p.options.filter(isFluxFilterOptionItem);
        const translate = useTranslate();

        return {
            ...pickFilterCommon(p),
            type: 'options',
            async getValueLabel(value) {
                if (!Array.isArray(value)) {
                    return null;
                }

                return generateMultiOptionsLabel(translate, items, value);
            }
        };
    });

    const modelSearch = defineModel<string>('searchQuery', {
        default: ''
    });

    const {
        name,
        options
    } = defineProps<Props>();

    const {currentValue, onSelect} = useFilterOptionMulti(name);

    const filteredOptions = computed(() => options
        .filter(o => isFluxFilterOptionHeader(o) || unref(modelSearch).length === 0 || o.label.toLowerCase().includes(unref(modelSearch).toLowerCase())));
</script>
