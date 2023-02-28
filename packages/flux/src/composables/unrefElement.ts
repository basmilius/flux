import { ComponentPublicInstance } from 'vue-demi';
import { resolveUnref } from './resolveUnref';
import { MaybeComputedElementRef, MaybeElement } from './types';

type UnRefElementReturn<T extends MaybeElement = MaybeElement> = T extends ComponentPublicInstance ? Exclude<MaybeElement, ComponentPublicInstance> : T | undefined;

export function unrefElement<T extends MaybeElement>(elementRef: MaybeComputedElementRef<T>): UnRefElementReturn<T> {
    const plain = resolveUnref(elementRef);

    return ((plain as ComponentPublicInstance)?.$el ?? plain) as UnRefElementReturn<T>;
}
