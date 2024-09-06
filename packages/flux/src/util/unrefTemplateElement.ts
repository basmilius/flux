import { ComponentPublicInstance, ShallowRef, unref } from 'vue';
import isHtmlElement from './isHtmlElement';

export type TemplateElement<TElement extends HTMLElement> = ComponentPublicInstance<any, any, any, any, any, any, any, any, any, any, any, any, any, any, TElement> | TElement | null;
export type TemplateRef<TElement extends HTMLElement> = Readonly<ShallowRef<TemplateElement<TElement>>>;

export default function <T extends HTMLElement>(ref: TemplateRef<T>): T | null {
    const value = unref(ref);

    if (isHtmlElement(value)) {
        return value as T;
    }

    return value?.$el;
}
