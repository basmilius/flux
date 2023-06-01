import type { Ref } from 'vue-demi';
import { onMounted, onUnmounted, ref, unref, watch } from 'vue-demi';
import { FOCUS_TRAP_LOCKS, FocusTrapListener, getFocusableElements, wrapFocus } from '@/utils';

let lockId = 0;

export function useFocusTrap(container: Ref<HTMLElement | undefined>, options: UseFocusTrapOptions = {}) {
    const {disable = false, disableReturn = false, attachTo = null} = options;
    const enabled = useFocusTrapLock(!disable);

    watch(container, (container, _, onCleanup) => {
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

        onCleanup(() => {
            attach.removeEventListener('focusin', onFocusIn as EventListener);
            attach.removeEventListener('focusout', onFocusOut as EventListener);
        });
    }, {immediate: true});

    watch(() => disable, () => {
        enabled.value = !disable;

        if (disable || !container.value) {
            return;
        }

        const elements = getFocusableElements(container.value);

        if (elements.includes(document.activeElement as HTMLElement)) {
            return;
        }

        elements[0]?.focus();
    }, {immediate: true});
}

function useFocusTrapLock(autoFocus: boolean = false): Ref<boolean> {
    const id = ref(`focus-trap-${++lockId}`);
    const enabled = ref(false);

    onMounted(() => FOCUS_TRAP_LOCKS.add(unref(id), isEnabled => enabled.value = isEnabled, autoFocus));
    onUnmounted(() => FOCUS_TRAP_LOCKS.remove(unref(id)));

    return enabled;
}

function useFocusTrapReturn(disabled: Ref<boolean>): void {
    const target = ref<HTMLElement | null>(document.activeElement as HTMLElement | null);

    onUnmounted(() => {
        if (disabled.value) {
            return;
        }

        requestAnimationFrame(() => unref(target)?.focus());
    });
}

function useFocusTrapSubscription(listener: FocusTrapListener): void {
    const unsubscribe = ref<Function | null>(null);

    onMounted(() => unsubscribe.value = FOCUS_TRAP_LOCKS.subscribe(listener));
    onUnmounted(() => unsubscribe.value?.());
}

interface UseFocusTrapOptions {
    attachTo?: HTMLElement | Document;
    disable?: boolean;
    disableReturn?: boolean;
}
