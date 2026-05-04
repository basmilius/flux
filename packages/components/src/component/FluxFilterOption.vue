<template>
    <FilterOptionBase
        v-model:search-query="modelSearch"
        :is-searchable="isSearchable"
        :options="filteredOptions"
        :selected="[currentValue]"
        :search-placeholder="searchPlaceholder"
        @select="onSelect"/>
</template>

<script
    lang="ts"
    setup>
    import type { FluxFilterOptionSpec } from '@flux-ui/types';
    import { computed, unref } from 'vue';
    import { useFilterOptionSingle } from '~flux/components/composable/private';
    import { defineFilter, isFluxFilterOptionHeader, isFluxFilterOptionItem, pickFilterCommon } from '~flux/components/util';
    import { FilterOptionBase } from './primitive';

    type Props = FluxFilterOptionSpec & {
        readonly isSearchable?: boolean;
        readonly searchPlaceholder?: string;
    };

    defineFilter<Props>(p => {
        const items = p.options.filter(isFluxFilterOptionItem);

        return {
            ...pickFilterCommon(p),
            type: 'option',
            async getValueLabel(value) {
                return items.find(o => o.value === value)?.label ?? null;
            }
        };
    });

    const modelSearch = defineModel<string>('searchQuery', {default: ''});

    const {
        name,
        options
    } = defineProps<Props>();

    const {currentValue, onSelect} = useFilterOptionSingle(name);

    const filteredOptions = computed(() => options
        .filter(o => isFluxFilterOptionHeader(o) || unref(modelSearch).length === 0 || o.label.toLowerCase().includes(unref(modelSearch).toLowerCase())));
</script>
