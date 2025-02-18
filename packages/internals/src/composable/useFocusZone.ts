import { watch } from 'vue';
import type { TemplateRef } from '../util';
import { getBidirectionalFocusElement, getFocusableElement, getFocusableElements, unrefTemplateElement } from '../util';
import useMutationObserver from './useMutationObserver';

export default function <TElement extends HTMLElement>(containerRef: TemplateRef<TElement>, {cycle = true, direction = 'bidirectional'}: UseFocusZoneOptions = {}) {
    useMutationObserver(containerRef, () => updateFocus(findInitialIndex(), false));

    function findInitialIndex(): number {
        const container = unrefTemplateElement(containerRef)!;
        const elements = getFocusableElements(container);
        const isActiveIndex = elements.findIndex(e => e.classList.contains('is-active'));
        const notDisabledIndex = elements.findIndex(e => !e.hasAttribute('aria-disabled'));

        if (isActiveIndex > -1) {
            return isActiveIndex;
        }

        if (notDisabledIndex > -1) {
            return notDisabledIndex;
        }

        return 0;
    }

    function updateFocus(elementIndex: number, doFocus: boolean = true): void {
        const container = unrefTemplateElement(containerRef)!;
        const elements = getFocusableElements(container);
        elements.forEach((elm, index) => elm.tabIndex = index === elementIndex ? 0 : -1);

        doFocus && elements[elementIndex]?.focus();
    }

    function onKeyDown(evt: KeyboardEvent): void {
        const container = unrefTemplateElement(containerRef)!;
        const elements = getFocusableElements(container);

        if (['Enter', ' '].includes(evt.key)) {
            return;
        }

        switch (direction) {
            case 'bidirectional':
                handleBidirectionalFocus(evt, container, elements, updateFocus);
                break;

            case 'horizontal':
            case 'vertical':
                handleDirectionalFocus(evt, container, cycle, direction, elements, updateFocus);
                break;
        }
    }

    watch(containerRef, (_, __, onCleanup) => {
        const container = unrefTemplateElement(containerRef);

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
