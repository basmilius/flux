import {clsx} from 'clsx';
import {createPortal} from 'react-dom';
import {cloneElement, createContext, isValidElement, useContext, useEffect, useId, useLayoutEffect, useRef, useState} from 'react';
import type {CSSProperties, HTMLAttributes, KeyboardEvent, ReactNode} from 'react';
import type {FluxDirection, FluxSize, FluxStyle} from '../types';
import {FluxPane} from './Display';
import {MenuContext} from './Menus';
import {registerDialog, useFluxStore} from './Notifications';
import {FluxFlyoutTransition, FluxFadeTransition, FluxOverlayTransition, FluxSheetTransition, FluxSlideOverTransition, FluxTooltipTransition} from './Transitions';
import overlayStyles from '../../../components/src/css/component/Overlay.module.scss';
import sheetStyles from '../../../components/src/css/component/Sheet.module.scss';
import flyoutStyles from '../../../components/src/css/component/Flyout.module.scss';
import tooltipStyles from '../../../components/src/css/component/Tooltip.module.scss';

export interface DialogProps extends HTMLAttributes<HTMLDivElement> {
    isCloseable?: boolean;
    label?: string;
    onClose?: () => void;
    open: boolean;
}

export function FluxOverlay({children, className, isCloseable, label, onClose, open, size = 'small', ...props}: DialogProps & {size?: FluxSize}) {
    return <DialogPortal {...props} open={open} isCloseable={isCloseable} label={label} onClose={onClose} className={clsx(overlayStyles[`overlay${capital(size)}`], className)}>{children}</DialogPortal>;
}

export function FluxSlideOver({children, className, ...props}: DialogProps) {
    return <DialogPortal {...props} transition="slideOver" className={clsx(overlayStyles.slideOver, className)}>{children}</DialogPortal>;
}

export {FluxSheet} from './Sheet';

export function DialogPortal({children, className, isCloseable, label, onClose, open, transition = 'overlay', ...props}: DialogProps & {transition?: 'overlay' | 'slideOver' | 'sheet'}) {
    const ref = useRef<HTMLDivElement>(null);
    const [dialogId, setDialogId] = useState<number>();
    const {dialogs} = useFluxStore();
    const isCurrent = dialogId !== undefined && dialogs.at(-1) === dialogId;
    useEffect(() => {
        if (!open) return;
        const registration = registerDialog();
        setDialogId(registration.id);
        return () => registration.unregister();
    }, [open]);
    useDialogLifecycle(open && isCurrent, ref, onClose, isCloseable);
    if (typeof document === 'undefined') return null;
    const Transition = transition === 'sheet' ? FluxSheetTransition : transition === 'slideOver' ? FluxSlideOverTransition : FluxOverlayTransition;
    return createPortal(<div className={overlayStyles.overlayProvider}><FluxFadeTransition show={open}><div className={overlayStyles.overlayShade} /></FluxFadeTransition><Transition appear show={open}><div {...props} ref={ref} className={clsx(className, isCurrent && overlayStyles.isCurrent)} role="dialog" aria-modal="true" aria-label={label} tabIndex={-1} onMouseDown={event => {if (isCloseable && event.target === event.currentTarget) onClose?.();}}>{children}</div></Transition></div>, document.body);
}

function useDialogLifecycle(open: boolean, ref: React.RefObject<HTMLElement | null>, onClose?: () => void, closeable?: boolean) {
    const onCloseRef = useRef(onClose);
    onCloseRef.current = onClose;
    useEffect(() => {
        if (!open) return;
        const previous = document.activeElement as HTMLElement | null;
        requestAnimationFrame(() => firstFocusable(ref.current)?.focus() ?? ref.current?.focus());
        const keydown = (event: globalThis.KeyboardEvent) => {
            if (event.defaultPrevented || flyoutStack.length) return;
            if (event.key === 'Escape' && closeable) {event.preventDefault(); onCloseRef.current?.();}
            if (event.key === 'Tab') trapTab(event, ref.current);
        };
        document.addEventListener('keydown', keydown);
        return () => {document.removeEventListener('keydown', keydown); previous?.focus();};
    }, [closeable, open, ref]);
}

const flyoutStack: string[] = [];
export const FluxFlyoutContext = createContext<{close(): void; isOpen: boolean; open(): void; toggle(): void; ancestors?: string} | undefined>(undefined);
export function useFluxFlyout() {return useContext(FluxFlyoutContext);}

export interface FluxFlyoutProps {
    children(state: {close(): void; paneX: number; paneY: number; openerWidth: number; openerHeight: number}): ReactNode;
    direction?: FluxDirection;
    isAutoWidth?: boolean;
    label?: string;
    margin?: number;
    onOpenChange?: (open: boolean) => void;
    onOpen?: () => void;
    onClose?: () => void;
    opener(state: {close(): void; isOpen: boolean; open(): void; toggle(): void}): ReactNode;
    width?: number | string;
}

