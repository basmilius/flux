import type { Ref, UnwrapRef } from 'vue';
import { unref } from 'vue';

export default function <T>(obj: RefObject<T>): UnrefObject<T> {
    return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [
            key,
            unref(value)
        ])
    ) as UnrefObject<T>;
}

type RefObject<T = Record<string, Ref<unknown>>> = {
    [K in keyof T]: T[K];
};

type UnrefObject<T> = {
    [K in keyof T]: UnwrapRef<T[K]>;
};
