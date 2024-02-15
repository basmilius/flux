import { customRef, isRef, Ref, ref, watch } from 'vue';

export default function <T>(initialValue: Ref<T> | T, delay: number, immediate: boolean = false): Ref<T> {
    const state = ref(isRef(initialValue) ? initialValue.value : initialValue);

    const debounced = customRef((track, trigger) => ({
        get() {
            track();
            return state.value;
        },

        set: debounce(value => {
            state.value = value;
            trigger();
        }, delay, immediate)
    })) as Ref<T>;

    if (isRef(initialValue)) {
        watch(initialValue, value => debounced.value = value);
    }

    return debounced;
}

function debounce<TFunc extends (...args: any[]) => any, TParams = Parameters<TFunc>, TReturn = ReturnType<TFunc>>(fn: (...args: any[]) => TReturn, delay: number, immediate: boolean = false): VoidFunction {
    let timeout: any;

    return (...args: any[]) => {
        if (immediate && !timeout) {
            fn(...args);
        }

        clearTimeout(timeout);

        timeout = setTimeout(() => requestAnimationFrame(() => fn(...args)), delay);
    };
}
