import type { Ref } from 'vue';
import { ref, watch } from 'vue';
import type { TemplateRef } from '@/util';
import { getFocusableElements, isSSR, unrefTemplateElement, wrapFocus } from '@/util';
import useFocusTrapLock from './useFocusTrapLock';
import useFocusTrapReturn from './useFocusTrapReturn';

export default function (containerRef: TemplateRef<HTMLElement>, options: UseFocusTrapOptions = {}) {
    if (isSSR) {
        return;
    }

    const {disable = ref(false), disableReturn = ref(false), attachTo = null} = options;
    const enabled = useFocusTrapLock(!disable);

    useFocusTrapReturn(disableReturn);

    watch(containerRef, (_, __, onCleanup) => {
        const container = unrefTemplateElement(containerRef);
        const attach = attachTo || document;

        if (enabled.value && container && document.activeElement && !container.contains(document.activeElement) && !container.querySelector('[autofocus]')) {
            wrapFocus(container, document.activeElement, true);
        }

        function onFocusIn(evt: FocusEvent): void {
            if (!enabled.value || !container) {
                return;
            }

            const newFocusElement = (evt.target as HTMLElement | null) || document.body;

            if (container.contains(newFocusElement)) {
                return;
            }

            evt.preventDefault();
            evt.stopImmediatePropagation();

            wrapFocus(container, newFocusElement);
        }

        function onFocusOut(evt: FocusEvent): void {
            if (!enabled.value || !container) {
                return;
            }

            if (!evt.relatedTarget || evt.relatedTarget === document.body) {
                evt.preventDefault();
                container.focus();
            }

            const newFocusElement = (evt.target as HTMLElement | null) || document.body;

            if (container.contains(newFocusElement)) {
                return;
            }

            wrapFocus(container, newFocusElement);
        }

        attach.addEventListener('focusin', onFocusIn as EventListener, {capture: true});
        attach.addEventListener('focusout', onFocusOut as EventListener, {capture: true});

        if (container) {
            const elements = getFocusableElements(container);
            const isActiveIndex = elements.findIndex(e => e.classList.contains('is-active'));
            const notDisabledIndex = elements.findIndex(e => !e.hasAttribute('aria-disabled'));
            let element = elements[0];

            if (isActiveIndex > -1) {
                element = elements[isActiveIndex];
            }

            if (notDisabledIndex > -1) {
                element = elements[notDisabledIndex];
            }

            if (element) {
                element.focus();
            }
        }

        onCleanup(() => {
            attach.removeEventListener('focusin', onFocusIn as EventListener);
            attach.removeEventListener('focusout', onFocusOut as EventListener);
        });
    }, {immediate: true});

    watch(() => disable, () => {
        const container = unrefTemplateElement(containerRef);
        enabled.value = !disable;

        if (disable || !container) {
            return;
        }

        const elements = getFocusableElements(container as HTMLElement);

        if (elements.includes(document.activeElement as HTMLElement)) {
            return;
        }

        elements[0]?.focus();
    }, {immediate: true});
}

interface UseFocusTrapOptions {
    attachTo?: HTMLElement | Document;
    disable?: Ref<boolean>;
    disableReturn?: Ref<boolean>;
}
