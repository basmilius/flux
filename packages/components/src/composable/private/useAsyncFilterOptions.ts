import { useDebouncedRef, useLoaded } from '@basmilius/common';
import type { FluxFilterOptionRow, FluxFilterValue } from '@flux-ui/types';
import { computed, type ComputedRef, type ModelRef, type Ref, ref, unref, watch } from 'vue';
import { isFluxFilterOptionItem } from '$flux/data';

type UseAsyncFilterOptionsParams = {
    readonly currentValueIds: ComputedRef<FluxFilterValue[]>;
    readonly modelSearch: ModelRef<string, string, string, string>;
    fetchOptions(ids: FluxFilterValue[]): Promise<FluxFilterOptionRow[]>;
    fetchRelevant(): Promise<FluxFilterOptionRow[]>;
    fetchSearch(searchQuery: string): Promise<FluxFilterOptionRow[]>;
};

export default function (params: UseAsyncFilterOptionsParams) {
    const {isLoading, loaded} = useLoaded();
    const debouncedModelSearch = useDebouncedRef(params.modelSearch, 150) as unknown as Ref<string>;
    const fetchOptions = computed(() => loaded(params.fetchOptions));
    const fetchRelevant = computed(() => loaded(params.fetchRelevant));
    const fetchSearch = computed(() => loaded(params.fetchSearch));

    const selectedOptions = ref<FluxFilterOptionRow[]>([]);
    const visibleOptions = ref<FluxFilterOptionRow[]>([]);

    const options = computed(() => {
        const options: FluxFilterOptionRow[] = [];
        const search = unref(params.modelSearch);
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

    watch(params.currentValueIds, async ids => {
        if (ids.length === 0) {
            return;
        }

        selectedOptions.value = await unref(fetchOptions)(ids);
    }, {immediate: true});

    watch(debouncedModelSearch, async searchQuery => {
        if (searchQuery.length > 0) {
            visibleOptions.value = await unref(fetchSearch)(searchQuery);
        } else {
            visibleOptions.value = await unref(fetchRelevant)();
        }
    }, {immediate: true});

    return {isLoading, options};
}
