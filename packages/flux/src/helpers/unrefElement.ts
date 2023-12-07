import type { ComponentPublicInstance } from 'vue';
import type { MaybeComputedElementRef, MaybeElement } from './types';
import { resolveUnref } from './resolveUnref';

type UnRefElementReturn<T extends MaybeElement = MaybeElement> = T extends ComponentPublicInstance ? Exclude<MaybeElement, ComponentPublicInstance> : T | undefined;

export function unrefElement<T extends MaybeElement>(elementRef: MaybeComputedElementRef<T>): UnRefElementReturn<T> {
    const plain = resolveUnref(elementRef);

    return ((plain as ComponentPublicInstance)?.$el ?? plain) as UnRefElementReturn<T>;
}
