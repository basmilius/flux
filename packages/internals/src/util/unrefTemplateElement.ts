import type { ComponentPublicInstance, ShallowRef } from 'vue';

export type TemplateElement<TElement extends HTMLElement> = ComponentPublicInstance<any, any, any, any, any, any, any, any, any, any, any, any, any, any, TElement> | TElement | null;
export type TemplateRef<TElement extends HTMLElement> = Readonly<ShallowRef<TemplateElement<TElement>>>;

export { unwrapElement as default } from '@basmilius/common';
