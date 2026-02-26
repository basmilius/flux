export { default as animationFrameDebounce } from './animationFrameDebounce';
export { default as flattenVNodeTree } from './flattenVNodeTree';
export { default as getBidirectionalFocusElement } from './getBidirectionalFocusElement';
export { default as getComponentName } from './getComponentName';
export { default as getComponentProps } from './getComponentProps';
export { default as getExposedRef } from './getExposedRef';
export { default as getFocusableElement } from './getFocusableElement';
export { default as getFocusableElements } from './getFocusableElements';
export { default as getKeyboardFocusableElements } from './getKeyboardFocusableElements';
export { default as unrefTemplateElement, type TemplateElement, type TemplateRef } from './unrefTemplateElement';
export { default as warn } from './warn';
export { default as wrapFocus } from './wrapFocus';

export { default as FOCUS_TRAP_LOCKS, type FocusTrapListener } from './focusTrap';

export const isSSR: boolean = !globalThis.document;
