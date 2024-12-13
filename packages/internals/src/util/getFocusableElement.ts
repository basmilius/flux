import { isHtmlElement } from '@basmilius/utils';
import getFocusableElements from './getFocusableElements';

export default function (container: HTMLElement, direction: number, activeElement: HTMLElement | undefined = undefined): HTMLElement | undefined {
    const elements = getFocusableElements(container);
    const focusedElement = activeElement || document.activeElement;

    if (!focusedElement || !isHtmlElement(focusedElement))
        return elements[0] || undefined;

    const currentIndex = elements.indexOf(focusedElement);

    return elements[currentIndex + direction] || undefined;
}
