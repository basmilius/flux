import { unref } from 'vue';
import type { MaybeComputedRef } from './types';

export function resolveUnref<T>(ref: MaybeComputedRef<T>): T {
    return typeof ref === 'function' ? (ref as Function)() : unref(ref);
}
