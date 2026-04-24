import { useDebouncedRef, useLoaded } from '@basmilius/common';
import type { FluxFilterOptionRow, FluxFilterValue } from '@flux-ui/types';
import { type ComputedRef, type ModelRef, computed, type Ref, ref, unref, watch } from 'vue';
import { isFluxFilterOptionItem } from '$flux/data';

type UseAsyncFilterOptionsParams = {
    readonly currentValueIds: ComputedRef<FluxFilterValue[]>;
    readonly modelSearch: ModelRef<string, string, string, string>;
    fetchOptions(ids: FluxFilterValue[]): Promise<FluxFilterOptionRow[]>;
    fetchRelevant(): Promise<FluxFilterOptionRow[]>;
    fetchSearch(searchQuery: string): Promise<FluxFilterOptionRow[]>;
};

export default function ({
    currentValueIds,
    modelSearch,
    fetchOptions: fetchOptionsProp,
    fetchRelevant: fetchRelevantProp,
    fetchSearch: fetchSearchProp
}: UseAsyncFilterOptionsParams) {
    const {isLoading, loaded} = useLoaded();
    const debouncedModelSearch = useDebouncedRef(modelSearch, 150) as unknown as Ref<string>;
    const fetchOptions = computed(() => loaded(fetchOptionsProp));
    const fetchRelevant = computed(() => loaded(fetchRelevantProp));
    const fetchSearch = computed(() => loaded(fetchSearchProp));

    const selectedOptions = ref<FluxFilterOptionRow[]>([]);
    const visibleOptions = ref<FluxFilterOptionRow[]>([]);

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

    watch(currentValueIds, async ids => {
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
