import {clsx} from 'clsx';
import {createPortal} from 'react-dom';
import {useEffect, useId, useLayoutEffect, useRef, useState} from 'react';
import type {CSSProperties, HTMLAttributes, KeyboardEvent, ReactNode} from 'react';
import type {FluxDirection, FluxSize, FluxStyle} from '../types';
import {FluxPane} from './Display';
import {registerDialog, useFluxStore} from './Notifications';
import overlayStyles from '../../../components/src/css/component/Overlay.module.scss';
import sheetStyles from '../../../components/src/css/component/Sheet.module.scss';
import flyoutStyles from '../../../components/src/css/component/Flyout.module.scss';
import tooltipStyles from '../../../components/src/css/component/Tooltip.module.scss';

interface DialogProps extends HTMLAttributes<HTMLDivElement> {
    isCloseable?: boolean;
    label?: string;
    onClose?: () => void;
    open: boolean;
}

export function FluxOverlay({children, className, isCloseable, label, onClose, open, size = 'small', ...props}: DialogProps & {size?: FluxSize}) {
    return <DialogPortal {...props} open={open} isCloseable={isCloseable} label={label} onClose={onClose} className={clsx(overlayStyles[`overlay${capital(size)}`], className)}>{children}</DialogPortal>;
}

export function FluxSlideOver({children, className, ...props}: DialogProps) {
    return <DialogPortal {...props} className={clsx(overlayStyles.slideOver, className)}>{children}</DialogPortal>;
}

export function FluxSheet({children, className, isDraggable = true, position = 'bottom', ...props}: DialogProps & {isDraggable?: boolean; position?: 'bottom' | 'left' | 'right' | 'top'}) {
    return <DialogPortal {...props} className={clsx(sheetStyles.sheet, sheetStyles[`is${capital(position)}`], className)}><div className={clsx(sheetStyles.sheetSurface, sheetStyles[`is${capital(position)}`])}>{isDraggable && <button className={sheetStyles.sheetGrabber} data-flux-sheet-grabber="" aria-label="Resize or close sheet" type="button" onClick={props.isCloseable ? props.onClose : undefined} />}{children}</div></DialogPortal>;
}

function DialogPortal({children, className, isCloseable, label, onClose, open, ...props}: DialogProps) {
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
    if (!open || typeof document === 'undefined') return null;
    return createPortal(<div className={overlayStyles.overlayProvider}><div className={overlayStyles.overlayShade} /><div {...props} ref={ref} className={clsx(className, isCurrent && overlayStyles.isCurrent)} role="dialog" aria-modal="true" aria-label={label} tabIndex={-1} onMouseDown={event => {if (isCloseable && event.target === event.currentTarget) onClose?.();}}>{children}</div></div>, document.body);
}

function useDialogLifecycle(open: boolean, ref: React.RefObject<HTMLElement | null>, onClose?: () => void, closeable?: boolean) {
    const onCloseRef = useRef(onClose);
    onCloseRef.current = onClose;
    useEffect(() => {
        if (!open) return;
        const previous = document.activeElement as HTMLElement | null;
        requestAnimationFrame(() => firstFocusable(ref.current)?.focus() ?? ref.current?.focus());
        const keydown = (event: globalThis.KeyboardEvent) => {
            if (event.key === 'Escape' && closeable) {event.preventDefault(); onCloseRef.current?.();}
            if (event.key === 'Tab') trapTab(event, ref.current);
        };
        document.addEventListener('keydown', keydown);
        return () => {document.removeEventListener('keydown', keydown); previous?.focus();};
    }, [closeable, open, ref]);
}

export interface FluxFlyoutProps {
    children(state: {close(): void}): ReactNode;
    direction?: FluxDirection;
    isAutoWidth?: boolean;
    label?: string;
    margin?: number;
    onOpenChange?: (open: boolean) => void;
    opener(state: {close(): void; isOpen: boolean; open(): void; toggle(): void}): ReactNode;
    width?: number | string;
}

