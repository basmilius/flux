import type { ComponentPublicInstance } from 'vue';
import resolveUnref, { type MaybeComputedRef, type MaybeRef } from './resolveUnref';

export type MaybeElement = HTMLElement | SVGElement | ComponentPublicInstance | undefined | null;

export type MaybeElementRef<T extends MaybeElement = MaybeElement> = MaybeRef<T>;

export type MaybeComputedElementRef<T extends MaybeElement = MaybeElement> = MaybeComputedRef<T>;

type UnrefElement<T extends MaybeElement = MaybeElement> = T extends ComponentPublicInstance ? Exclude<MaybeElement, ComponentPublicInstance> : T | undefined;

export default function <T extends MaybeElement>(elementRef: MaybeComputedElementRef<T>): UnrefElement<T> {
    const plain = resolveUnref(elementRef);

    return ((plain as ComponentPublicInstance)?.$el ?? plain) as UnrefElement<T>;
}
