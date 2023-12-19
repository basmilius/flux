import type { ComputedRef, Ref } from 'vue';
import { unref } from 'vue';

export type MaybeRef<T> = T | Ref<T>;

export type MaybeReadonlyRef<T> = (() => T) | ComputedRef<T>;

export type MaybeComputedRef<T> = MaybeReadonlyRef<T> | MaybeRef<T>;

export default function <T>(ref: MaybeComputedRef<T>): T {
    return typeof ref === 'function' ? (ref as Function)() : unref(ref);
}