export function FluxFlyout({children, direction = 'vertical', isAutoWidth, label, margin = 9, onClose, onOpen, onOpenChange, opener, width}: FluxFlyoutProps) {
    const parent = useContext(FluxFlyoutContext);
    const id = useId();
    const ancestors = [parent?.ancestors, id].filter(Boolean).join(' ');
    const anchor = useRef<HTMLSpanElement>(null);
    const pane = useRef<HTMLDivElement>(null);
    const restoreFocus = useRef<HTMLElement | null>(null);
    const [open, setOpen] = useState(false);
    const [present, setPresent] = useState(false);
    const [position, setPosition] = useState({x: 0, y: 0, mx: 0, my: 0, openerWidth: 0, openerHeight: 0});
    const change = (value: boolean) => {if (value === open) return; if (value) {restoreFocus.current = document.activeElement as HTMLElement; setPresent(true);} setOpen(value); onOpenChange?.(value); value ? onOpen?.() : onClose?.();};
    const api = {close: () => change(false), open: () => change(true), toggle: () => change(!open), isOpen: present, ancestors};
    useLayoutEffect(() => {
        if (!open || !anchor.current) return;
        const update = () => {
            const box = anchor.current?.firstElementChild?.getBoundingClientRect();
            const panel = pane.current?.getBoundingClientRect();
            if (!box || !panel) return;
            let x = direction === 'horizontal' ? box.right : box.left + box.width / 2 - panel.width / 2;
            let y = direction === 'vertical' ? box.bottom : box.top + box.height / 2 - panel.height / 2;
            let mx = direction === 'horizontal' ? margin : 0;
            let my = direction === 'vertical' ? margin : 0;
            if (direction === 'vertical' && y + panel.height > innerHeight - 12) {y = box.top - panel.height; my = -my;}
            if (direction === 'horizontal' && x + panel.width > innerWidth - 12) {x = box.left - panel.width; mx = -mx;}
            x = Math.max(12, Math.min(innerWidth - panel.width - 12, x));
            y = Math.max(12, Math.min(innerHeight - panel.height - 12, y));
            setPosition(current => current.x === x && current.y === y && current.mx === mx && current.my === my && current.openerWidth === box.width && current.openerHeight === box.height ? current : {x, y, mx, my, openerWidth: box.width, openerHeight: box.height});
        };
        update();
        const resize = typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(update);
        if (pane.current) resize?.observe(pane.current);
        if (anchor.current.firstElementChild) resize?.observe(anchor.current.firstElementChild);
        window.addEventListener('resize', update);
        window.addEventListener('scroll', update, true);
        return () => {resize?.disconnect(); window.removeEventListener('resize', update); window.removeEventListener('scroll', update, true);};
    }, [direction, margin, open, width, isAutoWidth]);
    useEffect(() => {
        if (!present) return;
        flyoutStack.push(id);
        if (!pane.current?.contains(document.activeElement)) firstFocusable(pane.current)?.focus({preventScroll: true});
        const key = (event: globalThis.KeyboardEvent) => {
            if (event.defaultPrevented || flyoutStack.at(-1) !== id) return;
            if (event.key === 'Escape') {event.preventDefault(); change(false);}
            else if (event.key === 'Tab') trapTab(event, pane.current);
        };
        window.addEventListener('keydown', key);
        return () => {
            const index = flyoutStack.indexOf(id);
            if (index >= 0) flyoutStack.splice(index, 1);
            window.removeEventListener('keydown', key);
            restoreFocus.current?.focus({preventScroll: true});
        };
    }, [present, id]);
    useEffect(() => {
        if (!open) return;
        const closeOutside = (event: MouseEvent) => {
            const target = event.target as Node | null;
            const owner = target instanceof Element ? target.closest('[data-flux-flyout-ancestors]')?.getAttribute('data-flux-flyout-ancestors')?.split(' ') : undefined;
            if (target && !owner?.includes(id) && !anchor.current?.contains(target) && !pane.current?.contains(target)) change(false);
        };
        document.addEventListener('mousedown', closeOutside);
        return () => document.removeEventListener('mousedown', closeOutside);
    }, [open]);
    return <span ref={anchor} className={flyoutStyles.flyout}>{opener(api)}{present && typeof document !== 'undefined' && createPortal(<div data-flux-flyout-ancestors={ancestors} className={flyoutStyles.flyoutDialog} style={{position: 'fixed', left: position.x - 30, top: position.y - 30, zIndex: 11000}} role="presentation" onMouseDown={event => event.target === event.currentTarget && change(false)}><div ref={pane}><FluxFlyoutTransition appear show={open} onAfterLeave={() => setPresent(false)}><FluxPane className={clsx(flyoutStyles.flyoutPane, isAutoWidth && flyoutStyles.isAutoWidth)} style={{width: isAutoWidth ? position.openerWidth : width, maxWidth: 'calc(100vw - 24px)', '--pane-mx': `${position.mx}px`, '--pane-my': `${position.my}px`} as FluxStyle} role="dialog" aria-label={label}><FluxFlyoutContext.Provider value={api}><MenuContext.Provider value={{persistent: false}}>{children({close: api.close, paneX: position.x, paneY: position.y, openerWidth: position.openerWidth, openerHeight: position.openerHeight})}</MenuContext.Provider></FluxFlyoutContext.Provider></FluxPane></FluxFlyoutTransition></div></div>, document.body)}</span>;
}

