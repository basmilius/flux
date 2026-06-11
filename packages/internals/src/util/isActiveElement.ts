const ACTIVE_ELEMENT_SELECTOR = '[aria-selected="true"], [aria-checked="true"], [aria-current]';

export default function (element: HTMLElement): boolean {
    return element.matches(ACTIVE_ELEMENT_SELECTOR);
}
