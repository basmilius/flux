import { ComponentPublicInstance, Ref, unref } from 'vue';
import { isHtmlElement } from '@/util/index';

type MaybeElement = ComponentPublicInstance | HTMLElement | undefined;

export default function (maybeElement: MaybeElement | Ref<MaybeElement>): HTMLElement | undefined {
    const element = unref(maybeElement);

    if (isHtmlElement(element)) {
        return element;
    }

    return element?.$el;
}
