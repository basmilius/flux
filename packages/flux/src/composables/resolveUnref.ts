import type { MaybeComputedRef } from './types';
import { unref } from 'vue-demi';

export function resolveUnref<T>(r: MaybeComputedRef<T>): T {
    return typeof r === 'function' ? (r as any)() : unref(r);
}
