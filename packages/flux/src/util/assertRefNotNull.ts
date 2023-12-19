import type { Ref } from 'vue';

export default function <T>(ref: Ref<T>): asserts ref is Ref<NonNullable<T>> {
    if (ref.value) {
        return;
    }

    throw new Error('[Flux] Ref value is null.');
}
