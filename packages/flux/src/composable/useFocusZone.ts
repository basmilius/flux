import type { Ref } from 'vue';
import { watch } from 'vue';
import { assertRefNotNull, getBidirectionalFocusElement, getFocusableElement, getFocusableElements } from '@/util';
import useMutationObserver from './useMutationObserver';

export default function (container: Ref<HTMLElement | undefined>, {cycle = true, direction = 'bidirectional'}: UseFocusZoneOptions = {}) {
    useMutationObserver(container, () => updateFocus(findInitialIndex(), false));

    function findInitialIndex(): number {
        assertRefNotNull(container);

        const elements = getFocusableElements(container.value);
        const isActiveIndex = elements.findIndex(e => e.classList.contains('is-active'));
        const notDisabledIndex = elements.findIndex(e => !e.classList.contains('is-disabled'));

        if (isActiveIndex > -1) {
            return isActiveIndex;
        }

        if (notDisabledIndex > -1) {
            return notDisabledIndex;
        }

        return 0;
    }

    function updateFocus(elementIndex: number, doFocus: boolean = true): void {
        assertRefNotNull(container);

        const elements = getFocusableElements(container.value);
        elements.forEach((elm, index) => elm.tabIndex = index === elementIndex ? 0 : -1);

        doFocus && elements[elementIndex]?.focus();
    }

    function onKeyDown(evt: KeyboardEvent): void {
        assertRefNotNull(container);

        const elements = getFocusableElements(container.value);

        if (['Enter', ' '].includes(evt.key)) {
            return;
        }

        switch (direction) {
            case 'bidirectional':
                handleBidirectionalFocus(evt, container.value, elements, updateFocus);
                break;

            case 'horizontal':
            case 'vertical':
                handleDirectionalFocus(evt, container.value, cycle, direction, elements, updateFocus);
                break;
        }
    }

    watch(container, (container, _, onCleanup) => {
        if (!container) {
            return;
        }

        container.addEventListener('keydown', onKeyDown);

        updateFocus(findInitialIndex(), false);

        onCleanup(() => container.removeEventListener('keydown', onKeyDown));
    }, {immediate: true});
}

function handleBidirectionalFocus(evt: KeyboardEvent, container: HTMLElement, elements: HTMLElement[], updateFocus: (index: number) => void): void {
    let dir: 'up' | 'down' | 'left' | 'right';

    switch (evt.key) {
        case 'ArrowUp':
            dir = 'up';
            break;

        case 'ArrowDown':
            dir = 'down';
            break;

        case 'ArrowLeft':
            dir = 'left';
            break;

        case 'ArrowRight':
            dir = 'right';
            break;

        default:
            return;
    }

    const element = getBidirectionalFocusElement(container, document.activeElement as HTMLElement, dir);

    if (element) {
        updateFocus(elements.indexOf(element));
    }

    evt.preventDefault();
}

function handleDirectionalFocus(evt: KeyboardEvent, container: HTMLElement, cycle: boolean, direction: 'horizontal' | 'vertical', elements: HTMLElement[], updateFocus: (index: number) => void): void {
    let dir: number;

    if (evt.key === (direction === 'horizontal' ? 'ArrowLeft' : 'ArrowUp')) {
        dir = -1;
    } else if (evt.key === (direction === 'horizontal' ? 'ArrowRight' : 'ArrowDown')) {
        dir = 1;
    } else {
        return;
    }

    const element = getFocusableElement(container, dir);

    if (element) {
        updateFocus(elements.indexOf(element));
    } else if (cycle) {
        updateFocus(dir === 1 ? 0 : elements.length - 1);
    }

    evt.preventDefault();
}

interface UseFocusZoneOptions {
    readonly cycle?: boolean;
    readonly direction?: 'bidirectional' | 'horizontal' | 'vertical';
}
