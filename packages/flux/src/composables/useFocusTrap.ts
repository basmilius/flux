import type { Ref } from 'vue-demi';
import { onMounted, onUnmounted, ref, unref, watch } from 'vue-demi';
import { FOCUS_TRAP_LOCKS, FocusTrapListener, getFocusableElements, wrapFocus } from '@/utils';
import { unrefElement } from '@/helpers';

let lockId = 0;

export function useFocusTrap(containerRef: Ref<HTMLElement | undefined>, options: UseFocusTrapOptions = {}) {
    const {disable = ref(false), disableReturn = ref(false), attachTo = null} = options;
    const enabled = useFocusTrapLock(!disable);

    useFocusTrapReturn(disableReturn);

    watch(containerRef, (_, __, onCleanup) => {
        if (typeof document === 'undefined') {
            return;
        }

        const container = unrefElement(containerRef);
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
            const notDisabledIndex = elements.findIndex(e => !e.classList.contains('is-disabled'));
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
        const container = unrefElement(containerRef);
        enabled.value = !disable;

        if (disable || !container) {
            return;
        }

        const elements = getFocusableElements(container);

        if (elements.includes(document.activeElement as HTMLElement)) {
            return;
        }

        elements[0]?.focus();
    }, {immediate: true});
}

export function useFocusTrapLock(autoFocus: boolean = false): Ref<boolean> {
    const id = ref(`focus-trap-${++lockId}`);
    const enabled = ref(false);

    onMounted(() => FOCUS_TRAP_LOCKS.add(unref(id), isEnabled => enabled.value = isEnabled, autoFocus));
    onUnmounted(() => FOCUS_TRAP_LOCKS.remove(unref(id)));

    return enabled;
}

export function useFocusTrapReturn(disabled: Ref<boolean>): void {
    const target = ref<HTMLElement | null>(document.activeElement as HTMLElement | null);

    onUnmounted(() => {
        if (disabled.value) {
            return;
        }

        requestAnimationFrame(() => unref(target)?.focus());
    });
}

export function useFocusTrapSubscription(listener: FocusTrapListener): void {
    const unsubscribe = ref<Function | null>(null);

    onMounted(() => unsubscribe.value = FOCUS_TRAP_LOCKS.subscribe(listener));
    onUnmounted(() => unsubscribe.value?.());
}

interface UseFocusTrapOptions {
    attachTo?: HTMLElement | Document;
    disable?: Ref<boolean>;
    disableReturn?: Ref<boolean>;
}