export function FluxFlyout({children, direction = 'vertical', isAutoWidth, label, margin = 9, onOpenChange, opener, width}: FluxFlyoutProps) {
    const anchor = useRef<HTMLSpanElement>(null);
    const pane = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);
    const [position, setPosition] = useState({x: 0, y: 0, openerWidth: 0});
    const change = (value: boolean) => {setOpen(value); onOpenChange?.(value);};
    const api = {close: () => change(false), open: () => change(true), toggle: () => change(!open), isOpen: open};
    useLayoutEffect(() => {
        if (!open || !anchor.current) return;
        const box = anchor.current.firstElementChild?.getBoundingClientRect() ?? anchor.current.getBoundingClientRect();
        const panel = pane.current?.getBoundingClientRect();
        let x = direction === 'horizontal' ? box.right + margin : box.left + box.width / 2 - (panel?.width ?? 0) / 2;
        let y = direction === 'vertical' ? box.bottom + margin : box.top + box.height / 2 - (panel?.height ?? 0) / 2;
        x = Math.max(12, Math.min(innerWidth - (panel?.width ?? 0) - 12, x)); y = Math.max(12, Math.min(innerHeight - (panel?.height ?? 0) - 12, y));
        setPosition({x, y, openerWidth: box.width});
    }, [direction, margin, open]);
    useEffect(() => {if (!open) return; const close = (event: globalThis.KeyboardEvent) => event.key === 'Escape' && change(false); window.addEventListener('keydown', close); return () => window.removeEventListener('keydown', close);}, [open]);
    useEffect(() => {
        if (!open) return;
        const closeOutside = (event: MouseEvent) => {
            const target = event.target as Node | null;
            if (target && !anchor.current?.contains(target) && !pane.current?.contains(target)) change(false);
        };
        document.addEventListener('mousedown', closeOutside);
        return () => document.removeEventListener('mousedown', closeOutside);
    }, [open]);
    return <span ref={anchor} className={flyoutStyles.flyout}>{opener(api)}{open && typeof document !== 'undefined' && createPortal(<div className={flyoutStyles.flyoutDialog} style={{position: 'fixed', left: position.x, top: position.y, zIndex: 11000}} role="presentation" onMouseDown={event => event.target === event.currentTarget && change(false)}><div ref={pane}><FluxPane className={clsx(flyoutStyles.flyoutPane, isAutoWidth && flyoutStyles.isAutoWidth)} style={{width: isAutoWidth ? position.openerWidth : width}} role="dialog" aria-label={label}>{children({close: api.close})}</FluxPane></div></div>, document.body)}</span>;
}

export function FluxTooltip({children, content, direction = 'vertical'}: {children: ReactNode; content: ReactNode; direction?: FluxDirection}) {
    const anchor = useRef<HTMLSpanElement>(null); const id = useId(); const [open, setOpen] = useState(false); const [style, setStyle] = useState<FluxStyle>();
    useLayoutEffect(() => {if (!open || !anchor.current) return; const box = anchor.current.getBoundingClientRect(); setStyle({'--x': Math.round(direction === 'vertical' ? box.left + box.width / 2 : box.right + 9), '--y': Math.round(direction === 'vertical' ? box.bottom + 9 : box.top + box.height / 2)});}, [direction, open]);
    return <span ref={anchor} className={tooltipStyles.tooltipHost} aria-describedby={open ? id : undefined} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} onFocus={() => setOpen(true)} onBlur={() => setOpen(false)}>{children}{open && <span id={id} role="tooltip" className={direction === 'vertical' ? tooltipStyles.tooltipBelow : tooltipStyles.tooltipEnd} style={style as CSSProperties}>{content}</span>}</span>;
}

function focusables(root: HTMLElement | null): HTMLElement[] { return root ? Array.from(root.querySelectorAll<HTMLElement>('a[href],button:not(:disabled),input:not(:disabled),select:not(:disabled),textarea:not(:disabled),[tabindex]:not([tabindex="-1"])')) : []; }
function firstFocusable(root: HTMLElement | null) { return focusables(root)[0]; }
function trapTab(event: globalThis.KeyboardEvent, root: HTMLElement | null) { const items = focusables(root); if (!items.length) {event.preventDefault(); return;} const first = items[0], last = items.at(-1)!; if (event.shiftKey && document.activeElement === first) {event.preventDefault(); last.focus();} else if (!event.shiftKey && document.activeElement === last) {event.preventDefault(); first.focus();} }
function capital(value: string) { return value.charAt(0).toUpperCase() + value.slice(1); }
