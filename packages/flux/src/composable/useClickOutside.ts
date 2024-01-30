import { ComponentPublicInstance, onMounted, onUnmounted, ref, Ref, unref, watchEffect } from 'vue';
import { isHtmlElement } from '@/util';

type ElementRef = Ref<ComponentPublicInstance | HTMLElement | undefined>;
type Handler = ((evt: PointerEvent) => void) | ((evt: PointerEvent) => Promise<void>);

export function useClickOutside(elementRefs: ElementRef | ElementRef[], enabled: boolean | Ref<boolean>, onOutsideClick: Handler): void {
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
            const element = unref(elementRef);
            element && newElements.push(isHtmlElement(element) ? element : element.$el);
        });

        elements.value = newElements;
    });
}