export const TooltipContext = createContext<{close(): void; open(): void}>({close() {}, open() {}});

export function FluxTooltip({children, content, direction = 'vertical', open: controlledOpen}: {children: ReactNode; content: ReactNode; direction?: FluxDirection; open?: boolean}) {
    const anchor = useRef<HTMLSpanElement>(null);
    const tooltip = useRef<HTMLSpanElement>(null);
    const id = useId();
    const [open, setOpen] = useState(false);
    const [layout, setLayout] = useState<{side: string; style: FluxStyle}>({side: 'Below', style: {'--x': 0, '--y': 0}});
    const visible = (controlledOpen ?? open) && Boolean(content);
    useLayoutEffect(() => {
        if (!visible) return;
        const update = () => {
            const box = anchor.current?.firstElementChild?.getBoundingClientRect();
            const size = tooltip.current?.getBoundingClientRect();
            if (!box || !size) return;
            let side = direction === 'vertical' ? 'Below' : 'End';
            let x = direction === 'vertical' ? box.left + (box.width - size.width) / 2 : box.right + 9;
            let y = direction === 'vertical' ? box.bottom + 9 : box.top + (box.height - size.height) / 2;
            if (direction === 'vertical' && y + size.height > innerHeight - 9) {side = 'Above'; y = box.top - size.height - 9;}
            if (direction === 'horizontal' && x + size.width > innerWidth - 9) {side = 'Start'; x = box.left - size.width - 9;}
            x = Math.max(9, Math.min(innerWidth - size.width - 9, x));
            y = Math.max(9, Math.min(innerHeight - size.height - 9, y));
            setLayout({side, style: {'--x': x, '--y': y, '--arrowX': direction === 'vertical' ? `${Math.max(9, Math.min(size.width - 9, box.left + box.width / 2 - x))}px` : side === 'End' ? '0px' : '100%', '--arrowY': direction === 'horizontal' ? `${Math.max(9, Math.min(size.height - 9, box.top + box.height / 2 - y))}px` : side === 'Below' ? '0px' : '100%', '--arrowAngle': {Below: '225deg', Above: '45deg', End: '135deg', Start: '-45deg'}[side]}});
        };
        const frame = requestAnimationFrame(update);
        window.addEventListener('resize', update);
        window.addEventListener('scroll', update, true);
        return () => {cancelAnimationFrame(frame); window.removeEventListener('resize', update); window.removeEventListener('scroll', update, true);};
    }, [visible, direction, content]);
    const child = isValidElement<{ 'aria-describedby'?: string }>(children) ? cloneElement(children, {'aria-describedby': visible ? [children.props['aria-describedby'], id].filter(Boolean).join(' ') : children.props['aria-describedby']}) : children;
    return <TooltipContext.Provider value={{close: () => setOpen(false), open: () => setOpen(true)}}><span ref={anchor} style={{display: 'contents'}} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} onFocus={() => setOpen(true)} onBlur={() => setOpen(false)}>
        {child}
        {typeof document !== 'undefined' && createPortal(<FluxTooltipTransition show={visible}><span ref={tooltip} id={id} role="tooltip" className={tooltipStyles[`tooltip${layout.side}`]} style={layout.style as CSSProperties}>{content}</span></FluxTooltipTransition>, document.body)}
    </span></TooltipContext.Provider>;
}

function focusables(root: HTMLElement | null): HTMLElement[] { return root ? Array.from(root.querySelectorAll<HTMLElement>('a[href],button:not(:disabled),input:not(:disabled),select:not(:disabled),textarea:not(:disabled),[tabindex]:not([tabindex="-1"])')).filter(element => element.tabIndex >= 0) : []; }
function firstFocusable(root: HTMLElement | null) { return focusables(root)[0]; }
function trapTab(event: globalThis.KeyboardEvent, root: HTMLElement | null) { const items = focusables(root); if (!items.length) {event.preventDefault(); return;} const first = items[0], last = items.at(-1)!; if (event.shiftKey && document.activeElement === first) {event.preventDefault(); last.focus();} else if (!event.shiftKey && document.activeElement === last) {event.preventDefault(); first.focus();} }
function capital(value: string) { return value.charAt(0).toUpperCase() + value.slice(1); }
