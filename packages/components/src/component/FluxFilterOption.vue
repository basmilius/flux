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
    import type { FluxFilterOptionRow, FluxFilterValue, FluxFilterValueSingle, FluxIconName } from '@flux-ui/types';
    import { computed, unref } from 'vue';
    import { useFilterInjection } from '$flux/composable';
    import { isFluxFilterOptionHeader } from '$flux/data';
    import { FilterOptionBase } from './primitive';

    const modelSearch = defineModel<string>('searchQuery', {default: ''});

    const {
        name,
        options
    } = defineProps<{
        readonly icon?: FluxIconName;
        readonly isSearchable?: boolean;
        readonly label: string;
        readonly name: string;
        readonly options: FluxFilterOptionRow[];
        readonly searchPlaceholder?: string;
    }>();

    const {back, state, setValue} = useFilterInjection();

    const currentValue = computed(() => unref(state)[name] as FluxFilterValueSingle);
    const filteredOptions = computed(() => options
        .filter(o => isFluxFilterOptionHeader(o) || unref(modelSearch).length === 0 || o.label.toLowerCase().includes(unref(modelSearch).toLowerCase())));

    function onSelect(value: FluxFilterValue): void {
        if (unref(currentValue) === value) {
            setValue(name, null);
        } else {
            setValue(name, value);
        }

        back();
    }
</script>
