import { unref } from 'vue-demi';
import { MaybeComputedRef } from './types';

export function resolveUnref<T>(r: MaybeComputedRef<T>): T {
    return typeof r === 'function' ? (r as any)() : unref(r);
}
