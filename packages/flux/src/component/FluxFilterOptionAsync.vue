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
    import { computed, ref, unref, watch } from 'vue';
    import { useFilterInjection } from '@/composable';
    import { useLoaded } from '@/composable/private';
    import { FluxFilterOptionRow, FluxFilterValue, FluxFilterValueSingle, IconNames, isFluxFilterOptionItem } from '@/data';
    import { FilterOptionBase } from './primitive';

    export type Props = {
        readonly fetchOptions: (ids: FluxFilterValue[]) => Promise<FluxFilterOptionRow[]>;
        readonly fetchRelevant: () => Promise<FluxFilterOptionRow[]>;
        readonly fetchSearch: (searchQuery: string) => Promise<FluxFilterOptionRow[]>;
        readonly icon?: IconNames;
        readonly label: string;
        readonly name: string;
        readonly searchPlaceholder?: string;
    };

    const modelSearch = defineModel<string>('searchQuery', {default: ''});
    const props = defineProps<Props>();

    const {back, state, setValue} = useFilterInjection();
    const {isLoading, loaded} = useLoaded();
    const fetchOptions = computed(() => loaded(props.fetchOptions));
    const fetchRelevant = computed(() => loaded(props.fetchRelevant));
    const fetchSearch = computed(() => loaded(props.fetchSearch));

    const selectedOptions = ref<FluxFilterOptionRow[]>([]);
    const visibleOptions = ref<FluxFilterOptionRow[]>([]);

    const currentValue = computed(() => unref(state)[props.name] as FluxFilterValueSingle);

    const options = computed(() => {
        const options: FluxFilterOptionRow[] = [];
        const selected = unref(selectedOptions);
        const visible = unref(visibleOptions);

        visible.forEach(vo => options.push(vo));

        selected.forEach(so => {
            if (isFluxFilterOptionItem(so) && visible.find(vo => isFluxFilterOptionItem(vo) && vo.value === so.value)) {
                return;
            }

            options.push(so);
        });

        return options;
    });

    function onSelect(value: FluxFilterValue): void {
        if (unref(currentValue) === value) {
            setValue(props.name, null);
        } else {
            setValue(props.name, value);
        }

        back();
    }

    watch(currentValue, async value => {
        if (!value && value !== 0) {
            return;
        }

        selectedOptions.value = await unref(fetchOptions)([value]);
    }, {immediate: true});

    watch(modelSearch, async searchQuery => {
        if (searchQuery.length > 0) {
            visibleOptions.value = await unref(fetchSearch)(searchQuery);
        } else {
            visibleOptions.value = await unref(fetchRelevant)();
        }
    }, {immediate: true});
</script>
