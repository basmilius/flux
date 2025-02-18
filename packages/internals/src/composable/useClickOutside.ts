import type { Ref } from 'vue';
import { onMounted, onUnmounted, ref, unref, watchEffect } from 'vue';
import type { TemplateRef } from '../util';
import { unrefTemplateElement } from '../util';

type Handler = ((evt: PointerEvent) => void) | ((evt: PointerEvent) => Promise<void>);

export default function <TElement extends HTMLElement>(elementRefs: TemplateRef<TElement> | TemplateRef<TElement>[], enabled: boolean | Ref<boolean>, onOutsideClick: Handler): void {
    const elements = ref<HTMLElement[]>([]);

    onMounted(() => {
        document.addEventListener('pointerdown', onBodyClick);
    });

    onUnmounted(() => {
        document.removeEventListener('pointerdown', onBodyClick);
    });

    function onBodyClick(evt: PointerEvent): void {
        if (!unref(enabled)) {
            return;
        }

        const isInside = unref(elements).some(element => element.contains(evt.target as Node));
        !isInside && onOutsideClick(evt);
    }

    watchEffect(() => {
        const newElements: HTMLElement[] = [];

        (Array.isArray(elementRefs) ? elementRefs : [elementRefs]).forEach(elementRef => {
            const element = unrefTemplateElement(elementRef);
            element && newElements.push(element);
        });

        elements.value = newElements;
    });
}
