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
    import { useDebouncedRef } from '@basmilius/flux-internals';
    import { computed, ref, unref, watch } from 'vue';
    import { useFilterInjection } from '@/composable';
    import { useLoaded } from '@/composable/private';
    import { isFluxFilterOptionItem } from '@/data';
    import type { FluxFilterOptionRow, FluxFilterValue, FluxFilterValueSingle, FluxIconName } from '@/types';
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

    const {back, state, setValue} = useFilterInjection();
    const {isLoading, loaded} = useLoaded();
    const debouncedModelSearch = useDebouncedRef(modelSearch, 150);
    const fetchOptions = computed(() => loaded(fetchOptionsProp));
    const fetchRelevant = computed(() => loaded(fetchRelevantProp));
    const fetchSearch = computed(() => loaded(fetchSearchProp));

    const selectedOptions = ref<FluxFilterOptionRow[]>([]);
    const visibleOptions = ref<FluxFilterOptionRow[]>([]);

    const currentValue = computed(() => unref(state)[name] as FluxFilterValueSingle);

    const options = computed(() => {
        const options: FluxFilterOptionRow[] = [];
        const search = unref(modelSearch);
        const selected = unref(selectedOptions);
        const visible = unref(visibleOptions);

        visible.forEach(vo => options.push(vo));

        selected.forEach(so => {
            if (isFluxFilterOptionItem(so) && visible.find(vo => isFluxFilterOptionItem(vo) && vo.value === so.value)) {
                return;
            }

            if (isFluxFilterOptionItem(so) && !so.label.toLowerCase().includes(search.toLowerCase())) {
                return;
            }

            options.push(so);
        });

        return options;
    });

    function onSelect(value: FluxFilterValue): void {
        if (unref(currentValue) === value) {
            setValue(name, null);
        } else {
            setValue(name, value);
        }

        back();
    }

    watch(currentValue, async value => {
        if (!value && value !== 0) {
            return;
        }

        selectedOptions.value = await unref(fetchOptions)([value]);
    }, {immediate: true});

    watch(debouncedModelSearch, async searchQuery => {
        if (searchQuery.length > 0) {
            visibleOptions.value = await unref(fetchSearch)(searchQuery);
        } else {
            visibleOptions.value = await unref(fetchRelevant)();
        }
    }, {immediate: true});
</script>
