import type { ComponentPublicInstance, ComputedRef, Ref } from 'vue-demi';

export type MaybeRef<T> = T | Ref<T>;

export type MaybeReadonlyRef<T> = (() => T) | ComputedRef<T>;

export type MaybeComputedRef<T> = MaybeReadonlyRef<T> | MaybeRef<T>;

export type MaybeElement = HTMLElement | SVGElement | ComponentPublicInstance | undefined | null;

export type MaybeComputedElementRef<T extends MaybeElement = MaybeElement> = MaybeComputedRef<T>;
