import type { ComputedRef } from 'vue';
import { computed, getCurrentInstance } from 'vue';

export function useComponentId(): ComputedRef<number> {
    const instance = getCurrentInstance();

    return computed(() => instance?.uid ?? (instance?.proxy as any)._uid ?? 0);
}
