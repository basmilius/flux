import { useClickOutside } from '@basmilius/common';
import { unrefTemplateElement } from '@flux-ui/internals';
import { type ComponentPublicInstance, nextTick, ref, type Ref, unref, watch } from 'vue';

export type UseDropdownPopupOptions = {
    readonly anchorRef: Readonly<Ref<ComponentPublicInstance | null | undefined>>;
    readonly popupRef: Readonly<Ref<ComponentPublicInstance | null | undefined>>;
    readonly focusElement: Readonly<Ref<HTMLElement | null | undefined>>;
    readonly disabled?: Readonly<Ref<boolean>>;
    readonly readonly?: Readonly<Ref<boolean>>;
    readonly onOpen?: () => void;
    readonly onClose?: () => void;
};

export type UseDropdownPopupReturn = {
    readonly isOpen: Ref<boolean>;
    readonly open: () => void;
    readonly close: () => void;
    readonly toggle: () => void;
    readonly focusAnchor: () => void;
    readonly onKeyDownBase: (evt: KeyboardEvent) => boolean;
};

/**
 * Shared dropdown-popup infrastructure for select-like components. Manages:
 * - open/close state
 * - click-outside (close when clicking outside popup + anchor)
 * - focus-back-to-anchor on close
 * - focus-the-inner-focus-element on open
 * - Escape/Tab keyboard handling
 */
export default function useDropdownPopup(options: UseDropdownPopupOptions): UseDropdownPopupReturn {
    const isOpen = ref(false);

    function open(): void {
        if (unref(options.disabled) || unref(options.readonly)) {
            return;
        }

        isOpen.value = true;
    }

    function close(): void {
        isOpen.value = false;
    }

    function toggle(): void {
        if (unref(options.disabled) || unref(options.readonly)) {
            return;
        }

        isOpen.value = !unref(isOpen);
    }

    function focusAnchor(): void {
        nextTick(() => unrefTemplateElement(options.anchorRef)?.focus());
    }

    function onKeyDownBase(evt: KeyboardEvent): boolean {
        if (evt.key === 'Escape' && unref(isOpen)) {
            evt.preventDefault();
            isOpen.value = false;
            focusAnchor();
            return true;
        }

        if (evt.key === 'Tab' && unref(isOpen)) {
            isOpen.value = false;
            return true;
        }

        return false;
    }

    useClickOutside([options.anchorRef, options.popupRef], isOpen, () => isOpen.value = false);
    useClickOutside(options.anchorRef, isOpen, () => unref(options.focusElement)?.focus());

    watch(isOpen, opened => {
        if (!opened) {
            options.onClose?.();
            return;
        }

        nextTick(() => unref(options.focusElement)?.focus());

        options.onOpen?.();
    });

    return {
        isOpen,
        open,
        close,
        toggle,
        focusAnchor,
        onKeyDownBase
    };
}
