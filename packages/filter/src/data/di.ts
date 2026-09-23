import type { FluxFilterDefinition, FluxFilterState, FluxFilterValue } from '@flux-ui/types';
import type { InjectionKey, Ref } from 'vue';

export const FluxFilterInjectionKey: InjectionKey<FluxFilterInjection> = Symbol();

export type FluxFilterInjection = {
    readonly state: Ref<FluxFilterState>;

    back(): void;
    clear(name: string | number): void;
    getDefinition(name: string | number): FluxFilterDefinition | undefined;
    getValue(name: string | number): FluxFilterValue | undefined;
    hasValue(name: string | number): boolean;
    reset(name: string | number): void;
    setValue(name: string | number, value?: FluxFilterValue): void;
};
