/**
 * Gets the keyboard focusable elements within the given root element.
 * @param {HTMLElement} root
 * @returns {HTMLElement[]}
 */
export function getKeyboardFocusableElements(root: HTMLElement): HTMLElement[] {
    return Array.from<HTMLElement>(root.querySelectorAll('a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'))
        .filter(elm => !elm.hasAttribute('disabled') || elm.getAttribute('disabled') !== 'true')
        .filter(elm => !elm.hasAttribute('aria-disabled') || elm.getAttribute('aria-disabled') !== 'true');
}
