import {computed, ComputedRef, getCurrentInstance} from "vue-demi";

export function useComponentId(): ComputedRef<number> {
    const instance = getCurrentInstance();

    return computed(() => instance?.uid ?? (instance?.proxy as any)._uid ?? 0);
}
