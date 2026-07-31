export const MENU_PANE_SELECTOR = '[data-flux-menu-pane]';

// Arrow keys must drive the embedded control (slider, coordinate picker, stepper) rather than the
// menu's roving focus. FluxMenu skips these subtrees via MENU_PANE_SELECTOR, but its <nav> keydown
// listener still fires on bubbling — stopping arrow keys here keeps it from calling preventDefault
// on them. Escape and Tab deliberately keep bubbling so the menu can still close and the focus trap
// keeps working.
export function onMenuPaneKeydown(evt: KeyboardEvent): void {
    if (evt.key.startsWith('Arrow')) {
        evt.stopPropagation();
    }
}
