import { customRef, Ref, ref } from 'vue-demi';

function debounce<TFunc extends (...args: any[]) => any, TParams = Parameters<TFunc>, TReturn = ReturnType<TFunc>>(fn: (...args: any[]) => TReturn, delay: number, immediate: boolean = false): VoidFunction {
    let timeout: any;

    return (...args: any[]) => {
        if (immediate && !timeout)
            fn(...args);

        clearTimeout(timeout);

        timeout = setTimeout(() => requestAnimationFrame(() => fn(...args)), delay);
    };
}

export function useDebouncedRef<T>(initialValue: T, delay: number, immediate: boolean = false): Ref<T> {
    const state = ref(initialValue);

    return customRef((track, trigger) => ({
        get() {
            track();
            return state.value;
        },

        set: debounce(value => {
            state.value = value;
            trigger();
        }, delay, immediate)
    }));
}
