import { isHtmlElement } from '@basmilius/utils';

const FOCUSABLE_ELEMENTS = [
    'a[href]:not([disabled])',
    'button:not([disabled])',
    'input:not([type=hidden]):not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[contenteditable]:not([contenteditable=false])',
    '[tabindex]:not([disabled]):not([tabindex="-1"])'
].join(',');

export default function (container: HTMLElement, ignore?: string): HTMLElement[] {
    return Array.from(container.querySelectorAll(FOCUSABLE_ELEMENTS))
        .filter(isHtmlElement)
        .filter(elm => elm.offsetWidth > 0 || elm.offsetHeight > 0 || elm === document.activeElement)
        .filter(elm => !ignore || !elm.closest(ignore));
}
