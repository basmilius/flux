import type { MaybeComputedRef } from './types';
import { unref } from 'vue-demi';

export function resolveUnref<T>(ref: MaybeComputedRef<T>): T {
    return typeof ref === 'function' ? (ref as Function)() : unref(ref);
}
