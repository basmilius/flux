import type { FluxFilterValue, FluxFilterValueSingle } from '@flux-ui/types';
import { type ComputedRef, computed, unref } from 'vue';
import { useFilterInjection } from '$flux/composable';

export type FilterOptionSingle = {
    readonly currentValue: ComputedRef<FluxFilterValueSingle>;
    onSelect(value: FluxFilterValue): void;
};

export type FilterOptionMulti = {
    readonly currentValue: ComputedRef<FluxFilterValueSingle[]>;
    onSelect(value: FluxFilterValueSingle): void;
};

export function useFilterOptionSingle(name: string): FilterOptionSingle {
    const {back, state, setValue} = useFilterInjection();

    const currentValue = computed(() => unref(state)[name] as FluxFilterValueSingle);

    function onSelect(value: FluxFilterValue): void {
        if (unref(currentValue) === value) {
            setValue(name, null);
        } else {
            setValue(name, value);
        }

        back();
    }

    return {currentValue, onSelect};
}

export function useFilterOptionMulti(name: string): FilterOptionMulti {
    const {state, setValue} = useFilterInjection();

    const currentValue = computed<FluxFilterValueSingle[]>(() => {
        const value = unref(state)[name];

        if (Array.isArray(value)) {
            return value;
        }

        return [];
    });

    function onSelect(value: FluxFilterValueSingle): void {
        let values = Array.from(unref(currentValue));

        if (values.includes(value)) {
            values = values.filter(v => v !== value);
        } else {
            values.push(value);
        }

        setValue(name, values);
    }

    return {currentValue, onSelect};
}
