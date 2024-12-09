import { isHtmlElement } from '@basmilius/utils';

const FOCUSABLE_ELEMENTS = [
    'a:not([disabled])',
    'button:not([disabled])',
    'input[type=checkbox]:not([disabled])',
    'input[type=radio]:not([disabled])',
    'input[type=text]:not([disabled])',
    '[tabindex]:not([disabled]):not([tabindex="-1"])'
].join(',');

export default function (container: HTMLElement): HTMLElement[] {
    return Array.from(container.querySelectorAll(FOCUSABLE_ELEMENTS))
        .filter(isHtmlElement)
        .filter(elm => elm.offsetWidth > 0 || elm.offsetHeight > 0 || elm === document.activeElement);
}
