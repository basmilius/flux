import { computed, shallowRef, unref } from 'vue';

export default function () {
    const tasks = shallowRef(0);

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
