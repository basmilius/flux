import { useDebouncedRef, useLoaded } from '@basmilius/common';
import type { FluxFilterOptionRow, FluxFilterValue } from '@flux-ui/types';
import { computed, ref, unref, watch, type ComputedRef, type ModelRef, type Ref } from 'vue';
import { isFluxFilterOptionItem } from '~flux/components/util';

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

    let selectedGeneration = 0;
    let visibleGeneration = 0;

    watch(params.currentValueIds, async ids => {
        if (ids.length === 0) {
            // Invalidate any in-flight fetch and drop the previous selection, otherwise
            // deselected options linger in the list (or get written back by a stale fetch).
            ++selectedGeneration;
            selectedOptions.value = [];
            return;
        }

        const generation = ++selectedGeneration;
        const options = await unref(fetchOptions)(ids);

        if (generation === selectedGeneration) {
            selectedOptions.value = options;
        }
    }, {immediate: true});

    watch(debouncedModelSearch, async searchQuery => {
        const generation = ++visibleGeneration;
        const options = searchQuery.length > 0
            ? await unref(fetchSearch)(searchQuery)
            : await unref(fetchRelevant)();

        if (generation === visibleGeneration) {
            visibleOptions.value = options;
        }
    }, {immediate: true});

    return {isLoading, options};
}
