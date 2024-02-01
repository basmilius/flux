import type { ComputedRef } from 'vue';
import { computed, ref, unref } from 'vue';

export default function (): UseLoaded {
    const tasks = ref(0);

    const isLoading = computed(() => unref(tasks) > 0);

    function loaded<T extends Function>(fn: T): T {
        return (async (...args: any[]) => {
            tasks.value++;

            return await fn(...args)
                .finally(() => tasks.value--);
        }) as unknown as T;
    }

    return {
        isLoading,
        loaded
    };
}

type UseLoaded = {
    readonly isLoading: ComputedRef<boolean>;
    loaded<T extends Function>(fn: T): T;
};
