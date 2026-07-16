import { useLoaded } from '@basmilius/common';
import type { FluxFilterDefinition, FluxFilterValue } from '@flux-ui/types';
import { computed, ref, unref, watch, type ComputedRef, type Ref } from 'vue';

export function useFilterValueLabel(
    getItem: () => FluxFilterDefinition,
    getValue: () => FluxFilterValue
): {
    readonly isLoading: ComputedRef<boolean>;
    readonly valueLabel: Ref<string | undefined>;
} {
    const {isLoading, loaded} = useLoaded();
    const getValueLabel = computed(() => loaded(getItem().getValueLabel));

    const valueLabel = ref<string>();

    watch([getItem, getValue], async ([, nextValue], _prev, onCleanup) => {
        let cancelled = false;
        onCleanup(() => {
            cancelled = true;
        });

        const nextLabel = await unref(getValueLabel)(nextValue);

        if (!cancelled) {
            valueLabel.value = nextLabel ?? undefined;
        }
    }, {deep: true, immediate: true});

    return {isLoading, valueLabel};
}
